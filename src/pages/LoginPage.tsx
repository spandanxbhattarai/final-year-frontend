import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/schemas/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError('');
    try {
      await login(data);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-linear-to-br from-primary via-primary/90 to-accent items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/3 rounded-full" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-12 max-w-lg">
          <img src="/logo.png" alt="Spandan" className="h-24 w-24 mx-auto mb-8 drop-shadow-lg rounded-full object-cover" />

          <h1 className="text-5xl font-serif font-bold text-white tracking-wide mb-3">
            Spandan
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-white/40" />
            <p className="text-sm text-white/70 uppercase tracking-[0.3em] font-medium">
              Fine Dining
            </p>
            <span className="h-px w-8 bg-white/40" />
          </div>

          <p className="text-white/60 text-base leading-relaxed mb-10">
            Where every dish tells a story and every guest becomes family.
            Manage your restaurant with elegance and precision.
          </p>

          {/* Testimonial / feature highlights */}
          <div className="space-y-4 text-left">
            {[
              { label: 'Real-time Orders', desc: 'Track every order from kitchen to table' },
              { label: 'Smart Reservations', desc: 'AI-powered booking & table management' },
              { label: 'Voice Assistant', desc: 'Handle calls automatically with VAPI' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-3 bg-white/8 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10"
              >
                <div className="mt-0.5 h-2 w-2 rounded-full bg-white/60 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white/90">{item.label}</p>
                  <p className="text-xs text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile-only logo */}
          <div className="lg:hidden text-center mb-8">
            <img src="/logo.png" alt="Spandan" className="h-16 w-16 mx-auto mb-4 rounded-full object-cover" />
            <h1 className="text-3xl font-serif font-bold text-foreground tracking-wide">
              Spandan
            </h1>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="h-px w-6 bg-border" />
              <p className="text-xs text-muted-foreground uppercase tracking-[0.25em]">
                Fine Dining
              </p>
              <span className="h-px w-6 bg-border" />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-serif font-bold text-foreground">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Sign in to access the staff dashboard
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3 mb-6 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-destructive shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="relative">
              <Mail className="absolute left-3 top-9.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                label="Email"
                type="email"
                placeholder="staff@spandan.com"
                className="pl-10"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-9.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                className="pl-10"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2 h-11 text-sm font-semibold gap-2">
              Sign in
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              Spandan Restaurant Management System &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
