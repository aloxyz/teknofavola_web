<script lang="ts">
	import Logo from '$lib/components/layout/Logo.svelte';
	import SocialGroupList from '$lib/components/ui/SocialGroupList.svelte';
	import { t } from '$lib/i18n/dictionary';
	import { pickLocalized } from '$lib/utils/localized';
	import { assetUrl } from '$lib/utils/assets';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const heroVideoSrc = $derived(assetUrl(data.siteSettings.hero_bg_video));
	const tagline = $derived(data.lang === 'it' ? data.siteSettings.tagline_it : data.siteSettings.tagline_en);
	const bioHeading = $derived(data.lang === 'it' ? data.siteSettings.bio_heading_it : data.siteSettings.bio_heading_en);
	const bioParagraph = $derived(pickLocalized(data.siteSettings, 'bio_paragraph', data.lang) ?? t(data.lang, 'bioParagraphPlaceholder'));
</script>

<div>
	<section
		style="container-type:inline-size;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;padding:64px 32px;overflow:hidden;border-bottom:2px solid var(--tf-line);position:relative"
	>
		<h1 class="tf-sr">TEKNOFAVOLA</h1>
		{#if heroVideoSrc}
			<video
				class="tf-hero-video"
				src={heroVideoSrc}
				autoplay
				muted
				loop
				playsinline
				aria-hidden="true"
				style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0"
			></video>
			<div aria-hidden="true" style="position:absolute;inset:0;background:rgba(11,11,11,.55);z-index:0"></div>
		{/if}
		<div style="position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:26px">
			<Logo siteSettings={data.siteSettings} variant="hero" />
			{#if tagline}
				<p
					class="tf-tagline"
					style="margin:0;max-width:100%;display:flex;align-items:center;justify-content:center;gap:.3em;white-space:nowrap;font-weight:900;font-size:clamp(10px,3cqw,40px);line-height:1.15;letter-spacing:-0.02em"
				>
					<span style="font-size:14px">{tagline}</span>
				</p>
			{/if}
		</div>
		<span style="position:absolute;z-index:1;left:0;right:0;bottom:26px;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none">
			<span style="font-size:13px;letter-spacing:.28em;font-weight:800;color:var(--tf-ink-2);animation:tfBob 1.9s ease-in-out infinite">{t(data.lang, 'scroll')}</span>
			<span aria-hidden="true" style="font-size:26px;line-height:1;color:var(--tf-ink-2);animation:tfBob 1.9s ease-in-out .12s infinite">↓</span>
		</span>
	</section>

	<section style="padding:clamp(40px,7vw,96px) clamp(24px,5vw,80px);border-bottom:2px solid var(--tf-line)">
		<h2 style="margin:0 0 26px;font-size:10px;letter-spacing:.28em;color:var(--tf-accent);font-weight:800">{t(data.lang, 'bioKicker')}</h2>
		{#if bioHeading}
			<p style="margin:0;font-weight:800;font-size:clamp(30px,4.6vw,68px);line-height:1.04;letter-spacing:-0.03em;max-width:20ch;text-wrap:pretty;color:var(--tf-ink)">{bioHeading}</p>
		{/if}
		<p style="margin:34px 0 0;font-size:clamp(15px,1.5vw,20px);line-height:1.7;max-width:62ch;text-wrap:pretty;color:var(--tf-ink-2)">{bioParagraph}</p>
		<a href="/chi-siamo" class="tf-aboutlink" style="display:inline-block;margin-top:24px;font-size:12px;letter-spacing:.16em;font-weight:800;color:var(--tf-accent)">{t(data.lang, 'aboutMoreLink')}</a>
	</section>

	<section style="padding:clamp(36px,5vw,72px) clamp(24px,5vw,80px);border-bottom:2px solid var(--tf-line)">
		<h2 style="margin:0 0 18px;font-size:10px;letter-spacing:.28em;color:var(--tf-ink-3);font-weight:800">{t(data.lang, 'contactKicker')}</h2>
		<a
			href="mailto:{data.siteSettings.contact_email}"
			class="tf-bigmail"
			style="display:block;max-width:100%;font-weight:900;font-size:clamp(20px,5.4vw,84px);line-height:1;letter-spacing:-0.04em;color:var(--tf-ink);word-break:break-word"
		>{data.siteSettings.contact_email}</a>
	</section>

	<section style="padding:clamp(36px,5vw,72px) clamp(24px,5vw,80px) 0">
		<div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:24px">
			<h2 style="margin:0;font-size:clamp(22px,2.6vw,38px);letter-spacing:-0.02em">{t(data.lang, 'socialTitle')}</h2>
		</div>
	</section>
	<SocialGroupList lang={data.lang} groups={data.socialGroups} contactEmail={data.siteSettings.contact_email} />
</div>

<style>
	.tf-bigmail:hover {
		color: var(--tf-accent) !important;
	}
	.tf-aboutlink:hover {
		color: var(--tf-accent-hi) !important;
	}
	@media (prefers-reduced-motion: reduce) {
		.tf-hero-video {
			display: none;
		}
	}
</style>
