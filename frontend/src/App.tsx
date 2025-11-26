import { useEffect, useState } from "react";
import { usersService } from "./api/userService";

type User = {
  id: string;
  fullName: string;
  email: string;
  nickname: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

export function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await usersService.getAll();
      console.log(data);
      setUsers(data);
      console.log(data);
    }
    load();
  }, []);

  return (
    <div>
      <h1>usuarios</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.fullName}</li>
        ))}
      </ul>
    </div>
  );
}
