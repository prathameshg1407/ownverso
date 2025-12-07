/**
 * User Entity Types and Transformers
 */

import type { User, UserRole, UserStatus } from '@prisma/client';

export interface SafeUser {
  readonly publicId: string;
  readonly email: string;
  readonly emailVerified: boolean;
  readonly username: string;
  readonly displayName: string;
  readonly role: UserRole;
  readonly status: UserStatus;
  readonly createdAt: Date;
}

export interface JwtUser {
  readonly publicId: string;
  readonly email: string;
  readonly role: UserRole;
}

export function toSafeUser(user: User): SafeUser {
  return {
    publicId: user.publicId,
    email: user.email,
    emailVerified: user.emailVerified,
    username: user.username,
    displayName: user.displayName,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };
}

export function toJwtUser(user: User): JwtUser {
  return {
    publicId: user.publicId,
    email: user.email,
    role: user.role,
  };
}