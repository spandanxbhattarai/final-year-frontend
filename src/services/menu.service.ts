import { api } from './api';
import { z } from 'zod';
import {
  type CreateMenuItemInput,
  menuItemResponseSchema,
  categoryResponseSchema,
} from '@/schemas/menu.schema';

export const fetchMenuItems = async (category?: string): Promise<z.infer<typeof menuItemResponseSchema>[]> => {
  const res = await api.get('/menu', { params: category ? { category } : {} });
  return z.array(menuItemResponseSchema).parse(res.data);
};

export const fetchCategories = async (): Promise<z.infer<typeof categoryResponseSchema>[]> => {
  const res = await api.get('/menu/categories');
  return z.array(categoryResponseSchema).parse(res.data);
};

export const createMenuItem = async (data: CreateMenuItemInput): Promise<z.infer<typeof menuItemResponseSchema>> => {
  const res = await api.post('/menu', data);
  return menuItemResponseSchema.parse(res.data);
};

export const updateMenuItem = async (
  id: number,
  data: Partial<CreateMenuItemInput>
): Promise<z.infer<typeof menuItemResponseSchema>> => {
  const res = await api.patch(`/menu/${id}`, data);
  return menuItemResponseSchema.parse(res.data);
};

export const deleteMenuItem = async (id: number): Promise<void> => {
  await api.delete(`/menu/${id}`);
};

export const toggleAvailability = async (id: number): Promise<z.infer<typeof menuItemResponseSchema>> => {
  const res = await api.patch(`/menu/${id}/toggle`);
  return menuItemResponseSchema.parse(res.data);
};
