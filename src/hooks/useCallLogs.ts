import { useQuery } from '@tanstack/react-query';
import { fetchCallLogs, fetchCallLogById } from '@/services/callLogs.service';

export const useCallLogs = (filters?: Record<string, string>) => {
  return useQuery({
    queryKey: ['call-logs', filters],
    queryFn: () => fetchCallLogs(filters),
  });
};

export const useCallLog = (id: number) => {
  return useQuery({
    queryKey: ['call-logs', id],
    queryFn: () => fetchCallLogById(id),
    enabled: !!id,
  });
};
