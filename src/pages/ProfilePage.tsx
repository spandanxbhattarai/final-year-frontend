import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useProfile, useUpdateProfile } from '@/hooks/useUsers';
import { updateProfileSchema, type UpdateProfileInput } from '@/schemas/user.schema';

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  STAFF: 'Staff',
  COOK: 'Cook',
};

export const ProfilePage = () => {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({ name: profile.name, email: profile.email, password: '' });
    }
  }, [profile, reset]);

  const onSubmit = (data: UpdateProfileInput) => {
    const payload = { ...data };
    if (!payload.password) delete payload.password;
    updateProfile.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-serif text-foreground">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account details</p>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-primary/10 p-4">
            <User className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-semibold text-card-foreground">{profile?.name}</p>
            <p className="text-sm text-muted-foreground">{profile?.email}</p>
            <div className="mt-1">
              <Badge variant="default">{roleLabel[profile?.role ?? ''] || profile?.role}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
        <h2 className="text-base font-semibold text-card-foreground mb-4">Update Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            {...register('name')}
            placeholder="Your name"
            error={errors.name?.message}
          />
          <Input
            label="Email"
            {...register('email')}
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
          />
          <Input
            label="New Password (leave blank to keep current)"
            {...register('password')}
            type="password"
            placeholder="Leave blank to keep current"
            error={errors.password?.message}
          />
          <div className="flex justify-end">
            <Button type="submit" loading={updateProfile.isPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
