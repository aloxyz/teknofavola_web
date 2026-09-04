<script lang="ts">
	import { page } from '$app/stores';
	import Logo from './Logo.svelte';
	import LangSwitch from './LangSwitch.svelte';
	import { NAV } from '$lib/config/nav';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { SiteSettings } from '$lib/types/directus';

	let { lang, siteSettings }: { lang: Locale; siteSettings: SiteSettings } = $props();

	let open = $state(false);

	$effect(() => {
		// Close the mobile menu whenever the route changes.
		$page.url.pathname;
		open = false;
	});

	const collectiveTag = $derived(lang === 'it' ? siteSettings.collective_tag_it : siteSettings.collective_tag_en);

	function isCurrent(path: string) {
		const here = $page.url.pathname;
		return here === path || (path !== '/' && here.startsWith(path + '/'));
	}
</script>

<aside
	id="tf-side"
	data-open={open ? '1' : '0'}
	style="width:296px;flex:none;border-right:2px solid var(--tf-line);display:flex;flex-direction:column;gap:28px;padding:26px 22px 22px;position:sticky;top:0;height:100vh;background:var(--tf-bg)"
>
	<div style="display:flex;align-items:center;gap:12px">
		<a href="/" style="border:0;background:transparent;padding:0;display:block;width:64px;flex:none" aria-label="TeknoFavola — home">
			<Logo {siteSettings} variant="sidebar" />
		</a>
		<div style="display:flex;flex-direction:column;gap:2px;min-width:0">
			<span style="font-weight:900;font-size:15px;letter-spacing:-0.01em;line-height:1">TEKNOFAVOLA</span>
			{#if collectiveTag}
				<span style="font-size:9px;letter-spacing:0.18em;color:var(--tf-ink-3);line-height:1.3">{collectiveTag}</span>
			{/if}
		</div>
		<button
			id="tf-burger"
			type="button"
			onclick={() => (open = !open)}
			aria-controls="tf-nav"
			aria-expanded={open}
			class="tf-burger-btn"
			style="display:none;margin-left:auto;border:2px solid var(--tf-line);background:transparent;color:var(--tf-ink);width:44px;height:44px;align-items:center;justify-content:center;cursor:pointer;font-size:13px"
		>
			<span class="tf-sr">{t(lang, 'menu')}</span>☰
		</button>
	</div>

	<nav id="tf-nav" aria-label={t(lang, 'menu')} style="display:flex;flex-direction:column;border-top:2px solid var(--tf-line)">
		{#each NAV as item (item.key)}
			<a
				href={item.path}
				aria-current={isCurrent(item.path) ? 'page' : undefined}
				class="tf-navitem"
				style="color:{isCurrent(item.path) ? 'var(--tf-accent)' : 'var(--tf-ink)'}"
			>
				<span style="display:block;font-size:9px;letter-spacing:.16em;color:var(--tf-ink-3);margin-bottom:4px">{item.num}</span>
				{item.label}
			</a>
		{/each}
	</nav>

	<div id="tf-sidefoot" style="margin-top:auto;display:flex;flex-direction:column;gap:14px;border-top:2px solid var(--tf-line);padding-top:16px">
		<LangSwitch {lang} />
		<a href="mailto:{siteSettings.contact_email}" style="font-size:12px;color:var(--tf-ink-2);letter-spacing:.01em;word-break:break-all">{siteSettings.contact_email}</a>
	</div>
</aside>

<style>
	.tf-navitem {
		display: block;
		text-align: left;
		width: 100%;
		border: 0;
		border-bottom: 1px solid var(--tf-line-2);
		background: transparent;
		cursor: pointer;
		padding: 15px 0;
		font-family: inherit;
		font-weight: 800;
		font-size: 15px;
		letter-spacing: -0.01em;
		line-height: 1.1;
	}
	.tf-navitem:hover {
		color: var(--tf-accent-hi) !important;
	}
</style>
