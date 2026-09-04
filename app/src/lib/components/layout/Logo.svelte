<script lang="ts">
	import type { SiteSettings } from '$lib/types/directus';
	import { assetUrl } from '$lib/utils/assets';

	let {
		siteSettings,
		variant = 'sidebar'
	}: { siteSettings: SiteSettings; variant?: 'sidebar' | 'hero' | 'footer' } = $props();

	const FALLBACK = '/brand/logo-tf-black.png';
	const src = $derived(assetUrl(siteSettings.logo) ?? FALLBACK);

	let el: HTMLImageElement | undefined = $state();

	function onMove(e: MouseEvent) {
		if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const r = el.getBoundingClientRect();
		const dx = (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2);
		const dy = (e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2);
		const near = Math.abs(dx) < 1.6 && Math.abs(dy) < 1.6;
		el.style.transition = 'transform .18s linear';
		el.style.transform = `translate3d(${(dx * 26).toFixed(2)}px, ${(dy * 18).toFixed(2)}px, 0) rotate(${(dx * 1.1).toFixed(2)}deg) scale(${near ? 1.02 : 1})`;
	}

	function onLeave() {
		if (!el) return;
		el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)';
		el.style.transform = 'none';
	}

	$effect(() => {
		if (variant !== 'hero') return;
		window.addEventListener('mousemove', onMove, { passive: true });
		window.addEventListener('mouseout', onLeave, { passive: true });
		return () => {
			window.removeEventListener('mousemove', onMove);
			window.removeEventListener('mouseout', onLeave);
		};
	});
</script>

{#if variant === 'hero'}
	<img bind:this={el} src={src} alt="TeknoFavola" class="tf-logo-hero" />
{:else if variant === 'footer'}
	<img src={src} alt="TeknoFavola" style="width:78px;display:block;mix-blend-mode:screen" />
{:else}
	<img src={src} alt="" style="width:100%;display:block;mix-blend-mode:screen" />
{/if}

<style>
	.tf-logo-hero {
		width: min(58vh, 520px);
		max-width: 82%;
		display: block;
		mix-blend-mode: screen;
		cursor: crosshair;
		will-change: transform;
		transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
	}
	.tf-logo-hero:hover {
		animation: tfFlash 1.1s steps(6) infinite;
	}
</style>
