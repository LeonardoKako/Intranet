import { useEffect, useState } from "react";
import { loginService } from "../api/loginsService";
import type { CreateLoginDto } from "../api/dto/login.dto";
import { toast } from "react-toastify";
import { categoryService } from "../api/categoryService";
import type { Category } from "../types/types";
import isURL from "validator/lib/isUrl";

type Props = {
  functionState: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FormCreate({ functionState }: Props) {
  const [title, setTitle] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    async function getIdCategory() {
      try {
        const categories = await categoryService.getAll();

        const found = categories.find(
          (c: Category) => c.name.toLowerCase() === "login".toLowerCase()
        );

        if (found) {
          setCategoryId(found.id);
        } else {
          console.warn("Categoria 'Login' não encontrada");
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        toast.error("Erro ao carregar os dados necessários");
      } finally {
        setIsLoading(false);
      }
    }

    getIdCategory();
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newLogin: CreateLoginDto = {
      title,
      username,
      password,
      url,
      categoryId, // Defina um valor padrão ou modifique conforme necessário
    };

    try {
      if (newLogin.title.length < 3 || newLogin.title.length > 80) {
        return toast.error("O título deve ter entre 3 e 80 caracteres.");
      }
      if (newLogin.username.length < 3 || newLogin.username.length > 80) {
        return toast.error("O username deve ter entre 3 e 80 caracteres.");
      }
      if (newLogin.password.length < 3 || newLogin.password.length > 80) {
        return toast.error("A senha deve ter entre 3 e 80 caracteres.");
      }
      if (newLogin.url.length < 3 || newLogin.url.length > 80) {
        return toast.error("A url deve ter entre 3 e 80 caracteres.");
      }
      if (!isURL(newLogin.url, { require_protocol: true })) {
        return toast.error("A URL precisa incluir http:// ou https://");
      }

      await loginService.create(newLogin);
      toast.success("Login criado com sucesso!");
      functionState(false); // Fecha o modal após a atualização
    } catch {
      toast.error("Erro ao criar o login. Tente novamente!");
    }
  }

  if (isLoading) {
    return <div className='p-4 text-center'>Carregando...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {/* TITLE */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Título</span>
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

      {/* PASSWORD */}
      <label className='flex flex-col gap-1'>
        <span className='font-medium'>Senha</span>
        <input
          name='password'
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border rounded px-3 py-2'
          placeholder='Digite a senha'
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

      <button
        type='submit'
        className='mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer'
        disabled={isLoading}
      >
        {isLoading ? "Criando..." : "Criar Login"}
      </button>
    </form>
  );
}
