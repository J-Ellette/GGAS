/**
 * License Key Generation System Types
 * 
 * This module defines the types for the GGAS license key system
 */

export interface LicenseData {
  licenseKey: string;
  customerId: string;
  companyName: string;
  contactEmail: string;
  licenseType: LicenseType;
  features: LicenseFeatures;
  productVersion: string;
  createdAt: string;
  expiresAt: string | null;
  activatedAt?: string;
  deactivatedAt?: string;
  activationCount: number;
  maxActivations: number;
  hardwareFingerprint?: string;
  status: LicenseStatus;
}

export type LicenseType = 'trial' | 'standard' | 'enterprise';
export type LicenseStatus = 'active' | 'expired' | 'suspended' | 'deactivated';

export interface LicenseFeatures {
  basic_reporting: boolean;
  advanced_analytics: boolean;
  api_access: boolean;
  multi_user: boolean;
  real_time_monitoring: boolean;
  ai_features: boolean;
  [key: string]: boolean;
}

export interface LicenseValidationRequest {
  licenseKey: string;
  hardwareFingerprint: string;
  clientVersion: string;
}

export interface LicenseValidationResponse {
  valid: boolean;
  features: LicenseFeatures;
  expiresAt: string | null;
  licenseType: LicenseType;
  message?: string;
}

export interface LicenseGenerationParams {
  customerId: string;
  companyName: string;
  contactEmail: string;
  licenseType: LicenseType;
  features: LicenseFeatures;
  expirationDays?: number; // null for no expiration
}

export interface CachedLicenseData {
  licenseKey: string;
  features: LicenseFeatures;
  expiresAt: string | null;
  licenseType: LicenseType;
  lastValidation: string;
  hardwareFingerprint: string;
}
