import { useContext } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";
import { layoutContext } from "../../context/layoutContext";
import FormCreateExpense from "./FormCreateExpense";

Modal.setAppElement("#root");

function FormFactory(type) {
  const forms = {
    CreateExpense: () => <div>form</div>,
  };
  return forms[type];
}

export default function AddExpense() {
  const { layout, setLayout } = useContext(layoutContext);

  function closeModal() {
    setLayout({ ...layout, modal: { open: false } });
  }

  return (
    <div>
      <Modal
        className={styles.modal}
        overlayClassName={styles.overlay}
        isOpen={layout.modal.show}
        onRequestClose={closeModal}
      >
        {layout.modal.action === "CreateExpense" && <FormCreateExpense />}
      </Modal>
    </div>
  );
}
