<script>
	import { fade } from 'svelte/transition';
	import { Cover, Rick } from '$lib/assets';
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
	<h2>About the Author</h2>
	<div class="aboutTheAuthorContent">
		<div class="aboutTheAuthorText">
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
		<div class="aboutTheAuthorImage">
			<img src={Rick} alt="Rick Schmitz" />
		</div>
	</div>
</section>
<section class="personalizedBookSection">
	<div class="personalizedBookContent">
		<h2>Personalized Books</h2>
		<p>
			Research shows that personalized books, where children encounter their own names in the story,
			can enhance reading engagement, comprehension, and self-esteem. A 2014 study in Educational
			Psychology found that children connect more deeply with stories featuring familiar elements
			like their names, leading to better recall and understanding. Similarly, a 2017 University of
			Sussex study revealed that personalized texts improve vocabulary acquisition, as associating
			new words with their own identity strengthens retention.
		</p>
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
	.aboutTheAuthorSection,
	.personalizedBookSection {
		width: calc(100% - 2rem);
		max-width: 1200px;
		margin: 3rem auto 6rem;
		h2 {
			text-align: center;
		}
	}
	.aboutTheAuthorContent {
		display: grid;
		grid-template-columns: 3fr 1fr;
		gap: 2rem;
		@media (max-width: 870px) {
			grid-template-columns: 1fr;
		}
	}
</style>
