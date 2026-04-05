import { z } from 'zod';

export const createReservationSchema = z.object({
  customerName: z.string().min(2, 'Name required').max(100),
  phone: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  date: z.string().min(1, 'Date required'),
  time: z.string().min(1, 'Time required'),
  partySize: z.coerce.number().int().min(1, 'Min 1').max(20, 'Max 20'),
});

export const updateReservationSchema = createReservationSchema.partial().extend({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']).optional(),
});

export const reservationResponseSchema = z.object({
  id: z.number(),
  customerName: z.string(),
  phone: z.string(),
  email: z.string().nullable(),
  date: z.string(),
  time: z.string(),
  partySize: z.number(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED']),
  tableId: z.number().nullable(),
  createdAt: z.string(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type Reservation = z.infer<typeof reservationResponseSchema>;
