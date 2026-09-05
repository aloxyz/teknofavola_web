<script lang="ts">
	import FavoleView from '$lib/components/views/FavoleView.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<FavoleView
	lang={data.lang}
	upcoming={data.upcoming}
	past={data.past}
	error={data.error}
	contactEmail={data.siteSettings.contact_email}
	openEvent={data.openEvent}
	openEventIndex={data.openEventIndex}
/>
