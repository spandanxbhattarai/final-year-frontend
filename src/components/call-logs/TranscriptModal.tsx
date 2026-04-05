import { Modal } from '@/components/ui/Modal';
import type { CallLog } from '@/types';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: CallLog | null;
}

export const TranscriptModal = ({ isOpen, onClose, log }: TranscriptModalProps) => {
  if (!log) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Transcript — ${log.callerName}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Phone</span>
          <span className="text-card-foreground">{log.callerPhone}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Date</span>
          <span className="text-card-foreground">
            {new Date(log.createdAt).toLocaleString()}
          </span>
        </div>
        <div className="border-t border-border pt-3">
          <h4 className="text-sm font-medium text-card-foreground mb-2">Transcript</h4>
          <div className="rounded-lg bg-muted/50 p-4 text-sm text-card-foreground whitespace-pre-wrap max-h-72 overflow-y-auto">
            {log.transcript || 'No transcript available.'}
          </div>
        </div>
      </div>
    </Modal>
  );
};
