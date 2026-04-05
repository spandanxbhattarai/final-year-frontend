import { api } from './api';
import { z } from 'zod';
import {
  type CreateReservationInput,
  type Reservation,
  reservationResponseSchema,
} from '@/schemas/reservation.schema';

export const fetchReservations = async (filters?: Record<string, string>): Promise<Reservation[]> => {
  const res = await api.get('/reservations', { params: filters });
  return z.array(reservationResponseSchema).parse(res.data);
};

export const createReservation = async (data: CreateReservationInput): Promise<Reservation> => {
  const res = await api.post('/reservations', data);
  return reservationResponseSchema.parse(res.data);
};

export const updateReservation = async (
  id: number,
  data: Partial<CreateReservationInput & { status: string }>
): Promise<Reservation> => {
  const res = await api.patch(`/reservations/${id}`, data);
  return reservationResponseSchema.parse(res.data);
};

export const deleteReservation = async (id: number): Promise<void> => {
  await api.delete(`/reservations/${id}`);
};
