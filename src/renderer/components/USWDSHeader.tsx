import React from 'react';

interface USWDSHeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

const USWDSHeader: React.FC<USWDSHeaderProps> = ({ 
  title = 'Green Country GGAS', 
  subtitle = 'Greenhouse Gas Accounting Software',
  onMenuClick 
}) => {
  return (
    <>
      {/* Skip Navigation for Accessibility */}
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      
      {/* USWDS Header */}
      <header className="usa-header usa-header--basic" role="banner">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <div className="usa-logo" id="basic-logo">
              <em className="usa-logo__text">
                <a href="#" title="Home" aria-label={title}>
                  <span style={{ color: '#2e7d32', fontWeight: 700 }}>
                    {title}
                  </span>
                </a>
              </em>
              {subtitle && (
                <div style={{ fontSize: '0.875rem', color: '#71767a', marginTop: '0.25rem' }}>
                  {subtitle}
                </div>
              )}
            </div>
            <button 
              className="usa-menu-btn" 
              onClick={onMenuClick}
              aria-label="Toggle menu"
            >
              Menu
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default USWDSHeader;
