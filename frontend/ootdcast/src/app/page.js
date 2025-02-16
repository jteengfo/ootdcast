import styles from "./page.module.css";
import Header from "./../components/Header";
import Sidebar from "./../components/Sidebar";
import Greeting from "./../components/Greeting";

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
          <div className={styles.greetingContainer}>
            <div className={styles.greetingTextContainer}><Greeting /></div>
          </div>
        </main>
      </div>
    </div>
  );
}