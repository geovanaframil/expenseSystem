import { useContext, useRef } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import addNewCategory from "../../Services/addNewCategory.service";
import { categoryContext } from "../../context/categoryContext";

export default function FormCreateCategory() {
  const nameRef = useRef(null);
  const { layout, setLayout } = useContext(layoutContext);
  const { fetchCategories } = useContext(categoryContext)

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  async function handleSave() {
    const body = {
      name: nameRef.current.value,
    };
    await addNewCategory(body);
    fetchCategories();
  }

  const configSaveButton = {
    name: "SALVAR",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    type: 'blue',
    onClick: () => {
      handleSave();
      closeModal();
    },
  };

  const configCancelButton = {
    name: "CANCELAR",
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
        <div className={styles.titleModal}>
          <h2>ADICIONAR CATEGORIA</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.nameCategory}>
            <label>Nome</label>
            <input type="text" ref={nameRef} />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button config={configSaveButton} />
          <Button config={configCancelButton} />
        </div>
      </form>
    </div>
  );
}
