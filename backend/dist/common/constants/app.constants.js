"use strict";
/**
 * Application Constants
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FILE_UPLOAD = exports.REGEX = exports.HEADERS = exports.API = exports.SESSION = exports.CONTENT_LIMITS = exports.FILE_LIMITS = exports.TOKEN_EXPIRY = exports.RATE_LIMIT_WINDOW = exports.CACHE_TTL = exports.PAGINATION = void 0;
/**
 * Pagination defaults
 */
exports.PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
    MIN_LIMIT: 1,
};
/**
 * Cache TTL values (in seconds)
 */
exports.CACHE_TTL = {
    SHORT: 60, // 1 minute
    MEDIUM: 300, // 5 minutes
    LONG: 3600, // 1 hour
    DAY: 86400, // 24 hours
    WEEK: 604800, // 7 days
};
/**
 * Rate limit windows (in milliseconds)
 */
exports.RATE_LIMIT_WINDOW = {
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
};
/**
 * Token expiration times
 */
exports.TOKEN_EXPIRY = {
    EMAIL_VERIFICATION: '24h',
    PASSWORD_RESET: '1h',
    MFA_SETUP: '10m',
    REFRESH_TOKEN: '7d',
    ACCESS_TOKEN: '15m',
};
/**
 * File upload limits
 */
exports.FILE_LIMITS = {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_IMAGE_SIZE: 5 * 1024 * 1024, // 5MB
    MAX_AVATAR_SIZE: 2 * 1024 * 1024, // 2MB
    MAX_FILES_PER_REQUEST: 10,
};
/**
 * Content limits
 */
exports.CONTENT_LIMITS = {
    MAX_TITLE_LENGTH: 200,
    MAX_SLUG_LENGTH: 100,
    MAX_SYNOPSIS_LENGTH: 5000,
    MAX_CHAPTER_CONTENT_LENGTH: 500000,
    MAX_COMMENT_LENGTH: 10000,
    MAX_BIO_LENGTH: 1000,
    MAX_TAGS_PER_SERIES: 20,
    MAX_GENRES_PER_SERIES: 5,
};
/**
 * Session settings
 */
exports.SESSION = {
    MAX_SESSIONS_PER_USER: 10,
    IDLE_TIMEOUT_HOURS: 24,
    ABSOLUTE_TIMEOUT_DAYS: 30,
};
/**
 * API versioning
 */
exports.API = {
    CURRENT_VERSION: 'v1',
    SUPPORTED_VERSIONS: ['v1'],
    PREFIX: '/api',
};
/**
 * Request headers
 */
exports.HEADERS = {
    REQUEST_ID: 'x-request-id',
    CORRELATION_ID: 'x-correlation-id',
    AUTHORIZATION: 'authorization',
    API_KEY: 'x-api-key',
    RATE_LIMIT_REMAINING: 'x-ratelimit-remaining',
    RATE_LIMIT_RESET: 'x-ratelimit-reset',
};
/**
 * Regex patterns
 */
exports.REGEX = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    USERNAME: /^[a-zA-Z0-9_-]{3,30}$/,
    SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    CUID: /^c[a-z0-9]{24}$/,
    HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    URL: /^https?:\/\/.+/,
    PHONE: /^\+?[1-9]\d{1,14}$/,
};
/**
 * File upload constants
 */
exports.FILE_UPLOAD = {
    AVATAR: {
        MAX_SIZE: 5 * 1024 * 1024, // 5MB
        ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
};
//# sourceMappingURL=app.constants.js.map