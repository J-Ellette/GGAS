import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Slider,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  PhotoCamera as CameraIcon,
  Notifications as NotificationsIcon,
  Dashboard as DashboardIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  History as HistoryIcon,
  DevicesOther as DevicesIcon,
  VpnKey as KeyIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Computer as ComputerIcon,
  Smartphone as SmartphoneIcon,
  Tablet as TabletIcon,
} from '@mui/icons-material';

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

interface UserProfile {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  department: string;
  jobTitle: string;
  profilePhoto: string;
}

interface LoginHistory {
  id: number;
  timestamp: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  status: 'success' | 'failed';
}

interface ActiveSession {
  id: number;
  device: string;
  browser: string;
  ipAddress: string;
  lastActive: string;
  current: boolean;
}

const SettingsPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Profile Settings
  const [profile, setProfile] = useState<UserProfile>({
    username: 'john.doe',
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 (555) 123-4567',
    department: 'Sustainability',
    jobTitle: 'Carbon Analyst',
    profilePhoto: '',
  });
  const [editingProfile, setEditingProfile] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Account Activity
  const [loginHistory] = useState<LoginHistory[]>([
    { id: 1, timestamp: '2024-01-20 09:15:00', device: 'Desktop', browser: 'Chrome', ipAddress: '192.168.1.100', location: 'New York, US', status: 'success' },
    { id: 2, timestamp: '2024-01-19 14:30:00', device: 'Mobile', browser: 'Safari', ipAddress: '192.168.1.105', location: 'New York, US', status: 'success' },
    { id: 3, timestamp: '2024-01-18 10:45:00', device: 'Desktop', browser: 'Chrome', ipAddress: '192.168.1.100', location: 'New York, US', status: 'success' },
  ]);

  const [activeSessions] = useState<ActiveSession[]>([
    { id: 1, device: 'Desktop - Windows', browser: 'Chrome 120', ipAddress: '192.168.1.100', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Mobile - iOS', browser: 'Safari 17', ipAddress: '192.168.1.105', lastActive: '3 hours ago', current: false },
  ]);

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [notifyDataChanges, setNotifyDataChanges] = useState(true);
  const [notifyTargets, setNotifyTargets] = useState(true);
  const [notifyReports, setNotifyReports] = useState(true);
  const [notifyAnomalies, setNotifyAnomalies] = useState(true);
  const [notifySystemUpdates, setNotifySystemUpdates] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [emailFrequency, setEmailFrequency] = useState('daily');

  // Dashboard Customization
  const [dashboardWidgets, setDashboardWidgets] = useState({
    emissionsOverview: true,
    targetProgress: true,
    recentActivity: true,
    alerts: true,
    trends: true,
    topEmitters: true,
  });
  const [defaultView, setDefaultView] = useState('dashboard');
  const [chartType, setChartType] = useState('line');
  const [widgetDensity, setWidgetDensity] = useState(2);

  // Theme and Layout
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(14);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  // Language and Locale
  const [language, setLanguage] = useState('en');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [timezone, setTimezone] = useState('America/New_York');
  const [currency, setCurrency] = useState('USD');
  const [numberFormat, setNumberFormat] = useState('en-US');

  // Security Settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordExpiry, setPasswordExpiry] = useState(90);
  const [loginNotifications, setLoginNotifications] = useState(true);

  // Display Options
  const [showTooltips, setShowTooltips] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const handleSaveProfile = () => {
    // Save profile logic would go here
    setSaveSuccess(true);
    setEditingProfile(false);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Password change logic would go here
    setPasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password changed successfully');
  };

  const handleTerminateSession = (sessionId: number) => {
    // Terminate session logic would go here
    alert(`Session ${sessionId} terminated`);
  };

  const handlePhotoUpload = () => {
    // Photo upload logic would go here
    alert('Photo upload functionality would be implemented here');
  };

  const handleSaveSettings = () => {
    // Save all settings logic would go here
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PersonIcon color="primary" fontSize="large" />
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your personal preferences, account settings, and security
        </Typography>
      </Box>

      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSaveSuccess(false)}>
          Settings saved successfully!
        </Alert>
      )}

      <Paper>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Profile" icon={<PersonIcon />} iconPosition="start" />
          <Tab label="Account Activity" icon={<HistoryIcon />} iconPosition="start" />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" />
          <Tab label="Dashboard" icon={<DashboardIcon />} iconPosition="start" />
          <Tab label="Appearance" icon={<PaletteIcon />} iconPosition="start" />
          <Tab label="Language & Locale" icon={<LanguageIcon />} iconPosition="start" />
          <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" />
          <Tab label="Display" icon={<VisibilityIcon />} iconPosition="start" />
        </Tabs>

        <Divider />

        {/* Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={profile.profilePhoto}
                sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
              >
                {profile.firstName[0]}{profile.lastName[0]}
              </Avatar>
              <Button
                variant="outlined"
                startIcon={<CameraIcon />}
                onClick={handlePhotoUpload}
              >
                Change Photo
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">Personal Information</Typography>
                    {!editingProfile ? (
                      <Button startIcon={<EditIcon />} onClick={() => setEditingProfile(true)}>
                        Edit
                      </Button>
                    ) : (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={handleSaveProfile}
                        >
                          Save
                        </Button>
                        <Button
                          startIcon={<CancelIcon />}
                          onClick={() => setEditingProfile(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={profile.username}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={profile.email}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    value={profile.firstName}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    value={profile.lastName}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={profile.phone}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={profile.department}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={profile.jobTitle}
                    disabled={!editingProfile}
                    onChange={(e) => setProfile({ ...profile, jobTitle: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    startIcon={<KeyIcon />}
                    onClick={() => setPasswordDialogOpen(true)}
                  >
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Account Activity Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Login History</Typography>
          <TableContainer sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>Device</TableCell>
                  <TableCell>Browser</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loginHistory.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.timestamp}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {entry.device === 'Desktop' ? <ComputerIcon fontSize="small" /> : <SmartphoneIcon fontSize="small" />}
                        {entry.device}
                      </Box>
                    </TableCell>
                    <TableCell>{entry.browser}</TableCell>
                    <TableCell>{entry.ipAddress}</TableCell>
                    <TableCell>{entry.location}</TableCell>
                    <TableCell>
                      <Chip
                        label={entry.status}
                        color={entry.status === 'success' ? 'success' : 'error'}
                        size="small"
                        icon={entry.status === 'success' ? <CheckIcon /> : <ErrorIcon />}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>Active Sessions</Typography>
          <Grid container spacing={2}>
            {activeSessions.map((session) => (
              <Grid item xs={12} md={6} key={session.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <DevicesIcon />
                        <Box>
                          <Typography variant="subtitle1">{session.device}</Typography>
                          <Typography variant="body2" color="text.secondary">{session.browser}</Typography>
                        </Box>
                      </Box>
                      {session.current && <Chip label="Current" color="primary" size="small" />}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      IP: {session.ipAddress}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last Active: {session.lastActive}
                    </Typography>
                    {!session.current && (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{ mt: 2 }}
                        onClick={() => handleTerminateSession(session.id)}
                      >
                        Terminate Session
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Notification Channels</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />}
                  label="Email Notifications"
                />
                <FormControlLabel
                  control={<Switch checked={inAppNotifications} onChange={(e) => setInAppNotifications(e.target.checked)} />}
                  label="In-App Notifications"
                />
                <FormControlLabel
                  control={<Switch checked={notificationSound} onChange={(e) => setNotificationSound(e.target.checked)} />}
                  label="Notification Sounds"
                />
              </FormGroup>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Email Frequency</Typography>
              <FormControl fullWidth>
                <Select value={emailFrequency} onChange={(e) => setEmailFrequency(e.target.value)}>
                  <MenuItem value="realtime">Real-time</MenuItem>
                  <MenuItem value="hourly">Hourly Digest</MenuItem>
                  <MenuItem value="daily">Daily Digest</MenuItem>
                  <MenuItem value="weekly">Weekly Digest</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Notification Types</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={notifyDataChanges} onChange={(e) => setNotifyDataChanges(e.target.checked)} />}
                  label="Data Changes & Updates"
                />
                <FormControlLabel
                  control={<Switch checked={notifyTargets} onChange={(e) => setNotifyTargets(e.target.checked)} />}
                  label="Target Progress & Milestones"
                />
                <FormControlLabel
                  control={<Switch checked={notifyReports} onChange={(e) => setNotifyReports(e.target.checked)} />}
                  label="Report Completion"
                />
                <FormControlLabel
                  control={<Switch checked={notifyAnomalies} onChange={(e) => setNotifyAnomalies(e.target.checked)} />}
                  label="Anomalies & Alerts"
                />
                <FormControlLabel
                  control={<Switch checked={notifySystemUpdates} onChange={(e) => setNotifySystemUpdates(e.target.checked)} />}
                  label="System Updates & Maintenance"
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
              Save Notification Settings
            </Button>
          </Box>
        </TabPanel>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Dashboard Widgets</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={dashboardWidgets.emissionsOverview} onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, emissionsOverview: e.target.checked })} />}
                  label="Emissions Overview"
                />
                <FormControlLabel
                  control={<Checkbox checked={dashboardWidgets.targetProgress} onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, targetProgress: e.target.checked })} />}
                  label="Target Progress"
                />
                <FormControlLabel
                  control={<Checkbox checked={dashboardWidgets.recentActivity} onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, recentActivity: e.target.checked })} />}
                  label="Recent Activity"
                />
                <FormControlLabel
                  control={<Checkbox checked={dashboardWidgets.alerts} onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, alerts: e.target.checked })} />}
                  label="Alerts & Warnings"
                />
                <FormControlLabel
                  control={<Checkbox checked={dashboardWidgets.trends} onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, trends: e.target.checked })} />}
                  label="Trend Analysis"
                />
                <FormControlLabel
                  control={<Checkbox checked={dashboardWidgets.topEmitters} onChange={(e) => setDashboardWidgets({ ...dashboardWidgets, topEmitters: e.target.checked })} />}
                  label="Top Emitters"
                />
              </FormGroup>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Default View</Typography>
              <FormControl fullWidth>
                <Select value={defaultView} onChange={(e) => setDefaultView(e.target.value)}>
                  <MenuItem value="dashboard">Dashboard</MenuItem>
                  <MenuItem value="activity-data">Activity Data</MenuItem>
                  <MenuItem value="analytics">Analytics</MenuItem>
                  <MenuItem value="targets">Targets</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Chart Preferences</Typography>
              <FormControl component="fieldset">
                <FormLabel component="legend">Default Chart Type</FormLabel>
                <RadioGroup value={chartType} onChange={(e) => setChartType(e.target.value)}>
                  <FormControlLabel value="line" control={<Radio />} label="Line Charts" />
                  <FormControlLabel value="bar" control={<Radio />} label="Bar Charts" />
                  <FormControlLabel value="pie" control={<Radio />} label="Pie Charts" />
                  <FormControlLabel value="area" control={<Radio />} label="Area Charts" />
                </RadioGroup>
              </FormControl>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Widget Density</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Adjust how much information is displayed per widget
              </Typography>
              <Slider
                value={widgetDensity}
                onChange={(e, value) => setWidgetDensity(value as number)}
                min={1}
                max={3}
                step={1}
                marks={[
                  { value: 1, label: 'Compact' },
                  { value: 2, label: 'Normal' },
                  { value: 3, label: 'Detailed' },
                ]}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
              Save Dashboard Settings
            </Button>
          </Box>
        </TabPanel>

        {/* Appearance Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Theme</Typography>
              <FormControl component="fieldset">
                <RadioGroup value={theme} onChange={(e) => setTheme(e.target.value)}>
                  <FormControlLabel value="light" control={<Radio />} label="Light Mode" />
                  <FormControlLabel value="dark" control={<Radio />} label="Dark Mode" />
                  <FormControlLabel value="auto" control={<Radio />} label="Auto (System Default)" />
                </RadioGroup>
              </FormControl>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Font Size</Typography>
              <Slider
                value={fontSize}
                onChange={(e, value) => setFontSize(value as number)}
                min={12}
                max={18}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Layout Options</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={sidebarCollapsed} onChange={(e) => setSidebarCollapsed(e.target.checked)} />}
                  label="Collapsed Sidebar by Default"
                />
                <FormControlLabel
                  control={<Switch checked={compactMode} onChange={(e) => setCompactMode(e.target.checked)} />}
                  label="Compact Mode"
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
              Save Appearance Settings
            </Button>
          </Box>
        </TabPanel>

        {/* Language & Locale Tab */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Language</InputLabel>
                <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                  <MenuItem value="zh">中文</MenuItem>
                  <MenuItem value="ja">日本語</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Date Format</InputLabel>
                <Select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)}>
                  <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                  <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                  <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Time Format</InputLabel>
                <Select value={timeFormat} onChange={(e) => setTimeFormat(e.target.value)}>
                  <MenuItem value="12h">12-hour (AM/PM)</MenuItem>
                  <MenuItem value="24h">24-hour</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Timezone</InputLabel>
                <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                  <MenuItem value="America/New_York">Eastern Time (ET)</MenuItem>
                  <MenuItem value="America/Chicago">Central Time (CT)</MenuItem>
                  <MenuItem value="America/Denver">Mountain Time (MT)</MenuItem>
                  <MenuItem value="America/Los_Angeles">Pacific Time (PT)</MenuItem>
                  <MenuItem value="Europe/London">London (GMT)</MenuItem>
                  <MenuItem value="Europe/Paris">Paris (CET)</MenuItem>
                  <MenuItem value="Asia/Tokyo">Tokyo (JST)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Currency</InputLabel>
                <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <MenuItem value="USD">US Dollar (USD)</MenuItem>
                  <MenuItem value="EUR">Euro (EUR)</MenuItem>
                  <MenuItem value="GBP">British Pound (GBP)</MenuItem>
                  <MenuItem value="JPY">Japanese Yen (JPY)</MenuItem>
                  <MenuItem value="CNY">Chinese Yuan (CNY)</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Number Format</InputLabel>
                <Select value={numberFormat} onChange={(e) => setNumberFormat(e.target.value)}>
                  <MenuItem value="en-US">1,234.56 (US)</MenuItem>
                  <MenuItem value="de-DE">1.234,56 (German)</MenuItem>
                  <MenuItem value="fr-FR">1 234,56 (French)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
              Save Language & Locale Settings
            </Button>
          </Box>
        </TabPanel>

        {/* Security Tab */}
        <TabPanel value={tabValue} index={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1">Status</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                      </Typography>
                    </Box>
                    <Switch
                      checked={twoFactorEnabled}
                      onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                    />
                  </Box>
                  {!twoFactorEnabled && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Enable 2FA for enhanced security
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Typography variant="h6" gutterBottom>Session Settings</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Session Timeout (minutes)
              </Typography>
              <Slider
                value={sessionTimeout}
                onChange={(e, value) => setSessionTimeout(value as number)}
                min={15}
                max={120}
                step={15}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>Password Policy</Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Password Expiry (days)
              </Typography>
              <Slider
                value={passwordExpiry}
                onChange={(e, value) => setPasswordExpiry(value as number)}
                min={30}
                max={365}
                step={30}
                marks={[
                  { value: 30, label: '30' },
                  { value: 90, label: '90' },
                  { value: 180, label: '180' },
                  { value: 365, label: '365' },
                ]}
                valueLabelDisplay="auto"
              />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Security Notifications</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={loginNotifications} onChange={(e) => setLoginNotifications(e.target.checked)} />}
                  label="Notify on new device login"
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
              Save Security Settings
            </Button>
          </Box>
        </TabPanel>

        {/* Display Tab */}
        <TabPanel value={tabValue} index={7}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>Display Preferences</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={showTooltips} onChange={(e) => setShowTooltips(e.target.checked)} />}
                  label="Show Tooltips"
                />
                <FormControlLabel
                  control={<Switch checked={animationsEnabled} onChange={(e) => setAnimationsEnabled(e.target.checked)} />}
                  label="Enable Animations"
                />
              </FormGroup>

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>Accessibility</Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />}
                  label="High Contrast Mode"
                />
                <FormControlLabel
                  control={<Switch checked={reducedMotion} onChange={(e) => setReducedMotion(e.target.checked)} />}
                  label="Reduce Motion"
                />
              </FormGroup>

              <Alert severity="info" sx={{ mt: 2 }}>
                Accessibility settings help make the application more usable for users with different needs
              </Alert>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSaveSettings}>
              Save Display Settings
            </Button>
          </Box>
        </TabPanel>
      </Paper>

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Alert severity="info" sx={{ mt: 2 }}>
            Password must be at least 8 characters with uppercase, lowercase, numbers, and special characters
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Change Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SettingsPage;
