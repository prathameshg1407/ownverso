/**
 * Profile Validators
 */
export declare const profileValidator: {
    validateBio(bio: string | null | undefined): void;
    validateLocale(locale: string): void;
    validateTimezone(timezone: string): void;
    validateUrl(url: string | null | undefined, fieldName: string): void;
    validateSocialHandle(handle: string | null | undefined, platform: string, maxLength?: number): void;
    validateProfileUpdate(data: {
        bio?: string | null;
        locale?: string;
        timezone?: string;
        websiteUrl?: string | null;
        twitterHandle?: string | null;
        instagramHandle?: string | null;
        tiktokHandle?: string | null;
        discordHandle?: string | null;
    }): void;
};
export type ProfileValidator = typeof profileValidator;
//# sourceMappingURL=profile.validator.d.ts.map