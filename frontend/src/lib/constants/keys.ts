/**
 * React Query Keys
 */

import type { AdminUserQuery } from '@/types/api';

export const QUERY_KEYS = {
  auth: {
    user: () => ['auth', 'user'] as const,
    sessions: () => ['auth', 'sessions'] as const,
    oauthProviders: () => ['auth', 'oauth-providers'] as const,
    linkedAccounts: () => ['auth', 'linked-accounts'] as const,
    mfaStatus: () => ['auth', 'mfa-status'] as const,
  },
  users: {
    me: () => ['users', 'me'] as const,
    profile: () => ['users', 'profile'] as const,
    preferences: () => ['users', 'preferences'] as const,
    security: () => ['users', 'security'] as const,
    loginHistory: () => ['users', 'login-history'] as const,
    public: (username: string) => ['users', 'public', username] as const,
    publicById: (publicId: string) => ['users', 'public-id', publicId] as const,
  },
  admin: {
    users: (filters?: AdminUserQuery) => ['admin', 'users', filters] as const,
    user: (id: string) => ['admin', 'users', id] as const,
  },
  author: {
    account: () => ['author', 'account'] as const,
    dashboard: () => ['author', 'dashboard'] as const,
    stats: () => ['author', 'stats'] as const,
    subscription: () => ['author', 'subscription'] as const,
    plans: () => ['author', 'plans'] as const,
  },
  sites: {
    list: () => ['sites'] as const,
    detail: (siteId: string) => ['sites', siteId] as const,
    stats: (siteId: string) => ['sites', siteId, 'stats'] as const,
    overview: (siteId: string) => ['sites', siteId, 'overview'] as const,
    settings: (siteId: string) => ['sites', siteId, 'settings'] as const,
    domain: (siteId: string) => ['sites', siteId, 'domain'] as const,
    pages: (siteId: string) => ['sites', siteId, 'pages'] as const,
    page: (siteId: string, pageId: string) => ['sites', siteId, 'pages', pageId] as const,
    collaborators: (siteId: string) => ['sites', siteId, 'collaborators'] as const,
  },
  collaborator: {
    sites: () => ['collaborator', 'sites'] as const,
  },
  themes: {
    list: () => ['themes'] as const,
    detail: (themeId: string) => ['themes', themeId] as const,
  },
  health: {
    live: () => ['health', 'live'] as const,
    ready: () => ['health', 'ready'] as const,
  },
} as const;