// ==== FILE: src/domain/auth/index.ts ====
/**
 * Auth Domain - Public API
 * 
 * This module provides comprehensive authentication functionality including:
 * - User registration and login
 * - Session management
 * - OAuth/social login
 * - Multi-factor authentication (MFA)
 * - Password management
 * - Email verification
 */

// Types
export type {
  // Core types
  AuthProvider,
  DeviceType,
  DeviceInfo,
  TokenPair,
  UserDTO,
  
  // Session types
  SessionDTO,
  CreateSessionInput,
  
  // Auth account types
  AuthAccountDTO,
  CreateAuthAccountInput,
  OAuthProfile,
  
  // Auth flow types
  RegisterInput,
  LoginInput,
  LoginResult,
  
  // MFA types
  MfaSetupResult,
  MfaStatusDTO,
  
  // Internal types (for advanced usage)
  UserWithSecurity,
  MfaPendingData,
} from './types/auth.types';

export {
  // Utility functions
  getProviderDisplayName,
  isSessionValid,
  isAuthAccountActive,
  shouldExtendSession,
  
  // Constants
  PROVIDER_DISPLAY_NAMES,
} from './types/auth.types';

// Utils
export {
  hashToken,
  generateToken,
  generateSessionId,
  maskIpAddress,
  secureCompare,
} from './utils';

// Mappers
export { sessionMapper, authAccountMapper } from './mappers';

// Repositories
export {
  sessionRepository,
  authAccountRepository,
  type SessionRepository,
  type AuthAccountRepository,
} from './repositories';

// Services
export {
  authService,
  passwordDomainService,
  emailVerificationService,
  mfaDomainService,
  sessionDomainService,
  oauthService,
  type AuthService,
  type PasswordDomainService,
  type EmailVerificationService,
  type MfaDomainService,
  type SessionDomainService,
  type OAuthService,
} from './services';