import { create } from 'zustand';

type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}

interface UIState {
  sidebarOpen: boolean;
  notificationCount: number;
  theme: Theme;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setNotificationCount: (count: number) => void;
  incrementNotifications: () => void;
  toggleTheme: () => void;
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  notificationCount: 0,
  theme: initialTheme,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setNotificationCount: (count) => set({ notificationCount: count }),
  incrementNotifications: () => set((state) => ({ notificationCount: state.notificationCount + 1 })),
  toggleTheme: () =>
    set((state) => {
      const next: Theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return { theme: next };
    }),
}));
