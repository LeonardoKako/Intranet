import { useEffect, useState } from "react";
import type { Login } from "../types/types";
import { loginService } from "../api/loginsService";
import { HeaderMain } from "./HeaderMain";
import { KeyRoundIcon } from "lucide-react";
import { ModernTable } from "./ModernTable";

export function MainLogin() {
  const [logins, setLogins] = useState<Login[]>([]);
  useEffect(() => {
    async function loadAll() {
      console.log("chamado api");

      try {
        const [l] = await Promise.all([loginService.getAll()]);
        setLogins(l);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    loadAll();
  }, []);

  return (
    <main className='w-full min-h-[89.8vh] bg-gray-100 p-6 px-10 rounded'>
      <HeaderMain title='Login' icon={<KeyRoundIcon size={56} />} />
      <ModernTable logins={logins} />
    </main>
  );
}
