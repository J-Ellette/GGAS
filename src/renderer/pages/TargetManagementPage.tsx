import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tab,
  Tabs,
  Alert,
  LinearProgress,
  MenuItem,
} from '@mui/material';
import {
  EmojiEvents as TargetIcon,
  Add as AddIcon,
  Science as ScienceIcon,
  TrendingDown as ReductionIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as ValidIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function TargetManagementPage() {
  const [tabValue, setTabValue] = useState(0);
  const [carbonTargets, setCarbonTargets] = useState<any[]>([]);
  const [reductionProjects, setReductionProjects] = useState<any[]>([]);
  const [pricingScenarios, setPricingScenarios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Dialog states
  const [targetDialogOpen, setTargetDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [scenarioDialogOpen, setScenarioDialogOpen] = useState(false);
  
  // Form states
  const [targetForm, setTargetForm] = useState({
    targetName: '',
    targetType: 'absolute',
    baselineYear: new Date().getFullYear() - 1,
    baselineEmissions: 0,
    targetYear: new Date().getFullYear() + 5,
    targetReduction: 50,
    scope: '1+2',
    status: 'draft',
    sbtiValidated: false,
  });

  const [projectForm, setProjectForm] = useState({
    projectName: '',
    description: '',
    projectType: 'energy_efficiency',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    targetEmissionReduction: 0,
    estimatedCost: 0,
    status: 'planned',
  });

  const [scenarioForm, setScenarioForm] = useState({
    scenarioName: '',
    carbonPrice: 50,
    currency: 'USD',
    priceGrowthRate: 5,
    applicableScopes: '1+2+3',
  });

  useEffect(() => {
    loadData();
  }, [tabValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tabValue === 0) {
        const data = await window.electronAPI.listCarbonTargets();
        setCarbonTargets(data);
      } else if (tabValue === 1) {
        const data = await window.electronAPI.listReductionProjects({});
        setReductionProjects(data);
      } else if (tabValue === 2) {
        const data = await window.electronAPI.listCarbonPricingScenarios();
        setPricingScenarios(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTarget = async () => {
    try {
      await window.electronAPI.createCarbonTarget(targetForm);
      setTargetDialogOpen(false);
      loadData();
      setTargetForm({
        targetName: '',
        targetType: 'absolute',
        baselineYear: new Date().getFullYear() - 1,
        baselineEmissions: 0,
        targetYear: new Date().getFullYear() + 5,
        targetReduction: 50,
        scope: '1+2',
        status: 'draft',
        sbtiValidated: false,
      });
    } catch (error) {
      console.error('Error creating target:', error);
    }
  };

  const handleValidateSBTi = async (id: number) => {
    try {
      const result = await window.electronAPI.validateSBTi(id);
      alert(result.feedback);
      loadData();
    } catch (error) {
      console.error('Error validating SBTi:', error);
    }
  };

  const handleCreateProject = async () => {
    try {
      await window.electronAPI.createReductionProject(projectForm);
      setProjectDialogOpen(false);
      loadData();
      setProjectForm({
        projectName: '',
        description: '',
        projectType: 'energy_efficiency',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        targetEmissionReduction: 0,
        estimatedCost: 0,
        status: 'planned',
      });
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleCalculateROI = async (id: number) => {
    try {
      const roi = await window.electronAPI.calculateProjectROI(id);
      alert(`Project ROI: ${roi.toFixed(2)}%`);
      loadData();
    } catch (error) {
      console.error('Error calculating ROI:', error);
    }
  };

  const handleCreateScenario = async () => {
    try {
      await window.electronAPI.createCarbonPricingScenario(scenarioForm);
      setScenarioDialogOpen(false);
      loadData();
      setScenarioForm({
        scenarioName: '',
        carbonPrice: 50,
        currency: 'USD',
        priceGrowthRate: 5,
        applicableScopes: '1+2+3',
      });
    } catch (error) {
      console.error('Error creating scenario:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, any> = {
      draft: 'default',
      active: 'primary',
      achieved: 'success',
      planned: 'info',
      'in-progress': 'warning',
      completed: 'success',
      cancelled: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TargetIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <div>
            <Typography variant="h4" component="h1">
              Target Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Set science-based targets, track reduction projects, and analyze carbon pricing
            </Typography>
          </div>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Targets
              </Typography>
              <Typography variant="h4">
                {carbonTargets.filter(t => t.status === 'active').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {carbonTargets.filter(t => t.sbtiValidated).length} SBTi validated
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Projects
              </Typography>
              <Typography variant="h4">
                {reductionProjects.filter(p => p.status === 'in-progress').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {reductionProjects.filter(p => p.status === 'planned').length} planned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Target Reduction
              </Typography>
              <Typography variant="h4">
                {reductionProjects.reduce((sum, p) => sum + (p.targetEmissionReduction || 0), 0).toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                tCO2e planned
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pricing Scenarios
              </Typography>
              <Typography variant="h4">
                {pricingScenarios.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Carbon pricing models
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Carbon Targets" />
          <Tab label="Reduction Projects" />
          <Tab label="Carbon Pricing" />
        </Tabs>
      </Paper>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Carbon Targets Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Alert severity="info" sx={{ flex: 1, mr: 2 }}>
            Set science-based carbon reduction targets aligned with climate science and SBTi standards.
          </Alert>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setTargetDialogOpen(true)}
          >
            Add Target
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Target Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Baseline</TableCell>
                <TableCell>Target Year</TableCell>
                <TableCell>Reduction</TableCell>
                <TableCell>Scope</TableCell>
                <TableCell>SBTi</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {carbonTargets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No carbon targets set. Create your first target to start tracking progress.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                carbonTargets.map((target) => (
                  <TableRow key={target.id}>
                    <TableCell>{target.targetName}</TableCell>
                    <TableCell>
                      <Chip label={target.targetType} size="small" />
                    </TableCell>
                    <TableCell>
                      {target.baselineYear}<br />
                      <Typography variant="caption">
                        {target.baselineEmissions.toFixed(1)} tCO2e
                      </Typography>
                    </TableCell>
                    <TableCell>{target.targetYear}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {target.targetReduction}%
                      </Typography>
                    </TableCell>
                    <TableCell>{target.scope}</TableCell>
                    <TableCell>
                      {target.sbtiValidated ? (
                        <Chip
                          icon={<ValidIcon />}
                          label="Validated"
                          color="success"
                          size="small"
                        />
                      ) : (
                        <Button
                          size="small"
                          startIcon={<ScienceIcon />}
                          onClick={() => handleValidateSBTi(target.id)}
                        >
                          Validate
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={target.status}
                        color={getStatusColor(target.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Reduction Projects Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Alert severity="info" sx={{ flex: 1, mr: 2 }}>
            Track carbon reduction projects with milestones, costs, and ROI analysis.
          </Alert>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setProjectDialogOpen(true)}
          >
            Add Project
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Timeline</TableCell>
                <TableCell>Target Reduction</TableCell>
                <TableCell>Estimated Cost</TableCell>
                <TableCell>ROI</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reductionProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No reduction projects created. Add your first project to start tracking.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reductionProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {project.projectName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {project.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={project.projectType} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(project.startDate).toLocaleDateString()} -<br />
                        {new Date(project.endDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {project.targetEmissionReduction.toFixed(1)} tCO2e
                      </Typography>
                    </TableCell>
                    <TableCell>
                      ${project.estimatedCost.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {project.roi !== null ? (
                        <Chip
                          label={`${project.roi.toFixed(1)}%`}
                          color={project.roi > 0 ? 'success' : 'error'}
                          size="small"
                        />
                      ) : (
                        <Button
                          size="small"
                          startIcon={<MoneyIcon />}
                          onClick={() => handleCalculateROI(project.id)}
                        >
                          Calculate
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button size="small">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Carbon Pricing Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Alert severity="info" sx={{ flex: 1, mr: 2 }}>
            Model different carbon pricing scenarios to understand financial implications.
          </Alert>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setScenarioDialogOpen(true)}
          >
            Add Scenario
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scenario Name</TableCell>
                <TableCell>Carbon Price</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Growth Rate</TableCell>
                <TableCell>Applicable Scopes</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricingScenarios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No pricing scenarios created. Add scenarios to model carbon pricing impacts.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pricingScenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell>{scenario.scenarioName}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {scenario.carbonPrice} {scenario.currency}/tCO2e
                      </Typography>
                    </TableCell>
                    <TableCell>{scenario.currency}</TableCell>
                    <TableCell>{scenario.priceGrowthRate}% annually</TableCell>
                    <TableCell>{scenario.applicableScopes}</TableCell>
                    <TableCell>
                      <Button size="small">Simulate</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Create Target Dialog */}
      <Dialog open={targetDialogOpen} onClose={() => setTargetDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Carbon Target</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Target Name"
                value={targetForm.targetName}
                onChange={(e) => setTargetForm({ ...targetForm, targetName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Target Type"
                value={targetForm.targetType}
                onChange={(e) => setTargetForm({ ...targetForm, targetType: e.target.value })}
              >
                <MenuItem value="absolute">Absolute</MenuItem>
                <MenuItem value="intensity">Intensity</MenuItem>
                <MenuItem value="sbti">Science-Based Target</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Scope"
                value={targetForm.scope}
                onChange={(e) => setTargetForm({ ...targetForm, scope: e.target.value })}
              >
                <MenuItem value="1">Scope 1</MenuItem>
                <MenuItem value="2">Scope 2</MenuItem>
                <MenuItem value="1+2">Scope 1+2</MenuItem>
                <MenuItem value="1+2+3">Scope 1+2+3</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Baseline Year"
                value={targetForm.baselineYear}
                onChange={(e) => setTargetForm({ ...targetForm, baselineYear: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Baseline Emissions (tCO2e)"
                value={targetForm.baselineEmissions}
                onChange={(e) => setTargetForm({ ...targetForm, baselineEmissions: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Target Year"
                value={targetForm.targetYear}
                onChange={(e) => setTargetForm({ ...targetForm, targetYear: parseInt(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Target Reduction (%)"
                value={targetForm.targetReduction}
                onChange={(e) => setTargetForm({ ...targetForm, targetReduction: parseFloat(e.target.value) })}
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTargetDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateTarget} variant="contained">
            Create Target
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Project Dialog */}
      <Dialog open={projectDialogOpen} onClose={() => setProjectDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Reduction Project</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Name"
                value={projectForm.projectName}
                onChange={(e) => setProjectForm({ ...projectForm, projectName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Project Type"
                value={projectForm.projectType}
                onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}
              >
                <MenuItem value="energy_efficiency">Energy Efficiency</MenuItem>
                <MenuItem value="renewable_energy">Renewable Energy</MenuItem>
                <MenuItem value="process_optimization">Process Optimization</MenuItem>
                <MenuItem value="carbon_offset">Carbon Offset</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Target Emission Reduction (tCO2e)"
                value={projectForm.targetEmissionReduction}
                onChange={(e) => setProjectForm({ ...projectForm, targetEmissionReduction: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={projectForm.startDate}
                onChange={(e) => setProjectForm({ ...projectForm, startDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={projectForm.endDate}
                onChange={(e) => setProjectForm({ ...projectForm, endDate: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Estimated Cost ($)"
                value={projectForm.estimatedCost}
                onChange={(e) => setProjectForm({ ...projectForm, estimatedCost: parseFloat(e.target.value) })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateProject} variant="contained">
            Create Project
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Pricing Scenario Dialog */}
      <Dialog open={scenarioDialogOpen} onClose={() => setScenarioDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Carbon Pricing Scenario</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Scenario Name"
                value={scenarioForm.scenarioName}
                onChange={(e) => setScenarioForm({ ...scenarioForm, scenarioName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Carbon Price"
                value={scenarioForm.carbonPrice}
                onChange={(e) => setScenarioForm({ ...scenarioForm, carbonPrice: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Currency"
                value={scenarioForm.currency}
                onChange={(e) => setScenarioForm({ ...scenarioForm, currency: e.target.value })}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Annual Growth Rate (%)"
                value={scenarioForm.priceGrowthRate}
                onChange={(e) => setScenarioForm({ ...scenarioForm, priceGrowthRate: parseFloat(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Applicable Scopes"
                value={scenarioForm.applicableScopes}
                onChange={(e) => setScenarioForm({ ...scenarioForm, applicableScopes: e.target.value })}
              >
                <MenuItem value="1">Scope 1</MenuItem>
                <MenuItem value="2">Scope 2</MenuItem>
                <MenuItem value="1+2">Scope 1+2</MenuItem>
                <MenuItem value="1+2+3">Scope 1+2+3</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScenarioDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateScenario} variant="contained">
            Create Scenario
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
