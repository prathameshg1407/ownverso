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
export declare function toSafeUser(user: User): SafeUser;
export declare function toJwtUser(user: User): JwtUser;
//# sourceMappingURL=user.entity.d.ts.map