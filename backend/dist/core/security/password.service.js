"use strict";
// ==== FILE: src/core/security/password.service.ts ====
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordService = void 0;
/**
 * Password Service
 *
 * Handles password hashing, verification, and strength validation.
 */
const argon2_1 = require("argon2");
const config_1 = require("../../config");
const logger_1 = require("../../core/logger");
/**
 * Common passwords to check against (subset)
 */
const COMMON_PASSWORDS = new Set([
    'password', 'password123', '123456', '12345678', 'qwerty', 'abc123',
    'monkey', 'master', 'dragon', 'letmein', 'login', 'welcome',
    'admin', 'princess', 'starwars', 'passw0rd', 'shadow', 'sunshine',
    'iloveyou', 'trustno1', 'football', 'baseball', 'superman', 'batman',
]);
/**
 * Password Service
 */
exports.passwordService = {
    /**
     * Hash a password using Argon2id
     */
    async hash(password) {
        const options = {
            type: 2, // Argon2id
            memoryCost: config_1.config.argon2.memoryCost,
            timeCost: config_1.config.argon2.timeCost,
            parallelism: config_1.config.argon2.parallelism,
        };
        try {
            return await (0, argon2_1.hash)(password, options);
        }
        catch (error) {
            logger_1.logger.error({ error }, 'Password hashing failed');
            throw new Error('Failed to hash password');
        }
    },
    /**
     * Verify a password against a hash
     */
    async verify(passwordHash, password) {
        try {
            return await (0, argon2_1.verify)(passwordHash, password);
        }
        catch (error) {
            logger_1.logger.debug({ error }, 'Password verification failed');
            return false;
        }
    },
    /**
     * Validate password meets requirements
     */
    validate(password) {
        const errors = [];
        const { password: requirements } = config_1.config.auth;
        if (password.length < requirements.minLength) {
            errors.push(`Password must be at least ${requirements.minLength} characters`);
        }
        if (password.length > requirements.maxLength) {
            errors.push(`Password must be at most ${requirements.maxLength} characters`);
        }
        if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (requirements.requireLowercase && !/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (requirements.requireNumbers && !/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (requirements.requireSpecialChars && !/[^a-zA-Z0-9]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }
        return {
            isValid: errors.length === 0,
            errors,
        };
    },
    /**
     * Check password strength
     */
    checkStrength(password) {
        const feedback = [];
        let score = 0;
        // Length scoring
        if (password.length >= 8)
            score += 1;
        if (password.length >= 12)
            score += 1;
        if (password.length >= 16)
            score += 0.5;
        if (password.length < 8) {
            feedback.push('Use at least 8 characters');
        }
        else if (password.length < 12) {
            feedback.push('Consider using 12+ characters for better security');
        }
        // Character variety
        const hasLower = /[a-z]/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasDigit = /[0-9]/.test(password);
        const hasSpecial = /[^a-zA-Z0-9]/.test(password);
        const varietyCount = [hasLower, hasUpper, hasDigit, hasSpecial].filter(Boolean).length;
        score += varietyCount * 0.5;
        if (!hasLower)
            feedback.push('Add lowercase letters');
        if (!hasUpper)
            feedback.push('Add uppercase letters');
        if (!hasDigit)
            feedback.push('Add numbers');
        if (!hasSpecial)
            feedback.push('Add special characters (!@#$%^&*)');
        // Pattern penalties
        if (/(.)\1{2,}/.test(password)) {
            score -= 0.5;
            feedback.push('Avoid repeated characters');
        }
        if (/^[a-zA-Z]+$/.test(password)) {
            score -= 0.5;
            feedback.push('Mix letters with numbers or symbols');
        }
        if (/^[0-9]+$/.test(password)) {
            score -= 1;
            feedback.push('Don\'t use only numbers');
        }
        // Sequential patterns
        if (/(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(password)) {
            score -= 0.5;
            feedback.push('Avoid sequential letters');
        }
        if (/(?:012|123|234|345|456|567|678|789|890)/.test(password)) {
            score -= 0.5;
            feedback.push('Avoid sequential numbers');
        }
        // Common password check
        if (COMMON_PASSWORDS.has(password.toLowerCase())) {
            score = 0;
            feedback.unshift('This is a commonly used password');
        }
        // Normalize score to 0-4
        score = Math.max(0, Math.min(4, Math.round(score)));
        const levels = [
            'very_weak',
            'weak',
            'fair',
            'strong',
            'very_strong',
        ];
        return {
            score,
            level: levels[score],
            feedback: feedback.slice(0, 3), // Limit feedback to top 3
            isAcceptable: score >= 2,
        };
    },
    /**
     * Check if password is compromised (placeholder for HaveIBeenPwned integration)
     */
    async isCompromised(_password) {
        // TODO: Implement HaveIBeenPwned k-Anonymity API check
        // For now, just check against common passwords
        return COMMON_PASSWORDS.has(_password.toLowerCase());
    },
    /**
     * Generate a random password
     */
    generateRandom(length = 16) {
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const special = '!@#$%^&*';
        const allChars = lowercase + uppercase + numbers + special;
        // Ensure at least one of each type
        let password = '';
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
        password += numbers[Math.floor(Math.random() * numbers.length)];
        password += special[Math.floor(Math.random() * special.length)];
        // Fill rest with random characters
        for (let i = password.length; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        // Shuffle the password
        return password
            .split('')
            .sort(() => Math.random() - 0.5)
            .join('');
    },
};
//# sourceMappingURL=password.service.js.map