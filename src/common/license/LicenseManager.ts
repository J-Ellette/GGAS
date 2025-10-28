/**
 * License Manager
 * 
 * Client-side license validation and feature gate management
 * Supports online and offline validation with grace period
 */

import { LicenseKeyGenerator } from './LicenseKeyGenerator';
import {
  LicenseFeatures,
  LicenseValidationRequest,
  LicenseValidationResponse,
  CachedLicenseData
} from '../types/license';

export class LicenseManager {
  private licenseKey: string | null = null;
  private features: LicenseFeatures = {
    basic_reporting: false,
    advanced_analytics: false,
    api_access: false,
    multi_user: false,
    real_time_monitoring: false,
    ai_features: false
  };
  private validationTimer: NodeJS.Timeout | null = null;
  private offlineGracePeriod: number = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  private licenseServerUrl: string = 'https://powersecure.dev/ggas-licensing';
  private validationInterval: number = 24 * 60 * 60 * 1000; // 24 hours

  constructor(config?: { 
    offlineGracePeriod?: number; 
    licenseServerUrl?: string;
    validationInterval?: number;
  }) {
    if (config?.offlineGracePeriod) {
      this.offlineGracePeriod = config.offlineGracePeriod;
    }
    if (config?.licenseServerUrl) {
      this.licenseServerUrl = config.licenseServerUrl;
    }
    if (config?.validationInterval) {
      this.validationInterval = config.validationInterval;
    }
  }

  /**
   * Validate a license key (online first, fallback to offline)
   */
  async validateLicense(licenseKey: string): Promise<boolean> {
    this.licenseKey = licenseKey;

    try {
      // Try online validation first
      const response = await this.validateOnline(licenseKey);
      if (response.valid) {
        this.features = response.features;
        this.cacheLicenseData(response);
        this.startPeriodicValidation();
        return true;
      }
    } catch (error) {
      console.warn('Online validation failed, attempting offline validation:', error);
      // Fallback to offline validation
      return this.validateOffline(licenseKey);
    }

    return false;
  }

