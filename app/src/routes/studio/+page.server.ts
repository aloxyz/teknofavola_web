import type { PageServerLoad } from './$types';
import { getServices, getStudioInfo } from '$lib/server/api/studio';

export const load: PageServerLoad = async () => {
	const [services, studioInfo] = await Promise.all([getServices(), getStudioInfo()]);

	return {
		error: services === null,
		services: services ?? [],
		studioInfo
	};
};
