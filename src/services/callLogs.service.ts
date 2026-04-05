import { api } from './api';
import { z } from 'zod';
import { callLogResponseSchema } from '@/schemas/call-log.schema';

export const fetchCallLogs = async (
  filters?: Record<string, string>
): Promise<z.infer<typeof callLogResponseSchema>[]> => {
  const res = await api.get('/call-logs', { params: filters });
  return z.array(callLogResponseSchema).parse(res.data);
};

export const fetchCallLogById = async (
  id: number
): Promise<z.infer<typeof callLogResponseSchema>> => {
  const res = await api.get(`/call-logs/${id}`);
  return callLogResponseSchema.parse(res.data);
};
