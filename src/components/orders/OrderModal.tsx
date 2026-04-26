import { Modal } from '@/components/ui/Modal';
import { OrderStatusBadge } from './OrderStatusBadge';
import { Button } from '@/components/ui/Button';
import { useUpdateOrderStatus, useCancelOrder } from '@/hooks/useOrders';
import type { Order } from '@/types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const nextStatus: Record<string, string> = {
  PENDING: 'PREPARING',
  PREPARING: 'READY',
  READY: 'SERVED',
};

export const OrderModal = ({ isOpen, onClose, order }: OrderModalProps) => {
  const updateStatus = useUpdateOrderStatus();
  const cancelOrder = useCancelOrder();

  if (!order) return null;

  const next = nextStatus[order.status];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Order #${order.id}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Table</span>
          <span className="text-sm text-card-foreground">{order.tableNumber ? `#${order.tableNumber}` : 'Phone Order'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Customer</span>
          <span className="text-sm text-card-foreground">{order.customerName}</span>
        </div>

        {order.prepareBy && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Prepare By</span>
            <span className="text-sm font-medium text-orange-500">{order.prepareBy}</span>
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-2">Items</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity}× {item.menuItemName}
                </span>
                <span className="text-card-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold text-card-foreground">Total</span>
          <span className="text-lg font-bold text-primary">${order.total.toFixed(2)}</span>
        </div>

        <div className="flex gap-3 justify-end pt-2">
          {order.status !== 'SERVED' && order.status !== 'CANCELLED' && (
            <Button
              variant="destructive"
              size="sm"
              loading={cancelOrder.isPending}
              onClick={() => cancelOrder.mutate(order.id, { onSuccess: onClose })}
            >
              Cancel Order
            </Button>
          )}
          {next && (
            <Button
              size="sm"
              loading={updateStatus.isPending}
              onClick={() =>
                updateStatus.mutate(
                  { id: order.id, status: next },
                  { onSuccess: onClose }
                )
              }
            >
              Mark as {next}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
