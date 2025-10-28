import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';
import CategoryIcon from '@mui/icons-material/Category';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LanguageIcon from '@mui/icons-material/Language';
import ExtensionIcon from '@mui/icons-material/Extension';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MessageIcon from '@mui/icons-material/Message';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TuneIcon from '@mui/icons-material/Tune';

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
import AdminPanel from './pages/AdminPanel';
import DocumentationPage from './pages/DocumentationPage';
import CarbonCopilotPage from './pages/CarbonCopilotPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import CalendarPage from './pages/CalendarPage';
import AISettingsPage from './pages/AISettingsPage';
import LicenseKeyDialog from './components/LicenseKeyDialog';
import SystemNotificationBanner, { SystemNotification } from './components/SystemNotificationBanner';

const drawerWidth = 280;

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
  | 'phase4'
  | 'phase5'
  | 'phase6'
  | 'phase8'
  | 'phase11'
  | 'phase13'
  | 'phase14'
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
    // Store license manager if needed for feature gates
    if (licenseManager) {
      // Could store in context or state if needed
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
      case 'phase4':
        return <Phase4Page />;
      case 'phase5':
        return <Phase5Page />;
      case 'phase6':
        return <Phase6Page />;
      case 'phase8':
        return <Phase8Page />;
      case 'phase11':
        return <Phase11Page />;
      case 'phase13':
        return <Phase13Page />;
      case 'phase14':
        return <Phase14Page />;
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
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <SystemNotificationBanner 
            notification={systemNotification} 
            onDismiss={handleDismissNotification}
          />
          <Toolbar>
            <CloudIcon sx={{ mr: 2 }} />
            <Typography variant="h6" noWrap component="div">
              Green Country: Greenhouse Gas Accounting Software
            </Typography>
            <Typography variant="caption" sx={{ ml: 2, opacity: 0.7 }}>
              v1.0
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </List>
            
            <Divider />
            <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
              Data Management
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'activity-data'} onClick={() => setCurrentPage('activity-data')}>
                  <ListItemIcon>
                    <DataObjectIcon />
                  </ListItemIcon>
                  <ListItemText primary="Activity Data" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'emission-factors'} onClick={() => setCurrentPage('emission-factors')}>
                  <ListItemIcon>
                    <CloudIcon />
                  </ListItemIcon>
                  <ListItemText primary="Emission Factors" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'calculations'} onClick={() => setCurrentPage('calculations')}>
                  <ListItemIcon>
                    <CalculateIcon />
                  </ListItemIcon>
                  <ListItemText primary="Calculations" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
            <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
              Advanced Features
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'scope3'} onClick={() => setCurrentPage('scope3')}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Scope 3" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'integrations'} onClick={() => setCurrentPage('integrations')}>
                  <ListItemIcon>
                    <IntegrationInstructionsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Integrations" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'analytics'} onClick={() => setCurrentPage('analytics')}>
                  <ListItemIcon>
                    <AnalyticsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Analytics" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'compliance'} onClick={() => setCurrentPage('compliance')}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary="Compliance" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
            <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
              AI & Strategic Planning
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'carbon-copilot'} onClick={() => setCurrentPage('carbon-copilot')}>
                  <ListItemIcon>
                    <SmartToyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Carbon Copilot" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'ai-ml'} onClick={() => setCurrentPage('ai-ml')}>
                  <ListItemIcon>
                    <PsychologyIcon />
                  </ListItemIcon>
                  <ListItemText primary="AI/ML Analytics" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'ai-settings'} onClick={() => setCurrentPage('ai-settings')}>
                  <ListItemIcon>
                    <TuneIcon />
                  </ListItemIcon>
                  <ListItemText primary="AI Settings" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'targets'} onClick={() => setCurrentPage('targets')}>
                  <ListItemIcon>
                    <EmojiEventsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Target Management" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'multi-entity'} onClick={() => setCurrentPage('multi-entity')}>
                  <ListItemIcon>
                    <LanguageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Multi-Entity" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
            <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
              Innovation & Optimization
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase4'} onClick={() => setCurrentPage('phase4')}>
                  <ListItemIcon>
                    <RocketLaunchIcon />
                  </ListItemIcon>
                  <ListItemText primary="Advanced Analytics" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase5'} onClick={() => setCurrentPage('phase5')}>
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Predictive Intelligence" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase6'} onClick={() => setCurrentPage('phase6')}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Operations Center" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase8'} onClick={() => setCurrentPage('phase8')}>
                  <ListItemIcon>
                    <CloudIcon />
                  </ListItemIcon>
                  <ListItemText primary="Autonomous Collection" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase11'} onClick={() => setCurrentPage('phase11')}>
                  <ListItemIcon>
                    <AccountTreeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Supply Chain X-Ray" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase13'} onClick={() => setCurrentPage('phase13')}>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Carbon-Financial Suite" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'phase14'} onClick={() => setCurrentPage('phase14')}>
                  <ListItemIcon>
                    <BusinessCenterIcon />
                  </ListItemIcon>
                  <ListItemText primary="ESG Strategy Orchestrator" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'users-messaging'} onClick={() => setCurrentPage('users-messaging')}>
                  <ListItemIcon>
                    <MessageIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users & Messaging" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'calendar'} onClick={() => setCurrentPage('calendar')}>
                  <ListItemIcon>
                    <CalendarMonthIcon />
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'documentation'} onClick={() => setCurrentPage('documentation')}>
                  <ListItemIcon>
                    <MenuBookIcon />
                  </ListItemIcon>
                  <ListItemText primary="Documentation" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'admin'} onClick={() => setCurrentPage('admin')}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Admin Panel" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'settings'} onClick={() => setCurrentPage('settings')}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          {renderPage()}
        </Box>
      </Box>
  );
};

export default App;
