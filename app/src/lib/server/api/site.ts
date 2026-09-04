import { readSingleton } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { SiteSettings } from '$lib/types/directus';

export async function getSiteSettings(): Promise<SiteSettings | null> {
	try {
		return await directus.request(readSingleton('site_settings'));
	} catch (err) {
		console.error('getSiteSettings failed', err);
		return null;
	}
}
