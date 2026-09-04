<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/dictionary';

	const lang = $derived($page.data?.lang ?? 'it');
	const email = $derived($page.data?.siteSettings?.contact_email ?? 'teknofavola@gmail.com');
	const status = $derived($page.status);
	const isNotFound = $derived(status === 404);
</script>

<div role="alert" style="padding:clamp(28px,5vw,72px) clamp(24px,5vw,80px) 70px;display:flex;flex-direction:column;gap:20px;align-items:flex-start">
	<span style="font-size:10px;letter-spacing:.28em;color:var(--tf-accent)">{status}</span>
	<h1 style="margin:0;font-size:clamp(28px,5.4vw,72px);line-height:.96;letter-spacing:-0.04em;max-width:24ch">
		{isNotFound ? (lang === 'it' ? 'PAGINA NON TROVATA' : 'PAGE NOT FOUND') : t(lang, 'errorTitle')}
	</h1>
	<p style="margin:0;font-size:14px;line-height:1.7;max-width:56ch;color:var(--tf-ink-2)">
		{isNotFound
			? lang === 'it'
				? 'La pagina che cerchi non esiste o è stata spostata.'
				: 'The page you are looking for does not exist or has moved.'
			: t(lang, 'errorBody')}
	</p>
	<div style="display:flex;flex-wrap:wrap;gap:2px">
		<a href="/" class="tf-btn-accent" style="display:flex;align-items:center;gap:10px;background:var(--tf-accent);color:var(--tf-bg);border:0;padding:14px 18px;font-weight:800;font-size:13px">{lang === 'it' ? 'TORNA ALLA HOME' : 'BACK TO HOME'}</a>
		<a href="mailto:{email}" class="tf-btn-outline" style="display:flex;align-items:center;gap:10px;border:2px solid var(--tf-line);color:var(--tf-ink);padding:14px 18px;font-weight:800;font-size:13px">{email}</a>
	</div>
</div>

<style>
	.tf-btn-accent:hover {
		background: var(--tf-accent-hi) !important;
	}
	.tf-btn-outline:hover {
		border-color: var(--tf-accent) !important;
	}
</style>
