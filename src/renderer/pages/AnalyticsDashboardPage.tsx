import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Tabs,
  Tab,
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
  Alert,
  Chip,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Scenario } from '../../common/types';

const COLORS = ['#2e7d32', '#1976d2', '#f57c00', '#d32f2f', '#9c27b0'];

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

const AnalyticsDashboardPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [openScenarioDialog, setOpenScenarioDialog] = useState(false);
  const [calculations, setCalculations] = useState<any[]>([]);
  const [newScenario, setNewScenario] = useState<Partial<Scenario>>({
    name: '',
    description: '',
    baselineYear: new Date().getFullYear(),
    targetYear: new Date().getFullYear() + 5,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [scenariosData, calcsData] = await Promise.all([
        window.electronAPI.listScenarios(),
        window.electronAPI.listCalculations(),
      ]);
      setScenarios(scenariosData);
      setCalculations(calcsData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateScenario = async () => {
    try {
      await window.electronAPI.createScenario(newScenario as Scenario);
      setOpenScenarioDialog(false);
      setNewScenario({
        name: '',
        description: '',
        baselineYear: new Date().getFullYear(),
        targetYear: new Date().getFullYear() + 5,
      });
      loadData();
    } catch (error) {
      console.error('Failed to create scenario:', error);
    }
  };

  const handleRunScenario = async (id: number) => {
    try {
      await window.electronAPI.runScenario(id);
      loadData();
    } catch (error) {
      console.error('Failed to run scenario:', error);
    }
  };

  // Prepare trend data
  const trendData = calculations.reduce((acc: any[], calc: any) => {
    const period = calc.timePeriod;
    const existing = acc.find(item => item.period === period);
    if (existing) {
      existing.emissions += calc.result;
    } else {
      acc.push({ period, emissions: calc.result });
    }
    return acc;
  }, []).sort((a, b) => a.period.localeCompare(b.period));

  // Prepare scope breakdown data
  const scopeData = calculations.reduce((acc: any[], calc: any) => {
    const scope = `Scope ${calc.scope}`;
    const existing = acc.find(item => item.name === scope);
    if (existing) {
      existing.value += calc.result;
    } else {
      acc.push({ name: scope, value: calc.result });
    }
    return acc;
  }, []);

  // Hotspot analysis data (top emission sources)
  const hotspotData = calculations.reduce((acc: any[], calc: any) => {
    const source = calc.emissionSource || 'Unknown';
    const existing = acc.find(item => item.source === source);
    if (existing) {
      existing.emissions += calc.result;
    } else {
      acc.push({ source, emissions: calc.result });
    }
    return acc;
  }, []).sort((a, b) => b.emissions - a.emissions).slice(0, 5);

  // Benchmark data (mock)
  const benchmarkData = [
    { category: 'Energy', yourOrg: 85, industry: 70, bestInClass: 50 },
    { category: 'Transport', yourOrg: 65, industry: 60, bestInClass: 40 },
    { category: 'Waste', yourOrg: 45, industry: 50, bestInClass: 30 },
    { category: 'Supply Chain', yourOrg: 75, industry: 80, bestInClass: 55 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics & Intelligence Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Advanced analytics, trend analysis, scenario modeling, and predictive insights
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Trend Analysis" />
          <Tab label="Hotspot Analysis" />
          <Tab label="Benchmarking" />
          <Tab label="Scenario Modeling" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUpIcon />
                  Emissions Trend Over Time
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="emissions" stroke="#2e7d32" strokeWidth={2} name="Total Emissions (kg CO2e)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emissions by Scope
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={scopeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${(entry.value as number).toFixed(0)}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {scopeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Key Metrics
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Emissions (All Time)
                    </Typography>
                    <Typography variant="h5" color="primary">
                      {calculations.reduce((sum, calc) => sum + calc.result, 0).toFixed(2)} kg CO2e
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Average per Period
                    </Typography>
                    <Typography variant="h5" color="secondary">
                      {trendData.length > 0 
                        ? (calculations.reduce((sum, calc) => sum + calc.result, 0) / trendData.length).toFixed(2)
                        : '0.00'} kg CO2e
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total Calculations
                    </Typography>
                    <Typography variant="h5">
                      {calculations.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 3 }}>
              Hotspot analysis identifies the top emission sources in your organization, helping you prioritize reduction efforts.
            </Alert>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top 5 Emission Sources
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={hotspotData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="source" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="emissions" fill="#2e7d32" name="Emissions (kg CO2e)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Compare your organization's performance against industry averages and best-in-class performers.
        </Alert>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Benchmark Comparison
            </Typography>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={benchmarkData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis />
                <Radar name="Your Organization" dataKey="yourOrg" stroke="#2e7d32" fill="#2e7d32" fillOpacity={0.6} />
                <Radar name="Industry Average" dataKey="industry" stroke="#1976d2" fill="#1976d2" fillOpacity={0.6} />
                <Radar name="Best in Class" dataKey="bestInClass" stroke="#f57c00" fill="#f57c00" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">Emission Reduction Scenarios</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenScenarioDialog(true)}
          >
            Create Scenario
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Scenario Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Baseline Year</TableCell>
                <TableCell>Target Year</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scenarios.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">
                      No scenarios created. Create your first scenario above.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                scenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {scenario.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {scenario.description}
                      </Typography>
                    </TableCell>
                    <TableCell>{scenario.baselineYear}</TableCell>
                    <TableCell>{scenario.targetYear}</TableCell>
                    <TableCell>
                      <Chip 
                        label={scenario.results ? 'Completed' : 'Draft'} 
                        color={scenario.results ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<PlayArrowIcon />}
                        onClick={() => handleRunScenario(scenario.id!)}
                        disabled={!!scenario.results}
                      >
                        Run
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Create Scenario Dialog */}
      <Dialog open={openScenarioDialog} onClose={() => setOpenScenarioDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Scenario</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Scenario Name"
              value={newScenario.name}
              onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={newScenario.description}
              onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Baseline Year"
              type="number"
              value={newScenario.baselineYear}
              onChange={(e) => setNewScenario({ ...newScenario, baselineYear: parseInt(e.target.value) })}
              fullWidth
              required
            />
            <TextField
              label="Target Year"
              type="number"
              value={newScenario.targetYear}
              onChange={(e) => setNewScenario({ ...newScenario, targetYear: parseInt(e.target.value) })}
              fullWidth
              required
            />
            <Alert severity="info">
              Scenario modeling features will be enhanced in future updates to support drag-and-drop scenario building and advanced predictive modeling.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenScenarioDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateScenario} variant="contained" color="primary">
            Create Scenario
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnalyticsDashboardPage;
