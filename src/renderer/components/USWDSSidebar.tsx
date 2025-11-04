import React from 'react';

interface USWDSNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  icon?: React.ReactNode;
  submenu?: USWDSNavItem[];
}

interface USWDSSidebarProps {
  items: USWDSNavItem[];
  className?: string;
}

const USWDSSidebar: React.FC<USWDSSidebarProps> = ({ items, className = '' }) => {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpand = (label: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(label)) {
        newSet.delete(label);
      } else {
        newSet.add(label);
      }
      return newSet;
    });
  };

  const renderNavItem = (item: USWDSNavItem, index: number, depth: number = 0) => {
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isExpanded = expandedItems.has(item.label);

    return (
      <li key={`${item.label}-${index}`} className="usa-sidenav__item">
        {hasSubmenu ? (
          <>
            <button
              className={`usa-sidenav__button ${isExpanded ? 'usa-current' : ''}`}
              onClick={() => toggleExpand(item.label)}
              aria-expanded={isExpanded}
            >
              {item.icon && <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>}
              {item.label}
            </button>
            {isExpanded && item.submenu && (
              <ul className="usa-sidenav__sublist">
                {item.submenu.map((subItem, subIndex) => 
                  renderNavItem(subItem, subIndex, depth + 1)
                )}
              </ul>
            )}
          </>
        ) : (
          <a
            href={item.href || '#'}
            className={item.active ? 'usa-current' : ''}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                item.onClick();
              }
            }}
          >
            {item.icon && <span style={{ marginRight: '0.5rem' }}>{item.icon}</span>}
            {item.label}
          </a>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="Side navigation" className={className}>
      <ul className="usa-sidenav">
        {items.map((item, index) => renderNavItem(item, index))}
      </ul>
    </nav>
  );
};

export default USWDSSidebar;
