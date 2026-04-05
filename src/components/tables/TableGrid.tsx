import { TableCard } from './TableCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import type { Table } from '@/types';

interface TableGridProps {
  tables: Table[] | undefined;
  isLoading: boolean;
  onTableClick: (table: Table) => void;
  onAddTable: () => void;
}

export const TableGrid = ({ tables, isLoading, onTableClick, onAddTable }: TableGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!tables || tables.length === 0) {
    return (
      <EmptyState
        title="No tables yet"
        description="Add your restaurant tables to get started."
        actionLabel="Add Table"
        onAction={onAddTable}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {tables.map((table) => (
        <TableCard key={table.id} table={table} onClick={onTableClick} />
      ))}
    </div>
  );
};
