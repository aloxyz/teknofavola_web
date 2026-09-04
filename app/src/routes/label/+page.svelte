<script lang="ts">
	import ComingSoonView from '$lib/components/views/ComingSoonView.svelte';
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import ReleaseCard from '$lib/components/ui/ReleaseCard.svelte';
	import { SOON, t } from '$lib/i18n/dictionary';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const soon = $derived(SOON.label[data.lang]);
	const channels = $derived(
		(data.socialGroups.find((g) => g.format === 'fable_label')?.links ?? []).filter((l) => !!l.url)
	);
</script>

{#if data.error}
	<ErrorBlock lang={data.lang} email={data.siteSettings.contact_email} />
{:else if data.releases.length > 0}
	<div>
		<PageTitle kicker={soon.kicker} titleLines={[soon.titleA, soon.titleB]} intro={t(data.lang, 'labelActiveIntro')} />
		<div style="padding:clamp(24px,4vw,56px) clamp(24px,5vw,80px);display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
			{#each data.releases as release (release.id)}
				<ReleaseCard {release} lang={data.lang} />
			{/each}
		</div>
	</div>
{:else}
	<ComingSoonView
		lang={data.lang}
		kicker={soon.kicker}
		titleA={soon.titleA}
		titleB={soon.titleB}
		intro={soon.intro}
		structureHint={soon.structureHint}
		blocks={soon.blocks}
		{channels}
		formType="label_demo"
		formTitle={soon.formTitle}
		formFields={soon.fields}
		error={data.error}
		contactEmail={data.siteSettings.contact_email}
	/>
{/if}
