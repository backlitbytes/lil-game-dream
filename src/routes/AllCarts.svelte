<script lang="ts">
	import MoveableCart from './MoveableCart.svelte';
	import { cartStore } from './carts-store';
</script>

<div class="wrapper">
	<div class="carts">
		{#each $cartStore as cart, index}
			{#if cart.unlocked}
				<MoveableCart {cart} topPerc={60 * index} leftPerc={index % 2 === 0 ? 0 : 20} />
			{/if}
		{/each}
	</div>
</div>

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
