import styles from './Greeting.module.css';

export default function Greeting() {
    return (
        <div className={styles.greeting}>
            <h1>Welcome, user</h1>
        </div>  
    );
}