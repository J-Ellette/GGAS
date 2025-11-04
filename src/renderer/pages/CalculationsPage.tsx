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
  MenuItem,
  Alert,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
} from '@mui/material';
import CalculateIcon from '@mui/icons-material/Calculate';
import SearchIcon from '@mui/icons-material/Search';
import { ActivityData, EmissionFactor } from '../../common/types';

const CalculationsPage: React.FC = () => {
  const [calculations, setCalculations] = useState<any[]>([]);
  const [filteredCalculations, setFilteredCalculations] = useState<any[]>([]);
  const [activityDataList, setActivityDataList] = useState<ActivityData[]>([]);
  const [emissionFactors, setEmissionFactors] = useState<EmissionFactor[]>([]);
  const [filteredFactors, setFilteredFactors] = useState<EmissionFactor[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [scopeFilter, setScopeFilter] = useState('All');
  
  const [calculationForm, setCalculationForm] = useState({
    activityDataId: 0,
    emissionFactorId: 0,
    scope: 1,
    methodology: 'activity-based',
  });

  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(null);
  const [selectedFactor, setSelectedFactor] = useState<EmissionFactor | null>(null);
  const [calculationResult, setCalculationResult] = useState<any>(null);

  const steps = ['Select Activity Data', 'Choose Emission Factor', 'Review & Calculate'];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterCalculations();
  }, [calculations, searchQuery, scopeFilter]);

  const filterCalculations = () => {
    let filtered = calculations;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(calc =>
        calc.organizationUnit?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.emissionSource?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.timePeriod?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.methodology?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply scope filter
    if (scopeFilter !== 'All') {
      filtered = filtered.filter(calc => calc.scope === parseInt(scopeFilter));
    }

    setFilteredCalculations(filtered);
  };

  const loadData = async () => {
    try {
      const [calcs, activities, factors] = await Promise.all([
        window.electronAPI.listCalculations(),
        window.electronAPI.listActivityData(),
        window.electronAPI.listEmissionFactors(),
      ]);
      setCalculations(calcs);
      setActivityDataList(activities);
      setEmissionFactors(factors);
    } catch (error) {
      console.error('Failed to load data:', error);
      showAlert('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleOpenDialog = () => {
    setActiveStep(0);
    setCalculationForm({
      activityDataId: 0,
      emissionFactorId: 0,
      scope: 1,
      methodology: 'activity-based',
    });
    setSelectedActivity(null);
    setSelectedFactor(null);
    setCalculationResult(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSelectActivity = (activityId: number) => {
    const activity = activityDataList.find(a => a.id === activityId);
    if (activity) {
      setSelectedActivity(activity);
      setCalculationForm({ ...calculationForm, activityDataId: activityId });
      
      // Filter emission factors based on activity type
      const filtered = emissionFactors.filter(f => 
        f.name.toLowerCase().includes(activity.activityType.toLowerCase()) ||
        f.subcategory.toLowerCase().includes(activity.emissionSource.toLowerCase())
      );
      setFilteredFactors(filtered.length > 0 ? filtered : emissionFactors);
      
      setActiveStep(1);
    }
  };

  const handleSelectFactor = (factorId: number) => {
    const factor = emissionFactors.find(f => f.id === factorId);
    if (factor) {
      setSelectedFactor(factor);
      setCalculationForm({ ...calculationForm, emissionFactorId: factorId });
      
      // Determine scope based on factor category
      const scope = factor.category.includes('Scope 1') ? 1 : 
                   factor.category.includes('Scope 2') ? 2 : 3;
      setCalculationForm({ ...calculationForm, emissionFactorId: factorId, scope });
      
      setActiveStep(2);
    }
  };

  const handleCalculate = async () => {
    try {
      const result = await window.electronAPI.calculateEmissions(calculationForm);
      setCalculationResult(result);
      showAlert('success', 'Calculation completed successfully');
      loadData();
    } catch (error) {
      console.error('Failed to calculate emissions:', error);
      showAlert('error', 'Failed to calculate emissions');
    }
  };

  const handleFinish = () => {
    handleCloseDialog();
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Emissions Calculations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Calculate GHG emissions from activity data using emission factors
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<CalculateIcon />}
          onClick={handleOpenDialog}
          disabled={activityDataList.length === 0}
        >
          New Calculation
        </Button>
      </Box>

      {alert && (
        <Alert severity={alert.type} sx={{ mb: 2 }} onClose={() => setAlert(null)}>
          {alert.message}
        </Alert>
      )}

      {activityDataList.length === 0 && (
        <Alert severity="info" sx={{ mb: 2 }}>
          You need to add activity data before you can perform calculations.
        </Alert>
      )}

      {/* Search and Filter Bar */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Search by organization, source, period, or methodology..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              fullWidth
              label="Filter by Scope"
              value={scopeFilter}
              onChange={(e) => setScopeFilter(e.target.value)}
            >
              <MenuItem value="All">All Scopes</MenuItem>
              <MenuItem value="1">Scope 1</MenuItem>
              <MenuItem value="2">Scope 2</MenuItem>
              <MenuItem value="3">Scope 3</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          Showing {filteredCalculations.length} of {calculations.length} calculations
        </Typography>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Organization Unit</TableCell>
              <TableCell>Time Period</TableCell>
              <TableCell>Emission Source</TableCell>
              <TableCell>Scope</TableCell>
              <TableCell>Methodology</TableCell>
              <TableCell align="right">Result</TableCell>
              <TableCell>Uncertainty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCalculations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography color="text.secondary" sx={{ py: 4 }}>
                    {searchQuery || scopeFilter !== 'All'
                      ? 'No calculations match your search criteria.'
                      : calculations.length === 0 
                        ? 'No calculations yet. Click "New Calculation" to get started.'
                        : 'No calculations available.'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredCalculations.map((calc) => (
                <TableRow key={calc.id} hover>
                  <TableCell>{new Date(calc.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>{calc.organizationUnit}</TableCell>
                  <TableCell>{calc.timePeriod}</TableCell>
                  <TableCell>{calc.emissionSource}</TableCell>
                  <TableCell>Scope {calc.scope}</TableCell>
                  <TableCell>{calc.methodology}</TableCell>
                  <TableCell align="right">
                    <strong>{Math.round(calc.result).toLocaleString()}</strong> kg CO2e
                  </TableCell>
                  <TableCell>±{((calc.uncertainty || 0) * 100).toFixed(0)}%</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Calculation Wizard Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Calculate Emissions</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Step 1: Select Activity Data */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Select Activity Data
                </Typography>
                <Grid container spacing={2}>
                  {activityDataList.map((activity) => (
                    <Grid item xs={12} key={activity.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedActivity?.id === activity.id ? 2 : 1,
                          borderColor: selectedActivity?.id === activity.id ? 'primary.main' : 'divider',
                        }}
                        onClick={() => handleSelectActivity(activity.id!)}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={3}>
                              <Typography variant="body2" color="text.secondary">
                                Organization Unit
                              </Typography>
                              <Typography variant="body1">{activity.organizationUnit}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="body2" color="text.secondary">
                                Time Period
                              </Typography>
                              <Typography variant="body1">{activity.timePeriod}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="body2" color="text.secondary">
                                Activity Type
                              </Typography>
                              <Typography variant="body1">{activity.activityType}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography variant="body2" color="text.secondary">
                                Value
                              </Typography>
                              <Typography variant="body1">
                                {activity.value} {activity.unit}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Step 2: Choose Emission Factor */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Choose Emission Factor
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Suggested factors based on your activity data
                </Typography>
                <Grid container spacing={2}>
                  {filteredFactors.map((factor) => (
                    <Grid item xs={12} key={factor.id}>
                      <Card
                        sx={{
                          cursor: 'pointer',
                          border: selectedFactor?.id === factor.id ? 2 : 1,
                          borderColor: selectedFactor?.id === factor.id ? 'primary.main' : 'divider',
                        }}
                        onClick={() => handleSelectFactor(factor.id!)}
                      >
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body1" fontWeight="bold">
                                {factor.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {factor.description}
                              </Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="body2" color="text.secondary">
                                Value
                              </Typography>
                              <Typography variant="body1">{factor.value}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="body2" color="text.secondary">
                                Unit
                              </Typography>
                              <Typography variant="body1">{factor.unit}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography variant="body2" color="text.secondary">
                                Source
                              </Typography>
                              <Typography variant="body1">{factor.source}</Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {/* Step 3: Review & Calculate */}
            {activeStep === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Review & Calculate
                </Typography>
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Activity Data
                      </Typography>
                      {selectedActivity && (
                        <>
                          <Typography variant="body2">
                            <strong>Organization:</strong> {selectedActivity.organizationUnit}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Period:</strong> {selectedActivity.timePeriod}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Type:</strong> {selectedActivity.activityType}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Value:</strong> {selectedActivity.value} {selectedActivity.unit}
                          </Typography>
                        </>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Emission Factor
                      </Typography>
                      {selectedFactor && (
                        <>
                          <Typography variant="body2">
                            <strong>Name:</strong> {selectedFactor.name}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Value:</strong> {selectedFactor.value} {selectedFactor.unit}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Source:</strong> {selectedFactor.source}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Version:</strong> {selectedFactor.version}
                          </Typography>
                        </>
                      )}
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Calculation Settings
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            select
                            label="Scope"
                            value={calculationForm.scope}
                            onChange={(e) => setCalculationForm({ ...calculationForm, scope: parseInt(e.target.value) })}
                            fullWidth
                          >
                            <MenuItem value={1}>Scope 1 - Direct Emissions</MenuItem>
                            <MenuItem value={2}>Scope 2 - Indirect Emissions</MenuItem>
                            <MenuItem value={3}>Scope 3 - Value Chain</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            select
                            label="Methodology"
                            value={calculationForm.methodology}
                            onChange={(e) => setCalculationForm({ ...calculationForm, methodology: e.target.value })}
                            fullWidth
                          >
                            <MenuItem value="activity-based">Activity-Based</MenuItem>
                            <MenuItem value="spend-based">Spend-Based</MenuItem>
                            <MenuItem value="hybrid">Hybrid</MenuItem>
                          </TextField>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>

                  {calculationResult && (
                    <Grid item xs={12}>
                      <Alert severity="success">
                        <Typography variant="h6" gutterBottom>
                          Calculation Result
                        </Typography>
                        <Typography variant="h4">
                          {Math.round(calculationResult.result).toLocaleString()} kg CO2e
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Uncertainty: ±{((calculationResult.uncertainty || 0) * 100).toFixed(0)}%
                        </Typography>
                      </Alert>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {activeStep > 0 && !calculationResult && (
            <Button onClick={() => setActiveStep(activeStep - 1)}>Back</Button>
          )}
          {activeStep === 2 && !calculationResult && (
            <Button onClick={handleCalculate} variant="contained">
              Calculate
            </Button>
          )}
          {calculationResult && (
            <Button onClick={handleFinish} variant="contained">
              Finish
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalculationsPage;
