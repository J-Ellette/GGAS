# License System Quick Reference

## Commands

```bash
# Generate new test license keys
npm run generate-licenses

# Test the license system
npm run test-license-system

# Build the application
npm run build

# Run the application
npm start
```

## Test License Keys

### Development (Full Features, No Expiration)
```
GG01-EN98-FD00-3FFF-FFWH-LR55
```
- Type: Enterprise
- Features: All enabled
- Expiration: Never

### Trial (Basic Features, 30 Days)
```
GG01-TR42-1400-0124-F5B7-TW7C
```
- Type: Trial
- Features: Basic reporting only
- Expiration: 30 days from generation

### Standard (Standard Features, 1 Year)
```
GG01-ST3A-F100-0F26-44N4-ZMCE
```
- Type: Standard
- Features: Basic + Analytics + API + Multi-user
- Expiration: 1 year from generation

### Enterprise (All Features, 1 Year)
```
GG01-EN55-2300-3F26-44CI-RWFB
```
- Type: Enterprise
- Features: All enabled
- Expiration: 1 year from generation

### Legacy Demo Keys (Still Supported)
```
GCGGAS-2024-DEMO-KEY1
123456789abcDEF!4321
```

## Feature Matrix

| Feature | Trial | Standard | Enterprise |
|---------|:-----:|:--------:|:----------:|
| Basic Reporting | ✓ | ✓ | ✓ |
| Advanced Analytics | ✗ | ✓ | ✓ |
| API Access | ✗ | ✓ | ✓ |
| Multi-User | ✗ | ✓ | ✓ |
| Real-time Monitoring | ✗ | ✗ | ✓ |
| AI Features | ✗ | ✗ | ✓ |

## Key Format

```
XXXX-XXXX-XXXX-XXXX-XXXX-XXXX
```

### Components (24 characters):
1. Product Code (2): `GG`
2. Version Code (2): `01`
3. License Type (2): `EN`/`ST`/`TR`
4. Customer Hash (4): Encoded ID
5. Feature Flags (4): Hex encoded
6. Expiration (4): Days since 2000-01-01
7. Random Salt (4): Security
8. Checksum (2): SHA-256 validation

## Quick Test

```bash
# Generate a new set of keys
npm run generate-licenses

# Run system tests
npm run test-license-system
```

## Integration Example

```typescript
import { LicenseManager, FeatureGate } from './src/common/license';

// Create manager
const manager = new LicenseManager();

// Validate key
const valid = await manager.validateLicense('GG01-EN98-FD00-3FFF-FFWH-LR55');

// Check features
const gate = new FeatureGate(manager);
if (gate.isFeatureEnabled('ai_features')) {
  // Use AI features
}
```

## Troubleshooting

### Invalid Key Error
- Check format: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`
- Generate new key if needed
- Verify no typos (case-sensitive)

### Offline Grace Period Expired
- Re-validate online
- Grace period: 7 days default
- Check internet connection

### Features Not Available
- Check license type
- Verify expiration date
- Validate license is active

## More Information

See [LICENSE_SYSTEM.md](LICENSE_SYSTEM.md) for complete documentation.
