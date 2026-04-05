import type { Table } from '@/types';

interface TableCardProps {
  table: Table;
  onClick: (table: Table) => void;
}

const statusColors: Record<string, string> = {
  AVAILABLE: 'border-green-500 bg-green-500/10 text-green-500',
  OCCUPIED: 'border-red-500 bg-red-500/10 text-red-500',
  RESERVED: 'border-amber-500 bg-amber-500/10 text-amber-500',
  MAINTENANCE: 'border-zinc-500 bg-zinc-500/10 text-zinc-500',
};

export const TableCard = ({ table, onClick }: TableCardProps) => {
  return (
    <button
      onClick={() => onClick(table)}
      className={`flex flex-col items-center justify-center rounded-xl border-2 p-6 transition-all duration-200 hover:scale-105 hover:shadow-md ${statusColors[table.status]}`}
    >
      <span className="text-2xl font-bold">#{table.number}</span>
      <span className="text-xs mt-1 opacity-80">Seats {table.capacity}</span>
      <span className="text-xs mt-2 font-medium uppercase tracking-wider">
        {table.status}
      </span>
    </button>
  );
};
