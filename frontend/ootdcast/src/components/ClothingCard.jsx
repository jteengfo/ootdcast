import styles from './ClothingCard.module.css';

export default function ClothingCard(){
    return(
        <div className={styles.card}>
            <div className={styles.info}>
                <h3 className={styles.name}>Oversize Shirt</h3>
                <p className={styles.warmthLevel}>Warmth Level: 1</p>
                <p className={styles.type}>Shirt</p>
            </div>
        </div>
    );
}