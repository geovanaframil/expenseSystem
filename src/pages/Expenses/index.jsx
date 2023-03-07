import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import OrderBy from "../../components/Filters/OrderBy";
import Search from "../../components/Filters/Search";
import FilterBy from "../../components/Filters/FilterBy";
import Summary from "../../components/Summary";
import Table from "../../components/Table";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./Expenses.module.css";
import FormModal from "../../components/Modal/FormModal";
import { layoutContext } from "../../context/layoutContext";
import { expenseContext } from "../../context/expenseContext";

export default function Expenses() {
  const { layout, setLayout } = useContext(layoutContext);
  const navigate = useNavigate();
  const { expenses, setExpenses, expensesInitial, fetchExpenses } =
    useContext(expenseContext);

  useEffect(() => {
    fetchExpenses();
  }, []);

  function handlerSearch(data) {
    if (data === null) {
      setExpenses(expensesInitial);
    } else {
      setExpenses(data);
    }
  }

  function handlerFilter(data) {
    if (data === null) {
      setExpenses(expensesInitial);
    } else {
      setExpenses(data);
    }
  }

  function handlerOrder(data) {
    setExpenses(data);
  }

  const config = [
    {
      label: "ID",
      key: "id",
    },
    {
      label: "Usuario",
      key: "email",
      style: "blue",
      onClick: (user) => {
        navigate(`/usuarios/${user.id}`);
      },
    },
    {
      label: "Despesa",
      key: "amount",
      style: "red",
    },
    {
      label: "Status",
      key: "status",
      // action: <div>teste</div>
    },
  ];

  const configButton = {
    name: "ADICIONAR DESPESA",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    onClick: () => {
      setLayout({ ...layout, modal: { show: true, action: "CreateExpense" } });
    },
  };

  const expensesFormatedInRealMoney = expenses.map((expense) => {
    return {
      id: expense.id,
      email: expense.email,
      amount: formatPrice(expense.amount),
      status: expense.status,
      show: expense.show,
    };
  });

  return (
    <div className={`${styles.containerExpenses} container`}>
      <Summary data={expenses} page="expenses" />
      <div className={styles.containerFilters}>
        <Search
          items={expensesInitial}
          findFields={["id", "email"]}
          onFiltered={(data) => handlerSearch(data)}
        />
        <OrderBy
          items={expensesInitial}
          orderFields={[
            {
              label: "Id",
              value: "id",
            },
            {
              label: "Usuário",
              value: "email",
            },
            {
              label: "Despesas",
              value: "amount",
            },
            {
              label: "Status",
              value: "status",
            },
          ]}
          onOrder={(data) => handlerOrder(data)}
        />
        <FilterBy
          items={expensesInitial}
          sortFields={[
            {
              label: "Pago",
              value: "PAGO",
            },
            {
              label: "Pendente",
              value: "PENDENTE",
            },
          ]}
          onSorted={(data) => handlerFilter(data)}
        />
      </div>
      <Table configs={config} data={expensesFormatedInRealMoney} />
      <div className={styles.wrapperButton}>
        <Button config={configButton} />
      </div>
    </div>
  );
}
