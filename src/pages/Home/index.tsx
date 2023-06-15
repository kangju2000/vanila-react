import { useContext } from '@/core/Kreact';
import { RouterContext } from '@/App';
import styles from './index.module.css';

export default function Home() {
  const router = useContext(RouterContext);

  return (
    <div className={styles.home}>
      <button className={styles.home__button} onClick={() => router.push('/todolist')}>
        또두리스트로 가기
      </button>
    </div>
  );
}
