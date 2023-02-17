import styles from "./Filters.module.css";

function Search() {
  return (
    <div className={styles.search}>
      <label>Buscar</label>
      <input className={styles.inputSearch} type="text" />
    </div>
  );
}

export default Search;
