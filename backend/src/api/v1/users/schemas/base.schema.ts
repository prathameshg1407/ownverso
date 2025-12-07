/**
 * Base Schema Definitions
 */

import { Type } from '@sinclair/typebox';
import { REGEX } from '@/common/constants/app.constants';

// Primitives
export const CuidSchema = Type.String({ pattern: '^c[a-z0-9]{24}$' });
export const UsernameSchema = Type.String({
  minLength: 3,
  maxLength: 30,
  pattern: REGEX.USERNAME.source,
});
export const DisplayNameSchema = Type.String({ minLength: 1, maxLength: 100 });
export const EmailSchema = Type.String({ format: 'email', minLength: 3, maxLength: 255 });
export const DateTimeSchema = Type.String({ format: 'date-time' });

// Nullable types
export const NullableDateTimeSchema = Type.Union([DateTimeSchema, Type.Null()]);
export const NullableStringSchema = Type.Union([Type.String(), Type.Null()]);