<script lang="ts">
	import { startFlow } from '$lib/spotify';
</script>

<main>
	<h1 class="mb-4">Spotify Widget</h1>
	<div class="">
		<p class="mt-2">Connect your Spotify Account to use the OBS Widget</p>
		<button class="mt-2 bg-spotify" on:click={startFlow}>Log in with Spotify</button>
	</div>
</main>
