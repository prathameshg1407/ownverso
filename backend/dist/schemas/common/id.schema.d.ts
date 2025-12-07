/**
 * ID Schemas
 */
import { Static } from '@sinclair/typebox';
/**
 * CUID schema (used by Prisma)
 */
export declare const CuidSchema: import("@sinclair/typebox").TString;
export type Cuid = Static<typeof CuidSchema>;
/**
 * UUID schema
 */
export declare const UuidSchema: import("@sinclair/typebox").TString;
export type Uuid = Static<typeof UuidSchema>;
/**
 * BigInt ID schema (as string)
 */
export declare const BigIntIdSchema: import("@sinclair/typebox").TString;
export type BigIntId = Static<typeof BigIntIdSchema>;
/**
 * Slug schema
 */
export declare const SlugSchema: import("@sinclair/typebox").TString;
export type Slug = Static<typeof SlugSchema>;
/**
 * ID parameter schema (CUID)
 */
export declare const IdParamSchema: import("@sinclair/typebox").TObject<{
    id: import("@sinclair/typebox").TString;
}>;
export type IdParam = Static<typeof IdParamSchema>;
/**
 * Slug parameter schema
 */
export declare const SlugParamSchema: import("@sinclair/typebox").TObject<{
    slug: import("@sinclair/typebox").TString;
}>;
export type SlugParam = Static<typeof SlugParamSchema>;
/**
 * Public ID parameter schema
 */
export declare const PublicIdParamSchema: import("@sinclair/typebox").TObject<{
    publicId: import("@sinclair/typebox").TString;
}>;
export type PublicIdParam = Static<typeof PublicIdParamSchema>;
/**
 * Site ID parameter
 */
export declare const SiteIdParamSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
}>;
export type SiteIdParam = Static<typeof SiteIdParamSchema>;
/**
 * Site ID and Series ID params
 */
export declare const SiteSeriesParamsSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
    seriesId: import("@sinclair/typebox").TString;
}>;
export type SiteSeriesParams = Static<typeof SiteSeriesParamsSchema>;
/**
 * Site ID, Series ID, and Chapter ID params
 */
export declare const SiteSeriesChapterParamsSchema: import("@sinclair/typebox").TObject<{
    siteId: import("@sinclair/typebox").TString;
    seriesId: import("@sinclair/typebox").TString;
    chapterId: import("@sinclair/typebox").TString;
}>;
export type SiteSeriesChapterParams = Static<typeof SiteSeriesChapterParamsSchema>;
//# sourceMappingURL=id.schema.d.ts.map