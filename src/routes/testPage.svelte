<script>
	import Header from '../components/Header.svelte';
	import Navigator from '../components/Navigator.svelte';
	import { attemptQuestion, questionAnswerData, answerCheckedByUser, chooseAns } from '../store';
	import { onMount } from 'svelte';
	let currentQues = 0; // which ques will be show on the page 'for one question per page'
	let dataValueIs = []; // for collecting the json data
	let checkedOpt = []; // for chossing the option (binding the ques with answer)
	let userAnswer = []; // for user selection (ques, answer of that ques)
	let useCheckAns; //for comparing the prev que to next que by user selected
	// answer selected by user
	$: chooseAns.update((items) => {
		return [...checkedOpt];
	});
	// fetching data from json file and seting that data to store
	onMount(async () => {
		const res = await fetch(`/data/jsonFile.json`);
		dataValueIs = await res.json();
		questionAnswerData.set(dataValueIs);
	});
	// this function is run when user click on radio button
	const getClassList = (j, i) => {
		const que = JSON.parse(dataValueIs[currentQues].content_text).question; // for collecting the queston
		const ans = JSON.parse(dataValueIs[currentQues].content_text).answers[j].is_correct; // for collection the correct or incorrect answer(1 or 0)
		const id = JSON.parse(dataValueIs[currentQues].content_text).answers[j].id; // for collecting the answer id(choose by user when click on radio button)
		// if user selected more than one question
		if (userAnswer.length > 0) {
			useCheckAns = {
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			};
			// for comparing the dubliccasy of question
			for (let i = 0; i <= userAnswer.length; i++) {
				if (userAnswer[i].userQue == useCheckAns.userQue) {
					userAnswer[i] = useCheckAns;
					useCheckAns;
					break;
				} else {
					userAnswer.push(useCheckAns);
				}
			}
		}
		// if user select only one question
		if (userAnswer.length == 0) {
			userAnswer.push({
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			});
		}
		// if the dublicasy will be, the remove the dublicasy here
		let userSelected = Object.values(
			userAnswer.reduce((acc, cur) => Object.assign(acc, { [cur.userQue]: cur }), {})
		);
		// all attempted question goes here
		answerCheckedByUser.set(userSelected);
		for (i = 0; i <= userSelected.length; i++) {
			attemptQuestion.update((x) => (x = userSelected.length));
		}
	};
	// prev button
	const prevPage = () => {
		currentQues = currentQues - 1;
	};
	// next button
	const nextPage = () => {
		currentQues = currentQues + 1;
	};
	// showing ques per page (which one should be show depend on the currentQues)
	const updateQues = (event) => {
		currentQues = event.detail;
	};
</script>

<div class="test__page">
	<Header />
	<div class="questionsContainer">
		{#each dataValueIs as data, i}
			{#if currentQues === i}
				<div class="question">
					<h3>
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="answer">
						<div class="answerOption">
							{#each JSON.parse(data.content_text).answers as answers, j}
								<label class="answerOptionData">
									<input
										type="radio"
										value={answers.answer}
										name="radio"
										id="radio{j}"
										on:click={() => getClassList(j, i)}
										bind:group={checkedOpt[i]}
									/>
									{@html answers.answer}
								</label>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="textPage__option">
		<Navigator
			on:prevPage={prevPage}
			on:nextPage={nextPage}
			on:updateQues={updateQues}
			{currentQues}
		/>
	</div>
</div>

<style>
	.questionsContainer {
		max-width: 800px;
		margin: 0 auto;
	}
	.answer {
		display: flex;
		flex-direction: column;
	}
	.answerOption {
		display: flex;
		flex-direction: column;
	}
	.textPage__option {
		position: fixed;
		bottom: 10px;
		right: 20px;
		width: 50%;
		border: 1px solid lightgray;
	}
</style>
