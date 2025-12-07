"use strict";
/**
 * Enum Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRatingSchema = exports.EmailDigestFrequencySchema = exports.DataRegionSchema = exports.UserStatusSchema = exports.UserRoleSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.UserRoleSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('READER'),
    typebox_1.Type.Literal('AUTHOR'),
    typebox_1.Type.Literal('COLLABORATOR'),
    typebox_1.Type.Literal('MODERATOR'),
    typebox_1.Type.Literal('ADMIN'),
    typebox_1.Type.Literal('SUPER_ADMIN'),
]);
exports.UserStatusSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('PENDING_VERIFICATION'),
    typebox_1.Type.Literal('ACTIVE'),
    typebox_1.Type.Literal('SUSPENDED'),
    typebox_1.Type.Literal('BANNED'),
    typebox_1.Type.Literal('DELETED'),
    typebox_1.Type.Literal('DEACTIVATED'),
]);
exports.DataRegionSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('INDIA'),
    typebox_1.Type.Literal('SOUTHEAST_ASIA'),
    typebox_1.Type.Literal('EUROPE'),
    typebox_1.Type.Literal('NORTH_AMERICA'),
    typebox_1.Type.Literal('SOUTH_AMERICA'),
    typebox_1.Type.Literal('AUSTRALIA'),
    typebox_1.Type.Literal('JAPAN'),
]);
exports.EmailDigestFrequencySchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('INSTANT'),
    typebox_1.Type.Literal('HOURLY'),
    typebox_1.Type.Literal('DAILY'),
    typebox_1.Type.Literal('WEEKLY'),
    typebox_1.Type.Literal('NEVER'),
]);
exports.ContentRatingSchema = typebox_1.Type.Union([
    typebox_1.Type.Literal('EVERYONE'),
    typebox_1.Type.Literal('TEEN'),
    typebox_1.Type.Literal('MATURE'),
    typebox_1.Type.Literal('ADULT_ONLY'),
]);
//# sourceMappingURL=enums.schema.js.map