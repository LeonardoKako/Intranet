import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usersService } from "../api/userService";
import type { User } from "../types/types";
import isEmail from "validator/lib/isEmail";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/AuthStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, login } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function getUsers() {
      try {
        const usersFound = await usersService.getAll();
        setUsers(usersFound);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    getUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validar campos
      if (email.trim() === "" || password.trim() === "") {
        toast.error("Por favor, preencha todos os campos");
        setLoading(false);
        return;
      }

      // Validar formato de email
      if (isEmail(email) === false) {
        toast.error("Por favor, insira um email válido");
        setLoading(false);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Buscar usuário pelo email
      const foundUser = users.find((user) => user.email === email);

      if (!foundUser) {
        toast.error("Usuário não encontrado");
        setLoading(false);
        return;
      }

      // Verificar senha (em um caso real, isso seria feito no backend)
      if (foundUser.passwordHash !== password) {
        toast.error("Senha incorreta");
        setLoading(false);
        return;
      }

      login(foundUser);
      navigate("/home");
    } catch (err) {
      toast.error("Erro ao fazer login. Tente novamente.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-screen min-h-screen bg-linear-to-br from-gray-700 via-gray-600 to-gray-800 flex items-center justify-center p-4'>
      <div className='w-full max-w-6xl flex flex-col md:flex-row bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/20'>
        {/* Left Side - Welcome Section */}
        <div className='md:w-1/2 bg-linear-to-br from-rose-400 to-rose-700 p-8 md:p-12 flex flex-col justify-center text-white'>
          <div className='mb-8'>
            <h1 className='text-4xl md:text-5xl font-bold mb-12'>
              Unicesusc Intranet TI
            </h1>
            <p className='text-xl opacity-90 mb-4'>
              Bem vindo ao intranet Unicesusc
            </p>
          </div>

          <div className='space-y-4'>
            <p className='opacity-80'>
              Acesse todas as ferramentas e recursos disponíveis.
            </p>
            <p className='opacity-80'>
              Controle sua conta e gerencie suas preferências.
            </p>
          </div>

          <div className='mt-12 pt-8 border-t border-white/30'>
            <p className='opacity-80'>Faça login para acessar sua conta.</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='md:w-1/2 p-8 md:p-12 bg-white'>
          <div className='max-w-md mx-auto'>
            <h2 className='text-3xl font-bold text-gray-800 mb-8 text-center'>
              Login
            </h2>

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
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition'
                    placeholder='Coloque seu email aqui'
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Senha
                </label>
                <div className='relative'>
                  <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition'
                    placeholder='Coloque sua senha aqui'
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Forgot Password Link */}
              <div className='text-right'>
                <p className='text-sm text-rose-600'>
                  Caso tenha esquecido sua senha, fale com o gestor.
                </p>
              </div>

              {/* Login Button */}
              <button
                type='submit'
                disabled={loading}
                className='w-full bg-linear-to-r from-rose-400 to-rose-700 text-white py-3 px-4 rounded-xl font-semibold 
                  hover:from-rose-500 hover:to-rose-800 transition-all duration-300 transform hover:-translate-y-0.5 
                  shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <div className='w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2'></div>
                    Autenticando...
                  </div>
                ) : (
                  "LOGIN"
                )}
              </button>

              {/* Copyright */}
              <div className='pt-8 mt-8 border-t border-gray-200'>
                <p className='text-center text-gray-500 text-sm'>
                  Copyright © {new Date().getFullYear()}. All rights reserved.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
