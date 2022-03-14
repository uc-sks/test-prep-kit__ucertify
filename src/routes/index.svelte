<script>
	import Header from '../components/Header.svelte';
</script>

<Header />
<div class="start_button">
	<a href="/testPage">
		<button class="start">Start Test</button>
	</a>
</div>

<style>
	.start_button {
		display: grid;
		min-height: 100vh;
		place-items: center;
	}
	.start {
		width: 100px;
		outline: none;
		cursor: pointer;
		height: 40px;
		background-color: #b0281a;
		border-radius: 4px;
		border: none;
		color: #fff;
	}
</style>
