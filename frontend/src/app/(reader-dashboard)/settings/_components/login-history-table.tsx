// ==== FILE: src/app/(reader-dashboard)/settings/_components/login-history-table.tsx ====
/**
 * Login History Table Component
 */

'use client';

import { Monitor, Smartphone, Tablet, MapPin, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { LoginHistoryEntry } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getDeviceIcon(deviceType: string) {
  switch (deviceType.toLowerCase()) {
    case 'mobile':
      return <Smartphone className="h-4 w-4" />;
    case 'tablet':
      return <Tablet className="h-4 w-4" />;
    default:
      return <Monitor className="h-4 w-4" />;
  }
}

function formatLocation(city: string | null, country: string | null): string {
  if (city && country) return `${city}, ${country}`;
  return country || 'Unknown';
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface LoginHistoryTableProps {
  sessions: LoginHistoryEntry[];
}

export function LoginHistoryTable({ sessions }: LoginHistoryTableProps) {
  if (sessions.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">No active sessions found.</div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Device</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {getDeviceIcon(session.deviceType)}
                <div>
                  <div className="font-medium">{session.browser || 'Unknown Browser'}</div>
                  <div className="text-sm text-muted-foreground">
                    {session.deviceOs || session.deviceType}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span>{formatLocation(session.city, session.country)}</span>
              </div>
            </TableCell>
            <TableCell>
              <code className="text-sm">{session.ipAddress || 'Unknown'}</code>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDistanceToNow(new Date(session.lastActiveAt), { addSuffix: true })}
              </div>
            </TableCell>
            <TableCell>
              {session.isCurrent && <Badge variant="secondary">Current</Badge>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}