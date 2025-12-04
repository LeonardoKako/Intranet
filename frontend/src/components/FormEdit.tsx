import { useEffect, useState } from "react";
import type { Login } from "../types/types";
import { loginService } from "../api/loginsService";
import type { UpdateLoginDto } from "../api/dto/login.dto";
import { toast } from "react-toastify";

type Props = {
  id: string;
};

export function FormEdit({ id }: Props) {
  const [login, setLogin] = useState<Login | null>(null);
  const [title, setTitle] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getOneData(id: string) {
      try {
        setIsLoading(true);
        const loginData = await loginService.getOne(id);
        setLogin(loginData);

        // Preenche os estados dos inputs com os dados do login
        setTitle(loginData.title || "");
        setUsername(loginData.username || "");
        setPassword(loginData.password || "");
        setUrl(loginData.url || "");
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        toast.error("Erro ao carregar os dados do login");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      getOneData(id);
    }
  }, [id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Verifica se há dados para atualizar
    if (!login) {
      toast.error("Nenhum login carregado para atualizar");
      return;
    }

    const updatedLogin: UpdateLoginDto = {
      title: title || login.title,
      username: username || login.username,
      password: password || login.password,
      url: url || login.url,
    };

    try {
      await loginService.update(id, updatedLogin);
      toast.success("Login atualizado com sucesso!");

      // Atualiza o estado do login com os novos dados
      setLogin({
        ...login,
        ...updatedLogin,
      });
    } catch (err) {
      console.error("Erro ao atualizar login:", err);
      toast.error("Erro ao atualizar o login. Tente novamente!");
    }
  }

  if (isLoading) {
    return <div className='p-4 text-center'>Carregando...</div>;
  }

  if (!login) {
    return (
      <div className='p-4 text-center text-red-500'>Login não encontrado</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {/* TITLE */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Title</span>
        <input
          name='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded px-3 py-2'
          placeholder='Digite o título'
        />
      </label>

      {/* USERNAME */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Username</span>
        <input
          name='username'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border rounded px-3 py-2'
          placeholder='Digite o username'
        />
      </label>

      {/* URL */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>URL</span>
        <input
          name='url'
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='border rounded px-3 py-2'
          placeholder='Digite a URL'
        />
      </label>

      {/* PASSWORD */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Password</span>
        <input
          name='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border rounded px-3 py-2'
          placeholder='Digite a senha'
        />
      </label>

      <button
        type='submit'
        className='mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
        disabled={isLoading}
      >
        {isLoading ? "Salvando..." : "Salvar alterações"}
      </button>
    </form>
  );
}
