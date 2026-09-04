import type { Locale } from '$lib/i18n/dictionary';

export function formatEventDate(iso: string | null | undefined, locale: Locale): string | null {
	if (!iso) return null;
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return null;
	return new Intl.DateTimeFormat(locale === 'it' ? 'it-IT' : 'en-GB', {
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	})
		.format(d)
		.toUpperCase();
}
