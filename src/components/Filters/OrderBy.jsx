import styles from "./Filters.module.css";
import { expensesAllUsers } from "../Services/expensesAllUsers.service";
import { useEffect, useState } from "react";

function OrderBy() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState("id");

  useEffect(() => {
    expensesAllUsers().then((data) => {
      let sortedUsers = [...data];

      switch (order) {
        case "user":
          sortedUsers.sort((a, b) => a._user.name.localeCompare(b._user.name));
          break;
        case "expenses":
          sortedUsers.sort((a, b) => a.amount - b.amount);
          break;
        case "status":
          sortedUsers.sort((a, b) => a.status.localeCompare(b.status));
          break;
        default:
          sortedUsers.sort((a, b) => a.id - b.id);
          break;
      }
      setUsers(sortedUsers);
    });
  }, [order]);

  const handleOrderByChange = (e) => {
    setOrder(e.target.value);
  };

  return (
    <div className={styles.orderBy}>
      <label>Ordernar Por:</label>
      <select id="order" value={order} onChange={handleOrderByChange}>
        <option></option>
        <option value="id">Id</option>
        <option value="user">Usuário</option>
        <option value="expenses">Despesas</option>
        <option value="status">Status</option>
      </select>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user._user.id} - </span>
            <span>{user._user.name} - </span>
            <span>{user.amount} - </span>
            <span>{user.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderBy;
