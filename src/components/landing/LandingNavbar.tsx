import { Link, useLocation } from 'react-router-dom';
import { UtensilsCrossed, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '@/store/ui.store';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const LandingNavbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-3 bg-card/85 backdrop-blur-xl rounded-full mt-4 mx-auto w-[calc(100%-2rem)] max-w-7xl shadow-lg">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-xl font-bold text-foreground tracking-tighter font-display">
          Spandan
        </Link>
        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-tight rounded-full px-3 py-1.5 transition-all ${
                pathname === link.to
                  ? 'text-primary font-semibold bg-primary/5'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 text-muted-foreground hover:bg-primary/5 rounded-full transition-all"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <Link to="/dashboard" className="hidden sm:flex items-center text-muted-foreground p-2 hover:bg-primary/5 rounded-full transition-all">
          <UtensilsCrossed className="h-5 w-5" />
        </Link>
        <Link
          to="/login"
          className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-sm font-semibold tracking-tight hover:opacity-90 transition-all shadow-md"
        >
          Try the AI
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted-foreground hover:bg-muted rounded-full transition-all"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-card rounded-2xl shadow-xl border border-border p-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                pathname === link.to
                  ? 'text-primary bg-primary/5 font-semibold'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
