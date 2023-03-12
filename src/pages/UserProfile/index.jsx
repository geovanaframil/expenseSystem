import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import OrderBy from "../../components/Filters/OrderBy";
import Summary from "../../components/Summary";
import Table from "../../components/Table";
import { userContext } from "../../context/userContext";
import { formatPrice } from "../../utils/formatPrice";
import Form from "./Form";
import styles from "./UserProfile.module.css";
import { layoutContext } from "../../context/layoutContext";

export default function UserProfile() {
  const { layout, setLayout } = useContext(layoutContext);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { fetchUser, currentUser, getTotalExpenseByStatus } =
    useContext(userContext);
  const [userExpenses, setUserExpenses] = useState([]);

  function userCategoriesMap() {
    const categoryMapped = currentUser._categories.map((category) => {
      return {
        id: category.id,
        nameCategory: category.name,
        show: true,
        PAGO: formatPrice(getTotalExpenseByStatus(category._expenses, "PAGO")) ,
        PENDENTE: formatPrice(getTotalExpenseByStatus(category._expenses, "PENDENTE")) ,
      };
    });
    return categoryMapped;
  }

  useEffect(() => {
    fetchUser(userId);
  }, []);

  useEffect(() => {
    const expenses = userCategoriesMap();
    setUserExpenses(expenses);
  }, [currentUser]);

  function handlerSearch(data) {
    if (data === null) {
      fetchUser(userId);
    } else {
      setUserExpenses(data);
    }
  }

  const configTable = [
    {
      label: "ID",
      key: "id",
    },
    {
      label: "Categoria",
      key: "nameCategory",
      style: "blue",
      onClick: (user) => {
        navigate(`/usuarios/${userId}/categoria/${user.nameCategory}`);
      },
    },
    {
      label: "Pendente",
      key: "PENDENTE",
      style: "red",
    },
    {
      label: "Pago",
      key: "PAGO",
      style: "green",
    },
  ];

  const configButton = {
    name: "ADICIONAR DESPESA",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    type: 'blue',
    onClick: () => {
      setLayout({
        ...layout,
        modal: { show: true, action: "CreateExpenseUser", user: currentUser },
      });
    },
  };

  return (
    <div className={`${styles.containerUser}`}>
      <div className={styles.titleData}>
        <h2>DADOS CADASTRAIS</h2>
      </div>
      <div className={styles.line}></div>
      <Form user={currentUser} />
      <div className={styles.titleExpenses}>
        <h2>DESPESAS POR CATEGORIA</h2>
      </div>
      <div className={styles.line}></div>
      <Summary data={userExpenses} page="userProfile" />
      <div className={styles.containerFilters}>
        <OrderBy
          items={userExpenses}
          orderFields={[
            {
              label: "ID",
              value: "id",
            },
            {
              label: "Categoria",
              value: "nameCategory",
            },
            {
              label: "Pendente",
              value: "PENDENTE",
            },
            {
              label: "Pago",
              value: "PAGO",
            },
          ]}
          onOrder={(data) => handlerSearch(data)}
        />
      </div>
      <Table configs={configTable} data={userExpenses} />

      <div className={styles.wrapperButton}>
        <Button config={configButton} />
      </div>
    </div>
  );
}
