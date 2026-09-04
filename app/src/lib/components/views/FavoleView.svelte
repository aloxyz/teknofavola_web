<script lang="ts">
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import EventSection from '$lib/components/ui/EventSection.svelte';
	import EventDrawer from '$lib/components/ui/EventDrawer.svelte';
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { EventRecord } from '$lib/types/directus';

	let {
		lang,
		upcoming,
		past,
		error,
		contactEmail,
		openEvent = null,
		openEventIndex = -1
	}: {
		lang: Locale;
		upcoming: EventRecord[];
		past: EventRecord[];
		error: boolean;
		contactEmail: string;
		openEvent?: EventRecord | null;
		openEventIndex?: number;
	} = $props();
</script>

{#if error}
	<ErrorBlock {lang} email={contactEmail} />
{:else}
	<div>
		<PageTitle titleLines={['LE NOSTRE', 'FAVOLE']} intro={t(lang, 'favoleIntro')} />
		<EventSection
			heading="01 / {t(lang, 'upcomingEvents')}"
			count={upcoming.length}
			events={upcoming}
			emptyTitle={t(lang, 'upcomingEmptyTitle')}
			emptyBody={t(lang, 'upcomingEmptyBody')}
			{lang}
		/>
		<EventSection
			heading="02 / {t(lang, 'pastEvents')}"
			count={past.length}
			events={past}
			emptyTitle={t(lang, 'pastEmptyTitle')}
			emptyBody={t(lang, 'pastEmptyBody')}
			{lang}
		/>
	</div>
{/if}

{#if openEvent}
	<EventDrawer event={openEvent} index={openEventIndex} {lang} backHref="/favole" />
{/if}
