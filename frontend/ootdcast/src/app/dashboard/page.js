import styles from "./../page.module.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Greeting from "@/components/Greeting";
import SearchBar from "@/components/Searchbar";
import ClothingForm from "@/components/AddClothing";
import OutfitHistory from "@/components/GenerateOutfit";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.content}>
        {/* Sidebar on the left */}
        <div className={styles.sidebar}>
          <Sidebar />
        </div>

        {/* Main content */}
        <main className={styles.main}>
          {/* Greeting card at the top */}
          <div className={styles.greeting}>
            <Greeting />
          </div>

          {/* Bottom section split between ClothingForm and OutfitHistory */}
          <div className={styles.bottomSection}>
            <div className={styles.clothingForm}>
              <ClothingForm />
            </div>
            <div className={styles.outfitHistory}>
              <OutfitHistory />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}