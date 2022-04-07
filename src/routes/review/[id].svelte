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
	import { question_data, review_navi, answerchoosebyuser, actualcorrect } from '../../store';
	import { onDestroy } from 'svelte';
	export let id;
	let page_no = Number(id);
	let explanationAnswer;
	$: if (page_no + 1) {
		explanationAnswer = JSON.parse($question_data[page_no].content_text).explanation;
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
		review_navi.set(false);
	});
</script>

<div class="reviewPage">
	<Header />
	<div class="ques_cntnr">
		{#each $question_data as data, i}
			{#if page_no == i}
				<div class="question">
					<h3 class="question_test">
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="flex flex_colomn">
						<div class="answerOption flex flex_colomn">
							{#each JSON.parse(data.content_text).answers as answers, j}
								{#if answers.is_correct == 1}
								<div class="main flex items_center">
									<div class="option_d flex  items_center">
										<!-- svelte-ignore a11y-label-has-associated-control -->
										<label class="label_ans">{String.fromCharCode(65 + j)}</label>
										<div class="input_div flex justify_center items_center">
											<input
												type="radio"
												class="input_radio correct_ans"
												value={answers.answer}
												name="radio"
												id="radio{j}"
						                        
											/>
										</div>
									</div>
									<span class="answer_data">{@html answers.answer}</span>
								</div>
								{:else}
								<div class="main flex items_center">
									<div class="option_d flex  items_center">
										<!-- svelte-ignore a11y-label-has-associated-control -->
										<label class="label_ans">{String.fromCharCode(65 + j)}</label>
										<div class="input_div flex justify_center items_center">
											<input
												type="radio"
												class="input_radio"
												value={answers.answer}
												name="radio"
												id="radio{j}"
												disabled
											/>
										</div>
									</div>
									<span class="answer_data">{@html answers.answer}</span>
								</div>
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
						<span class="corr_inco_unatt button flex justify_center items_center">Correct</span>
					{:else if $answerchoosebyuser[i] == null}
						<span class="corr_inco_unatt button flex justify_center items_center">Unattempted</span>
					{:else}
						<span class="corr_inco_unatt button flex justify_center items_center">Incorrect</span>
					{/if}
				</div>
			{/if}
		{/each}
	</div>
</div>
<div class="textPage_option width_50">
	<Navigator
		question_id={page_no}
		on:updateQues={(event) => (page_no = event.detail)}
		on:nextPage={() => (page_no += 1)}
		on:prevPage={() => (page_no -= 1)}
	/>
</div>
