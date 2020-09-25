import styles from "styles/Player.module.scss";
import useSWR from "swr";
import { fetcher } from "lib/fetcher";

export default function PlayerComponent(props) {
  const access_token = props.token;
  const { data, error } = useSWR(
    "https://api.spotify.com/v1/me/player",
    (url) =>
      fetcher(url, {
        headers: { Authorization: "Bearer " + access_token },
      }),
    {
      refreshInterval: 2000,
    }
  );

  let content;
  if (error) {
    content = (
      <div>
        <p>An Error occured! {error}</p>
      </div>
    );
  } else if (!data) {
    content = (
      <div>
        <p>Loading...</p>
      </div>
    );
  } else if (data) {
    console.log(data);
    if (!data.item) {
      content = (
        <div>
          <p>Nothing is played right now...</p>
        </div>
      );
    } else {
      content = (
        <div>
          <p>{data.item.name}</p>
        </div>
      );
    }
  }

  return <main className={styles.main}>{content}</main>;
}
