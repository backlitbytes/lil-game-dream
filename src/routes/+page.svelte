<script lang="ts">
	import AllCarts from '../components/carts/AllCarts.svelte';
	import { handleInputUp } from '../stores/global-inputs';
	import { onMount } from 'svelte';
	import { loadAudio } from '../audio/sounds';
	import { winnerChickenDinner } from '../stores/winner';
	import Gamedream from '../components/gamedream/Gamedream.svelte';

	onMount(() => {
		loadAudio();
		window.addEventListener('mouseup', handleInputUp);
		window.addEventListener('touchend', handleInputUp);
	});
</script>

<div class="wrapper" class:winner={$winnerChickenDinner}>
	<AllCarts />
	<Gamedream><div id="game-screen" /></Gamedream>
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
