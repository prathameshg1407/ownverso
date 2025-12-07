/**
 * Site Entity Types and Helpers
 */
import type { Site, SiteStatus, CollaboratorRole } from '@prisma/client';
/**
 * Site status display names
 */
export declare const SITE_STATUS_NAMES: Record<SiteStatus, string>;
/**
 * Collaborator role hierarchy (higher = more permissions)
 */
export declare const COLLABORATOR_ROLE_LEVELS: Record<CollaboratorRole, number>;
/**
 * Check if site is accessible to public
 */
export declare function isPubliclyAccessible(site: Site): boolean;
/**
 * Check if site can be edited
 */
export declare function canEdit(site: Site): boolean;
/**
 * Check if role has at least minimum level
 */
export declare function hasMinimumRole(role: CollaboratorRole, minimumRole: CollaboratorRole): boolean;
/**
 * Validate slug format
 */
export declare function isValidSlug(slug: string): boolean;
/**
 * Validate hex color
 */
export declare function isValidHexColor(color: string): boolean;
/**
 * Validate domain format
 */
export declare function isValidDomain(domain: string): boolean;
//# sourceMappingURL=site.entity.d.ts.map