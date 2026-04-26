import { api } from './api';
import { z } from 'zod';
import {
  type CreateOrderInput,
  orderResponseSchema,
} from '@/schemas/order.schema';

export const fetchOrders = async (filters?: { status?: string; date?: string }): Promise<z.infer<typeof orderResponseSchema>[]> => {
  const params: Record<string, string> = {};
  if (filters?.status) params.status = filters.status;
  if (filters?.date) params.date = filters.date;
  const res = await api.get('/orders', { params });
  return z.array(orderResponseSchema).parse(res.data);
};

export const createOrder = async (data: CreateOrderInput): Promise<z.infer<typeof orderResponseSchema>> => {
  const res = await api.post('/orders', data);
  return orderResponseSchema.parse(res.data);
};

export const updateOrderStatus = async (
  id: number,
  status: string
): Promise<z.infer<typeof orderResponseSchema>> => {
  const res = await api.patch(`/orders/${id}/status`, { status });
  return orderResponseSchema.parse(res.data);
};

export const cancelOrder = async (id: number): Promise<void> => {
  await api.patch(`/orders/${id}/cancel`);
};
