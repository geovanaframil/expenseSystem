import { useContext } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.css";
import { layoutContext } from "../../context/layoutContext";
import FormCreateExpense from "./FormCreateExpense";
import FormCreateUser from "./FormCreateUser";
import FormEditCategory from "./FormEditCategory";
import DeleteCategory from "./DeleteCategory";
import FormCreateCategory from "./FormCreateCategory";
import FormCreateExpenseUser from "./FormCreateExpenseUser";
import FormEditExpenseUser from "./FormEditExpenseUser";
import DeleteExpense from "./DeleteExpense";
import FormCreateExpenseByCategory from "./FormCreateExpenseByCategory";

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
        {layout.modal.action === "EditCategory" && (
          <FormEditCategory
            categoryID={layout.modal.categoryID}
            name={layout.modal.name}
          />
        )}
        {layout.modal.action === "DeleteCategory" && (
          <DeleteCategory
            categoryID={layout.modal.categoryID}
            name={layout.modal.name}
          />
        )}
        {layout.modal.action === "CreateCategory" && <FormCreateCategory />}
        {layout.modal.action === "CreateExpenseUser" && (
          <FormCreateExpenseUser />
        )}
        {layout.modal.action === "EditExpenseUser" && <FormEditExpenseUser />}
        {layout.modal.action === "DeleteExpense" && (
          <DeleteExpense categoryID={layout.modal.categoryID} />
        )}
        {layout.modal.action === "CreateExpenseByCategory" && (
          <FormCreateExpenseByCategory />
        )}
      </Modal>
    </div>
  );
}
