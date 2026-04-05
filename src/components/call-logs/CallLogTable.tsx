import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Eye } from 'lucide-react';
import type { CallLog } from '@/types';

interface CallLogTableProps {
  logs: CallLog[] | undefined;
  isLoading: boolean;
  onViewTranscript: (log: CallLog) => void;
}

const statusVariant = (status: string) => {
  switch (status) {
    case 'COMPLETED': return 'success' as const;
    case 'MISSED': return 'destructive' as const;
    case 'VOICEMAIL': return 'warning' as const;
    default: return 'outline' as const;
  }
};

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const CallLogTable = ({ logs, isLoading, onViewTranscript }: CallLogTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16" />
        ))}
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return <EmptyState title="No call logs" description="Call logs will appear here once calls are made." />;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Date</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Caller</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Phone</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Duration</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Status</th>
            <th className="text-right px-4 py-3 text-muted-foreground font-medium">Transcript</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(log.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-card-foreground font-medium">{log.callerName}</td>
              <td className="px-4 py-3 text-muted-foreground">{log.callerPhone}</td>
              <td className="px-4 py-3 text-muted-foreground">{formatDuration(log.duration)}</td>
              <td className="px-4 py-3">
                <Badge variant={statusVariant(log.status)}>{log.status}</Badge>
              </td>
              <td className="px-4 py-3 text-right">
                {log.transcript && (
                  <Button variant="ghost" size="sm" onClick={() => onViewTranscript(log)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
