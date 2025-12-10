// stores/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "../types/types";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginTime: number | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  checkSession: () => boolean; // Verifica se a sessão ainda é válida
  clearLoginTime: () => void; // Para limpar quando fazer logout manual
};

// 5 minutos em milissegundos
const MINUTES = 5;
const SESSION_TIMEOUT = MINUTES * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loginTime: null,

      login: (userData: User) => {
        const now = Date.now();
        set({
          user: userData,
          isAuthenticated: true,
          loginTime: now,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          loginTime: null,
        });
      },

      updateUser: (userData: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        }));
      },

      checkSession: () => {
        const { loginTime, isAuthenticated } = get();

        if (!isAuthenticated || !loginTime) {
          return false;
        }

        const now = Date.now();
        const sessionAge = now - loginTime;

        // Se passou mais de 5 minutos, faz logout automático
        if (sessionAge > SESSION_TIMEOUT) {
          get().logout();
          return false;
        }

        return true;
      },

      clearLoginTime: () => {
        set({ loginTime: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      // Persistir apenas o necessário
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loginTime: state.loginTime,
      }),
    }
  )
);
