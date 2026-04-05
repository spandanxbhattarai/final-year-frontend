import { z } from 'zod';

export const createTableSchema = z.object({
  number: z.coerce.number().int().min(1, 'Table number required'),
  capacity: z.coerce.number().int().min(1, 'Min 1').max(20, 'Max 20'),
  floor: z.string().min(1, 'Floor required'),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']).default('AVAILABLE'),
});

export const updateTableSchema = createTableSchema.partial();

export const tableResponseSchema = z.object({
  id: z.number(),
  number: z.number(),
  capacity: z.number(),
  status: z.enum(['AVAILABLE', 'OCCUPIED', 'RESERVED', 'MAINTENANCE']),
  floor: z.string(),
});

export type CreateTableInput = z.infer<typeof createTableSchema>;
export type TableResponse = z.infer<typeof tableResponseSchema>;
