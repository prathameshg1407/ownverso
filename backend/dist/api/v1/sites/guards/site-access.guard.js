"use strict";
// ==== FILE: src/api/v1/sites/guards/site-access.guard.ts ====
/**
 * Site Access Guards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSiteViewer = exports.requireSiteEditor = exports.requireSiteManager = exports.requireSiteAccess = exports.requireSiteOwner = void 0;
exports.requireSiteRole = requireSiteRole;
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const services_1 = require("../../../../domain/sites/services");
/**
 * Get site ID from request params
 */
function getSiteIdFromRequest(request) {
    const params = request.params;
    if (!params.siteId) {
        throw new http_errors_1.NotFoundError('Site ID is required', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
    }
    return params.siteId;
}
/**
 * Require user to be site owner
 */
const requireSiteOwner = async (request) => {
    if (!request.user) {
        throw new http_errors_1.ForbiddenError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    const siteId = getSiteIdFromRequest(request);
    const isOwner = await services_1.siteService.isOwner(siteId, request.user.id);
    if (!isOwner) {
        throw new http_errors_1.ForbiddenError('Only the site owner can perform this action', error_codes_constants_1.ERROR_CODES.FORBIDDEN);
    }
};
exports.requireSiteOwner = requireSiteOwner;
/**
 * Require user to have access to site (owner or collaborator)
 */
const requireSiteAccess = async (request) => {
    if (!request.user) {
        throw new http_errors_1.ForbiddenError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    const siteId = getSiteIdFromRequest(request);
    const canAccess = await services_1.siteService.canAccess(siteId, request.user.id);
    if (!canAccess) {
        throw new http_errors_1.ForbiddenError('You do not have access to this site', error_codes_constants_1.ERROR_CODES.FORBIDDEN);
    }
};
exports.requireSiteAccess = requireSiteAccess;
/**
 * Factory for requiring minimum collaborator role
 */
function requireSiteRole(minimumRole) {
    return async (request) => {
        if (!request.user) {
            throw new http_errors_1.ForbiddenError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
        }
        const siteId = getSiteIdFromRequest(request);
        // Check if owner first (owners have all permissions)
        const isOwner = await services_1.siteService.isOwner(siteId, request.user.id);
        if (isOwner)
            return;
        // Check collaborator role
        const hasRole = await services_1.collaboratorService.hasMinimumSiteRole(siteId, request.user.id, minimumRole);
        if (!hasRole) {
            throw new http_errors_1.ForbiddenError(`This action requires ${minimumRole} role or higher`, error_codes_constants_1.ERROR_CODES.FORBIDDEN);
        }
    };
}
// Pre-configured guards for common roles
exports.requireSiteManager = requireSiteRole('MANAGER');
exports.requireSiteEditor = requireSiteRole('EDITOR');
exports.requireSiteViewer = requireSiteRole('VIEWER');
//# sourceMappingURL=site-access.guard.js.map