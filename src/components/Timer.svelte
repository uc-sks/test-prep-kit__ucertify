<script>
	import { tweened } from 'svelte/motion';
	import '../../src/index.css'
	let original = 2 * 60; 
	let timer = tweened(original);
	setInterval(() => {
		if ($timer > 0) $timer--;
	}, 1000);
	$: minutes = Math.floor($timer / 60);
	$: seconds = Math.floor($timer - minutes * 60);
</script>

{#if minutes == 0 && seconds == 0}
	<div class="confirm__box flex">
		<div class="modal flex flex__colomn">
			<h3>Test Time is Over</h3>
			<a href="/resultPage">
				<button class="button" style="width: 180px;">See Your Result</button>
			</a>
		</div>
	</div>
	<h4>
		Bye
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