import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createOrderSchema, type CreateOrderInput } from '@/schemas/order.schema';
import { useCreateOrder } from '@/hooks/useOrders';
import { useMenuItems } from '@/hooks/useMenu';
import { useTables } from '@/hooks/useTables';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Plus, Trash2 } from 'lucide-react';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface OrderItemRow {
  menuItemId: number;
  quantity: number;
  notes: string;
}

export const CreateOrderModal = ({ isOpen, onClose }: CreateOrderModalProps) => {
  const createMutation = useCreateOrder();
  const { data: menuItems } = useMenuItems();
  const { data: tables } = useTables();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateOrderInput>({
    resolver: zodResolver(createOrderSchema) as any,
  });

  const [items, setItems] = useState<OrderItemRow[]>([{ menuItemId: 0, quantity: 1, notes: '' }]);

  const addItem = () => setItems([...items, { menuItemId: 0, quantity: 1, notes: '' }]);

  const removeItem = (index: number) => {
    if (items.length === 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof OrderItemRow, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const onSubmit = (data: CreateOrderInput) => {
    const validItems = items
      .filter((item) => item.menuItemId > 0)
      .map((item) => ({
        menuItemId: Number(item.menuItemId),
        quantity: Number(item.quantity) || 1,
        notes: item.notes || '',
      }));

    if (validItems.length === 0) return;

    createMutation.mutate(
      { ...data, items: validItems },
      {
        onSuccess: () => {
          reset();
          setItems([{ menuItemId: 0, quantity: 1, notes: '' }]);
          onClose();
        },
      }
    );
  };

  const tableOptions = (tables || []).map((t) => ({
    value: String(t.id),
    label: `Table ${t.number} (${t.capacity} seats, ${t.floor})`,
  }));

  const menuOptions = (menuItems || [])
    .filter((m) => m.available)
    .map((m) => ({
      value: String(m.id),
      label: `${m.name} — $${m.price.toFixed(2)}`,
    }));

  const total = items.reduce((sum, item) => {
    const menuItem = menuItems?.find((m) => m.id === Number(item.menuItemId));
    return sum + (menuItem?.price ?? 0) * (Number(item.quantity) || 0);
  }, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Order">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input label="Customer Name" {...register('customerName')} error={errors.customerName?.message} />
        <Select label="Table" options={tableOptions} {...register('tableId')} error={errors.tableId?.message} />

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground">Items</label>
            <Button type="button" variant="ghost" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>
          {errors.items?.message && (
            <p className="text-xs text-destructive mb-2">{errors.items.message}</p>
          )}
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 items-start">
                <div className="flex-1">
                  <Select
                    options={menuOptions}
                    value={String(item.menuItemId)}
                    onChange={(e) => updateItem(index, 'menuItemId', Number(e.target.value))}
                  />
                </div>
                <div className="w-20">
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))}
                    placeholder="Qty"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={item.notes}
                    onChange={(e) => updateItem(index, 'notes', e.target.value)}
                    placeholder="Notes (optional)"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="mt-1"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {total > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-sm font-bold text-primary">${total.toFixed(2)}</span>
          </div>
        )}

        <div className="flex gap-3 justify-end pt-2">
          <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" loading={createMutation.isPending}>
            Create Order
          </Button>
        </div>
      </form>
    </Modal>
  );
};
