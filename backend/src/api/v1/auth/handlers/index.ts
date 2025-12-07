// ==== FILE: src/api/v1/auth/handlers/index.ts ====
/**
 * Auth Handlers Barrel Export
 */

// Core handlers
export {
  registerHandler,
  loginHandler,
  logoutHandler,
  logoutAllHandler,
  refreshHandler,
  getMeHandler,
} from './core.handlers';

// Email handlers
export {
  verifyEmailHandler,
  resendVerificationHandler,
  requestEmailChangeHandler,
  confirmEmailChangeHandler,
} from './email.handlers';

// MFA handlers
export {
  mfaSetupInitHandler,
  mfaSetupVerifyHandler,
  mfaDisableHandler,
  mfaVerifyLoginHandler,
  mfaStatusHandler,
  mfaRegenerateCodesHandler,
} from './mfa.handlers';

// OAuth handlers
export {
  oauthProvidersHandler,
  oauthInitHandler,
  oauthCallbackHandler,
  oauthLinkHandler,
  oauthUnlinkHandler,
  oauthLinkedAccountsHandler,
} from './oauth.handlers';

// Password handlers
export {
  forgotPasswordHandler,
  resetPasswordHandler,
  changePasswordHandler,
  checkPasswordStrengthHandler,
} from './password.handlers';

// Session handlers
export {
  getSessionsHandler,
  revokeSessionHandler,
  revokeOtherSessionsHandler,
} from './session.handlers';