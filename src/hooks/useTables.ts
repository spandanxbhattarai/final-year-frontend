import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchTables,
  fetchAvailableTables,
  createTable,
  updateTable,
  deleteTable,
} from '@/services/tables.service';
import type { CreateTableInput } from '@/schemas/table.schema';
import toast from 'react-hot-toast';

export const useTables = () => {
  return useQuery({
    queryKey: ['tables'],
    queryFn: fetchTables,
  });
};

export const useAvailableTables = () => {
  return useQuery({
    queryKey: ['tables', 'available'],
    queryFn: fetchAvailableTables,
  });
};

export const useCreateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTableInput) => createTable(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Table created');
    },
    onError: () => toast.error('Failed to create table'),
  });
};

export const useUpdateTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateTableInput> }) =>
      updateTable(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Table updated');
    },
    onError: () => toast.error('Failed to update table'),
  });
};

export const useDeleteTable = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTable(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
      toast.success('Table deleted');
    },
    onError: () => toast.error('Failed to delete table'),
  });
};
