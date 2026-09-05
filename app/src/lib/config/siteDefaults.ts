import type { SiteSettings } from '$lib/types/directus';

// Used only if Directus is unreachable, so the sidebar/footer/contact link
// still render something correct instead of breaking the whole shell.
// These are the values already confirmed in the brief — not invented copy.
export const SITE_SETTINGS_FALLBACK: SiteSettings = {
	id: 'fallback',
	site_name: 'TEKNOFAVOLA',
	logo: null,
	hero_bg_video: null,
	favicon: null,
	collective_tag_it: 'COLLETTIVO TEKNO',
	collective_tag_en: 'TEKNO COLLECTIVE',
	tagline_it: 'BENVENUTI ♦ NEL ♦ MONDO ♦ DELLE ♦ FAVOLE',
	tagline_en: 'WELCOME ♦ TO ♦ THE ♦ WORLD ♦ OF ♦ FABLES',
	bio_heading_it: 'UNA CREW FAVOLOSA',
	bio_heading_en: 'A FABULOUS CREW',
	bio_paragraph_it: null,
	bio_paragraph_en: null,
	contact_email: 'teknofavola@gmail.com',
	footer_about_it: 'COLLETTIVO TEKNO · MESSINA / SICILIA',
	footer_about_en: 'TEKNO COLLECTIVE · MESSINA / SICILY',
	footer_legal_it: 'P.IVA / DATI FISCALI — DA INSERIRE',
	footer_legal_en: 'VAT / LEGAL DETAILS — TO BE ADDED',
	seo_title_it: 'TeknoFavola',
	seo_title_en: 'TeknoFavola',
	seo_description_it: null,
	seo_description_en: null,
	accent_color: '#C6FF00'
};
