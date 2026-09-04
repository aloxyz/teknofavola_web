<script lang="ts">
	import BookingView from '$lib/components/views/BookingView.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<BookingView
	lang={data.lang}
	artists={data.artists}
	activeArtist={data.activeArtist}
	djSets={data.djSets}
	djSetsError={data.djSetsError}
	error={data.error}
	contactEmail={data.siteSettings.contact_email}
/>
