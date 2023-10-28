<script lang="ts">
	import Gameboy from './Gameboy.svelte';
	import AllCarts from './AllCarts.svelte';
	import { winnerChickenDinner } from './carts-store';
	import { handleInputUp } from './global-inputs';

	window.addEventListener('mouseup', handleInputUp);
	window.addEventListener('touchend', handleInputUp);
</script>

<div class="wrapper" class:winner={$winnerChickenDinner}>
	<AllCarts />
	<Gameboy><div id="game-screen" /></Gameboy>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		padding: 80px 0 30px 0;
		position: relative;
		transition: transform ease-in-out 20s;
	}

	@keyframes hue-rotate {
		from {
			filter: hue-rotate(0deg);
		}
		to {
			filter: hue-rotate(360deg);
		}
	}

	.wrapper.winner {
		background: green;
		animation: hue-rotate 5s linear infinite;
		transform: scale(3);
	}
</style>
