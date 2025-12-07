"use strict";
/**
 * Validation Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.isValidUsername = isValidUsername;
exports.isValidSlug = isValidSlug;
exports.isValidUUID = isValidUUID;
exports.isValidCUID = isValidCUID;
exports.isValidURL = isValidURL;
exports.isValidHexColor = isValidHexColor;
exports.checkPasswordStrength = checkPasswordStrength;
exports.sanitizeString = sanitizeString;
exports.normalizeEmail = normalizeEmail;
exports.validatePagination = validatePagination;
const app_constants_1 = require("../../common/constants/app.constants");
/**
 * Check if a string is a valid email
 */
function isValidEmail(email) {
    return app_constants_1.REGEX.EMAIL.test(email);
}
/**
 * Check if a string is a valid username
 */
function isValidUsername(username) {
    return app_constants_1.REGEX.USERNAME.test(username);
}
/**
 * Check if a string is a valid slug
 */
function isValidSlug(slug) {
    return app_constants_1.REGEX.SLUG.test(slug);
}
/**
 * Check if a string is a valid UUID
 */
function isValidUUID(uuid) {
    return app_constants_1.REGEX.UUID.test(uuid);
}
/**
 * Check if a string is a valid CUID
 */
function isValidCUID(cuid) {
    return app_constants_1.REGEX.CUID.test(cuid);
}
/**
 * Check if a string is a valid URL
 */
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Check if a string is a valid hex color
 */
function isValidHexColor(color) {
    return app_constants_1.REGEX.HEX_COLOR.test(color);
}
/**
 * Password strength score thresholds
 */
const STRENGTH_LEVELS = [
    'very_weak',
    'weak',
    'fair',
    'strong',
    'very_strong',
];
/**
 * Check password strength
 */
function checkPasswordStrength(password) {
    const feedback = [];
    let score = 0;
    // Length checks
    if (password.length >= 8)
        score++;
    if (password.length >= 12)
        score++;
    if (password.length < 8)
        feedback.push('Use at least 8 characters');
    // Character variety checks
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    if (hasLowercase)
        score += 0.5;
    else
        feedback.push('Add lowercase letters');
    if (hasUppercase)
        score += 0.5;
    else
        feedback.push('Add uppercase letters');
    if (hasNumbers)
        score += 0.5;
    else
        feedback.push('Add numbers');
    if (hasSpecial)
        score += 0.5;
    else
        feedback.push('Add special characters');
    // Common patterns (reduce score)
    if (/^[a-zA-Z]+$/.test(password))
        score -= 0.5;
    if (/^[0-9]+$/.test(password))
        score -= 0.5;
    if (/(.)\1{2,}/.test(password)) {
        score -= 0.5;
        feedback.push('Avoid repeated characters');
    }
    // Normalize score to 0-4
    const normalizedScore = Math.max(0, Math.min(4, Math.floor(score)));
    return {
        score: normalizedScore,
        level: STRENGTH_LEVELS[normalizedScore],
        feedback,
    };
}
/**
 * Sanitize a string for safe output
 */
function sanitizeString(str) {
    return str
        .trim()
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '');
}
/**
 * Normalize email address
 */
function normalizeEmail(email) {
    const trimmedEmail = email.toLowerCase().trim();
    const [local, domain] = trimmedEmail.split('@');
    if (!local || !domain)
        return trimmedEmail;
    // Remove dots and everything after + in Gmail addresses
    if (domain === 'gmail.com' || domain === 'googlemail.com') {
        const normalizedLocal = local.replace(/\./g, '').split('+')[0];
        return `${normalizedLocal}@${domain}`;
    }
    return trimmedEmail;
}
const DEFAULT_PAGINATION = {
    page: app_constants_1.PAGINATION.DEFAULT_PAGE,
    limit: app_constants_1.PAGINATION.DEFAULT_LIMIT,
    maxLimit: app_constants_1.PAGINATION.MAX_LIMIT,
};
/**
 * Validate pagination parameters
 */
function validatePagination(page, limit, defaults = DEFAULT_PAGINATION) {
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : page;
    const parsedLimit = typeof limit === 'string' ? parseInt(limit, 10) : limit;
    const validPage = Number.isNaN(parsedPage) || !parsedPage || parsedPage < 1
        ? defaults.page
        : parsedPage;
    const validLimit = Number.isNaN(parsedLimit) || !parsedLimit || parsedLimit < 1
        ? defaults.limit
        : Math.min(parsedLimit, defaults.maxLimit);
    return {
        page: validPage,
        limit: validLimit,
        skip: (validPage - 1) * validLimit,
    };
}
//# sourceMappingURL=validation.utils.js.map