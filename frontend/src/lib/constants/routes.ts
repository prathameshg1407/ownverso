// ==== FILE: src/lib/constants/routes.ts ====
/**
 * Application Routes
 */

// ─────────────────────────────────────────────────────────────────────────────
// Page Routes
// ─────────────────────────────────────────────────────────────────────────────

export const PUBLIC_ROUTES = {
  home: '/',
  about: '/about',
  pricing: '/pricing',
  features: '/features',
  blog: '/blog',
  contact: '/contact',
  site: (slug: string) => `/s/${slug}` as const,
} as const;

export const LEGAL_ROUTES = {
  terms: '/terms',
  privacy: '/privacy',
  cookies: '/cookies',
  dmca: '/dmca',
} as const;

export const AUTH_ROUTES = {
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  verifyEmail: '/verify-email',
  mfaSetup: '/mfa/setup',
  mfaVerify: '/mfa/verify',
} as const;

// ==== FILE: src/lib/constants/routes.ts ====

export const READER_ROUTES = {
  dashboard: '/dashboard',
  library: '/library',
  settings: '/settings',
  settingsProfile: '/settings/profile',
  settingsAccount: '/settings/account',
  settingsSecurity: '/settings/security',
  // Add these:
  settingsReading: '/settings/reading',
  settingsNotifications: '/settings/notifications',
  settingsPrivacy: '/settings/privacy',
  settingsBilling: '/settings/billing',
} as const;

export const AUTHOR_ROUTES = {
  // Dashboard
  dashboard: '/author',
  account: '/author/account',
  
  // Sites list
  sites: '/author/sites',
  createSite: '/author/sites/create',
  
  // Site detail
  site: (siteId: string) => `/author/sites/${siteId}` as const,
  sitePages: (siteId: string) => `/author/sites/${siteId}/pages` as const,
  siteCollaborators: (siteId: string) => `/author/sites/${siteId}/collaborators` as const,
  siteSeries: (siteId: string) => `/author/sites/${siteId}/series` as const,
  siteAnalytics: (siteId: string) => `/author/sites/${siteId}/analytics` as const,
  
  // Pages
  siteCreatePage: (siteId: string) => `/author/sites/${siteId}/pages/new` as const,
  siteEditPage: (siteId: string, pageId: string) => `/author/sites/${siteId}/pages/${pageId}` as const,
  
  // Series
  siteCreateSeries: (siteId: string) => `/author/sites/${siteId}/series/new` as const,
  siteEditSeries: (siteId: string, seriesId: string) => `/author/sites/${siteId}/series/${seriesId}` as const,
  
  // Chapters
  seriesChapters: (siteId: string, seriesId: string) => `/author/sites/${siteId}/series/${seriesId}/chapters` as const,
  createChapter: (siteId: string, seriesId: string) => `/author/sites/${siteId}/series/${seriesId}/chapters/new` as const,
  editChapter: (siteId: string, seriesId: string, chapterId: string) => 
    `/author/sites/${siteId}/series/${seriesId}/chapters/${chapterId}` as const,
  
  // Site Settings
  siteSettings: (siteId: string) => `/author/sites/${siteId}/settings` as const,
  siteSettingsGeneral: (siteId: string) => `/author/sites/${siteId}/settings/general` as const,
  siteSettingsBranding: (siteId: string) => `/author/sites/${siteId}/settings/branding` as const,
  siteSettingsTheme: (siteId: string) => `/author/sites/${siteId}/settings/theme` as const,
  siteSettingsDomain: (siteId: string) => `/author/sites/${siteId}/settings/domain` as const,
  siteSettingsSeo: (siteId: string) => `/author/sites/${siteId}/settings/seo` as const,
  siteSettingsAnalytics: (siteId: string) => `/author/sites/${siteId}/settings/analytics` as const,
  siteSettingsComments: (siteId: string) => `/author/sites/${siteId}/settings/comments` as const,
  siteSettingsDanger: (siteId: string) => `/author/sites/${siteId}/settings/danger` as const,
} as const;

export const ADMIN_ROUTES = {
  dashboard: '/admin',
  users: '/admin/users',
  user: (id: string) => `/admin/users/${id}` as const,
  sites: '/admin/sites',
  site: (id: string) => `/admin/sites/${id}` as const,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────────────────────────────────────

export const API_ROUTES = {
  users: {
    me: '/users/me',
    profile: '/users/me/profile',
    avatar: '/users/me/avatar',
    preferences: '/users/me/preferences',
    security: '/users/me/security',
    loginHistory: '/users/me/security/login-history',
    forceLogout: '/users/me/security/force-logout',
    public: (username: string) => `/users/${username}` as const,
    publicById: (publicId: string) => `/users/id/${publicId}` as const,
  },
  admin: {
    users: '/admin/users',
    user: (userId: string) => `/admin/users/${userId}` as const,
    userStatus: (userId: string) => `/admin/users/${userId}/status` as const,
    userRole: (userId: string) => `/admin/users/${userId}/role` as const,
    impersonate: (userId: string) => `/admin/users/${userId}/impersonate` as const,
  },
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    logoutAll: '/auth/logout-all',
    refresh: '/auth/refresh',
    me: '/auth/me',
    sessions: '/auth/sessions',
    password: {
      forgot: '/auth/password/forgot',
      reset: '/auth/password/reset',
      change: '/auth/password/change',
      strength: '/auth/password/strength',
    },
    email: {
      verify: '/auth/email/verify',
      resend: '/auth/email/resend-verification',
      change: '/auth/email/change',
      confirmChange: '/auth/email/confirm-change',
    },
    mfa: {
      setup: '/auth/mfa/setup',
      setupVerify: '/auth/mfa/setup/verify',
      verify: '/auth/mfa/verify',
      disable: '/auth/mfa/disable',
      status: '/auth/mfa/status',
      regenerateCodes: '/auth/mfa/backup-codes/regenerate',
    },
    oauth: {
      providers: '/auth/oauth/providers',
      accounts: '/auth/oauth/accounts',
      init: (provider: string) => `/auth/oauth/${provider}` as const,
      link: (provider: string) => `/auth/oauth/${provider}/link` as const,
      unlink: (provider: string) => `/auth/oauth/${provider}/unlink` as const,
    },
  },
  sites: {
    list: '/sites',
    create: '/sites',
    detail: (siteId: string) => `/sites/${siteId}` as const,
    update: (siteId: string) => `/sites/${siteId}` as const,
    delete: (siteId: string) => `/sites/${siteId}` as const,
    settings: (siteId: string) => `/sites/${siteId}/settings` as const,
    pages: (siteId: string) => `/sites/${siteId}/pages` as const,
    series: (siteId: string) => `/sites/${siteId}/series` as const,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Route Helpers
// ─────────────────────────────────────────────────────────────────────────────

const authPathValues = Object.values(AUTH_ROUTES);

export function isAuthRoute(path: string): boolean {
  return authPathValues.some((p) => path.startsWith(p));
}

export function isAdminPath(path: string): boolean {
  return path.startsWith('/admin');
}

export function isAuthorPath(path: string): boolean {
  return path.startsWith('/author');
}

export function getDefaultRedirect(isAuthor: boolean): string {
  return isAuthor ? AUTHOR_ROUTES.dashboard : READER_ROUTES.dashboard;
}