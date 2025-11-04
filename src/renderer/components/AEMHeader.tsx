import React from 'react';
import { Search, Notifications, AccountCircle, HelpOutline } from '@mui/icons-material';

interface AEMHeaderProps {
  title?: string;
  showSearch?: boolean;
}

const AEMHeader: React.FC<AEMHeaderProps> = ({ title = 'Green Country GGAS', showSearch = true }) => {
  return (
    <header style={{
      height: '52px',
      backgroundColor: 'var(--aem-gray-900)',
      borderBottom: '1px solid var(--aem-border-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--aem-spacing-md)',
      position: 'fixed',
      top: 0,
      left: 'var(--aem-nav-rail-width)',
      right: 0,
      zIndex: 'var(--aem-z-sticky)',
      transition: 'left var(--aem-transition-base)',
    }} className="aem-theme-dark">
      {/* Title Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--aem-spacing-md)' }}>
        <h1 style={{
          fontSize: 'var(--aem-font-size-lg)',
          fontWeight: 'var(--aem-font-weight-semibold)',
          color: 'var(--aem-text-primary-dark)',
          margin: 0,
        }}>
          {title}
        </h1>
        <span style={{
          fontSize: 'var(--aem-font-size-xs)',
          color: 'var(--aem-text-secondary-dark)',
          padding: '2px 6px',
          backgroundColor: 'var(--aem-gray-800)',
          borderRadius: 'var(--aem-radius-sm)',
        }}>
          v1.0
        </span>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--aem-spacing-md)' }}>
        {/* Search */}
        {showSearch && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--aem-spacing-xs)',
            backgroundColor: 'var(--aem-gray-800)',
            padding: '6px var(--aem-spacing-md)',
            borderRadius: 'var(--aem-radius-sm)',
            border: '1px solid var(--aem-border-dark)',
            minWidth: '250px',
          }}>
            <Search style={{ fontSize: '18px', color: 'var(--aem-text-secondary-dark)' }} />
            <input
              type="text"
              placeholder="Search..."
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'var(--aem-text-primary-dark)',
                fontSize: 'var(--aem-font-size-sm)',
                width: '100%',
              }}
            />
          </div>
        )}

        {/* Help Icon */}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--aem-text-secondary-dark)',
            cursor: 'pointer',
            padding: 'var(--aem-spacing-xs)',
            display: 'flex',
            alignItems: 'center',
            borderRadius: 'var(--aem-radius-sm)',
            transition: 'background-color var(--aem-transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--aem-gray-800)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Help"
        >
          <HelpOutline style={{ fontSize: '20px' }} />
        </button>

        {/* Notifications */}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--aem-text-secondary-dark)',
            cursor: 'pointer',
            padding: 'var(--aem-spacing-xs)',
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            borderRadius: 'var(--aem-radius-sm)',
            transition: 'background-color var(--aem-transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--aem-gray-800)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="Notifications"
        >
          <Notifications style={{ fontSize: '20px' }} />
          <span style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '8px',
            height: '8px',
            backgroundColor: 'var(--aem-red)',
            borderRadius: '50%',
            border: '1.5px solid var(--aem-gray-900)',
          }} />
        </button>

        {/* User Profile */}
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--aem-text-secondary-dark)',
            cursor: 'pointer',
            padding: 'var(--aem-spacing-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--aem-spacing-xs)',
            borderRadius: 'var(--aem-radius-sm)',
            transition: 'background-color var(--aem-transition-fast)',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--aem-gray-800)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="User Profile"
        >
          <AccountCircle style={{ fontSize: '24px' }} />
        </button>
      </div>
    </header>
  );
};

export default AEMHeader;
