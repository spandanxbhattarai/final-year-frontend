import { useState } from 'react';
import { useReservations, useDeleteReservation } from '@/hooks/useReservations';
import { ReservationList } from '@/components/reservations/ReservationList';
import { ReservationModal } from '@/components/reservations/ReservationModal';
import { ReservationFilters } from '@/components/reservations/ReservationFilters';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import type { Reservation } from '@/types';

export const ReservationsPage = () => {
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const filters: Record<string, string> = {};
  if (dateFilter) filters.date = dateFilter;
  if (statusFilter) filters.status = statusFilter;

  const { data: reservations, isLoading } = useReservations(
    Object.keys(filters).length > 0 ? filters : undefined
  );
  const deleteMutation = useDeleteReservation();

  const [modalOpen, setModalOpen] = useState(false);
  const [editReservation, setEditReservation] = useState<Reservation | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <ReservationFilters
          dateFilter={dateFilter}
          statusFilter={statusFilter}
          onDateChange={setDateFilter}
          onStatusChange={setStatusFilter}
        />
        <Button onClick={() => { setEditReservation(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> New Reservation
        </Button>
      </div>

      <ReservationList
        reservations={reservations}
        isLoading={isLoading}
        onEdit={(r) => { setEditReservation(r); setModalOpen(true); }}
        onDelete={(id) => setDeleteId(id)}
        onAdd={() => { setEditReservation(null); setModalOpen(true); }}
      />

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        reservation={editReservation}
      />

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteMutation.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
        }}
        title="Cancel Reservation"
        description="Are you sure you want to cancel this reservation?"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
