import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import fetchEditCategory from "../../Services/editCategories.service";

export default function EditCategory(props) {
  console.log(props.categoryID)
  const nameCategoryRef = useRef(null);
  const { layout, setLayout } = useContext(layoutContext);

  //   useEffect(() => {
  //     getUsers();
  //   }, []);

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  async function handleSave() {
    const body = {
      name: nameCategoryRef.current.value,
    };

    fetchEditCategory(body, props.categoryID)
  }

  const configSaveButton = {
    name: "SALVAR",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
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
    onClick: () => {
      closeModal();
    },
  };

  return (
    <div>
      <form>
        <div className={styles.titleModal}>
          <h2>EDITAR CATEGORIA</h2>
        </div>
        <div className={styles.fieldsCategory}>
          <div className={styles.categoryName}>
            <label className={styles.category}>Categoria</label>
            <input
              type="text"
              ref={nameCategoryRef}
              className={styles.inputCategory}
            />
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
