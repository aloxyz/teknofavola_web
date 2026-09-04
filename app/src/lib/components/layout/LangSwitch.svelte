<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { t, type Locale } from '$lib/i18n/dictionary';

	let { lang }: { lang: Locale } = $props();
	let pending = $state(false);

	async function setLang(next: Locale) {
		if (next === lang || pending) return;
		pending = true;
		try {
			await fetch('/api/lang', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ lang: next })
			});
			document.documentElement.lang = next;
			await invalidateAll();
		} finally {
			pending = false;
		}
	}
</script>

<button type="button" onclick={() => setLang(lang === 'it' ? 'en' : 'it')} aria-label={t(lang, 'langSwitch')} class="tf-langswitch">
	<span class:active={lang === 'it'}>IT</span>
	<span class:active={lang === 'en'}>EN</span>
</button>

<style>
	.tf-langswitch {
		align-self: flex-start;
		display: flex;
		gap: 0;
		border: 2px solid var(--tf-line);
		background: transparent;
		cursor: pointer;
		padding: 0;
	}
	.tf-langswitch span {
		font-size: 11px;
		letter-spacing: 0.14em;
		padding: 8px 13px;
		font-weight: 800;
		color: var(--tf-ink);
	}
	.tf-langswitch span.active {
		background: var(--tf-accent);
		color: var(--tf-bg);
	}
</style>
