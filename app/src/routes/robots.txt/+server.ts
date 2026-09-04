import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler = async () => {
	const origin = (env.PUBLIC_SITE_ORIGIN || 'http://localhost:5173').replace(/\/$/, '');

	const body = `User-agent: *
Disallow:

Sitemap: ${origin}/sitemap.xml
`;

	return new Response(body, { headers: { 'content-type': 'text/plain' } });
};
