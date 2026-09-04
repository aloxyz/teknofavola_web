import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { LOCALES } from '$lib/i18n/dictionary';

const LANG_COOKIE = 'tf_lang';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json().catch(() => null);
	const lang = body?.lang;

	if (typeof lang !== 'string' || !(LOCALES as string[]).includes(lang)) {
		return json({ error: 'invalid lang' }, { status: 400 });
	}

	cookies.set(LANG_COOKIE, lang, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
	return json({ lang });
};
