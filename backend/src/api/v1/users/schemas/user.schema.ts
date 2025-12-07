/**
 * User Schema Definitions
 */

import { Type } from '@sinclair/typebox';
import {
  CuidSchema,
  UsernameSchema,
  DisplayNameSchema,
  EmailSchema,
  DateTimeSchema,
  NullableStringSchema,
  NullableDateTimeSchema,
} from './base.schema';
import { UserRoleSchema, UserStatusSchema } from './enums.schema';
import {
  UserProfileSchema,
  UserPreferencesSchema,
  UserSecurityInfoSchema,
  ReaderProfileSchema,
  AuthorAccountSummarySchema,
  StatusHistoryEntrySchema,
} from './components.schema';

export const FullUserSchema = Type.Object({
  publicId: CuidSchema,
  email: EmailSchema,
  emailVerified: Type.Boolean(),
  username: UsernameSchema,
  displayName: DisplayNameSchema,
  role: UserRoleSchema,
  status: UserStatusSchema,
  createdAt: DateTimeSchema,
  profile: Type.Union([UserProfileSchema, Type.Null()]),
  preferences: Type.Union([UserPreferencesSchema, Type.Null()]),
  readerProfile: Type.Union([ReaderProfileSchema, Type.Null()]),
  authorAccount: Type.Union([AuthorAccountSummarySchema, Type.Null()]),
});

export const PublicUserProfileSchema = Type.Object({
  publicId: CuidSchema,
  username: UsernameSchema,
  displayName: DisplayNameSchema,
  role: UserRoleSchema,
  avatarUrl: NullableStringSchema,
  bio: NullableStringSchema,
  websiteUrl: NullableStringSchema,
  twitterHandle: NullableStringSchema,
  instagramHandle: NullableStringSchema,
  tiktokHandle: NullableStringSchema,
  discordHandle: NullableStringSchema,
  isVerifiedAuthor: Type.Boolean(),
  createdAt: DateTimeSchema,
  stats: Type.Optional(
    Type.Object({
      seriesCount: Type.Integer(),
      followerCount: Type.Integer(),
    }),
  ),
});

export const AdminUserSummarySchema = Type.Object({
  publicId: CuidSchema,
  email: EmailSchema,
  username: UsernameSchema,
  displayName: DisplayNameSchema,
  role: UserRoleSchema,
  status: UserStatusSchema,
  emailVerified: Type.Boolean(),
  mfaEnabled: Type.Boolean(),
  isAuthor: Type.Boolean(),
  createdAt: DateTimeSchema,
  lastLoginAt: NullableDateTimeSchema,
});

export const AdminUserDetailSchema = Type.Object({
  publicId: CuidSchema,
  email: EmailSchema,
  username: UsernameSchema,
  displayName: DisplayNameSchema,
  role: UserRoleSchema,
  status: UserStatusSchema,
  emailVerified: Type.Boolean(),
  createdAt: DateTimeSchema,
  updatedAt: DateTimeSchema,
  deletedAt: NullableDateTimeSchema,
  profile: Type.Union([UserProfileSchema, Type.Null()]),
  preferences: Type.Union([UserPreferencesSchema, Type.Null()]),
  security: Type.Union([
    Type.Intersect([
      UserSecurityInfoSchema,
      Type.Object({ statusHistory: Type.Array(StatusHistoryEntrySchema) }),
    ]),
    Type.Null(),
  ]),
  readerProfile: Type.Union([ReaderProfileSchema, Type.Null()]),
  authorAccount: Type.Union([AuthorAccountSummarySchema, Type.Null()]),
  sessionCount: Type.Integer(),
});