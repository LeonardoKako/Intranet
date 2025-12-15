/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
// components/MainProfile.tsx
import { UserIcon } from "lucide-react";
import { HeaderMain } from "./HeaderMain";
import { useEffect, useState } from "react";
import type { User } from "../types/types";
import { toast } from "react-toastify";
import { usersService } from "../api/userService";
import isEmail from "validator/lib/isEmail";
import type { UpdateUserDto } from "../api/dto/user.dto";

type Props = {
  user: User;
  onUpdateSuccess?: (updatedUser: User) => void;
  isUpdating?: boolean;
};

export function MainProfile({
  user,
  onUpdateSuccess,
  isUpdating = false,
}: Props) {
  // Estados para os campos editáveis
  const [fullName, setFullName] = useState(user.fullName || "");
  const [nickname, setNickname] = useState(user.nickname || "");
  const [email, setEmail] = useState(user.email || "");

  // Estados para alteração de senha
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Sincronizar estados quando o user prop mudar
  useEffect(() => {
    setFullName(user.fullName || "");
    setNickname(user.nickname || "");
    setEmail(user.email || "");
  }, [user]);

  // Função para validar senha
  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 6) {
      errors.push("A senha deve ter pelo menos 6 caracteres");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("A senha deve conter pelo menos uma letra maiúscula");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("A senha deve conter pelo menos um número");
    }

    return errors;
  };

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    // Validações básicas
    if (fullName.trim() === "") {
      return toast.error("O nome completo não pode estar vazio.");
    }

    if (nickname.trim() === "") {
      return toast.error("O apelido não pode estar vazio.");
    }

    if (email.trim() === "" || !isEmail(email)) {
      return toast.error("Por favor, insira um e-mail válido.");
    }

    // Se o usuário está tentando alterar a senha
    if (newPassword) {
      // Verificar se a senha antiga foi fornecida
      if (!oldPassword) {
        return toast.error("Para alterar a senha, informe sua senha atual.");
      }

      // Verificar se as senhas novas coincidem
      if (newPassword !== confirmPassword) {
        return toast.error("A nova senha e a confirmação não coincidem.");
      }

      // Validar força da nova senha
      const passwordErrors = validatePassword(newPassword);
      if (passwordErrors.length > 0) {
        passwordErrors.forEach((error) => toast.error(error));
        return;
      }
    }

    // Preparar dados para enviar ao backend
    const updateData: UpdateUserDto = {
      fullName: fullName.trim(),
      nickname: nickname.trim(),
      email: email.trim().toLowerCase(),
    };

    // Adicionar dados de senha apenas se for alterar
    if (newPassword) {
      updateData.oldPassword = oldPassword;
      updateData.password = newPassword;
    }

    try {
      // Chamar o serviço de atualização
      const updatedUser = await usersService.update(user.id, updateData);

      // Notificar sucesso
      toast.success("Perfil atualizado com sucesso!");

      // Limpar campos de senha
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      // Chamar callback de sucesso (se fornecido)
      if (onUpdateSuccess) {
        onUpdateSuccess(updatedUser);
      }
    } catch (error: any) {
      // Tratar erros específicos do backend
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Erro ao atualizar o perfil. Tente novamente.";

      toast.error(errorMessage);
    }
  }

  // Função para cancelar edições
  const handleCancel = () => {
    setFullName(user.fullName || "");
    setNickname(user.nickname || "");
    setEmail(user.email || "");
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    toast.info("Alterações descartadas.");
  };

  // Verificar se há alterações pendentes
  const hasChanges =
    fullName !== user.fullName ||
    nickname !== user.nickname ||
    email !== user.email ||
    newPassword !== "";

  return (
    <main className='w-full min-h-full bg-gray-100 rounded-lg shadow-xl p-6'>
      <HeaderMain
        title='Editar Perfil'
        icon={<UserIcon size={56} className='text-blue-500' />}
      />

      <div className='mt-8 max-w-4xl mx-auto'>
        {/* Banner informativo */}
        <div className='mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
          <h3 className='font-semibold text-blue-800 mb-2'>
            Informações importantes
          </h3>
          <ul className='text-sm text-blue-700 space-y-1'>
            <li>• Para alterar a senha, preencha todos os campos de senha</li>
            <li>
              • Deixe os campos de senha em branco para manter a senha atual
            </li>
            <li>• A nova senha deve ter pelo menos 6 caracteres</li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className='grid grid-cols-1 md:grid-cols-2 gap-6'
        >
          {/* Informações Básicas */}
          <div className='md:col-span-2 mb-4'>
            <h3 className='text-lg font-semibold text-gray-800 border-b pb-2'>
              Informações Básicas
            </h3>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>
              Nome completo: *
            </label>
            <input
              name='fullName'
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Seu nome completo'
              required
              disabled={isUpdating}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Apelido: *</label>
            <input
              name='nickname'
              type='text'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Como prefere ser chamado'
              required
              disabled={isUpdating}
            />
          </div>

          <div className='md:col-span-2 flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>E-mail: *</label>
            <input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='seu.email@exemplo.com'
              required
              disabled={isUpdating}
            />
          </div>

          {/* Alteração de Senha */}
          <div className='md:col-span-2 mt-6 mb-4'>
            <h3 className='text-lg font-semibold text-gray-800 border-b pb-2'>
              Alteração de Senha (opcional)
            </h3>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Senha atual:</label>
            <input
              name='oldPassword'
              type='password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Digite sua senha atual'
              disabled={isUpdating}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>Nova senha:</label>
            <input
              name='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Digite a nova senha'
              disabled={isUpdating}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-medium text-gray-700'>
              Confirme a nova senha:
            </label>
            <input
              name='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition'
              placeholder='Confirme a nova senha'
              disabled={isUpdating}
            />
          </div>

          {/* Botões de Ação */}
          <div className='md:col-span-2 flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200'>
            <button
              type='submit'
              disabled={isUpdating || !hasChanges}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all
                ${
                  isUpdating || !hasChanges
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600 hover:shadow-lg"
                }`}
            >
              {isUpdating ? (
                <span className='flex items-center justify-center gap-2'>
                  <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                  Salvando...
                </span>
              ) : (
                "Salvar alterações"
              )}
            </button>

            <button
              type='button'
              onClick={handleCancel}
              disabled={isUpdating}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition
                ${
                  isUpdating
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg"
                }`}
            >
              Cancelar
            </button>
          </div>

          {/* Indicador de alterações */}
          {hasChanges && !isUpdating && (
            <div className='md:col-span-2 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg'>
              <p className='text-sm text-yellow-800 flex items-center gap-2'>
                <span className='w-2 h-2 bg-yellow-500 rounded-full'></span>
                Você tem alterações pendentes. Clique em "Salvar alterações"
                para aplicar.
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
