import styles from "./Filters.module.css";

function FilterBy() {
  return (
    <div className={styles.filterBy}>
      <label>Filtrar Por:</label>
      <select name="filter">
        <option></option>
        <option value="paid">Pago</option>
        <option value="pending">Pendente</option>
      </select>
    </div>
  );
}

export default FilterBy;
