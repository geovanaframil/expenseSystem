import { useEffect, useState } from "react";
import { expensesAllUsers } from "../Services/expensesAllUsers.service";
import styles from "./Filters.module.css";

function FilterBy() {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    expensesAllUsers().then((response) => {
      let users = [...response];
      console.log(users);
      setData(users);
    });
  }, []);

  const filteredData = data.filter(
    (item) => selectedStatus === "" || item.status === selectedStatus
  );

  const handleSelectChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  return (
    <div className={styles.filterBy}>
      <label>Filtrar Por:</label>
      <select value={selectedStatus} onChange={handleSelectChange}>
        <option></option>
        <option value="PAGO">Pago</option>
        <option value="PENDENTE">Pendente</option>
      </select>
      {filteredData.map((item) => (
        <div key={item.id}>
          <p>{item.id}</p>
          <p>{item.status}</p>
        </div>
      ))}
    </div>
  );
}

export default FilterBy;
