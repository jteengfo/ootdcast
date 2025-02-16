import styles from "./page.module.css";
import Header from "./../components/Header";
import Sidebar from "./../components/Sidebar";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <main className={styles.main}>
        </main>
      </div>
    </div>
  );
}