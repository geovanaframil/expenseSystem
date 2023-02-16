import styles from "./Summary.module.css";

function Summary() {
  return (
    <div className={styles.summary}>
      <div className={styles.totalPaid}>
        <p>TOTAL PAGO</p>
        <p>Teste</p>
        <hr className={styles.green}></hr>
      </div>
      <div className={styles.totalExpenses}>
        <p>TOTAL DESPESAS</p>
        <p>Teste</p>
        <hr className={styles.red}></hr>
      </div>
    </div>
  );
}

export default Summary;
