import { json } from '@sveltejs/kit';
import Stripe from 'stripe';

const stripe = new Stripe('your_secret_key');

export async function POST({ request }) {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [
				{
					price_data: {
						currency: 'usd',
						product_data: {
							name: 'Made for a Reason',
							description: "Children's book about self-worth and purpose"
						},
						unit_amount: 1499 // $14.99 in cents
					},
					quantity: 1
				}
			],
			mode: 'payment',
			success_url: `${request.headers.get('origin')}/success`,
			cancel_url: `${request.headers.get('origin')}/purchase`
		});

		return json({ id: session.id });
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		return json({ error: errorMessage }, { status: 500 });
	}
}
