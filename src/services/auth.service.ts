import { api } from './api';
import {
  type LoginInput,
  type RegisterInput,
  type AuthResponse,
  type RefreshResponse,
  authResponseSchema,
  refreshResponseSchema,
} from '@/schemas/auth.schema';

export const loginUser = async (data: LoginInput): Promise<AuthResponse> => {
  const res = await api.post('/auth/login', data);
  return authResponseSchema.parse(res.data);
};

export const registerUser = async (data: RegisterInput): Promise<AuthResponse> => {
  const res = await api.post('/auth/register', data);
  return authResponseSchema.parse(res.data);
};

export const refreshToken = async (): Promise<RefreshResponse> => {
  const res = await api.post('/auth/refresh');
  return refreshResponseSchema.parse(res.data);
};

export const logoutUser = async (): Promise<void> => {
  await api.post('/auth/logout');
};
