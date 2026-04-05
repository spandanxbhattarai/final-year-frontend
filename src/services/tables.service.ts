import { api } from './api';
import { z } from 'zod';
import {
  type CreateTableInput,
  tableResponseSchema,
} from '@/schemas/table.schema';

export const fetchTables = async (): Promise<z.infer<typeof tableResponseSchema>[]> => {
  const res = await api.get('/tables');
  return z.array(tableResponseSchema).parse(res.data);
};

export const fetchAvailableTables = async (): Promise<z.infer<typeof tableResponseSchema>[]> => {
  const res = await api.get('/tables', { params: { status: 'AVAILABLE' } });
  return z.array(tableResponseSchema).parse(res.data);
};

export const createTable = async (data: CreateTableInput): Promise<z.infer<typeof tableResponseSchema>> => {
  const res = await api.post('/tables', data);
  return tableResponseSchema.parse(res.data);
};

export const updateTable = async (
  id: number,
  data: Partial<CreateTableInput>
): Promise<z.infer<typeof tableResponseSchema>> => {
  const res = await api.patch(`/tables/${id}`, data);
  return tableResponseSchema.parse(res.data);
};

export const deleteTable = async (id: number): Promise<void> => {
  await api.delete(`/tables/${id}`);
};
