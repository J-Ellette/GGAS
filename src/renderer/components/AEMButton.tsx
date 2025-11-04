import React from 'react';

interface AEMButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactElement;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const AEMButton: React.FC<AEMButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--aem-blue-primary)',
          color: 'white',
          hover: 'var(--aem-blue-dark)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--aem-gray-700)',
          color: 'var(--aem-text-primary-dark)',
          hover: 'var(--aem-gray-600)',
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: 'var(--aem-text-primary)',
          hover: 'var(--aem-gray-800)',
          border: '1px solid var(--aem-border)',
        };
      case 'danger':
        return {
          backgroundColor: 'var(--aem-red)',
          color: 'white',
          hover: '#B8282F',
        };
      default:
        return {
          backgroundColor: 'var(--aem-blue-primary)',
          color: 'white',
          hover: 'var(--aem-blue-dark)',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '4px var(--aem-spacing-sm)',
          fontSize: 'var(--aem-font-size-sm)',
        };
      case 'medium':
        return {
          padding: 'var(--aem-spacing-sm) var(--aem-spacing-md)',
          fontSize: 'var(--aem-font-size-base)',
        };
      case 'large':
        return {
          padding: 'var(--aem-spacing-md) var(--aem-spacing-lg)',
          fontSize: 'var(--aem-font-size-md)',
        };
      default:
        return {
          padding: 'var(--aem-spacing-sm) var(--aem-spacing-md)',
          fontSize: 'var(--aem-font-size-base)',
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`aem-button ${className}`}
      style={{
        ...sizeStyles,
        backgroundColor: variantStyles.backgroundColor,
        color: variantStyles.color,
        border: variantStyles.border || 'none',
        borderRadius: 'var(--aem-radius-sm)',
        fontFamily: 'var(--aem-font-family)',
        fontWeight: 'var(--aem-font-weight-medium)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : 'auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--aem-spacing-xs)',
        transition: 'background-color var(--aem-transition-fast), box-shadow var(--aem-transition-fast)',
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = variantStyles.hover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.backgroundColor = variantStyles.backgroundColor;
        }
      }}
    >
      {icon && iconPosition === 'left' && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
    </button>
  );
};

export default AEMButton;
