import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import FilterBy from '../../components/Filters/FilterBy';
import OrderBy from '../../components/Filters/OrderBy';
import Search from '../../components/Filters/Search';
import Summary from '../../components/Summary';
import Table from '../../components/Table';
import { expensesAllUsers } from '../../Services/expenses.service';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Expenses.module.css';

export default function Expenses() {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [expensesInitial, setExpensesInitial] = useState([]);

    async function fetchExpenses() {
        let response = await expensesAllUsers();

        const expensesReduce = response.map(usuario => {
            return {
                id: usuario.userID,
                email: usuario['_user'].email,
                amount: usuario.amount,
                status: usuario.status
            };
        });
        setExpenses(expensesReduce);
        setExpensesInitial(expensesReduce);
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    function handlerSearch(data) {
        if (data === null) {
            setExpenses(expensesInitial);
        } else {
            setExpenses(data);
        }
    }


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

    const configButton = {
        name: 'ADICIONAR DESPESA',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        onClick: () => {
            console.log('teste');
        }
    };

    const expensesFormatedInRealMoney = expenses.map(expense => {
        return {
            id: expense.id,
            email: expense.email,
            amount: formatPrice(expense.amount),
            status: expense.status
        };
    });

    return (
        <div className={`${styles.containerExpenses} container`}>
            <Summary data={expenses} />
            <div className={styles.containerFilters}>
                <Search
                    items={expensesInitial}
                    findFields={['id', 'email']}
                    onFiltered={data => handlerSearch(data)}
                />
                {/* <OrderBy
                    data={expenses}
                    setExpensesFiltered={setExpensesFiltered}
                />
                <FilterBy
                    data={expenses}
                    setExpensesFiltered={setExpensesFiltered}
                /> */}
            </div>
            <Table config={config} data={expensesFormatedInRealMoney} />
            <div className={styles.wrapperButton}>
                <Button config={configButton} />
            </div>
        </div>
    );
}
