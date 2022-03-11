<script>
	import { fly } from 'svelte/transition';
	import { attemptQuestion } from '../store';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let show = false;
	let dataValueIs = [];
	onMount(async () => {
		const res = await fetch(`/data/jsonFile.json`);
		dataValueIs = await res.json();
	});
	let questionValue;
	attemptQuestion.subscribe((value) => {
		questionValue = value;
	});
	const displayQues = (i) => {
		dispatch('displayQuesNum', i);
	};
	function truncate(input) {
		if (input.length > 12) {
			return input.substring(0, 12) + '...';
		}
		return input;
	}
</script>

{#if show}
	<div class="list" transition:fly={{ x: -250, opacity: 1 }}>
		<p>Attempte question :{questionValue}</p>
		<p>Unuttempted Question {11 - questionValue}</p>
		{#each dataValueIs as data, i}
			<!-- svelte-ignore a11y-accesskey -->
			<h4 class="para" on:click={() => displayQues(i)} accesskey={`${i+1}`}>Question {i + 1}   <span>{truncate(`${JSON.parse(data.content_text).question}`)}</span> </h4>
		{/each}
	</div>
{/if}

<style>
	.list {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		padding: 2rem 1rem 0.6rem;
		border: 1px solid #aaa;
		background: #fff;
		overflow-y: auto;
		width: 15rem;
		color: black;
		display: flex;
		flex-direction: column;
	}
	.para {
		margin-top: 10px;
	}
	.para:hover {
		cursor: pointer;
		color: red;
	}
</style>
