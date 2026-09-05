<script lang="ts">
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import { pickLocalized } from '$lib/utils/localized';
	import { t } from '$lib/i18n/dictionary';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const title = $derived(
		(data.lang === 'it' ? data.aboutPage?.title_it : data.aboutPage?.title_en) || t(data.lang, 'bioKicker')
	);
	const sections = $derived(
		(data.aboutPage?.sections ?? []).filter(
			(s) => pickLocalized(s, 'heading', data.lang) || pickLocalized(s, 'body', data.lang)
		)
	);
</script>

{#if data.error}
	<ErrorBlock lang={data.lang} email={data.siteSettings.contact_email} />
{:else}
	<div>
		<PageTitle kicker={t(data.lang, 'aboutKicker')} titleLines={[title]} />
		<div style="padding:clamp(40px,6vw,72px) clamp(24px,5vw,80px) clamp(56px,8vw,104px);display:flex;flex-direction:column;gap:clamp(32px,5vw,56px);max-width:78ch">
			{#if sections.length}
				{#each sections as section, i (i)}
					{@const heading = pickLocalized(section, 'heading', data.lang)}
					{@const body = pickLocalized(section, 'body', data.lang)}
					<div>
						{#if heading}
							<h2 style="margin:0 0 16px;font-size:clamp(20px,2.6vw,32px);letter-spacing:-0.02em;color:var(--tf-ink)">{heading}</h2>
						{/if}
						{#if body}
							<p style="margin:0;font-size:15px;line-height:1.75;color:var(--tf-ink-2)">{body}</p>
						{/if}
					</div>
				{/each}
			{:else}
				<p style="margin:0;font-size:14px;line-height:1.7;color:var(--tf-ink-2)">{t(data.lang, 'aboutBodyEmpty')}</p>
			{/if}
		</div>
	</div>
{/if}
