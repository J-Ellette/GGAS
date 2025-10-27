import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Alert,
  Grid,
  Switch,
  FormControlLabel,
  MenuItem,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PeopleIcon from '@mui/icons-material/People';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PaletteIcon from '@mui/icons-material/Palette';
import SecurityIcon from '@mui/icons-material/Security';
import { User, UserRole } from '../../common/types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface LicenseKey {
  id: number;
  key: string;
  assignedTo: string;
  status: 'active' | 'inactive' | 'expired';
  createdAt: string;
  expiresAt: string;
}

interface AdminSettings {
  username: string;
  llmEnabled: boolean;
  llmProvider: string;
  llmApiKey: string;
  theme: string;
}

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  
  // License Keys
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);
  const [licenseDialogOpen, setLicenseDialogOpen] = useState(false);
  const [newLicenseKey, setNewLicenseKey] = useState('');
  const [newLicenseAssignedTo, setNewLicenseAssignedTo] = useState('');
  const [newLicenseExpires, setNewLicenseExpires] = useState('');
  
  // Users
  const [users, setUsers] = useState<User[]>([]);
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  
  // Password Change
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // Settings
  const [adminSettings, setAdminSettings] = useState<AdminSettings>({
    username: 'OKE03955',
    llmEnabled: false,
    llmProvider: 'openai',
    llmApiKey: '',
    theme: 'light',
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadLicenseKeys();
      loadUsers();
      loadUserRoles();
    }
  }, [isAuthenticated]);

  const loadLicenseKeys = () => {
    // Load from database (mock for now)
    setLicenseKeys([
      {
        id: 1,
        key: 'GCGGAS-2024-DEMO-KEY1',
        assignedTo: 'Demo Organization',
        status: 'active',
        createdAt: '2024-01-01',
        expiresAt: '2025-12-31',
      },
    ]);
  };

  const loadUsers = async () => {
    try {
      const result = await window.electronAPI.listUsers();
      setUsers(result);
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  const loadUserRoles = async () => {
    try {
      const result = await window.electronAPI.listUserRoles();
      setUserRoles(result);
    } catch (error) {
      console.error('Failed to load user roles:', error);
    }
  };

  const handleLogin = () => {
    // ⚠️ SECURITY WARNING: This is a DEMO authentication system only!
    // For production use, implement:
    // - Server-side authentication with secure session management
    // - Password hashing (bcrypt/Argon2)
    // - Rate limiting to prevent brute force attacks
    // - Multi-factor authentication (MFA)
    // - Audit logging of all login attempts
    // DO NOT use these hard-coded credentials in production!
    
    // Check credentials
    if (loginUsername === 'OKE03955' && loginPassword === '8675309Jenny!') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleAddLicenseKey = () => {
    if (!newLicenseKey || !newLicenseAssignedTo || !newLicenseExpires) {
      return;
    }

    const newKey: LicenseKey = {
      id: licenseKeys.length + 1,
      key: newLicenseKey,
      assignedTo: newLicenseAssignedTo,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: newLicenseExpires,
    };

    setLicenseKeys([...licenseKeys, newKey]);
    setLicenseDialogOpen(false);
    setNewLicenseKey('');
    setNewLicenseAssignedTo('');
    setNewLicenseExpires('');
  };

  const handleDeleteLicenseKey = (id: number) => {
    setLicenseKeys(licenseKeys.filter(key => key.id !== id));
  };

  const handleChangePassword = () => {
    // ⚠️ SECURITY WARNING: This is a DEMO password change system only!
    // For production use, implement:
    // - Server-side password validation
    // - Password hashing with salt (bcrypt/Argon2)
    // - Password complexity requirements enforcement
    // - Password history to prevent reuse
    // - Secure password storage in database
    // - Email notification of password changes
    
    if (currentPassword !== '8675309Jenny!') {
      setPasswordError('Current password is incorrect');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    // In production, this would update the password in the database with proper hashing
    alert('Password changed successfully! (Note: This is a demo - password not actually changed)');
    setPasswordDialogOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
  };

  const handleSaveUser = async () => {
    // Save user logic here
    setUserDialogOpen(false);
    setEditingUser(null);
    loadUsers();
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await window.electronAPI.deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Card sx={{ maxWidth: 400, width: '100%' }}>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <SecurityIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Admin Panel Login
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter your credentials to access the admin panel
              </Typography>
            </Box>

            {loginError && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {loginError}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              margin="normal"
              autoComplete="username"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              margin="normal"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Admin Panel</Typography>
        <Box>
          <Button
            variant="outlined"
            onClick={() => setPasswordDialogOpen(true)}
            sx={{ mr: 2 }}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setIsAuthenticated(false)}
          >
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="License Keys" icon={<VpnKeyIcon />} iconPosition="start" />
          <Tab label="User Management" icon={<PeopleIcon />} iconPosition="start" />
          <Tab label="Deep Learning" icon={<PsychologyIcon />} iconPosition="start" />
          <Tab label="LLM Integration" icon={<PsychologyIcon />} iconPosition="start" />
          <Tab label="Themes" icon={<PaletteIcon />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* License Keys Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">License Key Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setLicenseDialogOpen(true)}
          >
            Add License Key
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>License Key</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Expires</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {licenseKeys.map((license) => (
                <TableRow key={license.id}>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {license.key}
                    </Typography>
                  </TableCell>
                  <TableCell>{license.assignedTo}</TableCell>
                  <TableCell>
                    <Chip
                      label={license.status}
                      color={license.status === 'active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{license.createdAt}</TableCell>
                  <TableCell>{license.expiresAt}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteLicenseKey(license.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* User Management Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">User Management</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingUser(null);
              setUserDialogOpen(true);
            }}
          >
            Add User
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {userRoles.find(r => r.id === user.roleId)?.roleName || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isActive ? 'Active' : 'Inactive'}
                      color={user.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingUser(user);
                        setUserDialogOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => user.id && handleDeleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Deep Learning Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>Deep Learning Models</Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          Deep Learning model settings have been moved to the AI/ML Analytics page for better integration.
        </Alert>
        <Button variant="outlined">
          Go to AI/ML Analytics
        </Button>
      </TabPanel>

      {/* LLM Integration Tab */}
      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6" gutterBottom>LLM Integration Settings</Typography>
        
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <FormControlLabel
              control={
                <Switch
                  checked={adminSettings.llmEnabled}
                  onChange={(e) => setAdminSettings({ ...adminSettings, llmEnabled: e.target.checked })}
                />
              }
              label="Enable LLM Integration"
            />

            {adminSettings.llmEnabled && (
              <Box sx={{ mt: 3 }}>
                <TextField
                  select
                  fullWidth
                  label="LLM Provider"
                  value={adminSettings.llmProvider}
                  onChange={(e) => setAdminSettings({ ...adminSettings, llmProvider: e.target.value })}
                  margin="normal"
                >
                  <MenuItem value="openai">OpenAI</MenuItem>
                  <MenuItem value="anthropic">Anthropic</MenuItem>
                  <MenuItem value="cohere">Cohere</MenuItem>
                  <MenuItem value="custom">Custom Endpoint</MenuItem>
                </TextField>

                <TextField
                  fullWidth
                  label="API Key"
                  type="password"
                  value={adminSettings.llmApiKey}
                  onChange={(e) => setAdminSettings({ ...adminSettings, llmApiKey: e.target.value })}
                  margin="normal"
                  helperText="Your API key will be stored securely"
                />

                <Button variant="contained" sx={{ mt: 2 }}>
                  Save LLM Settings
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Themes Tab */}
      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6" gutterBottom>Theme Settings</Typography>
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                border: adminSettings.theme === 'light' ? 2 : 0,
                borderColor: 'primary.main',
              }}
              onClick={() => setAdminSettings({ ...adminSettings, theme: 'light' })}
            >
              <CardContent>
                <Typography variant="h6">Light Theme</Typography>
                <Typography variant="body2" color="text.secondary">
                  Default light mode theme
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                border: adminSettings.theme === 'dark' ? 2 : 0,
                borderColor: 'primary.main',
              }}
              onClick={() => setAdminSettings({ ...adminSettings, theme: 'dark' })}
            >
              <CardContent>
                <Typography variant="h6">Dark Theme</Typography>
                <Typography variant="body2" color="text.secondary">
                  Dark mode theme
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                cursor: 'pointer',
                border: adminSettings.theme === 'green' ? 2 : 0,
                borderColor: 'primary.main',
              }}
              onClick={() => setAdminSettings({ ...adminSettings, theme: 'green' })}
            >
              <CardContent>
                <Typography variant="h6">Green Country Theme</Typography>
                <Typography variant="body2" color="text.secondary">
                  Branded Green Country theme
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Button variant="contained" sx={{ mt: 3 }}>
          Apply Theme
        </Button>
      </TabPanel>

      {/* License Key Dialog */}
      <Dialog open={licenseDialogOpen} onClose={() => setLicenseDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add License Key</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="License Key"
            value={newLicenseKey}
            onChange={(e) => setNewLicenseKey(e.target.value)}
            margin="normal"
            placeholder="GCGGAS-YYYY-XXXX-XXXX"
          />
          <TextField
            fullWidth
            label="Assigned To"
            value={newLicenseAssignedTo}
            onChange={(e) => setNewLicenseAssignedTo(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Expiration Date"
            type="date"
            value={newLicenseExpires}
            onChange={(e) => setNewLicenseExpires(e.target.value)}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLicenseDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddLicenseKey} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleChangePassword} variant="contained">Change Password</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
