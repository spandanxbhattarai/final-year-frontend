import { Edit, Trash2, ShieldOff, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';

interface UserTableProps {
  users: User[];
  currentUserId?: number;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onBlock: (user: User) => void;
  onUnblock: (user: User) => void;
}

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  STAFF: 'Staff',
  COOK: 'Cook',
};

const roleBadge = (role: string) => {
  switch (role) {
    case 'SUPER_ADMIN': return 'default' as const;
    case 'ADMIN': return 'success' as const;
    case 'STAFF': return 'warning' as const;
    case 'COOK': return 'outline' as const;
    default: return 'default' as const;
  }
};

export const UserTable = ({ users, currentUserId, onEdit, onDelete, onBlock, onUnblock }: UserTableProps) => {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Joined</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            return (
              <tr key={user.id} className="bg-card hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-medium text-card-foreground">
                  {user.name}
                  {isSelf && <span className="ml-2 text-xs text-muted-foreground">(you)</span>}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant={roleBadge(user.role)}>{roleLabel[user.role] || user.role}</Badge>
                </td>
                <td className="px-4 py-3">
                  {user.isDeleted ? (
                    <Badge variant="outline">Deleted</Badge>
                  ) : user.isBlocked ? (
                    <Badge variant="destructive">Blocked</Badge>
                  ) : (
                    <Badge variant="success">Active</Badge>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(user)}
                      title="Edit user"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {!isSelf && (
                      <>
                        {user.isBlocked ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onUnblock(user)}
                            title="Unblock user"
                            disabled={user.isDeleted}
                          >
                            <ShieldCheck className="h-4 w-4 text-green-500" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onBlock(user)}
                            title="Block user"
                            disabled={user.isDeleted}
                          >
                            <ShieldOff className="h-4 w-4 text-amber-500" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDelete(user)}
                          title="Delete user"
                          disabled={user.isDeleted}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
