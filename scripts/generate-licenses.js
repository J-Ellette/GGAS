#!/usr/bin/env node

/**
 * License Key Generator Script
 * 
 * Generates test license keys for GGAS
 * Usage: node generate-licenses.js
 */

const crypto = require('crypto');

class LicenseKeyGenerator {
  static PRODUCT_CODE = 'GG';
  static VERSION_CODE = '01';
  static TYPE_CODES = {
    trial: 'TR',
    standard: 'ST',
    enterprise: 'EN'
  };

  static generateLicense(params) {
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

  static hashCustomerId(customerId) {
    const hash = crypto.createHash('sha256').update(customerId).digest('hex');
    return hash.substring(0, 4).toUpperCase();
  }

  static encodeFeatures(features) {
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

    return value.toString(16).padStart(4, '0').toUpperCase();
  }

  static encodeExpiration(expirationDays) {
    if (!expirationDays) {
      return 'FFFF';
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expirationDays);
    
    const epoch = new Date('2000-01-01');
    const daysSinceEpoch = Math.floor((expirationDate.getTime() - epoch.getTime()) / (1000 * 60 * 60 * 24));
    
    return daysSinceEpoch.toString(16).padStart(4, '0').toUpperCase();
  }

  static generateSecureRandom(length) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const bytes = crypto.randomBytes(length);
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars[bytes[i] % chars.length];
    }
    
    return result;
  }

  static calculateChecksum(data) {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash.substring(0, 2).toUpperCase();
  }

  static formatLicenseKey(key) {
    const parts = [];
    for (let i = 0; i < key.length; i += 4) {
      parts.push(key.substring(i, i + 4));
    }
    return parts.join('-');
  }
}

// Generate test licenses
console.log('='.repeat(80));
console.log('GGAS License Key Generator');
console.log('='.repeat(80));
console.log('');

// Development License (Full Features, No Expiration)
const devLicense = LicenseKeyGenerator.generateLicense({
  customerId: 'dev-0001',
  licenseType: 'enterprise',
  features: {
    basic_reporting: true,
    advanced_analytics: true,
    api_access: true,
    multi_user: true,
    real_time_monitoring: true,
    ai_features: true
  }
});

console.log('1. DEVELOPMENT LICENSE (Full Features, No Expiration)');
console.log('   License Key:', devLicense);
console.log('   Type: Enterprise');
console.log('   Features: All enabled');
console.log('   Expiration: Never');
console.log('');

// Trial License (Limited Features, 30 days)
const trialLicense = LicenseKeyGenerator.generateLicense({
  customerId: 'trial-0001',
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
});

console.log('2. TRIAL LICENSE (Basic Features, 30 Days)');
console.log('   License Key:', trialLicense);
console.log('   Type: Trial');
console.log('   Features: Basic reporting only');
console.log('   Expiration: 30 days');
console.log('');

// Standard License (Standard Features, 365 days)
const standardLicense = LicenseKeyGenerator.generateLicense({
  customerId: 'std-0001',
  licenseType: 'standard',
  features: {
    basic_reporting: true,
    advanced_analytics: true,
    api_access: true,
    multi_user: true,
    real_time_monitoring: false,
    ai_features: false
  },
  expirationDays: 365
});

console.log('3. STANDARD LICENSE (Standard Features, 1 Year)');
console.log('   License Key:', standardLicense);
console.log('   Type: Standard');
console.log('   Features: Basic + Analytics + API + Multi-user');
console.log('   Expiration: 1 year');
console.log('');

// Enterprise License (All Features, 365 days)
const enterpriseLicense = LicenseKeyGenerator.generateLicense({
  customerId: 'ent-0001',
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
});

console.log('4. ENTERPRISE LICENSE (All Features, 1 Year)');
console.log('   License Key:', enterpriseLicense);
console.log('   Type: Enterprise');
console.log('   Features: All enabled');
console.log('   Expiration: 1 year');
console.log('');

console.log('='.repeat(80));
console.log('LEGACY DEMO KEYS (Also Supported)');
console.log('='.repeat(80));
console.log('');
console.log('• GCGGAS-2024-DEMO-KEY1 (Legacy demo key - all features)');
console.log('• 123456789abcDEF!4321 (Legacy dev key - all features)');
console.log('');
console.log('='.repeat(80));
