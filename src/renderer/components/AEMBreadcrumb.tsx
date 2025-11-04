import React from 'react';
import { ChevronRight } from '@mui/icons-material';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface AEMBreadcrumbProps {
  items: BreadcrumbItem[];
}

const AEMBreadcrumb: React.FC<AEMBreadcrumbProps> = ({ items }) => {
  return (
    <nav className="aem-breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="aem-breadcrumb-separator" style={{ fontSize: '14px' }} />
          )}
          {item.onClick ? (
            <a
              href="#"
              className="aem-breadcrumb-item"
              onClick={(e) => {
                e.preventDefault();
                item.onClick?.();
              }}
            >
              {item.label}
            </a>
          ) : (
            <span className="aem-breadcrumb-item" style={{ color: 'var(--aem-text-primary)' }}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AEMBreadcrumb;
