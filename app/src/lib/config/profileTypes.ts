import type { ProfileType } from '$lib/types/directus';

export const PROFILE_TYPE_LABEL: Record<ProfileType, { it: string; en: string }> = {
	dj: { it: 'DJ', en: 'DJ' },
	photographer_videomaker: { it: 'FOTOGRAFO/VIDEOMAKER', en: 'PHOTOGRAPHER/VIDEOMAKER' },
	graphic: { it: 'GRAFICO', en: 'GRAPHIC DESIGNER' },
	tattoo_artist: { it: 'TATUATRICE', en: 'TATTOO ARTIST' },
	other: { it: 'ALTRO', en: 'OTHER' }
};
