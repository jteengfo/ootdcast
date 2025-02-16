import styles from "./page.module.css";
import Header from "./../components/Header";
import Sidebar from "./../components/Sidebar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <Sidebar />
      <main className={styles.main}>
      </main>
    </div>
  );
}