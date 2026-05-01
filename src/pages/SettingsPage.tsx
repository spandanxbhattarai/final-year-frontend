import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { deleteAccount } from '@/services/auth.service';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { User, Shield } from 'lucide-react';

export const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await deleteAccount();
      logout();
    } catch {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

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
        <h2 className="text-lg font-serif font-semibold text-card-foreground mb-4">Danger Zone</h2>
        <Button variant="destructive" onClick={() => setShowConfirm(true)}>
          Delete Account
        </Button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action cannot be undone."
        loading={deleting}
      />
    </div>
  );
};
