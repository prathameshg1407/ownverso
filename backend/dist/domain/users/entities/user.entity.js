"use strict";
/**
 * User Entity Types and Transformers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSafeUser = toSafeUser;
exports.toJwtUser = toJwtUser;
function toSafeUser(user) {
    return {
        publicId: user.publicId,
        email: user.email,
        emailVerified: user.emailVerified,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
    };
}
function toJwtUser(user) {
    return {
        publicId: user.publicId,
        email: user.email,
        role: user.role,
    };
}
//# sourceMappingURL=user.entity.js.map