/**
 * Theme Repository
 */
import { Prisma, PlatformTier } from '@prisma/client';
export interface FindThemesOptions {
    isPublic?: boolean;
    isPremium?: boolean;
    requiredTier?: PlatformTier;
    search?: string;
    page?: number;
    limit?: number;
}
export declare const themeRepository: {
    /**
     * Find by ID
     */
    findById(id: string): Promise<{
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublic: boolean;
        thumbnailUrl: string | null;
        previewUrl: string | null;
        styles: Prisma.JsonValue;
        colorSchemes: Prisma.JsonValue | null;
        fontOptions: Prisma.JsonValue | null;
        layoutOptions: Prisma.JsonValue | null;
        isPremium: boolean;
        requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
        usageCount: number;
    } | null>;
    /**
     * Find by slug
     */
    findBySlug(slug: string): Promise<{
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublic: boolean;
        thumbnailUrl: string | null;
        previewUrl: string | null;
        styles: Prisma.JsonValue;
        colorSchemes: Prisma.JsonValue | null;
        fontOptions: Prisma.JsonValue | null;
        layoutOptions: Prisma.JsonValue | null;
        isPremium: boolean;
        requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
        usageCount: number;
    } | null>;
    /**
     * Find all public themes
     */
    findPublic(): Promise<{
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublic: boolean;
        thumbnailUrl: string | null;
        previewUrl: string | null;
        styles: Prisma.JsonValue;
        colorSchemes: Prisma.JsonValue | null;
        fontOptions: Prisma.JsonValue | null;
        layoutOptions: Prisma.JsonValue | null;
        isPremium: boolean;
        requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
        usageCount: number;
    }[]>;
    /**
     * Find themes available for a tier
     */
    findAvailableForTier(tier: PlatformTier): Promise<{
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublic: boolean;
        thumbnailUrl: string | null;
        previewUrl: string | null;
        styles: Prisma.JsonValue;
        colorSchemes: Prisma.JsonValue | null;
        fontOptions: Prisma.JsonValue | null;
        layoutOptions: Prisma.JsonValue | null;
        isPremium: boolean;
        requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
        usageCount: number;
    }[]>;
    /**
     * Find themes with pagination
     */
    findMany(options?: FindThemesOptions): Promise<{
        themes: {
            name: string;
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            slug: string;
            isPublic: boolean;
            thumbnailUrl: string | null;
            previewUrl: string | null;
            styles: Prisma.JsonValue;
            colorSchemes: Prisma.JsonValue | null;
            fontOptions: Prisma.JsonValue | null;
            layoutOptions: Prisma.JsonValue | null;
            isPremium: boolean;
            requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
            usageCount: number;
        }[];
        total: number;
    }>;
    /**
     * Increment usage count
     */
    incrementUsage(id: string): Promise<{
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublic: boolean;
        thumbnailUrl: string | null;
        previewUrl: string | null;
        styles: Prisma.JsonValue;
        colorSchemes: Prisma.JsonValue | null;
        fontOptions: Prisma.JsonValue | null;
        layoutOptions: Prisma.JsonValue | null;
        isPremium: boolean;
        requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
        usageCount: number;
    }>;
    /**
     * Decrement usage count
     */
    decrementUsage(id: string): Promise<{
        name: string;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
        isPublic: boolean;
        thumbnailUrl: string | null;
        previewUrl: string | null;
        styles: Prisma.JsonValue;
        colorSchemes: Prisma.JsonValue | null;
        fontOptions: Prisma.JsonValue | null;
        layoutOptions: Prisma.JsonValue | null;
        isPremium: boolean;
        requiredTier: import("@prisma/client").$Enums.PlatformTier | null;
        usageCount: number;
    }>;
};
export type ThemeRepository = typeof themeRepository;
//# sourceMappingURL=theme.repository.d.ts.map