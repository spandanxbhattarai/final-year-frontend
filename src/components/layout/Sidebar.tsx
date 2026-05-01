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
  Users,
  User,
} from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';

const allNavItems: { to: string; icon: React.ElementType; label: string; roles: UserRole[] }[] = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { to: '/users', icon: Users, label: 'Users', roles: ['SUPER_ADMIN'] },
  { to: '/tables', icon: UtensilsCrossed, label: 'Tables', roles: ['SUPER_ADMIN', 'ADMIN', 'STAFF'] },
  { to: '/reservations', icon: CalendarDays, label: 'Reservations', roles: ['SUPER_ADMIN', 'ADMIN', 'STAFF'] },
  { to: '/menu', icon: ClipboardList, label: 'Menu', roles: ['SUPER_ADMIN', 'ADMIN', 'STAFF'] },
  { to: '/orders', icon: ShoppingBag, label: 'Orders', roles: ['SUPER_ADMIN', 'ADMIN', 'STAFF'] },
  { to: '/call-logs', icon: Phone, label: 'Call Logs', roles: ['SUPER_ADMIN', 'ADMIN'] },
  { to: '/kitchen', icon: ChefHat, label: 'Kitchen', roles: ['SUPER_ADMIN', 'ADMIN', 'COOK'] },
  { to: '/settings', icon: Settings, label: 'Settings', roles: ['SUPER_ADMIN', 'ADMIN', 'STAFF', 'COOK'] },
  { to: '/profile', icon: User, label: 'Profile', roles: ['SUPER_ADMIN', 'ADMIN', 'STAFF', 'COOK'] },
];

export const Sidebar = () => {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const { user } = useAuth();

  const navItems = allNavItems.filter(
    (item) => user?.role && item.roles.includes(user.role as UserRole)
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex h-16 items-center gap-3 px-6 border-b border-sidebar-border">
        <img src="/logo.png" alt="Spandan" className="h-8 w-8 rounded-full object-cover shrink-0" />
        {sidebarOpen && (
          <span className="font-serif text-xl font-bold text-sidebar-foreground whitespace-nowrap">
            Spandan
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
