"use strict";
// ==== FILE: src/api/v1/auth/guards/index.ts ====
/**
 * Auth Guards Index
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRateLimitGuards = exports.createRateLimitGuard = exports.requireAuthor = exports.requireModerator = exports.requireSuperAdmin = exports.requireAdmin = exports.requireMinimumRole = exports.requireRoles = exports.requireEmailVerified = exports.optionalAuth = exports.requireAuth = void 0;
var auth_guard_1 = require("./auth.guard");
Object.defineProperty(exports, "requireAuth", { enumerable: true, get: function () { return auth_guard_1.requireAuth; } });
Object.defineProperty(exports, "optionalAuth", { enumerable: true, get: function () { return auth_guard_1.optionalAuth; } });
var email_verified_guard_1 = require("./email-verified.guard");
Object.defineProperty(exports, "requireEmailVerified", { enumerable: true, get: function () { return email_verified_guard_1.requireEmailVerified; } });
var roles_guard_1 = require("./roles.guard");
Object.defineProperty(exports, "requireRoles", { enumerable: true, get: function () { return roles_guard_1.requireRoles; } });
Object.defineProperty(exports, "requireMinimumRole", { enumerable: true, get: function () { return roles_guard_1.requireMinimumRole; } });
Object.defineProperty(exports, "requireAdmin", { enumerable: true, get: function () { return roles_guard_1.requireAdmin; } });
Object.defineProperty(exports, "requireSuperAdmin", { enumerable: true, get: function () { return roles_guard_1.requireSuperAdmin; } });
Object.defineProperty(exports, "requireModerator", { enumerable: true, get: function () { return roles_guard_1.requireModerator; } });
Object.defineProperty(exports, "requireAuthor", { enumerable: true, get: function () { return roles_guard_1.requireAuthor; } });
var rate_limit_guard_1 = require("./rate-limit.guard");
Object.defineProperty(exports, "createRateLimitGuard", { enumerable: true, get: function () { return rate_limit_guard_1.createRateLimitGuard; } });
Object.defineProperty(exports, "authRateLimitGuards", { enumerable: true, get: function () { return rate_limit_guard_1.authRateLimitGuards; } });
//# sourceMappingURL=index.js.map