import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArtists, sortArtistsAlpha } from '$lib/server/api/artists';

export const load: PageServerLoad = async () => {
	const artists = await getArtists();

	if (artists === null) {
		return { error: true, artists: [], activeArtist: null, djSets: [], djSetsError: false };
	}

	const sorted = sortArtistsAlpha(artists);
	if (sorted.length > 0) {
		throw redirect(307, `/booking/${sorted[0].slug}`);
	}

	return { error: false, artists: sorted, activeArtist: null, djSets: [], djSetsError: false };
};
