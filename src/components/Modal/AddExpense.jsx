import { useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";
import addNewExpense from "../../Services/expenses.service.js";

Modal.setAppElement("#root");

export default function AddExpense() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [amount, setAmount] = useState("");

  const handleCategoryName = (e) => {
    setCategoryName(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

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
            </select>
          </div>
          <div className={styles.inputUser}>
            <input
              type="text"
              placeholder="Usuário"
              value={userName}
              onChange={handleUserName}
            />
          </div>
          <div className={styles.value}>
            <label>Valor</label>
            <input type="number" value={amount} onChange={handleAmount} />
          </div>
        </div>
        <button onClick={closeModal}>Fechar Modal</button>
      </Modal>
    </div>
  );
}
