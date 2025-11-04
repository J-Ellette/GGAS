import React from 'react';
import { 
  CheckCircle, 
  Error, 
  Warning, 
  Info,
  Circle,
  RadioButtonUnchecked,
} from '@mui/icons-material';

interface AEMStatusBadgeProps {
  status: 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'in-progress';
  label: string;
  showIcon?: boolean;
  size?: 'small' | 'medium';
}

const AEMStatusBadge: React.FC<AEMStatusBadgeProps> = ({ 
  status, 
  label, 
  showIcon = true,
  size = 'medium'
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          className: 'aem-status-success',
          icon: <CheckCircle style={{ fontSize: size === 'small' ? '14px' : '16px' }} />,
        };
      case 'error':
        return {
          className: 'aem-status-error',
          icon: <Error style={{ fontSize: size === 'small' ? '14px' : '16px' }} />,
        };
      case 'warning':
        return {
          className: 'aem-status-warning',
          icon: <Warning style={{ fontSize: size === 'small' ? '14px' : '16px' }} />,
        };
      case 'info':
        return {
          className: 'aem-status-info',
          icon: <Info style={{ fontSize: size === 'small' ? '14px' : '16px' }} />,
        };
      case 'in-progress':
        return {
          className: 'aem-status-info',
          icon: <RadioButtonUnchecked style={{ fontSize: size === 'small' ? '14px' : '16px' }} />,
        };
      case 'neutral':
      default:
        return {
          className: 'aem-status-indicator',
          icon: <Circle style={{ fontSize: size === 'small' ? '14px' : '16px' }} />,
          customStyle: {
            backgroundColor: 'var(--aem-gray-700)',
            color: 'var(--aem-text-secondary)',
          },
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span 
      className={`aem-status-indicator ${config.className}`}
      style={{
        ...(config.customStyle || {}),
        fontSize: size === 'small' ? 'var(--aem-font-size-xs)' : 'var(--aem-font-size-sm)',
        padding: size === 'small' ? '2px 6px' : '2px var(--aem-spacing-sm)',
      }}
    >
      {showIcon && config.icon}
      {label}
    </span>
  );
};

export default AEMStatusBadge;
