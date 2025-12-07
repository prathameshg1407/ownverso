/**
 * User Validators
 */
export declare const userValidator: {
    validateUsernameFormat(username: string): void;
    checkUsernameAvailable(username: string, excludeUserId?: bigint): Promise<void>;
    validateEmailFormat(email: string): void;
    checkEmailAvailable(email: string, excludeUserId?: bigint): Promise<void>;
    validateDisplayName(displayName: string): void;
};
export type UserValidator = typeof userValidator;
//# sourceMappingURL=user.validator.d.ts.map