import { priceFormattedToNumber } from '../../utils/formatPrice';
import styles from './Filters.module.css';

export default function OrderBy({ orderFields, items, onOrder }) {
    function handleOrderByChange(e) {
        const selected = e.target.value;
        let itemsOrder = [];

        if (selected === '') {
            onOrder(null);
            return;
        }

        if (
            selected === 'PAGO' ||
            selected === 'PENDENTE' ||
            selected === 'amount'
        ) {
            itemsOrder = [...items].sort((a, b) => {
                return priceFormattedToNumber(a[selected]) <
                    priceFormattedToNumber(b[selected])
                    ? -1
                    : priceFormattedToNumber(a[selected]) >
                      priceFormattedToNumber(b[selected])
                    ? 1
                    : 0;
            });
        } else {
            itemsOrder = [...items].sort((a, b) => {
                return a[selected] < b[selected]
                    ? -1
                    : a[selected] > b[selected]
                    ? 1
                    : 0;
            });
        }

        onOrder(itemsOrder);
    }

    return (
        <div className={styles.orderBy}>
            <label>Ordernar Por:</label>
            <select id="order" onChange={handleOrderByChange}>
                <option value=""></option>
                {orderFields.map((order, index) => (
                    <option key={index} value={order.value}>
                        {order.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
