import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSocket } from '@/lib/socket';
import { useAuth } from './useAuth';
import { useUIStore } from '@/store/ui.store';

export const useSocket = () => {
  const queryClient = useQueryClient();
  const { token } = useAuth();
  const addNotification = useUIStore((s) => s.addNotification);

  useEffect(() => {
    if (!token) return;
    const socket = getSocket(token);

    socket.on('new-order', (data: { customerName: string }) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`New order from ${data.customerName}`);
      addNotification({ message: `New order from ${data.customerName}`, type: 'order' });
    });

    socket.on('order:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    });

    socket.on('new-reservation', (data: { customerName: string }) => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success(`New reservation — ${data.customerName}`);
      addNotification({ message: `New reservation — ${data.customerName}`, type: 'reservation' });
    });

    socket.on('reservation:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    });

    socket.on('reservation:deleted', () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    });

    socket.on('table:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });

    socket.on('table:created', () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });

    socket.on('table:deleted', () => {
      queryClient.invalidateQueries({ queryKey: ['tables'] });
    });

    socket.on('menu:created', () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    });

    socket.on('menu:updated', () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    });

    socket.on('menu:deleted', () => {
      queryClient.invalidateQueries({ queryKey: ['menu'] });
    });

    socket.on('call-log:created', (data: { callerName: string }) => {
      queryClient.invalidateQueries({ queryKey: ['call-logs'] });
      toast.success(`New call from ${data.callerName}`);
      addNotification({ message: `New call from ${data.callerName}`, type: 'call' });
    });

    return () => {
      socket.off('new-order');
      socket.off('order:updated');
      socket.off('new-reservation');
      socket.off('reservation:updated');
      socket.off('reservation:deleted');
      socket.off('table:updated');
      socket.off('table:created');
      socket.off('table:deleted');
      socket.off('menu:created');
      socket.off('menu:updated');
      socket.off('menu:deleted');
      socket.off('call-log:created');
    };
  }, [token, queryClient, addNotification]);
};
