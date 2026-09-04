import type { Handle } from '@sveltejs/kit';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '$lib/i18n/dictionary';

const LANG_COOKIE = 'tf_lang';

function resolveLocale(event: Parameters<Handle>[0]['event']): Locale {
	const fromCookie = event.cookies.get(LANG_COOKIE);
	if (fromCookie && (LOCALES as string[]).includes(fromCookie)) return fromCookie as Locale;

	const acceptLanguage = event.request.headers.get('accept-language') || '';
	if (acceptLanguage.toLowerCase().startsWith('en')) return 'en';

	return DEFAULT_LOCALE;
}

export const handle: Handle = async ({ event, resolve }) => {
	const lang = resolveLocale(event);
	event.locals.lang = lang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
