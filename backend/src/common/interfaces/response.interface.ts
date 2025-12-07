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
  checks?: Record<
    string,
    {
      status: 'up' | 'down';
      latency?: number;
      message?: string;
    }
  >;
}

/**
 * Create success response helper
 */
export function createSuccessResponse<T>(
  data: T,
  requestId?: string
): SuccessResponse<T> {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Create message response helper
 */
export function createMessageResponse(
  message: string,
  requestId?: string
): ApiResponse<never> & { success: true; message: string } {
  return {
    success: true,
    message,
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Create list response helper
 */
export function createListResponse<T>(
  items: T[],
  total?: number,
  requestId?: string
): ListResponse<T> {
  return {
    success: true,
    data: items,
    meta: {
      count: items.length,
      total,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}

/**
 * Create error response helper
 */
export function createErrorResponse(
  code: string,
  message: string,
  statusCode: number,
  details?: Record<string, unknown>,
  requestId?: string
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      statusCode,
      details,
    },
    timestamp: new Date().toISOString(),
    requestId,
  };
}