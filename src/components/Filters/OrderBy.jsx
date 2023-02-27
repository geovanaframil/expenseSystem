import styles from './Filters.module.css';
import { useEffect, useState } from 'react';

function OrderBy({ data, setExpensesFiltered }) {
    const [order, setOrder] = useState('');

    useEffect(() => {
        let dataCopy = [...data];

        switch (order) {
            case 'user':
                dataCopy.sort((a, b) =>
                    a._user.name.localeCompare(b._user.name)
                );
                break;
            case 'expenses':
                dataCopy.sort((a, b) => a.amount - b.amount);
                break;
            case 'status':
                dataCopy.sort((a, b) =>
                    a.status.localeCompare(b.status)
                );
                break;
            case 'id':
                dataCopy.sort((a, b) => a.id - b.id);
                break;
            default:
                setExpensesFiltered(data);
        }

        setExpensesFiltered(dataCopy);
    }, [order]);

    const handleOrderByChange = e => {
        setOrder(e.target.value);
    };

    return (
        <div className={styles.orderBy}>
            <label>Ordernar Por:</label>
            <select id="order" value={order} onChange={handleOrderByChange}>
                <option value=""></option>
                <option value="id">Id</option>
                <option value="user">Usuário</option>
                <option value="expenses">Despesas</option>
                <option value="status">Status</option>
            </select>
        </div>
    );
}

export default OrderBy;
