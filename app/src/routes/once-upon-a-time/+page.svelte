<script lang="ts">
	import OnceUponATimeView from '$lib/components/views/OnceUponATimeView.svelte';
	import ComingSoonView from '$lib/components/views/ComingSoonView.svelte';
	import { SOON } from '$lib/i18n/dictionary';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const soon = $derived(SOON.once[data.lang]);
	const channels = $derived(
		(data.socialGroups.find((g) => g.format === 'once_upon_a_time')?.links ?? []).filter((l) => !!l.url)
	);
</script>

{#if !data.error && data.episodes.length > 0}
	<OnceUponATimeView lang={data.lang} episodes={data.episodes} error={data.error} contactEmail={data.siteSettings.contact_email} />
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
		formType="once_upon_a_time"
		formTitle={soon.formTitle}
		formFields={soon.fields}
		error={data.error}
		contactEmail={data.siteSettings.contact_email}
	/>
{/if}
