export interface DatabaseConfig {
    url: string;
    logQueries: boolean;
    poolSize: number;
    connectionTimeout: number;
    idleTimeout: number;
}
export declare const databaseConfig: DatabaseConfig;
export declare function validateDatabaseConfig(): void;
//# sourceMappingURL=database.config.d.ts.map