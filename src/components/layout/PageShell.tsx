import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '@/store/ui.store';
import { useSocket } from '@/hooks/useSocket';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/tables': 'Tables',
  '/reservations': 'Reservations',
  '/menu': 'Menu',
  '/orders': 'Orders',
  '/call-logs': 'Call Logs',
  '/kitchen': 'Kitchen Display',
  '/settings': 'Settings',
};

export const PageShell = () => {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  useSocket();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header title={title} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
        <footer className="border-t border-border px-6 py-4 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Spandan AI. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
