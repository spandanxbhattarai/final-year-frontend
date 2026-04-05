import { Bell, Menu, LogOut, User, Sun, Moon } from 'lucide-react';
import { useUIStore } from '@/store/ui.store';
import { useAuth } from '@/hooks/useAuth';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const notificationCount = useUIStore((s) => s.notificationCount);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
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
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted transition-colors">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

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
