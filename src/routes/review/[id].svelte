<script context="module">
	export const load = ({ params }) => {
		const id = params.id;
		return {
			props: {
				id: id
			}
		};
	};
</script>

<script>
	/**
	 *	fileName  		:  		[id].svelte
	 *	Description 	: 		showing review page with selected question
	 *	Author   		: 		shivam singh
	 *	version 		: 		1.0
	 *	created 		: 		08-feb-2022;
	 *	updated by 		: 		shivam singh   shivam.singh@ucertify.com
	 *	updated date 	: 		05-Apr-2022
	 */
	import '../../../src/index.css';
	import Header from '../../components/Header.svelte';
	import Navigator from '../../components/Navigator.svelte';
	import { question__data, review__navi, answerchoosebyuser, actualcorrect } from '../../store';
	import { onDestroy } from 'svelte';
	export let id;
	let page__no = Number(id);
	let explanationAnswer;
	$: if (page__no + 1) {
		explanationAnswer = JSON.parse($question__data[page__no].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');
		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
		}
	}
	onDestroy(() => {
		review__navi.set(false);
	});
</script>

<div class="reviewPage">
	<Header />
	<div class="ques__cntnr">
		{#each $question__data as data, i}
			{#if page__no == i}
				<div class="question">
					<h3>
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="flex flex__colomn">
						<div class="answerOption flex flex__colomn">
							{#each JSON.parse(data.content_text).answers as answers, j}
								{#if answers.is_correct == 1}
									<label class="answerOptionData answerOptionData flex items__center">
										<p>{String.fromCharCode(65 + j)}</p>
										<input
											type="radio"
											class="correct__ans mar_l_10"
											value={j}
											name="radio"
											bind:group={answers}
											disabled
										/>
										{@html answers.answer}
									</label>
								{:else}
									<label class="answerOptionData answerOptionData flex items__center">
										<p>{String.fromCharCode(65 + j)}</p>
										<input type="radio" name="radio" disabled class="mar_l_10" />
										{@html answers.answer}
									</label>
								{/if}
							{/each}
						</div>
					</div>
					{#each JSON.parse(data.content_text).answers as answersCorrect}
						{#if answersCorrect.is_correct == 1}
							<div class="explanation">
								<p>{@html explanationAnswer}</p>
							</div>
						{/if}
					{/each}
					{#if $answerchoosebyuser[i] == $actualcorrect[i]}
						<span class="corr_inco_unatt button flex justify__center items__center">Correct</span>
					{:else if $answerchoosebyuser[i] == null}
						<span class="corr_inco_unatt button flex justify__center items__center">Unattempted</span>
					{:else}
						<span class="corr_inco_unatt button flex justify__center items__center">Incorrect</span>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
<div class="textPage__option width__50">
	<Navigator
		question__id={page__no}
		on:updateQues={(event) => (page__no = event.detail)}
		on:nextPage={() => (page__no += 1)}
		on:prevPage={() => (page__no -= 1)}
	/>
</div>
