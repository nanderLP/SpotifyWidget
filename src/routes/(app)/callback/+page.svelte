<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	const { access_token, refresh_token } = data.authData;

	let copied = false;

	const widgetUrl =
		$page.url.origin + '/widget?access_token=' + access_token + '&refresh_token=' + refresh_token;

	const copyUrl = async () => {
		await navigator.clipboard.writeText(widgetUrl);
		copied = true;
	};

	const selectAll = (e: Event) => {
		(e?.target as HTMLTextAreaElement).select();
	};
</script>

<main>
	<h1 class="mb-2">You are authorized!</h1>
	<p>Please add a Browser Source to OBS with this URL</p>
	<textarea class="w-full my-2" rows="4" on:click={selectAll} readonly>{widgetUrl}</textarea>
	<button on:click={copyUrl}>{copied ? 'Copied!' : 'Copy to clipboard'}</button>
</main>
