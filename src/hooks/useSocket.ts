import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSocket } from '@/lib/socket';
import { useAuth } from './useAuth';
import { useUIStore } from '@/store/ui.store';

export const useSocket = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const incrementNotifications = useUIStore((s) => s.incrementNotifications);

  useEffect(() => {
    if (!token) return;
    const socket = getSocket(token);

    socket.on('new-order', (data: { customerName: string }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`New order from ${data.customerName}`);
      incrementNotifications();
    });

    socket.on('order-status-changed', () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    });

    socket.on('new-reservation', (data: { customerName: string }) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success(`New reservation — ${data.customerName}`);
      incrementNotifications();
    });

    return () => {
      socket.off('new-order');
      socket.off('order-status-changed');
      socket.off('new-reservation');
    };
  }, [token, queryClient, incrementNotifications]);
};
