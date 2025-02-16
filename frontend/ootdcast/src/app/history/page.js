import styles from "./page.module.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
//import Greeting from "./../components/Greeting";
import SearchBar from "../../components/Searchbar";

export default function History(){
    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <SearchBar />
                <Header />
            </div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <Sidebar />
                </div>
                <main className={styles.main}>
                </main>
            </div>
        </div>
    );
}  