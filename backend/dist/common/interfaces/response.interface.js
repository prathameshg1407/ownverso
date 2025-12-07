"use strict";
/**
 * Response Interfaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSuccessResponse = createSuccessResponse;
exports.createMessageResponse = createMessageResponse;
exports.createListResponse = createListResponse;
exports.createErrorResponse = createErrorResponse;
/**
 * Create success response helper
 */
function createSuccessResponse(data, requestId) {
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
function createMessageResponse(message, requestId) {
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
function createListResponse(items, total, requestId) {
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
function createErrorResponse(code, message, statusCode, details, requestId) {
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
//# sourceMappingURL=response.interface.js.map