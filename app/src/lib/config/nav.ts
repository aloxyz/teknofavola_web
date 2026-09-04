export interface NavItem {
	key: string;
	num: string;
	path: string;
	label: string;
}

// Proper-noun section names: identical in both languages by design.
export const NAV: NavItem[] = [
	{ key: 'home', num: '00', path: '/', label: 'HOME' },
	{ key: 'favole', num: '01', path: '/favole', label: 'LE NOSTRE FAVOLE' },
	{ key: 'booking', num: '02', path: '/booking', label: 'BOOKING ARTIST' },
	{ key: 'once', num: '03', path: '/once-upon-a-time', label: 'ONCE UPON A TIME' },
	{ key: 'label', num: '04', path: '/label', label: 'THE FABLE LABEL' },
	{ key: 'studio', num: '05', path: '/studio', label: 'THE FABLE STUDIO' }
];
