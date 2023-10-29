<script lang="ts">
	import { isOn } from '../../stores/gamedream';
</script>

<div class="wrapper">
	<div class="flex">
		<div class="light" class:off={!$isOn} />
		<div class="rays">)))</div>
	</div>
	<div class="text">power</div>
</div>

<style>
	.flex {
		display: flex;
		align-items: center;
	}

	.wrapper {
		position: absolute;
		left: 3px;
		top: 70px;
	}

	.light {
		background-color: red;
		border-radius: 100%;
		width: 5px;
		height: 5px;
		box-shadow: 0px 0px 3px 3px rgba(255, 0, 0, 0.2);
		margin-top: 1px;
	}

	.rays {
		color: grey;
		font-size: 7px;
		font-weight: 600;
		margin-left: 8px;
		transform: scaleY(0.8) scaleX(2);
	}

	.text {
		font-size: 6px;
		text-transform: uppercase;
		color: grey;
		margin-top: 4px;
	}

	.off {
		background-color: black;
		box-shadow: none;
	}
</style>
