export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF';
}

export type TableStatus = 'AVAILABLE' | 'OCCUPIED' | 'RESERVED' | 'MAINTENANCE';

export interface Table {
  id: number;
  number: number;
  capacity: number;
  status: TableStatus;
  floor: string;
}

export type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface Reservation {
  id: number;
  customerName: string;
  phone: string;
  email: string | null;
  date: string;
  time: string;
  partySize: number;
  status: ReservationStatus;
  tableId: number | null;
  createdAt: string;
}

export interface MenuCategory {
  id: number;
  name: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string | null;
  available: boolean;
  createdAt: string;
}

export type OrderStatus = 'PENDING' | 'PREPARING' | 'READY' | 'SERVED' | 'CANCELLED';

export interface OrderItem {
  id: number;
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  price: number;
  notes: string | null;
}

export interface Order {
  id: number;
  tableId: number | null;
  tableNumber: number | null;
  customerName: string;
  status: OrderStatus;
  type: 'DINE_IN' | 'PHONE';
  date: string;
  prepareBy: string | null;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

export type CallStatus = 'COMPLETED' | 'MISSED' | 'VOICEMAIL';

export interface CallLog {
  id: number;
  callerName: string;
  callerPhone: string;
  duration: number;
  status: CallStatus;
  transcript: string | null;
  createdAt: string;
}

export interface DashboardStats {
  todayBookings: number;
  todayOrders: number;
  todayRevenue: number;
  todayCalls: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
}

export interface TopItem {
  name: string;
  orders: number;
}
