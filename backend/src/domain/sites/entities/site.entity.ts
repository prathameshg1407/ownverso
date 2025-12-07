// ==== FILE: src/domain/sites/entities/site.entity.ts ====
/**
 * Site Entity Types and Helpers
 */

import type { Site, SiteStatus, CollaboratorRole } from '@prisma/client';

/**
 * Site status display names
 */
export const SITE_STATUS_NAMES: Record<SiteStatus, string> = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  MAINTENANCE: 'Maintenance',
  SUSPENDED: 'Suspended',
  DELETED: 'Deleted',
};

/**
 * Collaborator role hierarchy (higher = more permissions)
 */
export const COLLABORATOR_ROLE_LEVELS: Record<CollaboratorRole, number> = {
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
export function isPubliclyAccessible(site: Site): boolean {
  return site.status === 'ACTIVE' && site.isPublic && !site.maintenanceMode;
}

/**
 * Check if site can be edited
 */
export function canEdit(site: Site): boolean {
  return site.status !== 'DELETED' && site.status !== 'SUSPENDED';
}

/**
 * Check if role has at least minimum level
 */
export function hasMinimumRole(
  role: CollaboratorRole,
  minimumRole: CollaboratorRole
): boolean {
  return COLLABORATOR_ROLE_LEVELS[role] >= COLLABORATOR_ROLE_LEVELS[minimumRole];
}

/**
 * Validate slug format
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

/**
 * Validate hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

/**
 * Validate domain format
 */
export function isValidDomain(domain: string): boolean {
  return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain);
}