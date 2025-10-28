import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Rating,
  Tooltip,
  Snackbar,
  ChipPropsColorOverrides,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  Assessment as AssessmentIcon,
  Map as MapIcon,
  Lightbulb as LightbulbIcon,
  Handshake as HandshakeIcon,
  Language as LanguageIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Visibility as VisibilityIcon,
  CompareArrows as CompareIcon,
  Timeline as TimelineIcon,
  AccountTree as AccountTreeIcon,
  Security as SecurityIcon,
  BusinessCenter as BusinessCenterIcon,
} from '@mui/icons-material';
import { SupplierCarbonScore, CarbonHotspot, AlternativeSupplier, SupplierEngagementProgram } from '../../common/types';

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

const Phase11Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Supplier Carbon Scoring State
  const [supplierScores] = useState<SupplierCarbonScore[]>([
    {
      id: 1,
      supplierId: 101,
      supplierName: 'Global Steel Manufacturing Inc.',
      assessmentDate: '2024-01-15',
      overallScore: 72,
      directEmissionIntensity: 0.85,
      emissionIntensityScore: 68,
      reductionTargetScore: 85,
      renewableEnergyScore: 60,
      environmentalManagementScore: 78,
      climateRiskScore: 75,
      hasReductionTarget: true,
      targetYear: 2030,
      targetReduction: 30,
      renewableEnergyPercentage: 35,
      hasCertifications: JSON.stringify(['ISO 14001', 'ISO 50001']),
      cdpScore: 'B',
      riskLevel: 'medium',
      dataQuality: 0.85,
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      supplierId: 102,
      supplierName: 'EcoTech Solutions Ltd.',
      assessmentDate: '2024-01-20',
      overallScore: 89,
      directEmissionIntensity: 0.32,
      emissionIntensityScore: 92,
      reductionTargetScore: 95,
      renewableEnergyScore: 88,
      environmentalManagementScore: 85,
      climateRiskScore: 82,
      hasReductionTarget: true,
      targetYear: 2030,
      targetReduction: 50,
      renewableEnergyPercentage: 75,
      hasCertifications: JSON.stringify(['ISO 14001', 'ISO 50001', 'SBTi Approved']),
      cdpScore: 'A-',
      riskLevel: 'low',
      dataQuality: 0.95,
      lastUpdated: '2024-01-20',
    },
    {
      id: 3,
      supplierId: 103,
      supplierName: 'Traditional Manufacturing Co.',
      assessmentDate: '2024-01-10',
      overallScore: 45,
      directEmissionIntensity: 1.65,
      emissionIntensityScore: 38,
      reductionTargetScore: 42,
      renewableEnergyScore: 25,
      environmentalManagementScore: 58,
      climateRiskScore: 55,
      hasReductionTarget: false,
      renewableEnergyPercentage: 10,
      hasCertifications: JSON.stringify(['ISO 9001']),
      riskLevel: 'high',
      dataQuality: 0.65,
      lastUpdated: '2024-01-10',
    },
  ]);

  // Carbon Hotspot State
  const [carbonHotspots] = useState<CarbonHotspot[]>([
    {
      id: 1,
      supplierId: 101,
      supplierName: 'Global Steel Manufacturing Inc.',
      category: 'Raw Materials',
      region: 'Asia Pacific',
      emissionIntensity: 8500,
      spendAmount: 2500000,
      spendCurrency: 'USD',
      carbonPerDollar: 0.0034,
      riskLevel: 'high',
      reductionPotential: 2550,
      priorityScore: 85,
    },
    {
      id: 2,
      supplierId: 104,
      supplierName: 'Logistics Express International',
      category: 'Transportation',
      region: 'North America',
      emissionIntensity: 4200,
      spendAmount: 1200000,
      spendCurrency: 'USD',
      carbonPerDollar: 0.0035,
      riskLevel: 'medium',
      reductionPotential: 1260,
      priorityScore: 72,
    },
    {
      id: 3,
      supplierId: 105,
      supplierName: 'Energy Provider Corp.',
      category: 'Energy',
      region: 'Europe',
      emissionIntensity: 6800,
      spendAmount: 1800000,
      spendCurrency: 'USD',
      carbonPerDollar: 0.00378,
      riskLevel: 'medium',
      reductionPotential: 2040,
      priorityScore: 78,
    },
  ]);

  // Alternative Suppliers State
  const [alternativeSuppliers] = useState<AlternativeSupplier[]>([
    {
      id: 1,
      alternativeSupplierId: 201,
      alternativeSupplierName: 'Green Steel Industries',
      currentSupplierId: 101,
      currentSupplierName: 'Global Steel Manufacturing Inc.',
      carbonReduction: 2125,
      carbonReductionPercentage: 25,
      costImpact: 50000,
      costImpactPercentage: 2,
      qualityScore: 88,
      reliabilityScore: 82,
      sustainabilityScore: 95,
      overallRecommendationScore: 87,
      confidence: 0.89,
      switchingCost: 75000,
      switchingTimeframe: 'short-term',
      keyBenefits: JSON.stringify(['Lower carbon footprint', 'Renewable energy usage', 'SBTi approved targets']),
      potentialRisks: JSON.stringify(['Slightly higher cost', 'New supplier relationship']),
    },
    {
      id: 2,
      alternativeSupplierId: 202,
      alternativeSupplierName: 'EcoLogistics Solutions',
      currentSupplierId: 104,
      currentSupplierName: 'Logistics Express International',
      carbonReduction: 1050,
      carbonReductionPercentage: 25,
      costImpact: -25000,
      costImpactPercentage: -2.1,
      qualityScore: 90,
      reliabilityScore: 88,
      sustainabilityScore: 92,
      overallRecommendationScore: 91,
      confidence: 0.92,
      switchingCost: 30000,
      switchingTimeframe: 'immediate',
      keyBenefits: JSON.stringify(['Lower carbon emissions', 'Cost savings', 'Electric fleet']),
      potentialRisks: JSON.stringify(['Limited capacity during peak seasons']),
    },
  ]);

  // Engagement Programs State
  const [engagementPrograms] = useState<SupplierEngagementProgram[]>([
    {
      id: 1,
      programName: 'Supplier Carbon Reduction Initiative 2024',
      programType: 'reduction_collaboration',
      description: 'Collaborative program to help top suppliers reduce emissions by 20% by 2030',
      startDate: '2024-01-01',
      endDate: '2030-12-31',
      status: 'active',
      targetSuppliers: JSON.stringify([101, 102, 104, 105]),
      enrolledSuppliers: 4,
      objectives: JSON.stringify(['20% emission reduction', 'Renewable energy adoption', 'Data transparency']),
      milestones: JSON.stringify([
        { name: 'Baseline assessment', status: 'completed' },
        { name: 'Reduction plan development', status: 'in_progress' },
        { name: 'Implementation phase', status: 'pending' },
      ]),
      budget: 500000,
      actualSpend: 125000,
      emissionReductionTarget: 5000,
      actualEmissionReduction: 1200,
      engagementMetrics: JSON.stringify({ meetingsHeld: 12, surveysCompleted: 4 }),
    },
    {
      id: 2,
      programName: 'Supplier Data Quality Enhancement',
      programType: 'data_collection',
      description: 'Program to improve accuracy and completeness of supplier emission data',
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      status: 'active',
      targetSuppliers: JSON.stringify([103, 106, 107]),
      enrolledSuppliers: 3,
      objectives: JSON.stringify(['Improve data quality to >0.8', 'Establish reporting systems', 'Quarterly reporting']),
      milestones: JSON.stringify([
        { name: 'Training sessions', status: 'completed' },
        { name: 'System setup', status: 'in_progress' },
      ]),
      budget: 150000,
      actualSpend: 45000,
      emissionReductionTarget: 0,
      actualEmissionReduction: 0,
      engagementMetrics: JSON.stringify({ trainingSessions: 6, participantsTrained: 45 }),
    },
  ]);

  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<SupplierCarbonScore | null>(null);
  const [addProgramDialogOpen, setAddProgramDialogOpen] = useState(false);
  const [cdpSyncInProgress, setCdpSyncInProgress] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleViewSupplierDetails = (supplier: SupplierCarbonScore) => {
    setSelectedSupplier(supplier);
    setScoreDialogOpen(true);
  };

  const showMessage = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleRefreshScores = () => {
    showMessage('Refreshing supplier carbon scores from CDP and internal data sources...');
  };

  const handleSyncCDP = () => {
    setCdpSyncInProgress(true);
    setTimeout(() => {
      setCdpSyncInProgress(false);
      showMessage('CDP data synchronized successfully. 15 supplier records updated.');
    }, 2000);
  };

  const getRiskChipColor = (riskLevel: string): 'success' | 'warning' | 'error' | 'default' => {
    switch (riskLevel) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'success.main';
    if (score >= 60) return 'warning.main';
    return 'error.main';
  };

  const parseCertifications = (certStr: string | undefined): string[] => {
    if (!certStr) return [];
    try {
      return JSON.parse(certStr);
    } catch (e) {
      console.error('Failed to parse certifications:', e);
      return [];
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Supply Chain Carbon X-Ray
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Multi-dimensional supplier carbon assessment, hotspot identification, and decarbonization planning
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={handleRefreshScores}
          >
            Refresh Data
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
          >
            Export Report
          </Button>
        </Box>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="Supplier Carbon Scoring" icon={<AssessmentIcon />} iconPosition="start" />
        <Tab label="Carbon Hotspot Mapping" icon={<MapIcon />} iconPosition="start" />
        <Tab label="Alternative Suppliers" icon={<LightbulbIcon />} iconPosition="start" />
        <Tab label="Decarbonization Planning" icon={<HandshakeIcon />} iconPosition="start" />
        <Tab label="Enterprise Management" icon={<LanguageIcon />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Suppliers Scored
                </Typography>
                <Typography variant="h4">{supplierScores.length}</Typography>
                <Typography variant="caption" color="success.main">
                  +3 this month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Average Carbon Score
                </Typography>
                <Typography variant="h4">
                  {Math.round(supplierScores.reduce((acc, s) => acc + s.overallScore, 0) / supplierScores.length)}
                </Typography>
                <Typography variant="caption" color="success.main">
                  +5 pts from last quarter
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  High Risk Suppliers
                </Typography>
                <Typography variant="h4" color="error.main">
                  {supplierScores.filter(s => s.riskLevel === 'high' || s.riskLevel === 'critical').length}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Requiring attention
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  CDP Integrated
                </Typography>
                <Typography variant="h4">
                  {supplierScores.filter(s => s.cdpScore).length}
                </Typography>
                <Button
                  size="small"
                  onClick={handleSyncCDP}
                  disabled={cdpSyncInProgress}
                  sx={{ mt: 1 }}
                >
                  {cdpSyncInProgress ? 'Syncing...' : 'Sync CDP Data'}
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Data Integration Status
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon color="success" />
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          CDP Supplier Data
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Last sync: 2 hours ago
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CheckCircleIcon color="success" />
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          Direct Supplier Reporting
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          15 active portals
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <WarningIcon color="warning" />
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          ESG Rating Integration
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Pending configuration
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Supplier Carbon Scores
                  </Typography>
                  <Button variant="contained" startIcon={<AddIcon />}>
                    Add Supplier
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Supplier Name</TableCell>
                        <TableCell>Overall Score</TableCell>
                        <TableCell>Emission Intensity</TableCell>
                        <TableCell>Renewable Energy</TableCell>
                        <TableCell>CDP Score</TableCell>
                        <TableCell>Risk Level</TableCell>
                        <TableCell>Data Quality</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {supplierScores.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {supplier.supplierName}
                            </Typography>
                            {supplier.hasCertifications && (
                              <Box sx={{ mt: 0.5 }}>
                                {parseCertifications(supplier.hasCertifications).slice(0, 2).map((cert: string, idx: number) => (
                                  <Chip key={idx} label={cert} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                                ))}
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="h6" sx={{ color: getScoreColor(supplier.overallScore) }}>
                                {supplier.overallScore}
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={supplier.overallScore}
                                sx={{ width: 60, height: 6, borderRadius: 1 }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {supplier.directEmissionIntensity.toFixed(2)} tCO2e
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Score: {supplier.emissionIntensityScore}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {supplier.renewableEnergyPercentage}%
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Score: {supplier.renewableEnergyScore}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {supplier.cdpScore ? (
                              <Chip label={supplier.cdpScore} color="primary" size="small" />
                            ) : (
                              <Chip label="N/A" size="small" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={supplier.riskLevel}
                              color={getRiskChipColor(supplier.riskLevel)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Rating
                              value={supplier.dataQuality * 5}
                              readOnly
                              precision={0.5}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" onClick={() => handleViewSupplierDetails(supplier)}>
                              <VisibilityIcon />
                            </IconButton>
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

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                <strong>Carbon Hotspot Analysis:</strong> Identifying high-impact suppliers and categories for targeted decarbonization efforts.
              </Typography>
            </Alert>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Supply Chain Carbon Heat Map
                </Typography>
                <Box
                  sx={{
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <MapIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Interactive Heat Map
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visual representation of carbon intensity by supplier, region, and category
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Top Carbon Hotspots
                </Typography>
                <List dense>
                  {carbonHotspots.slice(0, 5).map((hotspot, index) => (
                    <React.Fragment key={hotspot.id}>
                      <ListItem>
                        <ListItemIcon>
                          <Typography variant="h6" color="text.secondary">
                            #{index + 1}
                          </Typography>
                        </ListItemIcon>
                        <ListItemText
                          primary={hotspot.supplierName}
                          secondary={
                            <>
                              <Typography variant="caption" display="block">
                                {hotspot.emissionIntensity.toLocaleString()} tCO2e
                              </Typography>
                              <Typography variant="caption" display="block">
                                Potential: -{hotspot.reductionPotential.toLocaleString()} tCO2e
                              </Typography>
                            </>
                          }
                        />
                        <Chip
                          label={hotspot.riskLevel}
                          color={getRiskChipColor(hotspot.riskLevel)}
                          size="small"
                        />
                      </ListItem>
                      {index < 4 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6">Alternative Supplier Intelligence</Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          AI-powered alternative supplier recommendations and market intelligence features available.
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Typography variant="h6">Decarbonization Planning</Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          Supplier engagement programs, procurement optimization, and contract integration tools.
        </Alert>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Typography variant="h6">Enterprise Management</Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          Global supply chain configuration, category management, and compliance monitoring.
        </Alert>
      </TabPanel>

      <Dialog
        open={scoreDialogOpen}
        onClose={() => setScoreDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Supplier Carbon Score Details
          {selectedSupplier && (
            <Typography variant="subtitle2" color="text.secondary">
              {selectedSupplier.supplierName}
            </Typography>
          )}
        </DialogTitle>
        <DialogContent>
          {selectedSupplier && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Overall Score: {selectedSupplier.overallScore}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={selectedSupplier.overallScore}
                  sx={{ height: 10, borderRadius: 1 }}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Emission Intensity Score
                </Typography>
                <Typography variant="h6">{selectedSupplier.emissionIntensityScore}</Typography>
                <Typography variant="caption">
                  {selectedSupplier.directEmissionIntensity} tCO2e per unit
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Reduction Target Score
                </Typography>
                <Typography variant="h6">{selectedSupplier.reductionTargetScore}</Typography>
                {selectedSupplier.hasReductionTarget && (
                  <Typography variant="caption">
                    Target: {selectedSupplier.targetReduction}% by {selectedSupplier.targetYear}
                  </Typography>
                )}
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setScoreDialogOpen(false)}>Close</Button>
          <Button variant="contained">Export Report</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addProgramDialogOpen}
        onClose={() => setAddProgramDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Engagement Program</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField fullWidth label="Program Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Program Type"
                variant="outlined"
              >
                <MenuItem value="data_collection">Data Collection</MenuItem>
                <MenuItem value="reduction_collaboration">Reduction Collaboration</MenuItem>
                <MenuItem value="capacity_building">Capacity Building</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddProgramDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => {
            setAddProgramDialogOpen(false);
            showMessage('Program created successfully!');
          }}>
            Create Program
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default Phase11Page;
