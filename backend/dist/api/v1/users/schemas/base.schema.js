"use strict";
/**
 * Base Schema Definitions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullableStringSchema = exports.NullableDateTimeSchema = exports.DateTimeSchema = exports.EmailSchema = exports.DisplayNameSchema = exports.UsernameSchema = exports.CuidSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const app_constants_1 = require("../../../../common/constants/app.constants");
// Primitives
exports.CuidSchema = typebox_1.Type.String({ pattern: '^c[a-z0-9]{24}$' });
exports.UsernameSchema = typebox_1.Type.String({
    minLength: 3,
    maxLength: 30,
    pattern: app_constants_1.REGEX.USERNAME.source,
});
exports.DisplayNameSchema = typebox_1.Type.String({ minLength: 1, maxLength: 100 });
exports.EmailSchema = typebox_1.Type.String({ format: 'email', minLength: 3, maxLength: 255 });
exports.DateTimeSchema = typebox_1.Type.String({ format: 'date-time' });
// Nullable types
exports.NullableDateTimeSchema = typebox_1.Type.Union([exports.DateTimeSchema, typebox_1.Type.Null()]);
exports.NullableStringSchema = typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]);
//# sourceMappingURL=base.schema.js.map