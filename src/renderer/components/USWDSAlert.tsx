import React from 'react';

type AlertType = 'info' | 'warning' | 'error' | 'success' | 'emergency';
type AlertRole = 'region' | 'alert' | 'status';

interface USWDSAlertProps {
  type: AlertType;
  heading?: string;
  children: React.ReactNode;
  slim?: boolean;
  noIcon?: boolean;
  role?: AlertRole;
  className?: string;
}

const USWDSAlert: React.FC<USWDSAlertProps> = ({
  type,
  heading,
  children,
  slim = false,
  noIcon = false,
  role = 'region',
  className = ''
}) => {
  const alertClasses = ['usa-alert', `usa-alert--${type}`];
  
  if (slim) {
    alertClasses.push('usa-alert--slim');
  }
  
  if (noIcon) {
    alertClasses.push('usa-alert--no-icon');
  }
  
  if (className) {
    alertClasses.push(className);
  }

  return (
    <div className={alertClasses.join(' ')} role={role} aria-live="polite">
      <div className="usa-alert__body">
        {heading && <h4 className="usa-alert__heading">{heading}</h4>}
        <div className="usa-alert__text">{children}</div>
      </div>
    </div>
  );
};

export default USWDSAlert;
