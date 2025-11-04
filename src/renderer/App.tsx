import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import Dashboard from './pages/Dashboard';
import ActivityDataPage from './pages/ActivityDataPage';
import EmissionFactorsPage from './pages/EmissionFactorsPage';
import CalculationsPage from './pages/CalculationsPage';
import Scope3Page from './pages/Scope3Page';
import IntegrationsPage from './pages/IntegrationsPage';
import AnalyticsDashboardPage from './pages/AnalyticsDashboardPage';
import ComplianceReportingPage from './pages/ComplianceReportingPage';
import UserManagementPage from './pages/UserManagementPage';
import AIMLPage from './pages/AIMLPage';
import TargetManagementPage from './pages/TargetManagementPage';
import MultiEntityPage from './pages/MultiEntityPage';
import Phase4Page from './pages/Phase4Page';
import Phase5Page from './pages/Phase5Page';
import Phase6Page from './pages/Phase6Page';
import Phase8Page from './pages/Phase8Page';
import Phase11Page from './pages/Phase11Page';
import Phase13Page from './pages/Phase13Page';
import Phase14Page from './pages/Phase14Page';
import Phase15Page from './pages/Phase15Page';
import AdminPanel from './pages/AdminPanel';
import DocumentationPage from './pages/DocumentationPage';
import CarbonCopilotPage from './pages/CarbonCopilotPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import CalendarPage from './pages/CalendarPage';
import AISettingsPage from './pages/AISettingsPage';
import LicenseKeyDialog from './components/LicenseKeyDialog';
import SystemNotificationBanner, { SystemNotification } from './components/SystemNotificationBanner';
import AEMNavRail from './components/AEMNavRail';
import AEMHeader from './components/AEMHeader';

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

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [licenseValidated, setLicenseValidated] = useState(false);
  const [showLicenseDialog, setShowLicenseDialog] = useState(false);
  const [systemNotification, setSystemNotification] = useState<SystemNotification | null>({
    id: 1,
    title: 'System Maintenance',
    message: 'Scheduled maintenance window: Saturday, January 27, 2024 from 2:00 AM - 4:00 AM EST. During this time, the system may be temporarily unavailable.',
    type: 'info',
    dismissible: true,
    active: true,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    // Check if license is already validated
    const validated = localStorage.getItem('licenseValidated');
    if (validated === 'true') {
      setLicenseValidated(true);
    } else {
      setShowLicenseDialog(true);
    }
  }, []);

  const handleDismissNotification = (id: number) => {
    setSystemNotification(null);
  };

  const handleLicenseValid = (licenseManager?: any) => {
    setLicenseValidated(true);
    setShowLicenseDialog(false);
    if (licenseManager) {
      console.log('License validated with manager:', licenseManager);
    }
  };

  const handleAdminAccess = () => {
    setLicenseValidated(true);
    setShowLicenseDialog(false);
    setCurrentPage('admin');
  };

  if (showLicenseDialog && !licenseValidated) {
    return (
      <LicenseKeyDialog 
        onLicenseValid={handleLicenseValid}
        onAdminAccess={handleAdminAccess}
      />
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'activity-data':
        return <ActivityDataPage />;
      case 'emission-factors':
        return <EmissionFactorsPage />;
      case 'calculations':
        return <CalculationsPage />;
      case 'scope3':
        return <Scope3Page />;
      case 'integrations':
        return <IntegrationsPage />;
      case 'analytics':
        return <AnalyticsDashboardPage />;
      case 'compliance':
        return <ComplianceReportingPage />;
      case 'users':
        return <UserManagementPage />;
      case 'ai-ml':
        return <AIMLPage />;
      case 'ai-settings':
        return <AISettingsPage />;
      case 'targets':
        return <TargetManagementPage />;
      case 'multi-entity':
        return <MultiEntityPage />;
      case 'advanced-analytics':
        return <Phase4Page />;
      case 'predictive-intelligence':
        return <Phase5Page />;
      case 'operations-center':
        return <Phase6Page />;
      case 'autonomous-collection':
        return <Phase8Page />;
      case 'supply-chain':
        return <Phase11Page />;
      case 'carbon-financial':
        return <Phase13Page />;
      case 'esg-strategy':
        return <Phase14Page />;
      case 'collaborative-workspace':
        return <Phase15Page />;
      case 'admin':
        return <AdminPanel />;
      case 'documentation':
        return <DocumentationPage />;
      case 'carbon-copilot':
        return <CarbonCopilotPage />;
      case 'users-messaging':
        return <UsersPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }} className="aem-theme aem-theme-dark">
      {/* AEM Navigation Rail */}
      <AEMNavRail currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* AEM Header */}
        <AEMHeader title="Green Country GGAS" showSearch={true} />
        
        {/* System Notification Banner */}
        {systemNotification && (
          <Box sx={{ position: 'fixed', top: '52px', left: 'var(--aem-nav-rail-width)', right: 0, zIndex: 'var(--aem-z-sticky)' }}>
            <SystemNotificationBanner 
              notification={systemNotification} 
              onDismiss={handleDismissNotification}
            />
          </Box>
        )}
        
        {/* Page Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            marginTop: '52px',
            padding: 'var(--aem-spacing-lg)',
            backgroundColor: 'var(--aem-bg-primary)',
            minHeight: 'calc(100vh - 52px)',
          }}
        >
          {renderPage()}
        </Box>
      </Box>
    </Box>
  );
};

export default App;
