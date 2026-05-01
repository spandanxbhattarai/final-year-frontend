import { useQuery } from '@tanstack/react-query';
import {
  fetchDashboardStats,
  fetchRevenueData,
  fetchTopItems,
  fetchTodayReservations,
  fetchRecentActivity,
} from '@/services/dashboard.service';

export const useDashboardStats = () =>
  useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: fetchDashboardStats,
    refetchInterval: 30_000,
  });

export const useRevenueData = () =>
  useQuery({
    queryKey: ['dashboard', 'revenue'],
    queryFn: fetchRevenueData,
    refetchInterval: 60_000,
  });

export const useTopItems = () =>
  useQuery({
    queryKey: ['dashboard', 'top-items'],
    queryFn: fetchTopItems,
    refetchInterval: 60_000,
  });

export const useTodayReservations = () =>
  useQuery({
    queryKey: ['dashboard', 'reservations'],
    queryFn: fetchTodayReservations,
    refetchInterval: 30_000,
  });

export const useRecentActivity = () =>
  useQuery({
    queryKey: ['dashboard', 'activity'],
    queryFn: fetchRecentActivity,
    refetchInterval: 15_000,
  });
