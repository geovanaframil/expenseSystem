import { useContext } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";
import { layoutContext } from "../../context/layoutContext";
import FormCreateExpense from "./FormCreateExpense";
import FormCreateUser from "./FormCreateUser";
import FormEditCategory from "./FormEditCategory";
import DeleteCategory from "./DeleteCategory";

Modal.setAppElement("#root");

export default function FormModal() {
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
        {layout.modal.action === "CreateUser" && <FormCreateUser />}
        {layout.modal.action === "EditCategory" && <FormEditCategory />}
        {layout.modal.action === 'DeleteCategory' && <DeleteCategory />}
      </Modal>
    </div>
  );
}
