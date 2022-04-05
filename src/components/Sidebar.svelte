<script>
	import '../../src/index.css'
	import { fly } from 'svelte/transition';
	import { question__data, choose__ans } from '../store';
	import { clickOutside } from '../function/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import { truncate } from '../function/truncate';
	import { afterUpdate } from 'svelte';
	const dispatch = createEventDispatcher();
	export let show = false;
	let total__attempted = 0;
	afterUpdate(() => {
		let data = $choose__ans.filter(Boolean);
		total__attempted = data.length;
	});
	const displayQues = (i) => {
		dispatch('displayQuesNum', i);
	};
</script>

{#if show}
	<div class="list flex flex__colomn" transition:fly={{ x: -250, opacity: 1 }}
	 use:clickOutside
	on:click_outside={()=>show=false} 
	on:click={()=>show=false}>
		<p>Attempte question :{total__attempted}</p>
		<p>Unuttempted Question {11 - total__attempted}</p>
		{#each $question__data as data, i}
			<!-- svelte-ignore a11y-accesskey -->
			<h4 class="para" on:click={() => displayQues(i)} accesskey={`${i + 1}`}>
				Ques {i + 1}. <span>{truncate(`${JSON.parse(data.content_text).question}`)}</span>
			</h4>
		{/each}
	</div>
{/if}

