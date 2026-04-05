import { api } from './api';
import { z } from 'zod';
import {
  type CreateOrderInput,
  orderResponseSchema,
} from '@/schemas/order.schema';

export const fetchOrders = async (status?: string): Promise<z.infer<typeof orderResponseSchema>[]> => {
  const res = await api.get('/orders', { params: status ? { status } : {} });
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
