<script>
	import '../../src/index.css'
	import { fly } from 'svelte/transition';
	import { question_data, choose_ans } from '../store';
	import { clickOutside } from '../function/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import { truncate } from '../function/truncate';
	import { afterUpdate } from 'svelte';
	export let show = false;
	const dispatch = createEventDispatcher();
	let total_attempted = 0;
	afterUpdate(() => {
		let data = $choose_ans.filter(Boolean);
		total_attempted = data.length;
	});
	const displayQues = (i) => {
		dispatch('displayQuesNum', i);
	};
</script>

{#if show}
	<div class="list flex flex_colomn" transition:fly={{ x: -250, opacity: 1 }}
	 use:clickOutside
	on:click_outside={()=>show=false} 
	on:click={()=>show=false}>
		<p>Attempte question :{total_attempted}</p>
		<p>Unuttempted Question {11 - total_attempted}</p>
		{#each $question_data as data, i}
			<!-- svelte-ignore a11y-accesskey -->
			<h4 class="para" on:click={() => displayQues(i)} accesskey={`${i + 1}`}>
				Ques {i + 1}. <span>{truncate(`${JSON.parse(data.content_text).question}`)}</span>
			</h4>
		{/each}
	</div>
{/if}

