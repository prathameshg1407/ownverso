// ==== FILE: src/lib/validation/site.schema.ts ====
/**
 * Site Validation Schemas
 */

import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// Patterns
// ─────────────────────────────────────────────────────────────────────────────

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const DOMAIN_PATTERN = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

// ─────────────────────────────────────────────────────────────────────────────
// Shared Fields
// ─────────────────────────────────────────────────────────────────────────────

const slug = z
  .string()
  .min(1, 'Slug is required')
  .max(100, 'Slug must be less than 100 characters')
  .regex(SLUG_PATTERN, 'Slug can only contain lowercase letters, numbers, and hyphens');

const hexColor = z.string().regex(HEX_COLOR_PATTERN, 'Invalid hex color (e.g., #FF5733)').nullable().optional();

// ─────────────────────────────────────────────────────────────────────────────
// Site Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const createSiteSchema = z.object({
  name: z.string().min(1, 'Site name is required').max(100, 'Site name must be less than 100 characters'),
  slug,
  tagline: z.string().max(200, 'Tagline must be less than 200 characters').optional(),
  description: z.string().max(5000, 'Description must be less than 5000 characters').optional(),
});

export const updateSiteGeneralSchema = z.object({
  name: z.string().min(1, 'Site name is required').max(100, 'Site name must be less than 100 characters').optional(),
  slug: slug.optional(),
  tagline: z.string().max(200).nullable().optional(),
  description: z.string().max(5000).nullable().optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'MAINTENANCE']).optional(),
  isPublic: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
  maintenanceMessage: z.string().max(1000).nullable().optional(),
});

export const updateSiteBrandingSchema = z.object({
  logoUrl: z.string().url('Invalid URL').nullable().optional(),
  faviconUrl: z.string().url('Invalid URL').nullable().optional(),
  coverImageUrl: z.string().url('Invalid URL').nullable().optional(),
  primaryColor: hexColor,
  secondaryColor: hexColor,
  accentColor: hexColor,
});

export const updateSiteThemeSchema = z.object({
  themeId: z.string().nullable().optional(),
  customCssEnabled: z.boolean().optional(),
  customCss: z.string().max(50000, 'CSS too long').nullable().optional(),
});

export const updateSiteSeoSchema = z.object({
  metaTitle: z.string().max(60, 'Meta title must be less than 60 characters').nullable().optional(),
  metaDescription: z.string().max(160, 'Meta description must be less than 160 characters').nullable().optional(),
  ogImageUrl: z.string().url('Invalid URL').nullable().optional(),
});

export const updateSiteAnalyticsSchema = z.object({
  googleAnalyticsId: z.string().nullable().optional(),
  analyticsEnabled: z.boolean().optional(),
});

export const updateSiteCommentsSchema = z.object({
  commentsEnabled: z.boolean().optional(),
  commentsModerationMode: z.enum(['NONE', 'PRE_APPROVE', 'POST_APPROVE', 'TRUSTED_ONLY']).optional(),
});

export const addDomainSchema = z.object({
  customDomain: z
    .string()
    .min(4, 'Domain is required')
    .max(253, 'Domain too long')
    .regex(DOMAIN_PATTERN, 'Invalid domain format'),
});

// ─────────────────────────────────────────────────────────────────────────────
// Page Schemas
// ─────────────────────────────────────────────────────────────────────────────

export const createPageSchema = z.object({
  slug,
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  content: z.string().min(1, 'Content is required').max(100000, 'Content too long'),
  isPublished: z.boolean().optional(),
  showInNav: z.boolean().optional(),
  navLabel: z.string().max(30).optional(),
  navOrder: z.number().min(0).optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
});

export const updatePageSchema = createPageSchema.partial();

// ─────────────────────────────────────────────────────────────────────────────
// Collaborator Schemas
// ─────────────────────────────────────────────────────────────────────────────

const collaboratorRole = z.enum(['VIEWER', 'EDITOR', 'TRANSLATOR', 'ANALYST', 'MANAGER']);

export const inviteCollaboratorSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: collaboratorRole,
});

export const updateCollaboratorSchema = z.object({
  role: collaboratorRole.optional(),
  isActive: z.boolean().optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type CreateSiteFormData = z.infer<typeof createSiteSchema>;
export type UpdateSiteGeneralFormData = z.infer<typeof updateSiteGeneralSchema>;
export type UpdateSiteBrandingFormData = z.infer<typeof updateSiteBrandingSchema>;
export type UpdateSiteThemeFormData = z.infer<typeof updateSiteThemeSchema>;
export type UpdateSiteSeoFormData = z.infer<typeof updateSiteSeoSchema>;
export type UpdateSiteAnalyticsFormData = z.infer<typeof updateSiteAnalyticsSchema>;
export type UpdateSiteCommentsFormData = z.infer<typeof updateSiteCommentsSchema>;
export type AddDomainFormData = z.infer<typeof addDomainSchema>;
export type CreatePageFormData = z.infer<typeof createPageSchema>;
export type UpdatePageFormData = z.infer<typeof updatePageSchema>;
export type InviteCollaboratorFormData = z.infer<typeof inviteCollaboratorSchema>;
export type UpdateCollaboratorFormData = z.infer<typeof updateCollaboratorSchema>;