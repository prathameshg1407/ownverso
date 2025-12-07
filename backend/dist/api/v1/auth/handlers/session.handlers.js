"use strict";
// ==== FILE: src/api/v1/auth/handlers/session.handlers.ts ====
/**
 * Session Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionsHandler = getSessionsHandler;
exports.revokeSessionHandler = revokeSessionHandler;
exports.revokeOtherSessionsHandler = revokeOtherSessionsHandler;
const auth_1 = require("../../../../domain/auth");
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const utils_1 = require("../utils");
async function getSessionsHandler(request, reply) {
    const [userId, currentSessionId] = await Promise.all([
        Promise.resolve((0, utils_1.getUserId)(request)),
        (0, utils_1.getCurrentSessionId)(request, auth_1.sessionRepository.findByTokenHash),
    ]);
    const sessions = await auth_1.sessionDomainService.getActiveSessions(userId, currentSessionId);
    (0, utils_1.sendSuccess)(reply, request, { sessions });
}
async function revokeSessionHandler(request, reply) {
    const [userId, currentSessionId] = await Promise.all([
        Promise.resolve((0, utils_1.getUserId)(request)),
        (0, utils_1.getCurrentSessionId)(request, auth_1.sessionRepository.findByTokenHash),
    ]);
    await auth_1.sessionDomainService.revokeSession(userId, BigInt(request.params.sessionId), currentSessionId);
    (0, utils_1.sendMessage)(reply, request, 'Session revoked successfully.');
}
async function revokeOtherSessionsHandler(request, reply) {
    const currentSessionId = await (0, utils_1.getCurrentSessionId)(request, auth_1.sessionRepository.findByTokenHash);
    if (!currentSessionId) {
        throw new http_errors_1.BadRequestError('Current session not found', error_codes_constants_1.ERROR_CODES.BAD_REQUEST);
    }
    const count = await auth_1.sessionDomainService.revokeOtherSessions((0, utils_1.getUserId)(request), currentSessionId);
    (0, utils_1.sendSuccess)(reply, request, { message: `Revoked ${count} session(s).`, sessionsRevoked: count });
}
//# sourceMappingURL=session.handlers.js.map