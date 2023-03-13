import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import FilterBy from '../../components/Filters/FilterBy';
import OrderBy from '../../components/Filters/OrderBy';
import Summary from '../../components/Summary';
import Table from '../../components/Table';
import { userContext } from '../../context/userContext';
import styles from './UserProfileCategory.module.css';
import { layoutContext } from '../../context/layoutContext';
import { formatPrice } from '../../utils/formatPrice';

export default function UserProfileCategory() {
    const { layout, setLayout } = useContext(layoutContext);
    const { userId, categoriaId } = useParams();
    const { currentUser, fetchUser } = useContext(userContext);
    const [expenses, setExpenses] = useState([]);
    const [expensesInitial, setExpensesInitial] = useState([]);

    function userCategoriesMap() {
        const categoryFilter = currentUser._categories.filter(category => {
            return category.name === categoriaId;
        });

        const expenseMaped = categoryFilter.map(expenses => {
            const currentExpense = expenses._expenses.map(expense => {
                return {
                    userID: expense.userID,
                    name: expense.name,
                    category: expense['_category'].name,
                    id: expense.id,
                    amount: formatPrice(expense.amount),
                    status: expense.status,
                    show: true
                };
            });

            return currentExpense;
        });

        return expenseMaped.flat();
    }

    useEffect(() => {
        fetchUser(userId);
    }, []);

    useEffect(() => {
        const currentExpenses = userCategoriesMap();
        const currentExpensesReverse = currentExpenses.reverse();
        setExpenses(currentExpensesReverse);
        setExpensesInitial(currentExpensesReverse);
    }, [currentUser]);

    function handlerSearch(data) {
        if (data === null) {
            fetchUser(userId);
        } else {
            setExpenses(data);
        }
    }

    const configTable = [
        {
            label: 'ID',
            key: 'id'
        },
        { label: 'Nome', key: 'name' },
        {
            label: 'Valor',
            key: 'amount',
            style: 'red'
        },
        {
            label: 'Status',
            key: 'status'
        },
        {
            label: 'Ações',
            key: 'id',
            action: item => (
                <div className="buttonsWrapper">
                    <Button
                        config={configButtonEdit}
                        onClick={() => {
                            setLayout({
                                ...layout,
                                modal: {
                                    ...item,
                                    action: 'EditExpenseUser'
                                }
                            });
                        }}
                    />
                    <Button
                        config={configButtonDelete}
                        onClick={() => {
                            setLayout({
                                ...layout,
                                modal: {
                                    show: true,
                                    action: 'DeleteExpense',
                                    categoryID: item.id,
                                    name: item.name,
                                    userID: userId
                                }
                            });
                        }}
                    />
                </div>
            )
        }
    ];

    const configButtonEdit = {
        name: 'EDITAR',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        type: 'blue'
    };

    const configButtonDelete = {
        name: 'EXCLUIR',
        style: {
            color: '#D32F2F',
            backgroundColor: 'white',
            border: '1px solid #D32F2F80'
        },
        type: 'red'
    };

    const configButtonAddExpense = {
        name: 'ADICIONAR DESPESA',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        onClick: () => {
            setLayout({
                ...layout,
                modal: {
                    show: true,
                    action: 'CreateExpenseByCategory',
                    user: currentUser,
                    categoryName: categoriaId
                }
            });
        }
    };

    return (
        <div className={`${styles.containerUser}`}>
            <div className={styles.titleData}>
                <h2>
                    {currentUser.name} {currentUser.lastName} - {categoriaId}
                </h2>
            </div>
            <div className={styles.line}></div>
            <Summary data={expenses} page="userProfileCategory" />
            <div className={styles.containerFilters}>
                <OrderBy
                    items={expenses}
                    orderFields={[
                        {
                            label: 'ID',
                            value: 'id'
                        },
                        {
                            label: 'Valor',
                            value: 'amount'
                        },
                        {
                            label: 'Status',
                            value: 'status'
                        }
                    ]}
                    onOrder={data => handlerSearch(data)}
                />
                <FilterBy
                    items={expensesInitial}
                    sortFields={[
                        {
                            label: 'Pago',
                            value: 'PAGO',
                            key: 'status'
                        },
                        {
                            label: 'Pendente',
                            value: 'PENDENTE',
                            key: 'status'
                        }
                    ]}
                    onSorted={data => handlerSearch(data)}
                />
            </div>
            <Table configs={configTable} data={expenses} />
            <div className={styles.wrapperButton}>
                <Button config={configButtonAddExpense} />
            </div>
        </div>
    );
}
