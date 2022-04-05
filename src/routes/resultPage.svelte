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
		question__data,
		choose__ans,
		review__navi,
		answerchoosebyuser,
		actualcorrect
	} from '../store';
	import Header from '../components/Header.svelte';
	let correct = 0;
	let incorrect = 0;
	let percentage = 0;
	let answerchoosebyuser__arr = [];
	let actualcorrect__arry = [];
	$: unselected__ques = 0;
	$: for (let i = 0; i < $question__data.length; i++) {
		let correct__indx = 0;
		if ($choose__ans[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($question__data[i].content_text).answers[j].answer == $choose__ans[i]) {
					correct__indx = j;
				}
			}
		} else {
			correct__indx = null;
		}
		answerchoosebyuser__arr[i] = correct__indx;
		$answerchoosebyuser[i] = correct__indx;
	}
	$: for (let i = 0; i < $question__data.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($question__data[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualcorrect__arry[i] = actualCorrect;
		$actualcorrect[i] = actualCorrect;
	}
	$: for (let i = 0; i < answerchoosebyuser__arr.length; i++) {
		if (answerchoosebyuser__arr[i] != null) {
			if (answerchoosebyuser__arr[i] == actualcorrect__arry[i]) {
				correct = correct + 1;
				percentage = Math.round((correct / 11) * 100);
			} else {
				incorrect = incorrect + 1;
			}
		} else {
			unselected__ques += 1;
		}
	}
	const reviewPage = () => {
		review__navi.set(true);
	};
</script>

<div class="resultPage">
	<Header />
	<div class="resultPage__container flex">
		<div class="resultData flex flex__colomn items__center justify__center percentage">
			<h3>Result</h3>
			<p>{percentage} %</p>
		</div>
		<div class="resultData flex flex__colomn items__center justify__center totalItem">
			<h3>Total item</h3>
			<p>11</p>
		</div>
		<div class="resultData flex flex__colomn items__center justify__center correct">
			<h3>Correct</h3>
			<p>{correct}</p>
		</div>
		<div class="resultData flex flex__colomn items__center justify__center incorrect">
			<h3>Inorrect</h3>
			<p>{incorrect}</p>
		</div>
		<div class="resultData flex flex__colomn items__center justify__center unattemted">
			<h3>Unattempted</h3>
			<p>{unselected__ques}</p>
		</div>
	</div>
	<div class="resultAnswerContainer">
		{#each $question__data as ques, i}
			<a href={`review/${i}`} on:click={reviewPage}>
				<div class="answerContainer flex items__center">
					<div class="number flex items__center justify__center">
						<span>{i + 1}</span>
					</div>
					<h4 class="questionWidth posi__abso">{ques.snippet}</h4>
					<div class="resultOption posi__abso flex">
						{#each JSON.parse(ques.content_text).answers as _, j}
							<div
								class="{`${
									actualcorrect__arry[i] == j
								}`} answer  flex  items__center justify__center"
								class:selected={actualcorrect__arry[i] != answerchoosebyuser__arr[i] &&
								answerchoosebyuser__arr[i] == j
									? true
									: false}
							>
								<p>{String.fromCharCode(65 + j)}</p>
							</div>
						{/each}
					</div>
					{#if answerchoosebyuser__arr[i] == actualcorrect__arry[i]}
						<span>Correct</span>
					{:else if answerchoosebyuser__arr[i] == null}
						<span>Unattempted</span>
					{:else}
						<span>Incorrect</span>
					{/if}
				</div>
			</a>
		{/each}
	</div>
</div>
<a href="/">
	<button class="button textPage__option" style="width: 200px;">Go To Dashboard</button>
</a>
