<script lang="ts">
	import ComingSoonView from '$lib/components/views/ComingSoonView.svelte';
	import PageTitle from '$lib/components/ui/PageTitle.svelte';
	import ErrorBlock from '$lib/components/ui/ErrorBlock.svelte';
	import ContactForm from '$lib/components/ui/ContactForm.svelte';
	import MerchCard from '$lib/components/ui/MerchCard.svelte';
	import { SOON, t } from '$lib/i18n/dictionary';
	import type { PageData } from './$types';
	import type { MerchItemRecord } from '$lib/types/directus';

	let { data }: { data: PageData } = $props();

	const soon = $derived(SOON.merch[data.lang]);
	const prefillKey = $derived(data.lang === 'it' ? 'prodotto_di_interesse' : 'product_of_interest');

	let selectedProduct: MerchItemRecord | null = $state(null);
	let formSection: HTMLDivElement | undefined = $state();

	function requestProduct(item: MerchItemRecord) {
		selectedProduct = item;
		formSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

{#if data.error}
	<ErrorBlock lang={data.lang} email={data.siteSettings.contact_email} />
{:else if data.items.length > 0}
	<div>
		<PageTitle kicker={soon.kicker} titleLines={[soon.titleA, soon.titleB]} intro={t(data.lang, 'merchActiveIntro')} />
		<div style="padding:clamp(24px,4vw,56px) clamp(24px,5vw,80px);display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:16px">
			{#each data.items as item (item.id)}
				<MerchCard {item} lang={data.lang} onRequest={() => requestProduct(item)} />
			{/each}
		</div>
		<div bind:this={formSection} style="padding:0 clamp(24px,5vw,80px) 60px">
			{#if selectedProduct}
				<span style="display:block;font-size:11px;letter-spacing:.14em;color:var(--tf-ink-3)">
					{t(data.lang, 'requestingProduct')} <strong style="color:var(--tf-accent)">{selectedProduct.name}</strong>
				</span>
			{/if}
			{#key selectedProduct?.id}
				<ContactForm
					lang={data.lang}
					type="merch_interest"
					title={soon.formTitle}
					fieldLabels={soon.fields}
					prefill={selectedProduct ? { [prefillKey]: selectedProduct.name } : {}}
					variant="bordered-top"
				/>
			{/key}
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
		channels={[]}
		formType="merch_interest"
		formTitle={soon.formTitle}
		formFields={soon.fields}
		error={data.error}
		contactEmail={data.siteSettings.contact_email}
	/>
{/if}
