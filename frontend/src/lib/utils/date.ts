/**
 * Date Utilities
 */

import {
  format,
  formatDistance,
  formatRelative,
  isToday,
  isYesterday,
  isThisWeek,
  isThisYear,
  parseISO,
} from 'date-fns';

/**
 * Parse date string to Date object
 */
export function parseDate(date: string | Date): Date {
  if (date instanceof Date) return date;
  return parseISO(date);
}

/**
 * Format date with pattern
 */
export function formatDate(
  date: string | Date,
  pattern: string = 'MMM d, yyyy'
): string {
  return format(parseDate(date), pattern);
}

/**
 * Format date and time
 */
export function formatDateTime(
  date: string | Date,
  pattern: string = 'MMM d, yyyy h:mm a'
): string {
  return format(parseDate(date), pattern);
}

/**
 * Format date relative to now (e.g., "2 hours ago")
 */
export function formatTimeAgo(date: string | Date): string {
  return formatDistance(parseDate(date), new Date(), { addSuffix: true });
}

/**
 * Format date relative to a base date
 */
export function formatRelativeDate(date: string | Date): string {
  return formatRelative(parseDate(date), new Date());
}

/**
 * Smart format - shows relative time for recent, full date for older
 */
export function formatSmartDate(date: string | Date): string {
  const parsed = parseDate(date);

  if (isToday(parsed)) {
    return format(parsed, "'Today at' h:mm a");
  }

  if (isYesterday(parsed)) {
    return format(parsed, "'Yesterday at' h:mm a");
  }

  if (isThisWeek(parsed)) {
    return format(parsed, "EEEE 'at' h:mm a");
  }

  if (isThisYear(parsed)) {
    return format(parsed, 'MMM d');
  }

  return format(parsed, 'MMM d, yyyy');
}

/**
 * Get ISO string from Date
 */
export function toISOString(date: Date): string {
  return date.toISOString();
}

/**
 * Check if date is in the past
 */
export function isPast(date: string | Date): boolean {
  return parseDate(date) < new Date();
}

/**
 * Check if date is in the future
 */
export function isFuture(date: string | Date): boolean {
  return parseDate(date) > new Date();
}