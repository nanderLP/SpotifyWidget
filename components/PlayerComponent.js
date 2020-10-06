import styles from "styles/Player.module.scss";
import useSWR from "swr";
import { fetcher } from "lib/fetcher";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PlayerComponent(props) {
  const router = useRouter();
  const [tokens, setTokens] = useState({
    access_token: Cookies.get("access_token") || props.access_token,
    refresh_token: Cookies.get("refresh_token") || props.refresh_token,
  });

  /*fetch("/api/refreshToken?refresh_token=" + refresh_token).then(
    (response) =>
      response.json().then((response) => {
        if (response.refresh_token)
          Cookies.set("refresh_token", response.refresh_token);
        Cookies.set("access_token", response.access_token, {
          expires: 1 / 24, // one hour
        });
        //        if (window !== 'undefined') router.reload();
      })
  );*/

  const { data, error } = useSWR(
    "https://api.spotify.com/v1/me/player",
    (url) =>
      fetcher(url, {
        headers: { Authorization: "Bearer " + tokens.access_token },
      }),
    {
      refreshInterval: 2000,
    }
  );

  console.log(data);
  let content;
  if (error) {
    console.log(error);
    return <p>An Error has occurred!</p>;
  } else if (!data) {
    content = (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (data) {
    content = (
      <div>
        <p>{data.item.name}</p>
      </div>
    );
  }

  return <main className={styles.main}>{content}</main>;
}
