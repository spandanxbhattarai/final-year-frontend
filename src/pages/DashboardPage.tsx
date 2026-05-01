import { StatCard } from '@/components/dashboard/StatCard';
import { LiveFeed } from '@/components/dashboard/LiveFeed';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { TopItemsChart } from '@/components/dashboard/TopItemsChart';
import { ReservationTimeline } from '@/components/dashboard/ReservationTimeline';
import { Skeleton } from '@/components/ui/Skeleton';
import { CalendarDays, ShoppingBag, DollarSign, Phone } from 'lucide-react';
import {
  useDashboardStats,
  useRevenueData,
  useTopItems,
  useTodayReservations,
} from '@/hooks/useDashboard';

export const DashboardPage = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: revenueData = [], isLoading: revenueLoading } = useRevenueData();
  const { data: topItems = [], isLoading: topItemsLoading } = useTopItems();
  const { data: todayReservations = [], isLoading: reservationsLoading } = useTodayReservations();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-card border border-border p-6 shadow-sm">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))
        ) : (
          <>
            <StatCard
              title="Today's Bookings"
              value={stats?.todayBookings ?? 0}
              icon={<CalendarDays className="h-6 w-6" />}
              trend={stats?.trends.bookings?.label}
              trendUp={stats?.trends.bookings?.diff !== undefined ? stats.trends.bookings.diff >= 0 : undefined}
            />
            <StatCard
              title="Today's Orders"
              value={stats?.todayOrders ?? 0}
              icon={<ShoppingBag className="h-6 w-6" />}
              trend={stats?.trends.orders?.label}
              trendUp={stats?.trends.orders?.diff !== undefined ? stats.trends.orders.diff >= 0 : undefined}
            />
            <StatCard
              title="Today's Revenue"
              value={`$${(stats?.todayRevenue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              icon={<DollarSign className="h-6 w-6" />}
              trend={stats?.trends.revenue?.label}
              trendUp={stats?.trends.revenue?.diff !== undefined ? stats.trends.revenue.diff >= 0 : undefined}
            />
            <StatCard
              title="Today's Calls"
              value={stats?.todayCalls ?? 0}
              icon={<Phone className="h-6 w-6" />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} loading={revenueLoading} />
        <TopItemsChart data={topItems} loading={topItemsLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReservationTimeline reservations={todayReservations} loading={reservationsLoading} />
        <LiveFeed />
      </div>
    </div>
  );
};
