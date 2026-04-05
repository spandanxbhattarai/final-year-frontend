import { MenuItemCard } from './MenuItemCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import type { MenuItem } from '@/types';

interface MenuGridProps {
  items: MenuItem[] | undefined;
  isLoading: boolean;
  onEdit: (item: MenuItem) => void;
  onToggle: (id: number) => void;
  onAdd: () => void;
}

export const MenuGrid = ({ items, isLoading, onEdit, onToggle, onAdd }: MenuGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-48" />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <EmptyState
        title="No menu items"
        description="Add your first menu item to get started."
        actionLabel="Add Item"
        onAction={onAdd}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} onEdit={onEdit} onToggle={onToggle} />
      ))}
    </div>
  );
};
