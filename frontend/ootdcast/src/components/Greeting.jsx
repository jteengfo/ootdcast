import styles from './Greeting.module.css';
import Weather from './Weather';

export default function Greeting() {
    return (
        <div className={styles.greeting}>
            <h1>Welcome, user</h1>
            <Weather />
        </div>  
    );
}