<script lang="ts">
	import AllCarts from '../components/carts/AllCarts.svelte';
	import { handleInputUp } from '../stores/click-touch-input-handling';
	import { onMount } from 'svelte';
	import { loadAudio } from '../audio/sounds';
	import { winnerChickenDinner } from '../stores/winner';
	import Gamedream from '../components/gamedream/Gamedream.svelte';
	import { gamedreamStore, isOn } from '../stores/gamedream';

	onMount(() => {
		loadAudio();
		window.addEventListener('mouseup', handleInputUp);
		window.addEventListener('touchend', handleInputUp);
	});

	$: {
		if (typeof window !== 'undefined') {
			if ($isOn) {
				document.body.style.background = `hsl(${$gamedreamStore.hue}deg ${$gamedreamStore.sat}% 75%)`;
			} else {
				document.body.style.background = `white`;
			}
		}
	}
</script>

<div class="wrapper disable-select" class:winner={$winnerChickenDinner}>
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
