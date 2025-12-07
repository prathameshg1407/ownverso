"use strict";
/**
 * User Validators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const app_constants_1 = require("../../../common/constants/app.constants");
const user_repository_1 = require("../repositories/user.repository");
const constants_2 = require("../constants");
const RESERVED_USERNAMES_SET = new Set(constants_2.RESERVED_USERNAMES);
exports.userValidator = {
    validateUsernameFormat(username) {
        if (!username || username.length < constants_2.USER_LIMITS.USERNAME_MIN_LENGTH) {
            throw new errors_1.BadRequestError(`Username must be at least ${constants_2.USER_LIMITS.USERNAME_MIN_LENGTH} characters`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        if (username.length > constants_2.USER_LIMITS.USERNAME_MAX_LENGTH) {
            throw new errors_1.BadRequestError(`Username must be at most ${constants_2.USER_LIMITS.USERNAME_MAX_LENGTH} characters`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        if (!app_constants_1.REGEX.USERNAME.test(username)) {
            throw new errors_1.BadRequestError('Username can only contain letters, numbers, and underscores', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        if (RESERVED_USERNAMES_SET.has(username.toLowerCase())) {
            throw new errors_1.BadRequestError('This username is reserved', constants_1.ERROR_CODES.USER_USERNAME_TAKEN);
        }
    },
    async checkUsernameAvailable(username, excludeUserId) {
        this.validateUsernameFormat(username);
        const exists = await user_repository_1.userRepository.usernameExists(username, excludeUserId);
        if (exists) {
            throw new errors_1.ConflictError('This username is already taken', constants_1.ERROR_CODES.USER_USERNAME_TAKEN);
        }
    },
    validateEmailFormat(email) {
        if (!email || !app_constants_1.REGEX.EMAIL.test(email)) {
            throw new errors_1.BadRequestError('Invalid email address', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        if (email.length > 255) {
            throw new errors_1.BadRequestError('Email address is too long', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
    async checkEmailAvailable(email, excludeUserId) {
        this.validateEmailFormat(email);
        const exists = await user_repository_1.userRepository.emailExists(email, excludeUserId);
        if (exists) {
            throw new errors_1.ConflictError('An account with this email already exists', constants_1.ERROR_CODES.USER_EMAIL_TAKEN);
        }
    },
    validateDisplayName(displayName) {
        if (!displayName?.trim()) {
            throw new errors_1.BadRequestError('Display name is required', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        if (displayName.length > constants_2.USER_LIMITS.DISPLAY_NAME_MAX_LENGTH) {
            throw new errors_1.BadRequestError(`Display name must be at most ${constants_2.USER_LIMITS.DISPLAY_NAME_MAX_LENGTH} characters`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
};
//# sourceMappingURL=user.validator.js.map