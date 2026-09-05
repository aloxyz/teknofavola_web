export interface NavItem {
	key: string;
	num: string;
	path: string;
	label_it: string;
	label_en: string;
}

// Format names (Once Upon A Time, The Fable Label, The Fable Studio) are
// proper nouns — identical in both languages by design. Generic section
// labels (Chi Siamo, Le Nostre Favole) are real UI copy and do translate.
export const NAV: NavItem[] = [
	{ key: 'home', num: '00', path: '/', label_it: 'HOME', label_en: 'HOME' },
	{ key: 'about', num: '01', path: '/chi-siamo', label_it: 'CHI SIAMO', label_en: 'ABOUT US' },
	{ key: 'favole', num: '02', path: '/favole', label_it: 'LE NOSTRE FAVOLE', label_en: 'OUR FABLES' },
	{ key: 'booking', num: '03', path: '/booking', label_it: 'BOOKING ARTIST', label_en: 'BOOKING ARTIST' },
	{ key: 'once', num: '04', path: '/once-upon-a-time', label_it: 'ONCE UPON A TIME', label_en: 'ONCE UPON A TIME' },
	{ key: 'label', num: '05', path: '/label', label_it: 'THE FABLE LABEL', label_en: 'THE FABLE LABEL' },
	{ key: 'studio', num: '06', path: '/studio', label_it: 'THE FABLE STUDIO', label_en: 'THE FABLE STUDIO' },
	{ key: 'merch', num: '07', path: '/merch', label_it: 'MERCH', label_en: 'MERCH' }
];
