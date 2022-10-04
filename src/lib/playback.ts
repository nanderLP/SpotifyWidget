import { error } from '@sveltejs/kit';
import { writable } from 'svelte/store';
import { getTokensBrowser } from './utils';

interface PlaybackState {
	playback: {
		playing: boolean;
		progress: number;
		duration: number;
	};

	song: {
		type: 'track' | 'episode' | 'ad' | 'unknown';
		name: string;
		explicit: boolean;
	};

	album: {
		type: 'album' | 'single' | 'compilation';
		name: string;
		imageUrl: string;
	};

	artists: [
		{
			name: string;
		}
	];
}

const parseResponse = (res: any): PlaybackState => {
	const playback = {
		playing: res.is_playing,
		progress: res.progress_ms,
		duration: res.item.duration_ms
	};

	const songItem = res.item;
	const song = {
		type: songItem.type,
		name: songItem.name,
		explicit: songItem.explicit
	};

	const albumItem = songItem.album;
	const album = {
		type: albumItem.album_type,
		name: albumItem.name,
		imageUrl: albumItem.images[0].url
	};

	const artists = songItem.artists.map((artist: any) => ({ name: artist.name }));

	return {
		playback,
		song,
		album,
		artists
	};
};

const fetcher = (token: string) =>
	fetch('https://api.spotify.com/v1/me/player/currently-playing', {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	});

const fetchRemotePlaybackState = async (token: string) => {
	const res = await fetcher(token);
	if (!res.ok) {
		const { error: reqError } = await res.json();
		throw error(reqError.status, reqError.message);
	}
	const data = await res.json();
	return parseResponse(data);
};

const createPlaybackStore = (initialData: PlaybackState) => {
	const { subscribe, set } = writable(initialData);

	// TODO: handle ratelimits with separate store

	return {
		subscribe,
		update: async () => {
			const { accessToken } = getTokensBrowser();

			try {
				if (!accessToken) throw error(400, 'Missing tokens');
				const playbackState = await fetchRemotePlaybackState(accessToken);
				set(playbackState);
			} catch (err: any) {
				if (err.status === 401) {
					// ServerLoad will handle this
					window.location.reload();
				}
			}
		}
	};
};

export { createPlaybackStore, fetchRemotePlaybackState };
