import { useState } from 'react';
import { useCallLogs } from '@/hooks/useCallLogs';
import { CallLogTable } from '@/components/call-logs/CallLogTable';
import { TranscriptModal } from '@/components/call-logs/TranscriptModal';
import { Select } from '@/components/ui/Select';
import type { CallLog } from '@/types';

export const CallLogsPage = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const filters: Record<string, string> = {};
  if (statusFilter) filters.status = statusFilter;

  const { data: logs, isLoading } = useCallLogs(
    Object.keys(filters).length > 0 ? filters : undefined
  );
  const [selectedLog, setSelectedLog] = useState<CallLog | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Review call logs and transcripts from your AI receptionist.
        </p>
        <div className="w-48">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'COMPLETED', label: 'Completed' },
              { value: 'MISSED', label: 'Missed' },
              { value: 'VOICEMAIL', label: 'Voicemail' },
            ]}
          />
        </div>
      </div>

      <CallLogTable
        logs={logs}
        isLoading={isLoading}
        onViewTranscript={(log) => setSelectedLog(log)}
      />

      <TranscriptModal
        isOpen={selectedLog !== null}
        onClose={() => setSelectedLog(null)}
        log={selectedLog}
      />
    </div>
  );
};
