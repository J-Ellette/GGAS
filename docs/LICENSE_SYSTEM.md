# GGAS License Key System

## Overview

The GGAS License Key Generation System provides a comprehensive, secure, and flexible licensing solution for the Green Country Greenhouse Gas Accounting Software. The system supports multiple license types, feature gating, online/offline validation, and hardware fingerprinting.

## Architecture

### Core Components

1. **License Key Generator** (`LicenseKeyGenerator.ts`)
   - Generates cryptographically secure license keys
   - Validates key format and checksums
   - Encodes/decodes license information

2. **License Manager** (`LicenseManager.ts`)
   - Online validation with license server
   - Offline validation with grace period
   - Hardware fingerprinting
   - Periodic re-validation

3. **Feature Gate System** (`FeatureGate.ts`)
   - Controls access to features based on license
   - Provides decorators for method-level protection
   - Feature availability checking

## License Key Format

License keys use the format: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX` (24 characters + dashes)

### Components (24 characters):

1. **Product Code** (2 chars): `GG` (for GGAS)
2. **Version Code** (2 chars): `01`, `02`, etc.
3. **License Type** (2 chars): 
   - `EN` = Enterprise
   - `ST` = Standard
   - `TR` = Trial
4. **Customer ID Hash** (4 chars): Encoded customer identifier
5. **Feature Flags** (4 chars): Encoded feature permissions (hex)
6. **Expiration** (4 chars): Days since epoch (2000-01-01) or `FFFF` for no expiration
7. **Random Salt** (4 chars): Anti-pattern security
8. **Checksum** (2 chars): SHA-256 based validation

### Example Keys

Generated test licenses:

```
Development (Full Features, No Expiration):
GG01-EN98-FD00-3FFF-FF4Q-Q23C

Trial (Basic Features, 30 Days):
GG01-TR42-1400-0124-F5PH-GFB3

Standard (Standard Features, 1 Year):
GG01-ST3A-F100-0F26-44XP-100E

Enterprise (All Features, 1 Year):
GG01-EN55-2300-3F26-448W-OX30
```

Legacy demo keys (also supported):
- `GCGGAS-2024-DEMO-KEY1`
- `123456789abcDEF!4321`

## Features

The system supports six feature flags:

1. **basic_reporting** - Basic emissions reporting and calculations
2. **advanced_analytics** - Advanced analytics and forecasting
3. **api_access** - API access for integrations
4. **multi_user** - Multiple user accounts
5. **real_time_monitoring** - Real-time emission monitoring
6. **ai_features** - AI-powered insights and automation

## Usage

### Generating License Keys

Use the generator script:

```bash
node scripts/generate-licenses.js
```

Or programmatically:

```typescript
import { LicenseKeyGenerator } from './src/common/license';

const license = LicenseKeyGenerator.generateLicense({
  customerId: 'customer-001',
  companyName: 'Acme Corp',
  contactEmail: 'admin@acme.com',
  licenseType: 'enterprise',
  features: {
    basic_reporting: true,
    advanced_analytics: true,
    api_access: true,
    multi_user: true,
    real_time_monitoring: true,
    ai_features: true
  },
  expirationDays: 365  // or undefined for no expiration
});

console.log('Generated License:', license);
```

### Validating Licenses

```typescript
import { LicenseManager } from './src/common/license';

const licenseManager = new LicenseManager({
  licenseServerUrl: 'https://powersecure.dev/ggas-licensing',
  offlineGracePeriod: 7 * 24 * 60 * 60 * 1000,  // 7 days
  validationInterval: 24 * 60 * 60 * 1000        // 24 hours
});

// Validate a license key
const isValid = await licenseManager.validateLicense('GG01-EN98-FD00-3FFF-FF4Q-Q23C');

if (isValid) {
  console.log('License is valid!');
  console.log('Features:', licenseManager.getFeatures());
}
```

### Using Feature Gates

```typescript
import { FeatureGate } from './src/common/license';

const featureGate = new FeatureGate(licenseManager);

// Check if a feature is enabled
if (featureGate.isFeatureEnabled('advanced_analytics')) {
  // Show advanced analytics features
}

// Require a feature (throws error if not available)
try {
  featureGate.requireFeature('ai_features');
  // Execute AI feature code
} catch (error) {
  console.error('AI features not available:', error);
}

// Check multiple features
if (featureGate.hasAllFeatures(['api_access', 'multi_user'])) {
  // Enable API and multi-user functionality
}
```

### Method-Level Protection (Decorator)

```typescript
import { requiresLicense, FeatureGate } from './src/common/license';

class AnalyticsService {
  private featureGate: FeatureGate;

  constructor(featureGate: FeatureGate) {
    this.featureGate = featureGate;
  }

