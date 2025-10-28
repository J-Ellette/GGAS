import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Stack,
} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LicenseManager, LicenseKeyGenerator } from '../../common/license';

interface LicenseKeyDialogProps {
  onLicenseValid: (licenseManager: LicenseManager) => void;
  onAdminAccess: () => void;
}

const LicenseKeyDialog: React.FC<LicenseKeyDialogProps> = ({ onLicenseValid, onAdminAccess }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState<any>(null);
  const [licenseManager] = useState(() => new LicenseManager({
    licenseServerUrl: 'http://localhost:3000/ggas-licensing'
  }));

  const validateLicenseKey = async () => {
    setIsValidating(true);
    setError('');
    setLicenseInfo(null);

    try {
      // Validate using LicenseManager
      const isValid = await licenseManager.validateLicense(licenseKey);
      
      if (isValid) {
        // Store the license key in localStorage
        localStorage.setItem('licenseKey', licenseKey);
        localStorage.setItem('licenseValidated', 'true');
        
        // Get license info for display
        const decoded = LicenseKeyGenerator.decodeLicense(licenseKey);
        if (decoded) {
          const features = LicenseKeyGenerator.decodeFeatures(decoded.featureFlags);
          setLicenseInfo({
            type: decoded.licenseType,
            features: features
          });
        }
        
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
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%' }}>
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <VpnKeyIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Welcome to Green Country
            </Typography>
            <Typography variant="h6" gutterBottom>
              Greenhouse Gas Accounting Software
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Please enter your license key to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {licenseInfo && (
            <Alert severity="success" icon={<CheckCircleIcon />} sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                License Valid - {licenseInfo.type.toUpperCase()}
              </Typography>
              <Typography variant="caption">
                Activating features...
              </Typography>
            </Alert>
          )}

          <TextField
            fullWidth
            label="License Key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="XXXX-XXXX-XXXX-XXXX-XXXX"
            margin="normal"
            disabled={isValidating}
            sx={{ mb: 2 }}
          />

          <Button
            fullWidth
            variant="contained"
            onClick={validateLicenseKey}
            disabled={!licenseKey || isValidating}
            sx={{ mb: 2 }}
          >
            {isValidating ? 'Validating...' : 'Activate License'}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Need help or want to access admin panel?
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AdminPanelSettingsIcon />}
              onClick={onAdminAccess}
              sx={{ mt: 1 }}
            >
              Admin Panel Access
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
              <strong>Demo License Keys:</strong>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              • Legacy: GCGGAS-2024-DEMO-KEY1
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              • New Format: Generated keys (XXXX-XXXX-XXXX-XXXX-XXXX)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LicenseKeyDialog;
