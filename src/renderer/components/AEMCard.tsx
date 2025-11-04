import React from 'react';
import { MoreVert } from '@mui/icons-material';

interface AEMCardProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  headerIcon?: React.ReactElement;
  onHeaderClick?: () => void;
}

const AEMCard: React.FC<AEMCardProps> = ({ 
  title, 
  children, 
  actions, 
  hoverable = false,
  className = '',
  style = {},
  headerIcon,
  onHeaderClick
}) => {
  return (
    <div 
      className={`aem-card ${hoverable ? 'hoverable' : ''} ${className}`}
      style={style}
    >
      {title && (
        <div 
          className="aem-card-header"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            cursor: onHeaderClick ? 'pointer' : 'default'
          }}
          onClick={onHeaderClick}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--aem-spacing-sm)' }}>
            {headerIcon && <span style={{ color: 'var(--aem-blue-primary)' }}>{headerIcon}</span>}
            <span>{title}</span>
          </div>
          {actions && actions}
        </div>
      )}
      <div className="aem-card-body">
        {children}
      </div>
    </div>
  );
};

export default AEMCard;
