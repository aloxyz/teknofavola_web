<script lang="ts">
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import VideoEmbed from '$lib/components/ui/VideoEmbed.svelte';
	import EpisodeCard from '$lib/components/ui/EpisodeCard.svelte';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import { pickLocalized } from '$lib/utils/localized';
	import type { ArtistRecord, DjSetRecord } from '$lib/types/directus';

	let {
		lang,
		episodes,
		activeEpisode = null,
		error,
		contactEmail
	}: {
		lang: Locale;
		episodes: DjSetRecord[];
		activeEpisode?: DjSetRecord | null;
		error: boolean;
		contactEmail: string;
	} = $props();

	const artist = $derived(
		activeEpisode && typeof activeEpisode.artist !== 'string' ? (activeEpisode.artist as ArtistRecord) : null
	);
	const bio = $derived(artist ? (pickLocalized(artist, 'bio', lang) ?? t(lang, 'bioEmpty')) : '');
</script>

{#if error}
	<ErrorBlock {lang} email={contactEmail} />
{:else if activeEpisode}
	<div>
		<header style="padding:clamp(36px,6vw,88px) clamp(24px,5vw,80px) 28px;border-bottom:2px solid var(--tf-line)">
			<a href="/once-upon-a-time" class="tf-back" style="display:inline-block;margin-bottom:16px;font-size:10px;letter-spacing:.2em;color:var(--tf-accent)">← ONCE UPON A TIME</a>
			<h1 style="margin:0;font-size:clamp(28px,5.6vw,76px);line-height:.96;letter-spacing:-0.035em;overflow-wrap:anywhere">
				#{String(activeEpisode.episode_number ?? 0).padStart(2, '0')} ONCE UPON A TIME{#if artist} — {artist.name}{/if}{#if activeEpisode.genre} — {activeEpisode.genre}{/if}
			</h1>
		</header>
		<div style="padding:clamp(24px,4vw,56px) clamp(24px,5vw,80px);display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;align-items:start">
			<VideoEmbed url={activeEpisode.video_url} {lang} />
			{#if artist}
				<div style="display:flex;flex-direction:column;gap:20px">
					<div>
						<h3 style="margin:0 0 10px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'bio')}</h3>
						<p style="margin:0;font-size:14px;line-height:1.7;color:var(--tf-ink-2)">{bio}</p>
					</div>
					<a href="/booking/{artist.slug}" style="font-size:11px;letter-spacing:.16em;font-weight:800;color:var(--tf-accent)">BOOKING → {artist.name}</a>
				</div>
			{/if}
		</div>
	</div>
{:else}
	<div>
		<PageTitle kicker="03 / {t(lang, 'onceEpisodesKicker')}" titleLines={['ONCE UPON', 'A TIME']} intro={t(lang, 'latestFirst')} />
		<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:0;border-bottom:2px solid var(--tf-line)">
			{#each episodes as ep (ep.id)}
				<EpisodeCard episode={ep} {lang} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.tf-back:hover {
		color: var(--tf-accent-hi) !important;
	}
</style>
