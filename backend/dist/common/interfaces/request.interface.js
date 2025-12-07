"use strict";
/**
 * Request Interfaces
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractRequestContext = extractRequestContext;
/**
 * Extract request context from FastifyRequest
 */
function extractRequestContext(request) {
    return {
        requestId: request.id,
        method: request.method,
        url: request.url,
        ip: request.ip,
        userAgent: request.headers['user-agent'],
        userId: request.user?.publicId,
    };
}
//# sourceMappingURL=request.interface.js.map