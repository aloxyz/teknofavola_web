import type { ArtistRecord, DjSetRecord } from '$lib/types/directus';

/** Builds the "01-riccardo-lentini" style slug for a Once Upon A Time episode. */
export function episodeSlug(ep: DjSetRecord): string {
	const artist = typeof ep.artist === 'string' ? null : (ep.artist as ArtistRecord);
	const num = String(ep.episode_number ?? 0).padStart(2, '0');
	return `${num}-${artist?.slug ?? 'artista'}`;
}
