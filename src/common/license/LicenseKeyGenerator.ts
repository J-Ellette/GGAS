/**
 * License Key Generator
 * 
 * Generates and validates license keys for GGAS
 * Format: XXXX-XXXX-XXXX-XXXX-XXXX
 * 
 * Components:
 * - Product Code (2 chars): GG (for GGAS)
 * - Version Code (2 chars): 01, 02, etc.
 * - License Type (2 chars): EN (Enterprise), ST (Standard), TR (Trial)
 * - Customer ID Hash (4 chars): Encoded customer identifier
 * - Feature Flags (4 chars): Encoded feature permissions
 * - Expiration (4 chars): Encoded expiration date
 * - Random Salt (4 chars): Anti-pattern security
 * - Checksum (2 chars): Validation checksum
 */

import * as crypto from 'crypto';
import { LicenseType, LicenseFeatures, LicenseGenerationParams } from '../types/license';

export class LicenseKeyGenerator {
  private static readonly PRODUCT_CODE = 'GG';
  private static readonly VERSION_CODE = '01';
  
  private static readonly TYPE_CODES: Record<LicenseType, string> = {
    trial: 'TR',
    standard: 'ST',
    enterprise: 'EN'
  };

  /**
   * Generate a license key
   */
  static generateLicense(params: LicenseGenerationParams): string {
    const productCode = this.PRODUCT_CODE;
    const versionCode = this.VERSION_CODE;
    const typeCode = this.TYPE_CODES[params.licenseType];
    const customerHash = this.hashCustomerId(params.customerId);
    const featureFlags = this.encodeFeatures(params.features);
    const expirationCode = this.encodeExpiration(params.expirationDays);
    const randomSalt = this.generateSecureRandom(4);
    
    const baseKey = productCode + versionCode + typeCode + 
                    customerHash + featureFlags + expirationCode + randomSalt;
    
    const checksum = this.calculateChecksum(baseKey);
    const finalKey = baseKey + checksum;
    
    return this.formatLicenseKey(finalKey);
  }

  /**
   * Validate a license key format
   */
  static validateKeyFormat(licenseKey: string): boolean {
    // Remove dashes
    const cleanKey = licenseKey.replace(/-/g, '');
    
    // Check length (should be 24 characters)
    if (cleanKey.length !== 24) {
      return false;
    }

    // Extract components
    const baseKey = cleanKey.substring(0, 22);
    const providedChecksum = cleanKey.substring(22, 24);
    
    // Verify checksum
    const calculatedChecksum = this.calculateChecksum(baseKey);
    
    return providedChecksum === calculatedChecksum;
  }

  /**
   * Decode license information from key
   */
  static decodeLicense(licenseKey: string): {
    productCode: string;
    versionCode: string;
    licenseType: LicenseType;
    customerHash: string;
    featureFlags: string;
    expirationCode: string;
    valid: boolean;
  } | null {
    if (!this.validateKeyFormat(licenseKey)) {
      return null;
    }

    const cleanKey = licenseKey.replace(/-/g, '');
    
    const productCode = cleanKey.substring(0, 2);
    const versionCode = cleanKey.substring(2, 4);
    const typeCode = cleanKey.substring(4, 6);
    const customerHash = cleanKey.substring(6, 10);
    const featureFlags = cleanKey.substring(10, 14);
    const expirationCode = cleanKey.substring(14, 18);

    // Find license type from code
    const licenseType = Object.entries(this.TYPE_CODES)
      .find(([_, code]) => code === typeCode)?.[0] as LicenseType | undefined;

    if (!licenseType) {
      return null;
    }

    return {
      productCode,
      versionCode,
      licenseType,
      customerHash,
      featureFlags,
      expirationCode,
      valid: true
    };
  }

  /**
   * Check if license is expired
   */
  static isExpired(licenseKey: string): boolean {
    const decoded = this.decodeLicense(licenseKey);
    if (!decoded) {
      return true;
    }

    const expirationDate = this.decodeExpiration(decoded.expirationCode);
    if (!expirationDate) {
      // No expiration
      return false;
    }

    return new Date() > expirationDate;
  }

