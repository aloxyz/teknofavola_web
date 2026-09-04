// Declarative schema for the TeknoFavola Directus instance.
//
// Design decision: content that needs IT/EN copy uses flat sibling columns
// (`title_it` / `title_en`) instead of Directus's o2m translations-collection
// pattern. With a handful of short fields per record this keeps every
// collection a single flat form — simpler to explain to a non-technical
// admin, and simpler to bootstrap — while still being fully bilingual and
// CMS-driven. Swapping to real translation rows is a mechanical upgrade
// later if the collective ever needs more than two languages.
//
// Every text field is plain string/text (no WYSIWYG/HTML) on purpose: the
// frontend renders it through Svelte text interpolation, which escapes by
// construction, so there is no HTML-from-the-CMS to sanitize.

const STATUS_FIELD = {
  field: 'status',
  type: 'string',
  meta: {
    interface: 'select-dropdown',
    options: {
      choices: [
        { text: 'Published', value: 'published' },
        { text: 'Draft', value: 'draft' },
        { text: 'Archived', value: 'archived' }
      ]
    },
    display: 'labels',
    display_options: {
      showAsDot: true,
      choices: [
        { text: 'Published', value: 'published', foreground: '#FFFFFF', background: '#2ECDA7' },
        { text: 'Draft', value: 'draft', foreground: '#18222F', background: '#D3DAE4' },
        { text: 'Archived', value: 'archived', foreground: '#FFFFFF', background: '#F7971C' }
      ]
    },
    width: 'half'
  },
  schema: { default_value: 'draft', is_nullable: false }
};

const SORT_FIELD = (name = 'sort_order') => ({
  field: name,
  type: 'integer',
  meta: { interface: 'input', note: 'Drag to reorder in the list view; lower numbers show first.', width: 'half' },
  schema: { is_nullable: true }
});

function text(field, opts = {}) {
  return {
    field,
    type: 'string',
    meta: { interface: 'input', note: opts.note, required: !!opts.required, width: opts.width || 'full' },
    schema: { is_nullable: !opts.required, default_value: opts.default ?? null }
  };
}

function longText(field, opts = {}) {
  return {
    field,
    type: 'text',
    meta: { interface: 'textarea', note: opts.note, required: !!opts.required, width: 'full', options: { placeholder: opts.placeholder } },
    schema: { is_nullable: !opts.required }
  };
}

function boolean(field, opts = {}) {
  return {
    field,
    type: 'boolean',
    meta: { interface: 'boolean-toggle', note: opts.note, width: 'half' },
    schema: { is_nullable: false, default_value: opts.default ?? false }
  };
}

function integer(field, opts = {}) {
  return {
    field,
    type: 'integer',
    meta: { interface: 'input', note: opts.note, width: 'half' },
    schema: { is_nullable: true, default_value: opts.default ?? null }
  };
}

function date(field, opts = {}) {
  return {
    field,
    type: 'date',
    meta: { interface: 'datetime', note: opts.note, width: 'half' },
    schema: { is_nullable: true }
  };
}

function url(field, opts = {}) {
  return {
    field,
    type: 'string',
    meta: {
      interface: 'input',
      note: opts.note || 'Leave empty if not available yet — the site hides it cleanly instead of showing a broken link.',
      width: opts.width || 'half',
      options: { placeholder: 'https://…' }
    },
    schema: { is_nullable: true }
  };
}

function fileField(field, opts = {}) {
  return {
    field,
    type: 'uuid',
    meta: {
      interface: opts.image === false ? 'file' : 'file-image',
      special: ['file'],
      note: opts.note,
      width: 'half'
    },
    schema: { is_nullable: true },
    relation: { related_collection: 'directus_files' }
  };
}

function m2o(field, relatedCollection, opts = {}) {
  return {
    field,
    type: 'uuid',
    meta: {
      interface: 'select-dropdown-m2o',
      special: ['m2o'],
      note: opts.note,
      required: !!opts.required,
      width: 'full',
      display: 'related-values',
      display_options: { template: opts.template }
    },
    schema: { is_nullable: !opts.required },
    relation: { related_collection: relatedCollection, one_field: opts.oneField }
  };
}

function select(field, choices, opts = {}) {
  return {
    field,
    type: 'string',
    meta: {
      interface: 'select-dropdown',
      options: { choices: choices.map((c) => (typeof c === 'string' ? { text: c, value: c } : c)) },
      note: opts.note,
      required: !!opts.required,
      width: opts.width || 'half'
    },
    schema: { is_nullable: !opts.required, default_value: opts.default ?? null }
  };
}

