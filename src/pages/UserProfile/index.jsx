import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Summary from '../../components/Summary';
import { userContext } from '../../context/userContext';
import Form from './Form';
import styles from './UserProfile.module.css';

export default function UserProfile() {
    const { userId } = useParams();
    const {
        fetchUsers,
        usersAllData,
        setUsersAllData,
        getTotalExpenseByStatus
    } = useContext(userContext);

    const correctUser = usersAllData.filter(user => user.id === userId);

    const expensesMapped = correctUser.map(user => {
        const { _expenses } = user;

        const newExpenses = _expenses.map(expense => {
            return {
                id: expense.id,
                categoria: expense.categoryID,
                amount: expense.amount,
                status: expense.status,
                show: true
            };
        });

        return newExpenses;
    });

    const expenses = expensesMapped.flat();

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={`${styles.containerUser}`}>
            <div className={styles.titleData}>
                <h2>DADOS CADASTRAIS</h2>
            </div>
            <div className={styles.line}></div>
            <Form user={correctUser[0]} />
            <div className={styles.titleExpenses}>
                <h2>DESPESAS POR CATEGORIA</h2>
            </div>
            <div className={styles.line}></div>
            <Summary data={expenses} page="userProfile" />
        </div>
    );
}
