import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/schemas/auth.schema';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ChefHat } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-4 mb-4">
            <ChefHat className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-foreground">La Maison</h1>
          <p className="text-sm text-muted-foreground mt-2">Staff Dashboard</p>
        </div>

        <div className="rounded-xl bg-card border border-border p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-card-foreground mb-6">Sign in</h2>

          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 mb-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="staff@lamaison.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password?.message}
            />
            <Button type="submit" loading={loading} className="w-full mt-2">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
