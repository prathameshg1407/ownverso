/**
 * Users Domain - Public API
 *
 * Single entry point for the users domain.
 * All external imports should come through this file.
 */
export type { UserRole, UserStatus, DataRegion, EmailDigestFrequency, ContentRating, UserWithRelations, UserWithSecurity, UserWithProfile, CreateUserInput, UpdateUserInput, UpdateProfileInput, UpdatePreferencesInput, UpdateLoginInfoInput, UpdateSecuritySettingsInput, FindUsersOptions, StatusHistoryEntry, UserDTO, UserProfileDTO, UserPreferencesDTO, UserSecurityDTO, ReaderProfileDTO, AuthorAccountDTO, FullUserDTO, PublicUserDTO, LoginHistoryDTO, AdminUserSummaryDTO, AdminUserDetailDTO, ImpersonationDTO, AdminUserQuery, ImpersonationContext, JwtUserPayload, } from './types/user.types';
export { userMapper, profileMapper, preferencesMapper, securityMapper, readerProfileMapper, authorAccountMapper, sessionMapper, fullUserMapper, publicUserMapper, adminUserMapper, } from './mappers';
export { userRepository, userSecurityRepository, userProfileRepository, userPreferencesRepository, readerProfileRepository, type UserRepository, type UserSecurityRepository, type UserProfileRepository, type UserPreferencesRepository, type ReaderProfileRepository, } from './repositories';
export { userService, userProfileService, userPreferencesService, userSecurityService, publicUserService, adminUserService, type UserService, type UserProfileService, type UserPreferencesService, type UserSecurityService, type PublicUserService, type AdminUserService, } from './services';
export { userValidator, profileValidator, type UserValidator, type ProfileValidator, } from './validators';
export { canUserLogin, hasPassword, needsEmailVerification, hasMfaEnabled, isActiveUser, maskEmail, maskIpAddress, type LoginCheckResult, } from './utils';
export { RESERVED_USERNAMES, VALID_LOCALES, USER_DEFAULTS, USER_LIMITS, type ReservedUsername, type ValidLocale, } from './constants';
export type { SafeUser, JwtUser } from './entities';
export { toSafeUser, toJwtUser } from './entities';
export type { UserProfileEntity } from './entities';
export { toUserProfileEntity } from './entities';
export type { UserPreferencesEntity } from './entities';
export { toUserPreferencesEntity } from './entities';
export type { ReaderProfileEntity } from './entities';
export { toReaderProfileEntity } from './entities';
//# sourceMappingURL=index.d.ts.map