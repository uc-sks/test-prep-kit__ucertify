<script>
	/**
	 *	fileName  		:  		resultPage.svelte
	 *	Description 	: 		showing result page
	 *	Author   		: 		shivam singh
	 *	version 		: 		1.0
	 *	created 		: 		08-feb-2022;
	 *	updated by 		: 		shivam singh   <shivam.singh@ucertify.com>
	 *	updated date 	: 		05-Apr-2022
	 */
	import {
		question_data,
		choose_ans,
		review_navi,
		answerchoosebyuser,
		actualcorrect
	} from '../store';
	import Header from '../components/Header.svelte';
	let correct = 0;
	let incorrect = 0;
	let percentage = 0;
	let answerchoosebyuser_arr = [];
	let actualcorrect_arry = [];
	const reviewPage = () => {
		review_navi.set(true);
	};
	$: unselected_ques = 0;
	$: for (let i = 0; i < $question_data.length; i++) {
		let correct_indx = 0;
		if ($choose_ans[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($question_data[i].content_text).answers[j].answer == $choose_ans[i]) {
					correct_indx = j;
				}
			}
		} else {
			correct_indx = null;
		}
		answerchoosebyuser_arr[i] = correct_indx;
		$answerchoosebyuser[i] = correct_indx;
	}
	$: for (let i = 0; i < $question_data.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($question_data[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualcorrect_arry[i] = actualCorrect;
		$actualcorrect[i] = actualCorrect;
	}
	$: for (let i = 0; i < answerchoosebyuser_arr.length; i++) {
		if (answerchoosebyuser_arr[i] != null) {
			if (answerchoosebyuser_arr[i] == actualcorrect_arry[i]) {
				correct = correct + 1;
				percentage = Math.round((correct / 11) * 100);
			} else {
				incorrect = incorrect + 1;
			}
		} else {
			unselected_ques += 1;
		}
	}
</script>

<div class="resultPage">
	<Header />
	<div class="resultPage_container flex">
		<div class="result_data flex flex_colomn items_center justify_center percentage">
			<h3>Result</h3>
			<p>{percentage} %</p>
		</div>
		<div class="result_data flex flex_colomn items_center justify_center totalItem">
			<h3>Total item</h3>
			<p>11</p>
		</div>
		<div class="result_data flex flex_colomn items_center justify_center correct">
			<h3>Correct</h3>
			<p>{correct}</p>
		</div>
		<div class="result_data flex flex_colomn items_center justify_center incorrect">
			<h3>Inorrect</h3>
			<p>{incorrect}</p>
		</div>
		<div class="result_data flex flex_colomn items_center justify_center unattemted">
			<h3>Unattempted</h3>
			<p>{unselected_ques}</p>
		</div>
	</div>
	<div class="resultanswer_container">
		{#each $question_data as ques, i}
			<a href={`review/${i}`} on:click={reviewPage}>
				<div class="answer_container flex items_center">
					<div class="number flex items_center justify_center">
						<span>{i + 1}</span>
					</div>
					<h4 class="question_width posi_abso question_test">{ques.snippet}</h4>
					<div class="result_option posi_abso flex">
						{#each JSON.parse(ques.content_text).answers as _, j}
							<div
								class="{`${
									actualcorrect_arry[i] == j
								}`} answer  flex  items_center justify_center"
								class:selected={actualcorrect_arry[i] != answerchoosebyuser_arr[i] &&
								answerchoosebyuser_arr[i] == j
									? true
									: false}
							>
								<p>{String.fromCharCode(65 + j)}</p>
							</div>
						{/each}
					</div>
					<div class="attem">

					
					{#if answerchoosebyuser_arr[i] == actualcorrect_arry[i]}
						<span>Correct</span>
					{:else if answerchoosebyuser_arr[i] == null}
						<span>Unattempted</span>
					{:else}
						<span>Incorrect</span>
					{/if}
				</div>
				</div>
			</a>
		{/each}
	</div>
</div>
<a href="/">
	<button class="button textPage_option" style="width: 200px;">Go To Dashboard</button>
</a>
<style>
.attem{
width: 100px;
text-align: right;
}
</style>
