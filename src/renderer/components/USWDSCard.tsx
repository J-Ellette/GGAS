import React from 'react';

interface USWDSCardProps {
  title?: string;
  children: React.ReactNode;
  headerFirst?: boolean;
  className?: string;
  flag?: boolean;
  layout?: 'standard' | 'flag';
  mediaPosition?: 'right' | 'left';
}

const USWDSCard: React.FC<USWDSCardProps> = ({
  title,
  children,
  headerFirst = false,
  className = '',
  flag = false,
  layout = 'standard',
  mediaPosition
}) => {
  const cardClasses = ['usa-card'];
  
  if (flag || layout === 'flag') {
    cardClasses.push('usa-card--flag');
    if (mediaPosition === 'right') {
      cardClasses.push('usa-card--media-right');
    }
  }
  
  if (headerFirst) {
    cardClasses.push('usa-card--header-first');
  }
  
  if (className) {
    cardClasses.push(className);
  }

  return (
    <li className={cardClasses.join(' ')}>
      <div className="usa-card__container">
        {title && (
          <header className="usa-card__header">
            <h3 className="usa-card__heading">{title}</h3>
          </header>
        )}
        <div className="usa-card__body">
          {children}
        </div>
      </div>
    </li>
  );
};

interface USWDSCardGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const USWDSCardGroup: React.FC<USWDSCardGroupProps> = ({ children, className = '' }) => {
  return (
    <ul className={`usa-card-group ${className}`}>
      {children}
    </ul>
  );
};

export default USWDSCard;
