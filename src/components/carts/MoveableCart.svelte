<script lang="ts">
	import { onMount } from 'svelte';
	import Cartridge from './Cartridge.svelte';
	import { startSound } from '../../audio/sounds';
	import { type CartData, cartStore } from '../../stores/carts';
	import { isOn, updateHue, bumpHue, gamedreamElemRef } from '../../stores/gamedream';
	import type { SceneName } from '../../games';

	export let cart: CartData;
	export let topPerc: number;
	export let leftPerc: number;

	let selected = false;
	let placed = false;
	let sceneLoaded = false;

	let animationID: any = 0; // TODO: these id types...
	let sceneSwapID: any = 0;
	let rainbowID: any = 0;

	let switchScene: (newSceneKey: SceneName) => void;
	onMount(async () => {
		switchScene = (await import('../../games')).switchScene;
	});

	function onSelected(isSelected: boolean) {
		clearTimeout(animationID);
		clearInterval(rainbowID);

		if (isSelected) {
			selected = true;
			animationID = setTimeout(() => {
				placed = true;

				clearTimeout(sceneSwapID);
				sceneSwapID = setTimeout(() => {
					isOn.set(true);
					switchScene(cart.scene);
					sceneLoaded = true;
					updateHue({
						hue: cart.hue,
						sat: cart.sat
					});

					startSound.play();

					if (cart.scene.startsWith('Rainbow')) {
						rainbowID = setInterval(bumpHue, 200);
					}
				}, 1000);
			}, 1000);
		} else {
			if (sceneLoaded) {
				clearTimeout(sceneSwapID);
				sceneLoaded = false;
				switchScene('Blank');
				updateHue({
					hue: 0,
					sat: 0
				});
				isOn.set(false);
			}
			placed = false;
			animationID = setTimeout(() => {
				selected = false;
			}, 200);
		}
	}

	$: {
		onSelected(cart.selected);
	}

	const xOffset = 60;

	function gameBox() {
		return gamedreamElemRef?.getBoundingClientRect()!; // TODO, don't bang
	}

	function selectedTransform() {
		return `translate(${gameBox().x + xOffset}px, ${gameBox().y - 120}px) scale(1)`;
	}

	function placedTransform() {
		return `translate(${gameBox().x + xOffset}px, ${gameBox().y - 55}px) scale(1)`;
	}

	function startingTransform() {
		return `scale(0.3) translate(${leftPerc}%, ${topPerc}%)`;
	}
</script>

<div
	class="cart"
	style:transform={selected
		? placed
			? placedTransform()
			: selectedTransform()
		: startingTransform()}
	style:z-index={selected ? 1 : undefined}
>
	<Cartridge cartData={cart} onClick={() => cartStore.toggleSelect(cart.scene, !cart.selected)} />
</div>

<style>
	.cart {
		position: absolute;
		transition: transform 500ms ease-in-out;

		&:hover {
			z-index: 1;
		}
	}
</style>
