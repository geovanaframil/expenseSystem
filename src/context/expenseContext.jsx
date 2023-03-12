import { createContext, useState } from 'react';
import expensesAllUsers from '../Services/expensesAllUsers.service';
import findExpense from '../Services/findExpense.service';
import { formatPrice } from '../utils/formatPrice';

const initialState = [];

export const expenseContext = createContext(initialState);

export function ExpenseProvider({ children }) {
    const [expenses, setExpenses] = useState(initialState);
    const [expensesInitial, setExpensesInitial] = useState(initialState);
    const [expense, setExpense] = useState(initialState);

    async function fetchExpenses() {
        let response = await expensesAllUsers();

        const expensesReduce = response.map(usuario => {
            return {
                id: usuario.userID,
                email: usuario['_user'].email,
                amount: formatPrice(usuario.amount),
                status: usuario.status,
                show: true
            };
        });
        setExpenses(expensesReduce);
        setExpensesInitial(expensesReduce);
    }

    async function fetchExpense(id) {
        let response = await findExpense(id);

        setExpense(response);
    }

    return (
        <expenseContext.Provider
            value={{
                expenses,
                setExpenses,
                expensesInitial,
                fetchExpenses,
                fetchExpense,
                expense
            }}
        >
            {children}
        </expenseContext.Provider>
    );
}
