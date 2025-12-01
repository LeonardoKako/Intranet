import { useEffect, useState } from "react";
import Home from "./pages/Home";
import { usersService } from "./api/userService";
import { categoryService } from "./api/categoryService";
import { loginService } from "./api/loginsService";

export default function App() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [logins, setLogins] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        const [u, c, l] = await Promise.all([
          usersService.getAll(),
          categoryService.getAll(),
          loginService.getAll(),
        ]);

        setUsers(u);
        setCategories(c);
        setLogins(l);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    loadAll();
  }, []);
  return (
    <>
      <Home />
      <button onClick={() => console.log(users, categories, logins)}>
        clique
      </button>
    </>
  );
}
