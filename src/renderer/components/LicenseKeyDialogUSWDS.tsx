import React, { useState } from 'react';
import USWDSButton from './USWDSButton';
import USWDSInput from './USWDSInput';
import USWDSAlert from './USWDSAlert';
import { RendererLicenseManager } from '../services/RendererLicenseManager';

interface LicenseKeyDialogUSWDSProps {
  onLicenseValid: (licenseManager: RendererLicenseManager) => void;
  onAdminAccess: () => void;
}

const LicenseKeyDialogUSWDS: React.FC<LicenseKeyDialogUSWDSProps> = ({ onLicenseValid, onAdminAccess }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<any>(null);
  const [licenseManager] = useState(() => new RendererLicenseManager({
    licenseServerUrl: 'http://localhost:3000/ggas-licensing'
  }));

  const validateLicenseKey = async () => {
    setIsValidating(true);
    setError('');
    setLicenseInfo(null);

    try {
      const isValid = await licenseManager.validateLicense(licenseKey);
      
      if (isValid) {
        localStorage.setItem('licenseKey', licenseKey);
        localStorage.setItem('licenseValidated', 'true');
        
        const features = licenseManager.getFeatures();
        
        let licenseType = 'trial';
        if (features.advanced_analytics && features.api_access) {
          if (features.real_time_monitoring) {
            licenseType = 'enterprise';
          } else {
            licenseType = 'standard';
          }
        }
        
        setLicenseInfo({
          type: licenseType,
          features: features
        });
        
        setTimeout(() => {
          setIsValidating(false);
          onLicenseValid(licenseManager);
        }, 1000);
      } else {
        setIsValidating(false);
        setError('Invalid license key. Please check your key and try again.');
      }
    } catch (err) {
      setIsValidating(false);
      setError('License validation failed. Please try again.');
      console.error('License validation error:', err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateLicenseKey();
    }
  };

  return (
    <div className="usa-section bg-base-lightest" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="grid-container">
        <div className="grid-row flex-justify-center">
          <div className="tablet:grid-col-6">
            <div className="usa-card">
              <div className="usa-card__container">
                <div className="usa-card__header">
                  <h1 className="usa-card__heading margin-0">
                    License Activation
                  </h1>
                </div>
                <div className="usa-card__body">
                  <p className="margin-top-0">
                    Welcome to Green Country: Greenhouse Gas Accounting Software
                  </p>
                  
                  {error && (
                    <USWDSAlert type="error" heading="Validation Error">
                      {error}
                    </USWDSAlert>
                  )}

                  {licenseInfo && (
                    <USWDSAlert type="success" heading="License Validated">
                      <p>
                        License Type: <strong className="text-capitalize">{licenseInfo.type}</strong>
                      </p>
                      <p>Redirecting to dashboard...</p>
                    </USWDSAlert>
                  )}

                  {!licenseInfo && (
                    <div className="margin-top-3">
                      <USWDSInput
                        label="License Key"
                        hint="Enter your license key (e.g., GCGGAS-2024-DEMO-KEY1)"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isValidating}
                        required
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                      />

                      <div className="margin-top-3">
                        <USWDSButton
                          variant="primary"
                          onClick={validateLicenseKey}
                          disabled={isValidating || !licenseKey}
                          fullWidth
                        >
                          {isValidating ? 'Validating...' : 'Activate License'}
                        </USWDSButton>
                      </div>

                      <div className="border-top border-base-lighter margin-top-3 padding-top-3">
                        <p className="text-base">
                          <strong>Example License Keys:</strong>
                        </p>
                        <ul className="usa-list">
                          <li><code>GCGGAS-2024-DEMO-KEY1</code> - Demo License</li>
                          <li><code>GG01-EN98-FD00-3FFF-FFWH-LR55</code> - Development (Full Features)</li>
                        </ul>
                      </div>

                      <div className="border-top border-base-lighter margin-top-3 padding-top-3">
                        <USWDSButton
                          variant="secondary"
                          onClick={onAdminAccess}
                          fullWidth
                        >
                          Admin Panel Access
                        </USWDSButton>
                        <p className="text-base-dark text-center margin-top-2 font-sans-xs">
                          Bypass license validation and go directly to admin panel
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="usa-card__footer">
                  <p className="text-base-dark font-sans-xs margin-0">
                    © 2024 Green Country. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseKeyDialogUSWDS;
