import { useEffect, useState } from "react";
import type { Login } from "../types/types";
import { loginService } from "../api/loginsService";

type Props = {
  id: string;
};

export function FormEdit({ id }: Props) {
  const [login, setLogin] = useState<Login | null>(null);
  useEffect(() => {
    async function getOneData(id: string) {
      try {
        const loginData = await loginService.getOne(id);
        setLogin(loginData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    }

    getOneData(id);
  }, [id]);
  return (
    <form>
      <div className='flex flex-col gap-4'>
        <label className='flex flex-col gap-1'>
          <span className='font-medium'>Title</span>
          <input
            type='text'
            className='border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400'
            defaultValue='Sample Title'
          />
        </label>
      </div>
    </form>
  );
}
