import { api } from './api';

export interface ContactMessage {
  id: number;
  name: string;
  restaurantName: string | null;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface CreateContactInput {
  name: string;
  restaurantName?: string;
  email: string;
  phone?: string;
  message: string;
}

export const submitContactMessage = async (data: CreateContactInput): Promise<ContactMessage> => {
  const res = await api.post('/contact', data);
  return res.data;
};

export const fetchContactMessages = async (): Promise<ContactMessage[]> => {
  const res = await api.get('/contact');
  return res.data;
};

export const markContactAsRead = async (id: number): Promise<ContactMessage> => {
  const res = await api.patch(`/contact/${id}/read`);
  return res.data;
};

export const deleteContactMessage = async (id: number): Promise<void> => {
  await api.delete(`/contact/${id}`);
};
