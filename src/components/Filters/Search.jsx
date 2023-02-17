import styles from "./Filters.module.css";

function Search() {
  const handleInputChange = () => {
    console.log("teste");
  };

  return (
    <div className={styles.search}>
      <label>Buscar</label>
      <input
        className={styles.inputSearch}
        type="text"
        onChange={handleInputChange}
      />
    </div>
  );
}

export default Search;
