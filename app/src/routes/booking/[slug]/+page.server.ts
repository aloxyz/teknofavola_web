import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getArtists, sortArtistsAlpha } from '$lib/server/api/artists';
import { getDjSetsForArtist } from '$lib/server/api/djsets';

export const load: PageServerLoad = async ({ params }) => {
	const artists = await getArtists();

	if (artists === null) {
		return { error: true, artists: [], activeArtist: null, djSets: [], djSetsError: false };
	}

	const sorted = sortArtistsAlpha(artists);
	const activeArtist = sorted.find((a) => a.slug === params.slug);

	if (!activeArtist) {
		throw kitError(404, 'Artist not found');
	}

	const djSets = activeArtist.profile_type === 'dj' ? await getDjSetsForArtist(activeArtist.id) : [];

	return {
		error: false,
		artists: sorted,
		activeArtist,
		djSets: djSets ?? [],
		djSetsError: djSets === null
	};
};
