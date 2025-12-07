// ==== FILE: src/components/sites/site-status-badge.tsx ====
/**
 * Site Status Badge Component
 */

import { Badge } from '@/components/ui/badge';
import type { SiteStatus } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline';

const STATUS_CONFIG: Record<SiteStatus, { label: string; variant: BadgeVariant }> = {
  DRAFT: { label: 'Draft', variant: 'secondary' },
  ACTIVE: { label: 'Active', variant: 'default' },
  MAINTENANCE: { label: 'Maintenance', variant: 'outline' },
  SUSPENDED: { label: 'Suspended', variant: 'destructive' },
  DELETED: { label: 'Deleted', variant: 'destructive' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface SiteStatusBadgeProps {
  status: SiteStatus;
  className?: string;
}

export function SiteStatusBadge({ status, className }: SiteStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}