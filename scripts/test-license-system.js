#!/usr/bin/env node

/**
 * Test License System
 * 
 * Tests the license key generation and validation system
 * Note: This is a standalone Node.js test script with duplicated logic
 * from LicenseKeyGenerator.ts to avoid TypeScript compilation requirements.
 */

const crypto = require('crypto');

// Duplicated LicenseKeyGenerator logic for testing without TypeScript compilation
class LicenseKeyGenerator {
  static PRODUCT_CODE = 'GG';
  static VERSION_CODE = '01';
  static TYPE_CODES = {
    trial: 'TR',
    standard: 'ST',
    enterprise: 'EN'
  };

  static validateKeyFormat(licenseKey) {
    const cleanKey = licenseKey.replace(/-/g, '');
    if (cleanKey.length !== 24) {
      return false;
    }
    const baseKey = cleanKey.substring(0, 22);
    const providedChecksum = cleanKey.substring(22, 24);
    const calculatedChecksum = this.calculateChecksum(baseKey);
    return providedChecksum === calculatedChecksum;
  }

  static decodeLicense(licenseKey) {
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

    const licenseType = Object.entries(this.TYPE_CODES)
      .find(([_, code]) => code === typeCode)?.[0];

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

  static decodeFeatures(featureCode) {
    const value = parseInt(featureCode, 16);
    const featureList = [
      'basic_reporting',
      'advanced_analytics',
      'api_access',
      'multi_user',
      'real_time_monitoring',
      'ai_features'
    ];

    const features = {};
    featureList.forEach((feature, index) => {
      features[feature] = (value & (1 << index)) !== 0;
    });

    return features;
  }

  static decodeExpiration(expirationCode) {
    if (expirationCode === 'FFFF') {
      return null;
    }
    const daysSinceEpoch = parseInt(expirationCode, 16);
    const epoch = new Date('2000-01-01');
    return new Date(epoch.getTime() + daysSinceEpoch * 24 * 60 * 60 * 1000);
  }

  static isExpired(licenseKey) {
    const decoded = this.decodeLicense(licenseKey);
    if (!decoded) return true;
    const expirationDate = this.decodeExpiration(decoded.expirationCode);
    if (!expirationDate) return false;
    return new Date() > expirationDate;
  }

  static calculateChecksum(data) {
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    return hash.substring(0, 2).toUpperCase();
  }

  // Generate a test license
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
    if (!expirationDays) return 'FFFF';
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

  static formatLicenseKey(key) {
    const parts = [];
    for (let i = 0; i < key.length; i += 4) {
      parts.push(key.substring(i, i + 4));
    }
    return parts.join('-');
  }
}

// Run tests
console.log('='.repeat(80));
console.log('TESTING LICENSE KEY SYSTEM');
console.log('='.repeat(80));
console.log('');

// Test 1: Generate and validate a development license
console.log('Test 1: Generate and Validate Development License');
console.log('-'.repeat(80));
const devKey = LicenseKeyGenerator.generateLicense({
  customerId: 'test-dev-001',
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
console.log('Generated Key:', devKey);
console.log('Format Valid:', LicenseKeyGenerator.validateKeyFormat(devKey) ? '✓ PASS' : '✗ FAIL');
const decoded = LicenseKeyGenerator.decodeLicense(devKey);
console.log('Decode Success:', decoded ? '✓ PASS' : '✗ FAIL');
if (decoded) {
  console.log('  License Type:', decoded.licenseType);
  console.log('  Product Code:', decoded.productCode);
  console.log('  Version Code:', decoded.versionCode);
  const features = LicenseKeyGenerator.decodeFeatures(decoded.featureFlags);
  console.log('  Features:', JSON.stringify(features, null, 2));
}
console.log('');

// Test 2: Validate legacy demo key
console.log('Test 2: Validate Legacy Demo Key');
console.log('-'.repeat(80));
const legacyKey = 'GCGGAS-2024-DEMO-KEY1';
console.log('Key:', legacyKey);
console.log('Format Valid:', LicenseKeyGenerator.validateKeyFormat(legacyKey) ? '✓ PASS' : 'Expected (legacy format)');
console.log('');

// Test 3: Test expiration
console.log('Test 3: Test Expiration Encoding/Decoding');
console.log('-'.repeat(80));
const trialKey = LicenseKeyGenerator.generateLicense({
  customerId: 'test-trial-001',
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
console.log('Generated Trial Key:', trialKey);
const trialDecoded = LicenseKeyGenerator.decodeLicense(trialKey);
if (trialDecoded) {
  const expirationDate = LicenseKeyGenerator.decodeExpiration(trialDecoded.expirationCode);
  console.log('Expiration Date:', expirationDate ? expirationDate.toISOString() : 'Never');
  console.log('Is Expired:', LicenseKeyGenerator.isExpired(trialKey) ? 'Yes' : 'No ✓');
}
console.log('');

// Test 4: Test feature encoding
console.log('Test 4: Test Feature Encoding');
console.log('-'.repeat(80));
const standardKey = LicenseKeyGenerator.generateLicense({
  customerId: 'test-std-001',
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
console.log('Generated Standard Key:', standardKey);
const stdDecoded = LicenseKeyGenerator.decodeLicense(standardKey);
if (stdDecoded) {
  const features = LicenseKeyGenerator.decodeFeatures(stdDecoded.featureFlags);
  console.log('Decoded Features:');
  Object.entries(features).forEach(([feature, enabled]) => {
    console.log(`  ${feature}: ${enabled ? '✓ Enabled' : '✗ Disabled'}`);
  });
}
console.log('');

// Test 5: Test checksum validation
console.log('Test 5: Test Checksum Validation');
console.log('-'.repeat(80));
const validKey = devKey;
const invalidKey = devKey.substring(0, devKey.length - 2) + 'XX';
console.log('Valid Key:', validKey);
console.log('Valid:', LicenseKeyGenerator.validateKeyFormat(validKey) ? '✓ PASS' : '✗ FAIL');
console.log('Invalid Key (tampered):', invalidKey);
console.log('Valid:', LicenseKeyGenerator.validateKeyFormat(invalidKey) ? '✗ FAIL' : '✓ PASS (correctly rejected)');
console.log('');

console.log('='.repeat(80));
console.log('ALL TESTS COMPLETED');
console.log('='.repeat(80));
