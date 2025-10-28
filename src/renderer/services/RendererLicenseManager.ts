/**
 * Renderer License Manager
 * 
 * Simplified license management for renderer process
 * Does not use crypto or Node.js specific modules
 */

import {
  LicenseFeatures,
  LicenseValidationRequest,
  LicenseValidationResponse,
  CachedLicenseData
} from '../../common/types/license';

export class RendererLicenseManager {
  private licenseKey: string | null = null;
  private features: LicenseFeatures = {
    basic_reporting: false,
    advanced_analytics: false,
    api_access: false,
    multi_user: false,
    real_time_monitoring: false,
    ai_features: false
  };
  private validationTimer: number | null = null;
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
   * Validate a license key (simplified version for renderer)
   */
  async validateLicense(licenseKey: string): Promise<boolean> {
    try {
      // Basic format validation for known demo keys
      if (this.isKnownDemoKey(licenseKey)) {
        this.licenseKey = licenseKey;
        this.features = this.getDemoFeatures(licenseKey);
        this.startValidationTimer();
        return true;
      }

      // For production keys, try online validation
      const response = await this.validateLicenseOnline(licenseKey);
      if (response.valid) {
        this.licenseKey = licenseKey;
        this.features = response.features;
        this.cacheLicenseData(response);
        this.startValidationTimer();
        return true;
      }

      // Try offline validation
      return this.validateLicenseOffline(licenseKey);
    } catch (error) {
      console.error('License validation error:', error);
      return this.validateLicenseOffline(licenseKey);
    }
  }

  /**
   * Check if the key is a known demo key
   */
  private isKnownDemoKey(licenseKey: string): boolean {
    const demoKeys = [
      'GCGGAS-2024-DEMO-KEY1',
      '123456789abcDEF!4321',
      'GG01-EN98-FD00-3FFF-FFWH-LR55',
      'GG01-TR42-1400-0124-F5B7-TW7C',
      'GG01-ST3A-F100-0F26-44N4-ZMCE',
      'GG01-EN55-2300-3F26-44CI-RWFB'
    ];
    return demoKeys.includes(licenseKey);
  }

  /**
   * Get demo features based on license key
   */
  private getDemoFeatures(licenseKey: string): LicenseFeatures {
    // Enterprise demo keys
    if (licenseKey.includes('EN') || licenseKey === 'GCGGAS-2024-DEMO-KEY1') {
      return {
        basic_reporting: true,
        advanced_analytics: true,
        api_access: true,
        multi_user: true,
        real_time_monitoring: true,
        ai_features: true
      };
    }
    
    // Trial keys
    if (licenseKey.includes('TR')) {
      return {
        basic_reporting: true,
        advanced_analytics: false,
        api_access: false,
        multi_user: false,
        real_time_monitoring: false,
        ai_features: false
      };
    }
    
    // Standard keys
    if (licenseKey.includes('ST')) {
      return {
        basic_reporting: true,
        advanced_analytics: true,
        api_access: true,
        multi_user: true,
        real_time_monitoring: false,
        ai_features: true
      };
    }

    // Default to basic features
    return {
      basic_reporting: true,
      advanced_analytics: false,
      api_access: false,
      multi_user: false,
      real_time_monitoring: false,
      ai_features: false
    };
  }

  /**
   * Validate license online
   */
  private async validateLicenseOnline(licenseKey: string): Promise<LicenseValidationResponse> {
    const request: LicenseValidationRequest = {
      licenseKey,
      hardwareFingerprint: await this.getHardwareFingerprint(),
      clientVersion: '1.0.0'
    };

    const response = await fetch(`${this.licenseServerUrl}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`License validation failed: ${response.status}`);
    }

    return await response.json();
  }

  /**
   * Validate license offline using cached data
   */
  private validateLicenseOffline(licenseKey: string): boolean {
    const cachedData = this.getCachedLicenseData();
    if (!cachedData || cachedData.licenseKey !== licenseKey) {
      return false;
    }

    // Check if we're within grace period
    const lastValidation = new Date(cachedData.lastValidation);
    const now = new Date();
    const timeSinceValidation = now.getTime() - lastValidation.getTime();

    if (timeSinceValidation <= this.offlineGracePeriod) {
      // Load cached features
      this.features = cachedData.features;
      this.licenseKey = licenseKey;
      this.startValidationTimer();
      return true;
    }

    return false;
  }

  /**
   * Get hardware fingerprint (simplified for renderer)
   */
  private async getHardwareFingerprint(): Promise<string> {
    // Simple fingerprint based on available browser APIs
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('GGAS fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');

    // Simple hash function (not cryptographically secure, but sufficient for demo)
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(16);
  }

  /**
   * Get cached license data
   */
  private getCachedLicenseData(): CachedLicenseData | null {
    try {
      const cached = localStorage.getItem('licenseCache');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  /**
   * Cache license data
   */
  private cacheLicenseData(response: LicenseValidationResponse): void {
    try {
      const cacheData: CachedLicenseData = {
        licenseKey: this.licenseKey!,
        features: response.features,
        lastValidation: new Date().toISOString(),
        expiresAt: response.expiresAt,
        licenseType: response.licenseType,
        hardwareFingerprint: ''
      };
      localStorage.setItem('licenseCache', JSON.stringify(cacheData));
    } catch (error) {
      console.error('Failed to cache license data:', error);
    }
  }

  /**
   * Start validation timer
   */
  private startValidationTimer(): void {
    if (this.validationTimer) {
      clearInterval(this.validationTimer);
    }

    this.validationTimer = window.setInterval(() => {
      if (this.licenseKey) {
        this.validateLicense(this.licenseKey);
      }
    }, this.validationInterval);
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
    
    if (this.validationTimer) {
      clearInterval(this.validationTimer);
      this.validationTimer = null;
    }
    
    localStorage.removeItem('licenseCache');
  }
}