  /**
   * Online license validation
   */
  private async validateOnline(licenseKey: string): Promise<LicenseValidationResponse> {
    const fingerprint = await this.getHardwareFingerprint();
    const clientVersion = '1.0.0'; // Should come from app config

    const validationRequest: LicenseValidationRequest = {
      licenseKey,
      hardwareFingerprint: fingerprint,
      clientVersion
    };

    // For demo/development, use mock validation
    if (this.licenseServerUrl.includes('localhost') || this.licenseServerUrl.includes('127.0.0.1')) {
      return this.mockValidation(validationRequest);
    }

    const response = await fetch(`${this.licenseServerUrl}/api/v1/license/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validationRequest)
    });

    if (!response.ok) {
      throw new Error(`License validation failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Mock validation for demo/testing
   */
  private mockValidation(request: LicenseValidationRequest): LicenseValidationResponse {
    // Accept the demo key
    if (request.licenseKey === 'GCGGAS-2024-DEMO-KEY1') {
      return {
        valid: true,
        features: {
          basic_reporting: true,
          advanced_analytics: true,
          api_access: true,
          multi_user: true,
          real_time_monitoring: true,
          ai_features: true
        },
        expiresAt: null,
        licenseType: 'enterprise'
      };
    }

    // Validate using LicenseKeyGenerator
    const decoded = LicenseKeyGenerator.decodeLicense(request.licenseKey);
    if (!decoded) {
      return {
        valid: false,
        features: this.features,
        expiresAt: null,
        licenseType: 'trial',
        message: 'Invalid license key format'
      };
    }

    // Check expiration
    if (LicenseKeyGenerator.isExpired(request.licenseKey)) {
      return {
        valid: false,
        features: this.features,
        expiresAt: null,
        licenseType: decoded.licenseType,
        message: 'License has expired'
      };
    }

    // Decode features
    const features = LicenseKeyGenerator.decodeFeatures(decoded.featureFlags);

    return {
      valid: true,
      features,
      expiresAt: null, // Would calculate from expirationCode
      licenseType: decoded.licenseType
    };
  }

  /**
   * Offline license validation (using cached data)
   */
  private validateOffline(licenseKey: string): boolean {
    const cachedData = this.getCachedLicenseData();
    
    if (!cachedData || cachedData.licenseKey !== licenseKey) {
      return false;
    }

    // Check if we're within grace period
    const lastValidation = new Date(cachedData.lastValidation);
    const now = new Date();
    const timeSinceValidation = now.getTime() - lastValidation.getTime();

    if (timeSinceValidation > this.offlineGracePeriod) {
      console.warn('Offline grace period expired');
      return false;
    }

    // Check if cached license has expired
    if (cachedData.expiresAt) {
      const expirationDate = new Date(cachedData.expiresAt);
      if (now > expirationDate) {
        console.warn('Cached license has expired');
        return false;
      }
    }

    // Validate format
    if (!LicenseKeyGenerator.validateKeyFormat(licenseKey)) {
      return false;
    }

    // Load cached features
    this.features = cachedData.features;
    this.licenseKey = licenseKey;

    return true;
  }

  /**
   * Get hardware fingerprint
   */
  private async getHardwareFingerprint(): Promise<string> {
    // In browser context, we'll use a simpler fingerprint
    if (typeof window !== 'undefined') {
      const data = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        screenResolution: `${window.screen.width}x${window.screen.height}`
      };
      
      const encoder = new TextEncoder();
      const dataStr = JSON.stringify(data);
      const dataBuffer = encoder.encode(dataStr);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      return hashHex.substring(0, 16);
    }

    // For Node.js context (Electron main process)
    // This would use os module - handled in main process
    return 'browser-client';
  }

  /**
   * Cache license data for offline validation
   */
  private cacheLicenseData(response: LicenseValidationResponse): void {
    const cachedData: CachedLicenseData = {
      licenseKey: this.licenseKey!,
      features: response.features,
      expiresAt: response.expiresAt,
      licenseType: response.licenseType,
      lastValidation: new Date().toISOString(),
      hardwareFingerprint: 'cached'
    };

    localStorage.setItem('licenseCache', JSON.stringify(cachedData));
  }

  /**
   * Get cached license data
   */
  private getCachedLicenseData(): CachedLicenseData | null {
    try {
      const cached = localStorage.getItem('licenseCache');
      if (!cached) {
        return null;
      }
      return JSON.parse(cached) as CachedLicenseData;
    } catch (error) {
      console.error('Error reading cached license data:', error);
      return null;
    }
  }

  /**
   * Start periodic validation
   */
  private startPeriodicValidation(): void {
    if (this.validationTimer) {
      clearInterval(this.validationTimer);
    }

    this.validationTimer = setInterval(async () => {
      if (this.licenseKey) {
        try {
          await this.validateOnline(this.licenseKey);
        } catch (error) {
          console.warn('Periodic validation failed:', error);
        }
      }
    }, this.validationInterval);
  }

  /**
   * Stop periodic validation
   */
  stopPeriodicValidation(): void {
    if (this.validationTimer) {
      clearInterval(this.validationTimer);
      this.validationTimer = null;
    }
  }

  /**
   * Get current features
   */
  getFeatures(): LicenseFeatures {
    return { ...this.features };
  }

  /**
   * Check if a specific feature is enabled
   */
  isFeatureEnabled(featureName: keyof LicenseFeatures): boolean {
    return this.features[featureName] === true;
  }

  /**
   * Get current license key
   */
  getLicenseKey(): string | null {
    return this.licenseKey;
  }

  /**
   * Clear license data
   */
  clearLicense(): void {
    this.licenseKey = null;
    this.features = {
      basic_reporting: false,
      advanced_analytics: false,
      api_access: false,
      multi_user: false,
      real_time_monitoring: false,
      ai_features: false
    };
    this.stopPeriodicValidation();
    localStorage.removeItem('licenseCache');
    localStorage.removeItem('licenseKey');
    localStorage.removeItem('licenseValidated');
  }
}
