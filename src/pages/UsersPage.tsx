import { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { UserTable } from '@/components/users/UserTable';
import { UserFormModal } from '@/components/users/UserFormModal';
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, useBlockUser, useUnblockUser } from '@/hooks/useUsers';
import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types';
import type { CreateUserInput } from '@/schemas/user.schema';

export const UsersPage = () => {
  const { user: currentUser } = useAuth();
  const { data: users = [], isLoading } = useUsers();

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();
  const blockUser = useBlockUser();
  const unblockUser = useUnblockUser();

  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    setEditingUser(null);
    setFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormOpen(true);
  };

  const handleFormSubmit = (data: CreateUserInput) => {
    if (editingUser) {
      updateUser.mutate({ id: editingUser.id, data }, { onSuccess: () => setFormOpen(false) });
    } else {
      createUser.mutate(data, { onSuccess: () => setFormOpen(false) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-serif text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Manage staff accounts and permissions</p>
        </div>
        <Button onClick={handleCreate}>
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">No users found</div>
      ) : (
        <UserTable
          users={filtered}
          currentUserId={currentUser?.id}
          onEdit={handleEdit}
          onDelete={setDeletingUser}
          onBlock={(u) => blockUser.mutate(u.id)}
          onUnblock={(u) => unblockUser.mutate(u.id)}
        />
      )}

      <UserFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        loading={createUser.isPending || updateUser.isPending}
        user={editingUser}
      />

      <ConfirmDialog
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={() => {
          if (deletingUser) {
            deleteUser.mutate(deletingUser.id, { onSuccess: () => setDeletingUser(null) });
          }
        }}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        loading={deleteUser.isPending}
      />
    </div>
  );
};
