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
  refreshTokenValue: string | null;
  initializing: boolean;
  login: (data: LoginInput) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
  setRefreshToken: (token: string) => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshTokenValue: null,
      initializing: true,
      login: async (data) => {
        const res = await loginUser(data);
        set({ user: res.user, token: res.accessToken, refreshTokenValue: res.refreshToken });
      },
      logout: () => set({ user: null, token: null, refreshTokenValue: null }),
      setToken: (token) => set({ token }),
      setRefreshToken: (token) => set({ refreshTokenValue: token }),
      initialize: async () => {
        const state = useAuthStore.getState();
        if (!state.token && !state.user) {
          set({ initializing: false });
          return;
        }
        try {
          const rt = state.refreshTokenValue;
          const res = await refreshToken(rt || undefined);
          set({
            user: res.user,
            token: res.accessToken,
            initializing: false,
          });
        } catch {
          set({ initializing: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshTokenValue: state.refreshTokenValue,
      }),
    }
  )
);
