/**
 * Response Utilities
 */
import type { FastifyRequest, FastifyReply } from 'fastify';
export interface SuccessResponse<T> {
    success: true;
    data: T;
    timestamp: string;
    requestId: string;
}
export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}
export interface PaginatedResponse<T> extends SuccessResponse<T[]> {
    meta: PaginationMeta;
}
/**
 * Send standard success response
 */
export declare function sendSuccess<T>(reply: FastifyReply, request: FastifyRequest, data: T, statusCode?: number): void;
/**
 * Send message-only success response
 */
export declare function sendMessage(reply: FastifyReply, request: FastifyRequest, message: string, statusCode?: number): void;
/**
 * Send paginated response
 */
export declare function sendPaginated<T>(reply: FastifyReply, request: FastifyRequest, data: T[], page: number, limit: number, total: number, statusCode?: number): void;
/**
 * Send 204 No Content response
 */
export declare function sendNoContent(reply: FastifyReply): void;
//# sourceMappingURL=response.utils.d.ts.map