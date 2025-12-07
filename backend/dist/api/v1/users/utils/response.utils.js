"use strict";
/**
 * Response Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendMessage = sendMessage;
exports.sendPaginated = sendPaginated;
exports.sendNoContent = sendNoContent;
function createSuccessResponse(request, data) {
    return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: request.id,
    };
}
function createPaginationMeta(page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    return {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
    };
}
/**
 * Send standard success response
 */
function sendSuccess(reply, request, data, statusCode = 200) {
    reply.status(statusCode).send(createSuccessResponse(request, data));
}
/**
 * Send message-only success response
 */
function sendMessage(reply, request, message, statusCode = 200) {
    sendSuccess(reply, request, { message }, statusCode);
}
/**
 * Send paginated response
 */
function sendPaginated(reply, request, data, page, limit, total, statusCode = 200) {
    const response = {
        ...createSuccessResponse(request, data),
        meta: createPaginationMeta(page, limit, total),
    };
    reply.status(statusCode).send(response);
}
/**
 * Send 204 No Content response
 */
function sendNoContent(reply) {
    reply.status(204).send();
}
//# sourceMappingURL=response.utils.js.map