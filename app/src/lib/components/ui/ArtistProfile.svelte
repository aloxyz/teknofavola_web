<script lang="ts">
	import { t, type Locale } from '$lib/i18n/dictionary';
	import { assetUrl } from '$lib/utils/assets';
	import { pickLocalized } from '$lib/utils/localized';
	import { PROFILE_TYPE_LABEL } from '$lib/config/profileTypes';
	import VideoEmbed from './VideoEmbed.svelte';
	import ContactForm from './ContactForm.svelte';
	import type { ArtistRecord, DjSetRecord } from '$lib/types/directus';

	let {
		lang,
		artist,
		djSets,
		djSetsError
	}: { lang: Locale; artist: ArtistRecord; djSets: DjSetRecord[]; djSetsError: boolean } = $props();

	const isDj = $derived(artist.profile_type === 'dj');
	const roleLabel = $derived(artist.profile_type ? PROFILE_TYPE_LABEL[artist.profile_type][lang] : t(lang, 'notAvailable'));
	const bio = $derived(pickLocalized(artist, 'bio', lang) ?? t(lang, 'bioEmpty'));
	const photoSrc = $derived(assetUrl(artist.photo, 'width=700&quality=85'));
	const workPhotos = $derived((artist.work_photos ?? []).slice(0, 3).map((w) => assetUrl(w.file, 'width=700&quality=85')));

	const socials = $derived(
		[
			{ platform: 'INSTAGRAM', url: artist.instagram_url },
			{ platform: 'SOUNDCLOUD', url: artist.soundcloud_url },
			{ platform: 'SPOTIFY', url: artist.spotify_url },
			{ platform: 'YOUTUBE', url: artist.youtube_url },
			{ platform: lang === 'it' ? 'ALTRO' : 'OTHER', url: artist.other_url }
		].filter((s) => !!s.url)
	);

	const bookingFieldLabels = $derived(
		lang === 'it'
			? ['NOME', 'EMAIL', 'TELEFONO', 'ARTISTA INTERESSATO', 'MESSAGGIO']
			: ['NAME', 'EMAIL', 'PHONE', 'ARTIST OF INTEREST', 'MESSAGE']
	);
	const prefillKey = $derived(lang === 'it' ? 'artista_interessato' : 'artist_of_interest');
</script>

{#key artist.id}
<div style="padding:clamp(24px,3vw,44px) clamp(24px,4vw,56px) 70px;min-width:0">
	<h2 style="margin:0;font-size:clamp(26px,5vw,68px);line-height:.96;letter-spacing:-0.04em;overflow-wrap:anywhere">{artist.name}</h2>
	<span style="display:inline-block;margin-top:12px;font-size:10px;letter-spacing:.18em;color:var(--tf-accent);border:2px solid var(--tf-accent);padding:5px 9px">{roleLabel}</span>

	{#if isDj}
		<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px;margin-top:30px">
			{#if photoSrc}
				<img src={photoSrc} alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border:2px solid var(--tf-line-2)" />
			{:else}
				<div style="display:flex;align-items:flex-end;aspect-ratio:4/5;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);padding:12px">
					<span style="font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3)">{t(lang, 'photoSlot')}</span>
				</div>
			{/if}
			<VideoEmbed url={artist.video_url} {lang} />
		</div>
	{:else}
		<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2px;margin-top:30px">
			{#each [0, 1, 2] as slotIdx (slotIdx)}
				{#if workPhotos[slotIdx]}
					<img src={workPhotos[slotIdx]} alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:4/5;object-fit:cover;border:2px solid var(--tf-line-2)" />
				{:else}
					<div style="display:flex;align-items:flex-end;aspect-ratio:4/5;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);padding:12px">
						<span style="font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3)">{t(lang, 'workSlot')} {String(slotIdx + 1).padStart(2, '0')}</span>
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<div style="margin-top:36px;border-top:2px solid var(--tf-line);padding-top:22px">
		<h3 style="margin:0 0 12px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'bio')}</h3>
		<p style="margin:0;font-size:15px;line-height:1.65;max-width:60ch;color:var(--tf-ink-2)">{bio}</p>
	</div>

	<div style="margin-top:30px;border-top:2px solid var(--tf-line);padding-top:22px">
		<h3 style="margin:0 0 14px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'social')}</h3>
		{#if socials.length}
			<div style="display:flex;flex-wrap:wrap;gap:2px">
				{#each socials as s (s.platform)}
					<a href={s.url} target="_blank" rel="noopener" class="tf-artistsocial" style="border:2px solid var(--tf-accent);color:var(--tf-accent);padding:9px 14px;font-size:10px;letter-spacing:.16em;font-weight:800">{s.platform}</a>
				{/each}
			</div>
		{:else}
			<span style="font-size:12px;color:var(--tf-ink-2)">{t(lang, 'socialsEmptyTitle')}</span>
		{/if}
	</div>

	{#if isDj}
		<div style="margin-top:30px;border-top:2px solid var(--tf-line);padding-top:22px">
			<h3 style="margin:0 0 16px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">DJ SET</h3>
			{#if djSetsError}
				<span style="font-size:12px;color:var(--tf-ink-2)">{t(lang, 'errorBody')}</span>
			{:else if djSets.length}
				{#each djSets as d (d.id)}
					<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:16px 0;border-bottom:1px solid var(--tf-line-2)">
						<span style="font-weight:900;font-size:17px;letter-spacing:-0.01em;color:var(--tf-ink-2)">{d.title}</span>
						{#if d.video_url}
							<a href={d.video_url} target="_blank" rel="noopener" style="margin-left:auto;font-size:9px;letter-spacing:.18em;color:var(--tf-accent)">{t(lang, 'open')} ↗</a>
						{:else}
							<span style="margin-left:auto;font-size:9px;letter-spacing:.18em;color:var(--tf-ink-3)">{t(lang, 'videoSlot')}</span>
						{/if}
					</div>
				{/each}
			{:else}
				<span style="display:block;font-size:12px;line-height:1.7;color:var(--tf-ink-2)">{t(lang, 'djSetsEmpty')}</span>
			{/if}
		</div>
	{/if}

	<ContactForm
		{lang}
		type="booking"
		title={t(lang, 'bookingFormTitle')}
		fieldLabels={bookingFieldLabels}
		prefill={{ [prefillKey]: artist.name }}
	/>
</div>
{/key}

<style>
	.tf-artistsocial:hover {
		background: var(--tf-bg-3) !important;
	}
</style>
