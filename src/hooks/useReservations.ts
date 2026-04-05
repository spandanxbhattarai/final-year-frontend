import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from '@/services/reservations.service';
import type { CreateReservationInput } from '@/schemas/reservation.schema';
import toast from 'react-hot-toast';

export const useReservations = (filters?: Record<string, string>) => {
  return useQuery({
    queryKey: ['reservations', filters],
    queryFn: () => fetchReservations(filters),
  });
};

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateReservationInput) => createReservation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation created');
    },
    onError: () => toast.error('Failed to create reservation'),
  });
};

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateReservationInput & { status: string }> }) =>
      updateReservation(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation updated');
    },
    onError: () => toast.error('Failed to update reservation'),
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation cancelled');
    },
    onError: () => toast.error('Failed to cancel reservation'),
  });
};
