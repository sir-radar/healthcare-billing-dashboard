import { ClaimStatusType, ClaimStatus } from '@/types/schema';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ClaimStatusType;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const baseClasses =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

  const statusClasses = {
    [ClaimStatus.Approved]: 'bg-green-100 text-green-800',
    [ClaimStatus.Pending]: 'bg-yellow-100 text-yellow-800',
    [ClaimStatus.Denied]: 'bg-red-100 text-red-800',
  };

  return (
    <span className={cn(baseClasses, statusClasses[status], className)}>
      {status}
    </span>
  );
}
