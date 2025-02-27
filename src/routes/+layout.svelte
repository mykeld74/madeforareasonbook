<script>
	let { data, children } = $props();
	import '$lib/css/reset.css';
	import '$lib/css/styles.css';
	import { MFAR } from '$lib/assets';
</script>

<svelte:head>
	<link rel="preconnect" href="ttps://use.typekit.net" />
	<link rel="stylesheet" href="https://use.typekit.net/xnh2hog.css" />
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

<style>
	header {
		padding: 1rem;
	}

	.header-content {
		width: calc(100% - 2rem);
		max-width: 1100px;
		margin: 0 auto 2rem;
	}
</style>
