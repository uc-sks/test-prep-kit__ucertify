<script>
	import Header from '../components/Header.svelte';
	import { onMount } from 'svelte';
	import { questionAnswerData, answerCheckedByUser, reviewNavigator, chooseAns } from '../store';
	let correct = 0; // for storing the correct answer by user
	let percentage = 0; // to calculate the percentage
	let incorrect = 0; // for incorrect answer by user
	let option = ['A', 'B', 'C', 'D']; // option check by user
	//collecting the correct answer of question (in json)
	let actualCorrectArray = [];
	// collecting the answwer selected by user
	let answerChoosebyUserArr = [];

	$: for (let i = 0; i < $questionAnswerData.length; i++) {
		let correctIndex = 0;
		if ($chooseAns[i]) {
			for (let j = 0; j < 4; j++) {
				if (JSON.parse($questionAnswerData[i].content_text).answers[j].answer == $chooseAns[i]) {
					correctIndex = j;
				}
			}
		} else {
			correctIndex = null;
		}
		answerChoosebyUserArr[i] = correctIndex;
	}

	//
	$: for (let i = 0; i < $questionAnswerData.length; i++) {
		let actualCorrect = 0;
		for (let j = 0; j < 4; j++) {
			if (JSON.parse($questionAnswerData[i].content_text).answers[j].is_correct == '1') {
				actualCorrect = j;
			}
		}
		actualCorrectArray[i] = actualCorrect;
	}

	// subscribing the value of user selected data from json and calculating the details depend on that data
	onMount(() => {
		$answerCheckedByUser.sort(function (a, b) {
			return a.quesNo - b.quesNo;
		});
		// console.log('answer checked by user', answerCheckedByUserResult);
		for (let i = 0; i < $answerCheckedByUser.length; i++) {
			if ($answerCheckedByUser[i].userAns == 1) {
				correct = correct + 1;
				percentage = Math.round((correct / 11) * 100);
			} else {
				incorrect = incorrect + 1;
			}
		}
	});
	// functon to truncate the question
	function truncate(input) {
		if (input.length > 60) {
			return input.substring(0, 60) + '...';
		}
		return input;
	}
	//  if user visit review page the show dashbord button instead of end
	const reviewPage = () => {
		reviewNavigator.set(true);
	};
</script>

<div class="resultPage">
	<Header />
	<div class="resultPage__container">
		<div class="resultData percentage">
			<h3>Result</h3>
			<p>{percentage} %</p>
		</div>
		<div class="resultData totalItem">
			<h3>Total item</h3>
			<p>11</p>
		</div>
		<div class="resultData correct">
			<h3>Correct</h3>
			<p>{correct}</p>
		</div>
		<div class="resultData incorrect">
			<h3>Inorrect</h3>
			<p>{incorrect}</p>
		</div>
		<div class="resultData unattemted">
			<h3>Unattempted</h3>
			<p>{11 - $answerCheckedByUser.length}</p>
		</div>
	</div>
	<div class="resultAnswerContainer">
		{#each $questionAnswerData as ques, i}
			<a href={`review/${i}`} on:click={reviewPage}>
				<div class="answerContainer">
					<div class="number">
						<span>{i + 1}</span>
					</div>
					<h4 class="questionWidth">{truncate(`${JSON.parse(ques.content_text).question}`)}</h4>
					<div class="resultOption">
						{#each option as optionData, j}
							<div
								class="{`${actualCorrectArray[i] == j}`} answer"
								class:selected={actualCorrectArray[i] != answerChoosebyUserArr[i] &&
								answerChoosebyUserArr[i] == j
									? true
									: false}
							>
								<p>{optionData}</p>
							</div>
						{/each}
					</div>
					{#each $answerCheckedByUser as selectQue}
						{#if i + 1 == selectQue.quesNo}
							{#if selectQue.userAns == 0}
								<h3>InCorrect</h3>
							{:else}
								<h3>correct</h3>
							{/if}
						{/if}
					{/each}
				</div>
			</a>
		{/each}
	</div>
</div>
<a href="/">
	<button class="dashboard">Go To Dashboard</button>
</a>
<style>
	a {
		text-decoration: none;
	}
	.resultPage__container {
		max-width: 800px;
		margin: 20px auto;
		border: 2px solid lightgray;
		display: flex;
		justify-content: space-between;
	}
	.resultData {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100px;
		width: 200px;
	}
	.resultAnswerContainer {
		max-width: 800px;
		margin: 20px auto;
	}
	.answerContainer {
		display: flex;
		align-items: center;
		border-top: 1px solid lightgray;
		justify-content: space-between;
		background-color: rgba(0, 0, 0, 0.02);
		padding: 8px 4px;
	}
	.answerContainer > h4 {
		color: black;
	}
	.answerContainer:hover {
		background-color: #ffffff;
		cursor: pointer;
	}
	.questionWidth {
		width: 500px;
		position: absolute;
		left: 28%;
	}
	.resultOption {
		display: flex;
		position: absolute;
		left: 61%;
	}
	.number {
		width: 26px;
		height: 26px;
		background-color: #616970;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
		color: #eee;
	}
	.answer {
		width: 26px;
		height: 26px;
		border: 1px solid blue;
		margin-right: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.true {
		background-color: green;
	}
	.selected {
		background-color: red;
	}
	.dashboard{
		width: 150px;
		height: 40px;
		position: fixed;
		bottom: 15px;
		right: 15px;
		border: none;
		cursor: pointer;
	}
</style>
