<script lang="ts">
	import { t, type Locale } from '$lib/i18n/dictionary';
	import { SOCIAL_FORMAT_LABEL } from '$lib/config/socialFormats';
	import type { SocialGroup } from '$lib/server/api/social';

	let { lang, groups, contactEmail }: { lang: Locale; groups: SocialGroup[]; contactEmail: string } = $props();
</script>

<div style="border-top:2px solid var(--tf-line)">
	{#each groups as g, i (g.format)}
		<div
			class="tf-socialrow"
			style="display:grid;grid-template-columns:minmax(220px,0.9fr) 1.1fr;gap:20px 32px;align-items:center;padding:26px clamp(24px,5vw,80px);border-bottom:1px solid var(--tf-line-2)"
		>
			<div style="display:flex;flex-direction:column;gap:8px;min-width:0">
				<span style="font-size:10px;letter-spacing:.16em;color:var(--tf-ink-3)">{String(i + 1).padStart(2, '0')}</span>
				<h3 style="margin:0;font-weight:900;font-size:clamp(18px,2.2vw,30px);letter-spacing:-0.025em;line-height:1.05">{SOCIAL_FORMAT_LABEL[g.format]}</h3>
			</div>
			<div style="display:flex;flex-wrap:wrap;align-items:center;gap:2px;min-width:0;align-self:center">
				{#each g.links as l (l.id)}
					{#if l.url}
						<a
							href={l.url}
							target="_blank"
							rel="noopener"
							class="tf-sociallink"
							style="display:flex;align-items:center;gap:9px;padding:11px 14px;border:2px solid var(--tf-accent);font-size:11px;letter-spacing:.14em;font-weight:800;color:var(--tf-accent)"
						>
							<span>{l.platform}</span><span aria-hidden="true" style="opacity:.85">↗</span>
						</a>
					{:else}
						<span
							aria-disabled="true"
							style="display:flex;align-items:center;gap:9px;padding:11px 14px;border:2px solid var(--tf-line-2);font-size:11px;letter-spacing:.14em;font-weight:800;color:var(--tf-ink-3);cursor:not-allowed"
						>
							<span>{l.platform}</span><span aria-hidden="true" style="opacity:.85">—</span>
							<span class="tf-sr">{t(lang, 'notAvailable')}</span>
						</span>
					{/if}
				{/each}
			</div>
		</div>
	{/each}
	{#if groups.length === 0}
		<div style="padding:34px clamp(24px,5vw,80px);border-bottom:1px solid var(--tf-line-2);display:flex;flex-direction:column;gap:10px">
			<span style="font-weight:900;font-size:clamp(18px,2.4vw,28px);letter-spacing:-0.025em;color:var(--tf-ink-3)">{t(lang, 'socialsEmptyTitle')}</span>
			<a href="mailto:{contactEmail}" style="font-weight:800;font-size:14px">{contactEmail}</a>
		</div>
	{/if}
</div>

<style>
	.tf-sociallink:hover {
		background: var(--tf-bg-3) !important;
	}
</style>
