/**
 * Enum Schema Definitions
 */

import { Type } from '@sinclair/typebox';

export const UserRoleSchema = Type.Union([
  Type.Literal('READER'),
  Type.Literal('AUTHOR'),
  Type.Literal('COLLABORATOR'),
  Type.Literal('MODERATOR'),
  Type.Literal('ADMIN'),
  Type.Literal('SUPER_ADMIN'),
]);

export const UserStatusSchema = Type.Union([
  Type.Literal('PENDING_VERIFICATION'),
  Type.Literal('ACTIVE'),
  Type.Literal('SUSPENDED'),
  Type.Literal('BANNED'),
  Type.Literal('DELETED'),
  Type.Literal('DEACTIVATED'),
]);

export const DataRegionSchema = Type.Union([
  Type.Literal('INDIA'),
  Type.Literal('SOUTHEAST_ASIA'),
  Type.Literal('EUROPE'),
  Type.Literal('NORTH_AMERICA'),
  Type.Literal('SOUTH_AMERICA'),
  Type.Literal('AUSTRALIA'),
  Type.Literal('JAPAN'),
]);

export const EmailDigestFrequencySchema = Type.Union([
  Type.Literal('INSTANT'),
  Type.Literal('HOURLY'),
  Type.Literal('DAILY'),
  Type.Literal('WEEKLY'),
  Type.Literal('NEVER'),
]);

export const ContentRatingSchema = Type.Union([
  Type.Literal('EVERYONE'),
  Type.Literal('TEEN'),
  Type.Literal('MATURE'),
  Type.Literal('ADULT_ONLY'),
]);