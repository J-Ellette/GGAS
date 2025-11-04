import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent-cool' | 'accent-warm' | 'base' | 'outline' | 'unstyled';
type ButtonSize = 'default' | 'big';

interface USWDSButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  inverse?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const USWDSButton: React.FC<USWDSButtonProps> = ({
  variant = 'primary',
  size = 'default',
  inverse = false,
  fullWidth = false,
  children,
  className = '',
  ...props
}) => {
  const getButtonClasses = () => {
    const classes = ['usa-button'];
    
    if (variant !== 'primary') {
      classes.push(`usa-button--${variant}`);
    }
    
    if (size === 'big') {
      classes.push('usa-button--big');
    }
    
    if (inverse) {
      classes.push('usa-button--inverse');
    }
    
    if (fullWidth) {
      classes.push('width-full');
    }
    
    if (className) {
      classes.push(className);
    }
    
    return classes.join(' ');
  };

  return (
    <button className={getButtonClasses()} {...props}>
      {children}
    </button>
  );
};

export default USWDSButton;
