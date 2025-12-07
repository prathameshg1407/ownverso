"use strict";
// ==== FILE: src/api/v1/auth/guards/roles.guard.ts ====
/**
 * Role-based Access Control Guards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuthor = exports.requireModerator = exports.requireSuperAdmin = exports.requireAdmin = void 0;
exports.requireRoles = requireRoles;
exports.requireMinimumRole = requireMinimumRole;
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const ROLE_HIERARCHY = [
    'READER',
    'AUTHOR',
    'COLLABORATOR',
    'MODERATOR',
    'ADMIN',
    'SUPER_ADMIN',
];
const ROLE_LEVELS = new Map(ROLE_HIERARCHY.map((role, index) => [role, index]));
function assertAuthenticated(request) {
    if (!request.user) {
        throw new http_errors_1.ForbiddenError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
}
function requireRoles(...allowedRoles) {
    const roleSet = new Set(allowedRoles);
    return async (request) => {
        assertAuthenticated(request);
        if (!roleSet.has(request.user.role)) {
            throw new http_errors_1.ForbiddenError('Insufficient permissions', error_codes_constants_1.ERROR_CODES.FORBIDDEN, {
                requiredRoles: allowedRoles,
                userRole: request.user.role,
            });
        }
    };
}
function requireMinimumRole(minimumRole) {
    const minimumLevel = ROLE_LEVELS.get(minimumRole) ?? -1;
    return async (request) => {
        assertAuthenticated(request);
        const userLevel = ROLE_LEVELS.get(request.user.role) ?? -1;
        if (userLevel < minimumLevel) {
            throw new http_errors_1.ForbiddenError('Insufficient permissions', error_codes_constants_1.ERROR_CODES.FORBIDDEN, {
                minimumRole,
                userRole: request.user.role,
            });
        }
    };
}
exports.requireAdmin = requireRoles('ADMIN', 'SUPER_ADMIN');
exports.requireSuperAdmin = requireRoles('SUPER_ADMIN');
exports.requireModerator = requireMinimumRole('MODERATOR');
exports.requireAuthor = requireMinimumRole('AUTHOR');
//# sourceMappingURL=roles.guard.js.map