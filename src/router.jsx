import { Route, Routes } from 'react-router-dom';
import Categories from './pages/Categories';
import Expenses from './pages/Expenses';
import NotFound from './pages/NotFound';
import UserProfile from './pages/UserProfile';
import UserProfileCategory from './pages/UserProfileCategory';
import Users from './pages/Users';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Expenses />} />
            <Route path="/despesas" element={<Expenses />} />
            <Route path="/usuarios" element={<Users />} />
            <Route path="/usuarios/:userId" element={<UserProfile />} />
            <Route
                path="/usuarios/:userId/categoria/:categoriaId"
                element={<UserProfileCategory />}
            />
            <Route path="/categorias" element={<Categories />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
