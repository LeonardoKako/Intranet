// stores/AuthStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string; // Agora é string (UUID)
  email: string;
  fullName: string;
  nickname: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  // NÃO inclua passwordHash aqui!
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loginTime: number | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  checkSession: () => boolean;
};

const MINUTES = 30;
const SESSION_TIMEOUT = MINUTES * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      loginTime: null,

      login: (userData: User, token: string) => {
        const now = Date.now();
        set({
          user: userData,
          accessToken: token,
          isAuthenticated: true,
          loginTime: now,
        });

        // Salvar token no localStorage para o axios interceptor
        localStorage.setItem("accessToken", token);
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          loginTime: null,
        });

        // Remover token do localStorage
        localStorage.removeItem("accessToken");
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      checkSession: () => {
        const { loginTime, isAuthenticated, accessToken } = get();

        if (!isAuthenticated || !loginTime || !accessToken) {
          return false;
        }

        const now = Date.now();
        const sessionAge = now - loginTime;

        if (sessionAge > SESSION_TIMEOUT) {
          get().logout();
          return false;
        }

        return true;
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
        loginTime: state.loginTime,
      }),
    }
  )
);
