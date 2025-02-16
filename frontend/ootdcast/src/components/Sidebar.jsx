import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/dashboard" className={styles.menuItem}>
            <div className={styles.menuContent}>
              <Image src="/icons/home.png" alt="Home" width={24} height={24} />
              <span>Home</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/library" className={styles.menuItem}>
            <div className={styles.menuContent}>
              <Image src="/icons/dress.png" alt="Library" width={24} height={24} />
              <span>Catalouge</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/history" className={styles.menuItem}>
            <div className={styles.menuContent}>
              <Image src="/icons/clock.png" alt="History" width={24} height={24} />
              <span>History</span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
