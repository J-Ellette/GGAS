import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
import AdminPanel from './pages/AdminPanel';
import DocumentationPage from './pages/DocumentationPage';
import LicenseKeyDialog from './components/LicenseKeyDialog';

const drawerWidth = 280;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#1976d2',
    },
  },
});

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
  | 'admin'
  | 'settings'
  | 'documentation';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [licenseValidated, setLicenseValidated] = useState(false);
  const [showLicenseDialog, setShowLicenseDialog] = useState(false);

  useEffect(() => {
    // Check if license is already validated
    const validated = localStorage.getItem('licenseValidated');
    if (validated === 'true') {
      setLicenseValidated(true);
    } else {
      setShowLicenseDialog(true);
    }
  }, []);

  const handleLicenseValid = () => {
    setLicenseValidated(true);
    setShowLicenseDialog(false);
  };

  const handleAdminAccess = () => {
    setLicenseValidated(true);
    setShowLicenseDialog(false);
    setCurrentPage('admin');
  };

  if (showLicenseDialog && !licenseValidated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LicenseKeyDialog 
          onLicenseValid={handleLicenseValid}
          onAdminAccess={handleAdminAccess}
        />
      </ThemeProvider>
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
      case 'targets':
        return <TargetManagementPage />;
      case 'multi-entity':
        return <MultiEntityPage />;
      case 'phase4':
        return <Phase4Page />;
      case 'admin':
        return <AdminPanel />;
      case 'documentation':
        return <DocumentationPage />;
      case 'settings':
        return <Box p={3}><Typography variant="h4">Settings (Coming Soon)</Typography></Box>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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
                <ListItemButton selected={currentPage === 'ai-ml'} onClick={() => setCurrentPage('ai-ml')}>
                  <ListItemIcon>
                    <PsychologyIcon />
                  </ListItemIcon>
                  <ListItemText primary="AI/ML Analytics" />
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
            </List>

            <Divider />
            <List>
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
    </ThemeProvider>
  );
};

export default App;
