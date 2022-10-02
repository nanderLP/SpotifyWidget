import { requestToken, validateResponse } from '$lib/spotify';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const stateCookie = ctx.cookies.get('spotify_auth_state');

	if (!stateCookie) {
		throw error(400, 'Missing state cookie');
	}

	const code = validateResponse(ctx.url, stateCookie);

	const authData = await requestToken(code, SPOTIFY_CLIENT_SECRET);

	return { authData };
};
