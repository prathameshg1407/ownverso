/**
 * Request Schema Definitions
 */
import { type Static } from '@sinclair/typebox';
export declare const UpdateUserRequestSchema: import("@sinclair/typebox").TObject<{
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    username: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const UpdateProfileRequestSchema: import("@sinclair/typebox").TObject<{
    bio: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    locale: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    timezone: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    dataRegion: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"INDIA">, import("@sinclair/typebox").TLiteral<"SOUTHEAST_ASIA">, import("@sinclair/typebox").TLiteral<"EUROPE">, import("@sinclair/typebox").TLiteral<"NORTH_AMERICA">, import("@sinclair/typebox").TLiteral<"SOUTH_AMERICA">, import("@sinclair/typebox").TLiteral<"AUSTRALIA">, import("@sinclair/typebox").TLiteral<"JAPAN">]>>;
    websiteUrl: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    twitterHandle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    instagramHandle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    tiktokHandle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
    discordHandle: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TString, import("@sinclair/typebox").TNull]>>;
}>;
export declare const UpdatePreferencesRequestSchema: import("@sinclair/typebox").TObject<{
    emailNotifications: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    pushNotifications: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    emailDigestFrequency: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"INSTANT">, import("@sinclair/typebox").TLiteral<"HOURLY">, import("@sinclair/typebox").TLiteral<"DAILY">, import("@sinclair/typebox").TLiteral<"WEEKLY">, import("@sinclair/typebox").TLiteral<"NEVER">]>>;
    contentLanguages: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    contentRatings: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"EVERYONE">, import("@sinclair/typebox").TLiteral<"TEEN">, import("@sinclair/typebox").TLiteral<"MATURE">, import("@sinclair/typebox").TLiteral<"ADULT_ONLY">]>>>;
    hiddenGenres: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    hiddenTags: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TArray<import("@sinclair/typebox").TString>>;
    showOnlineStatus: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    showReadingActivity: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    allowDirectMessages: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    marketingEmails: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    newsletterOptIn: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export declare const UpdateSecurityRequestSchema: import("@sinclair/typebox").TObject<{
    requirePasswordForSensitiveActions: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    loginNotifications: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    trustedDevicesEnabled: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export declare const AdminUpdateUserRequestSchema: import("@sinclair/typebox").TObject<{
    displayName: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    email: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    emailVerified: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
}>;
export declare const AdminUpdateStatusRequestSchema: import("@sinclair/typebox").TObject<{
    status: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"PENDING_VERIFICATION">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"BANNED">, import("@sinclair/typebox").TLiteral<"DELETED">, import("@sinclair/typebox").TLiteral<"DEACTIVATED">]>;
    reason: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>;
export declare const AdminUpdateRoleRequestSchema: import("@sinclair/typebox").TObject<{
    role: import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"READER">, import("@sinclair/typebox").TLiteral<"AUTHOR">, import("@sinclair/typebox").TLiteral<"COLLABORATOR">, import("@sinclair/typebox").TLiteral<"MODERATOR">, import("@sinclair/typebox").TLiteral<"ADMIN">, import("@sinclair/typebox").TLiteral<"SUPER_ADMIN">]>;
}>;
export declare const PaginationQuerySchema: import("@sinclair/typebox").TObject<{
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    sortBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sortOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"asc">, import("@sinclair/typebox").TLiteral<"desc">]>>;
}>;
export declare const AdminUserQuerySchema: import("@sinclair/typebox").TIntersect<[import("@sinclair/typebox").TObject<{
    page: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TInteger>;
    sortBy: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    sortOrder: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"asc">, import("@sinclair/typebox").TLiteral<"desc">]>>;
}>, import("@sinclair/typebox").TObject<{
    q: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    role: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"READER">, import("@sinclair/typebox").TLiteral<"AUTHOR">, import("@sinclair/typebox").TLiteral<"COLLABORATOR">, import("@sinclair/typebox").TLiteral<"MODERATOR">, import("@sinclair/typebox").TLiteral<"ADMIN">, import("@sinclair/typebox").TLiteral<"SUPER_ADMIN">]>>;
    status: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"PENDING_VERIFICATION">, import("@sinclair/typebox").TLiteral<"ACTIVE">, import("@sinclair/typebox").TLiteral<"SUSPENDED">, import("@sinclair/typebox").TLiteral<"BANNED">, import("@sinclair/typebox").TLiteral<"DELETED">, import("@sinclair/typebox").TLiteral<"DEACTIVATED">]>>;
    emailVerified: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    mfaEnabled: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    isAuthor: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    createdFrom: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    createdTo: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
}>]>;
export type UpdateUserRequest = Static<typeof UpdateUserRequestSchema>;
export type UpdateProfileRequest = Static<typeof UpdateProfileRequestSchema>;
export type UpdatePreferencesRequest = Static<typeof UpdatePreferencesRequestSchema>;
export type UpdateSecurityRequest = Static<typeof UpdateSecurityRequestSchema>;
export type AdminUpdateUserRequest = Static<typeof AdminUpdateUserRequestSchema>;
export type AdminUpdateStatusRequest = Static<typeof AdminUpdateStatusRequestSchema>;
export type AdminUpdateRoleRequest = Static<typeof AdminUpdateRoleRequestSchema>;
export type AdminUserQuery = Static<typeof AdminUserQuerySchema>;
//# sourceMappingURL=request.schema.d.ts.map