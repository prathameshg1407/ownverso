/**
 * Theme Service
 */
import type { PlatformTier } from '@prisma/client';
import type { ThemeDTO, ThemeSummaryDTO } from '../types/site.types';
export declare const themeService: {
    /**
     * List available themes for user's tier
     */
    listThemes(authorId: bigint): Promise<ThemeSummaryDTO[]>;
    /**
     * List all public themes (admin)
     */
    listAllThemes(): Promise<ThemeDTO[]>;
    /**
     * Get theme by ID
     */
    getTheme(themeId: string): Promise<ThemeDTO>;
    /**
     * Apply theme to site
     */
    applyTheme(siteId: string, themeId: string, authorId: bigint): Promise<void>;
    /**
     * Remove theme from site (use default)
     */
    removeTheme(siteId: string): Promise<void>;
    /**
     * Check if theme is available for tier
     */
    isThemeAvailableForTier(themeId: string, tier: PlatformTier): Promise<boolean>;
};
export type ThemeService = typeof themeService;
//# sourceMappingURL=theme.service.d.ts.map