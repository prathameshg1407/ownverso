// ==== FILE: src/app/(author)/sites/[siteId]/collaborators/_components/collaborators-list.tsx ====
/**
 * Collaborators List Component
 */

'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Users,
  MoreHorizontal,
  Mail,
  Shield,
  Trash2,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/ui/empty-state';
import { InviteCollaboratorForm } from './invite-collaborator-form';
import { CollaboratorRoleBadge } from '@/components/collaborators/collaborator-role-badge';
import { useSiteCollaborators } from '@/hooks';
import type { Collaborator } from '@/types/api';

interface CollaboratorsListProps {
  siteId: string;
}

export function CollaboratorsList({ siteId }: CollaboratorsListProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const {
    collaborators,
    isLoading,
    isError,
    removeCollaborator,
    isRemoving,
  } = useSiteCollaborators(siteId);

  if (isLoading) {
    return <CollaboratorsListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load collaborators. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Invite button */}
      <div className="flex justify-end">
        <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Collaborator
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Collaborator</DialogTitle>
              <DialogDescription>
                Send an invitation to collaborate on this site
              </DialogDescription>
            </DialogHeader>
            <InviteCollaboratorForm
              siteId={siteId}
              onSuccess={() => setInviteDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {collaborators.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No collaborators yet"
          description="Invite team members to help manage this site."
          action={{
            label: 'Invite Collaborator',
            href: '#',
          }}
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {collaborators.length} collaborator{collaborators.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborators.map((collaborator) => (
                  <CollaboratorRow
                    key={collaborator.id}
                    collaborator={collaborator}
                    onRemove={() => removeCollaborator(collaborator.id)}
                    isRemoving={isRemoving}
                  />
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Role descriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RoleDescription
              role="VIEWER"
              description="Can view site content and analytics"
            />
            <RoleDescription
              role="EDITOR"
              description="Can create and edit content"
            />
            <RoleDescription
              role="TRANSLATOR"
              description="Can translate content to other languages"
            />
            <RoleDescription
              role="ANALYST"
              description="Can view detailed analytics and reports"
            />
            <RoleDescription
              role="MANAGER"
              description="Can manage settings and collaborators"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface CollaboratorRowProps {
  collaborator: Collaborator;
  onRemove: () => void;
  isRemoving: boolean;
}

function CollaboratorRow({ collaborator, onRemove, isRemoving }: CollaboratorRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {collaborator.avatarUrl ? (
              <AvatarImage src={collaborator.avatarUrl} alt={collaborator.displayName} />
            ) : (
              <AvatarFallback>
                {collaborator.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <p className="font-medium">{collaborator.displayName}</p>
            <p className="text-xs text-muted-foreground">@{collaborator.username}</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <CollaboratorRoleBadge role={collaborator.role} />
      </TableCell>
      <TableCell>
        <Badge variant={collaborator.isActive ? 'default' : 'secondary'}>
          {collaborator.isActive ? 'Active' : 'Pending'}
        </Badge>
      </TableCell>
      <TableCell className="text-muted-foreground">
        {collaborator.acceptedAt
          ? formatDistanceToNow(new Date(collaborator.acceptedAt), { addSuffix: true })
          : 'Invite pending'}
      </TableCell>
      <TableCell>
        {collaborator.role !== 'OWNER' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Shield className="mr-2 h-4 w-4" />
                Change Role
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onRemove}
                disabled={isRemoving}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TableCell>
    </TableRow>
  );
}

interface RoleDescriptionProps {
  role: string;
  description: string;
}

function RoleDescription({ role, description }: RoleDescriptionProps) {
  return (
    <div className="rounded-lg border p-3">
      <CollaboratorRoleBadge role={role as any} />
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function CollaboratorsListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-muted" />
      </div>
      <Card>
        <CardHeader>
          <div className="h-6 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}