import btoa from "btoa";

export default (req, res) => {
  const code = req.query.code;
  const grant_type = "authorization_code";
  const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;
  if (!code) {
    res.status(404).json({
      error: "Missing code",
    });
  }
  fetch(`https://accounts.spotify.com/api/token`, {
    headers: {
      'Authorization':
        "Basic " +
        btoa(
          process.env.NEXT_PUBLIC_CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code: code,
      grant_type: grant_type,
      redirect_uri: redirect_uri,
    }),
    method: "POST",
  })
    .then((response) => response.json())
    .then((response) => res.status(200).json(response));
};
