// A minimal in-memory fixed-window rate limiter for form submissions.
//
// This is intentionally simple (no Redis, no external store): it's enough
// to blunt naive spam/abuse from a single process. Anything running with
// more than one server instance behind a load balancer should move this to
// a shared store (Redis, Directus itself, etc) — noted in the app README.

const hits = new Map<string, { count: number; resetAt: number }>();

const MAX_ENTRIES = 5000;

export function checkRateLimit(key: string, max: number, windowMs: number): boolean {
	const now = Date.now();
	const entry = hits.get(key);

	if (!entry || entry.resetAt <= now) {
		hits.set(key, { count: 1, resetAt: now + windowMs });
		if (hits.size > MAX_ENTRIES) pruneExpired(now);
		return true;
	}

	if (entry.count >= max) return false;

	entry.count += 1;
	return true;
}

function pruneExpired(now: number) {
	for (const [key, entry] of hits) {
		if (entry.resetAt <= now) hits.delete(key);
	}
}
