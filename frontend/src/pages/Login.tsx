// pages/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usersService } from "../api/userService";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/AuthStore";
import { EyeIcon, EyeOffIcon, AlertCircleIcon } from "lucide-react";
import unicesusc from "../assets/logoUnicesusc.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const { isAuthenticated } = useAuthStore();

  // Se já estiver autenticado, redireciona
  if (isAuthenticated) {
    navigate("/home");
  }

  useEffect(() => {
    if (!isAuthenticated) toast.error("Usuário não autenticado");
    else toast.success("Usuário autenticado com sucesso!", {});
  }, [isAuthenticated]);

  const validateForm = () => {
    if (!isAuthenticated) {
      const newErrors: { email?: string; password?: string } = {};

      if (!email.trim()) {
        newErrors.email = "Email é obrigatório";
      } else if (!isEmail(email)) {
        newErrors.email = "Por favor, insira um email válido";
      }

      if (!password.trim()) {
        newErrors.password = "Senha é obrigatória";
      } else if (password.length < 6) {
        newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      if (!validateForm()) {
        toast.error("Por favor, corrija os erros no formulário");
        return;
      }
    }

    setLoading(true);
    setErrors({});

    try {
      // Chamar o endpoint de login do backend
      const response = await usersService.login(email, password);

      // Response contém { user, accessToken }
      const { user, accessToken } = response;

      // Salvar no store
      useAuthStore.getState().login(user, accessToken);

      // Pequeno delay para mostrar a mensagem de sucesso
      setTimeout(() => {
        navigate("/home");
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Tratar erros específicos do backend
      let errorMessage = "Erro ao fazer login. Verifique suas credenciais.";

      if (error.response?.status === 401) {
        errorMessage = "Email ou senha incorretos";
      } else if (error.response?.status === 404) {
        errorMessage = "Usuário não encontrado";
      } else if (error.code === "ECONNABORTED") {
        errorMessage = "Tempo de conexão esgotado. Tente novamente.";
      } else if (!navigator.onLine) {
        errorMessage = "Sem conexão com a internet";
      }

      if (!isAuthenticated) {
        toast.error(errorMessage, {
          icon: <AlertCircleIcon className='text-red-500' />,
        });
      }

      // Animar os campos com erro
      setErrors({
        email: "Verifique seu email",
        password: "Verifique sua senha",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-screen min-h-screen bg-linear-to-br from-gray-700 via-gray-600 to-gray-800 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl flex flex-col md:flex-row bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20 animate-fade-in'>
        {/* Left Side - Welcome Section */}
        <div className='md:w-1/2 bg-linear-to-br from-rose-400 to-rose-700 p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden'>
          {/* Background pattern */}
          <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16'></div>
          <div className='absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20'></div>

          <div className='relative z-10'>
            <div className='mb-8'>
              <div className='mb-20'>
                <img src={unicesusc} alt='logo unicesusc' />
              </div>
              <p className='text-xl opacity-90 mb-4'>
                Bem-vindo ao intranet Unicesusc
              </p>
            </div>

            <div className='space-y-4'>
              <p className='opacity-80 flex items-center gap-2'>
                <span className='w-2 h-2 bg-white rounded-full'></span>
                Acesse todas as ferramentas e recursos disponíveis.
              </p>
              <p className='opacity-80 flex items-center gap-2'>
                <span className='w-2 h-2 bg-white rounded-full'></span>
                Controle sua conta e gerencie suas preferências.
              </p>
            </div>

            <div className='mt-12 pt-8 border-t border-white/30'>
              <p className='opacity-80'>Faça login para acessar sua conta.</p>
              <p className='text-sm opacity-60 mt-2'>
                Sistema seguro • Acesso restrito • Criptografia SSL
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='md:w-1/2 p-8 md:p-12 bg-white'>
          <div className='max-w-md mx-auto'>
            <div className='text-center mb-8'>
              <h2 className='text-3xl font-bold text-gray-800 mb-2 animate-slide-up'>
                Login
              </h2>
              <p className='text-gray-600'>
                Entre com suas credenciais para continuar
              </p>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Email Input */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Email
                </label>
                <div className='relative'>
                  <input
                    type='email'
                    id='email'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition pr-10 ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder='seu.email@unicesusc.edu.br'
                    disabled={loading}
                  />
                  {errors.email && (
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                      <AlertCircleIcon size={20} className='text-red-500' />
                    </div>
                  )}
                </div>
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600 animate-shake'>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className='flex justify-between items-center mb-2'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Senha
                  </label>
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='text-sm text-rose-600 hover:text-rose-800 transition'
                  >
                    {showPassword ? (
                      <EyeOffIcon size={16} className='inline mr-1' />
                    ) : (
                      <EyeIcon size={16} className='inline mr-1' />
                    )}
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                <div className='relative'>
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors({ ...errors, password: undefined });
                    }}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition pr-10 ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder='Sua senha de acesso'
                    disabled={loading}
                  />
                  {errors.password && (
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                      <AlertCircleIcon size={20} className='text-red-500' />
                    </div>
                  )}
                </div>
                {errors.password && (
                  <p className='mt-1 text-sm text-red-600 animate-shake'>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className='text-right'>
                <p className='text-sm text-rose-600 italic'>
                  Caso tenha esquecido sua senha, entre em contato com o gestor.
                </p>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-linear-to-r from-rose-400 to-rose-700 text-white py-3 px-4 rounded-xl font-semibold 
                  hover:from-rose-500 hover:to-rose-800 transition-all duration-300 transform hover:-translate-y-0.5 
                  shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none 
                  cursor-pointer relative overflow-hidden group'
              >
                <span className='relative z-10 flex items-center justify-center'>
                  {loading ? (
                    <>
                      <div className='w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2'></div>
                      Autenticando...
                    </>
                  ) : (
                    "ENTRAR NO SISTEMA"
                  )}
                </span>
                <div className='absolute inset-0 bg-linear-to-r from-rose-500 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </button>

              {/* Security Info */}
              <div className='pt-4 border-t border-gray-200'>
                <div className='flex items-center justify-center gap-2 text-sm text-gray-500'>
                  <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                  Conexão segura • SSL ativado
                </div>
              </div>

              {/* Copyright */}
              <div className='pt-6 mt-6 border-t border-gray-200'>
                <p className='text-center text-gray-500 text-sm'>
                  Copyright © {new Date().getFullYear()} Unicesusc. Todos os
                  direitos reservados.
                </p>
                <p className='text-center text-gray-400 text-xs mt-1'>
                  Sistema desenvolvido pelo Departamento de TI
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
