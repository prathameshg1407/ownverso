"use strict";
// ==== FILE: src/api/v1/auth/handlers/core.handlers.ts ====
/**
 * Core Auth Handlers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerHandler = registerHandler;
exports.loginHandler = loginHandler;
exports.logoutHandler = logoutHandler;
exports.logoutAllHandler = logoutAllHandler;
exports.refreshHandler = refreshHandler;
exports.getMeHandler = getMeHandler;
const services_1 = require("../../../../domain/auth/services");
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const utils_1 = require("../utils");
async function registerHandler(request, reply) {
    const result = await services_1.authService.register(request.body, (0, utils_1.getDeviceInfo)(request));
    (0, utils_1.sendSuccess)(reply, request, result, { statusCode: 201 });
}
async function loginHandler(request, reply) {
    const result = await services_1.authService.login(request.body, (0, utils_1.getDeviceInfo)(request));
    if (result.mfaRequired && result.mfaPendingToken) {
        (0, utils_1.sendMfaPendingResponse)(reply, request, {
            user: result.user,
            mfaPendingToken: result.mfaPendingToken,
        });
        return;
    }
    (0, utils_1.sendAuthResponse)(reply, request, {
        user: result.user,
        tokens: result.tokens,
        mfaRequired: false,
    });
}
async function logoutHandler(request, reply) {
    const token = (0, utils_1.extractAccessToken)(request);
    if (token)
        await services_1.authService.logout(token);
    if ((0, utils_1.getClientType)(request) === 'web') {
        reply.clearAuthCookies();
    }
    (0, utils_1.sendNoContent)(reply);
}
async function logoutAllHandler(request, reply) {
    const count = await services_1.authService.logoutAll((0, utils_1.getUserId)(request));
    reply.clearAuthCookies();
    (0, utils_1.sendSuccess)(reply, request, { message: `Logged out from ${count} device(s)`, sessionsRevoked: count });
}
async function refreshHandler(request, reply) {
    const refreshToken = (0, utils_1.extractRefreshToken)(request);
    if (!refreshToken) {
        throw new http_errors_1.UnauthorizedError('Refresh token required', error_codes_constants_1.ERROR_CODES.AUTH_REFRESH_TOKEN_INVALID);
    }
    const tokens = await services_1.authService.refreshTokens(refreshToken);
    (0, utils_1.sendTokensResponse)(reply, request, tokens);
}
async function getMeHandler(request, reply) {
    const { user } = request;
    if (!user?.publicId) {
        throw new http_errors_1.UnauthorizedError('User not found in request', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    (0, utils_1.sendSuccess)(reply, request, {
        user: {
            publicId: user.publicId,
            email: user.email,
            emailVerified: user.emailVerified,
            username: user.username,
            displayName: user.displayName || user.username || 'User',
            role: user.role,
            status: user.status,
            createdAt: user.createdAt instanceof Date ? user.createdAt.toISOString() : user.createdAt,
            profile: user.profile
                ? {
                    avatarUrl: user.profile.avatarUrl ?? undefined,
                    bio: user.profile.bio ?? undefined,
                    locale: user.profile.locale || 'en',
                    timezone: user.profile.timezone || 'UTC',
                }
                : undefined,
        },
    });
}
//# sourceMappingURL=core.handlers.js.map