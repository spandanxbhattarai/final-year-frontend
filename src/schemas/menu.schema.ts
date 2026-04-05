import { z } from 'zod';

export const createMenuItemSchema = z.object({
  name: z.string().min(2, 'Name required').max(100),
  description: z.string().min(2, 'Description required').max(500),
  price: z.coerce.number().min(0.01, 'Price must be positive'),
  category: z.string().min(1, 'Category required'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  available: z.boolean().default(true),
});

export const updateMenuItemSchema = createMenuItemSchema.partial();

export const menuItemResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  imageUrl: z.string().nullable(),
  available: z.boolean(),
  createdAt: z.string(),
});

export const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type MenuItemResponse = z.infer<typeof menuItemResponseSchema>;
