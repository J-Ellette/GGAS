/**
 * License System Module
 * 
 * Exports all license-related functionality
 */

export { LicenseKeyGenerator } from './LicenseKeyGenerator';
export { LicenseManager } from './LicenseManager';
export { FeatureGate, requiresLicense } from './FeatureGate';
export { licenseConfig, testLicenseKeys } from './config';
export type {
  LicenseData,
  LicenseType,
  LicenseStatus,
  LicenseFeatures,
  LicenseValidationRequest,
  LicenseValidationResponse,
  LicenseGenerationParams,
  CachedLicenseData
} from '../types/license';
