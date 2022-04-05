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

	import '../../src/index.css'
	import Header from '../components/Header.svelte';
	import { question__data, choose__ans } from '../store';
	import {onMount } from 'svelte';
	import Navigator from '../components/Navigator.svelte';
	let questionjson__data = [];
	let checked__opt = [];
	let current__ques = 0;
	onMount(async () => {
		$choose__ans = checked__opt;
		const response = await fetch(`/data/jsonFile.json`);
		questionjson__data = await response.json();
		question__data.set(questionjson__data);
	});
</script>

<div class="test__page">
	<Header />
	<div class="ques__cntnr">
		{#each questionjson__data as data, i}
			{#if current__ques === i}
				<div class="question">
					<h3>
						{i + 1} . {JSON.parse(data.content_text).question}
					</h3>
					<div class="flex flex__colomn" style="margin-top: 30px;">
						<div class="answerOption flex flex__colomn">
							{#each JSON.parse(data.content_text).answers as answers, j}
								<label class="answerOptionData flex items__center" style="margin-top: 10px;">
									<p>{String.fromCharCode(65+j)}</p>
									<input
										type="radio"
										value={answers.answer}
										name="radio"
										class="mar_l_10"
										id="radio{j}"
										bind:group={checked__opt[i]}
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
	<div class="textPage__option width__50">
		<Navigator
			on:prevPage={()=>current__ques-=1}
			on:nextPage={()=>current__ques+=1}
			on:updateQues={(event)=>current__ques=event.detail}
			{current__ques}
		/>
	</div>
</div>

