"use strict";
/**
 * Response Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImpersonateResponseSchema = exports.GetAdminUserResponseSchema = exports.AdminUserListResponseSchema = exports.GetPublicUserResponseSchema = exports.MessageResponseSchema = exports.LoginHistoryResponseSchema = exports.UpdateSecurityResponseSchema = exports.GetSecurityResponseSchema = exports.UpdatePreferencesResponseSchema = exports.GetPreferencesResponseSchema = exports.AvatarUploadResponseSchema = exports.UpdateProfileResponseSchema = exports.UpdateUserResponseSchema = exports.GetMeResponseSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const base_schema_1 = require("./base.schema");
const enums_schema_1 = require("./enums.schema");
const components_schema_1 = require("./components.schema");
const user_schema_1 = require("./user.schema");
// Response wrapper helpers
function wrapResponse(dataSchema) {
    return typebox_1.Type.Object({
        success: typebox_1.Type.Literal(true),
        data: dataSchema,
        timestamp: base_schema_1.DateTimeSchema,
        requestId: typebox_1.Type.Optional(typebox_1.Type.String()),
    });
}
function wrapListResponse(itemSchema) {
    return typebox_1.Type.Object({
        success: typebox_1.Type.Literal(true),
        data: typebox_1.Type.Array(itemSchema),
        meta: typebox_1.Type.Object({
            page: typebox_1.Type.Integer(),
            limit: typebox_1.Type.Integer(),
            total: typebox_1.Type.Integer(),
            totalPages: typebox_1.Type.Integer(),
            hasNext: typebox_1.Type.Boolean(),
            hasPrev: typebox_1.Type.Boolean(),
        }),
        timestamp: base_schema_1.DateTimeSchema,
        requestId: typebox_1.Type.Optional(typebox_1.Type.String()),
    });
}
// Current user responses
exports.GetMeResponseSchema = wrapResponse(typebox_1.Type.Object({ user: user_schema_1.FullUserSchema }));
exports.UpdateUserResponseSchema = wrapResponse(typebox_1.Type.Object({ user: user_schema_1.FullUserSchema }));
// Profile responses
exports.UpdateProfileResponseSchema = wrapResponse(typebox_1.Type.Object({ profile: components_schema_1.UserProfileSchema }));
exports.AvatarUploadResponseSchema = wrapResponse(typebox_1.Type.Object({ avatarUrl: typebox_1.Type.String() }));
// Preferences responses
exports.GetPreferencesResponseSchema = wrapResponse(typebox_1.Type.Object({ preferences: components_schema_1.UserPreferencesSchema }));
exports.UpdatePreferencesResponseSchema = wrapResponse(typebox_1.Type.Object({ preferences: components_schema_1.UserPreferencesSchema }));
// Security responses
exports.GetSecurityResponseSchema = wrapResponse(typebox_1.Type.Object({ security: components_schema_1.UserSecurityInfoSchema }));
exports.UpdateSecurityResponseSchema = wrapResponse(typebox_1.Type.Object({ security: components_schema_1.UserSecurityInfoSchema }));
exports.LoginHistoryResponseSchema = wrapResponse(typebox_1.Type.Object({ sessions: typebox_1.Type.Array(components_schema_1.LoginHistoryEntrySchema) }));
// Message response
exports.MessageResponseSchema = wrapResponse(typebox_1.Type.Object({ message: typebox_1.Type.String() }));
// Public user responses
exports.GetPublicUserResponseSchema = wrapResponse(typebox_1.Type.Object({ user: user_schema_1.PublicUserProfileSchema }));
// Admin responses
exports.AdminUserListResponseSchema = wrapListResponse(user_schema_1.AdminUserSummarySchema);
exports.GetAdminUserResponseSchema = wrapResponse(typebox_1.Type.Object({ user: user_schema_1.AdminUserDetailSchema }));
exports.ImpersonateResponseSchema = wrapResponse(typebox_1.Type.Object({
    impersonationToken: typebox_1.Type.String(),
    impersonationId: typebox_1.Type.String(),
    expiresAt: base_schema_1.DateTimeSchema,
    targetUser: typebox_1.Type.Object({
        publicId: base_schema_1.CuidSchema,
        username: base_schema_1.UsernameSchema,
        displayName: base_schema_1.DisplayNameSchema,
        role: enums_schema_1.UserRoleSchema,
    }),
}));
//# sourceMappingURL=response.schema.js.map