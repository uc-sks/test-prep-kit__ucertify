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
	import Header from '../../components/Header.svelte';
	import { questionAnswerData, answerCheckedByUser, reviewNavigator } from '../../store';
	import Navigator from '../../components/Navigator.svelte';
	import { onDestroy } from 'svelte';
	export let id;
	let pageNo = Number(id); // change id(string) to id(number) page no. means storing 1to11
	let explanationAnswer; //
	// replacing the seq string to only one character(A or ,B or, C or, D )
	$: if (pageNo + 1) {
		explanationAnswer = JSON.parse($questionAnswerData[pageNo].content_text).explanation;
		let indexOfSeq = explanationAnswer.indexOf('<seq');
		while (indexOfSeq > -1) {
			let str1 = explanationAnswer.substr(indexOfSeq, 14);
			let currectAnswer = explanationAnswer.charAt(indexOfSeq + 9);
			currectAnswer = currectAnswer.toUpperCase();
			explanationAnswer = explanationAnswer.replace(str1, currectAnswer);
			indexOfSeq = explanationAnswer.indexOf('<seq');
		}
	}
	// updating the question from sidebar list question
	const upDateQuestionPage = (event) => {
		pageNo = event.detail;
	};
	// for next button
	const incrementPage = () => {
		pageNo = pageNo + 1;
	};
	// for previous button
	const decrementPage = () => {
		pageNo = pageNo - 1;
	};
	onDestroy(() => {
		reviewNavigator.update((x) => {
			x = false;
		});
	});
</script>

<div class="reviewPage">
	<Header />
	<div class="questionsContainer">
		{#each $questionAnswerData as data, i}
			{#if pageNo == i}
				<div class="question">
					<h3>
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="answer">
						<div class="answerOption">
							{#each JSON.parse(data.content_text).answers as answers, j}
								{#if answers.is_correct == 1}
									<label class="answerOptionData">
										<p>{String.fromCharCode(65+j)}</p>
										<input
											type="radio"
											class="hello"
											value={j}
											name="radio"
											bind:group={answers}
											disabled
										/>
										{@html answers.answer}
									</label>
								{:else}
									<label class="answerOptionData">
										<p>{String.fromCharCode(65+j)}</p>
										<input type="radio" name="radio" disabled />
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
					{#each $answerCheckedByUser as user}
						{#if i + 1 == user.quesNo}
							{#if user.userAns == '1'}
								<div class="comparationResult">
									<h3>Correct</h3>
								</div>
							{:else}
								<div class="comparationResult">
									<h3>Incorrect</h3>
								</div>
							{/if}
						{/if}
					{/each}
				</div>
			{/if}
		{/each}
	</div>
</div>
<div class="textPage__option">
	<Navigator
		question__id={pageNo}
		on:updateQues={upDateQuestionPage}
		on:nextPage={incrementPage}
		on:prevPage={decrementPage}
	/>
</div>

<style>
	label {
		display: flex;
		align-items: center;
	}
	.answerOptionData{
		display: flex;
		align-items: center;
	}
	.answerOptionData>input{
		margin-left: 10px;
	}
	label > input {
		margin-right: 10px;
	}
	.comparationResult > h3 {
		text-align: center;
	}
	.hello {
		border: 2px solid white;
		box-shadow: 0 0 0 1px #392;
		appearance: none;
		border-radius: 50%;
		width: 12px;
		height: 12px;
		background-color: green;
		transition: all ease-in 0.2s;
	}
	.explanation {
		background-color: rgb(149 200 210 / 33%);
		padding: 8px;
		margin-top: 50px;
	}
	.questionsContainer {
		max-width: 800px;
		margin: 0 auto;
	}
	.answer {
		display: flex;
		flex-direction: column;
		margin-top: 30px;
	}
	.answerOption {
		display: flex;
		flex-direction: column;
	}
	.answerOptionData {
		margin-top: 8px;
	}
	.textPage__option {
		position: fixed;
		bottom: 10px;
		right: 20px;
		width: 50%;
		border: 1px solid lightgray;
	}
</style>
