import { useEffect, useState } from 'react';
import styles from './Filters.module.css';

function Search({ data, setExpensesFiltered }) {
    const [filterValue, setFilterValue] = useState('');

    const filteredExpenses = data.filter(
        expense =>
            expense.userID.toString().includes(filterValue) ||
            expense['_user'].email
                .toLowerCase()
                .includes(filterValue.toLowerCase())
    );

    useEffect(() => {
        if (data) setExpensesFiltered(filteredExpenses);
    }, [filterValue]);

    const handleInputChange = event => {
        setFilterValue(event.target.value);
    };

    return (
        <>
            <div className={styles.search}>
                <label>Buscar</label>
                <input
                    className={styles.inputSearch}
                    type="text"
                    onChange={handleInputChange}
                    value={filterValue}
                />
            </div>
        </>
    );
}

export default Search;
