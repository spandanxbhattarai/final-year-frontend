interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'outline';
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-green-500/10 text-green-500',
  warning: 'bg-amber-500/10 text-amber-500',
  destructive: 'bg-destructive/10 text-destructive',
  outline: 'border border-border text-foreground',
};

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
