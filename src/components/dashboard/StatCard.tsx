import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
}

export const StatCard = ({ title, value, icon, trend, trendUp }: StatCardProps) => {
  return (
    <div className="rounded-xl bg-card border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-card-foreground mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              {trendUp !== undefined && (
                trendUp
                  ? <TrendingUp className="h-3 w-3 text-green-500" />
                  : <TrendingDown className="h-3 w-3 text-destructive" />
              )}
              <p className={`text-xs ${trendUp === true ? 'text-green-500' : trendUp === false ? 'text-destructive' : 'text-primary'}`}>
                {trend}
              </p>
            </div>
          )}
        </div>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};
