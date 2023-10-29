<script lang="ts">
	import { onMount } from 'svelte';
	import BrandText from '../BrandText.svelte';
	import CartDetail from './CartDetail.svelte';
	import type { CartData } from '../../stores/carts';

	export let cartData: CartData;
	export let onClick: any; //TODO: feel shame

	let cart: HTMLDivElement | null = null;

	function updateColor(elem: HTMLDivElement | null, args: { hue?: number; sat?: number }) {
		if (!elem) {
			return;
		}

		if (args.hue !== undefined) {
			elem.style.setProperty('--hue', `${args.hue}`);
		}

		if (args.sat !== undefined) {
			elem.style.setProperty('--sat', `${args.sat}%`);
		}
	}

	onMount(() => {
		updateColor(cart, { hue: cartData.hue, sat: cartData.sat });
	});
</script>

<div class="outer" bind:this={cart}>
	<button class="cartridge" on:click={onClick}>
		<div class="hat" />
		<div class="left-deet">
			<CartDetail isLeft={true} />
		</div>
		<div class="right-deet">
			<CartDetail isLeft={false} />
		</div>
		<div class="upper">
			<div class="emblem">
				<div class="emblem-text">@backlitbytes</div>
			</div>
			<div class="lines">
				{#each Array.from({ length: 5 }) as _}
					<div class="line">
						<div class="inner-line" />
					</div>
				{/each}
			</div>
		</div>
		<div class="lower">
			<div class="arrow" />
			<div class="sticker-area">
				<div class="sticker">
					<div class="name">
						<div class="name-holder">
							<BrandText />
						</div>
					</div>
					<div class="game-art">
						<img
							src={`/images/${cartData.scene}.png`}
							style="max-width: 100%; max-height: 100%;"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>
	</button>
</div>

<style>
	.outer {
		--side: 180px;
		--hat-height: calc(var(--side) * 0.1);
		--hue: 130;
		--sat: 0%;
		--radius: 3px;

		background-color: hsl(var(--hue), var(--sat), 10%);
		padding-bottom: 10px;
		border-bottom-right-radius: 2px;
		border-bottom-left-radius: 2px;
		box-shadow: 2px 2px 2px hsl(var(--hue), var(--sat), 30%) inset,
			-2px -2px 2px hsl(var(--hue), var(--sat), 30%) inset;
		width: var(--side);
	}

	.cartridge {
		width: var(--side);
		height: var(--side);
		position: relative;
		background: hsl(var(--hue), var(--sat), 30%);
		border: none;
		padding: 0;
		cursor: pointer;
		border-bottom-right-radius: var(--radius);
		border-bottom-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
		display: flex;
		flex-direction: column;
		box-shadow: 0px 2px 2px hsl(var(--hue), var(--sat), 30%);
	}

	.upper {
		flex-shrink: 1;
		flex-grow: 0;
		width: 100%;
		padding-top: 4px;
		position: relative;
	}

	.lower {
		flex-grow: 1;
		width: 100%;
		padding: 5px 20px 25px;
		display: flex;
		justify-content: center;
	}

	.hat {
		position: absolute;
		top: calc(var(--hat-height) * -1);
		left: 0;
		width: 90%;
		height: var(--hat-height);
		background-color: hsl(var(--hue), var(--sat), 30%);
		border-top-left-radius: var(--radius);
		border-top-right-radius: var(--radius);
	}

	.left-deet {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 5px;
		height: 65%;
	}

	.right-deet {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 5px;
		height: 65%;
	}

	.emblem {
		width: 80%;
		height: 100%;
		background-color: hsl(var(--hue), var(--sat), 35%);
		background: linear-gradient(
			hsl(var(--hue), var(--sat), 20%) 0%,
			hsl(var(--hue), var(--sat), 30%) 70%,
			hsl(var(--hue), var(--sat), 32%) 100%
		);
		position: absolute;
		top: 2px;
		left: 10%;
		border-radius: 20px;
		border: 2px solid hsl(var(--hue), var(--sat), 30%);
	}

	.emblem-text {
		color: hsl(var(--hue), var(--sat), 20%);
		font-family: monospace;
		font-size: 12px;
		text-align: center;
		text-shadow: 0px -2px 1px hsl(var(--hue), var(--sat), 80%);
		opacity: 0.3;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.line {
		height: 2px;
		padding-top: 2px;
		margin-bottom: 4px;
		width: 101%;
		margin-left: -0.5%;
		background-color: hsl(var(--hue), var(--sat), 30%);
	}

	.inner-line {
		height: 2px;
		background-color: hsl(var(--hue), var(--sat), 10%);
	}

	.sticker-area {
		height: 100%;
		width: 100%;
		box-shadow: inset 1px 1px 1px hsl(var(--hue), var(--sat), 20%),
			inset -1px -1px 1px hsl(var(--hue), var(--sat), 20%);
		border-radius: 3px;
		padding: 4px;
	}

	.sticker {
		width: 100%;
		height: 100%;
		transform: rotateZ(1deg);
		border-radius: 3px;
		overflow: hidden;
		display: flex;
	}

	.name {
		width: 17%;
		height: 100%;
		background-color: hsl(var(--hue), var(--sat), 80%);
		position: relative;
	}

	.name-holder {
		position: absolute;
		top: 29px;
		left: -58px;
		width: 176px;
		transform: rotateZ(270deg) scale(0.8);
	}

	.game-art {
		width: 83%;
		height: 100%;
		background-color: black;
	}

	.arrow {
		width: 0;
		height: 0;
		border-left: 15px solid transparent;
		border-right: 15px solid transparent;

		border-top: 15px solid hsl(var(--hue), var(--sat), 20%);
		opacity: 0.5;
		position: absolute;

		bottom: 5px;
	}
</style>
