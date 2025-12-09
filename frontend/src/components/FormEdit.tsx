import { useEffect, useState } from "react";
import type { Login } from "../types/types";
import { loginService } from "../api/loginsService";
import type { UpdateLoginDto } from "../api/dto/login.dto";
import { toast } from "react-toastify";
import isURL from "validator/lib/isUrl";

type Props = {
  id: string;
  functionState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FormEdit({ id, functionState }: Props) {
  const [login, setLogin] = useState<Login | null>(null);
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOneData(id: string) {
      try {
        setIsLoading(true);

        const loginData = await loginService.getOne(id);
        setLogin(loginData);

        // Preenche os inputs
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

    if (id) getOneData(id);
  }, [id]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!login) {
      return toast.error("Nenhum login carregado para atualizar.");
    }

    const updatedLogin: UpdateLoginDto = {
      title,
      username,
      password,
      url,
    };

    // ------------------------------
    // 🔥 VALIDAÇÕES
    // ------------------------------
    if (updatedLogin.title.length < 3 || updatedLogin.title.length > 80) {
      return toast.error("O título deve ter entre 3 e 80 caracteres.");
    }

    if (updatedLogin.username.length < 3 || updatedLogin.username.length > 80) {
      return toast.error("O username deve ter entre 3 e 80 caracteres.");
    }

    if (updatedLogin.password.length < 3 || updatedLogin.password.length > 80) {
      return toast.error("A senha deve ter entre 3 e 80 caracteres.");
    }

    if (updatedLogin.url.length < 3 || updatedLogin.url.length > 80) {
      return toast.error("A URL deve ter entre 3 e 80 caracteres.");
    }

    if (!isURL(updatedLogin.url, { require_protocol: true })) {
      return toast.error("A URL precisa incluir http:// ou https://");
    }

    // ------------------------------
    // 🔥 REQUISIÇÃO PATCH
    // ------------------------------
    try {
      await loginService.update(id, updatedLogin);

      toast.success("Login atualizado com sucesso!");

      // Atualiza o estado local
      setLogin({
        ...login,
        ...updatedLogin,
      });

      functionState(false); // Fecha o modal
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar o login. Tente novamente!");
    }
  }

  if (isLoading) {
    return <div className='p-4 text-center'>Carregando...</div>;
  }

  if (!login) {
    return (
      <div className='p-4 text-center text-red-500'>Login não encontrado.</div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {/* TITLE */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Título</span>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded px-3 py-2'
        />
      </label>

      {/* USERNAME */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Username</span>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border rounded px-3 py-2'
        />
      </label>

      {/* PASSWORD */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Senha</span>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border rounded px-3 py-2'
        />
      </label>

      {/* URL */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>URL</span>
        <input
          type='text'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className='border rounded px-3 py-2'
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
