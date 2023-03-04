import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import OrderBy from '../../components/Filters/OrderBy';
import Search from '../../components/Filters/Search';
import Summary from '../../components/Summary';
import Table from '../../components/Table';
import expensesAllUsers from '../../Services/expensesAllUsers.service.js';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Users.module.css';

export default function Users() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [usersInitial, setUsersInitial] = useState([]);

    async function fetchExpenses() {
        let response = await expensesAllUsers();

        const expensesReduce = response.map(usuario => {
            return {
                id: usuario.userID,
                email: usuario['_user'].email,
                amount: usuario.amount,
                status: usuario.status,
                show: true
            };
        });
        usersFormated(expensesReduce);
    }

    function usersFormated(expenses) {
        const usersData = {};
        expenses.forEach(expense => {
            if (!usersData[expense.id]) {
                usersData[expense.id] = [];
            }
            usersData[expense.id].push(expense);
        });

        Object.keys(usersData).map(userID => {
            const currentUser = {
                id: null,
                email: null,
                PENDENTE: 0,
                PAGO: 0,
                show: true
            };
            usersData[userID].forEach(user => {
                currentUser.id = user.id;
                currentUser.email = user.email;
                currentUser[user.status] += user.amount;
            });
            setUsers(prevUsers => [...prevUsers, currentUser]);
            setUsersInitial(prevUsers => [...prevUsers, currentUser]);
        });
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    function handlerSearch(data) {
        if (data === null) {
            setUsers(usersInitial);
        } else {
            setUsers(data);
        }
    }

    function handlerOrder(data) {
        setUsers(data);
    }

    const configTable = [
        {
            label: 'ID',
            key: 'id'
        },
        {
            label: 'Usuario',
            key: 'email',
            style: 'blue',
            onClick: user => {
                navigate(`/usuarios/${user.id}`);
            }
        },
        {
            label: 'Pago',
            key: 'PAGO',
            style: 'green'
        },
        {
            label: 'Pendente',
            key: 'PENDENTE',
            style: 'red'
        }
    ];

    const configButton = {
        name: 'ADICIONAR USUÁRIO',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        onClick: () => {
            console.log('teste');
        }
    };

    const usersFormatedInRealMoney = users.map(user => {
        return {
            id: user.id,
            email: user.email,
            PENDENTE: formatPrice(user.PENDENTE),
            PAGO: formatPrice(user.PAGO),
            show: user.show
        };
    });

    return (
        <div className={`${styles.containerUsers} container`}>
            <Summary data={users} page="users" />
            <div className={styles.containerFilters}>
                <Search
                    items={usersInitial}
                    findFields={['id', 'email']}
                    onFiltered={data => handlerSearch(data)}
                />
                <OrderBy
                    items={usersInitial}
                    orderFields={[
                        {
                            label: 'Id',
                            value: 'id'
                        },
                        {
                            label: 'Usuário',
                            value: 'email'
                        },
                        {
                            label: 'Pago',
                            value: 'PAGO'
                        },
                        {
                            label: 'Pendente',
                            value: 'PENDENTE'
                        }
                    ]}
                    onOrder={data => handlerOrder(data)}
                />
            </div>
            <Table configs={configTable} data={usersFormatedInRealMoney} />
            <div className={styles.wrapperButton}>
                <Button config={configButton} />
            </div>
        </div>
    );
}
