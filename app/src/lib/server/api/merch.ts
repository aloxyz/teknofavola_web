import { readItems } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { MerchItemRecord } from '$lib/types/directus';

export async function getMerchItems(): Promise<MerchItemRecord[] | null> {
	try {
		return (await directus.request(
			readItems('merch_items', {
				filter: { status: { _eq: 'published' } },
				sort: ['sort_order'],
				limit: -1
			})
		)) as unknown as MerchItemRecord[];
	} catch (err) {
		console.error('getMerchItems failed', err);
		return null;
	}
}
