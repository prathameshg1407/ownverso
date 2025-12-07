"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthService = exports.sessionDomainService = exports.mfaDomainService = exports.emailVerificationService = exports.passwordDomainService = exports.authService = exports.authAccountRepository = exports.sessionRepository = exports.authAccountMapper = exports.sessionMapper = exports.secureCompare = exports.maskIpAddress = exports.generateSessionId = exports.generateToken = exports.hashToken = exports.PROVIDER_DISPLAY_NAMES = exports.shouldExtendSession = exports.isAuthAccountActive = exports.isSessionValid = exports.getProviderDisplayName = void 0;
var auth_types_1 = require("./types/auth.types");
// Utility functions
Object.defineProperty(exports, "getProviderDisplayName", { enumerable: true, get: function () { return auth_types_1.getProviderDisplayName; } });
Object.defineProperty(exports, "isSessionValid", { enumerable: true, get: function () { return auth_types_1.isSessionValid; } });
Object.defineProperty(exports, "isAuthAccountActive", { enumerable: true, get: function () { return auth_types_1.isAuthAccountActive; } });
Object.defineProperty(exports, "shouldExtendSession", { enumerable: true, get: function () { return auth_types_1.shouldExtendSession; } });
// Constants
Object.defineProperty(exports, "PROVIDER_DISPLAY_NAMES", { enumerable: true, get: function () { return auth_types_1.PROVIDER_DISPLAY_NAMES; } });
// Utils
var utils_1 = require("./utils");
Object.defineProperty(exports, "hashToken", { enumerable: true, get: function () { return utils_1.hashToken; } });
Object.defineProperty(exports, "generateToken", { enumerable: true, get: function () { return utils_1.generateToken; } });
Object.defineProperty(exports, "generateSessionId", { enumerable: true, get: function () { return utils_1.generateSessionId; } });
Object.defineProperty(exports, "maskIpAddress", { enumerable: true, get: function () { return utils_1.maskIpAddress; } });
Object.defineProperty(exports, "secureCompare", { enumerable: true, get: function () { return utils_1.secureCompare; } });
// Mappers
var mappers_1 = require("./mappers");
Object.defineProperty(exports, "sessionMapper", { enumerable: true, get: function () { return mappers_1.sessionMapper; } });
Object.defineProperty(exports, "authAccountMapper", { enumerable: true, get: function () { return mappers_1.authAccountMapper; } });
// Repositories
var repositories_1 = require("./repositories");
Object.defineProperty(exports, "sessionRepository", { enumerable: true, get: function () { return repositories_1.sessionRepository; } });
Object.defineProperty(exports, "authAccountRepository", { enumerable: true, get: function () { return repositories_1.authAccountRepository; } });
// Services
var services_1 = require("./services");
Object.defineProperty(exports, "authService", { enumerable: true, get: function () { return services_1.authService; } });
Object.defineProperty(exports, "passwordDomainService", { enumerable: true, get: function () { return services_1.passwordDomainService; } });
Object.defineProperty(exports, "emailVerificationService", { enumerable: true, get: function () { return services_1.emailVerificationService; } });
Object.defineProperty(exports, "mfaDomainService", { enumerable: true, get: function () { return services_1.mfaDomainService; } });
Object.defineProperty(exports, "sessionDomainService", { enumerable: true, get: function () { return services_1.sessionDomainService; } });
Object.defineProperty(exports, "oauthService", { enumerable: true, get: function () { return services_1.oauthService; } });
//# sourceMappingURL=index.js.map