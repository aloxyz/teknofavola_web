<script lang="ts">
	import { assetUrl } from '$lib/utils/assets';
	import { episodeSlug } from '$lib/utils/episodeSlug';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import { unwrapArtist } from '$lib/utils/records';
	import type { DjSetRecord } from '$lib/types/directus';

	let { episode, lang }: { episode: DjSetRecord; lang: Locale } = $props();

	const artist = $derived(unwrapArtist(episode.artist));
	const photoSrc = $derived(artist ? assetUrl(artist.photo, 'width=600&quality=85') : null);
	const num = $derived(String(episode.episode_number ?? 0).padStart(2, '0'));
	const displayTitle = $derived(
		`#${num} ONCE UPON A TIME — ${artist?.name ?? '—'}${episode.genre ? ' — ' + episode.genre : ''}`
	);
</script>

<a
	href="/once-upon-a-time/{episodeSlug(episode)}"
	class="tf-media-card"
	style="display:flex;flex-direction:column;gap:14px;text-align:left;padding:22px;border:0;border-right:2px solid var(--tf-line);border-bottom:2px solid var(--tf-line);color:var(--tf-ink);min-width:0"
>
	<span style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-size:10px;letter-spacing:.16em;color:var(--tf-ink-3)">
		<span>{t(lang, 'episode')} {num}</span>
	</span>
	{#if photoSrc}
		<img src={photoSrc} alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1.35;object-fit:cover;border:2px solid var(--tf-line-2)" />
	{:else}
		<span style="display:flex;align-items:center;justify-content:center;aspect-ratio:1/1.35;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3);text-align:center;padding:12px">{t(lang, 'photoSlot')}</span>
	{/if}
	<span style="display:block;font-weight:900;font-size:16px;line-height:1.2;letter-spacing:-0.01em;overflow-wrap:anywhere">{displayTitle}</span>
	<span style="display:block;font-size:10px;letter-spacing:.16em;color:var(--tf-accent)">{t(lang, 'openEvent')} →</span>
</a>
