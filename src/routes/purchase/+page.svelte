<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import type { Stripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { Elements, PaymentElement, LinkAuthenticationElement, Address } from '$lib/stripe';
	import { StripeLogo } from '$lib/assets';
	let stripe: Stripe | null = null;
	let clientSecret: string | null = null;
	let error: any = null;
	let elements: any;
	let processing = false;

	// Order form data
	let orderData = {
		childFirstName: '',
		childMiddleName: '',
		childLastName: '',
		childNickname: '',
		gender: '',
		bookType: 'hardcover',
		price: 5500
	};

	$: if (orderData.bookType === 'hardcover') {
		orderData.price = 5500;
	} else {
		orderData.price = 4500;
	}

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);
	});

	async function createPaymentIntent() {
		const response = await fetch('./payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				cost: orderData.price,
				metadata: {
					ChildsName: `${orderData.childFirstName} ${orderData.childMiddleName} ${orderData.childLastName}`,
					Nickname: orderData.childNickname,
					Gender: orderData.gender,
					BookType: orderData.bookType
				}
			})
		});
		const { clientSecret } = await response.json();
		return clientSecret;
	}

	async function handleOrderSubmit() {
		if (!orderData.childFirstName || !orderData.childLastName || !orderData.gender) {
			error = { message: 'Please fill in all required fields' };
			return;
		}
		clientSecret = await createPaymentIntent();
	}

	async function submit() {
		if (processing) return;
		processing = true;

		const result = await stripe!.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		if (result.error) {
			error = result.error;
			processing = false;
		} else {
			goto('/success');
		}
	}
</script>

<div class="container">
	{#if error}
		<p class="error">{error.message} Please try again.</p>
	{/if}

	{#if !clientSecret}
		<div class="orderForm">
			<h1>Personalize Your Book</h1>
			<form on:submit|preventDefault={handleOrderSubmit}>
				<div class="formGroup">
					<label>
						First Name*
						<input type="text" bind:value={orderData.childFirstName} required />
					</label>
				</div>

				<div class="formGroup">
					<label>
						Middle Name
						<input type="text" bind:value={orderData.childMiddleName} />
					</label>
				</div>

				<div class="formGroup">
					<label>
						Last Name*
						<input type="text" bind:value={orderData.childLastName} required />
					</label>
				</div>

				<div class="formGroup">
					<label>
						Name They Go By (Nickname)
						<input
							type="text"
							bind:value={orderData.childNickname}
							placeholder="What do people call them?"
						/>
					</label>
				</div>

				<div class="formGroup">
					<label class="radioGroup">
						Child's Gender*
						<div class="radioOptions">
							<label class="radio">
								<input
									type="radio"
									bind:group={orderData.gender}
									value="boy"
									name="gender"
									required
								/>
								Boy
							</label>
							<label class="radio">
								<input
									type="radio"
									bind:group={orderData.gender}
									value="girl"
									name="gender"
									required
								/>
								Girl
							</label>
						</div>
					</label>
				</div>

				<div class="formGroup">
					<label class="radioGroup">
						Book Type *
						<div class="radioOptions">
							<label class="radio">
								<input
									type="radio"
									bind:group={orderData.bookType}
									value="hardcover"
									name="bookType"
								/>
								Hardcover (${(orderData.price / 100).toFixed(2)})
							</label>
							<label class="radio">
								<input
									type="radio"
									bind:group={orderData.bookType}
									value="softcover"
									name="bookType"
								/>
								Softcover (${(45.0).toFixed(2)})
							</label>
						</div>
					</label>
				</div>

				<button type="submit">Continue to Payment</button>
			</form>
		</div>
	{:else}
		<div class="poweredByStripe">
			<h3>Powered by</h3>
			<div class="stripeLogo"><img src={StripeLogo} alt="Stripe" /></div>
		</div>
		<Elements
			{stripe}
			{clientSecret}
			theme="flat"
			labels="floating"
			variables={{ colorPrimary: '#007680' }}
			rules={{ '.Input': { border: 'solid 1px #0002' } }}
			bind:elements
		>
			<form on:submit|preventDefault={submit}>
				<LinkAuthenticationElement />
				<PaymentElement />
				<Address mode="shipping" />

				<button disabled={processing}>
					{#if processing}
						Processing...
					{:else}
						Pay ${(orderData.price / 100).toFixed(2)}
					{/if}
				</button>
			</form>
		</Elements>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
		min-height: calc(100vh - 365px);
	}

	.formGroup {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
	}

	input,
	select {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 1rem;
	}

	.radioGroup {
		margin-bottom: 1rem;
	}

	.radioOptions {
		margin-top: 0.5rem;
	}

	.radio {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		font-weight: normal;
	}

	.radio input {
		width: auto;
	}

	button {
		width: 100%;
		padding: 1rem;
		background: #007680;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1.1rem;
		cursor: pointer;
		margin-top: 1rem;
		transition: background 0.3s ease-in-out;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.6);
	}

	button:hover:not(:disabled) {
		background: #008b80;
	}

	button:disabled {
		background: #ccc;
		cursor: not-allowed;
	}

	.error {
		color: #dc3545;
		background: #ffe6e6;
		padding: 1rem;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.poweredByStripe {
		display: flex;
		justify-content: flex-end;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.stripeLogo {
		width: 100px;
		margin-top: 1px;
	}
</style>
