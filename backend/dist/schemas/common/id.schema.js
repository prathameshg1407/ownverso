"use strict";
/**
 * ID Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteSeriesChapterParamsSchema = exports.SiteSeriesParamsSchema = exports.SiteIdParamSchema = exports.PublicIdParamSchema = exports.SlugParamSchema = exports.IdParamSchema = exports.SlugSchema = exports.BigIntIdSchema = exports.UuidSchema = exports.CuidSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
// Regex patterns as constants for reuse
const CUID_PATTERN = '^c[a-z0-9]{24}$';
const BIGINT_PATTERN = '^[0-9]+$';
const SLUG_PATTERN = '^[a-z0-9]+(?:-[a-z0-9]+)*$';
/**
 * CUID schema (used by Prisma)
 */
exports.CuidSchema = typebox_1.Type.String({
    pattern: CUID_PATTERN,
    description: 'CUID identifier',
    examples: ['clxyz1234567890abcdefghij'],
});
/**
 * UUID schema
 */
exports.UuidSchema = typebox_1.Type.String({
    format: 'uuid',
    description: 'UUID identifier',
    examples: ['550e8400-e29b-41d4-a716-446655440000'],
});
/**
 * BigInt ID schema (as string)
 */
exports.BigIntIdSchema = typebox_1.Type.String({
    pattern: BIGINT_PATTERN,
    description: 'BigInt identifier as string',
    examples: ['12345678901234567890'],
});
/**
 * Slug schema
 */
exports.SlugSchema = typebox_1.Type.String({
    pattern: SLUG_PATTERN,
    minLength: 1,
    maxLength: 100,
    description: 'URL-safe slug',
});
/**
 * ID parameter schema (CUID)
 */
exports.IdParamSchema = typebox_1.Type.Object({
    id: exports.CuidSchema,
});
/**
 * Slug parameter schema
 */
exports.SlugParamSchema = typebox_1.Type.Object({
    slug: exports.SlugSchema,
});
/**
 * Public ID parameter schema
 */
exports.PublicIdParamSchema = typebox_1.Type.Object({
    publicId: exports.CuidSchema,
});
/**
 * Site ID parameter
 */
exports.SiteIdParamSchema = typebox_1.Type.Object({
    siteId: exports.CuidSchema,
});
/**
 * Site ID and Series ID params
 */
exports.SiteSeriesParamsSchema = typebox_1.Type.Object({
    siteId: exports.CuidSchema,
    seriesId: exports.CuidSchema,
});
/**
 * Site ID, Series ID, and Chapter ID params
 */
exports.SiteSeriesChapterParamsSchema = typebox_1.Type.Object({
    siteId: exports.CuidSchema,
    seriesId: exports.CuidSchema,
    chapterId: exports.CuidSchema,
});
//# sourceMappingURL=id.schema.js.map