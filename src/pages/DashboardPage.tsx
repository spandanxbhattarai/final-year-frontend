import { StatCard } from '@/components/dashboard/StatCard';
import { LiveFeed } from '@/components/dashboard/LiveFeed';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { TopItemsChart } from '@/components/dashboard/TopItemsChart';
import { ReservationTimeline } from '@/components/dashboard/ReservationTimeline';
import { CalendarDays, ShoppingBag, DollarSign, Phone } from 'lucide-react';
import type { RevenueData, TopItem, Reservation } from '@/types';

// Placeholder data — will be replaced with API calls
const stats = {
  todayBookings: 12,
  todayOrders: 34,
  todayRevenue: 2450,
  todayCalls: 8,
};

const revenueData: RevenueData[] = [
  { date: 'Mon', revenue: 1200 },
  { date: 'Tue', revenue: 1800 },
  { date: 'Wed', revenue: 1400 },
  { date: 'Thu', revenue: 2200 },
  { date: 'Fri', revenue: 2800 },
  { date: 'Sat', revenue: 3100 },
  { date: 'Sun', revenue: 2450 },
];

const topItems: TopItem[] = [
  { name: 'Wagyu Steak', orders: 28 },
  { name: 'Truffle Pasta', orders: 22 },
  { name: 'Caesar Salad', orders: 18 },
  { name: 'Lobster Bisque', orders: 15 },
  { name: 'Tiramisu', orders: 12 },
];

const todayReservations: Reservation[] = [
  { id: 1, customerName: 'John Smith', phone: '+1234567890', email: null, date: '2026-03-15', time: '12:00', partySize: 4, status: 'CONFIRMED', tableId: 1, createdAt: '2026-03-14' },
  { id: 2, customerName: 'Emily Davis', phone: '+1234567891', email: null, date: '2026-03-15', time: '13:30', partySize: 2, status: 'PENDING', tableId: null, createdAt: '2026-03-14' },
  { id: 3, customerName: 'Michael Brown', phone: '+1234567892', email: null, date: '2026-03-15', time: '18:00', partySize: 6, status: 'CONFIRMED', tableId: 3, createdAt: '2026-03-14' },
  { id: 4, customerName: 'Sarah Wilson', phone: '+1234567893', email: null, date: '2026-03-15', time: '19:30', partySize: 3, status: 'CONFIRMED', tableId: 5, createdAt: '2026-03-14' },
  { id: 5, customerName: 'David Lee', phone: '+1234567894', email: null, date: '2026-03-15', time: '20:00', partySize: 2, status: 'PENDING', tableId: null, createdAt: '2026-03-15' },
];

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Bookings"
          value={stats.todayBookings}
          icon={<CalendarDays className="h-6 w-6" />}
          trend="+3 from yesterday"
        />
        <StatCard
          title="Today's Orders"
          value={stats.todayOrders}
          icon={<ShoppingBag className="h-6 w-6" />}
          trend="+8 from yesterday"
        />
        <StatCard
          title="Today's Revenue"
          value={`$${stats.todayRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          trend="+12% from last week"
        />
        <StatCard
          title="Today's Calls"
          value={stats.todayCalls}
          icon={<Phone className="h-6 w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <TopItemsChart data={topItems} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReservationTimeline reservations={todayReservations} />
        <LiveFeed />
      </div>
    </div>
  );
};
