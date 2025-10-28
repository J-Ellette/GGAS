/**
 * License System Configuration
 */

export interface LicenseConfig {
  licenseServer: string;
  offlineGracePeriod: number; // milliseconds
  validationInterval: number; // milliseconds
  features: {
    [key: string]: string;
  };
}

export const licenseConfig: LicenseConfig = {
  // License server URL - for demo/development, use localhost
  licenseServer: process.env.LICENSE_SERVER_URL || 'http://localhost:3000/ggas-licensing',
  
  // Offline grace period: 7 days
  offlineGracePeriod: 7 * 24 * 60 * 60 * 1000,
  
  // Validation interval: 24 hours
  validationInterval: 24 * 60 * 60 * 1000,
  
  // Feature descriptions
  features: {
    basic_reporting: 'Basic emissions reporting and calculations',
    advanced_analytics: 'Advanced analytics and forecasting',
    api_access: 'API access for integrations',
    multi_user: 'Multiple user accounts',
    real_time_monitoring: 'Real-time emission monitoring',
    ai_features: 'AI-powered insights and automation'
  }
};

/**
 * Test license keys for development
 */
export const testLicenseKeys = {
  development: '123456789abcDEF!4321', // Full features, no expiration (legacy format)
  demo: 'GCGGAS-2024-DEMO-KEY1' // Demo key (legacy format)
};
