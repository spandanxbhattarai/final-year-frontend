import { useContactMessages, useMarkContactRead, useDeleteContact } from '@/hooks/useContact';
import { Mail, MailOpen, Trash2, Building2, Phone, Clock } from 'lucide-react';
import { useState } from 'react';
import type { ContactMessage } from '@/services/contact.service';

const MessageCard = ({ msg, onRead, onDelete }: { msg: ContactMessage; onRead: () => void; onDelete: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        msg.isRead ? 'border-border bg-card' : 'border-primary/30 bg-primary/5'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => {
            setExpanded(!expanded);
            if (!msg.isRead) onRead();
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            {msg.isRead ? (
              <MailOpen className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Mail className="h-4 w-4 text-primary" />
            )}
            <span className="font-semibold text-card-foreground">{msg.name}</span>
            {!msg.isRead && (
              <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                New
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{msg.email}</span>
            {msg.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {msg.phone}
              </span>
            )}
            {msg.restaurantName && (
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" /> {msg.restaurantName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        <button
          onClick={onDelete}
          className="rounded-lg p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-card-foreground whitespace-pre-wrap">{msg.message}</p>
        </div>
      )}
    </div>
  );
};

export const ContactMessagesPage = () => {
  const { data: messages, isLoading } = useContactMessages();
  const markReadMutation = useMarkContactRead();
  const deleteMutation = useDeleteContact();

  const unreadCount = messages?.filter((m) => !m.isRead).length ?? 0;

  return (
    <main className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {messages?.length ?? 0} message{messages?.length !== 1 ? 's' : ''}{' '}
            {unreadCount > 0 && (
              <span className="text-primary font-medium">({unreadCount} unread)</span>
            )}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : messages && messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((msg) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                onRead={() => markReadMutation.mutate(msg.id)}
                onDelete={() => deleteMutation.mutate(msg.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No messages yet</p>
            <p className="text-sm">Contact form submissions will appear here.</p>
          </div>
        )}
      </main>
  );
};
