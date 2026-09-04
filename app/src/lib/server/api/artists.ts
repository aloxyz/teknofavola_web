import { readItems } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { ArtistRecord } from '$lib/types/directus';

// The Directus SDK's generated field-selection type doesn't accept a plain
// array built at runtime; the shape is still correct for the REST API.
const FIELDS: any = ['*', { work_photos: ['file'] }];

export async function getArtists(): Promise<ArtistRecord[] | null> {
	try {
		return (await directus.request(
			readItems('artists', {
				filter: { status: { _eq: 'published' } },
				sort: ['sort_order', 'name'],
				fields: FIELDS,
				limit: -1
			})
		)) as unknown as ArtistRecord[];
	} catch (err) {
		console.error('getArtists failed', err);
		return null;
	}
}

export async function getArtistBySlug(slug: string): Promise<ArtistRecord | null> {
	try {
		const rows = (await directus.request(
			readItems('artists', {
				filter: { status: { _eq: 'published' }, slug: { _eq: slug } },
				fields: FIELDS,
				limit: 1
			})
		)) as unknown as ArtistRecord[];
		return rows[0] ?? null;
	} catch (err) {
		console.error('getArtistBySlug failed', err);
		return null;
	}
}

/** Artists sorted alphabetically (Italian collation), matching the design's booking index. */
export function sortArtistsAlpha(artists: ArtistRecord[]): ArtistRecord[] {
	return [...artists].sort((a, b) => a.name.localeCompare(b.name, 'it', { sensitivity: 'base', numeric: true }));
}
