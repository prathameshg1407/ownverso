/**
 * User Domain Constants
 */
export declare const RESERVED_USERNAMES: readonly ["admin", "administrator", "root", "system", "support", "help", "info", "contact", "about", "settings", "profile", "api", "auth", "login", "logout", "register", "signup", "ownverso", "official", "moderator", "mod", "staff", "security", "legal", "privacy", "terms", "copyright", "null", "undefined", "anonymous", "guest", "user"];
export declare const VALID_LOCALES: readonly ["en", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ko", "hi", "ar", "bn", "id", "ms", "th", "vi", "tr", "pl", "nl"];
export declare const USER_DEFAULTS: {
    readonly LOCALE: "en";
    readonly TIMEZONE: "UTC";
    readonly DATA_REGION: "NORTH_AMERICA";
    readonly EMAIL_DIGEST_FREQUENCY: "WEEKLY";
    readonly CONTENT_RATINGS: readonly ["EVERYONE", "TEEN"];
};
export declare const USER_LIMITS: {
    readonly USERNAME_MIN_LENGTH: 3;
    readonly USERNAME_MAX_LENGTH: 30;
    readonly DISPLAY_NAME_MAX_LENGTH: 100;
    readonly BIO_MAX_LENGTH: 2000;
    readonly URL_MAX_LENGTH: 2048;
    readonly SOCIAL_HANDLE_MAX_LENGTH: 50;
    readonly STATUS_HISTORY_MAX_ENTRIES: 20;
    readonly MAX_ACTIVE_SESSIONS: 10;
};
export type ReservedUsername = (typeof RESERVED_USERNAMES)[number];
export type ValidLocale = (typeof VALID_LOCALES)[number];
//# sourceMappingURL=user.constants.d.ts.map