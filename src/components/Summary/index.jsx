import { formatPrice, priceFormattedToNumber } from '../../utils/formatPrice';
import styles from './Summary.module.css';

function Summary({ data, page }) {
    let totalNoPaid = 0;
    let totalPaid = 0;

    const dataShowed = data.filter(item => item.show === true);

    if (page === 'expenses' || page === 'userProfileCategory') {
        let usersPaid = dataShowed.filter(expense => {
            return expense.status === 'PAGO';
        });

        totalPaid = usersPaid.reduce((acc, atual) => {
            return acc + priceFormattedToNumber(atual.amount);
        }, 0);

        let usersNoPaid = dataShowed.filter(expense => {
            return expense.status === 'PENDENTE';
        });

        totalNoPaid = usersNoPaid.reduce((acc, atual) => {
            return acc + priceFormattedToNumber(atual.amount);
        }, 0);
    }

    if (page === 'users' || page === 'userProfile') {
        totalNoPaid = dataShowed.reduce((acc, atual) => {
            return acc + priceFormattedToNumber(atual.PENDENTE);
        }, 0);

        totalPaid = dataShowed.reduce((acc, atual) => {
            return acc + priceFormattedToNumber(atual.PAGO);
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
                <p>{formatPrice(totalNoPaid)}</p>
                <hr className={styles.red}></hr>
            </div>
        </div>
    );
}

export default Summary;
