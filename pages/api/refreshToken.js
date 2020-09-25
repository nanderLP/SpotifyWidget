import btoa from "btoa";

export default (req, res) => {
  return new Promise((resolve) => {
    const { refresh_token } = req.query;
    const grant_type = "refresh_token";
    if (!refresh_token) {
      res.status(404).send({});
      resolve();
    }
    fetch(`https://accounts.spotify.com/api/token`, {
      headers: {
        Authorization:
          "Basic " +
          btoa(
            process.env.NEXT_PUBLIC_CLIENT_ID + ":" + process.env.CLIENT_SECRET
          ),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        refresh_token: refresh_token,
        grant_type: grant_type,
      }),
      method: "POST",
    })
      .then((response) => response.json())
      .then((response) => {
        res.status(200).json(response);
        resolve();
      });
  });
};