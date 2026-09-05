<script lang="ts">
	import ComingSoonView from '$lib/components/views/ComingSoonView.svelte';
	import { SOON, t } from '$lib/i18n/dictionary';
	import { pickLocalized } from '$lib/utils/localized';
	import { withUrl } from '$lib/utils/records';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const soon = $derived(SOON.studio[data.lang]);
	const channels = $derived(withUrl(data.socialGroups.find((g) => g.format === 'fable_studio')?.links ?? []));

	const serviceNames = $derived(data.services.map((s) => pickLocalized(s, 'name', data.lang)));
	const gearItems = $derived((data.studioInfo?.gear_items ?? []).map((g) => g.label));
	const optionalItems = $derived(
		((data.lang === 'it' ? data.studioInfo?.optional_services_it : data.studioInfo?.optional_services_en) ?? []).map(
			(o) => o.label
		)
	);
	const pricingNote = $derived(pickLocalized(data.studioInfo, 'pricing_note', data.lang));

	const blocks = $derived(
		[
			serviceNames.length
				? { tag: t(data.lang, 'status'), title: serviceNames.join(' · '), body: '', foot: t(data.lang, 'open') }
				: null,
			gearItems.length
				? { tag: t(data.lang, 'gear'), title: gearItems.join(' · '), body: '', foot: t(data.lang, 'gear') }
				: null,
			optionalItems.length
				? { tag: t(data.lang, 'optionalServices'), title: optionalItems.join(' · '), body: '', foot: t(data.lang, 'optionalServices') }
				: null,
			pricingNote
				? { tag: t(data.lang, 'pricing'), title: t(data.lang, 'pricing'), body: pricingNote, foot: '' }
				: null
		].filter((b): b is { tag: string; title: string; body: string; foot: string } => !!b)
	);
</script>

<ComingSoonView
	lang={data.lang}
	kicker={soon.kicker}
	titleA={soon.titleA}
	titleB={soon.titleB}
	intro={t(data.lang, 'studioActiveIntro')}
	structureHint={soon.structureHint}
	{blocks}
	{channels}
	formType="studio_request"
	formTitle={soon.formTitle}
	formFields={soon.fields}
	error={data.error}
	contactEmail={data.siteSettings.contact_email}
/>
