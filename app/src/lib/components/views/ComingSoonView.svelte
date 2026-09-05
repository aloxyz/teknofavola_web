<script lang="ts">
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { SocialLinkRecord, SubmissionType } from '$lib/types/directus';

	interface Block {
		tag: string;
		title: string;
		body: string;
		foot: string;
	}

	let {
		lang,
		kicker,
		titleA,
		titleB,
		intro,
		structureHint,
		blocks,
		channels,
		formType,
		formTitle,
		formFields,
		error,
		contactEmail
	}: {
		lang: Locale;
		kicker: string;
		titleA: string;
		titleB: string;
		intro: string;
		structureHint: string;
		blocks: Block[];
		channels: SocialLinkRecord[];
		formType: SubmissionType;
		formTitle: string;
		formFields: string[];
		error: boolean;
		contactEmail: string;
	} = $props();

	// Defensive: callers already filter to channels with a url, but this
	// component shouldn't rely on that to avoid ever rendering a bare href.
	const safeChannels = $derived(channels.filter((c) => !!c.url));
</script>

{#if error}
	<ErrorBlock {lang} email={contactEmail} />
{:else}
	<div>
		<header style="padding:clamp(36px,6vw,88px) clamp(24px,5vw,80px) 30px;border-bottom:2px solid var(--tf-line)">
			<span class="tf-kicker" style="display:block;margin-bottom:18px">{kicker}</span>
			<h1 style="margin:0;font-size:clamp(32px,6.6vw,96px);line-height:.94;letter-spacing:-0.04em">{titleA}<br />{titleB}</h1>
			<p style="margin:24px 0 0;font-size:13px;line-height:1.7;max-width:56ch;color:var(--tf-ink-2)">{intro}</p>
		</header>

		<section style="padding:clamp(44px,8vw,120px) clamp(24px,5vw,80px);border-bottom:2px solid var(--tf-line);background:var(--tf-accent);color:var(--tf-bg)">
			<h2 style="margin:0 0 18px;font-size:10px;letter-spacing:.28em;font-weight:800">{t(lang, 'status')}</h2>
			<p style="margin:0;font-weight:900;font-size:clamp(44px,11vw,180px);line-height:.86;letter-spacing:-0.05em">{t(lang, 'comingSoonWord1')}<br />{t(lang, 'comingSoonWord2')}</p>
		</section>

		<section style="padding:clamp(30px,4vw,56px) clamp(24px,5vw,80px);border-bottom:2px solid var(--tf-line)">
			<h2 class="tf-subheading" style="margin:0 0 20px;font-size:10px">{t(lang, 'channels')}</h2>
			{#if safeChannels.length}
				<div style="display:flex;flex-wrap:wrap;gap:2px">
					{#each safeChannels as c (c.id)}
						<a href={c.url} target="_blank" rel="noopener" class="tf-pill-link" style="border-color:var(--tf-accent);color:var(--tf-accent);padding:12px 16px;font-size:11px;letter-spacing:.16em">{c.platform}</a>
					{/each}
				</div>
			{:else}
				<span style="font-size:12px;color:var(--tf-ink-2)">{t(lang, 'socialsEmptyTitle')}</span>
			{/if}
		</section>

		<section style="padding:clamp(30px,4vw,56px) clamp(24px,5vw,80px)">
			<h2 style="margin:0 0 8px;font-size:clamp(22px,2.8vw,40px);letter-spacing:-0.025em">{t(lang, 'futureStructure')}</h2>
			<p style="margin:0 0 26px;font-size:12px;line-height:1.7;color:var(--tf-ink-2);max-width:56ch">{structureHint}</p>
			{#if blocks.length}
				<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:2px">
					{#each blocks as b (b.tag)}
						<div style="border:2px solid var(--tf-line-2);padding:20px;display:flex;flex-direction:column;gap:12px;min-height:186px">
							<span style="font-size:9px;letter-spacing:.2em;color:var(--tf-accent)">{b.tag}</span>
							<h3 style="margin:0;font-weight:900;font-size:19px;letter-spacing:-0.02em;line-height:1.15;text-wrap:pretty">{b.title}</h3>
							<span style="font-size:12px;line-height:1.6;color:var(--tf-ink-2)">{b.body}</span>
							<span style="margin-top:auto;font-size:9px;letter-spacing:.18em;color:var(--tf-ink-3)">{b.foot}</span>
						</div>
					{/each}
				</div>
			{/if}
			<ContactForm {lang} type={formType} title={formTitle} fieldLabels={formFields} variant="bordered-top" />
		</section>
	</div>
{/if}
