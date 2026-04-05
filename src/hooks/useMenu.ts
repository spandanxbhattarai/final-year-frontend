import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMenuItems,
  fetchCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from '@/services/menu.service';
import type { CreateMenuItemInput } from '@/schemas/menu.schema';
import toast from 'react-hot-toast';

export const useMenuItems = (category?: string) => {
  return useQuery({
    queryKey: ['menu', category],
    queryFn: () => fetchMenuItems(category),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['menu', 'categories'],
    queryFn: fetchCategories,
  });
};

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateMenuItemInput) => createMenuItem(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('Menu item created');
    },
    onError: () => toast.error('Failed to create menu item'),
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateMenuItemInput> }) =>
      updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('Menu item updated');
    },
    onError: () => toast.error('Failed to update menu item'),
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteMenuItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('Menu item deleted');
    },
    onError: () => toast.error('Failed to delete menu item'),
  });
};

export const useToggleAvailability = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => toggleAvailability(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
      toast.success('Availability toggled');
    },
    onError: () => toast.error('Failed to toggle availability'),
  });
};
