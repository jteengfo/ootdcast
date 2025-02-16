import styles from './Greeting.module.css';
import Hello from './Hello';
import DateComponent from './DateComponent'

export default function Greeting() {
    return (
        <div className={styles.greetingCard}>
            <div className={styles.hello}>
                <Hello />
            </div>
            <div className={styles.dateComponent}>
                <DateComponent />
            </div>
        </div>
    );
}