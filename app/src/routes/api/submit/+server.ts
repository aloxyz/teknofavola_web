import { json } from '@sveltejs/kit';
import crypto from 'node:crypto';
import { z } from 'zod';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';
import { createFormSubmission } from '$lib/server/api/formSubmissions';
import { checkRateLimit } from '$lib/server/rateLimit';

const SUBMISSION_TYPES = ['booking', 'once_upon_a_time', 'label_demo', 'studio_request'] as const;

const bodySchema = z.object({
	type: z.enum(SUBMISSION_TYPES),
	fields: z.record(z.string(), z.string().max(5000)),
	hiddenFields: z.record(z.string(), z.string()).optional().default({}),
	honeypot: z.string().optional().default('')
});

const RATE_LIMIT_MAX = Number(env.FORM_RATE_LIMIT_MAX || 5);
const RATE_LIMIT_WINDOW_MS = Number(env.FORM_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const IP_SALT = env.FORM_IP_SALT || 'dev-salt-change-me';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hashIp(ip: string): string {
	return crypto.createHash('sha256').update(IP_SALT + ip).digest('hex').slice(0, 32);
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let parsed: z.infer<typeof bodySchema>;
	try {
		parsed = bodySchema.parse(await request.json());
	} catch {
		return json({ error: 'invalid_payload' }, { status: 400 });
	}

	const ipHash = hashIp(getClientAddress());

	if (!checkRateLimit(ipHash, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
		return json({ error: 'rate_limited' }, { status: 429 });
	}

	// Honeypot tripped: report success without persisting anything, so bots
	// filling every field don't learn which one gave them away.
	if (parsed.honeypot) {
		return json({ ok: true });
	}

	const f = parsed.fields;
	const name = f.nome || f.name || f.nome_artista || f.artist_name || '';
	const email = f.email || '';

	if (!name.trim() || !EMAIL_RE.test(email.trim())) {
		return json({ error: 'invalid_fields' }, { status: 400 });
	}

	try {
		await createFormSubmission({
			type: parsed.type,
			name: name.trim().slice(0, 200),
			email: email.trim().slice(0, 200),
			payload: { ...f, ...parsed.hiddenFields },
			ipHash
		});
	} catch (err) {
		console.error('form submission failed', err);
		return json({ error: 'server_error' }, { status: 502 });
	}

	return json({ ok: true });
};
