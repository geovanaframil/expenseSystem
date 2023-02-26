import { formatPrice } from '../../utils/formatPrice';
import styles from './Summary.module.css';


function Summary({ data }) {
    const totalExpenses = data.reduce((acc, atual) => {
        return acc + atual.amount;
    }, 0);

    const expensesPaid = data.filter(expense => {
        return expense.status === 'PAGO';
    });
   
    const totalPaid = expensesPaid.reduce((acc, atual) => {
        return acc + atual.amount;
    }, 0);

    return (
        <div className={styles.summary}>
            <div className={styles.totalPaid}>
                <p>TOTAL PAGO</p>
                <p>{formatPrice(totalPaid)}</p>
                <hr className={styles.green}></hr>
            </div>
            <div className={styles.totalExpenses}>
                <p>TOTAL DESPESAS</p>
                <p>{formatPrice(totalExpenses)}</p>
                <hr className={styles.red}></hr>
            </div>
        </div>
    );
}

export default Summary;
