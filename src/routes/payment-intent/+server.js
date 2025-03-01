import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { SECRET_STRIPE_KEY } from '$env/static/private';

const stripe = new Stripe(SECRET_STRIPE_KEY);

export async function POST({ request }) {
	const { cost = 5500, metadata = {} } = await request.json();

	const paymentIntent = await stripe.paymentIntents.create({
		amount: cost,
		currency: 'usd',
		payment_method_types: ['card'],
		metadata
	});

	return json({
		clientSecret: paymentIntent.client_secret
	});
}
