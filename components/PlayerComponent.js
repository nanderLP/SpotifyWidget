import styles from "styles/Player.module.scss";
import useSWR from "swr";
import { fetcher } from "lib/fetcher";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function PlayerComponent(props) {
  const router = useRouter();
  const access_token = Cookies.get("access_token");
  const { data, error } = useSWR(
    "https://api.spotify.com/v1/me/player",
    (url) =>
      fetcher(url, {
        headers: { Authorization: "Bearer " + access_token },
      }),
    {
      refreshInterval: 2000,
      initialData: initialData,
    }
  );

  let content;
  if (error) {
    if (error && data === undefined) return <p>Loading...</p>;
    //if (window != 'undefined') router.reload()
  } else if (!data) {
    content = (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (data) {
    if (!data.item) {
      content = (
        <div>
          <p>Nothing is played right now...</p>
        </div>
      );
    } else {
      content = (
        <div>
          <p>test</p>
        </div>
      );
    }
  }

  return <main className={styles.main}>{content}</main>;
}
