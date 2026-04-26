import { useState } from 'react';
import { useOrders } from '@/hooks/useOrders';
import { OrderKanban } from '@/components/orders/OrderKanban';
import { OrderModal } from '@/components/orders/OrderModal';
import { ShoppingBag, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { Order } from '@/types';

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

export const OrdersPage = () => {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [statusFilter, setStatusFilter] = useState('');

  const filters: { date: string; status?: string } = { date };
  if (statusFilter) filters.status = statusFilter;

  const { data: orders, isLoading } = useOrders(filters);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const shiftDate = (days: number) => {
    const d = new Date(date + 'T00:00:00');
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().slice(0, 10));
  };

  const statusTabs = [
    { value: '', label: 'All Orders' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'PREPARING', label: 'Preparing' },
    { value: 'READY', label: 'Ready' },
    { value: 'SERVED', label: 'Served' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ];

  const orderCount = orders?.length ?? 0;
  const totalRevenue = orders?.reduce((sum, o) => sum + o.total, 0) ?? 0;

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ShoppingBag className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {orderCount} order{orderCount !== 1 ? 's' : ''} &middot; ${totalRevenue.toFixed(2)} revenue
            </p>
          </div>
        </div>

        {/* Date navigation */}
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

      {/* Status filter tabs */}
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted/40 p-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatusFilter(tab.value)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === tab.value
                ? 'bg-card text-card-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Kanban board */}
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
