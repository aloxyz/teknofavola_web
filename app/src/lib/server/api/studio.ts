import { readItems, readSingleton } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { ServiceRecord, StudioInfoRecord } from '$lib/types/directus';

export async function getServices(): Promise<ServiceRecord[] | null> {
	try {
		return (await directus.request(
			readItems('services', {
				filter: { status: { _eq: 'published' } },
				sort: ['sort_order'],
				limit: -1
			})
		)) as ServiceRecord[];
	} catch (err) {
		console.error('getServices failed', err);
		return null;
	}
}

export async function getStudioInfo(): Promise<StudioInfoRecord | null> {
	try {
		return await directus.request(readSingleton('studio_info'));
	} catch (err) {
		console.error('getStudioInfo failed', err);
		return null;
	}
}
