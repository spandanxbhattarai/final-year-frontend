import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name required').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['ADMIN', 'STAFF']).default('STAFF'),
});

export const authResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['ADMIN', 'STAFF']),
  }),
  accessToken: z.string(),
});

export const refreshResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    role: z.enum(['ADMIN', 'STAFF']),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type RefreshResponse = z.infer<typeof refreshResponseSchema>;

