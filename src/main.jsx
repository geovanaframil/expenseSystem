import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ExpenseProvider } from "./context/expenseContext";
import { LayoutProvider } from "./context/layoutContext";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LayoutProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </LayoutProvider>
  </BrowserRouter>
);
