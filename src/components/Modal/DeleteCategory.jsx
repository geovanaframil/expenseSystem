import { useContext } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import { fetchDeleteCategory } from "../../Services/categories.service";
import { categoryContext } from "../../context/categoryContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export default function DeleteCategory(props) {
  const { layout, setLayout } = useContext(layoutContext);
  const { fetchCategories } = useContext(categoryContext);

  const notyf = new Notyf({
    ripple: false,
    position: {
      x: "right",
      y: "top",
    },
  });

  async function confirmDeletion() {
    await fetchDeleteCategory(props.categoryID);
    fetchCategories();

    notyf.success(`Categoria ${props.name} excluída com sucesso`);
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
    type: "blue",
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
    type: "red",
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
            Tem certeza que deseja deletar a categoria <span>{props.name}</span>
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
