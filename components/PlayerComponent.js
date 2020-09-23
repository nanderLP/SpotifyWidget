import styles from "../styles/Player.module.scss";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function PlayerComponent(props) {
  const access_token = props.token;
  const { data, error } = useSWR(
    "https://api.spotify.com/v1/me/player",
    (url) =>
      fetcher(url, {
        headers: { Authorization: "Bearer " + access_token },
      }),
    { initialData: props.data }
  );

  return (
    <main className={styles.main}>
      <p>{data.item.name}</p>
    </main>
  );
}

export async function getStaticProps() {
  const data = fetcher('https://api.spotify.com/v1/me/player', {
    headers: { Authorization: "Bearer " + access_token },
  });
  return { props: { data } };
}
