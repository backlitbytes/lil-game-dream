<script lang="ts">
	export let isLeft: boolean;
</script>

<div class="deet">
	<div
		class="deet-deet"
		style:transform={isLeft ? 'rotateZ(45deg)' : 'rotateZ(136deg)'}
		style:left={isLeft ? '-0.5px' : undefined}
		style:right={isLeft ? undefined : '-0.5px'}
	/>
</div>

<style>
	.deet {
		position: relative;
		height: 100%;
		width: 100%;
		background-color: hsl(var(--hue), var(--sat), 40%);
	}

	.deet-deet {
		--size: 3.5px;

		width: 0px;
		height: 0px;
		border-top: var(--size) solid transparent;
		border-bottom: var(--size) solid transparent;
		border-right: var(--size) solid hsl(var(--hue), var(--sat), 10%);
		transform: rotateZ(45deg);
		position: absolute;
		top: -2.5px;
	}
</style>
