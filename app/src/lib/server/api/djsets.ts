import { readItems } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { DjSetRecord } from '$lib/types/directus';

export async function getDjSetsForArtist(artistId: string): Promise<DjSetRecord[] | null> {
	try {
		return (await directus.request(
			readItems('dj_sets', {
				filter: { status: { _eq: 'published' }, artist: { _eq: artistId } },
				sort: ['sort_order'],
				limit: -1
			})
		)) as unknown as DjSetRecord[];
	} catch (err) {
		console.error('getDjSetsForArtist failed', err);
		return null;
	}
}

// The Directus SDK's generated field-selection type doesn't accept a plain
// array built at runtime; the shape is still correct for the REST API.
const EPISODE_FIELDS: any = ['*', { artist: ['name', 'slug', 'photo', 'bio_it', 'bio_en'] }];

/** Published DJ sets flagged for the "Once Upon a Time" video format, most recent episode first. */
export async function getOnceUponATimeEpisodes(): Promise<DjSetRecord[] | null> {
	try {
		return (await directus.request(
			readItems('dj_sets', {
				filter: { status: { _eq: 'published' }, is_once_upon_a_time_episode: { _eq: true } },
				sort: ['-episode_number', '-sort_order'],
				fields: EPISODE_FIELDS,
				limit: -1
			})
		)) as unknown as DjSetRecord[];
	} catch (err) {
		console.error('getOnceUponATimeEpisodes failed', err);
		return null;
	}
}
