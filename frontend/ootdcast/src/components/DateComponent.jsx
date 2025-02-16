import styles from './DateComponent.module.css';

export default function DateComponent() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    return(
        <div className={styles.dateContainer}>
            <img src="/icons/calendar.png" alt="Calendar" className={styles.calendarIcon} />
            <span className={styles.dateText}>{currentDate}</span>
        </div>
    );
}