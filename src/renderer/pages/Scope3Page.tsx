import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
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
  Switch,
  FormControlLabel,
  Chip,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Scope3Category, SupplierData } from '../../common/types';

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

const Scope3Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState<Scope3Category[]>([]);
  const [supplierData, setSupplierData] = useState<SupplierData[]>([]);
  const [openSupplierDialog, setOpenSupplierDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Scope3Category | null>(null);
  const [newSupplier, setNewSupplier] = useState<Partial<SupplierData>>({
    supplierName: '',
    supplierCategory: '',
    reportingYear: new Date().getFullYear(),
    dataQuality: 0.8,
    verificationStatus: 'unverified',
  });

  useEffect(() => {
    loadCategories();
    loadSupplierData();
  }, []);

  const loadCategories = async () => {
    try {
      const cats = await window.electronAPI.listScope3Categories();
      setCategories(cats);
    } catch (error) {
      console.error('Failed to load Scope 3 categories:', error);
    }
  };

  const loadSupplierData = async () => {
    try {
      const data = await window.electronAPI.listSupplierData();
      setSupplierData(data);
    } catch (error) {
      console.error('Failed to load supplier data:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleToggleCategory = async (category: Scope3Category) => {
    try {
      await window.electronAPI.updateScope3Category(category.id!, {
        isEnabled: !category.isEnabled,
      });
      loadCategories();
    } catch (error) {
      console.error('Failed to toggle category:', error);
    }
  };

  const handleAddSupplier = () => {
    setOpenSupplierDialog(true);
  };

  const handleSaveSupplier = async () => {
    try {
      await window.electronAPI.createSupplierData(newSupplier as SupplierData);
      setOpenSupplierDialog(false);
      setNewSupplier({
        supplierName: '',
        supplierCategory: '',
        reportingYear: new Date().getFullYear(),
        dataQuality: 0.8,
        verificationStatus: 'unverified',
      });
      loadSupplierData();
    } catch (error) {
      console.error('Failed to create supplier:', error);
    }
  };

  const handleDeleteSupplier = async (id: number) => {
    try {
      await window.electronAPI.deleteSupplierData(id);
      loadSupplierData();
    } catch (error) {
      console.error('Failed to delete supplier:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Scope 3: Value Chain Emissions
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage all 15 Scope 3 categories with guided calculation wizards and supplier data collection
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Categories Overview" />
          <Tab label="Supplier Data" />
          <Tab label="Calculation Wizard" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Enable or disable Scope 3 categories based on your organization's materiality assessment. 
          Categories can be enabled/disabled at any time.
        </Alert>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Chip label={`#${category.categoryNumber}`} color="primary" size="small" />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold">
                      {category.categoryName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {category.isEnabled ? (
                      <Chip icon={<CheckCircleIcon />} label="Enabled" color="success" size="small" />
                    ) : (
                      <Chip label="Disabled" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={category.isEnabled}
                          onChange={() => handleToggleCategory(category)}
                        />
                      }
                      label={category.isEnabled ? 'Enabled' : 'Disabled'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Supplier Emissions Data</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSupplier}
          >
            Add Supplier
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Supplier Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Emissions Data (tCO2e)</TableCell>
                <TableCell>Data Quality</TableCell>
                <TableCell>Reporting Year</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplierData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography color="text.secondary">
                      No supplier data available. Add your first supplier above.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                supplierData.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell>{supplier.supplierName}</TableCell>
                    <TableCell>{supplier.supplierCategory}</TableCell>
                    <TableCell>{supplier.emissionsData?.toFixed(2) || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={`${(supplier.dataQuality * 100).toFixed(0)}%`}
                        color={supplier.dataQuality > 0.7 ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{supplier.reportingYear}</TableCell>
                    <TableCell>
                      <Chip
                        label={supplier.verificationStatus}
                        color={supplier.verificationStatus === 'verified' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDeleteSupplier(supplier.id!)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Guided Calculation Wizard
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Follow the step-by-step wizard to calculate emissions for each Scope 3 category.
            </Typography>
            <Alert severity="info">
              Calculation wizard coming soon! This will guide you through:
              <ul>
                <li>Selecting the appropriate calculation methodology</li>
                <li>Inputting activity data or spend data</li>
                <li>Applying emission factors</li>
                <li>Reviewing and validating results</li>
              </ul>
            </Alert>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Add Supplier Dialog */}
      <Dialog open={openSupplierDialog} onClose={() => setOpenSupplierDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Supplier</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Supplier Name"
              value={newSupplier.supplierName}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplierName: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Supplier Category"
              value={newSupplier.supplierCategory}
              onChange={(e) => setNewSupplier({ ...newSupplier, supplierCategory: e.target.value })}
              fullWidth
              required
              select
            >
              {categories.filter(c => c.isEnabled).map((cat) => (
                <MenuItem key={cat.id} value={cat.categoryName}>
                  {cat.categoryNumber}. {cat.categoryName}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Emissions Data (tCO2e)"
              type="number"
              value={newSupplier.emissionsData || ''}
              onChange={(e) => setNewSupplier({ ...newSupplier, emissionsData: parseFloat(e.target.value) })}
              fullWidth
            />
            <TextField
              label="Data Quality"
              type="number"
              value={newSupplier.dataQuality}
              onChange={(e) => setNewSupplier({ ...newSupplier, dataQuality: parseFloat(e.target.value) })}
              fullWidth
              inputProps={{ min: 0, max: 1, step: 0.1 }}
              helperText="0 = Low, 1 = High"
            />
            <TextField
              label="Reporting Year"
              type="number"
              value={newSupplier.reportingYear}
              onChange={(e) => setNewSupplier({ ...newSupplier, reportingYear: parseInt(e.target.value) })}
              fullWidth
              required
            />
            <TextField
              label="Verification Status"
              value={newSupplier.verificationStatus}
              onChange={(e) => setNewSupplier({ ...newSupplier, verificationStatus: e.target.value })}
              fullWidth
              select
            >
              <MenuItem value="unverified">Unverified</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="verified">Verified</MenuItem>
            </TextField>
            <TextField
              label="Contact Information"
              value={newSupplier.contactInfo || ''}
              onChange={(e) => setNewSupplier({ ...newSupplier, contactInfo: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenSupplierDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveSupplier} variant="contained" color="primary">
            Add Supplier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Scope3Page;
