import styles from "../page.module.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
//import Greeting from "./../components/Greeting";
import SearchBar from "../../components/Searchbar";
import ClothingCardContainer from "@/components/CCContainer";

export default function Library(){
    const clothes = [];

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <main className={styles.main}>
                    <div className={styles.ccContainer}>
                        <ClothingCardContainer />
                    </div>
                </main>
            </div>
        </div>
    );
}  