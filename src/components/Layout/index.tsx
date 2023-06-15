import Header from './Header';
import styles from './index.module.css';

interface LayoutProps {
  children?: Kreact.KreactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
