import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import getAllCategories from "../../Services/categories.service";
import {getAllUsers} from "../../Services/allUsers.service";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import addNewExpense from "../../Services/addNewExpense.service";
import { expenseContext } from "../../context/expenseContext";


export default function FormCreateExpense() {
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const userRef = useRef(null);
  const amountRef = useRef(null);
  const { layout, setLayout } = useContext(layoutContext);
  const { fetchExpenses } = useContext(expenseContext);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  async function getCategories() {
    const data = await getAllCategories();
    setCategories(data);
  }

  async function getUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  useEffect(() => {
    getCategories();
    getUsers();
  }, []);

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  async function handleSave() {
    const body = {
      name: nameRef.current.value,
      categoryID: categoryRef.current.value,
      userID: userRef.current.value,
      amount: Number(amountRef.current.value),
      status: "PENDENTE",
    };

    addNewExpense(body);
    fetchExpenses();
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
          <h2>ADICIONAR DESPESA</h2>
        </div>
        <div className={styles.fields}>
          <div>
            <label>Nome</label>
            <input type="text" ref={nameRef} />
          </div>
          <div className={styles.categoryId}>
            <label>Categoria</label>
            <select ref={categoryRef}>
              <option></option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.inputUser}>
            <label>Usuário</label>
            <select ref={userRef}>
              <option></option>
              {users.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.value}>
            <label>Valor</label>
            <input type="text" ref={amountRef} />
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
