import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Reservation } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';

interface ReservationListProps {
  reservations: Reservation[] | undefined;
  isLoading: boolean;
  onEdit: (reservation: Reservation) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return 'success' as const;
    case 'PENDING': return 'warning' as const;
    case 'CANCELLED': return 'destructive' as const;
    case 'COMPLETED': return 'default' as const;
    default: return 'outline' as const;
  }
};

export const ReservationList = ({ reservations, isLoading, onEdit, onDelete, onAdd }: ReservationListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (!reservations || reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations"
        description="Create your first reservation to get started."
        actionLabel="New Reservation"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Customer</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Phone</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Date</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Time</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Party</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {reservations.map((r) => (
            <tr key={r.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 text-card-foreground font-medium">{r.customerName}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.phone}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.date}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.time}</td>
              <td className="px-4 py-3 text-muted-foreground">{r.partySize}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 justify-end">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(r)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(r.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
