"use strict";
/**
 * Admin Impersonate User Handler
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.impersonateHandler = impersonateHandler;
const services_1 = require("../../../../../domain/users/services");
const logger_1 = require("../../../../../core/logger");
const utils_1 = require("../../utils");
async function impersonateHandler(request, reply) {
    const adminUserId = (0, utils_1.getUserId)(request);
    const adminPublicId = (0, utils_1.getUserPublicId)(request);
    const targetUserId = request.params.userId;
    const result = await services_1.adminUserService.impersonateUser(adminUserId, targetUserId, {
        ipAddress: request.ip,
        userAgent: request.headers['user-agent'] ?? null,
    });
    logger_1.logger.warn({
        adminUserId: adminPublicId,
        targetUserId,
        impersonationId: result.impersonationId,
    }, 'Admin impersonation initiated');
    (0, utils_1.sendSuccess)(reply, request, {
        impersonationToken: result.token,
        impersonationId: result.impersonationId,
        expiresAt: result.expiresAt,
        targetUser: result.targetUser,
    });
}
//# sourceMappingURL=impersonate.handler.js.map