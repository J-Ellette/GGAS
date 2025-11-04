import React from 'react';

interface USWDSFooterProps {
  appName?: string;
  year?: number;
}

const USWDSFooter: React.FC<USWDSFooterProps> = ({ 
  appName = 'Green Country GGAS',
  year = new Date().getFullYear()
}) => {
  return (
    <footer className="usa-footer usa-footer--slim" role="contentinfo">
      <div className="grid-container usa-footer__return-to-top">
        <a href="#">Return to top</a>
      </div>
      <div className="usa-footer__primary-section">
        <div className="usa-footer__primary-container grid-row">
          <div className="mobile-lg:grid-col-8">
            <nav className="usa-footer__nav" aria-label="Footer navigation">
              <ul className="grid-row grid-gap">
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a className="usa-footer__primary-link" href="#dashboard">
                    Dashboard
                  </a>
                </li>
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a className="usa-footer__primary-link" href="#documentation">
                    Documentation
                  </a>
                </li>
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a className="usa-footer__primary-link" href="#settings">
                    Settings
                  </a>
                </li>
                <li className="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a className="usa-footer__primary-link" href="#admin">
                    Admin
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="usa-footer__secondary-section">
        <div className="grid-container">
          <div className="usa-footer__logo grid-row grid-gap-2">
            <div className="grid-col-auto">
              <p className="usa-footer__logo-heading">{appName}</p>
            </div>
          </div>
          <div className="grid-row grid-gap">
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              <div className="usa-footer__address">
                <div className="grid-row grid-gap">
                  <div className="grid-col-auto">
                    <address className="usa-footer__address">
                      <div className="usa-footer__contact-info">
                        <p>
                          Greenhouse Gas Accounting Software
                        </p>
                        <p>
                          © {year} {appName}. All rights reserved.
                        </p>
                      </div>
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div className="usa-footer__contact-links mobile-lg:grid-col-6">
              <div className="grid-row grid-gap">
                <div className="grid-col-auto">
                  <p className="usa-footer__contact-info">
                    Built with{' '}
                    <a href="https://designsystem.digital.gov/" target="_blank" rel="noopener noreferrer">
                      U.S. Web Design System
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default USWDSFooter;
