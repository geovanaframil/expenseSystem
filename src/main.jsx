import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CategoryProvider } from './context/categoryContext';
import { ExpenseProvider } from './context/expenseContext';
import { LayoutProvider } from './context/layoutContext';
import { UserProvider } from './context/userContext';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <LayoutProvider>
            <ExpenseProvider>
                <UserProvider>
                    <CategoryProvider>
                        <App />
                    </CategoryProvider>
                </UserProvider>
            </ExpenseProvider>
        </LayoutProvider>
    </BrowserRouter>
);
