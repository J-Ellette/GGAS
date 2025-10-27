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
} from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

interface LicenseKeyDialogProps {
  onLicenseValid: () => void;
  onAdminAccess: () => void;
}

const LicenseKeyDialog: React.FC<LicenseKeyDialogProps> = ({ onLicenseValid, onAdminAccess }) => {
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const validateLicenseKey = () => {
    setIsValidating(true);
    setError('');

    // Simple validation - in production this would check against a database or API
    // For demo purposes, accept any key that matches the pattern or the demo key
    const keyPattern = /^GCGGAS-\d{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    
    if (licenseKey === 'GCGGAS-2024-DEMO-KEY1' || keyPattern.test(licenseKey)) {
      // Store the license key in localStorage
      localStorage.setItem('licenseKey', licenseKey);
      localStorage.setItem('licenseValidated', 'true');
      
      setTimeout(() => {
        setIsValidating(false);
        onLicenseValid();
      }, 500);
    } else {
      setIsValidating(false);
      setError('Invalid license key. Please check your key and try again.');
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

          <TextField
            fullWidth
            label="License Key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="GCGGAS-YYYY-XXXX-XXXX"
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
            <Typography variant="caption" color="text.secondary">
              <strong>Demo License Key:</strong> GCGGAS-2024-DEMO-KEY1
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LicenseKeyDialog;
