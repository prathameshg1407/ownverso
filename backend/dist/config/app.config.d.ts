/**
 * Application Configuration
 */
export declare const appConfig: {
    /**
     * Application name
     */
    readonly name: string;
    /**
     * Application version
     */
    readonly version: string;
    /**
     * Node environment
     */
    readonly nodeEnv: "development" | "test" | "staging" | "production";
    /**
     * Server port
     */
    readonly port: number;
    /**
     * Server host
     */
    readonly host: string;
    /**
     * Application URL (for generating links)
     */
    readonly url: string;
    /**
     * Frontend URL (for CORS and redirects)
     */
    readonly frontendUrl: string;
    /**
     * Is development environment
     */
    readonly isDevelopment: boolean;
    /**
     * Is production environment
     */
    readonly isProduction: boolean;
    /**
     * Is test environment
     */
    readonly isTest: boolean;
    /**
     * Log level
     */
    readonly logLevel: string;
    /**
     * Log format
     */
    readonly logFormat: "json" | "pretty";
};
export type AppConfig = typeof appConfig;
//# sourceMappingURL=app.config.d.ts.map