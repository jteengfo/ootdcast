import styles from './Searchbar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        disabled // Disables the input until functionality is implemented
      />
      <button className={styles.button} disabled>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
