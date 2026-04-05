import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchOrders,
  createOrder,
  updateOrderStatus,
  cancelOrder,
} from '@/services/orders.service';
import type { CreateOrderInput } from '@/schemas/order.schema';
import toast from 'react-hot-toast';

export const useOrders = (status?: string) => {
  return useQuery({
    queryKey: ['orders', status],
    queryFn: () => fetchOrders(status),
    refetchInterval: 30000,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderInput) => createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created');
    },
    onError: () => toast.error('Failed to create order'),
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated');
    },
    onError: () => toast.error('Failed to update order status'),
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => cancelOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order cancelled');
    },
    onError: () => toast.error('Failed to cancel order'),
  });
};
