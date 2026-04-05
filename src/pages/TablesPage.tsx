import { useState } from 'react';
import { useTables, useDeleteTable } from '@/hooks/useTables';
import { TableGrid } from '@/components/tables/TableGrid';
import { TableModal } from '@/components/tables/TableModal';
import { TableDrawer } from '@/components/tables/TableDrawer';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import type { Table } from '@/types';

export const TablesPage = () => {
  const { data: tables, isLoading } = useTables();
  const deleteMutation = useDeleteTable();

  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [editTable, setEditTable] = useState<Table | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setDrawerOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage your restaurant floor plan and table status.
        </p>
        <Button onClick={() => { setEditTable(null); setModalOpen(true); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Table
        </Button>
      </div>

      <TableGrid
        tables={tables}
        isLoading={isLoading}
        onTableClick={handleTableClick}
        onAddTable={() => { setEditTable(null); setModalOpen(true); }}
      />

      <TableModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        table={editTable}
      />

      <TableDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        table={selectedTable}
        onEdit={(table) => { setEditTable(table); setModalOpen(true); }}
        onDelete={(id) => setDeleteId(id)}
      />

      <ConfirmDialog
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId) deleteMutation.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
        }}
        title="Delete Table"
        description="Are you sure you want to delete this table? This action cannot be undone."
        loading={deleteMutation.isPending}
      />
    </div>
  );
};
