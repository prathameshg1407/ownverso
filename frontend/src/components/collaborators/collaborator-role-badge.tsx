// ==== FILE: src/components/collaborators/collaborator-role-badge.tsx ====
/**
 * Collaborator Role Badge Component
 */

import { Badge } from '@/components/ui/badge';
import type { CollaboratorRole } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';

const ROLE_CONFIG: Record<CollaboratorRole, { label: string; variant: BadgeVariant }> = {
  VIEWER: { label: 'Viewer', variant: 'outline' },
  EDITOR: { label: 'Editor', variant: 'secondary' },
  TRANSLATOR: { label: 'Translator', variant: 'secondary' },
  ANALYST: { label: 'Analyst', variant: 'secondary' },
  MANAGER: { label: 'Manager', variant: 'default' },
  OWNER: { label: 'Owner', variant: 'default' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface CollaboratorRoleBadgeProps {
  role: CollaboratorRole;
  className?: string;
}

export function CollaboratorRoleBadge({ role, className }: CollaboratorRoleBadgeProps) {
  const config = ROLE_CONFIG[role];

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}