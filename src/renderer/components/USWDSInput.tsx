import React from 'react';

interface USWDSInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  success?: boolean;
  required?: boolean;
}

// Simple ID generator to ensure uniqueness
let idCounter = 0;
const generateId = () => `input-${Date.now()}-${++idCounter}`;

const USWDSInput: React.FC<USWDSInputProps> = ({
  label,
  hint,
  error,
  success,
  required,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || generateId();
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  
  const inputClasses = ['usa-input'];
  if (error) {
    inputClasses.push('usa-input--error');
  }
  if (success) {
    inputClasses.push('usa-input--success');
  }
  if (className) {
    inputClasses.push(className);
  }

  return (
    <div className={`usa-form-group${error ? ' usa-form-group--error' : ''}`}>
      <label className="usa-label" htmlFor={inputId}>
        {label}
        {required && <abbr title="required" className="usa-hint usa-hint--required">*</abbr>}
      </label>
      {hint && !error && (
        <div className="usa-hint" id={hintId}>
          {hint}
        </div>
      )}
      {error && (
        <div className="usa-error-message" id={errorId} role="alert">
          {error}
        </div>
      )}
      <input
        className={inputClasses.join(' ')}
        id={inputId}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
    </div>
  );
};

export default USWDSInput;
