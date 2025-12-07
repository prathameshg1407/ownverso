/**
 * User Repository
 */
import type { User } from '@prisma/client';
import type { CreateUserInput, UpdateUserInput, FindUsersOptions, UserWithRelations, UserWithSecurity } from '../types/user.types';
export declare const userRepository: {
    create(input: CreateUserInput): Promise<User>;
    findById(id: bigint): Promise<User | null>;
    findByPublicId(publicId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    findByEmailOrUsername(identifier: string): Promise<User | null>;
    findWithSecurity(id: bigint): Promise<UserWithSecurity | null>;
    findWithSecurityByEmail(email: string): Promise<UserWithSecurity | null>;
    findFull(id: bigint): Promise<UserWithRelations | null>;
    findFullByPublicId(publicId: string): Promise<UserWithRelations | null>;
    update(id: bigint, input: UpdateUserInput): Promise<User>;
    emailExists(email: string, excludeUserId?: bigint): Promise<boolean>;
    usernameExists(username: string, excludeUserId?: bigint): Promise<boolean>;
    softDelete(id: bigint): Promise<void>;
    findMany(options?: FindUsersOptions): Promise<{
        users: User[];
        total: number;
    }>;
};
export type UserRepository = typeof userRepository;
//# sourceMappingURL=user.repository.d.ts.map