<script>
	import Header from '../components/Header.svelte';
	import Navigator from '../components/Navigator.svelte';
	import { attemptQuestion, questionAnswerData, answerCheckedByUser } from '../store';
	import { onMount } from 'svelte';
	let currentQues = 0;
	let dataValueIs = [];
	let checkedOpt = ['A', 'B', 'C', 'D'];
	let userAnswer = [];
	let useCheckAns;
	onMount(async () => {
		const res = await fetch(`/data/jsonFile.json`);
		dataValueIs = await res.json();
		questionAnswerData.set(dataValueIs);
		console.log(JSON.parse(dataValueIs[0].content_text).explanation);
	});
	const getClassList = (j, i) => {
		console.log('i is', i);
		const que = JSON.parse(dataValueIs[currentQues].content_text).question;
		const ans = JSON.parse(dataValueIs[currentQues].content_text).answers[j].is_correct;
		const id = JSON.parse(dataValueIs[currentQues].content_text).answers[j].id;
		if (userAnswer.length > 0) {
			useCheckAns = {
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			};
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
		if (userAnswer.length == 0) {
			userAnswer.push({
				quesNo: i + 1,
				userId: id,
				userQue: que,
				userAns: ans,
				userOptionCheck: j
			});
		}
		let userSelected = Object.values(
			userAnswer.reduce((acc, cur) => Object.assign(acc, { [cur.userQue]: cur }), {})
		);
		answerCheckedByUser.set(userSelected);
		for(i=0;i<=userSelected.length;i++){
			attemptQuestion.update((x)=>x=userSelected.length)
		}
		console.log('user selected', userSelected);
	};
	const prevPage = () => {
		currentQues = currentQues - 1;
	};
	const nextPage = () => {
		currentQues = currentQues + 1;
	};
	const updateQues = (event) => {
		currentQues = event.detail;
	};
</script>

<div class="test__page">
	<Header />
	<div class="questionsContainer" >
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
										id={answers.id}
										on:click={() => getClassList(j, i)}
										bind:group={checkedOpt[j]}
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
