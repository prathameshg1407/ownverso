/**
 * HTTP Errors
 *
 * Standard HTTP error classes for API responses.
 */
import { BaseError, ErrorDetails } from './base.error';
import { ErrorCode } from '../../common/constants/error-codes.constants';
/**
 * Generic HTTP Error
 */
export declare class HttpError extends BaseError {
    constructor(message: string, statusCode: number, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 400 Bad Request
 */
export declare class BadRequestError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 401 Unauthorized
 */
export declare class UnauthorizedError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 403 Forbidden
 */
export declare class ForbiddenError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 404 Not Found
 */
export declare class NotFoundError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 409 Conflict
 */
export declare class ConflictError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 422 Unprocessable Entity
 */
export declare class UnprocessableEntityError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 429 Too Many Requests
 */
export declare class TooManyRequestsError extends BaseError {
    readonly retryAfter?: number;
    constructor(message?: string, retryAfter?: number, details?: ErrorDetails);
}
/**
 * 500 Internal Server Error
 */
export declare class InternalServerError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
/**
 * 503 Service Unavailable
 */
export declare class ServiceUnavailableError extends BaseError {
    constructor(message?: string, code?: ErrorCode, details?: ErrorDetails);
}
//# sourceMappingURL=http.errors.d.ts.map