import React, { useState, useEffect } from 'react';
import { Box, Alert, AlertTitle, Button, Collapse } from '@mui/material';
import { ToggleOff as DisabledIcon, Info as InfoIcon } from '@mui/icons-material';

interface AIFeatureWrapperProps {
  featureKey: string;
  featureName: string;
  aiContent: React.ReactNode;
  manualContent?: React.ReactNode;
  fallbackMessage?: string;
  children?: React.ReactNode;
}

/**
 * Wrapper component that checks if an AI feature is enabled
 * and either shows the AI-powered content or a manual alternative
 */
export default function AIFeatureWrapper({
  featureKey,
  featureName,
  aiContent,
  manualContent,
  fallbackMessage,
  children
}: AIFeatureWrapperProps) {
  const [isEnabled, setIsEnabled] = useState<boolean>(false); // Default to false to prevent flash
  const [loading, setLoading] = useState<boolean>(true);
  const [showManual, setShowManual] = useState<boolean>(false);

  useEffect(() => {
    checkFeatureStatus();
  }, [featureKey]);

  const checkFeatureStatus = async () => {
    try {
      const enabled = await window.electronAPI.checkAIFeatureEnabled(featureKey);
      setIsEnabled(enabled);
      setShowManual(!enabled);
    } catch (error) {
      console.error('Error checking AI feature status:', error);
      setIsEnabled(false);
      setShowManual(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Box>{children}</Box>;
  }

  if (!isEnabled) {
    return (
      <Box>
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DisabledIcon />
              {featureName} (AI Mode Disabled)
            </Box>
          </AlertTitle>
          {fallbackMessage || 'This AI feature is currently disabled. Using manual operation mode.'}
        </Alert>
        {manualContent || children}
      </Box>
    );
  }

  return (
    <Box>
      {aiContent || children}
    </Box>
  );
}

/**
 * Hook to check if an AI feature is enabled
 */
export function useAIFeature(featureKey: string): {
  isEnabled: boolean;
  loading: boolean;
  checkStatus: () => Promise<void>;
} {
  const [isEnabled, setIsEnabled] = useState<boolean>(false); // Default to false for consistency
  const [loading, setLoading] = useState<boolean>(true);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const enabled = await window.electronAPI.checkAIFeatureEnabled(featureKey);
      setIsEnabled(enabled);
    } catch (error) {
      console.error('Error checking AI feature status:', error);
      setIsEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, [featureKey]);

  return { isEnabled, loading, checkStatus };
}
