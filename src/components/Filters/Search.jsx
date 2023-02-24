import { useEffect, useState } from "react";
import { getAllUsers } from "../Services/allUsers.service";
import FilterBy from "./FilterBy";
import styles from "./Filters.module.css";
import OrderBy from "./OrderBy";

function Search() {
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    getAllUsers().then((response) => {
      const user = [...response];
      setSearch(user);
    });
  });

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredExpenses = search.filter(
    (expense) =>
      expense.id.toString().includes(filterValue) ||
      expense.email.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className={styles.filters}>
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
              {expense.id} - {expense.name} - {expense.email}
            </li>
          ))}
        </ul>
      </div>
      <OrderBy />
      <FilterBy />
    </div>
  );
}

export default Search;
