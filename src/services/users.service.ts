import { api } from './api';
import type { User } from '@/types';
import type { CreateUserInput, UpdateUserInput, UpdateProfileInput } from '@/schemas/user.schema';

export const fetchUsers = async (): Promise<User[]> => {
  const res = await api.get('/users');
  return res.data;
};

export const fetchUser = async (id: number): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const createUser = async (data: CreateUserInput): Promise<User> => {
  const res = await api.post('/users', data);
  return res.data;
};

export const updateUser = async (id: number, data: UpdateUserInput): Promise<User> => {
  const payload = { ...data };
  if (!payload.password) delete payload.password;
  const res = await api.patch(`/users/${id}`, payload);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export const blockUser = async (id: number): Promise<User> => {
  const res = await api.patch(`/users/${id}/block`);
  return res.data;
};

export const unblockUser = async (id: number): Promise<User> => {
  const res = await api.patch(`/users/${id}/unblock`);
  return res.data;
};

export const fetchProfile = async (): Promise<User> => {
  const res = await api.get('/users/profile');
  return res.data;
};

export const updateProfile = async (data: UpdateProfileInput): Promise<User> => {
  const payload = { ...data };
  if (!payload.password) delete payload.password;
  const res = await api.patch('/users/profile', payload);
  return res.data;
};
