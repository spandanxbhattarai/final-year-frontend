import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createMenuItemSchema, type CreateMenuItemInput } from '@/schemas/menu.schema';
import { useCreateMenuItem, useUpdateMenuItem } from '@/hooks/useMenu';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import type { MenuItem } from '@/types';

interface MenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: MenuItem | null;
}

export const MenuItemModal = ({ isOpen, onClose, item }: MenuItemModalProps) => {
  const createMutation = useCreateMenuItem();
  const updateMutation = useUpdateMenuItem();
  const isEdit = !!item;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateMenuItemInput>({
    resolver: zodResolver(createMenuItemSchema) as any,
    defaultValues: item
      ? {
          name: item.name,
          description: item.description,
          price: item.price,
          category: item.category,
          imageUrl: item.imageUrl || '',
          available: item.available,
        }
      : undefined,
  });

  const onSubmit = (data: CreateMenuItemInput) => {
    if (isEdit && item) {
      updateMutation.mutate(
        { id: item.id, data },
        { onSuccess: () => { reset(); onClose(); } }
      );
    } else {
      createMutation.mutate(data, {
        onSuccess: () => { reset(); onClose(); },
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? 'Edit Menu Item' : 'New Menu Item'}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Name" {...register('name')} error={errors.name?.message} />
        <Textarea label="Description" {...register('description')} error={errors.description?.message} />
        <Input label="Price" type="number" step="0.01" {...register('price')} error={errors.price?.message} />
        <Input label="Category" {...register('category')} error={errors.category?.message} />
        <Input label="Image URL" {...register('imageUrl')} error={errors.imageUrl?.message} />
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
