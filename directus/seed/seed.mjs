#!/usr/bin/env node
// Seeds the initial content named explicitly in the brief: the 7 known
// events, the 12 known artists, the 8 known social slots, the 5 studio
// services and the rehearsal-room gear. Nothing here invents content the
// client hasn't supplied yet — dates, flyers, bios, photos and most social
// URLs are left empty on purpose, exactly as the CMS design mocked them.
//
// Safe to re-run: every insert is keyed on a natural key (slug / format+
// platform / name) and skipped if a matching record already exists.
//
// Usage: same env vars as bootstrap.mjs, run after bootstrap.mjs.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const BASE = (process.env.DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '');
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS_DIR = path.resolve(__dirname, '../../project/assets');

let TOKEN;

async function getToken() {
  if (process.env.DIRECTUS_ADMIN_TOKEN) return process.env.DIRECTUS_ADMIN_TOKEN;
  const email = process.env.DIRECTUS_ADMIN_EMAIL;
  const password = process.env.DIRECTUS_ADMIN_PASSWORD;
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  return (await res.json()).data.access_token;
}

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${TOKEN}` },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status}: ${text}`);
  return json?.data ?? null;
}

async function findOne(collection, filter) {
  const qs = new URLSearchParams({ filter: JSON.stringify(filter), limit: '1' });
  const rows = await api('GET', `/items/${collection}?${qs}`);
  return rows && rows[0];
}

async function ensureItem(collection, filter, data, label) {
  const existing = await findOne(collection, filter);
  if (existing) {
    console.log(`= ${collection}: "${label}" already exists`);
    return existing;
  }
  console.log(`+ ${collection}: creating "${label}"`);
  return api('POST', `/items/${collection}`, data);
}

async function upsertSingleton(collection, data) {
  console.log(`~ ${collection}: updating singleton`);
  await api('PATCH', `/items/${collection}`, data);
}

async function uploadAsset(fileName, folderName) {
  const folders = await api('GET', `/folders?filter=${encodeURIComponent(JSON.stringify({ name: { _eq: folderName } }))}`);
  const folderId = folders && folders[0] ? folders[0].id : undefined;

  const filePath = path.join(ASSETS_DIR, fileName);
  const buffer = await readFile(filePath);
  const form = new FormData();
  if (folderId) form.append('folder', folderId);
  form.append('title', fileName.replace(/\.[a-z0-9]+$/i, ''));
  form.append('file', new Blob([buffer]), fileName);

  const res = await fetch(`${BASE}/files`, {
    method: 'POST',
    headers: { authorization: `Bearer ${TOKEN}` },
    body: form
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`upload ${fileName} -> ${res.status}: ${JSON.stringify(json)}`);
  return json.data.id;
}

function slugify(input) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const EVENTS = [
  'LA FAVOLA DI MEZZA ESTATE',
  "A MESSINA NON C'È NENTI",
  'LA DIVINA TEKNO DI OKUTO',
  'SICILY TEKNO UNITED',
  'LA FAVOLA DEL PURGATORIO',
  "SOTTO L'ALBERO DELLE FAVOLE",
  'CHE FINE HA FATTO WILLY WONKA'
];

const ARTISTS = [
  { name: 'RICCARDO LENTINI', profile_type: 'photographer_videomaker' },
  { name: 'FEDERICO VINCI', profile_type: 'photographer_videomaker' },
  { name: 'KEVIN MAZZARELLO', profile_type: null },
  { name: 'FABIANA MIRODDI', profile_type: null },
  { name: 'ALO', profile_type: 'dj' },
  { name: 'ANALØG23', profile_type: 'dj' },
  { name: 'CYNNAMIDE', profile_type: 'dj' },
  { name: 'DØN CICCIØ', profile_type: 'dj' },
  { name: 'FEFOX', profile_type: 'dj' },
  { name: 'FLOW.D', profile_type: 'dj' },
  { name: 'JASON', profile_type: 'dj' },
  { name: 'RJJCK', profile_type: 'dj' },
  { name: 'VERTEK', profile_type: 'dj' }
].sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true }));

