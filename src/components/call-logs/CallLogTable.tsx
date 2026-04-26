import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { Eye, Play, Pause } from 'lucide-react';
import { useRef, useState } from 'react';
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

const AudioPlayer = ({ url }: { url: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="flex items-center gap-2">
      <audio
        ref={audioRef}
        src={url}
        onEnded={() => setPlaying(false)}
        preload="none"
      />
      <Button variant="ghost" size="sm" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>
    </div>
  );
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
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Summary</th>
            <th className="text-left px-4 py-3 text-muted-foreground font-medium">Recording</th>
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
              <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate" title={log.summary || ''}>
                {log.summary || '—'}
              </td>
              <td className="px-4 py-3">
                {log.recordingUrl ? (
                  <AudioPlayer url={log.recordingUrl} />
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
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
