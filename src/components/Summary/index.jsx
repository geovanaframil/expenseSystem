import { formatPrice } from "../../utils";
import styles from "./Summary.module.css";

const example = {
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
    email: "johndoe@example.com",
  },
};

function Summary() {
  return (
    <div className={styles.summary}>
      <div className={styles.totalPaid}>
        <p>TOTAL PAGO</p>
        <p>{formatPrice(example.amount)}</p>
        <hr className={styles.green}></hr>
      </div>
      <div className={styles.totalExpenses}>
        <p>TOTAL DESPESAS</p>
        <p>{formatPrice(example.amount)}</p>
        <hr className={styles.red}></hr>
      </div>
    </div>
  );
}

export default Summary;
