import { useContext } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";

export default function EditCategory() {
  const { layout, setLayout } = useContext(layoutContext);

  //   useEffect(() => {
  //     getUsers();
  //   }, []);

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  const configConfirmButton = {
    name: "SIM",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    onClick: () => {
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
          <p className={styles.msg}>Tem certeza que deseja deletar a categoria <span>Teste</span>?</p>
        </div> 
        <div className={styles.buttons}>
          <Button config={configConfirmButton} />
          <Button config={configCancelButton} />
        </div>
      </form>
    </div>
  );
}
