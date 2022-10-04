const randomString = (length: number) => {
	return Array.from(window.crypto.getRandomValues(new Uint8Array(length / 2)), (d) =>
		d.toString(16).padStart(2, '0')
	).join('');
};

/**
 * Decide if the cookies or the query should be used to get the tokens
 * Refreshed tokens will be stored in the cookies and take precedence
 */
const getTokensServer = (ctx: any) => {
	const query = ctx.url.searchParams;
	const cookies = ctx.cookies;

	const accessToken = cookies.get('spotify_access_token') || query.get('access_token');
	const refreshToken = cookies.get('spotify_refresh_token') || query.get('refresh_token');

	return { accessToken, refreshToken };
};

const getTokensBrowser = () => {
	const params = new URLSearchParams(window.location.search);

	const accessToken =
		document.cookie.split('spotify_access_token=')[1]?.split(';')[0] || params.get('access_token');
	const refreshToken =
		document.cookie.split('spotify_refresh_token=')[1]?.split(';')[0] ||
		params.get('refresh_token');

	return { accessToken, refreshToken };
};

// tysm https://stackoverflow.com/a/6511606/19214879
const determineTextColor = (rgb: Array<number>) => {
	const luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
	return luma >= 165 ? '#000000' : '#ffffff';
};

export { randomString, getTokensServer, getTokensBrowser, determineTextColor };
