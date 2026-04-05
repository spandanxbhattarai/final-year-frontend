import type { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
}

export const StatCard = ({ title, value, icon, trend }: StatCardProps) => {
  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-primary mt-1">{trend}</p>
          )}
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};
