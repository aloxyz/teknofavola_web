<script lang="ts">
	import { parseVideoEmbed } from '$lib/utils/video';
	import { t, type Locale } from '$lib/i18n/dictionary';

	let { url, lang }: { url: string | null | undefined; lang: Locale } = $props();

	const embed = $derived(parseVideoEmbed(url));
</script>

{#if embed}
	<div style="position:relative;aspect-ratio:16/9;border:2px solid var(--tf-line-2);background:#000">
		<iframe
			src={embed.embedUrl}
			title="video"
			loading="lazy"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			style="position:absolute;inset:0;width:100%;height:100%;border:0"
		></iframe>
	</div>
{:else if url}
	<a
		href={url}
		target="_blank"
		rel="noopener"
		style="display:flex;align-items:center;justify-content:center;aspect-ratio:4/5;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);font-size:11px;letter-spacing:.16em;color:var(--tf-accent);text-align:center;padding:12px"
	>{t(lang, 'open')} ↗</a>
{:else}
	<div style="display:flex;align-items:center;justify-content:center;aspect-ratio:4/5;border:2px solid var(--tf-line-2);background:var(--tf-bg-2);font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3);text-align:center;padding:12px">{t(lang, 'videoSlot')}</div>
{/if}
