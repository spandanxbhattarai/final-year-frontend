import { z } from 'zod';

export const callLogResponseSchema = z.object({
  id: z.number(),
  vapiCallId: z.string().nullable(),
  callerName: z.string(),
  callerPhone: z.string(),
  duration: z.number(),
  status: z.enum(['COMPLETED', 'MISSED', 'VOICEMAIL']),
  summary: z.string().nullable(),
  transcript: z.string().nullable(),
  recordingUrl: z.string().nullable(),
  createdAt: z.string(),
});

export const callLogFiltersSchema = z.object({
  status: z.enum(['COMPLETED', 'MISSED', 'VOICEMAIL']).optional(),
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export type CallLogResponse = z.infer<typeof callLogResponseSchema>;
export type CallLogFilters = z.infer<typeof callLogFiltersSchema>;
