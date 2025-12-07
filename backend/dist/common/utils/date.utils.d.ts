/**
 * Date Utilities
 */
import { isAfter, isBefore, isEqual, startOfDay, endOfDay, startOfMonth, endOfMonth } from 'date-fns';
/**
 * Format a date to ISO string
 */
export declare function toISOString(date: Date): string;
/**
 * Format a date to a readable string
 */
export declare function formatDate(date: Date | string, formatStr?: string): string;
/**
 * Get relative time string (e.g., "2 hours ago")
 */
export declare function timeAgo(date: Date | string): string;
/**
 * Add time to a date
 */
export declare const addTime: {
    minutes: (date: Date, amount: number) => Date;
    hours: (date: Date, amount: number) => Date;
    days: (date: Date, amount: number) => Date;
    months: (date: Date, amount: number) => Date;
    years: (date: Date, amount: number) => Date;
};
/**
 * Calculate difference between dates
 */
export declare const dateDiff: {
    seconds: (start: Date, end: Date) => number;
    minutes: (start: Date, end: Date) => number;
    hours: (start: Date, end: Date) => number;
    days: (start: Date, end: Date) => number;
    months: (start: Date, end: Date) => number;
};
/**
 * Date comparison helpers
 */
export declare const dateCompare: {
    isAfter: typeof isAfter;
    isBefore: typeof isBefore;
    isEqual: typeof isEqual;
};
/**
 * Date range helpers
 */
export declare const dateRange: {
    startOfDay: typeof startOfDay;
    endOfDay: typeof endOfDay;
    startOfMonth: typeof startOfMonth;
    endOfMonth: typeof endOfMonth;
    startOfWeek: (date: Date) => Date;
    endOfWeek: (date: Date) => Date;
};
/**
 * Check if a date is expired
 */
export declare function isExpired(date: Date): boolean;
/**
 * Get expiry date from now
 */
export declare function getExpiryDate(amount: number, unit?: 'minutes' | 'hours' | 'days' | 'months'): Date;
/**
 * Parse duration string (e.g., "15m", "1h", "7d") to milliseconds
 */
export declare function parseDuration(duration: string): number;
//# sourceMappingURL=date.utils.d.ts.map