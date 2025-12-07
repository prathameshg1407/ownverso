/**
 * Base Error Class
 *
 * Foundation for all custom application errors.
 */
import { ErrorCode } from '../../common/constants/error-codes.constants';
export interface ErrorDetails {
    [key: string]: unknown;
}
export interface SerializedError {
    success: false;
    error: {
        code: string;
        message: string;
        statusCode: number;
        details?: ErrorDetails;
        stack?: string;
    };
    timestamp: string;
    requestId?: string;
}
/**
 * Base error class for all application errors
 */
export declare class BaseError extends Error {
    readonly code: ErrorCode;
    readonly statusCode: number;
    readonly details?: ErrorDetails;
    readonly isOperational: boolean;
    readonly timestamp: Date;
    constructor(message: string, code?: ErrorCode, statusCode?: number, details?: ErrorDetails, isOperational?: boolean);
    /**
     * Serialize error for API response
     */
    serialize(requestId?: string, includeStack?: boolean): SerializedError;
    /**
     * Convert error to JSON
     */
    toJSON(): Record<string, unknown>;
}
//# sourceMappingURL=base.error.d.ts.map