<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import SideNav from '$lib/components/layout/SideNav.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { pickLocalized } from '$lib/utils/localized';
	import { assetUrl } from '$lib/utils/assets';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: Snippet } = $props();

	const title = $derived(pickLocalized(data.siteSettings, 'seo_title', data.lang) ?? data.siteSettings.site_name);
	const description = $derived(pickLocalized(data.siteSettings, 'seo_description', data.lang));
	const accent = $derived(data.siteSettings.accent_color || '#ff563c');
	const favicon = $derived(assetUrl(data.siteSettings.favicon) ?? '/brand/logo-tf-black.png');
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
</svelte:head>

<div id="tf-shell" style="display:flex;min-height:100vh;background:var(--tf-bg);--tf-accent:{accent}">
	<SideNav lang={data.lang} siteSettings={data.siteSettings} />
	<main id="tf-main" style="flex:1;min-width:0">
		{@render children()}
		<Footer lang={data.lang} siteSettings={data.siteSettings} socialGroups={data.socialGroups} />
	</main>
</div>
