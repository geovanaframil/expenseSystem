import styles from "./Filters.module.css";

function OrderBy(a, b) {
  return (
    <div className={styles.orderBy}>
      <label>Ordernar Por:</label>
      <select name="fieldOrder">
        <option></option>
        <option value="id">Id</option>
        <option value="user">Usuário</option>
        <option value="expenses">Despesas</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}

export default OrderBy