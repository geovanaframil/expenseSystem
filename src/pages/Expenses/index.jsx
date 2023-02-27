import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBy from '../../components/Filters/FilterBy';
import OrderBy from '../../components/Filters/OrderBy';
import Search from '../../components/Filters/Search';
import Summary from '../../components/Summary';
import Table from '../../components/Table';
import { expensesAllUsers } from '../../Services/expenses.service';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Expenses.module.css'

export default function Expenses() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [expensesFiltered, setExpensesFiltered] = useState([]);

    useEffect(() => {
        async function expenses() {
            let expense = await expensesAllUsers();
            setExpenses(expense);
            setExpensesFiltered(expense);
        }
        expenses();
    }, []);

    const expensesReduce = expensesFiltered.map(usuario => {
        return {
            id: usuario.userID,
            email: usuario['_user'].email,
            amount: formatPrice(usuario.amount),
            status: usuario.status
        };
    });

    const config = [
        {
            label: 'ID',
            key: 'id'
        },
        {
            label: 'Usuario',
            key: 'email',
            style: 'blue',
            onClick: user => {
                console.log(user);
                navigate(`/usuarios/${user.id}`);
            }
        },
        {
            label: 'Despesa',
            key: 'amount',
            style: 'red'
        },
        {
            label: 'Status',
            key: 'status'
            // action: <div>teste</div>
        }
    ];

    return (
        <div>
            <Summary data={expensesFiltered} />
            <div className={styles.container}>
                <Search
                    data={expenses}
                    setExpensesFiltered={setExpensesFiltered}
                />
                <OrderBy data={expenses} setExpensesFiltered={setExpensesFiltered} />
                <FilterBy data={expenses} setExpensesFiltered={setExpensesFiltered} />
            </div>
            <Table config={config} data={expensesReduce} />
        </div>
    );
}
