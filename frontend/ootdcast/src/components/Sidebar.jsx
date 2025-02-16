import Link from "next/link";
import Image from "next/image";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <ul>
        <li>
          <Link href="/" className={styles.menuItem}>
            <Image src="/icons/home.png" alt="Home" width={20} height={20} />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/library" className={styles.menuItem}>
            <Image src="/icons/dress.png" alt="Library" width={20} height={20} />
            <span>Library</span>
          </Link>
        </li>
        <li>
          <Link href="/history" className={styles.menuItem}>
            <Image src="/icons/clock.png" alt="History" width={20} height={20} />
            <span>History</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
