export interface NavItem {
	key: string;
	num: string;
	path: string;
	label: string;
}

// Proper-noun section names: identical in both languages by design.
export const NAV: NavItem[] = [
	{ key: 'home', num: '00', path: '/', label: 'HOME' },
	{ key: 'about', num: '01', path: '/chi-siamo', label: 'CHI SIAMO' },
	{ key: 'favole', num: '02', path: '/favole', label: 'LE NOSTRE FAVOLE' },
	{ key: 'booking', num: '03', path: '/booking', label: 'BOOKING ARTIST' },
	{ key: 'once', num: '04', path: '/once-upon-a-time', label: 'ONCE UPON A TIME' },
	{ key: 'label', num: '05', path: '/label', label: 'THE FABLE LABEL' },
	{ key: 'studio', num: '06', path: '/studio', label: 'THE FABLE STUDIO' },
	{ key: 'merch', num: '07', path: '/merch', label: 'MERCH' }
];
