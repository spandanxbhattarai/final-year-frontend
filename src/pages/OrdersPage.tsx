import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { OrderKanban } from '@/components/orders/OrderKanban';
import { OrderModal } from '@/components/orders/OrderModal';
import type { Order } from '@/types';

export const OrdersPage = () => {
  const { data: orders, isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Track and manage order statuses across your kitchen workflow.
      </p>

      <OrderKanban
        orders={orders}
        isLoading={isLoading}
        onOrderClick={(order) => setSelectedOrder(order)}
      />

      <OrderModal
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
};
