<script lang="ts">
	import { t, type Locale } from '$lib/i18n/dictionary';
	import type { ArtistRecord } from '$lib/types/directus';

	let { lang, artists, activeSlug }: { lang: Locale; artists: ArtistRecord[]; activeSlug?: string } = $props();
</script>

<div style="border-right:2px solid var(--tf-line)">
	<div style="display:flex;align-items:baseline;justify-content:space-between;gap:12px;padding:16px 20px;border-bottom:2px solid var(--tf-line);font-size:10px;letter-spacing:.16em;color:var(--tf-ink-3)">
		<span>{t(lang, 'artistIndex')}</span><span>{artists.length} · A–Z</span>
	</div>
	{#if artists.length}
		<nav aria-label={t(lang, 'artistIndex')} style="display:flex;flex-direction:column;max-height:min(70vh,760px);overflow:auto">
			{#each artists as a, i (a.id)}
				<a
					href="/booking/{a.slug}"
					aria-current={a.slug === activeSlug ? 'page' : undefined}
					class="tf-artistrow"
					style="display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:0;border-bottom:1px solid var(--tf-line-2);padding:14px 20px;color:{a.slug === activeSlug ? 'var(--tf-accent)' : 'var(--tf-ink)'};background:{a.slug === activeSlug ? 'var(--tf-bg-3)' : 'transparent'}"
				>
					<span style="width:26px;flex:none;font-size:10px;letter-spacing:.1em;color:var(--tf-ink-3)">{String(i + 1).padStart(2, '0')}</span>
					<span style="font-weight:800;font-size:15px;letter-spacing:-0.01em;overflow-wrap:anywhere">{a.name}</span>
				</a>
			{/each}
		</nav>
	{:else}
		<div style="padding:26px 20px;display:flex;flex-direction:column;gap:8px">
			<span style="font-weight:900;font-size:16px;letter-spacing:-0.02em;color:var(--tf-ink-3)">{t(lang, 'artistsEmptyTitle')}</span>
			<span style="font-size:12px;line-height:1.6;color:var(--tf-ink-2)">{t(lang, 'artistsEmptyBody')}</span>
		</div>
	{/if}
</div>

<style>
	.tf-artistrow:hover {
		color: var(--tf-accent-hi) !important;
	}
</style>
