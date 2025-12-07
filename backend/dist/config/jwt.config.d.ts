/**
 * JWT Configuration
 */
export declare const jwtConfig: {
    /**
     * Access token configuration
     */
    readonly access: {
        readonly secret: string;
        readonly expiresIn: string;
        readonly expiresInMs: number;
    };
    /**
     * Refresh token configuration
     */
    readonly refresh: {
        readonly secret: string;
        readonly expiresIn: string;
        readonly expiresInMs: number;
    };
    /**
     * Token issuer
     */
    readonly issuer: string;
    /**
     * Token audience
     */
    readonly audience: string;
    /**
     * Algorithm for signing
     */
    readonly algorithm: "HS256";
};
export type JwtConfig = typeof jwtConfig;
//# sourceMappingURL=jwt.config.d.ts.map