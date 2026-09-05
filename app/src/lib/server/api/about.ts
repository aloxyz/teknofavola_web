import { readSingleton } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { AboutPageRecord } from '$lib/types/directus';

export async function getAboutPage(): Promise<AboutPageRecord | null> {
	try {
		return await directus.request(readSingleton('about_page'));
	} catch (err) {
		console.error('getAboutPage failed', err);
		return null;
	}
}
