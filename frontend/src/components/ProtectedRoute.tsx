// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/AuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isChecking, setIsChecking] = useState(true);
  const location = useLocation();
  const { isAuthenticated, checkSession, logout } = useAuthStore();

  useEffect(() => {
    const checkAuth = () => {
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
    const intervalId = setInterval(checkAuth, 30000); // Verifica a cada 30 segundos

    return () => clearInterval(intervalId);
  }, [isAuthenticated, checkSession, logout, location]);

  if (isChecking) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirecionar para login, mantendo a URL original
    return <Navigate to='/' state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
