/**
 * Device Service
 *
 * Handles device fingerprinting and user-agent parsing.
 */
import { DeviceType } from '@prisma/client';
/**
 * Parsed device information
 */
export interface DeviceInfo {
    deviceType: DeviceType;
    deviceOs: string | null;
    browser: string | null;
    userAgent: string | null;
}
/**
 * Location information (from IP)
 */
export interface LocationInfo {
    country: string | null;
    city: string | null;
}
/**
 * Full session device info
 */
export interface SessionDeviceInfo extends DeviceInfo, LocationInfo {
    ipAddress: string | null;
}
/**
 * Device Service
 */
export declare const deviceService: {
    /**
     * Parse user agent string
     */
    parseUserAgent(userAgent: string | undefined): DeviceInfo;
    /**
     * Get client IP address from request
     */
    getClientIp(ip: string | undefined, headers: Record<string, string | string[] | undefined>): string | null;
    /**
     * Get location from IP (placeholder - integrate with GeoIP service)
     */
    getLocationFromIp(_ip: string | null): Promise<LocationInfo>;
    /**
     * Get full device info for session
     */
    getSessionDeviceInfo(userAgent: string | undefined, ip: string | undefined, headers: Record<string, string | string[] | undefined>): Promise<SessionDeviceInfo>;
    /**
     * Generate device fingerprint (for additional verification)
     */
    generateFingerprint(deviceInfo: SessionDeviceInfo): string;
    /**
     * Format device info for display
     */
    formatDeviceDescription(deviceInfo: DeviceInfo): string;
    /**
     * Check if device info matches (for security alerts)
     */
    isNewDevice(currentDevice: SessionDeviceInfo, previousDevices: SessionDeviceInfo[]): boolean;
};
export type DeviceService = typeof deviceService;
//# sourceMappingURL=device.service.d.ts.map