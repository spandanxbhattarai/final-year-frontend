import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';

interface ReservationFiltersProps {
  dateFilter: string;
  statusFilter: string;
  onDateChange: (date: string) => void;
  onStatusChange: (status: string) => void;
}

export const ReservationFilters = ({
  dateFilter,
  statusFilter,
  onDateChange,
  onStatusChange,
}: ReservationFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="w-48">
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => onDateChange(e.target.value)}
          label="Date"
        />
      </div>
      <div className="w-48">
        <Select
          label="Status"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { value: 'PENDING', label: 'Pending' },
            { value: 'CONFIRMED', label: 'Confirmed' },
            { value: 'CANCELLED', label: 'Cancelled' },
            { value: 'COMPLETED', label: 'Completed' },
          ]}
        />
      </div>
    </div>
  );
};
