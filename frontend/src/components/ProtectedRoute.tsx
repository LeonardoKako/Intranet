// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/AuthStore";
import { Loader2Icon } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const { isAuthenticated, checkSession, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      // Se estiver na página de login e já estiver autenticado, redireciona para home
      if (location.pathname === "/" && isAuthenticated) {
        setIsChecking(false);
        return;
      }

      // Se não estiver autenticado, verifica sessão
      if (!isAuthenticated) {
        setIsChecking(false);
        return;
      }

      // Verificar se a sessão ainda é válida
      const isSessionValid = checkSession();

      if (!isSessionValid) {
        // Logout automático
        logout();
      }

      setIsChecking(false);
    };

    checkAuth();

    // Configurar um intervalo para verificar a sessão periodicamente
    const intervalId = setInterval(checkAuth, 30000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, checkSession, logout, location]);

  if (isChecking) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-gray-700 via-gray-600 to-gray-800'>
        <div className='text-center'>
          <Loader2Icon className='w-12 h-12 text-white animate-spin mx-auto mb-4' />
          <p className='text-white text-lg'>Verificando autenticação...</p>
          <p className='text-gray-400 text-sm mt-2'>Por favor, aguarde</p>
        </div>
      </div>
    );
  }

  // Se tentar acessar login estando autenticado, redireciona para home
  if (location.pathname === "/" && isAuthenticated) {
    return <Navigate to='/home' replace />;
  }

  // Se não estiver autenticado e não estiver na página de login, redireciona
  if (!isAuthenticated && location.pathname !== "/") {
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
