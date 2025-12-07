/**
 * Date Utilities
 */

import {
  format,
  formatDistanceToNow,
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addYears,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  isAfter,
  isBefore,
  isEqual,
  parseISO,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

/**
 * Format a date to ISO string
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Format a date to a readable string
 */
export function formatDate(
  date: Date | string,
  formatStr: string = 'yyyy-MM-dd HH:mm:ss'
): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, formatStr);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}

/**
 * Add time to a date
 */
export const addTime = {
  minutes: (date: Date, amount: number) => addMinutes(date, amount),
  hours: (date: Date, amount: number) => addHours(date, amount),
  days: (date: Date, amount: number) => addDays(date, amount),
  months: (date: Date, amount: number) => addMonths(date, amount),
  years: (date: Date, amount: number) => addYears(date, amount),
};

/**
 * Calculate difference between dates
 */
export const dateDiff = {
  seconds: (start: Date, end: Date) => differenceInSeconds(end, start),
  minutes: (start: Date, end: Date) => differenceInMinutes(end, start),
  hours: (start: Date, end: Date) => differenceInHours(end, start),
  days: (start: Date, end: Date) => differenceInDays(end, start),
  months: (start: Date, end: Date) => differenceInMonths(end, start),
};

/**
 * Date comparison helpers
 */
export const dateCompare = {
  isAfter,
  isBefore,
  isEqual,
};

/**
 * Date range helpers
 */
export const dateRange = {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  endOfWeek: (date: Date) => endOfWeek(date, { weekStartsOn: 1 }),
};

/**
 * Check if a date is expired
 */
export function isExpired(date: Date): boolean {
  return isBefore(date, new Date());
}

/**
 * Get expiry date from now
 */
export function getExpiryDate(
  amount: number,
  unit: 'minutes' | 'hours' | 'days' | 'months' = 'hours'
): Date {
  const now = new Date();
  switch (unit) {
    case 'minutes':
      return addMinutes(now, amount);
    case 'hours':
      return addHours(now, amount);
    case 'days':
      return addDays(now, amount);
    case 'months':
      return addMonths(now, amount);
    default:
      return addHours(now, amount);
  }
}

/**
 * Parse duration string (e.g., "15m", "1h", "7d") to milliseconds
 */
export function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)(s|m|h|d|w|M|y)$/);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }

  const value = parseInt(match[1]!, 10);
  const unit = match[2];

  const multipliers: Record<string, number> = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
    w: 7 * 24 * 60 * 60 * 1000,
    M: 30 * 24 * 60 * 60 * 1000,
    y: 365 * 24 * 60 * 60 * 1000,
  };

  return value * (multipliers[unit!] || 0);
}