import styles from "../styles/Player.module.scss";
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function PlayerComponent(props) {
  const access_token = props.access_token;
  const { data, error } = useSWR('') // WIP TODO 

  return (
    <div>
      <main className={styles.main}>
        
      </main>
    </div>
  );
}
