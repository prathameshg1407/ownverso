"use strict";
// ==== FILE: src/api/v1/auth/guards/auth.guard.ts ====
/**
 * Authentication Guards
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionalAuth = exports.requireAuth = void 0;
const requireAuth = async (request, reply) => {
    await request.server.authenticate(request, reply);
};
exports.requireAuth = requireAuth;
const optionalAuth = async (request, reply) => {
    await request.server.authenticateOptional(request, reply);
};
exports.optionalAuth = optionalAuth;
//# sourceMappingURL=auth.guard.js.map