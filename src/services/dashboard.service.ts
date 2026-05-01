import { api } from './api';
import type { DashboardStats, RevenueData, TopItem, Reservation, ActivityItem } from '@/types';

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const res = await api.get('/dashboard/stats');
  return res.data;
};

export const fetchRevenueData = async (): Promise<RevenueData[]> => {
  const res = await api.get('/dashboard/revenue');
  return res.data;
};

export const fetchTopItems = async (): Promise<TopItem[]> => {
  const res = await api.get('/dashboard/top-items');
  return res.data;
};

export const fetchTodayReservations = async (): Promise<Reservation[]> => {
  const res = await api.get('/dashboard/reservations');
  return res.data;
};

export const fetchRecentActivity = async (): Promise<ActivityItem[]> => {
  const res = await api.get('/dashboard/activity');
  return res.data;
};