function fileRepeater(field, opts = {}) {
  return {
    field,
    type: 'json',
    meta: {
      interface: 'list',
      special: ['cast-json'],
      note: opts.note,
      width: 'full',
      options: {
        template: '{{ file }}',
        fields: [
          { field: 'file', name: 'File', type: 'uuid', meta: { interface: 'file-image', width: 'full' } }
        ]
      }
    },
    schema: { is_nullable: true }
  };
}

function stringListRepeater(field, opts = {}) {
  return {
    field,
    type: 'json',
    meta: {
      interface: 'list',
      special: ['cast-json'],
      note: opts.note,
      width: 'full',
      options: {
        template: '{{ label }}',
        fields: [{ field: 'label', name: 'Label', type: 'string', meta: { interface: 'input', width: 'full' } }]
      }
    },
    schema: { is_nullable: true },
    default: opts.default
  };
}

export const PROFILE_TYPES = ['dj', 'photographer', 'videomaker', 'graphic', 'tattoo_artist', 'other'];
export const SOCIAL_FORMATS = ['teknofavola', 'once_upon_a_time', 'fable_label', 'fable_studio'];
export const SUBMISSION_TYPES = ['booking', 'once_upon_a_time', 'label_demo', 'studio_request'];

export const collections = [
  {
    collection: 'site_settings',
    icon: 'tune',
    note: 'Global content: logo, tagline, bio, contact, footer, SEO. One record for the whole site.',
    singleton: true,
    fields: [
      text('site_name', { required: true, default: 'TEKNOFAVOLA' }),
      fileField('logo', { note: 'Shown in the sidebar, the home hero and the footer. Use a transparent PNG/SVG.' }),
      fileField('favicon', { image: false, note: 'Browser tab icon.' }),
      text('collective_tag_it', { note: 'Small kicker under the wordmark, e.g. "COLLETTIVO TEKNO".', default: 'COLLETTIVO TEKNO' }),
      text('collective_tag_en', { default: 'TEKNO COLLECTIVE' }),
      text('tagline_it', { note: 'Catchphrase under the home logo.', default: 'BENVENUTI ♦ NEL ♦ MONDO ♦ DELLE ♦ FAVOLE' }),
      text('tagline_en', { default: 'WELCOME ♦ TO ♦ THE ♦ WORLD ♦ OF ♦ FABLES' }),
      text('bio_heading_it', { note: 'Big headline on the home page, under the tagline.', default: 'UNA CREW FAVOLOSA' }),
      text('bio_heading_en', { default: 'A FABULOUS CREW' }),
      longText('bio_paragraph_it', { note: 'Who TeknoFavola is — shown large on the home page.' }),
      longText('bio_paragraph_en'),
      text('contact_email', { required: true, default: 'teknofavola@gmail.com' }),
      longText('footer_about_it', { default: 'COLLETTIVO TEKNO · MESSINA / SICILIA' }),
      longText('footer_about_en', { default: 'TEKNO COLLECTIVE · MESSINA / SICILY' }),
      text('footer_legal_it', { note: 'VAT / legal line in the footer.', default: 'P.IVA / DATI FISCALI — DA INSERIRE' }),
      text('footer_legal_en', { default: 'VAT / LEGAL DETAILS — TO BE ADDED' }),
      text('seo_title_it'),
      text('seo_title_en'),
      longText('seo_description_it'),
      longText('seo_description_en'),
      text('accent_color', { note: 'Hex color for the single brand accent.', default: '#ff563c' })
    ]
  },

  {
    collection: 'events',
    icon: 'event',
    note: '"Le nostre favole" — past and upcoming nights. Sorted by date automatically.',
    sortField: 'sort_order',
    statusField: true,
    fields: [
      text('title', { required: true }),
      text('slug', { required: true, note: 'Used in the URL: /favole/this-slug. Lowercase, hyphens only.' }),
      date('event_date', { note: 'Leave empty while the date is unconfirmed — it will show as "date coming".' }),
      fileField('flyer', { note: 'Portrait flyer, long side at least 1200px.' }),
      longText('description_it'),
      longText('description_en'),
      url('instagram_url'),
      url('youtube_url'),
      url('other_url', { note: 'Any other relevant link (ticketing, aftermovie, etc).' }),
      text('venue', { note: 'Optional venue / city.' }),
      fileRepeater('gallery', { note: 'Optional photo gallery for the event drawer.' }),
      boolean('featured', { note: 'Highlight this event above the others.' }),
      SORT_FIELD(),
      STATUS_FIELD
    ]
  },

  {
    collection: 'artists',
    icon: 'groups',
    note: 'Booking Artist roster — DJs, photographers, videomakers, graphic artists, tattoo artists.',
    sortField: 'sort_order',
    statusField: true,
    fields: [
      text('name', { required: true }),
      text('slug', { required: true, note: 'Used in the URL: /booking/this-slug.' }),
      select('profile_type', PROFILE_TYPES, { required: false, default: 'dj', note: 'Leave empty if the client has not confirmed this artist’s role yet.' }),
      fileField('photo', { note: 'Main portrait.' }),
      longText('bio_it'),
      longText('bio_en'),
      url('instagram_url'),
      url('soundcloud_url'),
      url('spotify_url'),
      url('youtube_url'),
      url('other_url'),
      url('video_url', { note: 'Featured YouTube/Vimeo link, mainly for DJ profiles.', width: 'full' }),
      fileRepeater('work_photos', { note: 'Up to 3 images of their work — used for non-DJ profiles.' }),
      SORT_FIELD(),
      STATUS_FIELD
    ]
  },

  {
    collection: 'dj_sets',
    icon: 'graphic_eq',
    note: 'DJ sets linked to an artist. An artist can have any number of these.',
    sortField: 'sort_order',
    statusField: true,
    fields: [
      m2o('artist', 'artists', { required: true, template: '{{ name }}', oneField: 'dj_sets' }),
      text('title', { required: true, note: 'e.g. "DJ SET #01".' }),
      integer('episode_number', { note: 'Only used if this set is also a Once Upon a Time episode.' }),
      text('genre', {}),
      url('video_url', { width: 'full' }),
      boolean('is_once_upon_a_time_episode', { note: 'Show this set on the Once Upon a Time page as a numbered episode.' }),
      SORT_FIELD(),
      STATUS_FIELD
    ]
  },

  {
    collection: 'releases',
    icon: 'album',
    note: 'The Fable Label catalogue.',
    sortField: 'sort_order',
    statusField: true,
    fields: [
      text('track_name', { required: true }),
      m2o('artist', 'artists', { required: true, template: '{{ name }}', oneField: 'releases' }),
      text('mix_engineer'),
      text('master_engineer'),
      fileField('cover'),
      longText('description_it'),
      longText('description_en'),
      url('spotify_url'),
      url('soundcloud_url'),
      url('youtube_url'),
      date('release_date'),
      SORT_FIELD(),
      STATUS_FIELD
    ]
  },

  {
    collection: 'services',
    icon: 'construction',
    note: 'The Fable Studio services (production, recording, mix, master, ghost production).',
    sortField: 'sort_order',
    statusField: true,
    fields: [
      text('name_it', { required: true }),
      text('name_en', { required: true }),
      longText('description_it'),
      longText('description_en'),
      SORT_FIELD(),
      STATUS_FIELD
    ]
  },

  {
    collection: 'studio_info',
    icon: 'meeting_room',
    note: 'Rehearsal-room gear, optional add-ons and the pricing note.',
    singleton: true,
    fields: [
      stringListRepeater('gear_items', { note: 'e.g. "2 × CDJ-3000X", "XONE 96".' }),
      stringListRepeater('optional_services_it', { note: 'e.g. "REGISTRAZIONE AUDIO SET".' }),
      stringListRepeater('optional_services_en'),
      longText('pricing_note_it', { default: 'Il prezzo di ogni servizio varia a seconda della richiesta e della necessità dell’utente. Non esitare a contattarci per scoprire di più.' }),
      longText('pricing_note_en', { default: 'The price of each service varies with the request and the needs of the client. Do not hesitate to contact us to find out more.' })
    ]
  },

  {
    collection: 'social_links',
    icon: 'share',
    note: 'Social channels grouped by format. An empty URL is hidden cleanly on the site instead of a broken link.',
    sortField: 'sort_order',
    fields: [
      select('format', SOCIAL_FORMATS, { required: true, width: 'full' }),
      text('platform', { required: true, note: 'e.g. INSTAGRAM, YOUTUBE, SPOTIFY, SOUNDCLOUD.' }),
      url('url', { width: 'full' }),
      SORT_FIELD(),
      boolean('active', { default: true })
    ]
  },

  {
    collection: 'form_submissions',
    icon: 'inbox',
    note: 'Read-only inbox of everything visitors send through the site forms.',
    fields: [
      select('type', SUBMISSION_TYPES, { required: true, width: 'full' }),
      text('name', { required: true }),
      text('email', { required: true }),
      { field: 'payload', type: 'json', meta: { interface: 'input-code', options: { language: 'json' }, note: 'The full submitted form, including fields not shown as columns.', width: 'full' }, schema: { is_nullable: true } },
      text('ip_hash', { note: 'Salted hash of the sender IP, kept only for abuse investigation.' })
    ]
  }
];

export const folders = ['Logo', 'Flyer', 'Artist Photos', 'Work Photos', 'Release Covers', 'Gallery', 'Other'];
