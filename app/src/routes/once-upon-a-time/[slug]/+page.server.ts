import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getOnceUponATimeEpisodes } from '$lib/server/api/djsets';
import { episodeSlug } from '$lib/utils/episodeSlug';

export const load: PageServerLoad = async ({ params }) => {
	const episodes = await getOnceUponATimeEpisodes();

	if (episodes === null) {
		return { error: true, episodes: [], activeEpisode: null };
	}

	const activeEpisode = episodes.find((e) => episodeSlug(e) === params.slug);

	if (!activeEpisode) {
		throw kitError(404, 'Episode not found');
	}

	return { error: false, episodes, activeEpisode };
};