  @requiresLicense('advanced_analytics')
  performAdvancedAnalytics() {
    // This method will only execute if advanced_analytics is enabled
    return 'Advanced analytics results';
  }
}
```

## Validation Flow

### Online Validation

1. Client sends license key + hardware fingerprint to server
2. Server validates key format and checksum
3. Server checks expiration date
4. Server verifies hardware fingerprint (if applicable)
5. Server returns validation response with features
6. Client caches response for offline use

### Offline Validation

1. Client checks if cached validation exists
2. Verifies cached validation is within grace period (default: 7 days)
3. Validates key format and checksum locally
4. Checks expiration from cached data
5. Loads features from cache

### Periodic Re-validation

- Automatic re-validation every 24 hours (configurable)
- Silent background process
- Falls back to offline mode on failure

## Security Features

1. **Cryptographic Checksums**: SHA-256 based validation
2. **Hardware Fingerprinting**: Ties license to specific hardware
3. **Anti-Tampering**: Random salt prevents pattern detection
4. **Secure Storage**: LocalStorage for browser, encrypted storage recommended
5. **Grace Period**: Limited offline operation (7 days default)
6. **Time-based Validation**: Regular server check-ins

## Configuration

Edit `src/common/license/config.ts`:

```typescript
export const licenseConfig: LicenseConfig = {
  licenseServer: 'https://powersecure.dev/ggas-licensing',
  offlineGracePeriod: 7 * 24 * 60 * 60 * 1000,  // 7 days
  validationInterval: 24 * 60 * 60 * 1000,       // 24 hours
  features: {
    basic_reporting: 'Basic emissions reporting',
    advanced_analytics: 'Advanced analytics and forecasting',
    // ... other features
  }
};
```

## API Endpoints (Mock)

The system includes mock validation for development:

### POST /api/v1/license/validate

Request:
```json
{
  "licenseKey": "GG01-EN98-FD00-3FFF-FF4Q-Q23C",
  "hardwareFingerprint": "a1b2c3d4e5f6g7h8",
  "clientVersion": "1.0.0"
}
```

Response:
```json
{
  "valid": true,
  "features": {
    "basic_reporting": true,
    "advanced_analytics": true,
    "api_access": true,
    "multi_user": true,
    "real_time_monitoring": true,
    "ai_features": true
  },
  "expiresAt": "2025-12-31T23:59:59Z",
  "licenseType": "enterprise"
}
```

## Testing

### Generate Test Keys

```bash
npm run generate-licenses
```

### Test in Application

1. Start the application: `npm start`
2. Enter a generated license key at the prompt
3. Verify features are enabled based on license type

### Validate Key Manually

```typescript
import { LicenseKeyGenerator } from './src/common/license';

const key = 'GG01-EN98-FD00-3FFF-FF4Q-Q23C';

// Validate format
console.log('Valid format:', LicenseKeyGenerator.validateKeyFormat(key));

// Decode license
const decoded = LicenseKeyGenerator.decodeLicense(key);
console.log('Decoded:', decoded);

// Check expiration
console.log('Expired:', LicenseKeyGenerator.isExpired(key));

// Decode features
const features = LicenseKeyGenerator.decodeFeatures(decoded.featureFlags);
console.log('Features:', features);
```

## Integration with GGAS

The license system is integrated into the GGAS application:

1. **Startup**: License validation dialog shown on first launch
2. **Storage**: Valid licenses stored in localStorage
3. **Features**: Feature gates control access to advanced functionality
4. **Admin Panel**: Can bypass license check for administrative access
5. **Background**: Periodic validation every 24 hours

## Future Enhancements

- Full license server implementation
- Database-backed license management
- Admin dashboard for license generation
- License activation/deactivation
- Usage analytics
- Multi-device license management
- License transfer functionality
- Subscription management

## License Types Comparison

| Feature | Trial | Standard | Enterprise |
|---------|-------|----------|------------|
| Basic Reporting | ✓ | ✓ | ✓ |
| Advanced Analytics | ✗ | ✓ | ✓ |
| API Access | ✗ | ✓ | ✓ |
| Multi-User | ✗ | ✓ | ✓ |
| Real-time Monitoring | ✗ | ✗ | ✓ |
| AI Features | ✗ | ✗ | ✓ |
| Duration | 30 days | 1 year | Custom |
| Support | Community | Email | Priority |

## Troubleshooting

### Invalid License Key Error

- Verify key format matches: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`
- Check for typos (keys are case-sensitive)
- Ensure key hasn't expired
- Try generating a new key

### Offline Validation Failed

- Check if grace period has expired (default: 7 days)
- Verify localStorage is accessible
- Clear browser cache and re-validate online

### Features Not Available

- Verify license type includes desired features
- Check license expiration
- Re-validate license online

## Support

For license-related issues:
- Check the troubleshooting section above
- Use the admin panel to bypass for testing
- Generate new test keys with the provided script
- Contact support with your license key (do not share production keys)

---

**© 2024 Green Country. All rights reserved.**
