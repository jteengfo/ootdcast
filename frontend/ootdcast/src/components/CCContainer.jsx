import styles from './ClothingCard.module.css';
import ClothingCard from "@/components/ClothingCard";

export default function CCContainer(){
    return(
        <div className={styles.ccContainer}>
            <ClothingCard />
        </div>
    );
}