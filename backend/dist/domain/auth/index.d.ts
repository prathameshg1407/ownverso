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
export type { AuthProvider, DeviceType, DeviceInfo, TokenPair, UserDTO, SessionDTO, CreateSessionInput, AuthAccountDTO, CreateAuthAccountInput, OAuthProfile, RegisterInput, LoginInput, LoginResult, MfaSetupResult, MfaStatusDTO, UserWithSecurity, MfaPendingData, } from './types/auth.types';
export { getProviderDisplayName, isSessionValid, isAuthAccountActive, shouldExtendSession, PROVIDER_DISPLAY_NAMES, } from './types/auth.types';
export { hashToken, generateToken, generateSessionId, maskIpAddress, secureCompare, } from './utils';
export { sessionMapper, authAccountMapper } from './mappers';
export { sessionRepository, authAccountRepository, type SessionRepository, type AuthAccountRepository, } from './repositories';
export { authService, passwordDomainService, emailVerificationService, mfaDomainService, sessionDomainService, oauthService, type AuthService, type PasswordDomainService, type EmailVerificationService, type MfaDomainService, type SessionDomainService, type OAuthService, } from './services';
//# sourceMappingURL=index.d.ts.map