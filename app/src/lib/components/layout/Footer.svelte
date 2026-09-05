<script lang="ts">
	import Logo from './Logo.svelte';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import { pickLocalized } from '$lib/utils/localized';
	import { withUrl } from '$lib/utils/records';
	import { SOCIAL_FORMAT_LABEL } from '$lib/config/socialFormats';
	import type { SiteSettings } from '$lib/types/directus';
	import type { SocialGroup } from '$lib/server/api/social';

	let { lang, siteSettings, socialGroups }: { lang: Locale; siteSettings: SiteSettings; socialGroups: SocialGroup[] } =
		$props();

	const footerAbout = $derived(pickLocalized(siteSettings, 'footer_about', lang));
	const footerLegal = $derived(pickLocalized(siteSettings, 'footer_legal', lang));

	const footerSocials = $derived(
		socialGroups.flatMap((g) =>
			withUrl(g.links)
				.map((l) => ({
					label: `${l.platform} · ${SOCIAL_FORMAT_LABEL[g.format]} ↗`,
					href: l.url as string
				}))
		)
	);
</script>

<footer
	style="border-top:2px solid var(--tf-line);padding:clamp(30px,4vw,56px) clamp(24px,5vw,80px) 40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:32px 40px;align-items:start"
>
	<div style="display:flex;flex-direction:column;gap:14px">
		<Logo {siteSettings} variant="footer" />
		{#if footerAbout}
			<span style="font-size:11px;letter-spacing:.16em;color:var(--tf-ink-3);line-height:1.7;max-width:280px">{footerAbout}</span>
		{/if}
	</div>
	<div style="display:flex;flex-direction:column;gap:10px">
		<h2 style="margin:0;font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'footerContact')}</h2>
		<a href="mailto:{siteSettings.contact_email}" style="font-weight:800;font-size:13px;color:var(--tf-ink);word-break:break-all" class="tf-footer-link">{siteSettings.contact_email}</a>
		{#each footerSocials as s (s.label)}
			<a href={s.href} target="_blank" rel="noopener" style="font-size:11px;letter-spacing:.12em;font-weight:800;color:var(--tf-accent);overflow-wrap:anywhere">{s.label}</a>
		{/each}
	</div>
	<div style="display:flex;flex-direction:column;gap:10px">
		<h2 style="margin:0;font-size:9px;letter-spacing:.2em;color:var(--tf-ink-3);font-weight:800">{t(lang, 'footerLegal')}</h2>
		<span style="font-size:11px;letter-spacing:.06em;color:var(--tf-ink-2);line-height:1.7">© {new Date().getFullYear()} TEKNOFAVOLA — {t(lang, 'rights')}</span>
		{#if footerLegal}
			<span style="font-size:11px;letter-spacing:.06em;color:var(--tf-ink-3);line-height:1.7">{footerLegal}</span>
		{/if}
	</div>
</footer>

<style>
	.tf-footer-link:hover {
		color: var(--tf-accent) !important;
	}
</style>
