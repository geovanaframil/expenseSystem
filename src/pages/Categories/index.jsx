import { useEffect, useContext } from "react";
import Search from "../../components/Filters/Search";
import Table from "../../components/Table";
import styles from "./Categories.module.css";
import Button from "../../components/Button";
import OrderBy from "../../components/Filters/OrderBy";
import { layoutContext } from "../../context/layoutContext";
import { categoryContext } from "../../context/categoryContext";

export default function Categories() {
  const { layout, setLayout } = useContext(layoutContext);
  const { categories, setCategories, categoriesInitial, fetchCategories } =
    useContext(categoryContext);

  useEffect(() => {
    fetchCategories();
  }, []);

  function handlerSearch(data) {
    if (data === null) {
      setCategories(categoriesInitial);
    } else {
      setCategories(data);
    }
  }

  const configButtonEdit = {
    name: "EDITAR",
    style: {
      color: "white",
      backgroundColor: "#2196F3",
    },
    type: 'blue',
  };

  const configButtonDelete = {
    name: "EXCLUIR",
    style: {
      color: "#D32F2F",
      backgroundColor: "white",
      border: "1px solid #D32F2F80",
    },
    type: 'red',
  };

  const configTable = [
    {
      label: "ID",
      key: "id",
    },
    {
      label: "Categoria",
      key: "name",
    },
    {
      label: "Ações",
      key: "id",
      action: (item) => (
        <div className="buttonsWrapper">
          <Button
            config={configButtonEdit}
            onClick={() =>
              setLayout({
                ...layout,
                modal: {
                  show: true,
                  action: "EditCategory",
                  categoryID: item.id,
                  name: item.name,
                },
              })
            }
          />
          <Button
            config={configButtonDelete}
            onClick={() =>
              setLayout({
                ...layout,
                modal: {
                  show: true,
                  action: "DeleteCategory",
                  categoryID: item.id,
                  name: item.name,
                },
              })
            }
          />
        </div>
      ),
    },
  ];

  const configButton = {
    name: 'ADICIONAR CATEGORIA',
    style: {
        color: 'white',
        backgroundColor: '#2196F3'
    },
    onClick: () => {
        setLayout({
            ...layout,
            modal: { show: true, action: 'CreateCategory' }
        });
    }
};

  return (
    <div className={`${styles.containerCategories} container`}>
      <div className={styles.containerFilters}>
        <Search
          items={categories}
          findFields={["id", "name"]}
          onFiltered={(data) => handlerSearch(data)}
        />
        <OrderBy
          items={categories}
          orderFields={[
            {
              label: "Id",
              value: "id",
            },
            {
              label: "Categoria",
              value: "name",
            },
          ]}
          onOrder={(data) => handlerSearch(data)}
        />
      </div>
      <Table table={"categoria"} configs={configTable} data={categories} />
      <div className={styles.wrapperButton}>
                <Button config={configButton} />
            </div>
    </div>
  );
}
