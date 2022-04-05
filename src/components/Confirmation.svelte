<script>
	export let show = false;
	import '../../src/index.css'
</script>

{#if show}
	<div class="confirm__box flex justify__center items__center">
		<div class="modal flex flex__colomn items__center">
			<h2>Are you sure want to end the test</h2>
			<div class="buttons">
				<button class="button" on:click|self={() => (show = false)}>NO</button>
				<a href="/resultPage">
					<button class="button">YES</button>
				</a>
			</div>
		</div>
	</div>
{/if}

