<script lang="ts">
	import { controlsStore, type ControlState } from './controls-store';
</script>

<div class="dpad-wrapper">
	<div class="shadow">
		<div class="right" />
		<div class="down" />
		<div class="left" />
	</div>

	<div class="dpad">
		<div class="center" />
		<button
			class="up"
			class:active={$controlsStore.ArrowUp}
			on:mousedown={() => controlsStore.update((state) => ({ ...state, ArrowUp: true }))}
			on:mouseup={() => controlsStore.update((state) => ({ ...state, ArrowUp: false }))}
		/>
		<button
			class="right"
			class:active={$controlsStore.ArrowRight}
			on:mousedown={() => controlsStore.update((state) => ({ ...state, ArrowRight: true }))}
			on:mouseup={() => controlsStore.update((state) => ({ ...state, ArrowRight: false }))}
		/>
		<button
			class="down"
			class:active={$controlsStore.ArrowDown}
			on:mousedown={() => controlsStore.update((state) => ({ ...state, ArrowDown: true }))}
			on:mouseup={() => controlsStore.update((state) => ({ ...state, ArrowDown: false }))}
		/>
		<button
			class="left"
			class:active={$controlsStore.ArrowLeft}
			on:mousedown={() => controlsStore.update((state) => ({ ...state, ArrowLeft: true }))}
			on:mouseup={() => controlsStore.update((state) => ({ ...state, ArrowLeft: false }))}
		/>
	</div>
</div>

<style>
	.dpad-wrapper {
		--pad-size: 24px;
		--pad-radius: 3px;

		position: relative;
	}

	.dpad {
		position: relative;
		width: var(--pad-size);
		height: var(--pad-size);
		background: rgb(67, 67, 67);
		transform-style: preserve-3d;
		transform: rotateX(-20deg);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.center {
		border-radius: 100%;
		width: calc(var(--pad-size) - 10px);
		height: calc(var(--pad-size) - 10px);
		background: conic-gradient(
			from 286deg,
			rgba(0, 0, 0, 0.69) 17.23%,
			rgba(0, 0, 0, 0.6) 32.35%,
			rgba(0, 0, 0, 0) 83.19%,
			rgba(0, 0, 0, 0.57)
		);
		opacity: 0.5;
	}

	.shadow {
		position: absolute;
		top: 3px;
		width: var(--pad-size);
		height: var(--pad-size);
		background: rgb(67, 67, 67);
		transform: scaleX(0.99);
	}

	.shadow div {
		background-color: black;
		width: var(--pad-size);
		height: var(--pad-size);
		background: rgb(38, 38, 38);
		border: none;
		cursor: pointer;
		position: absolute;
		border-top-left-radius: var(--pad-radius);
		border-top-right-radius: var(--pad-radius);
	}

	.dpad:has(.up:active),
	.dpad:has(.up.active) {
		transform: rotateX(-30deg);
	}
	.dpad:has(.down:active),
	.dpad:has(.down.active) {
		transform: rotateX(0);
	}
	.dpad:has(.left:active),
	.dpad:has(.left.active) {
		transform: rotateX(-20deg) rotateY(10deg);
	}
	.dpad:has(.right:active),
	.dpad:has(.right.active) {
		transform: rotateX(-20deg) rotateY(-10deg);
	}

	button {
		width: var(--pad-size);
		height: var(--pad-size);
		background: rgb(67, 67, 67);
		border: none;
		cursor: pointer;
		position: absolute;
		border-top-left-radius: var(--pad-radius);
		border-top-right-radius: var(--pad-radius);
		box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset;
	}

	button::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-bottom: 8px solid black;
		transform: translate(-50%, -50%);
		opacity: 0.2;
	}

	.up {
		top: calc(var(--pad-size) * -1);
	}

	.left {
		left: calc(var(--pad-size) * -1);
		transform: rotateZ(-90deg);
	}

	.down {
		bottom: calc(var(--pad-size) * -1);
		transform: rotateZ(180deg);
	}

	.right {
		right: calc(var(--pad-size) * -1);
		transform: rotateZ(90deg);
	}
</style>
