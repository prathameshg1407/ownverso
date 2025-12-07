/**
 * Response Schema Definitions
 */

import { Type, type Static } from '@sinclair/typebox';
import { CuidSchema, UsernameSchema, DisplayNameSchema, DateTimeSchema } from './base.schema';
import { UserRoleSchema } from './enums.schema';
import {
  UserProfileSchema,
  UserPreferencesSchema,
  UserSecurityInfoSchema,
  LoginHistoryEntrySchema,
} from './components.schema';
import {
  FullUserSchema,
  PublicUserProfileSchema,
  AdminUserSummarySchema,
  AdminUserDetailSchema,
} from './user.schema';

// Response wrapper helpers
function wrapResponse<T extends ReturnType<typeof Type.Object>>(dataSchema: T) {
  return Type.Object({
    success: Type.Literal(true),
    data: dataSchema,
    timestamp: DateTimeSchema,
    requestId: Type.Optional(Type.String()),
  });
}

function wrapListResponse<T extends ReturnType<typeof Type.Object>>(itemSchema: T) {
  return Type.Object({
    success: Type.Literal(true),
    data: Type.Array(itemSchema),
    meta: Type.Object({
      page: Type.Integer(),
      limit: Type.Integer(),
      total: Type.Integer(),
      totalPages: Type.Integer(),
      hasNext: Type.Boolean(),
      hasPrev: Type.Boolean(),
    }),
    timestamp: DateTimeSchema,
    requestId: Type.Optional(Type.String()),
  });
}

// Current user responses
export const GetMeResponseSchema = wrapResponse(Type.Object({ user: FullUserSchema }));
export const UpdateUserResponseSchema = wrapResponse(Type.Object({ user: FullUserSchema }));

// Profile responses
export const UpdateProfileResponseSchema = wrapResponse(
  Type.Object({ profile: UserProfileSchema }),
);
export const AvatarUploadResponseSchema = wrapResponse(
  Type.Object({ avatarUrl: Type.String() }),
);

// Preferences responses
export const GetPreferencesResponseSchema = wrapResponse(
  Type.Object({ preferences: UserPreferencesSchema }),
);
export const UpdatePreferencesResponseSchema = wrapResponse(
  Type.Object({ preferences: UserPreferencesSchema }),
);

// Security responses
export const GetSecurityResponseSchema = wrapResponse(
  Type.Object({ security: UserSecurityInfoSchema }),
);
export const UpdateSecurityResponseSchema = wrapResponse(
  Type.Object({ security: UserSecurityInfoSchema }),
);
export const LoginHistoryResponseSchema = wrapResponse(
  Type.Object({ sessions: Type.Array(LoginHistoryEntrySchema) }),
);

// Message response
export const MessageResponseSchema = wrapResponse(Type.Object({ message: Type.String() }));

// Public user responses
export const GetPublicUserResponseSchema = wrapResponse(
  Type.Object({ user: PublicUserProfileSchema }),
);

// Admin responses
export const AdminUserListResponseSchema = wrapListResponse(AdminUserSummarySchema);
export const GetAdminUserResponseSchema = wrapResponse(
  Type.Object({ user: AdminUserDetailSchema }),
);

export const ImpersonateResponseSchema = wrapResponse(
  Type.Object({
    impersonationToken: Type.String(),
    impersonationId: Type.String(),
    expiresAt: DateTimeSchema,
    targetUser: Type.Object({
      publicId: CuidSchema,
      username: UsernameSchema,
      displayName: DisplayNameSchema,
      role: UserRoleSchema,
    }),
  }),
);

// Type exports
export type GetMeResponse = Static<typeof GetMeResponseSchema>;
export type UpdateUserResponse = Static<typeof UpdateUserResponseSchema>;
export type UpdateProfileResponse = Static<typeof UpdateProfileResponseSchema>;
export type AvatarUploadResponse = Static<typeof AvatarUploadResponseSchema>;
export type GetPreferencesResponse = Static<typeof GetPreferencesResponseSchema>;
export type UpdatePreferencesResponse = Static<typeof UpdatePreferencesResponseSchema>;
export type GetSecurityResponse = Static<typeof GetSecurityResponseSchema>;
export type UpdateSecurityResponse = Static<typeof UpdateSecurityResponseSchema>;
export type LoginHistoryResponse = Static<typeof LoginHistoryResponseSchema>;
export type MessageResponse = Static<typeof MessageResponseSchema>;
export type GetPublicUserResponse = Static<typeof GetPublicUserResponseSchema>;
export type AdminUserListResponse = Static<typeof AdminUserListResponseSchema>;
export type GetAdminUserResponse = Static<typeof GetAdminUserResponseSchema>;
export type ImpersonateResponse = Static<typeof ImpersonateResponseSchema>;