import { useContext } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import fetchDeleteExpense from "../../Services/deleteExpense.service";
import { userContext } from "../../context/userContext";

export default function DeleteExpense(props) {
  const { layout, setLayout } = useContext(layoutContext);
  console.log(layout)
  const { fetchUser } = useContext(userContext);

  async function confirmDeletion() {
    await fetchDeleteExpense(props.categoryID);
    fetchUser(layout.modal.userID);
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
          <h2>DELETAR CATEGORIA</h2>
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
