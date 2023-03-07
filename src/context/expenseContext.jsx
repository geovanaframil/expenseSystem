import { createContext, useState } from "react";
import expensesAllUsers from "../Services/expensesAllUsers.service";

const initialState = [];

export const expenseContext = createContext(initialState);

export function ExpenseProvider({ children }) {
  const [expenses, setExpenses] = useState(initialState);
  const [expensesInitial, setExpensesInitial] = useState(initialState);

  async function fetchExpenses() {
    let response = await expensesAllUsers();

    const expensesReduce = response.map((usuario) => {
      return {
        id: usuario.userID,
        email: usuario["_user"].email,
        amount: usuario.amount,
        status: usuario.status,
        show: true
      };
    });
    setExpenses(expensesReduce);
    setExpensesInitial(expensesReduce)
  }

  return (
    <expenseContext.Provider
      value={{ expenses, setExpenses, expensesInitial, fetchExpenses }}
    >
      {children}
    </expenseContext.Provider>
  );
}
