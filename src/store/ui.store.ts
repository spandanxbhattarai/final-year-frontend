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

export interface Notification {
  id: string;
  message: string;
  type: 'order' | 'reservation' | 'call';
  timestamp: Date;
  read: boolean;
}

interface UIState {
  sidebarOpen: boolean;
  notificationCount: number;
  notifications: Notification[];
  theme: Theme;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setNotificationCount: (count: number) => void;
  incrementNotifications: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAllRead: () => void;
  clearNotifications: () => void;
  toggleTheme: () => void;
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  notificationCount: 0,
  notifications: [],
  theme: initialTheme,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setNotificationCount: (count) => set({ notificationCount: count }),
  incrementNotifications: () => set((state) => ({ notificationCount: state.notificationCount + 1 })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        { ...notification, id: crypto.randomUUID(), timestamp: new Date(), read: false },
        ...state.notifications,
      ].slice(0, 50),
      notificationCount: state.notificationCount + 1,
    })),
  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      notificationCount: 0,
    })),
  clearNotifications: () => set({ notifications: [], notificationCount: 0 }),
  toggleTheme: () =>
    set((state) => {
      const next: Theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      return { theme: next };
    }),
}));
