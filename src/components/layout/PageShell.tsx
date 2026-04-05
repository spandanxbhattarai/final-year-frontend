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
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header title={title} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
