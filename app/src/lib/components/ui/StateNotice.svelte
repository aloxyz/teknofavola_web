<script lang="ts">
	let { title, body, wide = false }: { title: string; body?: string | null; wide?: boolean } = $props();
</script>

<div style="{wide ? 'grid-column:1/-1;' : ''}padding:34px clamp(24px,5vw,80px);display:flex;flex-direction:column;gap:10px">
	<span style="font-weight:900;font-size:clamp(18px,2.4vw,30px);letter-spacing:-0.025em;color:var(--tf-ink-3)">{title}</span>
	{#if body}
		<span style="font-size:12px;line-height:1.7;max-width:56ch;color:var(--tf-ink-2)">{body}</span>
	{/if}
</div>
