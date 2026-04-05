import { Toaster } from 'react-hot-toast';

export const Toast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: '!bg-card !text-card-foreground !border !border-border !shadow-lg',
        duration: 4000,
        style: {
          background: 'var(--card)',
          color: 'var(--card-foreground)',
          border: '1px solid var(--border)',
        },
      }}
    />
  );
};
