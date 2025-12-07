/**
 * Error Messages
 */

const ERROR_MESSAGES: Readonly<Record<string, string>> = {
  // General
  GEN_INTERNAL_ERROR: 'An unexpected error occurred. Please try again.',
  GEN_VALIDATION_ERROR: 'Please check your input and try again.',
  GEN_NOT_FOUND: 'The requested resource was not found.',
  GEN_FORBIDDEN: 'You do not have permission to perform this action.',
  GEN_UNAUTHORIZED: 'Please log in to continue.',
  GEN_RATE_LIMIT: 'Too many requests. Please wait a moment.',
  GEN_BAD_REQUEST: 'Invalid request. Please check your input.',

  // Auth
  AUTH_REQUIRED: 'Authentication is required.',
  AUTH_INVALID_CREDENTIALS: 'Invalid email/username or password.',
  AUTH_INVALID_TOKEN: 'Your session has expired. Please log in again.',
  AUTH_SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  AUTH_SESSION_INVALID: 'Your session is no longer valid.',
  AUTH_REFRESH_TOKEN_INVALID: 'Unable to refresh session. Please log in again.',
  AUTH_ACCOUNT_LOCKED: 'Your account has been temporarily locked.',
  AUTH_ACCOUNT_SUSPENDED: 'Your account has been suspended.',
  AUTH_ACCOUNT_BANNED: 'Your account has been banned.',
  AUTH_ACCOUNT_DELETED: 'This account no longer exists.',
  AUTH_EMAIL_NOT_VERIFIED: 'Please verify your email address.',
  AUTH_MFA_REQUIRED: 'Two-factor authentication is required.',
  AUTH_MFA_INVALID: 'Invalid verification code.',

  // User
  USER_NOT_FOUND: 'User not found.',
  USER_EMAIL_TAKEN: 'This email is already registered.',
  USER_USERNAME_TAKEN: 'This username is already taken.',
  USER_PASSWORD_TOO_WEAK: 'Password does not meet requirements.',
  USER_SAME_PASSWORD: 'New password must be different from current.',
  USER_INVALID_PASSWORD: 'Current password is incorrect.',

  // Token
  VERIFICATION_TOKEN_INVALID: 'This link is invalid or has expired.',
  VERIFICATION_TOKEN_EXPIRED: 'This link has expired. Please request a new one.',

  // Network
  NETWORK_ERROR: 'Unable to connect to the server.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
};

const HTTP_STATUS_MESSAGES: Readonly<Record<number, string>> = {
  400: 'Bad request',
  401: 'Please log in to continue',
  403: 'You do not have permission',
  404: 'Not found',
  409: 'Conflict with existing data',
  422: 'Validation error',
  429: 'Too many requests',
  500: 'Server error',
  502: 'Service unavailable',
  503: 'Service unavailable',
  504: 'Request timeout',
};

const DEFAULT_ERROR_MESSAGE = 'An unexpected error occurred.';
const DEFAULT_HTTP_STATUS_MESSAGE = 'An error occurred';

export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] ?? DEFAULT_ERROR_MESSAGE;
}

export function getHttpStatusMessage(status: number): string {
  return HTTP_STATUS_MESSAGES[status] ?? DEFAULT_HTTP_STATUS_MESSAGE;
}