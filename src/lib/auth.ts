import { PUBLIC_SPOTIFY_CLIENT_ID, PUBLIC_SPOTIFY_REDIRECT_URI } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { randomString } from './utils';

type SpotifyAuthData = {
	access_token: string;
	token_type: 'Bearer';
	expires_in: number;
	refresh_token: string;
	scope: string;
};

const scopes = ['user-read-currently-playing'];

const startFlow = () => {
	// build endpoint url
	const endpoint = 'https://accounts.spotify.com/authorize';

	// generate and store state
	const state = randomString(16);
	document.cookie = `spotify_auth_state=${state}; Secure`;

	const params = new URLSearchParams({
		response_type: 'code',
		client_id: PUBLIC_SPOTIFY_CLIENT_ID,
		scope: scopes.join(' '),
		redirect_uri: PUBLIC_SPOTIFY_REDIRECT_URI,
		state
	});

	// redirect to spotify
	window.location.href = `${endpoint}?${params.toString()}`;
};

const validateResponse = (url: URL, cookieState: string) => {
	// extract query
	const query = url.searchParams;

	const state = query.get('state');

	if (!state) {
		throw error(400, 'Missing state');
	}

	if (cookieState !== state) {
		throw error(400, 'Invalid state');
	}

	if (query.has('error')) {
		throw error(400, 'An unexpected error occurred');
	}

	const code = query.get('code');

	if (!code) {
		throw error(400, 'Missing code');
	}

	return code;
};

const requestTokens = async (code: string, spotifySecret: string): Promise<SpotifyAuthData> => {
	const endpoint = 'https://accounts.spotify.com/api/token';

	const formData = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: PUBLIC_SPOTIFY_REDIRECT_URI
	});

	const authHeader = Buffer.from(PUBLIC_SPOTIFY_CLIENT_ID + ':' + spotifySecret).toString('base64');

	const response = await fetch(endpoint, {
		method: 'POST',
		body: formData,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + authHeader
		}
	});

	if (!response.ok) {
		const { error_description } = await response.json();

		throw error(400, error_description);
	}

	const data = await response.json();

	return data;
};

const refreshTokens = async (
	refreshToken: string,
	spotifySecret: string
): Promise<SpotifyAuthData> => {
	const endpoint = 'https://accounts.spotify.com/api/token';

	const formData = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: refreshToken
	});

	const authHeader = Buffer.from(PUBLIC_SPOTIFY_CLIENT_ID + ':' + spotifySecret).toString('base64');

	const response = await fetch(endpoint, {
		method: 'POST',
		body: formData,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + authHeader
		}
	});

	if (!response.ok) {
		const { error_description } = await response.json();

		throw error(400, error_description);
	}

	const data = await response.json();

	return data;
};

export { startFlow, validateResponse, requestTokens, refreshTokens };
