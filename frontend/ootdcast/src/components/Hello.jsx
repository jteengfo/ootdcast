import styles from "./Hello.module.css";

export default function Hello() {
    return (
        <div className={styles.hello}>
            <h1>Welcome, user</h1>
        </div>
    )
}