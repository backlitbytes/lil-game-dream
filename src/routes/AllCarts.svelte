<script lang="ts">
	import { fade } from 'svelte/transition';
	import MoveableCart from './MoveableCart.svelte';
	import { cartStore } from '../stores/carts';
	import { onMount } from 'svelte';

	let mounted = false;
	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="wrapper" transition:fade={{ delay: 1000, duration: 1000 }}>
		<div class="carts">
			{#each $cartStore as cart, index}
				{#if cart.unlocked}
					<MoveableCart {cart} topPerc={0} leftPerc={index * 40} />
				{/if}
			{/each}
		</div>
	</div>
{/if}

<style>
	.wrapper {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.carts {
		width: 100%;
		height: 100%;
	}
</style>
