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
  IconButton,
  Alert,
  Grid,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import SyncIcon from '@mui/icons-material/Sync';
import { Integration } from '../../common/types';

const IntegrationsPage: React.FC = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [newIntegration, setNewIntegration] = useState<Partial<Integration>>({
    name: '',
    type: 'ERP',
    status: 'inactive',
    connectionString: '',
    configuration: '',
  });

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const data = await window.electronAPI.listIntegrations();
      setIntegrations(data);
    } catch (error) {
      console.error('Failed to load integrations:', error);
    }
  };

  const handleAddIntegration = () => {
    setOpenDialog(true);
  };

  const handleSaveIntegration = async () => {
    try {
      await window.electronAPI.createIntegration(newIntegration as Integration);
      setOpenDialog(false);
      setNewIntegration({
        name: '',
        type: 'ERP',
        status: 'inactive',
        connectionString: '',
        configuration: '',
      });
      loadIntegrations();
    } catch (error) {
      console.error('Failed to create integration:', error);
    }
  };

  const handleDeleteIntegration = async (id: number) => {
    try {
      await window.electronAPI.deleteIntegration(id);
      loadIntegrations();
    } catch (error) {
      console.error('Failed to delete integration:', error);
    }
  };

  const handleTestConnection = async (id: number) => {
    try {
      const result = await window.electronAPI.testIntegrationConnection(id);
      setTestResult(result);
      setTimeout(() => setTestResult(null), 5000);
    } catch (error) {
      console.error('Failed to test connection:', error);
      setTestResult({ success: false, message: 'Connection test failed' });
    }
  };

  const handleToggleStatus = async (integration: Integration) => {
    try {
      const newStatus = integration.status === 'active' ? 'inactive' : 'active';
      await window.electronAPI.updateIntegration(integration.id!, { status: newStatus });
      loadIntegrations();
    } catch (error) {
      console.error('Failed to update integration status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon color="success" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <SyncIcon color="disabled" />;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Integration Management
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage external system integrations including ERP, utility data, and real-time data streams
      </Typography>

      {testResult && (
        <Alert severity={testResult.success ? 'success' : 'error'} sx={{ mb: 2 }}>
          {testResult.message}
        </Alert>
      )}

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Integrations
              </Typography>
              <Typography variant="h3" color="primary">
                {integrations.filter(i => i.status === 'active').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Total Integrations
              </Typography>
              <Typography variant="h3" color="secondary">
                {integrations.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Error Status
              </Typography>
              <Typography variant="h3" color="error">
                {integrations.filter(i => i.status === 'error').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6">Integration Connections</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddIntegration}
        >
          Add Integration
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Sync</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {integrations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">
                    No integrations configured. Add your first integration above.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              integrations.map((integration) => (
                <TableRow key={integration.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getStatusIcon(integration.status)}
                      <Typography variant="body2" fontWeight="bold">
                        {integration.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip label={integration.type} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={integration.status}
                      color={
                        integration.status === 'active'
                          ? 'success'
                          : integration.status === 'error'
                          ? 'error'
                          : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {integration.lastSyncTime
                        ? new Date(integration.lastSyncTime).toLocaleString()
                        : 'Never'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleTestConnection(integration.id!)}
                        title="Test Connection"
                      >
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="secondary"
                        onClick={() => handleToggleStatus(integration)}
                        title={integration.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <SettingsIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteIntegration(integration.id!)}
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

      {/* Add Integration Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Integration</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Integration Name"
              value={newIntegration.name}
              onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
              fullWidth
              required
              helperText="e.g., 'SAP ERP Production', 'Utility Provider API'"
            />
            <TextField
              label="Integration Type"
              value={newIntegration.type}
              onChange={(e) => setNewIntegration({ ...newIntegration, type: e.target.value })}
              fullWidth
              required
              select
            >
              <MenuItem value="ERP">ERP System</MenuItem>
              <MenuItem value="Utility">Utility Provider</MenuItem>
              <MenuItem value="RealTime">Real-Time Data Stream</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Connection String"
              value={newIntegration.connectionString}
              onChange={(e) => setNewIntegration({ ...newIntegration, connectionString: e.target.value })}
              fullWidth
              helperText="API endpoint, database connection string, or other connection details"
            />
            <TextField
              label="Configuration (JSON)"
              value={newIntegration.configuration}
              onChange={(e) => setNewIntegration({ ...newIntegration, configuration: e.target.value })}
              fullWidth
              multiline
              rows={4}
              helperText="Additional configuration as JSON (optional)"
            />
            <Alert severity="info">
              Integration setup wizard will guide you through configuration in a future update.
              For now, integrations can be added but will require manual configuration.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveIntegration} variant="contained" color="primary">
            Add Integration
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default IntegrationsPage;
