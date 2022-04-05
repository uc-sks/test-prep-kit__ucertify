<script>
	/*
*	fileName  		:  		index.svelte
*	Description 	: 		showing first when server start
*	Author   		: 		shivam singh
*	version 		: 		1.0
*	created 		: 		08-feb-2022;
*	updated by 		: 		shivam singh   <shivam.singh@ucertify.com>
*	updated date 	: 		05-Apr-2022
*/
	import Header from '../components/Header.svelte';
	import '../../src/index.css'
</script>

<Header />
<div class="start_button">
	<a href="/testPage">
		<button class="start button">Start Test</button>
	</a>
</div>

