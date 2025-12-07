/**
 * Request Schema Definitions
 */

import { Type, type Static } from '@sinclair/typebox';
import { UsernameSchema, DisplayNameSchema, EmailSchema, DateTimeSchema } from './base.schema';
import { UserRoleSchema, UserStatusSchema, DataRegionSchema } from './enums.schema';
import { UserPreferencesSchema } from './components.schema';

// User updates
export const UpdateUserRequestSchema = Type.Object({
  displayName: Type.Optional(DisplayNameSchema),
  username: Type.Optional(UsernameSchema),
});

export const UpdateProfileRequestSchema = Type.Partial(
  Type.Object({
    bio: Type.String({ maxLength: 2000 }),
    locale: Type.String({ minLength: 2, maxLength: 2 }),
    timezone: Type.String({ maxLength: 50 }),
    dataRegion: DataRegionSchema,
    websiteUrl: Type.Union([Type.String({ format: 'uri', maxLength: 2048 }), Type.Null()]),
    twitterHandle: Type.Union([Type.String({ maxLength: 50 }), Type.Null()]),
    instagramHandle: Type.Union([Type.String({ maxLength: 50 }), Type.Null()]),
    tiktokHandle: Type.Union([Type.String({ maxLength: 50 }), Type.Null()]),
    discordHandle: Type.Union([Type.String({ maxLength: 50 }), Type.Null()]),
  }),
);

export const UpdatePreferencesRequestSchema = Type.Partial(UserPreferencesSchema);

export const UpdateSecurityRequestSchema = Type.Object({
  requirePasswordForSensitiveActions: Type.Optional(Type.Boolean()),
  loginNotifications: Type.Optional(Type.Boolean()),
  trustedDevicesEnabled: Type.Optional(Type.Boolean()),
});

// Admin requests
export const AdminUpdateUserRequestSchema = Type.Object({
  displayName: Type.Optional(DisplayNameSchema),
  email: Type.Optional(EmailSchema),
  emailVerified: Type.Optional(Type.Boolean()),
});

export const AdminUpdateStatusRequestSchema = Type.Object({
  status: UserStatusSchema,
  reason: Type.Optional(Type.String({ maxLength: 500 })),
});

export const AdminUpdateRoleRequestSchema = Type.Object({
  role: UserRoleSchema,
});

// Query schemas
export const PaginationQuerySchema = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
  sortBy: Type.Optional(Type.String()),
  sortOrder: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
});

export const AdminUserQuerySchema = Type.Intersect([
  PaginationQuerySchema,
  Type.Object({
    q: Type.Optional(Type.String({ description: 'Search by email, username, or display name' })),
    role: Type.Optional(UserRoleSchema),
    status: Type.Optional(UserStatusSchema),
    emailVerified: Type.Optional(Type.Boolean()),
    mfaEnabled: Type.Optional(Type.Boolean()),
    isAuthor: Type.Optional(Type.Boolean()),
    createdFrom: Type.Optional(DateTimeSchema),
    createdTo: Type.Optional(DateTimeSchema),
  }),
]);

// Type exports
export type UpdateUserRequest = Static<typeof UpdateUserRequestSchema>;
export type UpdateProfileRequest = Static<typeof UpdateProfileRequestSchema>;
export type UpdatePreferencesRequest = Static<typeof UpdatePreferencesRequestSchema>;
export type UpdateSecurityRequest = Static<typeof UpdateSecurityRequestSchema>;
export type AdminUpdateUserRequest = Static<typeof AdminUpdateUserRequestSchema>;
export type AdminUpdateStatusRequest = Static<typeof AdminUpdateStatusRequestSchema>;
export type AdminUpdateRoleRequest = Static<typeof AdminUpdateRoleRequestSchema>;
export type AdminUserQuery = Static<typeof AdminUserQuerySchema>;