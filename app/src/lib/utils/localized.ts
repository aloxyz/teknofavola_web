import type { Locale } from '$lib/i18n/dictionary';

/**
 * Reads a `${base}_it` / `${base}_en` pair off a Directus record, preferring
 * the current locale and falling back to the other language rather than
 * showing nothing when only one has been filled in.
 */
export function pickLocalized(record: object | null | undefined, base: string, locale: Locale): string | null {
	if (!record) return null;
	const rec = record as Record<string, unknown>;
	const other: Locale = locale === 'it' ? 'en' : 'it';
	const primary = rec[`${base}_${locale}`];
	if (typeof primary === 'string' && primary.trim()) return primary;
	const fallback = rec[`${base}_${other}`];
	if (typeof fallback === 'string' && fallback.trim()) return fallback;
	return null;
}
