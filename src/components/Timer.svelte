<script>
	import { tweened } from 'svelte/motion';
	import Confirmation from './Confirmation.svelte';
	let original = 2 * 60; // TYPE NUMBER OF SECONDS HERE
	let timer = tweened(original);
	// ------ dont need to modify code below
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
{:else}
	<h4>
		<span class="mins">{minutes}</span><span class="secs">:{seconds}</span>
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
