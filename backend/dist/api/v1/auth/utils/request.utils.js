"use strict";
// ==== FILE: src/api/v1/auth/utils/request.utils.ts ====
/**
 * Auth Request Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = getAuthenticatedUser;
exports.getUserId = getUserId;
exports.getUserPublicId = getUserPublicId;
exports.getDeviceInfo = getDeviceInfo;
exports.extractRefreshToken = extractRefreshToken;
exports.extractAccessToken = extractAccessToken;
exports.getCurrentSessionId = getCurrentSessionId;
exports.getClientType = getClientType;
const http_errors_1 = require("../../../../common/errors/http.errors");
const error_codes_constants_1 = require("../../../../common/constants/error-codes.constants");
const config_1 = require("../../../../config");
const crypto_utils_1 = require("../../../../domain/auth/utils/crypto.utils");
// ─────────────────────────────────────────────────────────────────────────
// User Extraction
// ─────────────────────────────────────────────────────────────────────────
function getAuthenticatedUser(request) {
    if (!request.user) {
        throw new http_errors_1.UnauthorizedError('Authentication required', error_codes_constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    return request.user;
}
function getUserId(request) {
    return getAuthenticatedUser(request).id;
}
function getUserPublicId(request) {
    return getAuthenticatedUser(request).publicId;
}
// ─────────────────────────────────────────────────────────────────────────
// Device Info
// ─────────────────────────────────────────────────────────────────────────
const DEFAULT_DEVICE_TYPE = 'UNKNOWN';
function getDeviceInfo(request) {
    if (request.deviceInfo)
        return request.deviceInfo;
    return {
        userAgent: request.headers['user-agent'] ?? null,
        ipAddress: request.ip ?? null,
        deviceType: DEFAULT_DEVICE_TYPE,
        deviceOs: null,
        browser: null,
        country: null,
        city: null,
    };
}
// ─────────────────────────────────────────────────────────────────────────
// Token Extraction
// ─────────────────────────────────────────────────────────────────────────
function extractRefreshToken(request) {
    const body = request.body;
    return body?.refreshToken ?? request.cookies[config_1.config.auth.cookies.refreshToken.name] ?? null;
}
function extractAccessToken(request) {
    const auth = request.headers.authorization;
    return auth?.startsWith('Bearer ') ? auth.slice(7) : null;
}
async function getCurrentSessionId(request, findByTokenHash) {
    const token = extractAccessToken(request);
    if (!token)
        return undefined;
    const session = await findByTokenHash((0, crypto_utils_1.hashToken)(token));
    return session?.id;
}
// ─────────────────────────────────────────────────────────────────────────
// Client Type Detection
// ─────────────────────────────────────────────────────────────────────────
function getClientType(request) {
    const header = request.headers['x-client-type'];
    if (header === 'web' || header === 'mobile' || header === 'api')
        return header;
    const ua = request.headers['user-agent'] ?? '';
    if (/Mobile|Android|iPhone|iPad/i.test(ua))
        return 'mobile';
    if (/Mozilla|Chrome|Safari|Firefox/i.test(ua))
        return 'web';
    return 'api';
}
//# sourceMappingURL=request.utils.js.map