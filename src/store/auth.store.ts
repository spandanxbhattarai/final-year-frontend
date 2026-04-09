import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginInput } from '@/schemas/auth.schema';
import { loginUser, refreshToken } from '@/services/auth.service';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
}

interface AuthState {
  user: User | null;
  token: string | null;
  initializing: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      initializing: true,
      login: async (data) => {
        const res = await loginUser(data);
        set({ user: res.user, token: res.accessToken });
      },
      logout: () => set({ user: null, token: null }),
      setToken: (token) => set({ token }),
      initialize: async () => {
        try {
          const res = await refreshToken();
          set({ user: res.user, token: res.accessToken, initializing: false });
        } catch {
          set({ user: null, token: null, initializing: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
