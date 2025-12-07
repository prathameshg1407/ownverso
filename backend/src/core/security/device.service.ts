// ==== FILE: src/core/security/device.service.ts ====

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
 * Browser patterns for detection
 */
const BROWSER_PATTERNS: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /Edg\/[\d.]+/, name: 'Edge' },
  { pattern: /OPR\/[\d.]+/, name: 'Opera' },
  { pattern: /Chrome\/[\d.]+/, name: 'Chrome' },
  { pattern: /Firefox\/[\d.]+/, name: 'Firefox' },
  { pattern: /Safari\/[\d.]+/, name: 'Safari' },
  { pattern: /MSIE [\d.]+/, name: 'Internet Explorer' },
  { pattern: /Trident\/[\d.]+/, name: 'Internet Explorer' },
];

/**
 * OS patterns for detection
 */
const OS_PATTERNS: Array<{ pattern: RegExp; name: string }> = [
  { pattern: /Windows NT 10/, name: 'Windows 10' },
  { pattern: /Windows NT 6.3/, name: 'Windows 8.1' },
  { pattern: /Windows NT 6.2/, name: 'Windows 8' },
  { pattern: /Windows NT 6.1/, name: 'Windows 7' },
  { pattern: /Windows/, name: 'Windows' },
  { pattern: /Mac OS X ([\d._]+)/, name: 'macOS' },
  { pattern: /Android ([\d.]+)/, name: 'Android' },
  { pattern: /iPhone OS ([\d_]+)/, name: 'iOS' },
  { pattern: /iPad.*OS ([\d_]+)/, name: 'iPadOS' },
  { pattern: /Linux/, name: 'Linux' },
  { pattern: /CrOS/, name: 'Chrome OS' },
];

/**
 * Device type patterns
 */
const DEVICE_TYPE_PATTERNS: Array<{ pattern: RegExp; type: DeviceType }> = [
  { pattern: /iPhone/, type: 'MOBILE' },
  { pattern: /Android.*Mobile/, type: 'MOBILE' },
  { pattern: /Mobile/, type: 'MOBILE' },
  { pattern: /iPad/, type: 'TABLET' },
  { pattern: /Android(?!.*Mobile)/, type: 'TABLET' },
  { pattern: /Tablet/, type: 'TABLET' },
];

/**
 * Device Service
 */
export const deviceService = {
  /**
   * Parse user agent string
   */
  parseUserAgent(userAgent: string | undefined): DeviceInfo {
    if (!userAgent) {
      return {
        deviceType: 'UNKNOWN',
        deviceOs: null,
        browser: null,
        userAgent: null,
      };
    }

    // Detect browser
    let browser: string | null = null;
    for (const { pattern, name } of BROWSER_PATTERNS) {
      if (pattern.test(userAgent)) {
        const match = userAgent.match(pattern);
        if (match) {
          const version = match[0]?.match(/[\d.]+/)?.[0];
          browser = version ? `${name} ${version}` : name;
        } else {
          browser = name;
        }
        break;
      }
    }

    // Detect OS
    let deviceOs: string | null = null;
    for (const { pattern, name } of OS_PATTERNS) {
      const match = userAgent.match(pattern);
      if (match) {
        if (match[1]) {
          deviceOs = `${name} ${match[1].replace(/_/g, '.')}`;
        } else {
          deviceOs = name;
        }
        break;
      }
    }

    // Detect device type
    let deviceType: DeviceType = 'DESKTOP';
    for (const { pattern, type } of DEVICE_TYPE_PATTERNS) {
      if (pattern.test(userAgent)) {
        deviceType = type;
        break;
      }
    }

    return {
      deviceType,
      deviceOs,
      browser,
      userAgent,
    };
  },

  /**
   * Get client IP address from request
   */
  getClientIp(
    ip: string | undefined,
    headers: Record<string, string | string[] | undefined>
  ): string | null {
    // Check common proxy headers
    const forwardedFor = headers['x-forwarded-for'];
    if (forwardedFor) {
      const ips = Array.isArray(forwardedFor) 
        ? forwardedFor[0] 
        : forwardedFor.split(',')[0];
      return ips?.trim() || null;
    }

    const realIp = headers['x-real-ip'];
    if (realIp) {
      return Array.isArray(realIp) ? realIp[0] || null : realIp;
    }

    return ip || null;
  },

  /**
   * Get location from IP (placeholder - integrate with GeoIP service)
   */
  async getLocationFromIp(_ip: string | null): Promise<LocationInfo> {
    // TODO: Integrate with MaxMind GeoIP or similar service
    // For now, return null values
    return {
      country: null,
      city: null,
    };
  },

  /**
   * Get full device info for session
   */
  async getSessionDeviceInfo(
    userAgent: string | undefined,
    ip: string | undefined,
    headers: Record<string, string | string[] | undefined>
  ): Promise<SessionDeviceInfo> {
    const deviceInfo = this.parseUserAgent(userAgent);
    const ipAddress = this.getClientIp(ip, headers);
    const locationInfo = await this.getLocationFromIp(ipAddress);

    return {
      ...deviceInfo,
      ...locationInfo,
      ipAddress,
    };
  },

  /**
   * Generate device fingerprint (for additional verification)
   */
  generateFingerprint(deviceInfo: SessionDeviceInfo): string {
    const components = [
      deviceInfo.deviceType,
      deviceInfo.deviceOs,
      deviceInfo.browser,
    ].filter(Boolean);

    return components.join('|');
  },

  /**
   * Format device info for display
   */
  formatDeviceDescription(deviceInfo: DeviceInfo): string {
    const parts: string[] = [];

    if (deviceInfo.browser) {
      parts.push(deviceInfo.browser);
    }

    if (deviceInfo.deviceOs) {
      parts.push(`on ${deviceInfo.deviceOs}`);
    }

    if (parts.length === 0) {
      return 'Unknown device';
    }

    return parts.join(' ');
  },

  /**
   * Check if device info matches (for security alerts)
   */
  isNewDevice(
    currentDevice: SessionDeviceInfo,
    previousDevices: SessionDeviceInfo[]
  ): boolean {
    const currentFingerprint = this.generateFingerprint(currentDevice);

    return !previousDevices.some((device) => {
      const fingerprint = this.generateFingerprint(device);
      return fingerprint === currentFingerprint;
    });
  },
};

export type DeviceService = typeof deviceService;