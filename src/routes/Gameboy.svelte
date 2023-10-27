<script lang="ts">
	import { onMount } from 'svelte';
	import BrandText from './BrandText.svelte';
	import CircleButton from './CircleButton.svelte';
	import DPad from './DPad.svelte';
	import PowerLight from './PowerLight.svelte';
	import StartButton from './StartButton.svelte';
	import { assignGameboyRef, gameboyStore } from './gameboy-store';
	import { initializeGame } from './games/choose';

	let gameboy: HTMLDivElement | null = null;

	gameboyStore.subscribe((state) => {
		updateColor(gameboy, { hue: state.hue, sat: state.sat });
	});

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
		assignGameboyRef(gameboy);
		initializeGame('game-screen');
	});
</script>

<div class="gameboy-outer" bind:this={gameboy}>
	<div class="gameboy">
		<div class="shine-gameboy" />
		<div class="gameboy-darken-middle" />
		<div class="gameboy-shine-middle" />
		<div class="screen-outer">
			<PowerLight />
			<BrandText />
			<div class="screen-inner"><slot /></div>
			<div class="shine-screen" />
		</div>
		<div class="logo">@backlitbytes</div>
		<div class="mid-butts">
			<div class="butts-left"><DPad /></div>
			<div class="butts-right">
				<div class="butt-b">
					<CircleButton control="b">B</CircleButton>
				</div>
				<CircleButton control="a">A</CircleButton>
			</div>
		</div>
		<div class="start-buttons">
			<StartButton control="Enter">select</StartButton>
			<StartButton control="Escape">start</StartButton>
		</div>
	</div>
</div>

<style>
	.gameboy-outer {
		--hue: 195;
		--sat: 0%;

		width: 300px;
		aspect-ratio: 3 / 5;
		background-color: hsl(var(--hue), var(--sat), 30%);
		transition: background-color 500ms ease-in-out;
		border-radius: 7px;
		border-bottom-left-radius: 40% 20px;
		border-bottom-right-radius: 40% 20px;
		position: relative;
		z-index: 2;
	}

	.gameboy {
		margin-top: -16px;
		width: 100%;
		height: 100%;
		background-color: hsl(var(--hue), var(--sat), 70%);
		transition: background-color 500ms ease-in-out;
		border-radius: 7px;
		padding: 15px;
		border-bottom-left-radius: 40% 20px;
		border-bottom-right-radius: 40% 20px;
		box-shadow: 1px 1px 3px rgba(209, 209, 209, 0.55) inset, -1px -1px 4px rgba(0, 0, 0, 0.43) inset;
		position: relative;
		overflow: hidden;
	}

	.shine-gameboy {
		position: absolute;
		border-top-left-radius: 7px;
		border-top-right-radius: 7px;
		top: -1px;
		left: -1px;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			168deg,
			rgba(255, 255, 255, 0.3) 0%,
			rgba(122, 122, 122, 0) 52%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
		box-sizing: border-box;
	}

	.logo {
		text-align: center;
		border: solid 1.5px rgba(0, 0, 0, 0.49);
		opacity: 0.3;
		color: rgba(0, 0, 0, 0.49);
		margin: 10px auto;
		text-shadow: 0px -2px 1px rgba(215, 215, 215, 0.74);
		width: 103px;
		border-radius: 13px;
		box-shadow: 0 -2px 1px hsl(var(--hue), var(--sat), 100%);
		font-size: 11px;
		padding-top: 2px;
		padding-left: 3px;
		font-family: monospace;
	}

	.gameboy-darken-middle {
		top: 45%;
		left: 15%;
		width: 70%;
		bottom: 10%;
		position: absolute;
		border-bottom-left-radius: 40% 12px;
		border-bottom-right-radius: 40% 12px;
		background: rgb(0, 0, 0);
		background: linear-gradient(
			307deg,
			rgba(0, 0, 0, 0.7) 0%,
			rgba(0, 0, 0, 0.6) 52%,
			rgba(0, 0, 0, 0.16) 100%
		);
		opacity: 0.1;
		pointer-events: none;
	}

	.gameboy-shine-middle {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		background: rgb(0, 0, 0);
		background: linear-gradient(
				269deg,
				rgba(0, 0, 0, 0.7),
				rgba(0, 0, 0, 0.6) 83%,
				rgba(0, 0, 0, 0.16)
			),
			linear-gradient(71deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6) 66.39%, rgba(0, 0, 0, 0.16));
		opacity: 0.2;
		pointer-events: none;
	}

	.screen-outer {
		width: 100%;
		height: 50%;
		border-radius: 5px;
		background-color: rgb(62, 62, 62);
		border-bottom-left-radius: 40% 20px;
		border-bottom-right-radius: 40% 20px;
		padding: 24px 30px 42px 30px;
		display: flex;
		justify-content: center;
		box-shadow: -1px -2px 3px rgb(1, 1, 1), -1px 0 3px rgba(0, 0, 0, 0.56) inset;
		position: relative;
	}

	.shine-screen {
		position: absolute;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
		top: -1px;
		left: -1px;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			168deg,
			rgba(255, 255, 255, 0.3) 0%,
			rgba(122, 122, 122, 0) 52%,
			rgba(0, 0, 0, 0) 100%
		);
		pointer-events: none;
		box-sizing: border-box;
	}

	.screen-inner {
		flex-grow: 1;
		background-color: rgb(145, 139, 140);
		border-radius: 2px;
		box-shadow: inset 4px 4px 4px rgba(31, 31, 31, 0.5);
	}

	.mid-butts {
		margin-top: 20px;
		display: flex;
		position: relative;
	}

	.butts-left {
		flex-grow: 1;
		padding-left: 40px;
		padding-top: 13px;
	}

	.butts-right {
		flex-grow: 1;
		display: flex;
		justify-content: end;
		padding-right: 8px;
	}

	.butt-b {
		margin-top: 15px;
		margin-right: 15px;
	}

	.start-buttons {
		margin-top: 55px;
		display: grid;
		grid-template-columns: auto auto;
		justify-content: center;
		gap: 16px;
	}
</style>
