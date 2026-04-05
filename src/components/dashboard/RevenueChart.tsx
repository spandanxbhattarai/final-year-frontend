import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { RevenueData } from '@/types';

interface RevenueChartProps {
  data: RevenueData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Revenue — Last 7 Days</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
          <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              color: 'var(--card-foreground)',
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--chart-1)"
            fill="url(#revenueGrad)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
