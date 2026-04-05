import { OrderStatusBadge } from './OrderStatusBadge';
import { Clock, GripVertical } from 'lucide-react';
import type { Order } from '@/types';

interface OrderCardProps {
  order: Order;
  onClick: (order: Order) => void;
}

const getElapsedTime = (createdAt: string): string => {
  const diff = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
};

export const OrderCard = ({ order, onClick }: OrderCardProps) => {
  return (
    <div
      onClick={() => onClick(order)}
      className="rounded-lg bg-card border border-border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
          <span className="text-sm font-semibold text-card-foreground">
            #{order.id} — Table {order.tableNumber}
          </span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <p className="text-sm text-muted-foreground mb-2">{order.customerName}</p>

      <div className="space-y-1 mb-3">
        {order.items.slice(0, 3).map((item) => (
          <p key={item.id} className="text-xs text-muted-foreground">
            {item.quantity}× {item.menuItemName}
          </p>
        ))}
        {order.items.length > 3 && (
          <p className="text-xs text-muted-foreground">+{order.items.length - 3} more</p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-primary">${order.total.toFixed(2)}</span>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          {getElapsedTime(order.createdAt)}
        </div>
      </div>
    </div>
  );
};
