<script lang="ts">
	import { goto } from '$app/navigation';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import { assetUrl } from '$lib/utils/assets';
	import { formatEventDate } from '$lib/utils/date';
	import { pickLocalized } from '$lib/utils/localized';
	import type { EventRecord } from '$lib/types/directus';

	let {
		event,
		index,
		lang,
		backHref
	}: { event: EventRecord; index: number; lang: Locale; backHref: string } = $props();

	let closeBtn: HTMLAnchorElement | undefined = $state();

	$effect(() => {
		closeBtn?.focus();
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') goto(backHref);
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	});

	const dateLabel = $derived(formatEventDate(event.event_date, lang) ?? t(lang, 'noDate'));
	const flyerSrc = $derived(assetUrl(event.flyer, 'width=900&quality=88'));
	const description = $derived(pickLocalized(event, 'description', lang) ?? t(lang, 'descEmpty'));
	const gallery = $derived(
		(event.gallery ?? [])
			.map((g) => assetUrl(g.file, 'width=500&quality=80'))
			.filter((src): src is string => !!src)
	);

	const meta = $derived([
		{ label: t(lang, 'date'), value: dateLabel, href: undefined as string | undefined },
		{ label: 'INSTAGRAM', value: event.instagram_url ? t(lang, 'open') : t(lang, 'notAvailable'), href: event.instagram_url ?? undefined },
		{ label: 'YOUTUBE', value: event.youtube_url ? t(lang, 'open') : t(lang, 'notAvailable'), href: event.youtube_url ?? undefined },
		{ label: t(lang, 'venue'), value: event.venue || '—', href: undefined as string | undefined }
	]);
</script>

<div style="position:fixed;inset:0;z-index:80;background:rgba(11,11,11,.94);display:flex;justify-content:flex-end">
	<div
		class="tf-drawer"
		role="dialog"
		aria-modal="true"
		aria-label={event.title}
		style="width:min(620px,100%);height:100%;overflow:auto;background:var(--tf-bg);border-left:2px solid var(--tf-line);padding:clamp(22px,3vw,40px)"
	>
		<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:20px">
			<span style="font-size:10px;letter-spacing:.2em;color:var(--tf-accent)">FAVOLA {String(index + 1).padStart(2, '0')} / {t(lang, 'event')}</span>
			<a
				bind:this={closeBtn}
				href={backHref}
				class="tf-drawer-close"
				style="border:2px solid var(--tf-line);background:transparent;color:var(--tf-ink);width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:14px;flex:none"
			>
				<span class="tf-sr">{t(lang, 'close')}</span>✕
			</a>
		</div>
		<h2 style="margin:18px 0 0;font-size:clamp(24px,4.2vw,52px);line-height:.98;letter-spacing:-0.035em;overflow-wrap:anywhere">{event.title}</h2>
		{#if flyerSrc}
			<img src={flyerSrc} alt="" style="display:block;width:100%;aspect-ratio:1/1.35;object-fit:cover;border:2px solid var(--tf-line-2);margin-top:24px" />
		{:else}
			<div style="display:flex;align-items:center;justify-content:center;aspect-ratio:1/1.35;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);margin-top:24px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);text-align:center;padding:16px">{t(lang, 'flyerSlot')}</div>
		{/if}
		<div style="margin-top:26px;display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:2px">
			{#each meta as m (m.label)}
				<div style="border:2px solid var(--tf-line-2);padding:14px;display:flex;flex-direction:column;gap:6px">
					<span style="font-size:9px;letter-spacing:.18em;color:var(--tf-ink-3)">{m.label}</span>
					{#if m.href}
						<a href={m.href} target="_blank" rel="noopener" style="font-size:12px;color:var(--tf-accent);overflow-wrap:anywhere">{m.value}</a>
					{:else}
						<span style="font-size:12px;color:var(--tf-ink-2);overflow-wrap:anywhere">{m.value}</span>
					{/if}
				</div>
			{/each}
		</div>
		<div style="margin-top:26px;border-top:2px solid var(--tf-line);padding-top:20px">
			<h3 style="margin:0 0 10px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'description')}</h3>
			<p style="margin:0;font-size:14px;line-height:1.7;color:var(--tf-ink-2)">{description}</p>
		</div>
		{#if gallery.length}
			<div style="margin-top:26px;border-top:2px solid var(--tf-line);padding-top:20px;padding-bottom:40px">
				<h3 style="margin:0 0 14px;font-size:10px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'gallery')}</h3>
				<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2px">
					{#each gallery as src (src)}
						<img {src} alt="" loading="lazy" style="aspect-ratio:1/1;object-fit:cover;border:2px solid var(--tf-line-2)" />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.tf-drawer-close:hover {
		border-color: var(--tf-accent) !important;
		color: var(--tf-accent) !important;
	}
</style>
