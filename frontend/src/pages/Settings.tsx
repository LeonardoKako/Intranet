/* eslint-disable react-hooks/exhaustive-deps */
// pages/Settings.tsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import { MainProfile } from "../components/MainProfile";
import { SideBar } from "../components/SideBar";
import { useAuthStore } from "../stores/AuthStore";
import { usersService } from "../api/userService";
import { toast } from "react-toastify";
import type { UpdateUserDto } from "../api/dto/user.dto";

export default function Settings() {
  const { user: authUser, updateUser: updateAuthStore } = useAuthStore();
  const [userData, setUserData] = useState(authUser);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Buscar dados atualizados do usuário
  const fetchUserData = async () => {
    if (!authUser) return;

    try {
      const userFromApi = await usersService.getOne(authUser.id);
      setUserData(userFromApi);
    } catch (error) {
      console.error("Error fetching user:", error);
      toast.error("Erro ao carregar dados do usuário");
      // Se der erro, mantém os dados do store
      setUserData(authUser);
    }
  };

  // Carregar dados na inicialização
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchUserData();
      setLoading(false);
    };

    loadData();
  }, [authUser]);

  // Função para atualizar após edição
  const handleProfileUpdate = async (updatedUser: UpdateUserDto) => {
    setRefreshing(true);
    await fetchUserData();
    updateAuthStore(updatedUser);
    setRefreshing(false);
  };

  if (loading) {
    return (
      <section className='w-screen min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='flex flex-col items-center gap-4'>
          <div className='w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin'></div>
          <p className='text-white text-lg'>Carregando perfil...</p>
        </div>
      </section>
    );
  }

  if (!userData) {
    return (
      <section className='w-screen min-h-screen bg-linear-to-br from-gray-900 to-gray-800 flex items-center justify-center'>
        <div className='text-white text-xl'>Usuário não encontrado</div>
      </section>
    );
  }

  return (
    <section className='w-screen min-h-screen bg-gray-400 overflow-hidden'>
      <Header />
      <SideBar />
      <div className='max-w-[86vw] lg:max-w-[84vw] ml-[14.1vw] lg:ml-[16.1vw] mt-[10vh]'>
        <div className='flex-1'>
          {refreshing && (
            <div className='absolute top-20 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg animate-pulse'>
              Atualizando...
            </div>
          )}
          <MainProfile
            user={userData}
            onUpdateSuccess={handleProfileUpdate}
            isUpdating={refreshing}
          />
        </div>
      </div>
    </section>
  );
}
