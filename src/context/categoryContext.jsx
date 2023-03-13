import { createContext, useState } from "react";
import { getAllCategories } from "../Services/categories.service";

const initialState = [];

export const categoryContext = createContext(initialState);

export function CategoryProvider({ children }) {
  const [categories, setCategories] = useState(initialState);
  const [categoriesInitial, setCategoriesInitial] = useState(initialState);

  async function fetchCategories() {
    const data = await getAllCategories();
    const newData = data.reverse().map((item) => {
      return {
        id: item.id,
        name: item.name,
        show: true,
      };
    });
    setCategories(newData);
    setCategoriesInitial(newData);
  }

  return (
    <categoryContext.Provider
      value={{
        categories,
        setCategories,
        categoriesInitial,
        fetchCategories,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
}
