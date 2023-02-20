import { useState } from "react";
import styles from "./Filters.module.css";

function Search() {
  const [expenses] = useState([
    {
      id: "exp1",
      name: "Despesa 1",
      categoryID: "cat1",
      userID: "user_1abc2",
      amount: 1000,
      status: "PENDENTE",
      _user: {
        id: "user_1abc2",
        name: "John",
        lastName: "Doe",
        email: "fredndoe@example.com",
      },
      _category: {
        id: "cat1",
        name: "Alimentação",
      },
    },
    {
      id: "exp2",
      name: "Despesa 2",
      categoryID: "cat2",
      userID: "user_1abc2",
      amount: 2000,
      status: "PAGO",
      _user: {
        id: "user_1abc2",
        name: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
      },
      _category: {
        id: "cat2",
        name: "Transporte",
      },
    },
  ]);

  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.id.toString().includes(filterValue) ||
      expense._user.email.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className={styles.search}>
      <label>Buscar</label>
      <input
        className={styles.inputSearch}
        type="text"
        onChange={handleInputChange}
        value={filterValue}
      />
      <ul>
        {filteredExpenses.map((expense) => (
          <li key={expense.id}>
            {expense.id} - {expense.name} - {expense.amount} - {expense._user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
