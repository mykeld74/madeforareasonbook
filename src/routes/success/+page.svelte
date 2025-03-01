<script>
	import { fade } from 'svelte/transition';
</script>

<div class="successContainer container" in:fade>
	<div class="successMessage">
		<h1>Thank You for Your Purchase!</h1>
		<p>Your copy of "Made for a Reason" will be on its way soon.</p>
		<a href="/" class="homeButton">Return to Home</a>
	</div>
</div>

<style>
	.successContainer {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		min-height: calc(100vh - 325px);
		padding-top: 100px;
	}
</style>
