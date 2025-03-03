<script>
	import { fade } from 'svelte/transition';
</script>

<div class="successContainer container" in:fade>
	<div class="successMessage">
		<h1>Thank You for Your Purchase!</h1>
		<p>Your copy of "Made for a Reason" will be on its way soon.</p>
		<p>Please note it takes approximately 3 weeks to print and ship.</p>
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
	.homeButton {
		width: fit-content;
		display: block;
		margin-top: 2rem;
		padding: 1rem 2rem;
		background-color: #007680;
		color: white;
		text-decoration: none;
		border-radius: 5px;
		transition: background-color 0.3s ease;
		font-size: 1.2rem;
		font-weight: 500;
	}
	.homeButton:hover {
		background-color: #008b80;
	}
</style>
