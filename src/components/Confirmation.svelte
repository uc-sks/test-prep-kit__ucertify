<script>
	export let show = false;
</script>

{#if show}
	<div class="confirm__box">
		<div class="modal">
			<h2>Are you sure want to end the test</h2>
			<div class="buttons">
				<button on:click|self={() => (show = false)}>NO</button>
				<a href="/resultPage">
					<button>YES</button>
				</a>
			</div>
		</div>
	</div>
{/if}

<style>
	.confirm__box {
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}
	.modal{
		padding: 10px;
		border-radius: 8px;
		max-width: 400px;
		margin: 10% auto;
		text-align: center;
		background: white;
	}
	.buttons button {
		width: 80px;
		height: 30px;
		display: inline-block;
		margin-top: 20px;
		background: #027ad6;
		border: none;
		color: #fff;
		cursor: pointer;
	}
</style>
