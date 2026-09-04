<script lang="ts">
	import { assetUrl } from '$lib/utils/assets';
	import { formatEventDate } from '$lib/utils/date';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { EventRecord } from '$lib/types/directus';

	let { event, index, lang }: { event: EventRecord; index: number; lang: Locale } = $props();

	const dateLabel = $derived(formatEventDate(event.event_date, lang) ?? t(lang, 'noDate'));
	const flyerSrc = $derived(assetUrl(event.flyer, 'width=600&quality=85'));
</script>

<a
	href="/favole/{event.slug}"
	class="tf-eventcard"
	style="display:flex;flex-direction:column;gap:14px;text-align:left;padding:22px;border:0;border-right:2px solid var(--tf-line);border-bottom:2px solid var(--tf-line);color:var(--tf-ink);min-width:0"
>
	<span style="display:flex;align-items:baseline;justify-content:space-between;gap:10px;font-size:10px;letter-spacing:.16em;color:var(--tf-ink-3)">
		<span>FAVOLA {String(index + 1).padStart(2, '0')}</span>
		<span style="color:var(--tf-accent);font-size:10px;letter-spacing:.16em">{dateLabel}</span>
	</span>
	{#if flyerSrc}
		<img src={flyerSrc} alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1.35;object-fit:cover;border:2px solid var(--tf-line-2)" />
	{:else}
		<span style="display:flex;align-items:center;justify-content:center;aspect-ratio:1/1.35;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3);text-align:center;padding:12px">{t(lang, 'flyerSlot')}</span>
	{/if}
	<span style="display:block;font-weight:900;font-size:19px;line-height:1.1;letter-spacing:-0.02em;overflow-wrap:anywhere">{event.title}</span>
	<span style="display:block;font-size:10px;letter-spacing:.16em;color:var(--tf-accent)">{t(lang, 'openEvent')} →</span>
</a>

<style>
	.tf-eventcard:hover {
		background: var(--tf-bg-3);
		color: var(--tf-ink);
	}
</style>
