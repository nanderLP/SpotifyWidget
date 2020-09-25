export const authUrl = () => {
  const client_id = process.env.NEXT_PUBLIC_CLIENT_ID;
  const response_type = "code";
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const scopes = "user-read-playback-state";
  return `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scopes}`;
};
