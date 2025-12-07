/**
 * Response Interfaces
 */
/**
 * Base API response
 */
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    timestamp: string;
    requestId?: string;
}
/**
 * Success response
 */
export interface SuccessResponse<T = unknown> extends ApiResponse<T> {
    success: true;
    data: T;
}
/**
 * Error response
 */
export interface ErrorResponse extends ApiResponse<never> {
    success: false;
    error: {
        code: string;
        message: string;
        statusCode: number;
        details?: Record<string, unknown>;
    };
}
/**
 * List response with items
 */
export interface ListResponse<T> extends SuccessResponse<T[]> {
    meta?: {
        total?: number;
        count: number;
    };
}
/**
 * Health check response
 */
export interface HealthCheckResponse {
    status: 'healthy' | 'degraded' | 'unhealthy';
    timestamp: string;
    version: string;
    uptime: number;
    checks?: Record<string, {
        status: 'up' | 'down';
        latency?: number;
        message?: string;
    }>;
}
/**
 * Create success response helper
 */
export declare function createSuccessResponse<T>(data: T, requestId?: string): SuccessResponse<T>;
/**
 * Create message response helper
 */
export declare function createMessageResponse(message: string, requestId?: string): ApiResponse<never> & {
    success: true;
    message: string;
};
/**
 * Create list response helper
 */
export declare function createListResponse<T>(items: T[], total?: number, requestId?: string): ListResponse<T>;
/**
 * Create error response helper
 */
export declare function createErrorResponse(code: string, message: string, statusCode: number, details?: Record<string, unknown>, requestId?: string): ErrorResponse;
//# sourceMappingURL=response.interface.d.ts.map