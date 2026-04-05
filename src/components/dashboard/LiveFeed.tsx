import { useEffect, useState } from 'react';
import { getSocket } from '@/lib/socket';
import { useAuth } from '@/hooks/useAuth';
import { Zap } from 'lucide-react';

interface FeedItem {
  id: string;
  message: string;
  time: string;
}

export const LiveFeed = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (!token) return;
    const socket = getSocket(token);

    const addItem = (message: string) => {
      setItems((prev) => [
        { id: crypto.randomUUID(), message, time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 19),
      ]);
    };

    socket.on('new-order', (data: { customerName: string }) => {
      addItem(`New order from ${data.customerName}`);
    });

    socket.on('new-reservation', (data: { customerName: string }) => {
      addItem(`New reservation — ${data.customerName}`);
    });

    socket.on('order-status-changed', (data: { orderId: number; status: string }) => {
      addItem(`Order #${data.orderId} → ${data.status}`);
    });

    return () => {
      socket.off('new-order');
      socket.off('new-reservation');
      socket.off('order-status-changed');
    };
  }, [token]);

  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-sm font-semibold text-card-foreground">Live Feed</h3>
      </div>
      <div className="space-y-3 max-h-72 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Waiting for real-time updates...
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 text-sm">
              <span className="text-xs text-muted-foreground whitespace-nowrap mt-0.5">
                {item.time}
              </span>
              <span className="text-card-foreground">{item.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
