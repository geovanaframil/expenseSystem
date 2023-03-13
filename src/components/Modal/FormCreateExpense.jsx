import { useContext, useEffect, useState } from "react";
import styles from "./Modal.module.css";
import { getAllCategories } from "../../Services/categories.service";
import { getAllUsers } from "../../Services/users.service";
import Button from "../Button";
import { layoutContext } from "../../context/layoutContext";
import {addNewExpense} from "../../Services/expenses.service";
import { expenseContext } from "../../context/expenseContext";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import { useForm } from "react-hook-form";
import { maskMoney } from "../../utils/maskMoney";
import { priceFormattedToNumber } from "../../utils/formatPrice";

export default function FormCreateExpense() {
  const { layout, setLayout } = useContext(layoutContext);
  const { fetchExpenses } = useContext(expenseContext);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const notyf = new Notyf({
    ripple: false,
    position: {
      x: "right",
      y: "top",
    },
  });

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

  async function handleSave(data) {
    const body = {
      ...data,
      status: "PENDENTE",
      amount: priceFormattedToNumber(data.amount),
    };

    await addNewExpense(body);
    fetchExpenses();

    notyf.success("Despesa criada com sucesso!");
    closeModal();
  }

  const configSaveButton = {
    name: "SALVAR",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    type: "blue",
    onClick: () => {},
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
      <form onSubmit={handleSubmit(handleSave)}>
        <div className={styles.titleModal}>
          <h2>ADICIONAR DESPESA</h2>
        </div>
        <div className={styles.fields}>
          <div className={styles.boxField}>
            <label htmlFor="name">Nome</label>
            <input
              className={errors?.name ? styles["error"] : ""}
              id="name"
              type="text"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className={styles.message_error}>
                Insira o nome da despesa
              </span>
            )}
          </div>
          <div className={styles.boxField}>
            <label>Categoria</label>
            <select
              className={errors?.categoryID ? styles["error"] : ""}
              {...register("categoryID", { required: true })}
            >
              <option></option>
              {categories.map((category) => {
                return (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            {errors.categoryID && (
              <span className={styles.message_error}>
                Selecione uma categoria
              </span>
            )}
          </div>
          <div className={styles.boxField}>
            <label>Usuário</label>
            <select
              className={errors?.userID ? styles["error"] : ""}
              {...register("userID", { required: true })}
            >
              <option></option>
              {users.map((user) => {
                console.log(user);
                return (
                  <option key={user.id} value={user.id}>
                    {`${user.name} ${user.lastName}`}
                  </option>
                );
              })}
            </select>
            {errors.userID && (
              <span className={styles.message_error}>Selecione um usuário</span>
            )}
          </div>
          <div className={styles.boxField}>
            <label>Valor</label>
            <input
              className={errors?.amount ? styles["error"] : ""}
              type="text"
              {...register("amount", {
                required: true,
                validate: (value, formValues) =>
                  Number(value.replace(/\D/g, "")) >= 1,
                onChange: (e) => maskMoney(e),
              })}
            />
            {errors.amount && (
              <span className={styles.message_error}>Insira o valor</span>
            )}
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
