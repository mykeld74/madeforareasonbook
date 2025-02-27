<script>
	import { fade } from 'svelte/transition';
</script>

<div class="container" in:fade>
	<div class="successMessage">
		<h1>Thank You for Your Purchase!</h1>
		<p>Your copy of "Made for a Reason" will be on its way soon.</p>
		<a href="/" class="homeButton">Return to Home</a>
	</div>
</div>

<style>
	.container {
		display: flex;
		justifycontent: center;
		alignitems: center;
		minheight: 80vh;
		maxwidth: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}

	.successMessage {
		textalign: center;
		padding: 40px;
		backgroundcolor: rgba(255, 253, 250, 0.9);
		borderradius: 12px;
		boxshadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		maxwidth: 600px;
		width: 100%;
	}

	.homeButton {
		display: inline-block;
		margintop: 20px;
		padding: 15px 30px;
		backgroundcolor: #8c6142;
		color: white;
		textdecoration: none;
		borderradius: 25px;
		transition: backgroundColor 0.3s;
	}

	.homeButton:hover {
		backgroundcolor: #75513a;
	}
</style>
