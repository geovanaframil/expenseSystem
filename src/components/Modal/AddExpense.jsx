import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";
import getAllCategories from "../../Services/categories.service";
import getAllUsers from "../../Services/allUsers.service";
import Button from "../Button";

Modal.setAppElement("#root");

export default function AddExpense() {
  const [modalIsOpen, setIsOpen] = useState(false);
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const configSaveButton = {
    name: "SALVAR",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    onClick: () => {
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
      <button onClick={openModal}>Abrir Modal</button>
      <Modal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <div className={styles.titleModal}>
          <h2>ADICIONAR DESPESA</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.category}>
            <label>Categoria</label>
            <select>
              <option></option>
              {categories.map((category) => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
          </div>
          <div className={styles.inputUser}>
            <label>Usuário</label>
            <select>
              <option></option>
              {users.map((user) => {
                return <option value={user.id}>{user.name}</option>;
              })}
            </select>
          </div>
          <div className={styles.value}>
            <label>Valor</label>
            <input type="text" />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button config={configSaveButton} />
          <Button config={configCancelButton} />
        </div>
      </Modal>
    </div>
  );
}
