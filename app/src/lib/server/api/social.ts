import { readItems } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { SocialFormat, SocialLinkRecord } from '$lib/types/directus';

export interface SocialGroup {
	format: SocialFormat;
	links: SocialLinkRecord[];
}

const FORMAT_ORDER: SocialFormat[] = ['teknofavola', 'once_upon_a_time', 'fable_label', 'fable_studio'];

export async function getSocialLinksGrouped(): Promise<SocialGroup[] | null> {
	try {
		const rows = (await directus.request(
			readItems('social_links', {
				filter: { active: { _eq: true } },
				sort: ['sort_order'],
				limit: -1
			})
		)) as SocialLinkRecord[];

		return FORMAT_ORDER.map((format) => ({
			format,
			links: rows.filter((r) => r.format === format)
		})).filter((g) => g.links.length > 0);
	} catch (err) {
		console.error('getSocialLinksGrouped failed', err);
		return null;
	}
}
