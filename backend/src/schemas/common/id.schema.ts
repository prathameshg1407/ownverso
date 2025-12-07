/**
 * ID Schemas
 */

import { Type, Static } from '@sinclair/typebox';

// Regex patterns as constants for reuse
const CUID_PATTERN = '^c[a-z0-9]{24}$';
const BIGINT_PATTERN = '^[0-9]+$';
const SLUG_PATTERN = '^[a-z0-9]+(?:-[a-z0-9]+)*$';

/**
 * CUID schema (used by Prisma)
 */
export const CuidSchema = Type.String({
  pattern: CUID_PATTERN,
  description: 'CUID identifier',
  examples: ['clxyz1234567890abcdefghij'],
});

export type Cuid = Static<typeof CuidSchema>;

/**
 * UUID schema
 */
export const UuidSchema = Type.String({
  format: 'uuid',
  description: 'UUID identifier',
  examples: ['550e8400-e29b-41d4-a716-446655440000'],
});

export type Uuid = Static<typeof UuidSchema>;

/**
 * BigInt ID schema (as string)
 */
export const BigIntIdSchema = Type.String({
  pattern: BIGINT_PATTERN,
  description: 'BigInt identifier as string',
  examples: ['12345678901234567890'],
});

export type BigIntId = Static<typeof BigIntIdSchema>;

/**
 * Slug schema
 */
export const SlugSchema = Type.String({
  pattern: SLUG_PATTERN,
  minLength: 1,
  maxLength: 100,
  description: 'URL-safe slug',
});

export type Slug = Static<typeof SlugSchema>;

/**
 * ID parameter schema (CUID)
 */
export const IdParamSchema = Type.Object({
  id: CuidSchema,
});

export type IdParam = Static<typeof IdParamSchema>;

/**
 * Slug parameter schema
 */
export const SlugParamSchema = Type.Object({
  slug: SlugSchema,
});

export type SlugParam = Static<typeof SlugParamSchema>;

/**
 * Public ID parameter schema
 */
export const PublicIdParamSchema = Type.Object({
  publicId: CuidSchema,
});

export type PublicIdParam = Static<typeof PublicIdParamSchema>;

/**
 * Site ID parameter
 */
export const SiteIdParamSchema = Type.Object({
  siteId: CuidSchema,
});

export type SiteIdParam = Static<typeof SiteIdParamSchema>;

/**
 * Site ID and Series ID params
 */
export const SiteSeriesParamsSchema = Type.Object({
  siteId: CuidSchema,
  seriesId: CuidSchema,
});

export type SiteSeriesParams = Static<typeof SiteSeriesParamsSchema>;

/**
 * Site ID, Series ID, and Chapter ID params
 */
export const SiteSeriesChapterParamsSchema = Type.Object({
  siteId: CuidSchema,
  seriesId: CuidSchema,
  chapterId: CuidSchema,
});

export type SiteSeriesChapterParams = Static<typeof SiteSeriesChapterParamsSchema>;