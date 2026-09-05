import { readItems } from '@directus/sdk';
import { directus } from '$lib/server/directus';
import type { EventRecord } from '$lib/types/directus';

// The Directus SDK's generated field-selection type doesn't accept a plain
// array built at runtime; the shape is still correct for the REST API.
const FIELDS: any = ['*', { gallery: ['file'] }];

export async function getEvents(): Promise<EventRecord[] | null> {
	try {
		return await directus.request(
			readItems('events', {
				filter: { status: { _eq: 'published' } },
				sort: ['-event_date', 'sort_order'],
				fields: FIELDS,
				limit: -1
			})
		) as unknown as EventRecord[];
	} catch (err) {
		console.error('getEvents failed', err);
		return null;
	}
}

export async function getEventBySlug(slug: string): Promise<EventRecord | null> {
	try {
		const rows = (await directus.request(
			readItems('events', {
				filter: { status: { _eq: 'published' }, slug: { _eq: slug } },
				fields: FIELDS,
				limit: 1
			})
		)) as unknown as EventRecord[];
		return rows[0] ?? null;
	} catch (err) {
		console.error('getEventBySlug failed', err);
		return null;
	}
}

/** Splits published events into upcoming (date in the future, ascending) and past (descending, or undated). */
export function splitEvents(events: EventRecord[]) {
	const now = Date.now();
	const upcoming = events
		.filter((e) => e.event_date && new Date(e.event_date).getTime() >= now)
		.sort((a, b) => new Date(a.event_date as string).getTime() - new Date(b.event_date as string).getTime());
	const past = events
		.filter((e) => !e.event_date || new Date(e.event_date).getTime() < now)
		.sort((a, b) => {
			if (a.event_date && b.event_date) {
				return new Date(b.event_date).getTime() - new Date(a.event_date).getTime();
			}
			if (a.event_date) return -1;
			if (b.event_date) return 1;
			return (a.sort_order ?? 0) - (b.sort_order ?? 0);
		});
	return { upcoming, past };
}
