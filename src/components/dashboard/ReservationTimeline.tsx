import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { Reservation } from '@/types';

interface ReservationTimelineProps {
  reservations: Reservation[];
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'CONFIRMED': return 'success' as const;
    case 'PENDING': return 'warning' as const;
    case 'CANCELLED': return 'destructive' as const;
    default: return 'default' as const;
  }
};

export const ReservationTimeline = ({ reservations }: ReservationTimelineProps) => {
  const sorted = [...reservations].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-card-foreground">Today's Reservations</h3>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto">
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No reservations today</p>
        ) : (
          sorted.map((r) => (
            <div key={r.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-primary">{r.time}</span>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{r.customerName}</p>
                  <p className="text-xs text-muted-foreground">Party of {r.partySize}</p>
                </div>
              </div>
              <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
