import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Chip,
  Grid,
  Alert,
  IconButton,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
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

const DEFAULT_PERMISSIONS = {
  canManageUsers: false,
  canManageData: false,
  canViewReports: false,
  canExportData: false,
  canManageIntegrations: false,
  canManageCompliance: false,
};

const UserManagementPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openRoleDialog, setOpenRoleDialog] = useState(false);
  const [newUser, setNewUser] = useState<Partial<User>>({
    username: '',
    email: '',
    roleId: 0,
    isActive: true,
  });
  const [newRole, setNewRole] = useState<Partial<UserRole>>({
    roleName: '',
    description: '',
    permissions: JSON.stringify(DEFAULT_PERMISSIONS, null, 2),
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [usersData, rolesData] = await Promise.all([
        window.electronAPI.listUsers(),
        window.electronAPI.listUserRoles(),
      ]);
      setUsers(usersData);
      setRoles(rolesData);
    } catch (error) {
      console.error('Failed to load user management data:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateUser = async () => {
    try {
      await window.electronAPI.createUser(newUser as User);
      setOpenUserDialog(false);
      setNewUser({
        username: '',
        email: '',
        roleId: 0,
        isActive: true,
      });
      loadData();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleCreateRole = async () => {
    try {
      await window.electronAPI.createUserRole(newRole as UserRole);
      setOpenRoleDialog(false);
      setNewRole({
        roleName: '',
        description: '',
        permissions: JSON.stringify(DEFAULT_PERMISSIONS, null, 2),
      });
      loadData();
    } catch (error) {
      console.error('Failed to create role:', error);
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      await window.electronAPI.updateUser(user.id!, { isActive: !user.isActive });
      loadData();
    } catch (error) {
      console.error('Failed to toggle user status:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await window.electronAPI.deleteUser(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleDeleteRole = async (id: number) => {
    try {
      await window.electronAPI.deleteUserRole(id);
      loadData();
    } catch (error) {
      console.error('Failed to delete role:', error);
    }
  };

  const getRoleName = (roleId: number) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.roleName : 'Unknown';
  };

  const parsePermissions = (permissionsStr: string) => {
    try {
      return JSON.parse(permissionsStr);
    } catch {
      return {};
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management & Permissions
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage users, roles, and permissions with granular access control
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleIcon fontSize="large" color="primary" />
                <Box>
                  <Typography variant="h6">Total Users</Typography>
                  <Typography variant="h3" color="primary">
                    {users.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AdminPanelSettingsIcon fontSize="large" color="secondary" />
                <Box>
                  <Typography variant="h6">Total Roles</Typography>
                  <Typography variant="h3" color="secondary">
                    {roles.length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleIcon fontSize="large" color="success" />
                <Box>
                  <Typography variant="h6">Active Users</Typography>
                  <Typography variant="h3" color="success.main">
                    {users.filter(u => u.isActive).length}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Users" />
          <Tab label="Roles & Permissions" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">User Accounts</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenUserDialog(true)}
          >
            Add User
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Manage user accounts and assign roles with specific permissions. Users can be activated or deactivated at any time.
        </Alert>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">
                      No users available. Add your first user above.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {user.username}
                      </Typography>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={getRoleName(user.roleId)} size="small" color="primary" />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.isActive ? 'Active' : 'Inactive'}
                        color={user.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleString()
                          : 'Never'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={user.isActive}
                              onChange={() => handleToggleUserStatus(user)}
                              size="small"
                            />
                          }
                          label=""
                        />
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteUser(user.id!)}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">User Roles</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenRoleDialog(true)}
          >
            Add Role
          </Button>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          Define custom roles with specific permissions. Each user can be assigned one role that determines their access level.
        </Alert>

        <Grid container spacing={3}>
          {roles.map((role) => {
            const permissions = parsePermissions(role.permissions);
            return (
              <Grid item xs={12} md={6} key={role.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6">{role.roleName}</Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteRole(role.id!)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {role.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Permissions:
                      </Typography>
                      {Object.entries(permissions).map(([key, value]) => (
                        <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={value ? 'Yes' : 'No'}
                            size="small"
                            color={value ? 'success' : 'default'}
                          />
                          <Typography variant="body2">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </TabPanel>

      {/* Add User Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Role"
              value={newUser.roleId}
              onChange={(e) => setNewUser({ ...newUser, roleId: parseInt(e.target.value) })}
              fullWidth
              required
              select
            >
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.roleName}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={newUser.isActive}
                  onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
                />
              }
              label="Active"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateUser} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Role Dialog */}
      <Dialog open={openRoleDialog} onClose={() => setOpenRoleDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Role</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Role Name"
              value={newRole.roleName}
              onChange={(e) => setNewRole({ ...newRole, roleName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Permissions (JSON)"
              value={newRole.permissions}
              onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
              fullWidth
              multiline
              rows={8}
              helperText="Define permissions as JSON object"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRoleDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateRole} variant="contained" color="primary">
            Add Role
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagementPage;
