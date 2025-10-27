import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Alert,
  Tab,
  Tabs,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  LocationOn as LocationIcon,
  Speed as SpeedIcon,
  Notifications as NotificationsIcon,
  Timeline as TimelineIcon,
  Settings as SettingsIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  Fullscreen as FullscreenIcon,
  Map as MapIcon,
  BarChart as BarChartIcon,
  Lightbulb as LightbulbIcon,
  Build as BuildIcon,
  AutoFixHigh as AutoFixIcon,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

// Simulated real-time data
const generateRealTimeData = () => ({
  timestamp: new Date().toLocaleTimeString(),
  scope1: Math.random() * 1000 + 4500,
  scope2: Math.random() * 800 + 2200,
  scope3: Math.random() * 1200 + 3500,
  totalEmissions: 0,
});

const Phase6Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [liveDataEnabled, setLiveDataEnabled] = useState(true);
  const [selectedFacility, setSelectedFacility] = useState('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');
  const [realTimeData, setRealTimeData] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({
    totalEmissions: 10245,
    scope1: 4850,
    scope2: 2450,
    scope3: 2945,
    carbonIntensity: 0.42,
    trend: -2.3,
  });

  // Simulate real-time data streaming
  useEffect(() => {
    if (!liveDataEnabled) return;

    const interval = setInterval(() => {
      const newData = generateRealTimeData();
      newData.totalEmissions = newData.scope1 + newData.scope2 + newData.scope3;

      setRealTimeData(prev => {
        const updated = [...prev, newData];
        // Keep only last 20 data points
        return updated.slice(-20);
      });

      // Update current metrics
      setCurrentMetrics(prev => ({
        ...prev,
        totalEmissions: Math.round(newData.totalEmissions),
        scope1: Math.round(newData.scope1),
        scope2: Math.round(newData.scope2),
        scope3: Math.round(newData.scope3),
        carbonIntensity: +(newData.totalEmissions / 25000).toFixed(2),
        trend: +(Math.random() * 5 - 2.5).toFixed(1),
      }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [liveDataEnabled]);

  // Initialize with some data
  useEffect(() => {
    const initialData = Array.from({ length: 10 }, (_, i) => {
      const data = generateRealTimeData();
      data.totalEmissions = data.scope1 + data.scope2 + data.scope3;
      return data;
    });
    setRealTimeData(initialData);
  }, []);

  const facilities = [
    { id: 'all', name: 'All Facilities', status: 'green', emissions: 10245, trend: -2.3 },
    { id: 'fac1', name: 'Manufacturing Plant A', status: 'green', emissions: 3420, trend: -3.1 },
    { id: 'fac2', name: 'Distribution Center B', status: 'yellow', emissions: 2680, trend: 1.2 },
    { id: 'fac3', name: 'Office Complex C', status: 'green', emissions: 1450, trend: -5.7 },
    { id: 'fac4', name: 'Warehouse D', status: 'red', emissions: 2695, trend: 8.4 },
  ];

  const alerts = [
    { id: 1, severity: 'high', facility: 'Warehouse D', message: 'Emissions exceed threshold by 12%', time: '2 min ago', status: 'active' },
    { id: 2, severity: 'medium', facility: 'Distribution Center B', message: 'Unusual energy consumption pattern detected', time: '15 min ago', status: 'active' },
    { id: 3, severity: 'low', facility: 'Manufacturing Plant A', message: 'Optimization opportunity identified', time: '1 hr ago', status: 'acknowledged' },
  ];

  const automationActions = [
    { id: 1, trigger: 'High emissions threshold', action: 'Adjust HVAC settings', status: 'active', lastTriggered: '5 min ago' },
    { id: 2, trigger: 'Off-peak hours', action: 'Reduce lighting intensity', status: 'active', lastTriggered: '2 hrs ago' },
    { id: 3, trigger: 'Carbon intensity forecast', action: 'Shift energy-intensive operations', status: 'pending', lastTriggered: 'Never' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'success';
      case 'yellow': return 'warning';
      case 'red': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string): React.ReactElement => {
    switch (status) {
      case 'green': return <CheckCircleIcon />;
      case 'yellow': return <WarningIcon />;
      case 'red': return <ErrorIcon />;
      default: return <CheckCircleIcon />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DashboardIcon color="primary" fontSize="large" />
            Real-Time Carbon Operations Center
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Live monitoring, command center, and operational intelligence for carbon management
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControlLabel
            control={<Switch checked={liveDataEnabled} onChange={(e) => setLiveDataEnabled(e.target.checked)} />}
            label={liveDataEnabled ? 'Live' : 'Paused'}
          />
          <Button variant="outlined" startIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button variant="outlined" startIcon={<FullscreenIcon />}>
            Full Screen
          </Button>
        </Box>
      </Box>

      {/* Live Status Banner */}
      <Alert 
        severity={liveDataEnabled ? "success" : "info"} 
        sx={{ mb: 3 }}
        icon={liveDataEnabled ? <PlayArrowIcon /> : <PauseIcon />}
      >
        {liveDataEnabled 
          ? 'Live data streaming active - Updates every 2 seconds' 
          : 'Data streaming paused - Click the Live switch to resume'}
      </Alert>

      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} variant="scrollable" scrollButtons="auto">
          <Tab label="Live Monitoring Dashboard" icon={<DashboardIcon />} iconPosition="start" />
          <Tab label="Visual Command Center" icon={<MapIcon />} iconPosition="start" />
          <Tab label="Carbon Traffic Light System" icon={<SpeedIcon />} iconPosition="start" />
          <Tab label="Smart Process Monitoring" icon={<TimelineIcon />} iconPosition="start" />
          <Tab label="Automated Response Systems" icon={<AutoFixIcon />} iconPosition="start" />
          <Tab label="Enterprise Operations" icon={<BarChartIcon />} iconPosition="start" />
        </Tabs>

        {/* Tab 1: Live Monitoring Dashboard */}
        <TabPanel value={tabValue} index={0}>
          {/* Real-time Key Metrics */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Total Emissions (Real-Time)
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {currentMetrics.totalEmissions.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    tCO₂e/hour
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    {currentMetrics.trend < 0 ? (
                      <TrendingDownIcon color="success" fontSize="small" />
                    ) : (
                      <TrendingUpIcon color="error" fontSize="small" />
                    )}
                    <Typography variant="body2" color={currentMetrics.trend < 0 ? 'success.main' : 'error.main'}>
                      {Math.abs(currentMetrics.trend)}% vs last hour
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Scope 1 Emissions
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {currentMetrics.scope1.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    tCO₂e/hour
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(currentMetrics.scope1 / currentMetrics.totalEmissions) * 100} 
                    sx={{ mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Scope 2 Emissions
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {currentMetrics.scope2.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    tCO₂e/hour
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={(currentMetrics.scope2 / currentMetrics.totalEmissions) * 100} 
                    sx={{ mt: 2 }}
                    color="secondary"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    Carbon Intensity
                  </Typography>
                  <Typography variant="h4" sx={{ mb: 1 }}>
                    {currentMetrics.carbonIntensity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    tCO₂e/unit
                  </Typography>
                  <Chip 
                    label={currentMetrics.carbonIntensity < 0.5 ? 'Low' : 'Medium'} 
                    color={currentMetrics.carbonIntensity < 0.5 ? 'success' : 'warning'} 
                    size="small" 
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Real-time Chart */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Live Emissions Stream</Typography>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={selectedTimeRange} label="Time Range" onChange={(e) => setSelectedTimeRange(e.target.value)}>
                  <MenuItem value="1h">Last Hour</MenuItem>
                  <MenuItem value="4h">Last 4 Hours</MenuItem>
                  <MenuItem value="24h">Last 24 Hours</MenuItem>
                  <MenuItem value="7d">Last 7 Days</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={realTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="scope1" stackId="1" stroke="#2e7d32" fill="#4caf50" name="Scope 1" />
                <Area type="monotone" dataKey="scope2" stackId="1" stroke="#1976d2" fill="#42a5f5" name="Scope 2" />
                <Area type="monotone" dataKey="scope3" stackId="1" stroke="#ed6c02" fill="#ff9800" name="Scope 3" />
              </AreaChart>
            </ResponsiveContainer>
          </Paper>

          {/* Active Alerts */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <Badge badgeContent={alerts.filter(a => a.status === 'active').length} color="error">
                <NotificationsIcon />
              </Badge>
              <Box component="span" sx={{ ml: 1 }}>Active Alerts</Box>
            </Typography>
            <List>
              {alerts.map(alert => (
                <React.Fragment key={alert.id}>
                  <ListItem
                    secondaryAction={
                      <Button size="small" variant="outlined">
                        Acknowledge
                      </Button>
                    }
                  >
                    <ListItemIcon>
                      {alert.severity === 'high' && <ErrorIcon color="error" />}
                      {alert.severity === 'medium' && <WarningIcon color="warning" />}
                      {alert.severity === 'low' && <LightbulbIcon color="info" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={alert.message}
                      secondary={
                        <>
                          <Typography component="span" variant="body2" color="text.primary">
                            {alert.facility}
                          </Typography>
                          {' — ' + alert.time}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </TabPanel>

        {/* Tab 2: Visual Command Center */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, minHeight: 500 }}>
                <Typography variant="h6" gutterBottom>
                  Geographic Heat Map - Emission Intensity
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Large-screen optimized display showing emission intensity across all facilities
                </Typography>
                <Box sx={{ 
                  bgcolor: 'background.default', 
                  p: 3, 
                  borderRadius: 1, 
                  textAlign: 'center',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <MapIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h5" color="text.secondary">
                    Interactive Geographic Heat Map
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Real-time visualization of emission intensity across facilities and regions
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>Facility Selector</Typography>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Select Facility</InputLabel>
                  <Select value={selectedFacility} label="Select Facility" onChange={(e) => setSelectedFacility(e.target.value)}>
                    {facilities.map(fac => (
                      <MenuItem key={fac.id} value={fac.id}>{fac.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button variant="contained" fullWidth startIcon={<SettingsIcon />}>
                  Customize Layout
                </Button>
              </Paper>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Drill-Down Hierarchy</Typography>
                <List dense>
                  <ListItem button>
                    <ListItemText primary="Enterprise Level" secondary="All operations" />
                  </ListItem>
                  <ListItem button sx={{ pl: 4 }}>
                    <ListItemText primary="Regional Level" secondary="North America" />
                  </ListItem>
                  <ListItem button sx={{ pl: 6 }}>
                    <ListItemText primary="Facility Level" secondary="Manufacturing Plant A" />
                  </ListItem>
                  <ListItem button sx={{ pl: 8 }}>
                    <ListItemText primary="Asset Level" secondary="Boiler #3" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Carbon Traffic Light System */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Emission Performance Status - All Facilities
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Green/Yellow/Red indicators for emission performance across all operational levels
          </Typography>
          
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Facility</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Current Emissions</TableCell>
                  <TableCell align="right">Threshold</TableCell>
                  <TableCell align="right">Trend</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facilities.map(facility => (
                  <TableRow key={facility.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon fontSize="small" />
                        {facility.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        icon={getStatusIcon(facility.status)}
                        label={facility.status.toUpperCase()}
                        color={getStatusColor(facility.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">{facility.emissions.toLocaleString()} tCO₂e</TableCell>
                    <TableCell align="right">{(facility.emissions * 1.1).toFixed(0)} tCO₂e</TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                        {facility.trend < 0 ? (
                          <TrendingDownIcon color="success" fontSize="small" />
                        ) : (
                          <TrendingUpIcon color="error" fontSize="small" />
                        )}
                        <Typography variant="body2" color={facility.trend < 0 ? 'success.main' : 'error.main'}>
                          {Math.abs(facility.trend)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={3} sx={{ mt: 3 }}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <CheckCircleIcon color="success" />
                    <Typography variant="h6">Green Status</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Emissions within target range. Continue current operations.
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    3 facilities
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <WarningIcon color="warning" />
                    <Typography variant="h6">Yellow Status</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Approaching threshold. Monitor closely and prepare mitigation.
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    1 facility
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ErrorIcon color="error" />
                    <Typography variant="h6">Red Status</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Threshold exceeded. Immediate action required.
                  </Typography>
                  <Typography variant="h4" sx={{ mt: 2 }}>
                    1 facility
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 4: Smart Process Monitoring */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Real-Time Emission Factors
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Calculations based on current operational conditions
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Natural Gas Combustion"
                      secondary="Current: 0.053 tCO₂e/MMBtu (adjusted for temperature)"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Grid Electricity"
                      secondary="Current: 0.42 tCO₂e/MWh (based on grid mix forecast)"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Diesel Fuel"
                      secondary="Current: 2.68 tCO₂e/ton (standard)"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LightbulbIcon color="primary" />
                  Process Optimization Recommendations
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="High Impact" color="success" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Shift energy-intensive operations to off-peak hours"
                      secondary="Estimated savings: 125 tCO₂e/week"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="Medium" color="info" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Optimize HVAC schedule based on occupancy patterns"
                      secondary="Estimated savings: 45 tCO₂e/week"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="Maintenance" color="warning" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Schedule preventive maintenance for Boiler #3"
                      secondary="Efficiency drop detected - 12% increase in emissions"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BuildIcon />
              Carbon-Optimized Maintenance Schedule
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Asset</TableCell>
                    <TableCell>Maintenance Type</TableCell>
                    <TableCell>Scheduled Date</TableCell>
                    <TableCell>Carbon Impact</TableCell>
                    <TableCell>Priority</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Boiler #3</TableCell>
                    <TableCell>Preventive Maintenance</TableCell>
                    <TableCell>2024-02-15</TableCell>
                    <TableCell>-85 tCO₂e/month</TableCell>
                    <TableCell><Chip label="High" color="error" size="small" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Chiller Unit A</TableCell>
                    <TableCell>Filter Replacement</TableCell>
                    <TableCell>2024-02-20</TableCell>
                    <TableCell>-32 tCO₂e/month</TableCell>
                    <TableCell><Chip label="Medium" color="warning" size="small" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Lighting System</TableCell>
                    <TableCell>LED Upgrade</TableCell>
                    <TableCell>2024-03-01</TableCell>
                    <TableCell>-120 tCO₂e/month</TableCell>
                    <TableCell><Chip label="High" color="error" size="small" /></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </TabPanel>

        {/* Tab 5: Automated Response Systems */}
        <TabPanel value={tabValue} index={4}>
          <Alert severity="info" sx={{ mb: 3 }}>
            Automated response systems integrate with building management systems, IoT devices, and work order platforms to take immediate action when emission thresholds are exceeded.
          </Alert>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AutoFixIcon />
              Active Automation Rules
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Trigger Condition</TableCell>
                    <TableCell>Automated Action</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Last Triggered</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {automationActions.map(action => (
                    <TableRow key={action.id}>
                      <TableCell>{action.trigger}</TableCell>
                      <TableCell>{action.action}</TableCell>
                      <TableCell>
                        <Chip 
                          label={action.status} 
                          color={action.status === 'active' ? 'success' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell>{action.lastTriggered}</TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <SettingsIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Building Management System Integration
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="HVAC Control"
                      secondary="Connected - Last sync 2 min ago"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Lighting Control"
                      secondary="Connected - Last sync 5 min ago"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Energy Management"
                      secondary="Connected - Last sync 1 min ago"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Alert Dispatching
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Mobile Push Notifications"
                      secondary="5 devices registered"
                    />
                    <Switch defaultChecked />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Email Alerts"
                      secondary="operations@company.com"
                    />
                    <Switch defaultChecked />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="SMS Notifications"
                      secondary="Emergency contacts only"
                    />
                    <Switch />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 6: Enterprise Operations Integration */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    24/7 Operations Center
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Continuous monitoring and incident response
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main' }}>
                      <CheckCircleIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2">Status: Operational</Typography>
                      <Typography variant="caption" color="text.secondary">
                        Uptime: 99.98%
                      </Typography>
                    </Box>
                  </Box>
                  <Button variant="contained" fullWidth>
                    View Operations Dashboard
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Global Time Zone Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Coordinated monitoring across international operations
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText primary="Americas" secondary="EST 09:15 AM" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="EMEA" secondary="GMT 14:15 PM" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="APAC" secondary="SGT 22:15 PM" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Incident Management
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Carbon events integrated with enterprise incident response
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>Open Incidents</Typography>
                    <Chip label="2 Active" color="warning" size="small" sx={{ mr: 1 }} />
                    <Chip label="3 Resolved" color="success" size="small" />
                  </Box>
                  <Button variant="outlined" fullWidth>
                    View Incident Log
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Real-Time KPI Tracking
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Operational Excellence Score
                  </Typography>
                  <Typography variant="h4">94%</Typography>
                  <LinearProgress variant="determinate" value={94} sx={{ mt: 1 }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Carbon Efficiency Index
                  </Typography>
                  <Typography variant="h4">87%</Typography>
                  <LinearProgress variant="determinate" value={87} sx={{ mt: 1 }} color="secondary" />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Data Quality Score
                  </Typography>
                  <Typography variant="h4">96%</Typography>
                  <LinearProgress variant="determinate" value={96} sx={{ mt: 1 }} color="success" />
                </Box>
              </Grid>
              <Grid item xs={12} md={3}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Target Achievement
                  </Typography>
                  <Typography variant="h4">78%</Typography>
                  <LinearProgress variant="determinate" value={78} sx={{ mt: 1 }} color="info" />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default Phase6Page;
