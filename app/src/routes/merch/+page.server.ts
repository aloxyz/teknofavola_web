import type { PageServerLoad } from './$types';
import { getMerchItems } from '$lib/server/api/merch';

export const load: PageServerLoad = async () => {
	const items = await getMerchItems();

	if (items === null) {
		return { error: true, items: [] };
	}

	return { error: false, items };
};
