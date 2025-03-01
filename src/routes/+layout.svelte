<script>
	let { data, children } = $props();
	import '$lib/css/reset.css';
	import '$lib/css/styles.css';
	import { MFAR } from '$lib/assets';
	// get the current year
	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<link rel="preconnect" href="ttps://use.typekit.net" />
	<link rel="stylesheet" href="https://use.typekit.net/xnh2hog.css" />
	<title>Made for a Reason</title>
</svelte:head>

<header>
	<div class="header-content">
		<a href="/">
			<img src={MFAR} alt="Made for a Reason" />
		</a>
	</div>
</header>

<main>
	{@render children()}
</main>
<footer>
	<div class="footer-content">
		<p>
			&copy; {currentYear} Made for a Reason. All rights to images and content reserved.
		</p>
	</div>
</footer>

<style>
	header {
		padding: 1rem;
	}

	.header-content {
		width: calc(100% - 2rem);
		max-width: 1100px;
		margin: 0 auto 2rem;
	}
	footer {
		padding: 1rem;
		border-top: 1px solid #e5862c;
	}
	.footer-content {
		width: calc(100% - 2rem);

		text-align: right;
		p {
			font-size: 0.875rem;
		}
	}
</style>
