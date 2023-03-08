import { formatPrice } from '../../utils/formatPrice';
import styles from './Summary.module.css';

function Summary({ data, page }) {
    let totalExpenses = 0;
    let expensesPaid = 0;
    let totalPaid = 0;

    const dataShowed = data.filter(item => item.show === true);
   
    if (page === 'expenses' || page === 'userProfile') {
        totalExpenses = dataShowed.reduce((acc, atual) => {
            return acc + atual.amount;
        }, 0);

        expensesPaid = dataShowed.filter(expense => {
            return expense.status === 'PAGO';
        });

        totalPaid = expensesPaid.reduce((acc, atual) => {
            return acc + atual.amount;
        }, 0);
    }
    if (page === 'users') {
        totalExpenses = dataShowed.reduce((acc, atual) => {
            return acc + atual.PENDENTE;
        }, 0);

        totalPaid = dataShowed.reduce((acc, atual) => {
            return acc + atual.PAGO;
        }, 0);
    }
    
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
