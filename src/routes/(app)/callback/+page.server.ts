import { requestTokens, validateResponse } from '$lib/auth';
import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const stateCookie = ctx.cookies.get('spotify_auth_state');

	if (!stateCookie) {
		throw error(400, 'Missing state cookie');
	}

	const code = validateResponse(ctx.url, stateCookie);

	const redirectUri = `${ctx.url.origin}/callback`;

	const authData = await requestTokens(code, SPOTIFY_CLIENT_SECRET, redirectUri);

	return { authData };
};
