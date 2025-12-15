import { KeyRoundIcon } from "lucide-react";
import { HeaderMain } from "./HeaderMain";
import { ModernTable } from "./ModernTable";
import { useEffect, useState } from "react";
import { loginService } from "../api/loginsService";
import type { Login } from "../types/types";

export function MainAccess() {
  const [logins, setLogins] = useState<Login[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Adicionado

  useEffect(() => {
    async function loadAll() {
      try {
        setIsLoading(true); // Adicionado
        const [l] = await Promise.all([loginService.getAll()]);
        setLogins(l);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setIsLoading(false); // Adicionado
      }
    }

    loadAll();
  }, []);

  return (
    <main className='w-full min-h-[89.8vh] bg-gray-100 p-6 px-10 rounded'>
      <HeaderMain title='Acessos' icon={<KeyRoundIcon size={56} />} />

      {/* Adicionado: Verificação de dados vazios */}
      {isLoading ? (
        <div className='flex justify-center mt-10'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500'></div>
        </div>
      ) : logins.length === 0 ? (
        <div className='text-center mt-10 p-8 bg-gray-50 rounded-lg'>
          <p className='text-gray-500 text-lg'>
            Nenhum acesso cadastrado ainda.
          </p>
          <p className='text-gray-400'>
            Clique no ícone "+" para adicionar um novo.
          </p>
        </div>
      ) : (
        <ModernTable logins={logins} />
      )}
    </main>
  );
}
