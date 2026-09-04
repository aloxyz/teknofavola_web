import { createDirectus, rest, staticToken } from '@directus/sdk';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import type { DirectusSchema } from '$lib/types/directus';

// DIRECTUS_URL is the server-to-server address (can be an internal docker
// hostname like http://directus:8055); it never reaches the browser.
// DIRECTUS_TOKEN is a static token for a restricted, read-only "frontend"
// role — never the admin token used by the bootstrap/seed CLI scripts.
const DIRECTUS_URL = env.DIRECTUS_URL || publicEnv.PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_TOKEN = env.DIRECTUS_TOKEN || '';

function build() {
	const base = createDirectus<DirectusSchema>(DIRECTUS_URL).with(rest());
	return DIRECTUS_TOKEN ? base.with(staticToken(DIRECTUS_TOKEN)) : base;
}

export const directus = build();
