import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LoginInput } from '@/schemas/auth.schema';
import { loginUser, refreshToken } from '@/services/auth.service';
import { disconnectSocket } from '@/lib/socket';
import type { UserRole } from '@/types';

interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: AuthUser | null;
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
        // Set initializing: false to prevent initialize() from overwriting this login result
        set({ user: res.user, token: res.accessToken, refreshTokenValue: res.refreshToken, initializing: false });
      },
      logout: () => {
        disconnectSocket();
        set({ user: null, token: null, refreshTokenValue: null });
      },
      setToken: (token) => set({ token }),
      setRefreshToken: (token) => set({ refreshTokenValue: token }),
      initialize: async () => {
        const state = useAuthStore.getState();
        if (!state.token && !state.user) {
          set({ initializing: false });
          return;
        }
        const rt = state.refreshTokenValue;
        if (!rt) {
          set({ user: null, token: null, refreshTokenValue: null, initializing: false });
          return;
        }
        try {
          const res = await refreshToken(rt);
          // Only update if login() hasn't been called already (initializing still true)
          if (useAuthStore.getState().initializing) {
            set({ user: res.user, token: res.accessToken, initializing: false });
          }
        } catch {
          if (useAuthStore.getState().initializing) {
            set({ user: null, token: null, refreshTokenValue: null, initializing: false });
          }
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
