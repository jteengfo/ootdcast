import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {    
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/library">Library</Link>
                </li>
                <li>
                    <Link href="/history">History</Link>
                </li>
            </ul>
        </nav>
    );
}