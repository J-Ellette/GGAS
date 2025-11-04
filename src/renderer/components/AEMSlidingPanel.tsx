import React, { useEffect } from 'react';
import { Close } from '@mui/icons-material';

interface AEMSlidingPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const AEMSlidingPanel: React.FC<AEMSlidingPanelProps> = ({ 
  isOpen, 
  onClose, 
  title,
  children,
  width = 'var(--aem-side-panel-width)'
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 'var(--aem-z-modal-backdrop)',
            transition: 'opacity var(--aem-transition-base)',
          }}
          onClick={onClose}
        />
      )}
      
      {/* Sliding Panel */}
      <div 
        className={`aem-sliding-panel aem-theme-dark ${isOpen ? 'open' : ''}`}
        style={{ width }}
      >
        {/* Panel Header */}
        {title && (
          <div style={{
            padding: 'var(--aem-spacing-md)',
            borderBottom: '1px solid var(--aem-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--aem-bg-secondary)',
            zIndex: 1,
          }}>
            <h3 style={{
              margin: 0,
              fontSize: 'var(--aem-font-size-lg)',
              fontWeight: 'var(--aem-font-weight-semibold)',
              color: 'var(--aem-text-primary)',
            }}>
              {title}
            </h3>
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
              aria-label="Close panel"
            >
              <Close style={{ fontSize: '20px' }} />
            </button>
          </div>
        )}
        
        {/* Panel Content */}
        <div style={{ padding: 'var(--aem-spacing-md)' }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default AEMSlidingPanel;
