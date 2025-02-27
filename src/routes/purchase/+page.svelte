<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { loadStripe } from '@stripe/stripe-js';

	let stripe: any;
	let loading = false;

	onMount(async () => {
		// Load Stripe.js
		stripe = await loadStripe('your_publishable_key');
	});

	async function handlePurchase() {
		loading = true;
		try {
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					quantity: 1
				})
			});

			const session = await response.json();

			// Redirect to Stripe Checkout
			const result = await stripe.redirectToCheckout({
				sessionId: session.id
			});

			if (result.error) {
				alert(result.error.message);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Something went wrong. Please try again.');
		}
		loading = false;
	}
</script>

<div class="container" in:fade>
	<header>
		<h1>Purchase "Made for a Reason"</h1>
		<nav>
			<a href="/">Home</a>
		</nav>
	</header>

	<main class="purchaseContent">
		<div class="productCard">
			<img src="/book-cover-placeholder.jpg" alt="Made for a Reason book cover" />
			<div class="productInfo">
				<h2>Made for a Reason</h2>
				<p class="price">$14.99</p>
				<p class="description">
					A beautifully illustrated children's book that teaches the value of self-worth and
					purpose. Perfect for ages 4-8.
				</p>
				<button class="purchaseButton" on:click={handlePurchase} disabled={loading}>
					{loading ? 'Processing...' : 'Buy Now'}
				</button>
			</div>
		</div>
	</main>
</div>

<style>
	.container {
		maxwidth: 1200px;
		margin: 0 auto;
		padding: 0 20px;
		backgroundcolor: rgba(255, 253, 250, 0.8);
		borderradius: 10px;
		boxshadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		backdropfilter: blur(5px);
	}

	header {
		display: flex;
		justifycontent: space-between;
		alignitems: center;
		padding: 20px 0;
	}

	nav a {
		marginleft: 20px;
		textdecoration: none;
		color: #633e1b;
		fontweight: 600;
	}

	.purchaseContent {
		display: flex;
		justifycontent: center;
		padding: 40px 0;
	}

	.productCard {
		display: grid;
		gridtemplatecolumns: 1fr 1fr;
		gap: 40px;
		padding: 30px;
		backgroundcolor: #fff;
		borderradius: 12px;
		boxshadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		maxwidth: 800px;
	}

	.productCard img {
		maxwidth: 100%;
		borderradius: 8px;
	}

	.productInfo {
		display: flex;
		flexdirection: column;
		gap: 20px;
	}

	.price {
		fontsize: 24px;
		fontweight: bold;
		color: #8c6142;
	}

	.purchaseButton {
		padding: 15px 30px;
		backgroundcolor: #8c6142;
		color: white;
		border: none;
		borderradius: 25px;
		fontsize: 1.2rem;
		cursor: pointer;
		transition: backgroundColor 0.3s;
	}

	.purchaseButton:hover:not(:disabled) {
		backgroundcolor: #75513a;
	}

	.purchaseButton:disabled {
		backgroundcolor: #cccccc;
		cursor: not-allowed;
	}
</style>
