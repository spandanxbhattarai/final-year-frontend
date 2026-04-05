import { useState } from 'react';
import { useMenuItems, useCategories, useToggleAvailability, useDeleteMenuItem } from '@/hooks/useMenu';
import { MenuGrid } from '@/components/menu/MenuGrid';
import { MenuItemModal } from '@/components/menu/MenuItemModal';
import { CategoryFilter } from '@/components/menu/CategoryFilter';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import type { MenuItem } from '@/types';

export const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { data: items, isLoading } = useMenuItems(selectedCategory || undefined);
  const { data: categories } = useCategories();
  const toggleMutation = useToggleAvailability();
  const deleteMutation = useDeleteMenuItem();

  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const categoryNames = categories?.map((c) => c.name) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <CategoryFilter
          categories={categoryNames}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <Button onClick={() => { setEditItem(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Item
        </Button>
      </div>

      <MenuGrid
        items={items}
        isLoading={isLoading}
        onEdit={(item) => { setEditItem(item); setModalOpen(true); }}
        onToggle={(id) => toggleMutation.mutate(id)}
        onAdd={() => { setEditItem(null); setModalOpen(true); }}
      />

      <MenuItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={editItem}
      />

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteMutation.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
        }}
        title="Delete Menu Item"
        description="Are you sure you want to delete this menu item?"
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
