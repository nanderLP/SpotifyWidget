import { SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { refreshTokens } from '$lib/auth';
import { fetchRemotePlaybackState } from '$lib/playback';
import { getTokensServer } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (ctx) => {
	const { accessToken, refreshToken } = getTokensServer(ctx);

	if (!accessToken || !refreshToken) {
		throw error(400, 'Missing tokens');
	}

	try {
		const playback = await fetchRemotePlaybackState(accessToken);
		return { playback };
	} catch (e: any) {
		if (e.status === 401) {
			// request refresh
			const {
				access_token: newAccessToken,
				refresh_token: newRefreshToken,
				expires_in
			} = await refreshTokens(refreshToken, SPOTIFY_CLIENT_SECRET);
			// store new tokens
			ctx.cookies.set('spotify_access_token', newAccessToken, {
				maxAge: expires_in,
				secure: true
			});
			ctx.cookies.set('spotify_refresh_token', newRefreshToken, {
				secure: true
			});
			// retry
			const playback = await fetchRemotePlaybackState(newAccessToken);
			return { playback };
		} else throw e;
	}
};
