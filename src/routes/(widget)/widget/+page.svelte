<script lang="ts">
	import { createPlaybackStore } from '$lib/playback';
	import { onMount } from 'svelte';
	import { prominent, average } from 'color.js';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import { determineTextColor } from '$lib/utils';

	export let data: PageData;

	const playback = createPlaybackStore(data.playback);

	let containerElement: HTMLElement;

	let albumColors: string;

	const colors = writable<{
		albumName: string;
		prominent: Array<string>;
		average: string;
		textTop: string;
		textBottom: string;
	}>();

	onMount(() => {
		const interval = setInterval(() => {
			playback.update();
			console.log($colors);
		}, 1500);

		playback.subscribe(async (playback) => {
			console.log('playback updated');
			const { album } = playback;
			if (albumColors === album.name) return;
			const averageColor = (await average(playback.album.imageUrl)) as Array<number>;
			const prominentColors = (await prominent(playback.album.imageUrl)) as Array<Array<number>>;
			// https://stackoverflow.com/a/635073/19214879
			const songNameColor = determineTextColor(prominentColors[1]);
			const artistsColor = determineTextColor(prominentColors[0]);
			const style = containerElement.style;
			style.setProperty('--a', averageColor.join(','));
			for (let color in prominentColors) {
				style.setProperty(`--p-${Number(color) + 1}`, prominentColors[color].join(','));
			}
			style.setProperty('--t-t', songNameColor);
			style.setProperty('--t-b', artistsColor);
			albumColors = album.name;
			/*colors.set({
				prominent: prominentColors,
				average: averageColor,
				albumName: album.name,
				textTop: songNameColor,
				textBottom: artistsColor
			});*/
		});

		return () => {
			clearInterval(interval);
		};
	});
</script>

<main class="w-full h-screen flex gap-2" class:activeBg={albumColors} bind:this={containerElement}>
	<div class="h-screen w-auto p-4 aspect-ratio-1">
		<img id="cover" src={$playback.album.imageUrl} alt="album cover" />
	</div>
	<div id="description" class="py-6 flex flex-col justify-center gap-2">
		<h1 id="songName" class:text-4xl={$playback.song.name.length < 20}>{$playback.song.name}</h1>
		<h2 id="artists">{$playback.artists.map((a) => a.name).join(', ')}</h2>
	</div>
</main>

<style>
	main {
		transition: all 1s;
	}
	main.activeBg {
		background-color: rgb(var(--a));
		background-image: radial-gradient(at 60% 81%, rgb(var(--p-1)) 0px, transparent 50%),
			radial-gradient(at 71% 40%, rgb(var(--p-2)) 0px, transparent 50%),
			radial-gradient(at 30% 35%, rgb(var(--p-3)) 0px, transparent 50%);

		/*
		radial-gradient(at 50% 81%, rgb(199, 179, 198) 0px, transparent 50%), 
		radial-gradient(at 71% 40%, rgb(77, 199, 79) 0px, transparent 50%), 
		radial-gradient(at 30% 35%, rgb(219, 179, 198) 0px, transparent 50%)
		*/
	}

	#songName {
		color: var(--t-t);
		transition: color 0.5s;
	}

	#artists {
		color: var(--t-b);
		transition: color 0.5s;
	}
	#cover {
		border-radius: 10%;
		background-size: contain;
		aspect-ratio: 1;
		box-shadow: 0 5px 10px rgba(0, 0, 37, 0.07);
	}

	#description > * {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
