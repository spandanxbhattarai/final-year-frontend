import { Badge } from '@/components/ui/Badge';

interface OrderStatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { variant: 'default' | 'success' | 'warning' | 'destructive' | 'outline'; label: string }> = {
  PENDING: { variant: 'warning', label: 'Pending' },
  PREPARING: { variant: 'default', label: 'Preparing' },
  READY: { variant: 'success', label: 'Ready' },
  SERVED: { variant: 'outline', label: 'Served' },
  CANCELLED: { variant: 'destructive', label: 'Cancelled' },
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = statusConfig[status] || { variant: 'outline' as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
