<script lang="ts">
	let {
		kicker,
		titleLines,
		intro
	}: { kicker?: string; titleLines: string[]; intro?: string | null } = $props();
</script>

<header style="padding:clamp(36px,6vw,88px) clamp(24px,5vw,80px) 28px;border-bottom:2px solid var(--tf-line)">
	{#if kicker}
		<span class="tf-kicker" style="display:block;margin-bottom:16px">{kicker}</span>
	{/if}
	<h1 style="margin:0;font-size:clamp(34px,7vw,104px);line-height:.92;letter-spacing:-0.04em">
		{#each titleLines as line, i (line)}{line}{#if i < titleLines.length - 1}<br />{/if}{/each}
	</h1>
	{#if intro}
		<p style="margin:26px 0 0;font-size:13px;line-height:1.7;max-width:56ch;color:var(--tf-ink-2)">{intro}</p>
	{/if}
</header>
