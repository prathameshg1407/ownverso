/**
 * Pagination Schemas
 */
import { Static, TSchema } from '@sinclair/typebox';
/**
 * Sort order enum
 */
export declare const SortOrderSchema: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"asc">, import("@sinclair/typebox").TLiteral<"desc">]>;
export type SortOrder = Static<typeof SortOrderSchema>;
/**
 * Pagination query schema
 */
export declare const PaginationQuerySchema: import("@sinclair/typebox").TObject<{
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    sortBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sortOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"asc">, import("@sinclair/typebox").TLiteral<"desc">]>>;
}>;
export type PaginationQuery = Static<typeof PaginationQuerySchema>;
/**
 * Pagination meta schema
 */
export declare const PaginationMetaSchema: import("@sinclair/typebox").TObject<{
    page: import("@sinclair/typebox").TInteger;
    limit: import("@sinclair/typebox").TInteger;
    totalItems: import("@sinclair/typebox").TInteger;
    totalPages: import("@sinclair/typebox").TInteger;
    hasNextPage: import("@sinclair/typebox").TBoolean;
    hasPreviousPage: import("@sinclair/typebox").TBoolean;
}>;
export type PaginationMeta = Static<typeof PaginationMetaSchema>;
/**
 * Create paginated response schema
 */
export declare function createPaginatedResponseSchema<T extends TSchema>(itemSchema: T): import("@sinclair/typebox").TObject<{
    success: import("@sinclair/typebox").TLiteral<true>;
    data: import("@sinclair/typebox").TArray<T>;
    meta: import("@sinclair/typebox").TObject<{
        page: import("@sinclair/typebox").TInteger;
        limit: import("@sinclair/typebox").TInteger;
        totalItems: import("@sinclair/typebox").TInteger;
        totalPages: import("@sinclair/typebox").TInteger;
        hasNextPage: import("@sinclair/typebox").TBoolean;
        hasPreviousPage: import("@sinclair/typebox").TBoolean;
    }>;
    timestamp: import("@sinclair/typebox").TString;
    requestId: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
/**
 * Infer paginated response type
 */
export type PaginatedResponse<T> = {
    success: true;
    data: T[];
    meta: PaginationMeta;
    timestamp: string;
    requestId?: string;
};
//# sourceMappingURL=pagination.schema.d.ts.map