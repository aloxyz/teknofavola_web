import type { ArtistRecord } from '$lib/types/directus';

/** Unwraps an m2o relation field into the expanded record, or null if it wasn't expanded (still a bare id) or absent. */
export function unwrapArtist(ref: string | ArtistRecord | null | undefined): ArtistRecord | null {
	return ref && typeof ref !== 'string' ? ref : null;
}

/** Filters a list down to entries with a non-empty `url` — the site's rule is to never render a link for an empty one. */
export function withUrl<T extends { url: string | null }>(items: T[]): T[] {
	return items.filter((item) => !!item.url);
}
