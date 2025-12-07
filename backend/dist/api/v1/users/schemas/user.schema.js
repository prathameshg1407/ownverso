"use strict";
/**
 * User Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserDetailSchema = exports.AdminUserSummarySchema = exports.PublicUserProfileSchema = exports.FullUserSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const base_schema_1 = require("./base.schema");
const enums_schema_1 = require("./enums.schema");
const components_schema_1 = require("./components.schema");
exports.FullUserSchema = typebox_1.Type.Object({
    publicId: base_schema_1.CuidSchema,
    email: base_schema_1.EmailSchema,
    emailVerified: typebox_1.Type.Boolean(),
    username: base_schema_1.UsernameSchema,
    displayName: base_schema_1.DisplayNameSchema,
    role: enums_schema_1.UserRoleSchema,
    status: enums_schema_1.UserStatusSchema,
    createdAt: base_schema_1.DateTimeSchema,
    profile: typebox_1.Type.Union([components_schema_1.UserProfileSchema, typebox_1.Type.Null()]),
    preferences: typebox_1.Type.Union([components_schema_1.UserPreferencesSchema, typebox_1.Type.Null()]),
    readerProfile: typebox_1.Type.Union([components_schema_1.ReaderProfileSchema, typebox_1.Type.Null()]),
    authorAccount: typebox_1.Type.Union([components_schema_1.AuthorAccountSummarySchema, typebox_1.Type.Null()]),
});
exports.PublicUserProfileSchema = typebox_1.Type.Object({
    publicId: base_schema_1.CuidSchema,
    username: base_schema_1.UsernameSchema,
    displayName: base_schema_1.DisplayNameSchema,
    role: enums_schema_1.UserRoleSchema,
    avatarUrl: base_schema_1.NullableStringSchema,
    bio: base_schema_1.NullableStringSchema,
    websiteUrl: base_schema_1.NullableStringSchema,
    twitterHandle: base_schema_1.NullableStringSchema,
    instagramHandle: base_schema_1.NullableStringSchema,
    tiktokHandle: base_schema_1.NullableStringSchema,
    discordHandle: base_schema_1.NullableStringSchema,
    isVerifiedAuthor: typebox_1.Type.Boolean(),
    createdAt: base_schema_1.DateTimeSchema,
    stats: typebox_1.Type.Optional(typebox_1.Type.Object({
        seriesCount: typebox_1.Type.Integer(),
        followerCount: typebox_1.Type.Integer(),
    })),
});
exports.AdminUserSummarySchema = typebox_1.Type.Object({
    publicId: base_schema_1.CuidSchema,
    email: base_schema_1.EmailSchema,
    username: base_schema_1.UsernameSchema,
    displayName: base_schema_1.DisplayNameSchema,
    role: enums_schema_1.UserRoleSchema,
    status: enums_schema_1.UserStatusSchema,
    emailVerified: typebox_1.Type.Boolean(),
    mfaEnabled: typebox_1.Type.Boolean(),
    isAuthor: typebox_1.Type.Boolean(),
    createdAt: base_schema_1.DateTimeSchema,
    lastLoginAt: base_schema_1.NullableDateTimeSchema,
});
exports.AdminUserDetailSchema = typebox_1.Type.Object({
    publicId: base_schema_1.CuidSchema,
    email: base_schema_1.EmailSchema,
    username: base_schema_1.UsernameSchema,
    displayName: base_schema_1.DisplayNameSchema,
    role: enums_schema_1.UserRoleSchema,
    status: enums_schema_1.UserStatusSchema,
    emailVerified: typebox_1.Type.Boolean(),
    createdAt: base_schema_1.DateTimeSchema,
    updatedAt: base_schema_1.DateTimeSchema,
    deletedAt: base_schema_1.NullableDateTimeSchema,
    profile: typebox_1.Type.Union([components_schema_1.UserProfileSchema, typebox_1.Type.Null()]),
    preferences: typebox_1.Type.Union([components_schema_1.UserPreferencesSchema, typebox_1.Type.Null()]),
    security: typebox_1.Type.Union([
        typebox_1.Type.Intersect([
            components_schema_1.UserSecurityInfoSchema,
            typebox_1.Type.Object({ statusHistory: typebox_1.Type.Array(components_schema_1.StatusHistoryEntrySchema) }),
        ]),
        typebox_1.Type.Null(),
    ]),
    readerProfile: typebox_1.Type.Union([components_schema_1.ReaderProfileSchema, typebox_1.Type.Null()]),
    authorAccount: typebox_1.Type.Union([components_schema_1.AuthorAccountSummarySchema, typebox_1.Type.Null()]),
    sessionCount: typebox_1.Type.Integer(),
});
//# sourceMappingURL=user.schema.js.map