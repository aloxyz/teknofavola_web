import type { PageServerLoad } from './$types';
import { getOnceUponATimeEpisodes } from '$lib/server/api/djsets';

export const load: PageServerLoad = async () => {
	const episodes = await getOnceUponATimeEpisodes();

	if (episodes === null) {
		return { error: true, episodes: [] };
	}

	return { error: false, episodes };
};
