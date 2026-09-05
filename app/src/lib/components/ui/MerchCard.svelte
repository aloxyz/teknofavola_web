<script lang="ts">
	import { assetUrl } from '$lib/utils/assets';
	import { pickLocalized } from '$lib/utils/localized';
	import { t } from '$lib/i18n/dictionary';
	import type { MerchItemRecord } from '$lib/types/directus';
	import type { Locale } from '$lib/i18n/dictionary';

	let { item, lang, onRequest }: { item: MerchItemRecord; lang: Locale; onRequest: () => void } = $props();

	const photoSrc = $derived(assetUrl(item.photo, 'width=600&quality=85'));
	const description = $derived(pickLocalized(item, 'description', lang));
</script>

<div style="border:2px solid var(--tf-line-2);padding:20px;display:flex;flex-direction:column;gap:14px">
	{#if photoSrc}
		<img src={photoSrc} alt="" loading="lazy" style="display:block;width:100%;aspect-ratio:1/1;object-fit:cover;border:2px solid var(--tf-line-2)" />
	{:else}
		<div style="display:flex;align-items:center;justify-content:center;aspect-ratio:1/1;border:2px solid var(--tf-line-2);background:var(--tf-bg-2)"></div>
	{/if}
	<span style="font-weight:900;font-size:18px;letter-spacing:-0.02em;line-height:1.15;overflow-wrap:anywhere">{item.name}</span>
	{#if item.price}
		<span style="font-size:11px;letter-spacing:.12em;color:var(--tf-ink-3)">{item.price}</span>
	{/if}
	{#if description}
		<p style="margin:0;font-size:12px;line-height:1.6;color:var(--tf-ink-2)">{description}</p>
	{/if}
	<button
		type="button"
		onclick={onRequest}
		class="tf-merchlink"
		style="margin-top:auto;border:2px solid var(--tf-accent);background:transparent;color:var(--tf-accent);padding:8px 12px;font-size:10px;letter-spacing:.14em;font-weight:800;align-self:flex-start;cursor:pointer"
	>
		{t(lang, 'request')} →
	</button>
</div>

<style>
	.tf-merchlink:hover {
		background: var(--tf-bg-3) !important;
	}
</style>
