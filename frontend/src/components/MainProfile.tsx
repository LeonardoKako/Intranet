import { UserIcon } from "lucide-react";
import { HeaderMain } from "./HeaderMain";
import { useEffect, useState } from "react";
import type { User } from "../types/types";
import { toast } from "react-toastify";
import { usersService } from "../api/userService";
import type { UpdateUserDto } from "../api/dto/user.dto";
import isEmail from "validator/lib/isEmail";

type Props = {
  user: User;
};

export function MainProfile({ user }: Props) {
  const [fullName, setFullName] = useState(user.fullName);
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    setFullName(user.fullName);
    setNickname(user.nickname);
    setEmail(user.email);
  }, [user]);

  if (!user) {
    return <div>Carregando...</div>;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (fullName.trim() === "") {
      return toast.error("O nome completo não pode estar vazio.");
    }

    if (nickname.trim() === "") {
      return toast.error("O apelido não pode estar vazio.");
    }

    if (email.trim() === "" || isEmail(email) === false) {
      return toast.error("O e-mail não está correto.");
    }

    if (newPassword) {
      if (oldPassword !== user.passwordHash) {
        return toast.error("A antiga senha está incorreta.");
      }

      if (newPassword !== confirmPassword) {
        return toast.error("A nova senha e a confirmação não coincidem.");
      }
    }

    const uptatedUser: UpdateUserDto = {
      fullName,
      nickname,
      email,
      password: newPassword ? newPassword : user.passwordHash,
    };

    try {
      await usersService.update(user.id, uptatedUser);
      toast.success("Perfil atualizado com sucesso!");
    } catch {
      toast.error("Erro ao atualizar o perfil. Tente novamente mais tarde.");
    }
  }

  return (
    <main className='w-full min-h-[89.8vh] bg-gray-100 p-6 px-10 rounded'>
      <HeaderMain title='Editar Perfil' icon={<UserIcon size={56} />} />
      <div className='mt-8 mx-20'>
        <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-8'>
          <label className='flex flex-col gap-1'>
            <span className='font-medium'>Nome completo:</span>
            <input
              name='fullName'
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='border rounded px-3 py-2'
              placeholder='Digite o título'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='font-medium'>Apelido:</span>
            <input
              name='nickname'
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className='border rounded px-3 py-2'
              placeholder='Digite o título'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='font-medium'>E-mail:</span>
            <input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border rounded px-3 py-2'
              placeholder='Digite o título'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='font-medium'>Senha antiga:</span>
            <input
              name='oldPassword'
              type='password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='border rounded px-3 py-2'
              placeholder='Digite o título'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='font-medium'>Nova senha:</span>
            <input
              name='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='border rounded px-3 py-2'
              placeholder='Digite o título'
            />
          </label>
          <label className='flex flex-col gap-1'>
            <span className='font-medium'>Confirme a nova senha:</span>
            <input
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='border rounded px-3 py-2'
              placeholder='Digite o título'
            />
          </label>
          <button
            type='submit'
            className=' bg-green-500 text-white text-xl font-bold px-4 py-4 rounded hover:bg-green-600 transition cursor-pointer mt-4 self-end'
          >
            Salvar alterações
          </button>
          <button
            type='button'
            className=' bg-red-500 text-white text-xl font-bold px-4 py-4 rounded hover:bg-red-600 transition cursor-pointer self-end'
            onClick={() => {
              setFullName(user.fullName);
              setConfirmPassword("");
              setEmail(user.email);
              setNickname(user.nickname);
              setNewPassword("");
              setOldPassword("");
              toast.info("Alterações canceladas.");
            }}
          >
            Cancelar alterações
          </button>
        </form>
      </div>
    </main>
  );
}
