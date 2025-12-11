import { cn } from '@/lib/utils';
import { DonationStatus, getStatusLabel } from '@/lib/dummy-data';

interface StatusBadgeProps {
  status: DonationStatus;
  className?: string;
}

const statusStyles = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  assigned: 'bg-info/10 text-info border-info/20',
  picked_up: 'bg-info/10 text-info border-info/20',
  in_transit: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-success/10 text-success border-success/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border",
        statusStyles[status],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2" />
      {getStatusLabel(status)}
    </span>
  );
}
