<script>
	import { mount } from './util';
	import { onMount, getContext, createEventDispatcher } from 'svelte';

	/** @type {import('@stripe/stripe-js').StripeElementClasses} */
	export let classes = {};

	/** @type {import('@stripe/stripe-js').StripeElementStyle} */
	export let style = {};

	/** @type {import('@stripe/stripe-js').StripeCardElementOptions["value"]} */
	export let value = undefined;

	/** @type {boolean | undefined} */
	export let hidePostalCode = false;

	/** @type {boolean | undefined} */
	export let hideIcon = false;

	/** @type {boolean | undefined} */
	export let disabled = false;

	/** @type {'default' | 'solid'} */
	export let iconStyle = 'default';

	/** @type {import('@stripe/stripe-js').StripeElementBase?} */
	export let element = null;

	/** @type {HTMLElement?} */
	let wrapper;

	const dispatch = createEventDispatcher();

	/** @type {import("./types").ElementsContext} */
	const { elements } = getContext('stripe');

	onMount(() => {
		/** @type {import('@stripe/stripe-js').StripeCardElementOptions} */
		const options = { classes, style, value, hidePostalCode, hideIcon, disabled, iconStyle };

		if (wrapper) {
			// @ts-ignore - Stripe types mismatch, but this is the correct usage
			element = mount(wrapper, 'card', elements, dispatch, options);
		}

		return () => element?.destroy();
	});

	export function blur() {
		element?.blur();
	}

	export function clear() {
		element?.clear();
	}

	export function destroy() {
		element?.destroy();
	}

	export function focus() {
		element?.focus();
	}
</script>

<div bind:this={wrapper}></div>
