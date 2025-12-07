"use strict";
/**
 * Request Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserQuerySchema = exports.PaginationQuerySchema = exports.AdminUpdateRoleRequestSchema = exports.AdminUpdateStatusRequestSchema = exports.AdminUpdateUserRequestSchema = exports.UpdateSecurityRequestSchema = exports.UpdatePreferencesRequestSchema = exports.UpdateProfileRequestSchema = exports.UpdateUserRequestSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const base_schema_1 = require("./base.schema");
const enums_schema_1 = require("./enums.schema");
const components_schema_1 = require("./components.schema");
// User updates
exports.UpdateUserRequestSchema = typebox_1.Type.Object({
    displayName: typebox_1.Type.Optional(base_schema_1.DisplayNameSchema),
    username: typebox_1.Type.Optional(base_schema_1.UsernameSchema),
});
exports.UpdateProfileRequestSchema = typebox_1.Type.Partial(typebox_1.Type.Object({
    bio: typebox_1.Type.String({ maxLength: 2000 }),
    locale: typebox_1.Type.String({ minLength: 2, maxLength: 2 }),
    timezone: typebox_1.Type.String({ maxLength: 50 }),
    dataRegion: enums_schema_1.DataRegionSchema,
    websiteUrl: typebox_1.Type.Union([typebox_1.Type.String({ format: 'uri', maxLength: 2048 }), typebox_1.Type.Null()]),
    twitterHandle: typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 50 }), typebox_1.Type.Null()]),
    instagramHandle: typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 50 }), typebox_1.Type.Null()]),
    tiktokHandle: typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 50 }), typebox_1.Type.Null()]),
    discordHandle: typebox_1.Type.Union([typebox_1.Type.String({ maxLength: 50 }), typebox_1.Type.Null()]),
}));
exports.UpdatePreferencesRequestSchema = typebox_1.Type.Partial(components_schema_1.UserPreferencesSchema);
exports.UpdateSecurityRequestSchema = typebox_1.Type.Object({
    requirePasswordForSensitiveActions: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    loginNotifications: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
    trustedDevicesEnabled: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
// Admin requests
exports.AdminUpdateUserRequestSchema = typebox_1.Type.Object({
    displayName: typebox_1.Type.Optional(base_schema_1.DisplayNameSchema),
    email: typebox_1.Type.Optional(base_schema_1.EmailSchema),
    emailVerified: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
});
exports.AdminUpdateStatusRequestSchema = typebox_1.Type.Object({
    status: enums_schema_1.UserStatusSchema,
    reason: typebox_1.Type.Optional(typebox_1.Type.String({ maxLength: 500 })),
});
exports.AdminUpdateRoleRequestSchema = typebox_1.Type.Object({
    role: enums_schema_1.UserRoleSchema,
});
// Query schemas
exports.PaginationQuerySchema = typebox_1.Type.Object({
    page: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, default: 1 })),
    limit: typebox_1.Type.Optional(typebox_1.Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
    sortBy: typebox_1.Type.Optional(typebox_1.Type.String()),
    sortOrder: typebox_1.Type.Optional(typebox_1.Type.Union([typebox_1.Type.Literal('asc'), typebox_1.Type.Literal('desc')])),
});
exports.AdminUserQuerySchema = typebox_1.Type.Intersect([
    exports.PaginationQuerySchema,
    typebox_1.Type.Object({
        q: typebox_1.Type.Optional(typebox_1.Type.String({ description: 'Search by email, username, or display name' })),
        role: typebox_1.Type.Optional(enums_schema_1.UserRoleSchema),
        status: typebox_1.Type.Optional(enums_schema_1.UserStatusSchema),
        emailVerified: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
        mfaEnabled: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
        isAuthor: typebox_1.Type.Optional(typebox_1.Type.Boolean()),
        createdFrom: typebox_1.Type.Optional(base_schema_1.DateTimeSchema),
        createdTo: typebox_1.Type.Optional(base_schema_1.DateTimeSchema),
    }),
]);
//# sourceMappingURL=request.schema.js.map