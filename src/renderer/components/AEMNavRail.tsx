import React, { useState } from 'react';
import {
  Dashboard as DashboardIcon,
  DataObject as DataObjectIcon,
  Calculate as CalculateIcon,
  Cloud as CloudIcon,
  Category as CategoryIcon,
  IntegrationInstructions as IntegrationInstructionsIcon,
  Analytics as AnalyticsIcon,
  Description as DescriptionIcon,
  People as PeopleIcon,
  Psychology as PsychologyIcon,
  EmojiEvents as EmojiEventsIcon,
  Language as LanguageIcon,
  Extension as ExtensionIcon,
  Groups as GroupsIcon,
  RocketLaunch as RocketLaunchIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  MenuBook as MenuBookIcon,
  SmartToy as SmartToyIcon,
  TrendingUp as TrendingUpIcon,
  CalendarMonth as CalendarMonthIcon,
  Message as MessageIcon,
  AccountTree as AccountTreeIcon,
  AttachMoney as AttachMoneyIcon,
  BusinessCenter as BusinessCenterIcon,
  Tune as TuneIcon,
  Settings as SettingsIcon,
  ChevronRight,
  ChevronLeft,
} from '@mui/icons-material';

type PageType = 
  | 'dashboard' 
  | 'activity-data' 
  | 'emission-factors' 
  | 'calculations' 
  | 'scope3'
  | 'integrations'
  | 'analytics'
  | 'compliance'
  | 'users'
  | 'ai-ml'
  | 'targets'
  | 'multi-entity'
  | 'advanced-analytics'
  | 'predictive-intelligence'
  | 'operations-center'
  | 'autonomous-collection'
  | 'supply-chain'
  | 'carbon-financial'
  | 'esg-strategy'
  | 'collaborative-workspace'
  | 'admin'
  | 'settings'
  | 'documentation'
  | 'carbon-copilot'
  | 'users-messaging'
  | 'calendar'
  | 'ai-settings';

interface NavItem {
  id: PageType;
  label: string;
  icon: React.ReactElement;
  section?: string;
}

