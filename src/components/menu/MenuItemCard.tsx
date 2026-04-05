import { Toggle } from '@/components/ui/Toggle';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import type { MenuItem } from '@/types';

interface MenuItemCardProps {
  item: MenuItem;
  onEdit: (item: MenuItem) => void;
  onToggle: (id: number) => void;
}

export const MenuItemCard = ({ item, onEdit, onToggle }: MenuItemCardProps) => {
  return (
    <div className="rounded-xl bg-card border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
      )}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-card-foreground truncate">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
          <p className="text-lg font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
          <Pencil className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{item.category}</span>
        <Toggle
          checked={item.available}
          onChange={() => onToggle(item.id)}
          label={item.available ? 'Available' : 'Unavailable'}
        />
      </div>
    </div>
  );
};
