import type { LayoutServerLoad } from './$types';
import { getSiteSettings } from '$lib/server/api/site';
import { getSocialLinksGrouped } from '$lib/server/api/social';
import { SITE_SETTINGS_FALLBACK } from '$lib/config/siteDefaults';

export const load: LayoutServerLoad = async ({ locals }) => {
	const [siteSettingsResult, socialGroups] = await Promise.all([getSiteSettings(), getSocialLinksGrouped()]);

	return {
		lang: locals.lang,
		siteSettings: siteSettingsResult ?? SITE_SETTINGS_FALLBACK,
		siteSettingsUnavailable: siteSettingsResult === null,
		socialGroups: socialGroups ?? [],
		socialGroupsUnavailable: socialGroups === null
	};
};
