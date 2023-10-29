<script lang="ts">
	import { type ValidInput, controlsStore } from '../../stores/controls';
	import { registerInputDown } from '../../stores/global-inputs';

	export let control: ValidInput = 'None';
</script>

<button
	class="disable-select"
	class:active={$controlsStore[control]}
	on:touchstart={(event) => registerInputDown(event, control)}
	on:mousedown={(event) => registerInputDown(event, control)}><slot /></button
>

<style>
	button {
		width: 35px;
		height: 35px;
		background: radial-gradient(circle at 50% 50%, #636363, #4e4e5e);
		border-radius: 50%;
		border: none;
		position: relative;
		cursor: pointer;
		outline: none;
		color: rgba(161, 161, 190, 0.36);
		box-shadow: 0 2px 0 rgba(44, 44, 57, 0.8);
		padding: 5px 4px 0 0;
		font-size: 22px;
		font-family: Monaco;
		text-shadow: 0px 1px 1px #292a2a;
		transform: rotateX(15deg);
		transform-style: preserve-3d;
	}

	button::before {
		content: '';
		position: absolute;
		top: 5%;
		left: 5%;
		right: 5%;
		bottom: 5%;
		border-radius: 50%;
		background: radial-gradient(circle at 80% 80%, #121212, #111);
		opacity: 0.4;
	}

	button:active,
	button.active {
		box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
		transform: translateY(2px) rotateX(15deg);
	}
</style>
