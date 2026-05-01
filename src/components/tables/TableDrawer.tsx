import { Drawer } from '@/components/ui/Drawer';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';
import type { Table } from '@/types';

interface TableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  table: Table | null;
  onEdit?: (table: Table) => void;
  onDelete?: (id: number) => void;
}

function getEffectiveStatus(table: Table): string {
  if (table.status === 'MAINTENANCE' || table.status === 'OCCUPIED') return table.status;
  const today = new Date().toISOString().slice(0, 10);
  const hasReservationToday = table.reservations?.some(
    (r) => r.date === today && r.status !== 'CANCELLED'
  );
  return hasReservationToday ? 'RESERVED' : table.status;
}

export const TableDrawer = ({ isOpen, onClose, table, onEdit, onDelete }: TableDrawerProps) => {
  if (!table) return null;

  const effectiveStatus = getEffectiveStatus(table);
  const today = new Date().toISOString().slice(0, 10);
  const todayReservation = table.reservations?.find(
    (r) => r.date === today && r.status !== 'CANCELLED'
  );

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title={`Table #${table.number}`}>
      <div className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            <Badge variant={effectiveStatus === 'AVAILABLE' ? 'success' : effectiveStatus === 'OCCUPIED' ? 'destructive' : 'warning'}>
              {effectiveStatus}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <span className="text-sm text-card-foreground">{table.capacity} seats</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Floor</span>
            <span className="text-sm text-card-foreground">{table.floor}</span>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-2">Active Reservation</h4>
          {todayReservation ? (
            <div className="text-sm space-y-1">
              <p className="text-card-foreground">{todayReservation.customerName} — party of {todayReservation.partySize}</p>
              <p className="text-muted-foreground">{todayReservation.time} • {todayReservation.phone}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No active reservation for today.</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-2">Current Order</h4>
          <p className="text-sm text-muted-foreground">No active order for this table.</p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          {onEdit && (
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => { onEdit(table); onClose(); }}
            >
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              className="flex-1"
              onClick={() => { onDelete(table.id); onClose(); }}
            >
              <Trash2 className="h-4 w-4 mr-1" /> Delete
            </Button>
          )}
        </div>
      </div>
    </Drawer>
  );
};
