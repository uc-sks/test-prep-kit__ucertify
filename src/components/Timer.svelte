<script>
	import { tweened } from 'svelte/motion';
	let original = 2 * 60; 
	let timer = tweened(original);
	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
	$: minutes = Math.floor($timer / 60);
	$: seconds = Math.floor($timer - minutes * 60);
</script>

{#if minutes == 0 && seconds == 0}
	<div class="mainModal">
		<div class="modal">
			<h3>Test Time is Over</h3>
			<a href="/resultPage"><button>See Your Result</button></a>
		</div>
	</div>
	<h4>
		{#if minutes.toString().length > 1}
			<span>{minutes}:</span>
		{:else}
			<span>0{minutes}:</span>
		{/if}
		{#if seconds.toString().length > 1}
			<span>{seconds}</span>
		{:else}
			<span>0{seconds}</span>
		{/if}
	</h4>
{:else}
	<h4>
		{#if minutes.toString().length > 1}
			<span>{minutes}:</span>
		{:else}
			<span>0{minutes}:</span>
		{/if}
		{#if seconds.toString().length > 1}
			<span>{seconds}</span>
		{:else}
			<span>0{seconds}</span>
		{/if}
	</h4>
{/if}

<style>
	.mainModal {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.modal {
		padding: 10px;
		border-radius: 8px;
		min-width: 300px;
		max-width: 400px;
		min-height: 200px;
		margin: 10% auto;
		text-align: center;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.modal > a > button {
		width: 150px;
		display: inline-block;
		background: #027ad6;
		border: none;
		cursor: pointer;
		height: 30px;
		margin-top: 10px;
	}
</style>
