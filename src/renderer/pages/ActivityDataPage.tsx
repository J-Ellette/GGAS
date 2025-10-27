import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Chip,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActivityData } from '../../common/types';

const ActivityDataPage: React.FC = () => {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const [formData, setFormData] = useState<Partial<ActivityData>>({
    organizationUnit: '',
    timePeriod: '',
    emissionSource: '',
    activityType: '',
    value: 0,
    unit: '',
    dataSource: 'Manual Entry',
    dataQuality: 0.8,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await window.electronAPI.listActivityData();
      setActivityData(data);
    } catch (error) {
      console.error('Failed to load activity data:', error);
      showAlert('error', 'Failed to load activity data');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleOpenDialog = (data?: ActivityData) => {
    if (data) {
      setEditingId(data.id || null);
      setFormData(data);
    } else {
      setEditingId(null);
      setFormData({
        organizationUnit: '',
        timePeriod: '',
        emissionSource: '',
        activityType: '',
        value: 0,
        unit: '',
        dataSource: 'Manual Entry',
        dataQuality: 0.8,
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await window.electronAPI.updateActivityData(editingId, formData);
        showAlert('success', 'Activity data updated successfully');
      } else {
        await window.electronAPI.createActivityData(formData as ActivityData);
        showAlert('success', 'Activity data created successfully');
      }
      handleCloseDialog();
      loadData();
    } catch (error) {
      console.error('Failed to save activity data:', error);
      showAlert('error', 'Failed to save activity data');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this activity data?')) {
      try {
        await window.electronAPI.deleteActivityData(id);
        showAlert('success', 'Activity data deleted successfully');
        loadData();
      } catch (error) {
        console.error('Failed to delete activity data:', error);
        showAlert('error', 'Failed to delete activity data');
      }
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 0.8) return 'success';
    if (quality >= 0.6) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Activity Data Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage emissions-related activity data across your organization
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Activity Data
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Organization Unit</TableCell>
              <TableCell>Time Period</TableCell>
              <TableCell>Emission Source</TableCell>
              <TableCell>Activity Type</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Data Source</TableCell>
              <TableCell>Quality</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activityData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography color="text.secondary" sx={{ py: 4 }}>
                    No activity data available. Click "Add Activity Data" to get started.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              activityData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.organizationUnit}</TableCell>
                  <TableCell>{data.timePeriod}</TableCell>
                  <TableCell>{data.emissionSource}</TableCell>
                  <TableCell>{data.activityType}</TableCell>
                  <TableCell align="right">{data.value.toLocaleString()}</TableCell>
                  <TableCell>{data.unit}</TableCell>
                  <TableCell>{data.dataSource}</TableCell>
                  <TableCell>
                    <Chip
                      label={`${Math.round(data.dataQuality * 100)}%`}
                      size="small"
                      color={getQualityColor(data.dataQuality)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(data)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(data.id!)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingId ? 'Edit Activity Data' : 'Add Activity Data'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Organization Unit"
              value={formData.organizationUnit}
              onChange={(e) => setFormData({ ...formData, organizationUnit: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Time Period"
              value={formData.timePeriod}
              onChange={(e) => setFormData({ ...formData, timePeriod: e.target.value })}
              fullWidth
              required
              placeholder="e.g., 2024-Q1, 2024-01, 2024"
            />
            <TextField
              select
              label="Emission Source"
              value={formData.emissionSource}
              onChange={(e) => setFormData({ ...formData, emissionSource: e.target.value })}
              fullWidth
              required
            >
              <MenuItem value="Stationary Combustion">Stationary Combustion</MenuItem>
              <MenuItem value="Mobile Combustion">Mobile Combustion</MenuItem>
              <MenuItem value="Purchased Electricity">Purchased Electricity</MenuItem>
              <MenuItem value="Business Travel">Business Travel</MenuItem>
              <MenuItem value="Employee Commuting">Employee Commuting</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Activity Type"
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
              fullWidth
              required
              placeholder="e.g., Natural Gas, Gasoline, Electricity"
            />
            <TextField
              label="Value"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
              fullWidth
              required
            />
            <TextField
              label="Unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              fullWidth
              required
              placeholder="e.g., MMBtu, gallons, kWh, miles"
            />
            <TextField
              select
              label="Data Source"
              value={formData.dataSource}
              onChange={(e) => setFormData({ ...formData, dataSource: e.target.value })}
              fullWidth
            >
              <MenuItem value="Manual Entry">Manual Entry</MenuItem>
              <MenuItem value="Excel Import">Excel Import</MenuItem>
              <MenuItem value="Utility Bill">Utility Bill</MenuItem>
              <MenuItem value="Meter Reading">Meter Reading</MenuItem>
              <MenuItem value="Third Party">Third Party</MenuItem>
            </TextField>
            <TextField
              label="Data Quality Score"
              type="number"
              value={formData.dataQuality}
              onChange={(e) => setFormData({ ...formData, dataQuality: parseFloat(e.target.value) })}
              fullWidth
              inputProps={{ min: 0, max: 1, step: 0.1 }}
              helperText="Enter a value between 0 and 1 (0 = poor, 1 = excellent)"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActivityDataPage;
