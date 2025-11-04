import React, { useState } from 'react';
import { Close, ChevronLeft, ChevronRight } from '@mui/icons-material';

interface AEMPanelProps {
  title?: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onClose?: () => void;
  className?: string;
}

const AEMPanel: React.FC<AEMPanelProps> = ({ 
  title, 
  children, 
  collapsible = false,
  defaultCollapsed = false,
  onClose,
  className = ''
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div className={`aem-panel ${className}`}>
      {title && (
        <div className="aem-panel-header" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--aem-spacing-sm)' }}>
            {collapsible && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--aem-text-primary)',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {isCollapsed ? <ChevronRight style={{ fontSize: '18px' }} /> : <ChevronLeft style={{ fontSize: '18px' }} />}
              </button>
            )}
            <span>{title}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--aem-text-secondary)',
                cursor: 'pointer',
                padding: 'var(--aem-spacing-xs)',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 'var(--aem-radius-sm)',
                transition: 'background-color var(--aem-transition-fast)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--aem-gray-800)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Close style={{ fontSize: '18px' }} />
            </button>
          )}
        </div>
      )}
      {!isCollapsed && (
        <div className="aem-panel-body">
          {children}
        </div>
      )}
    </div>
  );
};

export default AEMPanel;
