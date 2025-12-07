"use strict";
// ==== FILE: src/api/v1/auth/handlers/index.ts ====
/**
 * Auth Handlers Barrel Export
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokeOtherSessionsHandler = exports.revokeSessionHandler = exports.getSessionsHandler = exports.checkPasswordStrengthHandler = exports.changePasswordHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.oauthLinkedAccountsHandler = exports.oauthUnlinkHandler = exports.oauthLinkHandler = exports.oauthCallbackHandler = exports.oauthInitHandler = exports.oauthProvidersHandler = exports.mfaRegenerateCodesHandler = exports.mfaStatusHandler = exports.mfaVerifyLoginHandler = exports.mfaDisableHandler = exports.mfaSetupVerifyHandler = exports.mfaSetupInitHandler = exports.confirmEmailChangeHandler = exports.requestEmailChangeHandler = exports.resendVerificationHandler = exports.verifyEmailHandler = exports.getMeHandler = exports.refreshHandler = exports.logoutAllHandler = exports.logoutHandler = exports.loginHandler = exports.registerHandler = void 0;
// Core handlers
var core_handlers_1 = require("./core.handlers");
Object.defineProperty(exports, "registerHandler", { enumerable: true, get: function () { return core_handlers_1.registerHandler; } });
Object.defineProperty(exports, "loginHandler", { enumerable: true, get: function () { return core_handlers_1.loginHandler; } });
Object.defineProperty(exports, "logoutHandler", { enumerable: true, get: function () { return core_handlers_1.logoutHandler; } });
Object.defineProperty(exports, "logoutAllHandler", { enumerable: true, get: function () { return core_handlers_1.logoutAllHandler; } });
Object.defineProperty(exports, "refreshHandler", { enumerable: true, get: function () { return core_handlers_1.refreshHandler; } });
Object.defineProperty(exports, "getMeHandler", { enumerable: true, get: function () { return core_handlers_1.getMeHandler; } });
// Email handlers
var email_handlers_1 = require("./email.handlers");
Object.defineProperty(exports, "verifyEmailHandler", { enumerable: true, get: function () { return email_handlers_1.verifyEmailHandler; } });
Object.defineProperty(exports, "resendVerificationHandler", { enumerable: true, get: function () { return email_handlers_1.resendVerificationHandler; } });
Object.defineProperty(exports, "requestEmailChangeHandler", { enumerable: true, get: function () { return email_handlers_1.requestEmailChangeHandler; } });
Object.defineProperty(exports, "confirmEmailChangeHandler", { enumerable: true, get: function () { return email_handlers_1.confirmEmailChangeHandler; } });
// MFA handlers
var mfa_handlers_1 = require("./mfa.handlers");
Object.defineProperty(exports, "mfaSetupInitHandler", { enumerable: true, get: function () { return mfa_handlers_1.mfaSetupInitHandler; } });
Object.defineProperty(exports, "mfaSetupVerifyHandler", { enumerable: true, get: function () { return mfa_handlers_1.mfaSetupVerifyHandler; } });
Object.defineProperty(exports, "mfaDisableHandler", { enumerable: true, get: function () { return mfa_handlers_1.mfaDisableHandler; } });
Object.defineProperty(exports, "mfaVerifyLoginHandler", { enumerable: true, get: function () { return mfa_handlers_1.mfaVerifyLoginHandler; } });
Object.defineProperty(exports, "mfaStatusHandler", { enumerable: true, get: function () { return mfa_handlers_1.mfaStatusHandler; } });
Object.defineProperty(exports, "mfaRegenerateCodesHandler", { enumerable: true, get: function () { return mfa_handlers_1.mfaRegenerateCodesHandler; } });
// OAuth handlers
var oauth_handlers_1 = require("./oauth.handlers");
Object.defineProperty(exports, "oauthProvidersHandler", { enumerable: true, get: function () { return oauth_handlers_1.oauthProvidersHandler; } });
Object.defineProperty(exports, "oauthInitHandler", { enumerable: true, get: function () { return oauth_handlers_1.oauthInitHandler; } });
Object.defineProperty(exports, "oauthCallbackHandler", { enumerable: true, get: function () { return oauth_handlers_1.oauthCallbackHandler; } });
Object.defineProperty(exports, "oauthLinkHandler", { enumerable: true, get: function () { return oauth_handlers_1.oauthLinkHandler; } });
Object.defineProperty(exports, "oauthUnlinkHandler", { enumerable: true, get: function () { return oauth_handlers_1.oauthUnlinkHandler; } });
Object.defineProperty(exports, "oauthLinkedAccountsHandler", { enumerable: true, get: function () { return oauth_handlers_1.oauthLinkedAccountsHandler; } });
// Password handlers
var password_handlers_1 = require("./password.handlers");
Object.defineProperty(exports, "forgotPasswordHandler", { enumerable: true, get: function () { return password_handlers_1.forgotPasswordHandler; } });
Object.defineProperty(exports, "resetPasswordHandler", { enumerable: true, get: function () { return password_handlers_1.resetPasswordHandler; } });
Object.defineProperty(exports, "changePasswordHandler", { enumerable: true, get: function () { return password_handlers_1.changePasswordHandler; } });
Object.defineProperty(exports, "checkPasswordStrengthHandler", { enumerable: true, get: function () { return password_handlers_1.checkPasswordStrengthHandler; } });
// Session handlers
var session_handlers_1 = require("./session.handlers");
Object.defineProperty(exports, "getSessionsHandler", { enumerable: true, get: function () { return session_handlers_1.getSessionsHandler; } });
Object.defineProperty(exports, "revokeSessionHandler", { enumerable: true, get: function () { return session_handlers_1.revokeSessionHandler; } });
Object.defineProperty(exports, "revokeOtherSessionsHandler", { enumerable: true, get: function () { return session_handlers_1.revokeOtherSessionsHandler; } });
//# sourceMappingURL=index.js.map