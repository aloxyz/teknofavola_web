<script lang="ts">
	import { assetUrl } from '$lib/utils/assets';
	import { pickLocalized } from '$lib/utils/localized';
	import type { ArtistRecord, ReleaseRecord } from '$lib/types/directus';
	import type { Locale } from '$lib/i18n/dictionary';

	let { release, lang }: { release: ReleaseRecord; lang: Locale } = $props();

	const artist = $derived(typeof release.artist === 'string' ? null : (release.artist as ArtistRecord));
	const coverSrc = $derived(assetUrl(release.cover, 'width=600&quality=85'));
	const description = $derived(pickLocalized(release, 'description', lang));
	const links = $derived(
		[
			{ label: 'SPOTIFY', url: release.spotify_url },
			{ label: 'SOUNDCLOUD', url: release.soundcloud_url },
			{ label: 'YOUTUBE', url: release.youtube_url }
		].filter((l) => !!l.url)
	);
</script>

<div style="border:2px solid var(--tf-line-2);padding:20px;display:flex;flex-direction:column;gap:14px">
	{#if coverSrc}
		<img src={coverSrc} alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border:2px solid var(--tf-line-2)" />
	{:else}
		<div style="display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;border:2px solid var(--tf-line-2);background:var(--tf-bg-2)"></div>
	{/if}
	<span style="font-weight:900;font-size:18px;letter-spacing:-0.02em;line-height:1.15;overflow-wrap:anywhere">{release.track_name}</span>
	{#if artist}
		<span style="font-size:11px;letter-spacing:.12em;color:var(--tf-ink-3)">{artist.name}</span>
	{/if}
	{#if release.mix_engineer || release.master_engineer}
		<span style="font-size:10px;letter-spacing:.1em;color:var(--tf-ink-3)">
			{#if release.mix_engineer}MIX: {release.mix_engineer}{/if}{#if release.mix_engineer && release.master_engineer} · {/if}{#if release.master_engineer}MASTER: {release.master_engineer}{/if}
		</span>
	{/if}
	{#if description}
		<p style="margin:0;font-size:12px;line-height:1.6;color:var(--tf-ink-2)">{description}</p>
	{/if}
	{#if links.length}
		<div style="display:flex;flex-wrap:wrap;gap:2px;margin-top:auto">
			{#each links as l (l.label)}
				<a href={l.url} target="_blank" rel="noopener" class="tf-releaselink" style="border:2px solid var(--tf-accent);color:var(--tf-accent);padding:8px 12px;font-size:10px;letter-spacing:.14em;font-weight:800">{l.label}</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.tf-releaselink:hover {
		background: var(--tf-bg-3) !important;
	}
</style>
