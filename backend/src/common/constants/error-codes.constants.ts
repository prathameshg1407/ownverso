/**
 * Application Error Codes
 *
 * Standardized error codes for API responses.
 * Format: DOMAIN_ERROR_TYPE
 */

export const ERROR_CODES = {
  // ─────────────────────────────────────────────────────────────────────────
  // General Errors (GEN)
  // ─────────────────────────────────────────────────────────────────────────
  INTERNAL_ERROR: 'GEN_INTERNAL_ERROR',
  VALIDATION_ERROR: 'GEN_VALIDATION_ERROR',
  NOT_FOUND: 'GEN_NOT_FOUND',
  BAD_REQUEST: 'GEN_BAD_REQUEST',
  FORBIDDEN: 'GEN_FORBIDDEN',
  METHOD_NOT_ALLOWED: 'GEN_METHOD_NOT_ALLOWED',
  CONFLICT: 'GEN_CONFLICT',
  RATE_LIMITED: 'GEN_RATE_LIMITED',
  SERVICE_UNAVAILABLE: 'GEN_SERVICE_UNAVAILABLE',

  // ─────────────────────────────────────────────────────────────────────────
  // Authentication Errors (AUTH)
  // ─────────────────────────────────────────────────────────────────────────
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
  AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
  AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
  AUTH_TOKEN_REVOKED: 'AUTH_TOKEN_REVOKED',
  AUTH_REFRESH_TOKEN_INVALID: 'AUTH_REFRESH_TOKEN_INVALID',
  AUTH_REFRESH_TOKEN_EXPIRED: 'AUTH_REFRESH_TOKEN_EXPIRED',
  AUTH_SESSION_EXPIRED: 'AUTH_SESSION_EXPIRED',
  AUTH_SESSION_INVALID: 'AUTH_SESSION_INVALID',
  AUTH_MFA_REQUIRED: 'AUTH_MFA_REQUIRED',
  AUTH_MFA_INVALID: 'AUTH_MFA_INVALID',
  AUTH_EMAIL_NOT_VERIFIED: 'AUTH_EMAIL_NOT_VERIFIED',
  AUTH_ACCOUNT_LOCKED: 'AUTH_ACCOUNT_LOCKED',
  AUTH_ACCOUNT_SUSPENDED: 'AUTH_ACCOUNT_SUSPENDED',
  AUTH_ACCOUNT_BANNED: 'AUTH_ACCOUNT_BANNED',
  AUTH_ACCOUNT_DELETED: 'AUTH_ACCOUNT_DELETED',

  // ─────────────────────────────────────────────────────────────────────────
  // User Errors (USER)
  // ─────────────────────────────────────────────────────────────────────────
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS',
  USER_EMAIL_TAKEN: 'USER_EMAIL_TAKEN',
  USER_USERNAME_TAKEN: 'USER_USERNAME_TAKEN',
  USER_INVALID_PASSWORD: 'USER_INVALID_PASSWORD',
  USER_PASSWORD_TOO_WEAK: 'USER_PASSWORD_TOO_WEAK',
  USER_SAME_PASSWORD: 'USER_SAME_PASSWORD',
  USER_PROFILE_INCOMPLETE: 'USER_PROFILE_INCOMPLETE',
  USER_PROFILE_NOT_FOUND: 'USER_PROFILE_NOT_FOUND',
  USER_PREFERENCES_NOT_FOUND: 'USER_PREFERENCES_NOT_FOUND',
  USER_AVATAR_UPLOAD_FAILED: 'USER_AVATAR_UPLOAD_FAILED',
  USER_CANNOT_DELETE_SELF: 'USER_CANNOT_DELETE_SELF',
  USER_DELETION_IN_PROGRESS: 'USER_DELETION_IN_PROGRESS',

  // ─────────────────────────────────────────────────────────────────────────
  // Author Errors (AUTHOR)
  // ─────────────────────────────────────────────────────────────────────────
  AUTHOR_NOT_FOUND: 'AUTHOR_NOT_FOUND',
  AUTHOR_ALREADY_EXISTS: 'AUTHOR_ALREADY_EXISTS',

  // ─────────────────────────────────────────────────────────────────────────
  // Site Errors (SITE)
  // ─────────────────────────────────────────────────────────────────────────
  SITE_NOT_FOUND: 'SITE_NOT_FOUND',
  SITE_SLUG_TAKEN: 'SITE_SLUG_TAKEN',
  SITE_LIMIT_REACHED: 'SITE_LIMIT_REACHED',
  SITE_SUSPENDED: 'SITE_SUSPENDED',
  SITE_DOMAIN_INVALID: 'SITE_DOMAIN_INVALID',
  SITE_DOMAIN_NOT_VERIFIED: 'SITE_DOMAIN_NOT_VERIFIED',

  // ─────────────────────────────────────────────────────────────────────────
  // Page Errors (PAGE)
  // ─────────────────────────────────────────────────────────────────────────
  PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
  PAGE_SLUG_TAKEN: 'PAGE_SLUG_TAKEN',

  // ─────────────────────────────────────────────────────────────────────────
  // Collaborator / Invitation Errors (COLLAB)
  // ─────────────────────────────────────────────────────────────────────────
  COLLABORATOR_NOT_FOUND: 'COLLABORATOR_NOT_FOUND',
  COLLABORATOR_ALREADY_EXISTS: 'COLLABORATOR_ALREADY_EXISTS',
  INVITE_NOT_FOUND: 'INVITE_NOT_FOUND',
  INVITE_EXPIRED: 'INVITE_EXPIRED',

  // ─────────────────────────────────────────────────────────────────────────
  // Domain Errors (DOMAIN)
  // ─────────────────────────────────────────────────────────────────────────
  DOMAIN_ALREADY_EXISTS: 'DOMAIN_ALREADY_EXISTS',
  DOMAIN_VERIFICATION_FAILED: 'DOMAIN_VERIFICATION_FAILED',

  // ─────────────────────────────────────────────────────────────────────────
  // Content Errors (CONTENT)
  // ─────────────────────────────────────────────────────────────────────────
  SERIES_NOT_FOUND: 'CONTENT_SERIES_NOT_FOUND',
  SERIES_SLUG_TAKEN: 'CONTENT_SERIES_SLUG_TAKEN',
  SERIES_LIMIT_REACHED: 'CONTENT_SERIES_LIMIT_REACHED',
  CHAPTER_NOT_FOUND: 'CONTENT_CHAPTER_NOT_FOUND',
  CHAPTER_SLUG_TAKEN: 'CONTENT_CHAPTER_SLUG_TAKEN',
  CHAPTER_LIMIT_REACHED: 'CONTENT_CHAPTER_LIMIT_REACHED',
  CHAPTER_ACCESS_DENIED: 'CONTENT_CHAPTER_ACCESS_DENIED',
  CHAPTER_NOT_PUBLISHED: 'CONTENT_CHAPTER_NOT_PUBLISHED',

  // ─────────────────────────────────────────────────────────────────────────
  // Tier / Subscription Plan Errors (TIER)
  // ─────────────────────────────────────────────────────────────────────────
  TIER_REQUIRED: 'TIER_REQUIRED',
  TIER_LIMIT_REACHED: 'TIER_LIMIT_REACHED',

  // ─────────────────────────────────────────────────────────────────────────
  // Subscription Errors (SUB)
  // ─────────────────────────────────────────────────────────────────────────
  SUBSCRIPTION_NOT_FOUND: 'SUB_NOT_FOUND',
  SUBSCRIPTION_ALREADY_EXISTS: 'SUB_ALREADY_EXISTS',
  SUBSCRIPTION_EXPIRED: 'SUB_EXPIRED',
  SUBSCRIPTION_CANCELLED: 'SUB_CANCELLED',
  SUBSCRIPTION_TIER_NOT_FOUND: 'SUB_TIER_NOT_FOUND',
  SUBSCRIPTION_TIER_UNAVAILABLE: 'SUB_TIER_UNAVAILABLE',
  SUBSCRIPTION_UPGRADE_FAILED: 'SUB_UPGRADE_FAILED',
  SUBSCRIPTION_DOWNGRADE_FAILED: 'SUB_DOWNGRADE_FAILED',

  // ─────────────────────────────────────────────────────────────────────────
  // Payment Errors (PAY)
  // ─────────────────────────────────────────────────────────────────────────
  PAYMENT_FAILED: 'PAY_FAILED',
  PAYMENT_DECLINED: 'PAY_DECLINED',
  PAYMENT_EXPIRED: 'PAY_EXPIRED',
  PAYMENT_NOT_FOUND: 'PAY_NOT_FOUND',
  PAYMENT_ALREADY_PROCESSED: 'PAY_ALREADY_PROCESSED',
  PAYMENT_REFUND_FAILED: 'PAY_REFUND_FAILED',
  PAYMENT_METHOD_INVALID: 'PAY_METHOD_INVALID',
  PAYMENT_GATEWAY_ERROR: 'PAY_GATEWAY_ERROR',
  PAYMENT_WEBHOOK_INVALID: 'PAY_WEBHOOK_INVALID',

  // ─────────────────────────────────────────────────────────────────────────
  // File/Media Errors (FILE)
  // ─────────────────────────────────────────────────────────────────────────
  FILE_NOT_FOUND: 'FILE_NOT_FOUND',
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  FILE_TYPE_NOT_ALLOWED: 'FILE_TYPE_NOT_ALLOWED',
  FILE_UPLOAD_FAILED: 'FILE_UPLOAD_FAILED',
  FILE_PROCESSING_FAILED: 'FILE_PROCESSING_FAILED',
  STORAGE_LIMIT_REACHED: 'FILE_STORAGE_LIMIT_REACHED',

  // ─────────────────────────────────────────────────────────────────────────
  // API Key Errors (API)
  // ─────────────────────────────────────────────────────────────────────────
  API_KEY_INVALID: 'API_KEY_INVALID',
  API_KEY_EXPIRED: 'API_KEY_EXPIRED',
  API_KEY_REVOKED: 'API_KEY_REVOKED',
  API_KEY_RATE_LIMITED: 'API_KEY_RATE_LIMITED',
  API_KEY_PERMISSION_DENIED: 'API_KEY_PERMISSION_DENIED',

  // ─────────────────────────────────────────────────────────────────────────
  // Verification Errors (VER)
  // ─────────────────────────────────────────────────────────────────────────
  VERIFICATION_TOKEN_INVALID: 'VER_TOKEN_INVALID',
  VERIFICATION_TOKEN_EXPIRED: 'VER_TOKEN_EXPIRED',
  VERIFICATION_TOKEN_USED: 'VER_TOKEN_USED',
  VERIFICATION_EMAIL_FAILED: 'VER_EMAIL_FAILED',

  // ─────────────────────────────────────────────────────────────────────────
  // External Service Errors (EXT)
  // ─────────────────────────────────────────────────────────────────────────
  EXTERNAL_SERVICE_ERROR: 'EXT_SERVICE_ERROR',
  EXTERNAL_SERVICE_TIMEOUT: 'EXT_SERVICE_TIMEOUT',
  EXTERNAL_SERVICE_UNAVAILABLE: 'EXT_SERVICE_UNAVAILABLE',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
