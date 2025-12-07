/**
 * Application Constants
 */
/**
 * Pagination defaults
 */
export declare const PAGINATION: {
    readonly DEFAULT_PAGE: 1;
    readonly DEFAULT_LIMIT: 20;
    readonly MAX_LIMIT: 100;
    readonly MIN_LIMIT: 1;
};
/**
 * Cache TTL values (in seconds)
 */
export declare const CACHE_TTL: {
    readonly SHORT: 60;
    readonly MEDIUM: 300;
    readonly LONG: 3600;
    readonly DAY: 86400;
    readonly WEEK: 604800;
};
/**
 * Rate limit windows (in milliseconds)
 */
export declare const RATE_LIMIT_WINDOW: {
    readonly SECOND: 1000;
    readonly MINUTE: 60000;
    readonly HOUR: 3600000;
    readonly DAY: 86400000;
};
/**
 * Token expiration times
 */
export declare const TOKEN_EXPIRY: {
    readonly EMAIL_VERIFICATION: "24h";
    readonly PASSWORD_RESET: "1h";
    readonly MFA_SETUP: "10m";
    readonly REFRESH_TOKEN: "7d";
    readonly ACCESS_TOKEN: "15m";
};
/**
 * File upload limits
 */
export declare const FILE_LIMITS: {
    readonly MAX_FILE_SIZE: number;
    readonly MAX_IMAGE_SIZE: number;
    readonly MAX_AVATAR_SIZE: number;
    readonly MAX_FILES_PER_REQUEST: 10;
};
/**
 * Content limits
 */
export declare const CONTENT_LIMITS: {
    readonly MAX_TITLE_LENGTH: 200;
    readonly MAX_SLUG_LENGTH: 100;
    readonly MAX_SYNOPSIS_LENGTH: 5000;
    readonly MAX_CHAPTER_CONTENT_LENGTH: 500000;
    readonly MAX_COMMENT_LENGTH: 10000;
    readonly MAX_BIO_LENGTH: 1000;
    readonly MAX_TAGS_PER_SERIES: 20;
    readonly MAX_GENRES_PER_SERIES: 5;
};
/**
 * Session settings
 */
export declare const SESSION: {
    readonly MAX_SESSIONS_PER_USER: 10;
    readonly IDLE_TIMEOUT_HOURS: 24;
    readonly ABSOLUTE_TIMEOUT_DAYS: 30;
};
/**
 * API versioning
 */
export declare const API: {
    readonly CURRENT_VERSION: "v1";
    readonly SUPPORTED_VERSIONS: readonly ["v1"];
    readonly PREFIX: "/api";
};
/**
 * Request headers
 */
export declare const HEADERS: {
    readonly REQUEST_ID: "x-request-id";
    readonly CORRELATION_ID: "x-correlation-id";
    readonly AUTHORIZATION: "authorization";
    readonly API_KEY: "x-api-key";
    readonly RATE_LIMIT_REMAINING: "x-ratelimit-remaining";
    readonly RATE_LIMIT_RESET: "x-ratelimit-reset";
};
/**
 * Regex patterns
 */
export declare const REGEX: {
    readonly EMAIL: RegExp;
    readonly USERNAME: RegExp;
    readonly SLUG: RegExp;
    readonly UUID: RegExp;
    readonly CUID: RegExp;
    readonly HEX_COLOR: RegExp;
    readonly URL: RegExp;
    readonly PHONE: RegExp;
};
/**
 * File upload constants
 */
export declare const FILE_UPLOAD: {
    readonly AVATAR: {
        readonly MAX_SIZE: number;
        readonly ALLOWED_TYPES: readonly ["image/jpeg", "image/png", "image/gif", "image/webp"];
        readonly ALLOWED_EXTENSIONS: readonly [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    };
};
//# sourceMappingURL=app.constants.d.ts.map