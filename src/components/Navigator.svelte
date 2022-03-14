<script>
	import Timer from './Timer.svelte';
	import Confirmation from './Confirmation.svelte';
	import { createEventDispatcher } from 'svelte';
	import { reviewNavigator } from '../store';
	import Sidebar from './Sidebar.svelte';
	import { onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	export let currentQues;
	let reviewPageCheck;
	let sidebar_show = false;
	let confirm_show = false;
	export let questionId;
	questionId = Number(questionId);
	onMount(() => {
		reviewNavigator.subscribe((value) => {
			reviewPageCheck = value;
		});
	});
	const prevPage = () => {
		dispatch('prevPage');
	};
	const nextPage = () => {
		dispatch('nextPage');
	};
	const displayQuesNum = (event) => {
		dispatch('updateQues', event.detail);
	};
</script>

{#if !reviewPageCheck}
	<div class="navigator">
		<div class="navigator__option">
			<Timer />
			<!-- svelte-ignore a11y-accesskey -->
			<button on:click={() => (sidebar_show = !sidebar_show)} accesskey="l"> List </button>
			<Sidebar bind:show={sidebar_show} on:displayQuesNum={displayQuesNum} />
			{#if currentQues < 1}
				<button on:click={prevPage} disabled>Previous</button>
			{:else}
				<button on:click={prevPage}>Previous</button>
			{/if}
			<div class="pagination">
				<h4>{currentQues + 1} of 11</h4>
			</div>
			{#if currentQues + 1 > 10}
				<!-- svelte-ignore a11y-accesskey -->
				<button on:click={nextPage} disabled accesskey="n">Next</button>
			{:else}
				<!-- svelte-ignore a11y-accesskey -->
				<button on:click={nextPage} accesskey="n">Next</button>
			{/if}
			<!-- svelte-ignore a11y-accesskey -->
			<button on:click={() => (confirm_show = !confirm_show)} accesskey="t">End Test</button>
		</div>
	</div>
	<Confirmation bind:show={confirm_show} />
{:else}
	<div class="navigator">
		<div class="navigator__option">
			<!-- svelte-ignore a11y-accesskey -->
			<button on:click={() => (sidebar_show = !sidebar_show)} accesskey="l"> List </button>
			<Sidebar bind:show={sidebar_show} on:displayQuesNum={displayQuesNum} />
			{#if questionId < 1}
				<button on:click={prevPage} disabled>Previous</button>
			{:else}
				<button on:click={prevPage}>Previous</button>
			{/if}
			<div class="pagination">
				<h4>{questionId + 1} of 11</h4>
			</div>
			{#if questionId + 1 > 10}
				<!-- svelte-ignore a11y-accesskey -->
				<button on:click={nextPage} disabled accesskey="n">Next</button>
			{:else}
				<!-- svelte-ignore a11y-accesskey -->
				<button on:click={nextPage} accesskey="n">Next</button>
			{/if}
			<a href="/">
				<!-- svelte-ignore a11y-accesskey -->
				<button accesskey="b">Dashboard</button>
			</a>
		</div>
	</div>
{/if}

<style>
	.navigator__option {
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 10px 0px;
		background-color: white;
	}
	.navigator__option button {
		width: 70px;
		height: 30px;
		border: 1px solid #0066cc;
		background-color: #0099cc;
		color: #ffffff;
	}
	.navigator__option > button:hover {
		background-color: #00aacc;
		cursor: pointer;
	}
</style>
