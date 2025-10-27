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
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { EmissionFactor } from '../../common/types';

const EmissionFactorsPage: React.FC = () => {
  const [emissionFactors, setEmissionFactors] = useState<EmissionFactor[]>([]);
  const [filteredFactors, setFilteredFactors] = useState<EmissionFactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  
  const [formData, setFormData] = useState<Partial<EmissionFactor>>({
    name: '',
    category: '',
    subcategory: '',
    source: 'Custom',
    version: '1.0',
    value: 0,
    unit: '',
    region: '',
    year: new Date().getFullYear(),
    description: '',
    isCustom: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterFactors();
  }, [emissionFactors, searchQuery, categoryFilter]);

  const loadData = async () => {
    try {
      const data = await window.electronAPI.listEmissionFactors();
      setEmissionFactors(data);
    } catch (error) {
      console.error('Failed to load emission factors:', error);
      showAlert('error', 'Failed to load emission factors');
    } finally {
      setLoading(false);
    }
  };

  const filterFactors = () => {
    let filtered = emissionFactors;

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(f => f.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.description?.toLowerCase().includes(query) ||
        f.subcategory.toLowerCase().includes(query)
      );
    }

    setFilteredFactors(filtered);
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleOpenDialog = () => {
    setFormData({
      name: '',
      category: '',
      subcategory: '',
      source: 'Custom',
      version: '1.0',
      value: 0,
      unit: '',
      region: '',
      year: new Date().getFullYear(),
      description: '',
      isCustom: true,
    });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSubmit = async () => {
    try {
      await window.electronAPI.createEmissionFactor(formData as EmissionFactor);
      showAlert('success', 'Custom emission factor created successfully');
      handleCloseDialog();
      loadData();
    } catch (error) {
      console.error('Failed to create emission factor:', error);
      showAlert('error', 'Failed to create emission factor');
    }
  };

  const categories = ['All', ...Array.from(new Set(emissionFactors.map(f => f.category)))];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Emission Factor Library
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Browse and manage emission factors from EPA, IPCC, DEFRA, and custom sources
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
        >
          Add Custom Factor
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2}>
          <TextField
            placeholder="Search emission factors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            select
            label="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Source</TableCell>
              <TableCell align="right">Value</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFactors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  <Typography color="text.secondary" sx={{ py: 4 }}>
                    {searchQuery || categoryFilter !== 'All'
                      ? 'No emission factors match your search criteria.'
                      : 'No emission factors available.'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredFactors.map((factor) => (
                <TableRow key={factor.id} hover>
                  <TableCell>
                    <Typography variant="body2">{factor.name}</Typography>
                    {factor.description && (
                      <Typography variant="caption" color="text.secondary">
                        {factor.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{factor.category}</TableCell>
                  <TableCell>{factor.subcategory}</TableCell>
                  <TableCell>{factor.source}</TableCell>
                  <TableCell align="right">{factor.value.toFixed(3)}</TableCell>
                  <TableCell>{factor.unit}</TableCell>
                  <TableCell>{factor.region || '-'}</TableCell>
                  <TableCell>{factor.year || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={factor.isCustom ? 'Custom' : 'Standard'}
                      size="small"
                      color={factor.isCustom ? 'primary' : 'default'}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Custom Factor Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add Custom Emission Factor</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              fullWidth
              required
            >
              <MenuItem value="Scope 1">Scope 1</MenuItem>
              <MenuItem value="Scope 2">Scope 2</MenuItem>
              <MenuItem value="Scope 3">Scope 3</MenuItem>
            </TextField>
            <TextField
              label="Subcategory"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              fullWidth
              required
              placeholder="e.g., Stationary Combustion, Mobile Combustion"
            />
            <TextField
              label="Source"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Version"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              fullWidth
              required
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
              placeholder="e.g., kg CO2e/MMBtu, kg CO2e/gallon"
            />
            <TextField
              label="Region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              fullWidth
            />
            <TextField
              label="Year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmissionFactorsPage;
