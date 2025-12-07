"use strict";
// ==== FILE: src/domain/sites/entities/site.entity.ts ====
/**
 * Site Entity Types and Helpers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLLABORATOR_ROLE_LEVELS = exports.SITE_STATUS_NAMES = void 0;
exports.isPubliclyAccessible = isPubliclyAccessible;
exports.canEdit = canEdit;
exports.hasMinimumRole = hasMinimumRole;
exports.isValidSlug = isValidSlug;
exports.isValidHexColor = isValidHexColor;
exports.isValidDomain = isValidDomain;
/**
 * Site status display names
 */
exports.SITE_STATUS_NAMES = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    MAINTENANCE: 'Maintenance',
    SUSPENDED: 'Suspended',
    DELETED: 'Deleted',
};
/**
 * Collaborator role hierarchy (higher = more permissions)
 */
exports.COLLABORATOR_ROLE_LEVELS = {
    VIEWER: 0,
    EDITOR: 1,
    TRANSLATOR: 2,
    ANALYST: 3,
    MANAGER: 4,
    OWNER: 5,
};
/**
 * Check if site is accessible to public
 */
function isPubliclyAccessible(site) {
    return site.status === 'ACTIVE' && site.isPublic && !site.maintenanceMode;
}
/**
 * Check if site can be edited
 */
function canEdit(site) {
    return site.status !== 'DELETED' && site.status !== 'SUSPENDED';
}
/**
 * Check if role has at least minimum level
 */
function hasMinimumRole(role, minimumRole) {
    return exports.COLLABORATOR_ROLE_LEVELS[role] >= exports.COLLABORATOR_ROLE_LEVELS[minimumRole];
}
/**
 * Validate slug format
 */
function isValidSlug(slug) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}
/**
 * Validate hex color
 */
function isValidHexColor(color) {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
}
/**
 * Validate domain format
 */
function isValidDomain(domain) {
    return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain);
}
//# sourceMappingURL=site.entity.js.map