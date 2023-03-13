import { createContext, useState } from 'react';
import { getUser, getAllUsers } from '../Services/users.service';
import { formatPrice } from '../utils/formatPrice';

const initialState = [];

export const userContext = createContext(initialState);

export function UserProvider({ children }) {
    const [users, setUsers] = useState(initialState);
    const [usersInitial, setUsersInitial] = useState(initialState);
    const [usersAllData, setUsersAllData] = useState(initialState);
    const [currentUser, setCurrentUser] = useState({
        _expenses: [],
        _categories: []
    });

    function getTotalExpenseByStatus(expenses, status) {
        let result = expenses.reduce((acc, expense) => {
            if (expense.status === status) {
                acc += expense.amount;
            }
            return acc;
        }, 0);

        return result;
    }

    function usersMap(users) {
        const usersMapped = users.map(user => {
            const { _expenses } = user;
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                PAGO: formatPrice(getTotalExpenseByStatus(_expenses, 'PAGO')) ,
                PENDENTE: formatPrice(getTotalExpenseByStatus(_expenses, 'PENDENTE')),
                show: true
            };
        });

        return usersMapped;
    }

    async function fetchUsers() {
        let response = await getAllUsers();
        let responseReverse = response.reverse()

        const usersReduce = usersMap(responseReverse);

        setUsers(usersReduce);
        setUsersInitial(usersReduce);
        setUsersAllData(responseReverse);
    }

    async function fetchUser(id) {
        let response = await getUser(id);

        setCurrentUser(response);
    }

    return (
        <userContext.Provider
            value={{
                users,
                setUsers,
                usersInitial,
                setUsersInitial,
                usersAllData,
                setUsersAllData,
                fetchUsers,
                fetchUser,
                currentUser,
                setCurrentUser,
                getTotalExpenseByStatus
            }}
        >
            {children}
        </userContext.Provider>
    );
}
