import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createReservationSchema, type CreateReservationInput } from '@/schemas/reservation.schema';
import { useCreateReservation, useUpdateReservation } from '@/hooks/useReservations';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Reservation } from '@/types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation?: Reservation | null;
}

export const ReservationModal = ({ isOpen, onClose, reservation }: ReservationModalProps) => {
  const createMutation = useCreateReservation();
  const updateMutation = useUpdateReservation();
  const isEdit = !!reservation;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReservationInput>({
    resolver: zodResolver(createReservationSchema) as any,
    defaultValues: reservation
      ? {
          customerName: reservation.customerName,
          phone: reservation.phone,
          email: reservation.email || '',
          date: reservation.date,
          time: reservation.time,
          partySize: reservation.partySize,
        }
      : undefined,
  });

  const onSubmit = (data: CreateReservationInput) => {
    if (isEdit && reservation) {
      updateMutation.mutate(
        { id: reservation.id, data },
        { onSuccess: () => { reset(); onClose(); } }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => { reset(); onClose(); },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Reservation' : 'New Reservation'}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Customer name" {...register('customerName')} error={errors.customerName?.message} />
        <Input label="Phone" {...register('phone')} error={errors.phone?.message} />
        <Input label="Email" {...register('email')} error={errors.email?.message} />
        <Input label="Date" type="date" {...register('date')} error={errors.date?.message} />
        <Input label="Time" type="time" {...register('time')} error={errors.time?.message} />
        <Input label="Party size" type="number" {...register('partySize')} error={errors.partySize?.message} />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
            {isEdit ? 'Update' : 'Confirm'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
