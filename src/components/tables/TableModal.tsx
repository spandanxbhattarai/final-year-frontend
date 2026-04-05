import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTableSchema, type CreateTableInput } from '@/schemas/table.schema';
import { useCreateTable, useUpdateTable } from '@/hooks/useTables';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { Table } from '@/types';

interface TableModalProps {
  isOpen: boolean;
  onClose: () => void;
  table?: Table | null;
}

export const TableModal = ({ isOpen, onClose, table }: TableModalProps) => {
  const createMutation = useCreateTable();
  const updateMutation = useUpdateTable();
  const isEdit = !!table;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTableInput>({
    resolver: zodResolver(createTableSchema) as any,
    defaultValues: table
      ? { number: table.number, capacity: table.capacity, floor: table.floor, status: table.status }
      : undefined,
  });

  const onSubmit = (data: CreateTableInput) => {
    if (isEdit && table) {
      updateMutation.mutate(
        { id: table.id, data },
        { onSuccess: () => { reset(); onClose(); } }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => { reset(); onClose(); },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Table' : 'Add Table'}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Table Number" type="number" {...register('number')} error={errors.number?.message} />
        <Input label="Capacity" type="number" {...register('capacity')} error={errors.capacity?.message} />
        <Input label="Floor" {...register('floor')} error={errors.floor?.message} />
        <Select
          label="Status"
          {...register('status')}
          error={errors.status?.message}
          options={[
            { value: 'AVAILABLE', label: 'Available' },
            { value: 'OCCUPIED', label: 'Occupied' },
            { value: 'RESERVED', label: 'Reserved' },
            { value: 'MAINTENANCE', label: 'Maintenance' },
          ]}
        />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={createMutation.isPending || updateMutation.isPending}>
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
