import { useOrders, useUpdateOrderStatus } from '@/hooks/useOrders';
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { Clock, ChefHat, Timer } from 'lucide-react';
import type { Order } from '@/types';

const getElapsedTime = (createdAt: string): string => {
  const diff = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
};

const nextStatus: Record<string, string> = {
  PENDING: 'PREPARING',
  PREPARING: 'READY',
  READY: 'SERVED',
};

const KitchenOrderCard = ({ order }: { order: Order }) => {
  const updateStatus = useUpdateOrderStatus();
  const next = nextStatus[order.status];

  return (
    <div className="rounded-xl bg-card border border-border p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg font-bold text-card-foreground">
          #{order.id} — {order.tableNumber ? `Table ${order.tableNumber}` : 'Phone Order'}
        </span>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="space-y-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span className="text-card-foreground font-medium">
              {item.quantity}× {item.menuItemName}
            </span>
            {item.notes && <span className="text-xs text-muted-foreground italic">{item.notes}</span>}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {getElapsedTime(order.createdAt)}
          </div>
          {order.prepareBy && (
            <div className="flex items-center gap-1 text-orange-500 font-medium">
              <Timer className="h-3 w-3" />
              By {order.prepareBy}
            </div>
          )}
        </div>
        {next && (
          <Button
            size="sm"
            loading={updateStatus.isPending}
            onClick={() => updateStatus.mutate({ id: order.id, status: next })}
          >
            Mark {next}
          </Button>
        )}
      </div>
    </div>
  );
};

export const KitchenPage = () => {
  const { data: orders, isLoading } = useOrders();

  const activeOrders = orders?.filter((o) =>
    ['PENDING', 'PREPARING', 'READY'].includes(o.status)
  ) || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ChefHat className="h-6 w-6 text-primary" />
        <p className="text-sm text-muted-foreground">
          {activeOrders.length} active orders
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeOrders.map((order) => (
          <KitchenOrderCard key={order.id} order={order} />
        ))}
      </div>

      {activeOrders.length === 0 && (
        <div className="text-center py-16">
          <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg font-medium text-foreground">All caught up!</p>
          <p className="text-sm text-muted-foreground">No active orders right now.</p>
        </div>
      )}
    </div>
  );
};
