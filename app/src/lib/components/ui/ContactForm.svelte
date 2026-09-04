<script lang="ts">
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { SubmissionType } from '$lib/types/directus';

	let {
		lang,
		type,
		title,
		fieldLabels,
		hiddenFields = {},
		prefill = {},
		variant = 'boxed'
	}: {
		lang: Locale;
		type: SubmissionType;
		title: string;
		fieldLabels: string[];
		hiddenFields?: Record<string, string>;
		prefill?: Record<string, string>;
		variant?: 'boxed' | 'bordered-top';
	} = $props();

	const formStyle = $derived(
		variant === 'boxed'
			? 'margin-top:40px;border:2px solid var(--tf-line);padding:clamp(18px,2.4vw,30px)'
			: 'margin-top:44px;border-top:2px solid var(--tf-line);padding-top:24px;padding-bottom:60px'
	);

	type Status = 'idle' | 'sending' | 'sent' | 'error';
	let status = $state<Status>('idle');

	function fieldMeta(label: string) {
		const up = label.toUpperCase();
		const isMessage = up.startsWith('MESSAG');
		let inputType: 'text' | 'email' | 'tel' | 'url' | 'date' = 'text';
		let autocomplete: 'off' | 'email' | 'tel' | 'url' | 'name' = 'off';
		if (up.includes('EMAIL')) {
			inputType = 'email';
			autocomplete = 'email';
		} else if (up.includes('TELEFONO') || up.includes('PHONE')) {
			inputType = 'tel';
			autocomplete = 'tel';
		} else if (up.includes('LINK') || up.includes('SOCIAL')) {
			inputType = 'url';
			autocomplete = 'url';
		} else if (up.startsWith('DATA') || up.includes('PREFERRED DATE')) {
			inputType = 'date';
		} else if (up === 'NOME' || up === 'NAME' || up.startsWith('NOME ARTISTA') || up.startsWith('ARTIST NAME')) {
			autocomplete = 'name';
		}
		const required =
			up === 'NOME' || up === 'NAME' || up.includes('EMAIL') || up.startsWith('NOME ARTISTA') || up.startsWith('ARTIST NAME');
		const name = up.toLowerCase().replace(/[^a-z0-9]+/g, '_');
		return { label: label + (required ? ' *' : ''), name, type: inputType, autocomplete, required, isMessage };
	}

	const fields = $derived(fieldLabels.map(fieldMeta));

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'sending') return;
		const form = e.currentTarget as HTMLFormElement;
		const data = new FormData(form);
		const honeypot = String(data.get('company') || '');
		const fieldsPayload: Record<string, string> = {};
		for (const [k, v] of data.entries()) {
			if (k !== 'company') fieldsPayload[k] = String(v);
		}

		status = 'sending';
		try {
			const res = await fetch('/api/submit', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ type, fields: fieldsPayload, hiddenFields, honeypot })
			});
			status = res.ok ? 'sent' : 'error';
			if (res.ok) form.reset();
		} catch {
			status = 'error';
		}
	}
</script>

<form onsubmit={onSubmit} novalidate style={formStyle}>
	<h3 style="margin:0 0 6px;font-size:20px;letter-spacing:-0.02em">{title}</h3>
	<p style="margin:0 0 20px;font-size:12px;color:var(--tf-ink-2)">{t(lang, 'requiredNote')}</p>

	<div style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden" aria-hidden="true">
		<label>Company<input type="text" name="company" tabindex="-1" autocomplete="off" /></label>
	</div>

	<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px">
		{#each fields as f (f.name)}
			<label style="display:flex;flex-direction:column;gap:7px;{f.isMessage ? 'grid-column:1/-1' : ''}">
				<span style="font-size:9px;letter-spacing:.18em;color:var(--tf-ink-2)">{f.label}</span>
				{#if f.isMessage}
					<textarea
						name={f.name}
						rows="3"
						required={f.required}
						style="border:0;border-bottom:2px solid var(--tf-field);background:transparent;color:var(--tf-ink);font-size:14px;padding:8px 0;resize:vertical;width:100%"
					></textarea>
				{:else}
					<input
						type={f.type}
						name={f.name}
						autocomplete={f.autocomplete}
						required={f.required}
						value={prefill[f.name] ?? ''}
						style="border:0;border-bottom:2px solid var(--tf-field);background:transparent;color:var(--tf-ink);font-size:14px;padding:8px 0;width:100%"
					/>
				{/if}
			</label>
		{/each}
	</div>

	<button type="submit" disabled={status === 'sending'} class="tf-btn-accent" style="margin-top:24px;display:flex;align-items:center;gap:10px;background:var(--tf-accent);color:var(--tf-bg);border:0;padding:14px 18px;font-weight:800;font-size:13px;cursor:pointer;text-align:left">
		{status === 'sending' ? t(lang, 'sending') : `${t(lang, 'send')} →`}
	</button>
	<span role="status" aria-live="polite" style="display:{status === 'sent' || status === 'error' ? 'block' : 'none'};margin-top:14px;font-size:11px;letter-spacing:.14em;font-weight:800;color:{status === 'error' ? '#ff8a75' : 'var(--tf-accent)'}">
		{status === 'sent' ? t(lang, 'sent') : status === 'error' ? t(lang, 'sendError') : ''}
	</span>
</form>

<style>
	.tf-btn-accent:hover:not(:disabled) {
		background: var(--tf-accent-hi) !important;
	}
	.tf-btn-accent:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
</style>
