<script lang="ts">
	import ArtistIndex from '$lib/components/ui/ArtistIndex.svelte';
	import ArtistProfile from '$lib/components/ui/ArtistProfile.svelte';
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { ArtistRecord, DjSetRecord } from '$lib/types/directus';

	let {
		lang,
		artists,
		activeArtist,
		djSets,
		djSetsError,
		error,
		contactEmail
	}: {
		lang: Locale;
		artists: ArtistRecord[];
		activeArtist: ArtistRecord | null;
		djSets: DjSetRecord[];
		djSetsError: boolean;
		error: boolean;
		contactEmail: string;
	} = $props();
</script>

{#if error}
	<ErrorBlock {lang} email={contactEmail} />
{:else}
	<div>
		<header style="padding:clamp(36px,6vw,80px) clamp(24px,5vw,80px) 34px;border-bottom:2px solid var(--tf-line)">
			<span style="display:block;font-size:10px;letter-spacing:.28em;color:var(--tf-accent);margin-bottom:16px">{t(lang, 'bookingKicker')}</span>
			<h1 style="margin:0;font-size:clamp(20px,6.6vw,72px);line-height:.95;letter-spacing:-0.045em">
				<a href="mailto:{contactEmail}" class="tf-bigmail" style="display:block;max-width:100%;font-weight:900;color:var(--tf-ink);word-break:break-word">{contactEmail}</a>
			</h1>
			<p style="margin:26px 0 0;font-size:13px;line-height:1.7;max-width:52ch;color:var(--tf-ink-2)">{t(lang, 'bookingIntro')}</p>
		</header>
		<div id="tf-booking" style="display:grid;grid-template-columns:minmax(240px,340px) 1fr;align-items:start">
			<ArtistIndex {lang} {artists} activeSlug={activeArtist?.slug} />
			{#if activeArtist}
				<ArtistProfile {lang} artist={activeArtist} {djSets} {djSetsError} />
			{:else}
				<div style="padding:clamp(24px,3vw,44px) clamp(24px,4vw,56px)">
					<span style="font-size:12px;color:var(--tf-ink-2)">{t(lang, 'artistsEmptyBody')}</span>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.tf-bigmail:hover {
		color: var(--tf-accent) !important;
	}
</style>
