/**
 * Feature Gate System
 * 
 * Controls access to features based on license
 */

import { LicenseManager } from './LicenseManager';
import { LicenseFeatures } from '../types/license';

export class FeatureGate {
  private licenseManager: LicenseManager;

  constructor(licenseManager: LicenseManager) {
    this.licenseManager = licenseManager;
  }

  /**
   * Check if a feature is enabled
   */
  isFeatureEnabled(featureName: keyof LicenseFeatures): boolean {
    return this.licenseManager.isFeatureEnabled(featureName);
  }

  /**
   * Require a feature (throw error if not available)
   */
  requireFeature(featureName: keyof LicenseFeatures): void {
    if (!this.isFeatureEnabled(featureName)) {
      throw new Error(`Feature '${featureName}' requires a valid license`);
    }
  }

  /**
   * Get all enabled features
   */
  getEnabledFeatures(): LicenseFeatures {
    return this.licenseManager.getFeatures();
  }

  /**
   * Check multiple features at once
   */
  hasAllFeatures(featureNames: (keyof LicenseFeatures)[]): boolean {
    return featureNames.every(feature => this.isFeatureEnabled(feature));
  }

  /**
   * Check if any of the features are enabled
   */
  hasAnyFeature(featureNames: (keyof LicenseFeatures)[]): boolean {
    return featureNames.some(feature => this.isFeatureEnabled(feature));
  }

  /**
   * Get feature description
   */
  getFeatureDescription(featureName: keyof LicenseFeatures): string {
    const descriptions: Record<keyof LicenseFeatures, string> = {
      basic_reporting: 'Basic emissions reporting and calculations',
      advanced_analytics: 'Advanced analytics and forecasting',
      api_access: 'API access for integrations',
      multi_user: 'Multiple user accounts',
      real_time_monitoring: 'Real-time emission monitoring',
      ai_features: 'AI-powered insights and automation'
    };

    return descriptions[featureName] || 'Unknown feature';
  }
}

/**
 * Feature gate decorator (for TypeScript classes)
 * Usage: @requiresLicense('advanced_analytics')
 */
export function requiresLicense(featureName: keyof LicenseFeatures) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const featureGate = (this as any).featureGate;
      if (!featureGate) {
        throw new Error('FeatureGate not initialized in class');
      }

      featureGate.requireFeature(featureName);
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
