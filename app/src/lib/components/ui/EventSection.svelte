<script lang="ts">
	import EventCard from './EventCard.svelte';
	import StateNotice from './StateNotice.svelte';
	import type { EventRecord } from '$lib/types/directus';
	import type { Locale } from '$lib/i18n/dictionary';

	let {
		heading,
		count,
		events,
		emptyTitle,
		emptyBody,
		lang
	}: {
		heading: string;
		count: number;
		events: EventRecord[];
		emptyTitle: string;
		emptyBody: string;
		lang: Locale;
	} = $props();
</script>

<div style="display:flex;align-items:baseline;justify-content:space-between;gap:20px;flex-wrap:wrap;padding:26px clamp(24px,5vw,80px) 18px;border-bottom:2px solid var(--tf-line)">
	<h2 style="margin:0;font-size:clamp(20px,2.6vw,34px);letter-spacing:-0.025em">{heading}</h2>
	<span style="font-size:10px;letter-spacing:.16em;color:var(--tf-ink-3)">{count}</span>
</div>
<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:0;border-bottom:2px solid var(--tf-line)">
	{#each events as event, i (event.id)}
		<EventCard {event} index={i} {lang} />
	{/each}
	{#if events.length === 0}
		<StateNotice title={emptyTitle} body={emptyBody} wide />
	{/if}
</div>
