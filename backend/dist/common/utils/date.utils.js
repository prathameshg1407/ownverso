"use strict";
/**
 * Date Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRange = exports.dateCompare = exports.dateDiff = exports.addTime = void 0;
exports.toISOString = toISOString;
exports.formatDate = formatDate;
exports.timeAgo = timeAgo;
exports.isExpired = isExpired;
exports.getExpiryDate = getExpiryDate;
exports.parseDuration = parseDuration;
const date_fns_1 = require("date-fns");
/**
 * Format a date to ISO string
 */
function toISOString(date) {
    return date.toISOString();
}
/**
 * Format a date to a readable string
 */
function formatDate(date, formatStr = 'yyyy-MM-dd HH:mm:ss') {
    const d = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    return (0, date_fns_1.format)(d, formatStr);
}
/**
 * Get relative time string (e.g., "2 hours ago")
 */
function timeAgo(date) {
    const d = typeof date === 'string' ? (0, date_fns_1.parseISO)(date) : date;
    return (0, date_fns_1.formatDistanceToNow)(d, { addSuffix: true });
}
/**
 * Add time to a date
 */
exports.addTime = {
    minutes: (date, amount) => (0, date_fns_1.addMinutes)(date, amount),
    hours: (date, amount) => (0, date_fns_1.addHours)(date, amount),
    days: (date, amount) => (0, date_fns_1.addDays)(date, amount),
    months: (date, amount) => (0, date_fns_1.addMonths)(date, amount),
    years: (date, amount) => (0, date_fns_1.addYears)(date, amount),
};
/**
 * Calculate difference between dates
 */
exports.dateDiff = {
    seconds: (start, end) => (0, date_fns_1.differenceInSeconds)(end, start),
    minutes: (start, end) => (0, date_fns_1.differenceInMinutes)(end, start),
    hours: (start, end) => (0, date_fns_1.differenceInHours)(end, start),
    days: (start, end) => (0, date_fns_1.differenceInDays)(end, start),
    months: (start, end) => (0, date_fns_1.differenceInMonths)(end, start),
};
/**
 * Date comparison helpers
 */
exports.dateCompare = {
    isAfter: date_fns_1.isAfter,
    isBefore: date_fns_1.isBefore,
    isEqual: date_fns_1.isEqual,
};
/**
 * Date range helpers
 */
exports.dateRange = {
    startOfDay: date_fns_1.startOfDay,
    endOfDay: date_fns_1.endOfDay,
    startOfMonth: date_fns_1.startOfMonth,
    endOfMonth: date_fns_1.endOfMonth,
    startOfWeek: (date) => (0, date_fns_1.startOfWeek)(date, { weekStartsOn: 1 }),
    endOfWeek: (date) => (0, date_fns_1.endOfWeek)(date, { weekStartsOn: 1 }),
};
/**
 * Check if a date is expired
 */
function isExpired(date) {
    return (0, date_fns_1.isBefore)(date, new Date());
}
/**
 * Get expiry date from now
 */
function getExpiryDate(amount, unit = 'hours') {
    const now = new Date();
    switch (unit) {
        case 'minutes':
            return (0, date_fns_1.addMinutes)(now, amount);
        case 'hours':
            return (0, date_fns_1.addHours)(now, amount);
        case 'days':
            return (0, date_fns_1.addDays)(now, amount);
        case 'months':
            return (0, date_fns_1.addMonths)(now, amount);
        default:
            return (0, date_fns_1.addHours)(now, amount);
    }
}
/**
 * Parse duration string (e.g., "15m", "1h", "7d") to milliseconds
 */
function parseDuration(duration) {
    const match = duration.match(/^(\d+)(s|m|h|d|w|M|y)$/);
    if (!match) {
        throw new Error(`Invalid duration format: ${duration}`);
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    const multipliers = {
        s: 1000,
        m: 60 * 1000,
        h: 60 * 60 * 1000,
        d: 24 * 60 * 60 * 1000,
        w: 7 * 24 * 60 * 60 * 1000,
        M: 30 * 24 * 60 * 60 * 1000,
        y: 365 * 24 * 60 * 60 * 1000,
    };
    return value * (multipliers[unit] || 0);
}
//# sourceMappingURL=date.utils.js.map