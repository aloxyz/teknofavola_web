export interface VideoEmbed {
	provider: 'youtube' | 'vimeo';
	embedUrl: string;
}

/**
 * Only ever returns an embed for a recognised, well-formed YouTube/Vimeo URL.
 * Anything else comes back null so the UI links out instead of embedding
 * unrecognised or invalid material (per the brief: never auto-embed material
 * that isn't a valid, known video source).
 */
export function parseVideoEmbed(url: string | null | undefined): VideoEmbed | null {
	if (!url) return null;
	let u: URL;
	try {
		u = new URL(url);
	} catch {
		return null;
	}

	const host = u.hostname.replace(/^www\./, '').replace(/^m\./, '');

	if (host === 'youtube.com') {
		const id = u.searchParams.get('v');
		if (id && /^[\w-]{6,}$/.test(id)) return { provider: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
		const shorts = u.pathname.match(/^\/shorts\/([\w-]{6,})/);
		if (shorts) return { provider: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${shorts[1]}` };
		return null;
	}

	if (host === 'youtu.be') {
		const id = u.pathname.slice(1);
		if (id && /^[\w-]{6,}$/.test(id)) return { provider: 'youtube', embedUrl: `https://www.youtube-nocookie.com/embed/${id}` };
		return null;
	}

	if (host === 'vimeo.com') {
		const id = u.pathname.split('/').filter(Boolean)[0];
		if (id && /^\d+$/.test(id)) return { provider: 'vimeo', embedUrl: `https://player.vimeo.com/video/${id}` };
		return null;
	}

	return null;
}
