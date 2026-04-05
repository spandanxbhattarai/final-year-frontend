import { OrderCard } from './OrderCard';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Order } from '@/types';

interface OrderKanbanProps {
  orders: Order[] | undefined;
  isLoading: boolean;
  onOrderClick: (order: Order) => void;
}

const columns = [
  { status: 'PENDING', title: 'Pending', color: 'border-t-amber-500' },
  { status: 'PREPARING', title: 'Preparing', color: 'border-t-primary' },
  { status: 'READY', title: 'Ready', color: 'border-t-green-500' },
  { status: 'SERVED', title: 'Served', color: 'border-t-zinc-400' },
];

export const OrderKanban = ({ orders, isLoading, onOrderClick }: OrderKanbanProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col.status} className="space-y-3">
            <Skeleton className="h-8" />
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((col) => {
        const colOrders = orders?.filter((o) => o.status === col.status) || [];
        return (
          <div key={col.status} className={`rounded-xl bg-muted/30 border border-border border-t-4 ${col.color} p-3`}>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-sm font-semibold text-foreground">{col.title}</h3>
              <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">
                {colOrders.length}
              </span>
            </div>
            <div className="space-y-3">
              {colOrders.map((order) => (
                <OrderCard key={order.id} order={order} onClick={onOrderClick} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
