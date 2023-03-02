import { createContext, useState } from "react";

const initialState = {
  modal: {
    show: false,
  },
};

export const layoutContext = createContext(initialState);

export function LayoutProvider({ children }) {
  const [layout, setLayout] = useState(initialState);

  return <layoutContext.Provider value={{layout, setLayout}}>{children}</layoutContext.Provider>;
}
