<script lang="ts">
	import OnceUponATimeView from '$lib/components/views/OnceUponATimeView.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<OnceUponATimeView
	lang={data.lang}
	episodes={data.episodes}
	activeEpisode={data.activeEpisode}
	error={data.error}
	contactEmail={data.siteSettings.contact_email}
/>
