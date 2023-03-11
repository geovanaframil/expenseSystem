import { useContext, useRef, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import { userContext } from "../../context/userContext";
import fetchEditExpense from "../../Services/editExpense.service";

export default function FormEditExpenseUser() {
  const { layout, setLayout } = useContext(layoutContext);
  const idExpenseRef = useRef(null);
  const nameCategoryRef = useRef(null);
  const amountRef = useRef(null);
  const statusRef = useRef(null);
  //   const { fetchUser } = useContext(userContext);

  //   async function getCategories() {
  //     const data = await getAllCategories();
  //     setCategories(data);
  //   }

  useEffect(() => {
    //   getCategories();
    if (layout) {
      idExpenseRef.current.value = `${layout.modal.categoryID}`;
      nameCategoryRef.current.value = `${layout.modal.name}`;
    }
  }, []);

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  async function handleSave(data) {
    // const body = {
    //   name: layout.modal.name,
    //   categoryID: layout.modal.categoryID,
    //   userID: layout.modal.userID,
    //   amount: Number(amountRef.current.value),
    //   status: statusRef.current.value,
    // };

    // await fetchEditExpense(body, layout.modal.categoryID);
 
    // closeModal();
  }

  const configSaveButton = {
    name: "SALVAR",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    type: "blue",
    onClick: () => {
      handleSave();
   
    },
  };

  const configCancelButton = {
    name: "CANCELAR",
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
        <div className={styles.titleModal}>
          <h2>EDITAR DESPESA</h2>
        </div>
        <div className={styles.fields}>
          <div>
            <label>ID</label>
            <input type="text" ref={idExpenseRef} disabled />
          </div>
          <div className={styles.categoryId}>
            <label>Categoria</label>
            <input type="text" ref={nameCategoryRef} disabled />
          </div>
          <div className={styles.inputUser}>
            <label className={styles.labelUser}>Valor</label>
            <input className={styles.inputValue} type="text" ref={amountRef} />
          </div>
          <div className={styles.status}>
            <label>STATUS</label>
            <input type="text" ref={statusRef} />
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
