<script>
	import Header from '../components/Header.svelte';
	import { onMount } from 'svelte';
	import { questionAnswerData, answerCheckedByUser, reviewNavigator } from '../store';
	let questionAnswer = [];
	let correct = 0;
	let percentage = 0;
	let incorrect = 0;
	let answerCheckedByUserResult = [];
	onMount(() => {
		questionAnswerData.subscribe((value) => {
			questionAnswer = value;
		});
	});
	onMount(() => {
		answerCheckedByUser.subscribe((value) => {
			answerCheckedByUserResult = value;
			answerCheckedByUserResult.sort(function (a, b) {
				return a.quesNo - b.quesNo;
			});
			console.log('answer checked by user', answerCheckedByUserResult);
			for (let i = 0; i < answerCheckedByUserResult.length; i++) {
				if (answerCheckedByUserResult[i].userAns == 1) {
					correct = correct + 1;
					percentage = Math.round((correct / 11) * 100);
				} else {
					incorrect = incorrect + 1;
				}
			}
		});
	});
	let option = ['A', 'B', 'C', 'D'];
	function truncate(input) {
		if (input.length > 80) {
			return input.substring(0, 80) + '...';
		}
		return input;
	}
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
			<p>{11 - answerCheckedByUserResult.length}</p>
		</div>
	</div>
	<div class="resultAnswerContainer">
		{#each questionAnswer as ques, i}
			<a href={`review/${i}`} on:click={reviewPage}>
				<div class="answerContainer">
					<div class="number">
						<span>{i + 1}</span>
					</div>
					<h4 class="questionWidth">{truncate(`${JSON.parse(ques.content_text).question}`)}</h4>
					{#each answerCheckedByUserResult as result, k}
						{#if i + 1 == result.quesNo}
							<div class="resultOption">
								{#each option as optionData, j}
									<div
										class="{`${
											JSON.parse(questionAnswer[i].content_text).answers[j].is_correct == 1
										}`} answer"
										class:selected={k <= answerCheckedByUserResult.length
											? answerCheckedByUserResult[k].userOptionCheck == j
											: ''}
									>
										<p>{optionData}</p>
									</div>
								{/each}
							</div>
						{/if}
					{:else}
						<h4>Unattempted</h4>
					{/each}
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.selected {
		background-color: red;
	}
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
		width: 600px;
		position: absolute;
		left: 28%;
	}
	.resultOption {
		display: flex;
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
</style>
