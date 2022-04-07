<script>
	import '../../src/index.css'
	export let show = false;
</script>

{#if show}
	<div class="confirm_box flex justify_center items_center">
		<div class="modal flex flex_colomn items_center">
			<h2>Are you sure want to end the test</h2>
			<div class="buttons">
				<button class="button" on:click|self={() => (show = false)}>NO</button>
				<a href={"/resultPage"}>
					<button class="button">YES</button>
				</a>
			</div>
		</div>
	</div>
{/if}