  /**
   * Hash customer ID to 4-character code
   */
  private static hashCustomerId(customerId: string): string {
    const hash = crypto.createHash('sha256').update(customerId).digest('hex');
    return hash.substring(0, 4).toUpperCase();
  }

  /**
   * Encode features into 4-character code
   */
  private static encodeFeatures(features: LicenseFeatures): string {
    // Simple bit encoding - convert feature flags to a hex value
    let value = 0;
    const featureList = [
      'basic_reporting',
      'advanced_analytics',
      'api_access',
      'multi_user',
      'real_time_monitoring',
      'ai_features'
    ];

    featureList.forEach((feature, index) => {
      if (features[feature]) {
        value |= (1 << index);
      }
    });

    // Convert to 4-character hex string
    return value.toString(16).padStart(4, '0').toUpperCase();
  }

  /**
   * Decode features from 4-character code
   */
  static decodeFeatures(featureCode: string): LicenseFeatures {
    const value = parseInt(featureCode, 16);
    const featureList = [
      'basic_reporting',
      'advanced_analytics',
      'api_access',
      'multi_user',
      'real_time_monitoring',
      'ai_features'
    ];

    const features: LicenseFeatures = {
      basic_reporting: false,
      advanced_analytics: false,
      api_access: false,
      multi_user: false,
      real_time_monitoring: false,
      ai_features: false
    };

    featureList.forEach((feature, index) => {
      features[feature] = (value & (1 << index)) !== 0;
    });

    return features;
  }

  /**
   * Encode expiration date into 4-character code
   */
  private static encodeExpiration(expirationDays?: number): string {
    if (!expirationDays) {
      // No expiration - use FFFF
      return 'FFFF';
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    
    // Encode as days since epoch (2000-01-01) in hex
    const epoch = new Date('2000-01-01');
    const daysSinceEpoch = Math.floor((expirationDate.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysSinceEpoch.toString(16).padStart(4, '0').toUpperCase();
  }

  /**
   * Decode expiration date from 4-character code
   */
  private static decodeExpiration(expirationCode: string): Date | null {
    if (expirationCode === 'FFFF') {
      // No expiration
      return null;
    }

    const daysSinceEpoch = parseInt(expirationCode, 16);
    const epoch = new Date('2000-01-01');
    const expirationDate = new Date(epoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
    
    return expirationDate;
  }

  /**
   * Generate secure random string
   */
  private static generateSecureRandom(length: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const bytes = crypto.randomBytes(length);
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars[bytes[i] % chars.length];
    }
    
    return result;
  }

  /**
   * Calculate checksum for validation
   */
  private static calculateChecksum(data: string): string {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash.substring(0, 2).toUpperCase();
  }

  /**
   * Format license key with dashes
   */
  private static formatLicenseKey(key: string): string {
    // Format as XXXX-XXXX-XXXX-XXXX-XXXX
    const parts = [];
    for (let i = 0; i < key.length; i += 4) {
      parts.push(key.substring(i, i + 4));
    }
    return parts.join('-');
  }

  /**
   * Generate test license keys
   */
  static generateTestLicenses(): { [key: string]: string } {
    return {
      development: this.generateLicense({
        customerId: 'dev-0001',
        companyName: 'Development Test',
        contactEmail: 'dev@test.com',
        licenseType: 'enterprise',
        features: {
          basic_reporting: true,
          advanced_analytics: true,
          api_access: true,
          multi_user: true,
          real_time_monitoring: true,
          ai_features: true
        }
      }),
      trial: this.generateLicense({
        customerId: 'trial-0001',
        companyName: 'Trial User',
        contactEmail: 'trial@test.com',
        licenseType: 'trial',
        features: {
          basic_reporting: true,
          advanced_analytics: false,
          api_access: false,
          multi_user: false,
          real_time_monitoring: false,
          ai_features: false
        },
        expirationDays: 30
      }),
      enterprise: this.generateLicense({
        customerId: 'ent-0001',
        companyName: 'Enterprise Customer',
        contactEmail: 'enterprise@test.com',
        licenseType: 'enterprise',
        features: {
          basic_reporting: true,
          advanced_analytics: true,
          api_access: true,
          multi_user: true,
          real_time_monitoring: true,
          ai_features: true
        },
        expirationDays: 365
      })
    };
  }
}
