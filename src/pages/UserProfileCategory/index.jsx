import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Summary from '../../components/Summary';
import { userContext } from '../../context/userContext';
import styles from './UserProfileCategory.module.css';

export default function UserProfileCategory() {
    const { userId, categoriaId } = useParams();
    const { currentUser, fetchUser } = useContext(userContext);
    const [expenses, setExpenses] = useState([]);

    function userCategoriesMap() {
        const categoryFilter = currentUser._categories.filter(category => {
            return category.name === categoriaId;
        });

        const expenseMaped = categoryFilter.map(expenses => {
            const currentExpense = expenses._expenses.map(expense => {
                return {
                    userID: expense.userID,
                    category: expense['_category'].name,
                    id: expense.id,
                    amount: expense.amount,
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
        console.log(currentExpenses);
        setExpenses(currentExpenses);
    }, [currentUser]);

    return (
        <div className={`${styles.containerUser}`}>
            <div className={styles.titleData}>
                <h2>
                    {currentUser.name} {currentUser.lastName} - {categoriaId}
                </h2>
            </div>
            <div className={styles.line}></div>
            <Summary data={expenses} page="userProfileCategory" />
        </div>
    );
}
