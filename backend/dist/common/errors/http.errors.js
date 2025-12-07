"use strict";
/**
 * HTTP Errors
 *
 * Standard HTTP error classes for API responses.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.InternalServerError = exports.TooManyRequestsError = exports.UnprocessableEntityError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.BadRequestError = exports.HttpError = void 0;
const base_error_1 = require("./base.error");
const error_codes_constants_1 = require("../../common/constants/error-codes.constants");
const http_status_constants_1 = require("../../common/constants/http-status.constants");
/**
 * Generic HTTP Error
 */
class HttpError extends base_error_1.BaseError {
    constructor(message, statusCode, code, details) {
        super(message, code || error_codes_constants_1.ERROR_CODES.INTERNAL_ERROR, statusCode, details);
    }
}
exports.HttpError = HttpError;
/**
 * 400 Bad Request
 */
class BadRequestError extends base_error_1.BaseError {
    constructor(message = 'Bad Request', code = error_codes_constants_1.ERROR_CODES.BAD_REQUEST, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.BAD_REQUEST, details);
    }
}
exports.BadRequestError = BadRequestError;
/**
 * 401 Unauthorized
 */
class UnauthorizedError extends base_error_1.BaseError {
    constructor(message = 'Unauthorized', code = error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.UNAUTHORIZED, details);
    }
}
exports.UnauthorizedError = UnauthorizedError;
/**
 * 403 Forbidden
 */
class ForbiddenError extends base_error_1.BaseError {
    constructor(message = 'Forbidden', code = error_codes_constants_1.ERROR_CODES.FORBIDDEN, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.FORBIDDEN, details);
    }
}
exports.ForbiddenError = ForbiddenError;
/**
 * 404 Not Found
 */
class NotFoundError extends base_error_1.BaseError {
    constructor(message = 'Resource not found', code = error_codes_constants_1.ERROR_CODES.NOT_FOUND, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.NOT_FOUND, details);
    }
}
exports.NotFoundError = NotFoundError;
/**
 * 409 Conflict
 */
class ConflictError extends base_error_1.BaseError {
    constructor(message = 'Conflict', code = error_codes_constants_1.ERROR_CODES.CONFLICT, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.CONFLICT, details);
    }
}
exports.ConflictError = ConflictError;
/**
 * 422 Unprocessable Entity
 */
class UnprocessableEntityError extends base_error_1.BaseError {
    constructor(message = 'Unprocessable Entity', code = error_codes_constants_1.ERROR_CODES.VALIDATION_ERROR, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.UNPROCESSABLE_ENTITY, details);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
/**
 * 429 Too Many Requests
 */
class TooManyRequestsError extends base_error_1.BaseError {
    retryAfter;
    constructor(message = 'Too many requests', retryAfter, details) {
        super(message, error_codes_constants_1.ERROR_CODES.RATE_LIMITED, http_status_constants_1.HTTP_STATUS.TOO_MANY_REQUESTS, details);
        this.retryAfter = retryAfter;
    }
}
exports.TooManyRequestsError = TooManyRequestsError;
/**
 * 500 Internal Server Error
 */
class InternalServerError extends base_error_1.BaseError {
    constructor(message = 'Internal Server Error', code = error_codes_constants_1.ERROR_CODES.INTERNAL_ERROR, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, details, false);
    }
}
exports.InternalServerError = InternalServerError;
/**
 * 503 Service Unavailable
 */
class ServiceUnavailableError extends base_error_1.BaseError {
    constructor(message = 'Service Unavailable', code = error_codes_constants_1.ERROR_CODES.SERVICE_UNAVAILABLE, details) {
        super(message, code, http_status_constants_1.HTTP_STATUS.SERVICE_UNAVAILABLE, details);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=http.errors.js.map