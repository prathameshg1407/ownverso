/**
 * Pagination DTOs
 */
/**
 * Pagination query parameters
 */
export interface PaginationQuery {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
/**
 * Validated pagination parameters
 */
export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
/**
 * Pagination metadata in response
 */
export interface PaginationMeta {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
    success: true;
    data: T[];
    meta: PaginationMeta;
}
/**
 * Parse and validate pagination query
 */
export declare function parsePaginationQuery(query: PaginationQuery, defaultSortBy?: string): PaginationParams;
/**
 * Create pagination metadata
 */
export declare function createPaginationMeta(page: number, limit: number, totalItems: number): PaginationMeta;
/**
 * Create paginated response
 */
export declare function createPaginatedResponse<T>(data: T[], page: number, limit: number, totalItems: number): PaginatedResponse<T>;
//# sourceMappingURL=pagination.dto.d.ts.map