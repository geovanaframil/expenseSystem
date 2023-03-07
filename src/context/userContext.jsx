import { createContext, useState } from "react";
import getAllUsers from "../Services/allUsers.service";

const initialState = [];

export const userContext = createContext(initialState);

export function UserProvider({ children }) {
  const [users, setUsers] = useState(initialState);
  const [usersInitial, setUsersInitial] = useState(initialState);

  async function fetchUsers() {
    let response = await getAllUsers();

    const usersReduce = response.map((usuario) => {
      return {
        name: usuario.name,
        lastName: usuario.lastName,
        email: usuario.email,
        show: true
      };
    });
    setUsers(usersReduce);
    setUsersInitial(usersReduce);
  }

  return (
    <userContext.Provider
      value={{ users, setUsers, usersInitial, setUsersInitial, fetchUsers }}
    >
      {children}
    </userContext.Provider>
  );
}
