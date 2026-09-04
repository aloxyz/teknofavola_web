import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';
import { getEvents } from '$lib/server/api/events';
import { getArtists } from '$lib/server/api/artists';
import { getOnceUponATimeEpisodes } from '$lib/server/api/djsets';
import { episodeSlug } from '$lib/utils/episodeSlug';

const STATIC_PATHS = ['/', '/favole', '/booking', '/once-upon-a-time', '/label', '/studio'];

export const GET: RequestHandler = async () => {
	const origin = (env.PUBLIC_SITE_ORIGIN || 'http://localhost:5173').replace(/\/$/, '');

	const [events, artists, episodes] = await Promise.all([
		getEvents(),
		getArtists(),
		getOnceUponATimeEpisodes()
	]);

	const paths = [
		...STATIC_PATHS,
		...(events ?? []).map((e) => `/favole/${e.slug}`),
		...(artists ?? []).map((a) => `/booking/${a.slug}`),
		...(episodes ?? []).map((e) => `/once-upon-a-time/${episodeSlug(e)}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join('\n')}
</urlset>
`;

	return new Response(body, { headers: { 'content-type': 'application/xml' } });
};
