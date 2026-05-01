import { Bell, Menu, LogOut, User, Sun, Moon, ShoppingBag, CalendarCheck, Phone, Check } from 'lucide-react';
import { useUIStore, type Notification } from '@/store/ui.store';
import { useAuth } from '@/hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  title: string;
}

const notificationIcon: Record<Notification['type'], typeof ShoppingBag> = {
  order: ShoppingBag,
  reservation: CalendarCheck,
  call: Phone,
};

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export const Header = ({ title }: HeaderProps) => {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const notificationCount = useUIStore((s) => s.notificationCount);
  const notifications = useUIStore((s) => s.notifications);
  const markAllRead = useUIStore((s) => s.markAllRead);
  const clearNotifications = useUIStore((s) => s.clearNotifications);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-serif font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen);
              if (!notifOpen && notificationCount > 0) markAllRead();
            }}
            className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-12 w-80 max-h-96 rounded-lg border border-border bg-card shadow-lg overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold text-card-foreground">Notifications</h3>
                {notifications.length > 0 && (
                  <button
                    onClick={clearNotifications}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="overflow-y-auto max-h-80">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                    <Check className="h-8 w-8 mb-2" />
                    <p className="text-sm">All caught up!</p>
                  </div>
                ) : (
                  notifications.map((n) => {
                    const Icon = notificationIcon[n.type];
                    return (
                      <div
                        key={n.id}
                        className={`flex items-start gap-3 px-4 py-3 border-b border-border last:border-0 transition-colors ${
                          !n.read ? 'bg-muted/50' : ''
                        }`}
                      >
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-card-foreground">{n.message}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{timeAgo(n.timestamp)}</p>
                        </div>
                        {!n.read && (
                          <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </div>
            {user && <span className="text-sm font-medium text-foreground">{user.name}</span>}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-48 rounded-lg border border-border bg-card shadow-lg p-1">
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-muted transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
