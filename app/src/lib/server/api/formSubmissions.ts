import { createItem } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { SubmissionType } from '$lib/types/directus';

export async function createFormSubmission(input: {
	type: SubmissionType;
	name: string;
	email: string;
	payload: Record<string, unknown>;
	ipHash: string;
}) {
	await directus.request(
		createItem('form_submissions', {
			type: input.type,
			name: input.name,
			email: input.email,
			payload: input.payload,
			ip_hash: input.ipHash
		})
	);
}
