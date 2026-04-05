import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  ClipboardList,
  ShoppingBag,
  Phone,
  Settings,
  ChefHat,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tables', icon: UtensilsCrossed, label: 'Tables' },
  { to: '/reservations', icon: CalendarDays, label: 'Reservations' },
  { to: '/menu', icon: ClipboardList, label: 'Menu' },
  { to: '/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/call-logs', icon: Phone, label: 'Call Logs' },
  { to: '/kitchen', icon: ChefHat, label: 'Kitchen' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
        <ChefHat className="h-7 w-7 text-sidebar-primary shrink-0" />
        {sidebarOpen && (
          <span className="font-serif text-xl font-bold text-sidebar-foreground whitespace-nowrap">
            La Maison
          </span>
        )}
      </div>

      <nav className="flex flex-col gap-1 p-3 mt-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
