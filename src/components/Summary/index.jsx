import styles from "./Summary.module.css";

function Summary() {
    return (
        <div className={styles.summary}>
            <div className={styles.totalPaid}>
                <p>TOTAL PAGO</p>
            </div>
            <div className={styles.totalExpenses}>
                <p>TOTAL PAGO</p>
            </div>
        </div>
    )
}

export default Summary