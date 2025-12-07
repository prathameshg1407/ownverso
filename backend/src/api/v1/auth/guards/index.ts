// ==== FILE: src/api/v1/auth/guards/index.ts ====
/**
 * Auth Guards Index
 */

export { requireAuth, optionalAuth } from './auth.guard';
export { requireEmailVerified } from './email-verified.guard';
export {
  requireRoles,
  requireMinimumRole,
  requireAdmin,
  requireSuperAdmin,
  requireModerator,
  requireAuthor,
} from './roles.guard';
export {
  createRateLimitGuard,
  authRateLimitGuards,
  type RateLimitConfig,
} from './rate-limit.guard';