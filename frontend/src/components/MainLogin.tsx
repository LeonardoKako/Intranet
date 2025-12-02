import { useEffect, useState } from "react";
import type { Login } from "../types/types";
import { loginService } from "../api/loginsService";

export function MainLogin() {
  const [logins, setLogins] = useState<Login[]>([]);
  useEffect(() => {
    async function loadAll() {
      try {
        const [l] = await Promise.all([loginService.getAll()]);
        setLogins(l);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    loadAll();
  }, []);
  console.log(logins);

  return (
    <main>
      <ul>
        {logins.map((login) => (
          <li key={login.id}>{login.id}</li>
        ))}
      </ul>
    </main>
  );
}
