import { Route, Routes } from 'react-router-dom';
import Categories from './pages/Categories';
import Expenses from './pages/Expenses';
import Users from './pages/Users';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Expenses />} />
            <Route path="/despesas" element={<Expenses />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/usuarios/:userId" element={<Users />} />
            <Route path="/usuarios/:userId/categoria/:categoriaId" element={<Users />} />
            <Route path="/categorias" element={<Categories />} />
            
        </Routes>
    );
}
