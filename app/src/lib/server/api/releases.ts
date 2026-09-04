import { readItems } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { ReleaseRecord } from '$lib/types/directus';

// The Directus SDK's generated field-selection type doesn't accept a plain
// array built at runtime; the shape is still correct for the REST API.
const FIELDS: any = ['*', { artist: ['name', 'slug'] }];

export async function getReleases(): Promise<ReleaseRecord[] | null> {
	try {
		return (await directus.request(
			readItems('releases', {
				filter: { status: { _eq: 'published' } },
				sort: ['-release_date', 'sort_order'],
				fields: FIELDS,
				limit: -1
			})
		)) as unknown as ReleaseRecord[];
	} catch (err) {
		console.error('getReleases failed', err);
		return null;
	}
}
