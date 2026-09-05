import type { PageServerLoad } from './$types';
import { getAboutPage } from '$lib/server/api/about';

export const load: PageServerLoad = async () => {
	const aboutPage = await getAboutPage();

	return {
		error: aboutPage === null,
		aboutPage
	};
};
