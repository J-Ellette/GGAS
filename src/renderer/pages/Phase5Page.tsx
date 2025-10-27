import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  AccountBalance as AccountBalanceIcon,
  Warning as WarningIcon,
  Science as ScienceIcon,
  Business as BusinessIcon,
  Add as AddIcon,
  PlayArrow as PlayArrowIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Phase5Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // Phase 5.1: Forecasting State
  const [forecasts, setForecasts] = useState<any[]>([]);
  const [forecastFactors, setForecastFactors] = useState<any[]>([]);
  const [forecastDialog, setForecastDialog] = useState(false);
  const [newForecast, setNewForecast] = useState({
    forecastName: '',
    targetPeriod: new Date().getFullYear().toString(),
    baselineEmissions: 1000,
    weatherFactor: 0,
    economicFactor: 0,
    operationalFactor: 0
  });

  // Phase 5.2: Budget State
  const [budgets, setBudgets] = useState<any[]>([]);
  const [budgetAllocations, setBudgetAllocations] = useState<any[]>([]);
  const [budgetVariances, setBudgetVariances] = useState<any[]>([]);
  const [budgetDialog, setBudgetDialog] = useState(false);
  const [newBudget, setNewBudget] = useState({
    budgetName: '',
    fiscalYear: new Date().getFullYear().toString(),
    totalBudget: 10000,
    budgetUnit: 'tCO2e'
  });
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);

  // Phase 5.3: Alerts State
  const [alerts, setAlerts] = useState<any[]>([]);
  const [warningTriggers, setWarningTriggers] = useState<any[]>([]);
  const [actionPlans, setActionPlans] = useState<any[]>([]);
  const [alertDialog, setAlertDialog] = useState(false);
  const [triggerDialog, setTriggerDialog] = useState(false);
  const [planDialog, setPlanDialog] = useState(false);

  // Phase 5.4: Scenarios State
  const [scenarios, setScenarios] = useState<any[]>([]);
  const [sensitivityAnalyses, setSensitivityAnalyses] = useState<any[]>([]);
  const [scenarioDialog, setScenarioDialog] = useState(false);
  const [monteCarloParams, setMonteCarloParams] = useState({
    scenarioName: '',
    baseValue: 1000,
    volatility: 0.2,
    iterations: 1000
  });

  // Phase 5.5: Enterprise State
  const [enterpriseForecasts, setEnterpriseForecasts] = useState<any[]>([]);
  const [executiveDashboard, setExecutiveDashboard] = useState<any>(null);
  const [modelMetrics, setModelMetrics] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [tabValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (tabValue) {
        case 0: // Forecasting
          const fcs = await window.electronAPI.listEmissionForecasts();
          setForecasts(fcs || []);
          const factors = await window.electronAPI.listForecastingFactors();
          setForecastFactors(factors || []);
          break;
        case 1: // Budget Management
          const buds = await window.electronAPI.listCarbonBudgets();
          setBudgets(buds || []);
          if (buds && buds.length > 0) {
            const allocs = await window.electronAPI.listBudgetAllocations(buds[0].id);
            setBudgetAllocations(allocs || []);
            const vars = await window.electronAPI.listBudgetVariances(buds[0].id);
            setBudgetVariances(vars || []);
          }
          break;
        case 2: // Early Warning
          const alts = await window.electronAPI.listPredictiveAlerts({ status: 'active' });
          setAlerts(alts || []);
          const trigs = await window.electronAPI.listEarlyWarningTriggers(true);
          setWarningTriggers(trigs || []);
          const plans = await window.electronAPI.listActionPlans();
          setActionPlans(plans || []);
          break;
        case 3: // Scenario Planning
          const sims = await window.electronAPI.listScenarioSimulations();
          setScenarios(sims || []);
          const sens = await window.electronAPI.listSensitivityAnalyses();
          setSensitivityAnalyses(sens || []);
          break;
        case 4: // Enterprise
          const entFcs = await window.electronAPI.listEnterpriseForecasts();
          setEnterpriseForecasts(entFcs || []);
          const dash = await window.electronAPI.generateExecutiveDashboard({});
          setExecutiveDashboard(dash || null);
          const metrics = await window.electronAPI.getModelPerformanceMetrics();
          setModelMetrics(metrics || []);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunMultiFactorForecast = async () => {
    try {
      const result = await window.electronAPI.runMultiFactorForecast(newForecast);
      alert(`Forecast created successfully!\nPredicted Emissions: ${result.predictedEmissions.toFixed(2)} tCO2e\nConfidence: ${(result.confidenceLevel * 100).toFixed(0)}%`);
      setForecastDialog(false);
      setNewForecast({
        forecastName: '',
        targetPeriod: new Date().getFullYear().toString(),
        baselineEmissions: 1000,
        weatherFactor: 0,
        economicFactor: 0,
        operationalFactor: 0
      });
      loadData();
    } catch (error) {
      console.error('Error running forecast:', error);
    }
  };

  const handleTrainLSTM = async () => {
    try {
      const result = await window.electronAPI.trainLSTMModel({ modelName: 'LSTM Forecast Model' });
      alert(`LSTM Model Trained!\nAccuracy: ${(result.accuracy * 100).toFixed(2)}%\nMAE: ${result.mae.toFixed(2)}\nTraining Duration: ${result.trainingDuration}s`);
    } catch (error) {
      console.error('Error training LSTM:', error);
    }
  };

  const handleCreateBudget = async () => {
    try {
      await window.electronAPI.createCarbonBudget(newBudget);
      setBudgetDialog(false);
      setNewBudget({
        budgetName: '',
        fiscalYear: new Date().getFullYear().toString(),
        totalBudget: 10000,
        budgetUnit: 'tCO2e'
      });
      loadData();
    } catch (error) {
      console.error('Error creating budget:', error);
    }
  };

  const handleOptimizeBudget = async (budgetId: number) => {
    try {
      const result = await window.electronAPI.optimizeBudgetAllocation(budgetId);
      alert(`Budget Optimization Complete!\nTotal Potential Savings: ${result.totalSavings.toFixed(2)} tCO2e\n${result.optimizedAllocations.length} allocations reviewed`);
      loadData();
    } catch (error) {
      console.error('Error optimizing budget:', error);
    }
  };

  const handleEvaluateTriggers = async () => {
    try {
      const result = await window.electronAPI.evaluateWarningTriggers();
      alert(`Trigger Evaluation Complete!\nEvaluated: ${result.evaluated} triggers\nTriggered: ${result.triggered.length} alerts`);
      loadData();
    } catch (error) {
      console.error('Error evaluating triggers:', error);
    }
  };

  const handleAcknowledgeAlert = async (id: number) => {
    try {
      await window.electronAPI.acknowledgeAlert(id);
      loadData();
    } catch (error) {
      console.error('Error acknowledging alert:', error);
    }
  };

  const handleResolveAlert = async (id: number) => {
    try {
      await window.electronAPI.resolveAlert(id);
      loadData();
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  const handleRunMonteCarlo = async () => {
    try {
      const result = await window.electronAPI.runMonteCarloSimulation(monteCarloParams);
      const results = result.results;
      alert(`Monte Carlo Simulation Complete!\n` +
        `Iterations: ${result.iterations}\n` +
        `Mean: ${results.mean.toFixed(2)}\n` +
        `Std Dev: ${results.stdDev.toFixed(2)}\n` +
        `Risk Level: ${result.riskLevel.toUpperCase()}\n` +
        `P5: ${results.p5.toFixed(2)} | P95: ${results.p95.toFixed(2)}`
      );
      setScenarioDialog(false);
      loadData();
    } catch (error) {
      console.error('Error running Monte Carlo:', error);
    }
  };

  const handleRunSensitivityAnalysis = async () => {
    try {
      const result = await window.electronAPI.runSensitivityAnalysis({
        analysisName: `Sensitivity Analysis ${new Date().toISOString()}`,
        baselineValue: 1000
      });
      const criticalFactors = result.criticalFactors || [];
      alert(`Sensitivity Analysis Complete!\n` +
        `Critical Factors: ${criticalFactors.join(', ') || 'None'}\n` +
        `Recommendation: ${result.recommendedFocus}`
      );
      loadData();
    } catch (error) {
      console.error('Error running sensitivity analysis:', error);
    }
  };

  const handleActivateActionPlan = async (id: number) => {
    try {
      const result = await window.electronAPI.activateActionPlan(id);
      alert(result.message);
      loadData();
    } catch (error) {
      console.error('Error activating action plan:', error);
    }
  };

  // Prepare chart data
  const forecastChartData = forecasts.slice(0, 5).map(f => ({
    name: f.forecastName?.substring(0, 20) || 'Forecast',
    baseline: f.baselineEmissions || 0,
    predicted: f.predictedEmissions || 0,
    lower: f.uncertaintyLower || 0,
    upper: f.uncertaintyUpper || 0,
  }));

  const budgetChartData = budgets.slice(0, 5).map(b => ({
    name: b.budgetName?.substring(0, 15) || 'Budget',
    total: b.totalBudget || 0,
    consumed: b.consumedBudget || 0,
    remaining: b.remainingBudget || 0,
  }));

  const alertsBySeverity = alerts.reduce((acc: any, alert: any) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1;
    return acc;
  }, {});

  const alertsPieData = Object.keys(alertsBySeverity).map(severity => ({
    name: severity,
    value: alertsBySeverity[severity],
  }));

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Predictive Carbon Intelligence
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Advanced forecasting, carbon budget management, early warning systems, scenario planning, and enterprise features
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab icon={<TrendingUpIcon />} label="Forecasting" />
          <Tab icon={<AccountBalanceIcon />} label="Budget Management" />
          <Tab icon={<WarningIcon />} label="Early Warning" />
          <Tab icon={<ScienceIcon />} label="Scenario Planning" />
          <Tab icon={<BusinessIcon />} label="Enterprise" />
        </Tabs>
      </Box>

      {loading && <LinearProgress />}

      {/* Phase 5.1: Advanced Forecasting Engine */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Emission Forecasts</Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      startIcon={<PlayArrowIcon />}
                      onClick={handleTrainLSTM}
                      sx={{ mr: 1 }}
                    >
                      Train LSTM Model
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setForecastDialog(true)}
                    >
                      Run Multi-Factor Forecast
                    </Button>
                  </Box>
                </Box>

                {forecastChartData.length > 0 && (
                  <Box sx={{ height: 300, mb: 2 }}>
                    <ResponsiveContainer>
                      <BarChart data={forecastChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Bar dataKey="baseline" fill="#8884d8" name="Baseline" />
                        <Bar dataKey="predicted" fill="#82ca9d" name="Predicted" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                )}

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Forecast Name</TableCell>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">Baseline</TableCell>
                        <TableCell align="right">Predicted</TableCell>
                        <TableCell align="right">Confidence</TableCell>
                        <TableCell>Model Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {forecasts.slice(0, 10).map((forecast) => (
                        <TableRow key={forecast.id}>
                          <TableCell>{forecast.forecastName}</TableCell>
                          <TableCell>{forecast.targetPeriod}</TableCell>
                          <TableCell align="right">{forecast.baselineEmissions?.toFixed(2)}</TableCell>
                          <TableCell align="right">{forecast.predictedEmissions?.toFixed(2)}</TableCell>
                          <TableCell align="right">{((forecast.confidenceLevel || 0) * 100).toFixed(0)}%</TableCell>
                          <TableCell>
                            <Chip label={forecast.modelType} size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                      {forecasts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Typography variant="body2" color="text.secondary">
                              No forecasts yet. Click "Run Multi-Factor Forecast" to create one.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Forecasting Factors</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {forecastFactors.length} factors being tracked
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  Multi-factor modeling includes weather patterns, economic indicators, operational variables, and supply chain factors.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Machine Learning</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  LSTM networks for time series forecasting
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2">
                  Advanced models with ensemble learning, uncertainty quantification, and continuous retraining capabilities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 5.2: Carbon Budget Management */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Carbon Budgets</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setBudgetDialog(true)}
                  >
                    Create Budget
                  </Button>
                </Box>

                {budgetChartData.length > 0 && (
                  <Box sx={{ height: 300, mb: 2 }}>
                    <ResponsiveContainer>
                      <BarChart data={budgetChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#8884d8" name="Total Budget" />
                        <Bar dataKey="consumed" fill="#ff8042" name="Consumed" />
                        <Bar dataKey="remaining" fill="#00C49F" name="Remaining" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                )}

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Budget Name</TableCell>
                        <TableCell>Fiscal Year</TableCell>
                        <TableCell align="right">Total Budget</TableCell>
                        <TableCell align="right">Consumed</TableCell>
                        <TableCell align="right">Remaining</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {budgets.map((budget) => {
                        const utilization = budget.totalBudget > 0 
                          ? ((budget.consumedBudget / budget.totalBudget) * 100) 
                          : 0;
                        return (
                          <TableRow key={budget.id}>
                            <TableCell>{budget.budgetName}</TableCell>
                            <TableCell>{budget.fiscalYear}</TableCell>
                            <TableCell align="right">{budget.totalBudget?.toFixed(2)}</TableCell>
                            <TableCell align="right">{budget.consumedBudget?.toFixed(2)}</TableCell>
                            <TableCell align="right">{budget.remainingBudget?.toFixed(2)}</TableCell>
                            <TableCell>
                              <Chip 
                                label={`${utilization.toFixed(0)}% Used`} 
                                color={utilization > 80 ? 'error' : utilization > 60 ? 'warning' : 'success'} 
                                size="small" 
                              />
                            </TableCell>
                            <TableCell>
                              <Tooltip title="Optimize Allocation">
                                <IconButton size="small" onClick={() => handleOptimizeBudget(budget.id)}>
                                  <RefreshIcon />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {budgets.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            <Typography variant="body2" color="text.secondary">
                              No budgets yet. Click "Create Budget" to get started.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Budget Allocations</Typography>
                <Typography variant="h3">{budgetAllocations.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Active allocations across business units
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Variance Analysis</Typography>
                <Typography variant="h3">{budgetVariances.length}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Budget vs. actual analyses performed
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 5.3: Early Warning System */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Active Alerts</Typography>
                <Typography variant="h3">{alerts.length}</Typography>
                <Typography variant="body2" color="text.secondary">Predictive alerts requiring attention</Typography>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleEvaluateTriggers}
                  startIcon={<RefreshIcon />}
                >
                  Evaluate Triggers
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Warning Triggers</Typography>
                <Typography variant="h3">{warningTriggers.length}</Typography>
                <Typography variant="body2" color="text.secondary">Active monitoring triggers</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Action Plans</Typography>
                <Typography variant="h3">{actionPlans.length}</Typography>
                <Typography variant="body2" color="text.secondary">Predefined response plans</Typography>
              </CardContent>
            </Card>
          </Grid>

          {alertsPieData.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Alerts by Severity</Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={alertsPieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {alertsPieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}

          <Grid item xs={12} md={alertsPieData.length > 0 ? 6 : 12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Recent Alerts</Typography>
                <TableContainer sx={{ maxHeight: 300 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Alert</TableCell>
                        <TableCell>Severity</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {alerts.slice(0, 5).map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>{alert.alertName}</TableCell>
                          <TableCell>
                            <Chip 
                              label={alert.severity} 
                              color={
                                alert.severity === 'critical' ? 'error' : 
                                alert.severity === 'high' ? 'warning' : 
                                'info'
                              } 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            {alert.status === 'active' && (
                              <>
                                <Tooltip title="Acknowledge">
                                  <IconButton size="small" onClick={() => handleAcknowledgeAlert(alert.id)}>
                                    <CheckCircleIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Resolve">
                                  <IconButton size="small" onClick={() => handleResolveAlert(alert.id)}>
                                    <InfoIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {alerts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} align="center">
                            <Typography variant="body2" color="text.secondary">
                              No active alerts
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Action Plans</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Plan Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Expected Reduction</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {actionPlans.slice(0, 5).map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell>{plan.planName}</TableCell>
                          <TableCell>{plan.planType}</TableCell>
                          <TableCell>
                            <Chip label={plan.priority} size="small" />
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={plan.status} 
                              color={plan.status === 'active' ? 'success' : 'default'} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell align="right">{plan.expectedReduction || 'N/A'} tCO2e</TableCell>
                          <TableCell>
                            {plan.status === 'ready' && (
                              <Button 
                                size="small" 
                                variant="outlined" 
                                onClick={() => handleActivateActionPlan(plan.id)}
                                startIcon={<PlayArrowIcon />}
                              >
                                Activate
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 5.4: Scenario Planning Suite */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Scenario Simulations</Typography>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleRunSensitivityAnalysis}
                      sx={{ mr: 1 }}
                    >
                      Run Sensitivity Analysis
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => setScenarioDialog(true)}
                    >
                      Run Monte Carlo
                    </Button>
                  </Box>
                </Box>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Scenario Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Simulation Type</TableCell>
                        <TableCell align="right">Iterations</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Created</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scenarios.map((scenario) => (
                        <TableRow key={scenario.id}>
                          <TableCell>{scenario.scenarioName}</TableCell>
                          <TableCell>{scenario.scenarioType}</TableCell>
                          <TableCell>{scenario.simulationType}</TableCell>
                          <TableCell align="right">{scenario.iterations}</TableCell>
                          <TableCell>
                            <Chip 
                              label={scenario.riskLevel} 
                              color={
                                scenario.riskLevel === 'high' ? 'error' : 
                                scenario.riskLevel === 'medium' ? 'warning' : 
                                'success'
                              } 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>{new Date(scenario.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                      {scenarios.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Typography variant="body2" color="text.secondary">
                              No simulations yet. Run Monte Carlo or Sensitivity Analysis to begin.
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Sensitivity Analyses</Typography>
                <Typography variant="h3">{sensitivityAnalyses.length}</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Completed analyses
                </Typography>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Identify key emission drivers through elasticity analysis and critical factor identification.
                </Alert>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Risk Assessment</Typography>
                <Typography variant="body2" paragraph>
                  Monte Carlo simulations provide probabilistic risk assessment with confidence intervals.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  Features: Stress testing, supply chain disruption modeling, extreme weather event simulation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 5.5: Enterprise Features */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          {executiveDashboard && (
            <>
              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Total Forecasted</Typography>
                    <Typography variant="h4">{executiveDashboard.metrics?.totalForecastedEmissions?.toFixed(0) || 0}</Typography>
                    <Typography variant="body2" color="text.secondary">tCO2e</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Budget Utilization</Typography>
                    <Typography variant="h4">{executiveDashboard.metrics?.budgetUtilization?.toFixed(0) || 0}%</Typography>
                    <Typography variant="body2" color="text.secondary">of total budget</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Critical Alerts</Typography>
                    <Typography variant="h4">{executiveDashboard.metrics?.criticalAlerts || 0}</Typography>
                    <Typography variant="body2" color="text.secondary">requiring action</Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={3}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Total Alerts</Typography>
                    <Typography variant="h4">{executiveDashboard.metrics?.totalAlerts || 0}</Typography>
                    <Typography variant="body2" color="text.secondary">active alerts</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Enterprise Forecasts</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Forecast Name</TableCell>
                        <TableCell>Scope</TableCell>
                        <TableCell>Period</TableCell>
                        <TableCell align="right">Total Emissions</TableCell>
                        <TableCell>Compliance Status</TableCell>
                        <TableCell>Published</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {enterpriseForecasts.map((forecast) => (
                        <TableRow key={forecast.id}>
                          <TableCell>{forecast.forecastName}</TableCell>
                          <TableCell>{forecast.scope}</TableCell>
                          <TableCell>{forecast.forecastPeriod}</TableCell>
                          <TableCell align="right">{forecast.totalForecastedEmissions?.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip label={forecast.complianceStatus || 'N/A'} size="small" />
                          </TableCell>
                          <TableCell>
                            {forecast.isPublished ? <CheckCircleIcon color="success" /> : <ErrorIcon color="disabled" />}
                          </TableCell>
                        </TableRow>
                      ))}
                      {enterpriseForecasts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            <Typography variant="body2" color="text.secondary">
                              No enterprise forecasts yet
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>ML Model Performance</Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {modelMetrics.length} models evaluated
                </Typography>
                {modelMetrics.slice(0, 3).map((metric, idx) => (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Typography variant="body2">{metric.modelType}</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={(metric.accuracy || 0) * 100} 
                      sx={{ mt: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Accuracy: {((metric.accuracy || 0) * 100).toFixed(2)}%
                    </Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Executive Recommendations</Typography>
                {executiveDashboard?.recommendations && executiveDashboard.recommendations.length > 0 ? (
                  executiveDashboard.recommendations.map((rec: string, idx: number) => (
                    <Alert severity="warning" sx={{ mb: 1 }} key={idx}>
                      {rec}
                    </Alert>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No immediate recommendations
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Dialogs */}
      <Dialog open={forecastDialog} onClose={() => setForecastDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Run Multi-Factor Forecast</DialogTitle>
        <DialogContent>
          <TextField
            label="Forecast Name"
            fullWidth
            margin="normal"
            value={newForecast.forecastName}
            onChange={(e) => setNewForecast({ ...newForecast, forecastName: e.target.value })}
          />
          <TextField
            label="Target Period"
            fullWidth
            margin="normal"
            value={newForecast.targetPeriod}
            onChange={(e) => setNewForecast({ ...newForecast, targetPeriod: e.target.value })}
          />
          <TextField
            label="Baseline Emissions (tCO2e)"
            fullWidth
            margin="normal"
            type="number"
            value={newForecast.baselineEmissions}
            onChange={(e) => setNewForecast({ ...newForecast, baselineEmissions: parseFloat(e.target.value) })}
          />
          <TextField
            label="Weather Impact Factor (%)"
            fullWidth
            margin="normal"
            type="number"
            value={newForecast.weatherFactor}
            onChange={(e) => setNewForecast({ ...newForecast, weatherFactor: parseFloat(e.target.value) })}
            helperText="Positive = increase, Negative = decrease"
          />
          <TextField
            label="Economic Impact Factor (%)"
            fullWidth
            margin="normal"
            type="number"
            value={newForecast.economicFactor}
            onChange={(e) => setNewForecast({ ...newForecast, economicFactor: parseFloat(e.target.value) })}
            helperText="GDP growth, commodity prices impact"
          />
          <TextField
            label="Operational Impact Factor (%)"
            fullWidth
            margin="normal"
            type="number"
            value={newForecast.operationalFactor}
            onChange={(e) => setNewForecast({ ...newForecast, operationalFactor: parseFloat(e.target.value) })}
            helperText="Production schedules, expansion plans"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForecastDialog(false)}>Cancel</Button>
          <Button onClick={handleRunMultiFactorForecast} variant="contained">Run Forecast</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={budgetDialog} onClose={() => setBudgetDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Carbon Budget</DialogTitle>
        <DialogContent>
          <TextField
            label="Budget Name"
            fullWidth
            margin="normal"
            value={newBudget.budgetName}
            onChange={(e) => setNewBudget({ ...newBudget, budgetName: e.target.value })}
          />
          <TextField
            label="Fiscal Year"
            fullWidth
            margin="normal"
            value={newBudget.fiscalYear}
            onChange={(e) => setNewBudget({ ...newBudget, fiscalYear: e.target.value })}
          />
          <TextField
            label="Total Budget"
            fullWidth
            margin="normal"
            type="number"
            value={newBudget.totalBudget}
            onChange={(e) => setNewBudget({ ...newBudget, totalBudget: parseFloat(e.target.value) })}
          />
          <TextField
            label="Budget Unit"
            fullWidth
            margin="normal"
            select
            value={newBudget.budgetUnit}
            onChange={(e) => setNewBudget({ ...newBudget, budgetUnit: e.target.value })}
          >
            <MenuItem value="tCO2e">tCO2e</MenuItem>
            <MenuItem value="kgCO2e">kgCO2e</MenuItem>
            <MenuItem value="MtCO2e">MtCO2e</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBudgetDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateBudget} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={scenarioDialog} onClose={() => setScenarioDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Run Monte Carlo Simulation</DialogTitle>
        <DialogContent>
          <TextField
            label="Scenario Name"
            fullWidth
            margin="normal"
            value={monteCarloParams.scenarioName}
            onChange={(e) => setMonteCarloParams({ ...monteCarloParams, scenarioName: e.target.value })}
          />
          <TextField
            label="Base Value (tCO2e)"
            fullWidth
            margin="normal"
            type="number"
            value={monteCarloParams.baseValue}
            onChange={(e) => setMonteCarloParams({ ...monteCarloParams, baseValue: parseFloat(e.target.value) })}
          />
          <TextField
            label="Volatility (0-1)"
            fullWidth
            margin="normal"
            type="number"
            value={monteCarloParams.volatility}
            onChange={(e) => setMonteCarloParams({ ...monteCarloParams, volatility: parseFloat(e.target.value) })}
            inputProps={{ step: 0.01, min: 0, max: 1 }}
            helperText="Higher values = more uncertainty"
          />
          <TextField
            label="Iterations"
            fullWidth
            margin="normal"
            type="number"
            value={monteCarloParams.iterations}
            onChange={(e) => setMonteCarloParams({ ...monteCarloParams, iterations: parseInt(e.target.value) })}
            helperText="Recommended: 1000-10000"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScenarioDialog(false)}>Cancel</Button>
          <Button onClick={handleRunMonteCarlo} variant="contained">Run Simulation</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Phase5Page;
