<script lang="ts">
	import FavoleView from '$lib/components/views/FavoleView.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#if data.openEvent}
		<title>{data.openEvent.title} — TEKNOFAVOLA</title>
	{/if}
</svelte:head>

<FavoleView
	lang={data.lang}
	upcoming={data.upcoming}
	past={data.past}
	error={data.error}
	contactEmail={data.siteSettings.contact_email}
	openEvent={data.openEvent}
	openEventIndex={data.openEventIndex}
/>
