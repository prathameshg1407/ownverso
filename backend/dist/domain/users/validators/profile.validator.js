"use strict";
/**
 * Profile Validators
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileValidator = void 0;
const errors_1 = require("../../../common/errors");
const constants_1 = require("../../../common/constants");
const constants_2 = require("../constants");
const VALID_LOCALES_SET = new Set(constants_2.VALID_LOCALES);
const SOCIAL_HANDLE_REGEX = /^[a-zA-Z0-9_]+$/;
const SOCIAL_PLATFORM_LIMITS = {
    twitter: 15,
    instagram: 30,
    tiktok: 24,
    discord: 50,
};
exports.profileValidator = {
    validateBio(bio) {
        if (bio && bio.length > constants_2.USER_LIMITS.BIO_MAX_LENGTH) {
            throw new errors_1.BadRequestError(`Bio must be at most ${constants_2.USER_LIMITS.BIO_MAX_LENGTH} characters`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
    validateLocale(locale) {
        if (!locale || locale.length !== 2 || !VALID_LOCALES_SET.has(locale.toLowerCase())) {
            throw new errors_1.BadRequestError('Invalid locale code', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
    validateTimezone(timezone) {
        if (!timezone || timezone.length > 50) {
            throw new errors_1.BadRequestError('Invalid timezone', constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
    validateUrl(url, fieldName) {
        if (!url)
            return;
        if (url.length > constants_2.USER_LIMITS.URL_MAX_LENGTH) {
            throw new errors_1.BadRequestError(`${fieldName} URL is too long`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        try {
            const parsed = new URL(url);
            if (!['http:', 'https:'].includes(parsed.protocol)) {
                throw new Error('Invalid protocol');
            }
        }
        catch {
            throw new errors_1.BadRequestError(`${fieldName} must be a valid URL`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
    validateSocialHandle(handle, platform, maxLength) {
        if (!handle)
            return;
        const limit = maxLength ?? SOCIAL_PLATFORM_LIMITS[platform.toLowerCase()] ?? constants_2.USER_LIMITS.SOCIAL_HANDLE_MAX_LENGTH;
        if (handle.length > limit) {
            throw new errors_1.BadRequestError(`${platform} handle must be at most ${limit} characters`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
        const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
        if (!SOCIAL_HANDLE_REGEX.test(cleanHandle)) {
            throw new errors_1.BadRequestError(`Invalid ${platform} handle`, constants_1.ERROR_CODES.VALIDATION_ERROR);
        }
    },
    validateProfileUpdate(data) {
        if (data.bio !== undefined)
            this.validateBio(data.bio);
        if (data.locale)
            this.validateLocale(data.locale);
        if (data.timezone)
            this.validateTimezone(data.timezone);
        if (data.websiteUrl !== undefined)
            this.validateUrl(data.websiteUrl, 'Website');
        if (data.twitterHandle !== undefined)
            this.validateSocialHandle(data.twitterHandle, 'Twitter');
        if (data.instagramHandle !== undefined)
            this.validateSocialHandle(data.instagramHandle, 'Instagram');
        if (data.tiktokHandle !== undefined)
            this.validateSocialHandle(data.tiktokHandle, 'TikTok');
        if (data.discordHandle !== undefined)
            this.validateSocialHandle(data.discordHandle, 'Discord');
    },
};
//# sourceMappingURL=profile.validator.js.map