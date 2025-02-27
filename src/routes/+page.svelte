<script>
	import { fade } from 'svelte/transition';
	import { Cover } from '$lib/assets';
	import Scroller from '$lib/components/Scroller.svelte';
</script>

<section class="heroSection">
	<div class="bookPreview">
		<img src={Cover} alt="Made for a Reason" />
	</div>
	<div class="heroContent">
		<p>
			Made for a Reason is a personalized book written to help kids open their eyes to the BIG
			VISION God has for their lives! It is a 32-page children's book personalized in 4 places - (1
			with their full name and 3 with their nickname or what people call them) There are male and
			female options available.
		</p>
	</div>
</section>
<section class="ctaSection">
	<div class="ctaContent">
		<a href="/purchase"><div class="ctaButton">Order Now</div></a>
	</div>
</section>

<section class="scrollerSection">
	<Scroller />
</section>
<section class="aboutTheAuthorSection">
	<div class="aboutTheAuthorContent">
		<div class="aboutTheAuthorText">
			<h2>About the Author</h2>
			<p>
				Rick Schmitz is a Beloved Child of God, a husband, father and grandfather. He is also the
				pastor of the amazing family of Westwoods Community Church in Lakewood Colorado.
			</p>

			<p>
				His hope for this book is to help his grandkids (and others) reject the small vision for
				life that this world offers and instead, see with big, open and receptive eyes the BIG
				vision that God has for their lives AND every moment of their days.
			</p>
		</div>
	</div>
</section>

<style>
	.heroSection {
		width: calc(100% - 2rem);
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 3fr;
		place-items: center;
		gap: 2rem;
		padding: 2rem 0;
		@media (max-width: 680px) {
			grid-template-columns: 1fr;
		}
	}

	.scrollerSection {
		margin: 4rem auto 4rem;
	}
	.ctaSection {
		display: grid;
		place-items: center;
		padding-block: 4rem;
		.ctaContent {
			.ctaButton {
				background: #e5862c;
				padding: 0.5rem 1.25rem;
				border-radius: 10px;
				box-shadow: 3px 3px 6px oklch(20% 0 0);
				font-size: clamp(2.25rem, 2.5vw, 3rem);
				font-weight: 700;
				color: #fff;
			}
		}
	}
	.aboutTheAuthorSection {
		width: calc(100% - 2rem);
		max-width: 1200px;
		margin: 0 auto;
		h2 {
			text-align: center;
		}
	}
</style>
