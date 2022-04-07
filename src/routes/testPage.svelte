<script>
	/**
	 *	fileName  		:  		testPage.svelte
	 *	Description 	: 		showing test page with question answer and navigator data
	 *	Author   		: 		shivam singh
	 *	version 		: 		1.0
	 *	created 		: 		08-feb-2022;
	 *	updated by 		: 		shivam singh   shivam.singh@ucertify.com
	 *	updated date 	: 		05-Apr-2022
	 */

	import '../../src/index.css';
	import Header from '../components/Header.svelte';
	import { question_data, choose_ans } from '../store';
	import { onMount } from 'svelte';
	import Navigator from '../components/Navigator.svelte';
	let questionjson_data = [];
	let checked_opt = [];
	let current_ques = 0;
	onMount(async () => {
		$choose_ans = checked_opt;
		const response = await fetch(`/data/jsonFile.json`);
		questionjson_data = await response.json();
		question_data.set(questionjson_data);
	});
</script>
<div class="test_page">
	<Header />
	<div class="ques_cntnr">
		{#each questionjson_data as data, i}
			{#if current_ques === i}
				<div class="question">
					<h3 class="question_test">
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="flex flex_colomn" style="margin-top: 30px;">
						<div class="answerOption flex flex_colomn">
							{#each JSON.parse(data.content_text).answers as answers, j}
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
												bind:group={checked_opt[i]}
											/>
										</div>
									</div>
									<span class="answer_data">{@html answers.answer}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>
	<div class="textPage_option width_50">
		<Navigator
			on:prevPage={() => (current_ques -= 1)}
			on:nextPage={() => (current_ques += 1)}
			on:updateQues={(event) => (current_ques = event.detail)}
			{current_ques}
		/>
	</div>
</div>

<style>
	
</style>
