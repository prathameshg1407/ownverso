"use strict";
/**
 * Base Error Class
 *
 * Foundation for all custom application errors.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const error_codes_constants_1 = require("../../common/constants/error-codes.constants");
const http_status_constants_1 = require("../../common/constants/http-status.constants");
/**
 * Base error class for all application errors
 */
class BaseError extends Error {
    code;
    statusCode;
    details;
    isOperational;
    timestamp;
    constructor(message, code = error_codes_constants_1.ERROR_CODES.INTERNAL_ERROR, statusCode = http_status_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, details, isOperational = true) {
        super(message);
        this.name = this.constructor.name;
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.isOperational = isOperational;
        this.timestamp = new Date();
        // Maintains proper stack trace for where error was thrown
        Error.captureStackTrace(this, this.constructor);
    }
    /**
     * Serialize error for API response
     */
    serialize(requestId, includeStack = false) {
        return {
            success: false,
            error: {
                code: this.code,
                message: this.message,
                statusCode: this.statusCode,
                details: this.details,
                ...(includeStack && { stack: this.stack }),
            },
            timestamp: this.timestamp.toISOString(),
            ...(requestId && { requestId }),
        };
    }
    /**
     * Convert error to JSON
     */
    toJSON() {
        return {
            name: this.name,
            message: this.message,
            code: this.code,
            statusCode: this.statusCode,
            details: this.details,
            timestamp: this.timestamp.toISOString(),
        };
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base.error.js.map