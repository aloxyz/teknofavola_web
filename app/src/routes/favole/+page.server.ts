import type { PageServerLoad } from './$types';
import { getEvents, splitEvents } from '$lib/server/api/events';

export const load: PageServerLoad = async () => {
	const events = await getEvents();

	if (events === null) {
		return { error: true, upcoming: [], past: [] };
	}

	const { upcoming, past } = splitEvents(events);
	return { error: false, upcoming, past };
};
