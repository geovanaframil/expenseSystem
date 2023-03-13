import { useContext } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import {fetchDeleteExpense} from "../../Services/expenses.service";
import { userContext } from "../../context/userContext";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function DeleteExpense(props) {
  const { layout, setLayout } = useContext(layoutContext);
  const { fetchUser } = useContext(userContext);

  const notyf = new Notyf({
    ripple: false,
    position: {
        x: 'right',
        y: 'top'
    }
});

  async function confirmDeletion() {
    await fetchDeleteExpense(props.categoryID);

    fetchUser(layout.modal.userID);

    notyf.success('Despesa excluída com sucesso!');
  }

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  const configConfirmButton = {
    name: "SIM",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    type:'blue',
    onClick: () => {
      confirmDeletion();
      closeModal();
    },
  };

  const configCancelButton = {
    name: "NÃO",
    style: {
      color: "#D32F2F",
      backgroundColor: "transparent",
      border: "1px solid #D32F2F",
    },
    type: 'red',
    onClick: () => {
      closeModal();
    },
  };

  return (
    <div>
      <form>
        <div className={styles.titleModalDelete}>
          <h2>DELETAR DESPESA</h2>
        </div>
        <div className={styles.msgConfirmingDeletion}>
          <p className={styles.msg}>
            Tem certeza que deseja deletar a despesa <span>{props.categoryID}</span>
            ?
          </p>
        </div>
        <div className={styles.buttons}>
          <Button config={configConfirmButton} />
          <Button config={configCancelButton} />
        </div>
      </form>
    </div>
  );
}
