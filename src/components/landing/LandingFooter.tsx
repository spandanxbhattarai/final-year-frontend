import { Link } from 'react-router-dom';
import { Globe, ShieldCheck } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 bg-muted/40">
      <div className="flex flex-col items-center md:items-start gap-2">
        <Link to="/" className="text-lg font-bold text-foreground font-display">
          Spandan
        </Link>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} Spandan AI. Crafted for Hospitality.
        </p>
      </div>

      <div className="flex gap-8">
        {['Privacy', 'Terms', 'Support'].map((item) => (
          <Link
            key={item}
            to="#"
            className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors opacity-80 hover:opacity-100"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-muted-foreground">
        <Globe className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
        <ShieldCheck className="h-5 w-5 hover:text-primary transition-colors cursor-pointer" />
      </div>
    </footer>
  );
};
