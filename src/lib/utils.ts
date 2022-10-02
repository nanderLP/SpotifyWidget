const randomString = (length: number) => {
	return Array.from(window.crypto.getRandomValues(new Uint8Array(length / 2)), (d) =>
		d.toString(16).padStart(2, '0')
	).join('');
};

export { randomString };
