import { useState } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";

Modal.setAppElement("#root");

export default function AddExpense() {
  const [modalIsOpen, setIsOpen] = useState(false);

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
            <input type="text" />
          </div>
          <div className={styles.inputUser}>
            <input type="text" placeholder="Usuário" />
          </div>
          <div className={styles.value}>
            <label>Valor</label>
            <input type="number" />
          </div>
        </div>
        <button onClick={closeModal}>Fechar Modal</button>
      </Modal>
    </div>
  );
}
