// ==== FILE: src/app/(marketing)/users/[username]/page.tsx ====
/**
 * Public User Profile Page
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  Globe,
  Twitter,
  Instagram,
  Music2,
  MessageCircle,
  Calendar,
  BookOpen,
  Users,
  CheckCircle,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { usersApi } from '@/lib/api/endpoints';
import type { PublicUserProfile } from '@/types/api';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: { username: string };
}

interface SocialLink {
  handle: string | null;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  prefix?: string;
  isUrl?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const user = await usersApi.getPublicUserByUsername(params.username);
    return {
      title: `${user.displayName} (@${user.username})`,
      description: user.bio || `View ${user.displayName}'s profile on Ownverso`,
    };
  } catch {
    return { title: 'User Not Found' };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getSocialLinks(user: PublicUserProfile): SocialLink[] {
  const links: SocialLink[] = [
    { handle: user.websiteUrl, icon: Globe, label: 'Website', isUrl: true },
    { handle: user.twitterHandle, icon: Twitter, label: 'Twitter', prefix: 'https://twitter.com/' },
    { handle: user.instagramHandle, icon: Instagram, label: 'Instagram', prefix: 'https://instagram.com/' },
    { handle: user.tiktokHandle, icon: Music2, label: 'TikTok', prefix: 'https://tiktok.com/@' },
    { handle: user.discordHandle, icon: MessageCircle, label: 'Discord' },
  ];

  return links.filter((link) => link.handle);
}

// ─────────────────────────────────────────────────────────────────────────────
// Components
// ─────────────────────────────────────────────────────────────────────────────

function UserStats({ stats }: { stats: NonNullable<PublicUserProfile['stats']> }) {
  return (
    <div className="flex gap-6">
      <div className="flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{stats.seriesCount}</span>
        <span className="text-muted-foreground">Series</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{stats.followerCount}</span>
        <span className="text-muted-foreground">Followers</span>
      </div>
    </div>
  );
}

function SocialLinks({ links }: { links: SocialLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link, index) => {
        const Icon = link.icon;
        const href = link.isUrl
          ? link.handle
          : link.prefix
            ? `${link.prefix}${link.handle}`
            : undefined;

        if (href) {
          return (
            <Button key={index} variant="outline" size="sm" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <Icon className="mr-2 h-4 w-4" />
                {link.label}
              </a>
            </Button>
          );
        }

        return (
          <Badge key={index} variant="secondary">
            <Icon className="mr-1 h-3 w-3" />
            {link.handle}
          </Badge>
        );
      })}
    </div>
  );
}

function EmptyContent({ message }: { message: string }) {
  return (
    <div className="py-8 text-center text-muted-foreground">
      <BookOpen className="mx-auto mb-4 h-12 w-12 opacity-50" />
      <p>{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function PublicUserProfilePage({ params }: PageProps) {
  let user: PublicUserProfile;

  try {
    user = await usersApi.getPublicUserByUsername(params.username);
  } catch {
    notFound();
  }

  const socialLinks = getSocialLinks(user);
  const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-start gap-6 md:flex-row">
              {/* Avatar */}
              <Avatar className="h-32 w-32">
                <AvatarImage src={user.avatarUrl ?? undefined} alt={user.displayName} />
                <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
              </Avatar>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold">{user.displayName}</h1>
                    {user.isVerifiedAuthor && (
                      <Badge className="gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Verified Author
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {user.bio && <p className="text-foreground/80">{user.bio}</p>}
                {user.stats && <UserStats stats={user.stats} />}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Member since {memberSince}
                </div>

                <SocialLinks links={socialLinks} />
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button>Follow</Button>
                <Button variant="outline">Message</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Latest Series</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyContent message="No series published yet" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reading Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <EmptyContent message="Activity is private" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}