import styles from "styles/Player.module.scss";
import ProgressComponent from "./Player/ProgressComponent"
import useSWR from "swr";
import { fetcher } from "lib/fetcher";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/router";

export default function PlayerComponent(props) {
  const router = useRouter();
  const [tokens, setTokens] = useState({
    access_token: Cookies.get("access_token") || props.query.access_token,
    refresh_token: Cookies.get("refresh_token") || props.query.refresh_token,
  });

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

  if (error) {
    return <p>An internal Server Error has occurred!</p>;
  }

  if (!data) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (data) {
    if (data.error) {
      console.log("ERROR GEFUNDEN");
      if (data.error.status === 401) {
        // access_token expired
        fetch("/api/refreshToken?refresh_token=" + tokens.refresh_token).then(
          (response) =>
            response.json().then((response) => {
              if (response.refresh_token)
                Cookies.set("refresh_token", response.refresh_token);
              Cookies.set("access_token", response.access_token);
              router.reload();
            })
        );
      }
    } else {
      const item = data.item;
      const artists = item.artists.map((artist) => artist.name).join(', ');
      const currentProgress = data.progress_ms
      const songLength = item.duration_ms
      const progress = currentProgress / songLength;
      return (
        <div className={styles.box}>
          <p className={styles.title}>{item.name}</p>
          <ProgressComponent percentage={progress}/>
          <p className={styles.subtitle}>{artists}</p>
        </div>
      );
    }
  }
}
