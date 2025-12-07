"use strict";
/**
 * User Request Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientType = exports.extractAccessToken = exports.getAuthenticatedUser = void 0;
exports.getUserId = getUserId;
exports.getUserPublicId = getUserPublicId;
exports.getOptionalUserId = getOptionalUserId;
exports.getSessionId = getSessionId;
const errors_1 = require("../../../../common/errors");
const constants_1 = require("../../../../common/constants");
var utils_1 = require("../../../../api/v1/auth/utils");
Object.defineProperty(exports, "getAuthenticatedUser", { enumerable: true, get: function () { return utils_1.getAuthenticatedUser; } });
Object.defineProperty(exports, "extractAccessToken", { enumerable: true, get: function () { return utils_1.extractAccessToken; } });
Object.defineProperty(exports, "getClientType", { enumerable: true, get: function () { return utils_1.getClientType; } });
/**
 * Get authenticated user ID from request
 * @throws UnauthorizedError if not authenticated
 */
function getUserId(request) {
    if (!request.user) {
        throw new errors_1.UnauthorizedError('Authentication required', constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    return request.user.id;
}
/**
 * Get user public ID from request
 * @throws UnauthorizedError if not authenticated
 */
function getUserPublicId(request) {
    if (!request.user) {
        throw new errors_1.UnauthorizedError('Authentication required', constants_1.ERROR_CODES.AUTH_REQUIRED);
    }
    return request.user.publicId;
}
/**
 * Get optional user ID (returns undefined if not authenticated)
 */
function getOptionalUserId(request) {
    return request.user?.id;
}
/**
 * Get session ID from JWT payload
 */
function getSessionId(request) {
    return request.jwtPayload?.sessionId;
}
//# sourceMappingURL=request.utils.js.map