const SOCIAL_LINKS = [
  { format: 'teknofavola', platform: 'INSTAGRAM', url: 'https://www.instagram.com/teknofavola?igsi=MXJkZWJkbWRmaXB3ZA%3D%3D&utm_source=qr' },
  { format: 'once_upon_a_time', platform: 'INSTAGRAM', url: '' },
  { format: 'once_upon_a_time', platform: 'YOUTUBE', url: '' },
  { format: 'fable_label', platform: 'INSTAGRAM', url: '' },
  { format: 'fable_label', platform: 'YOUTUBE', url: '' },
  { format: 'fable_label', platform: 'SPOTIFY', url: '' },
  { format: 'fable_label', platform: 'SOUNDCLOUD', url: '' },
  { format: 'fable_studio', platform: 'INSTAGRAM', url: '' }
];

const SERVICES = [
  { name_it: 'PRODUZIONI', name_en: 'PRODUCTION' },
  { name_it: 'REGISTRAZIONE', name_en: 'RECORDING' },
  { name_it: 'MIX', name_en: 'MIX' },
  { name_it: 'MASTER', name_en: 'MASTER' },
  { name_it: 'GHOST PRODUCTION', name_en: 'GHOST PRODUCTION' }
];

async function main() {
  TOKEN = await getToken();
  console.log(`Seeding ${BASE}\n`);

  for (const [i, title] of EVENTS.entries()) {
    const slug = slugify(title);
    await ensureItem('events', { slug: { _eq: slug } }, {
      title,
      slug,
      sort_order: i + 1,
      status: 'published'
    }, title);
  }

  for (const [i, artist] of ARTISTS.entries()) {
    const slug = slugify(artist.name);
    await ensureItem('artists', { slug: { _eq: slug } }, {
      name: artist.name,
      slug,
      profile_type: artist.profile_type,
      sort_order: i + 1,
      status: 'published'
    }, artist.name);
  }

  for (const [i, s] of SOCIAL_LINKS.entries()) {
    await ensureItem('social_links', { format: { _eq: s.format }, platform: { _eq: s.platform } }, {
      format: s.format,
      platform: s.platform,
      url: s.url || null,
      sort_order: i + 1,
      active: true
    }, `${s.format} / ${s.platform}`);
  }

  for (const [i, s] of SERVICES.entries()) {
    await ensureItem('services', { name_it: { _eq: s.name_it } }, {
      name_it: s.name_it,
      name_en: s.name_en,
      sort_order: i + 1,
      status: 'published'
    }, s.name_it);
  }

  await upsertSingleton('studio_info', {
    gear_items: [{ label: '2 × CDJ-3000X' }, { label: 'XONE 96' }],
    optional_services_it: [
      { label: 'REGISTRAZIONE AUDIO SET' },
      { label: 'REGISTRAZIONE VIDEO SET' },
      { label: 'EDITING DEI CONTENUTI VIDEO' }
    ],
    optional_services_en: [
      { label: 'AUDIO SET RECORDING' },
      { label: 'VIDEO SET RECORDING' },
      { label: 'VIDEO EDITING' }
    ]
  });

  let logoId;
  try {
    logoId = await uploadAsset('logo-tf-raster.png', 'Logo');
    console.log(`+ uploaded logo-tf-raster.png as ${logoId}`);
  } catch (err) {
    console.warn(`! could not upload logo asset (${err.message}) — leave site_settings.logo empty and upload it by hand.`);
  }

  await upsertSingleton('site_settings', {
    site_name: 'TEKNOFAVOLA',
    ...(logoId ? { logo: logoId } : {}),
    collective_tag_it: 'COLLETTIVO TEKNO',
    collective_tag_en: 'TEKNO COLLECTIVE',
    tagline_it: 'BENVENUTI ♦ NEL ♦ MONDO ♦ DELLE ♦ FAVOLE',
    tagline_en: 'WELCOME ♦ TO ♦ THE ♦ WORLD ♦ OF ♦ FABLES',
    bio_heading_it: 'UNA CREW FAVOLOSA',
    bio_heading_en: 'A FABULOUS CREW',
    contact_email: 'teknofavola@gmail.com',
    footer_about_it: 'COLLETTIVO TEKNO · MESSINA / SICILIA',
    footer_about_en: 'TEKNO COLLECTIVE · MESSINA / SICILY',
    footer_legal_it: 'P.IVA / DATI FISCALI — DA INSERIRE',
    footer_legal_en: 'VAT / LEGAL DETAILS — TO BE ADDED',
    accent_color: '#C6FF00'
  });

  console.log('\nSeed complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
