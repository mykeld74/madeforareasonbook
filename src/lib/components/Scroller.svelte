<script lang="ts">
	import { onMount } from 'svelte';
	import {
		Page1,
		Page2,
		Page3,
		Page4,
		Page5,
		Page6,
		Page7,
		Page8,
		Page9,
		Page10,
		Page11,
		Page12,
		Page13,
		Page14,
		Page15,
		Page17
	} from '$lib/assets';

	const pages = [
		Page1,
		Page2,
		Page3,
		Page4,
		Page5,
		Page6,
		Page7,
		Page8,
		Page9,
		Page10,
		Page11,
		Page12,
		Page13,
		Page14,
		Page15,
		Page17
	];

	let scrollers: HTMLElement[] = [];

	function addAnimation() {
		scrollers.forEach((scroller) => {
			scroller.setAttribute('data-animated', 'true');
			const scrollerInner = document.querySelector('.innerScroller');
			const scrollerInnerContent = Array.from(scrollerInner?.children || []);

			scrollerInnerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true) as HTMLElement;
				duplicatedItem.setAttribute('aria-hidden', 'true');
				scrollerInner?.appendChild(duplicatedItem);
			});
		});
	}

	onMount(() => {
		scrollers = Array.from(document.querySelectorAll('.scrollerContainer'));
		if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			addAnimation();
		}
	});
</script>

<div class="scrollerContainer" data-animationSpeed="slow">
	<ul class="pages innerScroller">
		{#each pages as page}
			<li class="page">
				<img src={page} alt="Page {page}" />
			</li>
		{/each}
	</ul>
</div>

<style>
	.scrollerContainer {
		width: 100%;
		overflow: hidden;
		padding-bottom: 1rem;
	}

	.innerScroller {
		width: fit-content;
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		padding: 0;
		margin: 0;
		gap: var(--innerScrollGap);
	}
	:global(.scrollerContainer[data-animated]) {
		overflow: hidden;
		mask: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
		.innerScroller {
			flex-wrap: nowrap;
			animation: scroll var(--animationDuration, 30s) linear infinite;
		}
	}

	:global([data-animationSpeed='fast']) {
		--animationDuration: 20s;
	}
	:global([data-animationSpeed='slow']) {
		--animationDuration: 100s;
	}
	.page {
		width: max-content;
		flex-shrink: 0;
		box-shadow: 3px 3px 6px oklch(20% 0 0);
		img {
			height: 250px;
			width: auto;
		}
	}

	@keyframes scroll {
		to {
			transform: translateX(-50%);
		}
	}
</style>
