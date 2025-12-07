// ==== FILE: src/app/(author)/sites/[siteId]/pages/_components/pages-list.tsx ====
/**
 * Pages List Component
 */

'use client';

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import {
  FileText,
  MoreHorizontal,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  GripVertical,
  ExternalLink,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { EmptyState } from '@/components/ui/empty-state';
import { useSitePages, useSitePage } from '@/hooks';
import { AUTHOR_ROUTES, PUBLIC_ROUTES } from '@/lib/constants/routes';
import type { PageSummary } from '@/types/api';

interface PagesListProps {
  siteId: string;
}

export function PagesList({ siteId }: PagesListProps) {
  const { pages, isLoading, isError } = useSitePages(siteId);

  if (isLoading) {
    return <PagesListSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load pages. Please try again.
      </div>
    );
  }

  if (pages.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="No pages yet"
        description="Create your first page to add custom content to your site."
        action={{
          label: 'Create Page',
          href: AUTHOR_ROUTES.siteCreatePage(siteId),
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Pages</CardTitle>
        <CardDescription>
          {pages.length} page{pages.length !== 1 ? 's' : ''} total
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Navigation</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <PageRow key={page.id} siteId={siteId} page={page} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

interface PageRowProps {
  siteId: string;
  page: PageSummary;
}

function PageRow({ siteId, page }: PageRowProps) {
  const { deletePage, isDeleting } = useSitePage(siteId, page.id);

  return (
    <TableRow>
      <TableCell>
        <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
      </TableCell>
      <TableCell>
        <Link
          href={AUTHOR_ROUTES.siteEditPage(siteId, page.id)}
          className="font-medium hover:underline"
        >
          {page.title}
        </Link>
      </TableCell>
      <TableCell>
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          /{page.slug}
        </code>
      </TableCell>
      <TableCell>
        <Badge variant={page.isPublished ? 'default' : 'secondary'}>
          {page.isPublished ? (
            <>
              <Eye className="mr-1 h-3 w-3" />
              Published
            </>
          ) : (
            <>
              <EyeOff className="mr-1 h-3 w-3" />
              Draft
            </>
          )}
        </Badge>
      </TableCell>
      <TableCell>
        {page.showInNav ? (
          <Badge variant="outline">In Nav (#{page.navOrder})</Badge>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(new Date(page.updatedAt), { addSuffix: true })}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={AUTHOR_ROUTES.siteEditPage(siteId, page.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </DropdownMenuItem>
            {page.isPublished && (
              <DropdownMenuItem asChild>
                <a
                  href={`${PUBLIC_ROUTES.site(siteId)}/page/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Page
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => deletePage()}
              disabled={isDeleting}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export function PagesListSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-24 animate-pulse rounded bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded bg-muted" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}