import styles from './Greeting.module.css';
import Hello from './Hello';

export default function Greeting() {
    return (
        <div className={styles.hello}>
            <Hello />
        </div>
    );
}