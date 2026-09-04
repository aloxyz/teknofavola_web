import { error as kitError } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getEvents, getEventBySlug, splitEvents } from '$lib/server/api/events';

export const load: PageServerLoad = async ({ params }) => {
	const [events, openEvent] = await Promise.all([getEvents(), getEventBySlug(params.slug)]);

	if (events === null) {
		return { error: true, upcoming: [], past: [], openEvent: null, openEventIndex: -1 };
	}

	const { upcoming, past } = splitEvents(events);

	if (!openEvent) {
		throw kitError(404, 'Event not found');
	}

	const upcomingIdx = upcoming.findIndex((e) => e.id === openEvent.id);
	const openEventIndex = upcomingIdx >= 0 ? upcomingIdx : past.findIndex((e) => e.id === openEvent.id);

	return { error: false, upcoming, past, openEvent, openEventIndex };
};
