"use strict";
/**
 * Global Exception Filter
 *
 * Handles all uncaught errors and formats consistent error responses.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalExceptionFilter = globalExceptionFilter;
const base_error_1 = require("../../common/errors/base.error");
const validation_error_1 = require("../../common/errors/validation.error");
const http_errors_1 = require("../../common/errors/http.errors");
const error_codes_constants_1 = require("../../common/constants/error-codes.constants");
const http_status_constants_1 = require("../../common/constants/http-status.constants");
const logger_1 = require("../../core/logger");
const app_config_1 = require("../../config/app.config");
/**
 * Global exception handler for Fastify
 */
function globalExceptionFilter(error, request, reply) {
    const requestId = request.id;
    const includeStack = app_config_1.appConfig.isDevelopment;
    // Log the error
    logError(error, request);
    // Handle different error types
    let response;
    if (error instanceof base_error_1.BaseError) {
        // Custom application error
        response = error.serialize(requestId, includeStack);
    }
    else if (isValidationError(error)) {
        // Fastify/AJV validation error
        const validationError = handleValidationError(error);
        response = validationError.serialize(requestId, includeStack);
    }
    else if (isPrismaError(error)) {
        // Prisma database error
        const prismaError = handlePrismaError(error);
        response = prismaError.serialize(requestId, includeStack);
    }
    else if (isFastifyError(error)) {
        // Fastify framework error
        const fastifyError = handleFastifyError(error);
        response = fastifyError.serialize(requestId, includeStack);
    }
    else {
        // Unknown error - wrap in InternalServerError
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        const internalError = new http_errors_1.InternalServerError(app_config_1.appConfig.isProduction ? 'An unexpected error occurred' : errorMessage);
        response = internalError.serialize(requestId, includeStack);
    }
    // Send response
    reply.status(response.error.statusCode).send(response);
}
/**
 * Log error with context
 */
function logError(error, request) {
    const errorContext = {
        error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
        },
        request: {
            id: request.id,
            method: request.method,
            url: request.url,
            ip: request.ip,
            userAgent: request.headers['user-agent'],
        },
    };
    if (error instanceof base_error_1.BaseError && error.isOperational) {
        logger_1.logger.warn(errorContext, `Operational error: ${error.message}`);
    }
    else {
        logger_1.logger.error(errorContext, `Unexpected error: ${error.message}`);
    }
}
/**
 * Check if error is a validation error
 */
function isValidationError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'validation' in error &&
        Array.isArray(error.validation));
}
/**
 * Handle validation errors
 */
function handleValidationError(error) {
    const errors = (error.validation || []).map((err) => {
        const validationErr = err;
        return {
            field: validationErr.instancePath?.replace(/^\//, '').replace(/\//g, '.') || 'unknown',
            message: validationErr.message || 'Invalid value',
        };
    });
    return new validation_error_1.ValidationError(errors, 'Validation failed');
}
/**
 * Check if error is a Prisma error using duck typing
 * This avoids issues with Prisma namespace exports
 */
function isPrismaError(error) {
    if (typeof error !== 'object' || error === null) {
        return false;
    }
    const prismaError = error;
    return (typeof prismaError.code === 'string' &&
        prismaError.code.startsWith('P') &&
        'clientVersion' in prismaError);
}
/**
 * Handle Prisma errors
 */
function handlePrismaError(error) {
    switch (error.code) {
        case 'P2002': {
            // Unique constraint violation
            const target = Array.isArray(error.meta?.target)
                ? error.meta.target.join(', ')
                : 'field';
            return new base_error_1.BaseError(`A record with this ${target} already exists`, error_codes_constants_1.ERROR_CODES.CONFLICT, http_status_constants_1.HTTP_STATUS.CONFLICT, { target });
        }
        case 'P2025':
            // Record not found
            return new base_error_1.BaseError('Record not found', error_codes_constants_1.ERROR_CODES.NOT_FOUND, http_status_constants_1.HTTP_STATUS.NOT_FOUND);
        case 'P2003':
            // Foreign key constraint failed
            return new base_error_1.BaseError('Related record not found', error_codes_constants_1.ERROR_CODES.BAD_REQUEST, http_status_constants_1.HTTP_STATUS.BAD_REQUEST);
        case 'P2014':
            // Required relation violation
            return new base_error_1.BaseError('Required relation violation', error_codes_constants_1.ERROR_CODES.BAD_REQUEST, http_status_constants_1.HTTP_STATUS.BAD_REQUEST);
        default:
            logger_1.logger.error({ code: error.code, meta: error.meta }, 'Unhandled Prisma error');
            return new http_errors_1.InternalServerError('Database error occurred');
    }
}
/**
 * Check if error is a Fastify error
 */
function isFastifyError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'statusCode' in error &&
        typeof error.statusCode === 'number');
}
/**
 * Handle Fastify errors
 */
function handleFastifyError(error) {
    const statusCode = error.statusCode || http_status_constants_1.HTTP_STATUS.INTERNAL_SERVER_ERROR;
    // Map status codes to error codes
    const codeMap = {
        400: error_codes_constants_1.ERROR_CODES.BAD_REQUEST,
        401: error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED,
        403: error_codes_constants_1.ERROR_CODES.FORBIDDEN,
        404: error_codes_constants_1.ERROR_CODES.NOT_FOUND,
        429: error_codes_constants_1.ERROR_CODES.RATE_LIMITED,
    };
    const code = codeMap[statusCode] || error_codes_constants_1.ERROR_CODES.INTERNAL_ERROR;
    return new base_error_1.BaseError(error.message, code, statusCode);
}
//# sourceMappingURL=global-exception.filter.js.map