import { z } from 'zod';

const orderItemSchema = z.object({
  menuItemId: z.number(),
  quantity: z.coerce.number().int().min(1, 'Min 1'),
  notes: z.string().optional().or(z.literal('')),
});

export const createOrderSchema = z.object({
  tableId: z.coerce.number().int().min(1, 'Table required'),
  customerName: z.string().min(2, 'Name required').max(100),
  items: z.array(orderItemSchema).min(1, 'At least one item required'),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(['PENDING', 'PREPARING', 'READY', 'SERVED', 'CANCELLED']),
});

export const orderItemResponseSchema = z.object({
  id: z.number(),
  menuItemId: z.number(),
  menuItemName: z.string().optional(),
  menuItem: z.object({ name: z.string() }).passthrough().optional(),
  quantity: z.number(),
  price: z.number(),
  notes: z.string().nullable(),
}).transform((item) => ({
  id: item.id,
  menuItemId: item.menuItemId,
  menuItemName: item.menuItemName || item.menuItem?.name || 'Unknown Item',
  quantity: item.quantity,
  price: item.price,
  notes: item.notes,
}));

export const orderResponseSchema = z.object({
  id: z.number(),
  tableId: z.number().nullable(),
  tableNumber: z.number().nullable().optional(),
  table: z.object({ number: z.number() }).passthrough().nullable().optional(),
  customerName: z.string(),
  phone: z.string().optional().default(''),
  status: z.enum(['PENDING', 'PREPARING', 'READY', 'SERVED', 'CANCELLED']),
  type: z.enum(['DINE_IN', 'PHONE']).default('DINE_IN'),
  date: z.string(),
  prepareBy: z.string().nullable(),
  items: z.array(orderItemResponseSchema),
  total: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
}).transform((order) => ({
  id: order.id,
  tableId: order.tableId,
  tableNumber: order.tableNumber ?? order.table?.number ?? null,
  customerName: order.customerName,
  phone: order.phone,
  status: order.status,
  type: order.type,
  date: order.date,
  prepareBy: order.prepareBy,
  items: order.items,
  total: order.total,
  createdAt: order.createdAt,
  updatedAt: order.updatedAt,
}));

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type OrderResponse = z.infer<typeof orderResponseSchema>;
