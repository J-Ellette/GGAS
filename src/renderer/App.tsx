import React, { useState } from 'react';
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
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudIcon from '@mui/icons-material/Cloud';

import Dashboard from './pages/Dashboard';
import ActivityDataPage from './pages/ActivityDataPage';
import EmissionFactorsPage from './pages/EmissionFactorsPage';
import CalculationsPage from './pages/CalculationsPage';

const drawerWidth = 240;

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

type PageType = 'dashboard' | 'activity-data' | 'emission-factors' | 'calculations' | 'reports' | 'settings';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');

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
      case 'reports':
        return <Box p={3}><Typography variant="h4">Reports (Coming Soon)</Typography></Box>;
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
              GGAS - Greenhouse Gas Accounting Software
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
              <ListItem disablePadding>
                <ListItemButton selected={currentPage === 'reports'} onClick={() => setCurrentPage('reports')}>
                  <ListItemIcon>
                    <AssessmentIcon />
                  </ListItemIcon>
                  <ListItemText primary="Reports" />
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
