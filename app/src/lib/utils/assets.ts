import { env } from '$env/dynamic/public';
import type { DirectusFile } from '$lib/types/directus';

const BASE = (env.PUBLIC_DIRECTUS_URL || 'http://localhost:8055').replace(/\/$/, '');

type FileRef = string | DirectusFile | null | undefined;

function fileId(ref: FileRef): string | null {
	if (!ref) return null;
	return typeof ref === 'string' ? ref : ref.id;
}

/** Builds a URL to a Directus-served asset, optionally with transform params (e.g. "width=800&quality=80"). */
export function assetUrl(ref: FileRef, params?: string): string | null {
	const id = fileId(ref);
	if (!id) return null;
	return `${BASE}/assets/${id}${params ? `?${params}` : ''}`;
}

/** A responsive srcset for a portrait/flyer-shaped image at a few common widths. */
export function assetSrcset(ref: FileRef, widths: number[] = [400, 800, 1200]): string | null {
	const id = fileId(ref);
	if (!id) return null;
	return widths.map((w) => `${BASE}/assets/${id}?width=${w}&quality=82 ${w}w`).join(', ');
}
