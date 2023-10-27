<script lang="ts">
	import { winnerChickenDinner } from './carts-store';

	let text = 'DREAM';

	$: if ($winnerChickenDinner) {
		text = '100%';
	}

	const funColors = ['red', 'rgb(176, 81, 176)', 'rgb(26, 154, 26)', 'yellow', 'rgb(214, 30, 219)'];
</script>

<div class="wrapper">
	<span class="grey"><span>lil</span><span>game</span></span>
	<span class="colorful">
		{#each text as letter, index (index)}
			<span class="silly" style:color={funColors[index % 5]}>{letter}</span>
		{/each}
	</span>
</div>

<style>
	.wrapper {
		position: absolute;
		bottom: 12px;
		opacity: 0.7;
		filter: blur(0.01px);
	}

	.grey {
		color: grey;
		font-style: italic;
		font-weight: 600;
		text-transform: uppercase;
	}

	.grey span:nth-child(1) {
		margin-right: 2px;
	}

	.colorful {
		font-family: Arial;
		font-weight: 900;
		font-size: 20px;
	}

	.colorful span:nth-child(odd) {
		display: inline-block;
		width: 12px;
		transform: rotateZ(-15deg);
	}

	.colorful span:nth-child(even) {
		display: inline-block;
		width: 12px;
		transform: rotateZ(15deg);
	}
</style>
