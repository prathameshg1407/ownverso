"use strict";
// ==== FILE: src/api/v1/auth/utils/response.utils.ts ====
/**
 * Auth Response Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = sendSuccess;
exports.sendMessage = sendMessage;
exports.sendNoContent = sendNoContent;
exports.sendAuthResponse = sendAuthResponse;
exports.sendMfaPendingResponse = sendMfaPendingResponse;
exports.sendTokensResponse = sendTokensResponse;
const request_utils_1 = require("./request.utils");
function buildResponse(request, data) {
    return {
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId: request.id,
    };
}
function sendSuccess(reply, request, data, options = {}) {
    reply.status(options.statusCode ?? 200).send(buildResponse(request, data));
}
function sendMessage(reply, request, message, statusCode = 200) {
    sendSuccess(reply, request, { message }, { statusCode });
}
function sendNoContent(reply) {
    reply.status(204).send();
}
function formatTokens(tokens) {
    return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        accessTokenExpiresAt: tokens.accessTokenExpiresAt.toISOString(),
        refreshTokenExpiresAt: tokens.refreshTokenExpiresAt.toISOString(),
    };
}
function sendAuthResponse(reply, request, data) {
    if ((0, request_utils_1.getClientType)(request) === 'web') {
        reply.setAuthCookies(data.tokens.accessToken, data.tokens.refreshToken);
    }
    sendSuccess(reply, request, {
        user: data.user,
        tokens: formatTokens(data.tokens),
        mfaRequired: data.mfaRequired ?? false,
    });
}
function sendMfaPendingResponse(reply, request, data) {
    sendSuccess(reply, request, {
        user: data.user,
        mfaRequired: true,
        mfaPendingToken: data.mfaPendingToken,
    });
}
function sendTokensResponse(reply, request, tokens) {
    if ((0, request_utils_1.getClientType)(request) === 'web') {
        reply.setAuthCookies(tokens.accessToken, tokens.refreshToken);
    }
    sendSuccess(reply, request, { tokens: formatTokens(tokens) });
}
//# sourceMappingURL=response.utils.js.map