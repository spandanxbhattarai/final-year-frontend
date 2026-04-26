import { useState, useEffect } from 'react';
import { useOrders, useUpdateOrderStatus, useCancelOrder } from '@/hooks/useOrders';
import { OrderStatusBadge } from '@/components/orders/OrderStatusBadge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Timer,
  UtensilsCrossed,
  Phone,
  ShoppingBag,
  AlertCircle,
} from 'lucide-react';
import type { Order } from '@/types';

// ─── helpers ───────────────────────────────────────────

const formatDateLabel = (dateStr: string): string => {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  if (dateStr === today) return 'Today';
  if (dateStr === yesterday) return 'Yesterday';
  if (dateStr === tomorrow) return 'Tomorrow';
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

const getElapsedTime = (createdAt: string): string => {
  const diff = Date.now() - new Date(createdAt).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m ago`;
};

const getTimeLeft = (order: Order): { text: string; overdue: boolean } | null => {
  if (!order.prepareBy || ['SERVED', 'CANCELLED'].includes(order.status)) return null;
  try {
    const dateStr = order.date || new Date().toISOString().slice(0, 10);
    const target = new Date(`${dateStr} ${order.prepareBy}`);
    if (isNaN(target.getTime())) return null;
    const diff = target.getTime() - Date.now();
    const absMins = Math.abs(Math.floor(diff / 60000));
    if (absMins < 60) {
      return { text: `${absMins}m`, overdue: diff < 0 };
    }
    const h = Math.floor(absMins / 60);
    const m = absMins % 60;
    return { text: `${h}h ${m}m`, overdue: diff < 0 };
  } catch {
    return null;
  }
};

const nextStatus: Record<string, string> = {
  PENDING: 'PREPARING',
  PREPARING: 'READY',
  READY: 'SERVED',
};

// ─── OrderCard (inline) ────────────────────────────────

const OrderRow = ({
  order,
  onSelect,
}: {
  order: Order;
  onSelect: (o: Order) => void;
}) => {
  const updateStatus = useUpdateOrderStatus();
  const cancelOrder = useCancelOrder();
  const next = nextStatus[order.status];
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(order));

  useEffect(() => {
    if (!order.prepareBy) return;
    const id = setInterval(() => setTimeLeft(getTimeLeft(order)), 30000);
    return () => clearInterval(id);
  }, [order]);

  return (
    <div
      onClick={() => onSelect(order)}
      className="rounded-xl bg-card border border-border p-4 hover:shadow-md transition-all cursor-pointer group"
    >
      {/* top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-card-foreground">#{order.id}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            {order.tableNumber ? (
              <><UtensilsCrossed className="h-3 w-3" /> Table {order.tableNumber}</>
            ) : (
              <><Phone className="h-3 w-3" /> Phone</>
            )}
          </span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* customer */}
      <p className="text-sm text-card-foreground mb-2">{order.customerName}</p>

      {/* items */}
      <div className="space-y-1 mb-3">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {item.quantity}× {item.menuItemName}
            </span>
            <span className="text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      {/* footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="font-semibold text-primary">${order.total.toFixed(2)}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {getElapsedTime(order.createdAt)}
          </span>
          {timeLeft && (
            <span
              className={`flex items-center gap-1 font-semibold ${
                timeLeft.overdue ? 'text-red-500' : 'text-orange-500'
              }`}
            >
              {timeLeft.overdue ? <AlertCircle className="h-3 w-3" /> : <Timer className="h-3 w-3" />}
              {timeLeft.overdue ? `${timeLeft.text} overdue` : `${timeLeft.text} left`}
            </span>
          )}
        </div>

        {/* action buttons */}
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          {order.status !== 'SERVED' && order.status !== 'CANCELLED' && (
            <Button
              variant="ghost"
              size="sm"
              loading={cancelOrder.isPending}
              onClick={() => cancelOrder.mutate(order.id)}
            >
              Cancel
            </Button>
          )}
          {next && (
            <Button
              size="sm"
              loading={updateStatus.isPending}
              onClick={() => updateStatus.mutate({ id: order.id, status: next })}
            >
              {next}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────

const statusTabs = [
  { value: '', label: 'All', color: '' },
  { value: 'PENDING', label: 'Pending', color: 'text-amber-600' },
  { value: 'PREPARING', label: 'Preparing', color: 'text-blue-500' },
  { value: 'READY', label: 'Ready', color: 'text-green-600' },
  { value: 'SERVED', label: 'Served', color: 'text-zinc-500' },
  { value: 'CANCELLED', label: 'Cancelled', color: 'text-red-500' },
];

export const OrdersPage = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filters: { date: string; status?: string } = { date };
  if (statusFilter) filters.status = statusFilter;

  const { data: orders, isLoading } = useOrders(filters);

  const shiftDate = (days: number) => {
    const d = new Date(date + 'T00:00:00');
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().slice(0, 10));
  };

  // count per status (always from all orders for this date, not filtered)
  const allOrders = useOrders({ date });
  const countByStatus = (s: string) =>
    allOrders.data?.filter((o) => o.status === s).length ?? 0;

  return (
    <div className="space-y-5">
      {/* ── Date navigation ── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => shiftDate(-1)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-transparent text-sm text-card-foreground outline-none"
            />
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">
              {formatDateLabel(date)}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => shiftDate(1)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          {date !== today && (
            <Button variant="secondary" size="sm" onClick={() => setDate(today)}>
              Today
            </Button>
          )}
        </div>
      </div>

      {/* ── Status tabs ── */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted/40 p-1">
        {statusTabs.map((tab) => {
          const count = tab.value ? countByStatus(tab.value) : (allOrders.data?.length ?? 0);
          return (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                statusFilter === tab.value
                  ? 'bg-card text-card-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
              <span className="rounded-full bg-muted px-1.5 text-[10px]">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Order list ── */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      ) : !orders || orders.length === 0 ? (
        <EmptyState
          title="No orders found"
          description={statusFilter ? `No ${statusFilter.toLowerCase()} orders for ${formatDateLabel(date)}.` : `No orders for ${formatDateLabel(date)}.`}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} onSelect={setSelectedOrder} />
          ))}
        </div>
      )}

      {/* ── Detail modal ── */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

// ─── Detail modal ──────────────────────────────────────

import { Modal } from '@/components/ui/Modal';

const OrderDetailModal = ({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) => {
  const updateStatus = useUpdateOrderStatus();
  const cancelOrder = useCancelOrder();
  const next = nextStatus[order.status];
  const timeLeft = getTimeLeft(order);

  return (
    <Modal isOpen onClose={onClose} title={`Order #${order.id}`}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status</span>
          <OrderStatusBadge status={order.status} />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Table</span>
          <span className="text-sm text-card-foreground">
            {order.tableNumber ? `#${order.tableNumber}` : 'Phone Order'}
          </span>
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

        {timeLeft && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Time Left</span>
            <span
              className={`text-sm font-semibold ${timeLeft.overdue ? 'text-red-500' : 'text-green-600'}`}
            >
              {timeLeft.overdue ? `${timeLeft.text} overdue` : `${timeLeft.text} remaining`}
            </span>
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
                <span className="text-card-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
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
