"use strict";
/**
 * String Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = slugify;
exports.truncate = truncate;
exports.capitalize = capitalize;
exports.titleCase = titleCase;
exports.camelToSnake = camelToSnake;
exports.snakeToCamel = snakeToCamel;
exports.stripHtml = stripHtml;
exports.escapeHtml = escapeHtml;
exports.randomString = randomString;
exports.maskEmail = maskEmail;
exports.isBlank = isBlank;
exports.getInitials = getInitials;
/**
 * Generate a URL-safe slug from a string
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start
        .replace(/-+$/, ''); // Trim - from end
}
/**
 * Truncate a string to a specified length
 */
function truncate(str, length, suffix = '...') {
    if (str.length <= length) {
        return str;
    }
    return str.slice(0, length - suffix.length) + suffix;
}
/**
 * Capitalize first letter of a string
 */
function capitalize(str) {
    if (!str)
        return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * Convert string to title case
 */
function titleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => capitalize(word))
        .join(' ');
}
/**
 * Convert camelCase to snake_case
 */
function camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
/**
 * Convert snake_case to camelCase
 */
function snakeToCamel(str) {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}
/**
 * Remove HTML tags from a string
 */
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
}
/**
 * Escape HTML special characters
 */
function escapeHtml(str) {
    const htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}
/**
 * Generate a random string
 */
function randomString(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
/**
 * Mask sensitive data (e.g., email, phone)
 */
function maskEmail(email) {
    const [local, domain] = email.split('@');
    if (!local || !domain)
        return email;
    const maskedLocal = local.length <= 2
        ? '*'.repeat(local.length)
        : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];
    return `${maskedLocal}@${domain}`;
}
/**
 * Check if string is empty or whitespace only
 */
function isBlank(str) {
    return !str || str.trim().length === 0;
}
/**
 * Extract initials from a name
 */
function getInitials(name, maxLength = 2) {
    return name
        .split(' ')
        .map((word) => word[0])
        .filter(Boolean)
        .slice(0, maxLength)
        .join('')
        .toUpperCase();
}
//# sourceMappingURL=string.utils.js.map