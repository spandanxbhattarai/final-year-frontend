import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { User, Shield } from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
        <h2 className="text-lg font-serif font-semibold text-card-foreground mb-4">Profile</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-card-foreground">{user?.name || 'Staff Member'}</p>
              <p className="text-sm text-muted-foreground">{user?.email || 'staff@restaurant.com'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Role: <span className="text-card-foreground font-medium">{user?.role || 'STAFF'}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
        <h2 className="text-lg font-serif font-semibold text-card-foreground mb-4">Preferences</h2>
        <p className="text-sm text-muted-foreground">Notification and display preferences will be configurable here.</p>
      </div>

      <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
        <h2 className="text-lg font-serif font-semibold text-card-foreground mb-4">Danger Zone</h2>
        <Button variant="destructive">Delete Account</Button>
      </div>
    </div>
  );
};