interface AEMNavRailProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const AEMNavRail: React.FC<AEMNavRailProps> = ({ currentPage, onPageChange }) => {
  const [expanded, setExpanded] = useState(false);

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, section: 'main' },
    { id: 'activity-data', label: 'Activity Data', icon: <DataObjectIcon />, section: 'data' },
    { id: 'emission-factors', label: 'Emission Factors', icon: <CloudIcon />, section: 'data' },
    { id: 'calculations', label: 'Calculations', icon: <CalculateIcon />, section: 'data' },
    { id: 'scope3', label: 'Scope 3', icon: <CategoryIcon />, section: 'advanced' },
    { id: 'integrations', label: 'Integrations', icon: <IntegrationInstructionsIcon />, section: 'advanced' },
    { id: 'analytics', label: 'Analytics', icon: <AnalyticsIcon />, section: 'advanced' },
    { id: 'compliance', label: 'Compliance', icon: <DescriptionIcon />, section: 'advanced' },
    { id: 'users', label: 'User Management', icon: <PeopleIcon />, section: 'advanced' },
    { id: 'ai-ml', label: 'AI/ML Analytics', icon: <PsychologyIcon />, section: 'ai' },
    { id: 'ai-settings', label: 'AI Settings', icon: <TuneIcon />, section: 'ai' },
    { id: 'targets', label: 'Target Management', icon: <EmojiEventsIcon />, section: 'ai' },
    { id: 'multi-entity', label: 'Multi-Entity', icon: <LanguageIcon />, section: 'ai' },
    { id: 'advanced-analytics', label: 'Advanced Analytics', icon: <RocketLaunchIcon />, section: 'innovation' },
    { id: 'predictive-intelligence', label: 'Predictive Intelligence', icon: <TrendingUpIcon />, section: 'innovation' },
    { id: 'operations-center', label: 'Operations Center', icon: <AccountTreeIcon />, section: 'innovation' },
    { id: 'autonomous-collection', label: 'Autonomous Collection', icon: <ExtensionIcon />, section: 'innovation' },
    { id: 'supply-chain', label: 'Supply Chain', icon: <GroupsIcon />, section: 'innovation' },
    { id: 'carbon-financial', label: 'Carbon Financial', icon: <AttachMoneyIcon />, section: 'innovation' },
    { id: 'esg-strategy', label: 'ESG Strategy', icon: <BusinessCenterIcon />, section: 'innovation' },
    { id: 'collaborative-workspace', label: 'Workspace', icon: <MessageIcon />, section: 'innovation' },
    { id: 'carbon-copilot', label: 'Carbon Copilot', icon: <SmartToyIcon />, section: 'tools' },
    { id: 'users-messaging', label: 'Users & Messaging', icon: <MessageIcon />, section: 'tools' },
    { id: 'calendar', label: 'Calendar', icon: <CalendarMonthIcon />, section: 'tools' },
    { id: 'documentation', label: 'Documentation', icon: <MenuBookIcon />, section: 'tools' },
    { id: 'admin', label: 'Admin Panel', icon: <AdminPanelSettingsIcon />, section: 'system' },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon />, section: 'system' },
  ];

  const sections = [
    { id: 'main', label: 'Overview' },
    { id: 'data', label: 'Data Management' },
    { id: 'advanced', label: 'Advanced Features' },
    { id: 'ai', label: 'AI & Strategic Planning' },
    { id: 'innovation', label: 'Innovation & Optimization' },
    { id: 'tools', label: 'Tools' },
    { id: 'system', label: 'System' },
  ];

  const groupedItems = sections.reduce((acc, section) => {
    acc[section.id] = navItems.filter(item => item.section === section.id);
    return acc;
  }, {} as Record<string, NavItem[]>);

  return (
    <>
      <div className={`aem-nav-rail aem-theme-dark ${expanded ? 'expanded' : ''}`}>
        {/* Logo/Brand Section */}
        <div style={{ 
          padding: 'var(--aem-spacing-md)', 
          borderBottom: '1px solid var(--aem-border-dark)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <CloudIcon style={{ color: 'var(--aem-blue-primary)', fontSize: '24px' }} />
          {expanded && (
            <span style={{ 
              color: 'var(--aem-text-primary-dark)', 
              fontSize: 'var(--aem-font-size-sm)',
              fontWeight: 'var(--aem-font-weight-semibold)'
            }}>
              GGAS
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {sections.map(section => {
            const items = groupedItems[section.id];
            if (!items || items.length === 0) return null;

            return (
              <div key={section.id} style={{ marginTop: 'var(--aem-spacing-sm)' }}>
                {expanded && (
                  <div style={{
                    padding: 'var(--aem-spacing-xs) var(--aem-spacing-md)',
                    fontSize: 'var(--aem-font-size-xs)',
                    color: 'var(--aem-text-disabled-dark)',
                    textTransform: 'uppercase',
                    fontWeight: 'var(--aem-font-weight-semibold)',
                    letterSpacing: '0.5px'
                  }}>
                    {section.label}
                  </div>
                )}
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`aem-nav-rail-item ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => onPageChange(item.id)}
                    title={!expanded ? item.label : undefined}
                  >
                    <span className="aem-nav-rail-icon">{item.icon}</span>
                    {expanded && <span style={{ fontSize: 'var(--aem-font-size-sm)' }}>{item.label}</span>}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Toggle Button */}
        <div 
          style={{ 
            padding: 'var(--aem-spacing-md)', 
            borderTop: '1px solid var(--aem-border-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'space-between' : 'center',
            cursor: 'pointer'
          }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded && <span style={{ fontSize: 'var(--aem-font-size-xs)', color: 'var(--aem-text-secondary-dark)' }}>Collapse</span>}
          {expanded ? <ChevronLeft style={{ fontSize: '20px' }} /> : <ChevronRight style={{ fontSize: '20px' }} />}
        </div>
      </div>
      
      {/* Spacer to push content */}
      <div style={{ width: expanded ? 'var(--aem-nav-rail-expanded-width)' : 'var(--aem-nav-rail-width)' }} />
    </>
  );
};

export default AEMNavRail;
