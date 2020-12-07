import styles from 'styles/Progress.module.scss'

export default function ProgressComponent(props) {
  const { percentage } = props;
  return (
    <div className={styles.progress}>
      <progress className={styles.progressBar} value={percentage}></progress>
    </div>
  );
}
