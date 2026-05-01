import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Skeleton } from '@/components/ui/Skeleton';
import type { TopItem } from '@/types';

interface TopItemsChartProps {
  data: TopItem[];
  loading?: boolean;
}

export const TopItemsChart = ({ data, loading }: TopItemsChartProps) => {
  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Top 5 Ordered Items</h3>
      {loading ? (
        <Skeleton className="h-[260px] w-full" />
      ) : data.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center text-sm text-muted-foreground">
          No order data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis type="number" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--card-foreground)',
              }}
            />
            <Bar dataKey="orders" fill="var(--chart-2)" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
