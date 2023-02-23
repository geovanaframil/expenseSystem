import styles from "./Filters.module.css";
import { expensesAllUsers } from "../Services/expensesAllUsers.service";
import { useEffect, useState } from "react";

function OrderBy() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("id");

  useEffect(() => {
    expensesAllUsers().then((data) => {
      let sortedUsers = [...data];

      console.log(sortedUsers)
      // switch (order) {
      //   case "user":
      //     sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
      //     break;
      //   case "expenses":
      //     sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
      //     break;
      //   case
      // }
    });
  }, []);

  return (
    <div className={styles.orderBy}>
      <label>Ordernar Por:</label>
      <select name="fieldOrder">
        <option></option>
        <option value="id">Id</option>
        <option value="user">Usuário</option>
        <option value="expenses">Despesas</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}

export default OrderBy;
