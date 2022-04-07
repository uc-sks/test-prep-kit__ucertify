<script>
	import { createEventDispatcher } from 'svelte';
	import Confirmation from './Confirmation.svelte';
	import { review_navi } from '../store.js';
	import Sidebar from './Sidebar.svelte';
	import Timer from '../components/Timer.svelte';
	export let current_ques; //for changing current question (for next and pre)
	export let question_id;
	const dispatch = createEventDispatcher();
	let sidebar_show = false;
	let confirm_show = false;
	question_id = Number(question_id);
	$: current_ques = !$review_navi ? current_ques : question_id;
	// previous page function
	const prevPage = () => {
		dispatch('prevPage');
	};
	// next page function
	const nextPage = () => {
		dispatch('nextPage');
	};
	//  update question click on sidebar
	const displayQuesNum = (event) => {
		dispatch('updateQues', event.detail);
	};
</script>

<div class="navigator">
	<div class="navigator_option flex items_center">
		{#if !$review_navi}
			<Timer />
		{/if}
		<!-- svelte-ignore a11y-accesskey -->
		<button class="button" on:click={() => (sidebar_show = !sidebar_show)} accesskey="l">
			List
		</button>
		<Sidebar bind:show={sidebar_show} on:displayQuesNum={displayQuesNum} />
		<!-- svelte-ignore a11y-accesskey -->
		<button
			on:click={prevPage}
			class="button"
			accesskey="n"
			disabled={current_ques < 1 ? true : false}>Previous</button
		>
		{#if !$review_navi}
			{#if (current_ques + 1).toString().length > 1}
				<span>{current_ques + 1} of 11</span>
			{:else}
				<span>0{current_ques + 1} of 11</span>
			{/if}
		{:else if (question_id + 1).toString().length > 1}
			<span>{question_id + 1} of 11</span>
		{:else}
			<span>0{question_id + 1} of 11</span>
		{/if}
		<!-- svelte-ignore a11y-accesskey -->
		<button
			on:click={nextPage}
			class="button"
			accesskey="n"
			disabled={current_ques + 1 > 10 ? true : false}>Next</button
		>
		<!-- svelte-ignore a11y-accesskey -->
		{#if !$review_navi}
			<button class="button" accesskey="t" on:click={() => (confirm_show = !confirm_show)}
				>End Test</button
			>
		{:else}
			<a href={"/"}>
				<!-- svelte-ignore a11y-accesskey -->
				<button accesskey="b" class="button">Dashboard</button>
			</a>
			<a href={"/resultPage"}>
				<!-- svelte-ignore a11y-accesskey -->
				<button accesskey="b" class="button">Result</button>
			</a>
		{/if}
	</div>
</div>
<Confirmation bind:show={confirm_show} />
