import { useContext, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.css";
import getAllUsers from "../../Services/allUsers.service";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import addNewUser from "../../Services/addNewUser.service";
// import { userContext } from "../../context/userContext";
import { expenseContext } from "../../context/expenseContext";

export default function FormCreateUser() {
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const { layout, setLayout } = useContext(layoutContext);
  const { fetchExpenses } = useContext(expenseContext);
  const [users, setUsers] = useState([]);

  async function getUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  useEffect(() => {
    getUsers();
  }, []);

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  async function handleSave() {
    const body = {
      name: nameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
    };

    addNewUser(body);
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
          <h2>ADICIONAR USUÁRIO</h2>
        </div>
        <div className={styles.fields}>
          <div>
            <label>Nome</label>
            <input type="text" ref={nameRef} />
          </div>
          <div className={styles.lastName}>
            <label>Sobrenome</label>
            <input type="text" ref={lastNameRef} />
          </div>
          <div className={styles.email}>
            <label>Email</label>
            <input type="email" ref={emailRef} />
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
