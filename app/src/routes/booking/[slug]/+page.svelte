<script lang="ts">
	import BookingView from '$lib/components/views/BookingView.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	{#if data.activeArtist}
		<title>{data.activeArtist.name} — BOOKING · TEKNOFAVOLA</title>
	{/if}
</svelte:head>

<BookingView
	lang={data.lang}
	artists={data.artists}
	activeArtist={data.activeArtist}
	djSets={data.djSets}
	djSetsError={data.djSetsError}
	error={data.error}
	contactEmail={data.siteSettings.contact_email}
/>
