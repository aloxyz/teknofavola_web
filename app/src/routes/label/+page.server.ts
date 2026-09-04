import type { PageServerLoad } from './$types';
import { getReleases } from '$lib/server/api/releases';

export const load: PageServerLoad = async () => {
	const releases = await getReleases();

	if (releases === null) {
		return { error: true, releases: [] };
	}

	return { error: false, releases };
};
