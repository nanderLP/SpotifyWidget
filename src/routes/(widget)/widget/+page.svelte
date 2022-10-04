<script lang="ts">
	import { createPlaybackStore } from '$lib/playback';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const playback = createPlaybackStore(data.playback);

	onMount(() => {
		const interval = setInterval(() => {
			playback.update();
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<main class="w-full max-h-full bg-white flex flex-wrap">
	<div class="w-600px max-w-screen max-h-screen">
		<img src={$playback.album.imageUrl} alt="album cover" class="" />
	</div>
	<h1>{$playback.song.name}</h1>
</main>
