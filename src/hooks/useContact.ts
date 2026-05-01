import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchContactMessages,
  markContactAsRead,
  deleteContactMessage,
  submitContactMessage,
  type CreateContactInput,
} from '@/services/contact.service';
import toast from 'react-hot-toast';

export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: fetchContactMessages,
  });
};

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: (data: CreateContactInput) => submitContactMessage(data),
  });
};

export const useMarkContactRead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => markContactAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteContactMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('Message deleted');
    },
  });
};
