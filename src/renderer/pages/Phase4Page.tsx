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
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  Security as SecurityIcon,
  Sensors as SensorsIcon,
  ViewInAr as ViewInArIcon,
  Speed as SpeedIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayArrowIcon,
  Refresh as RefreshIcon,
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Phase4Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // Phase 4.1: Next-Gen Analytics State
  const [dlModels, setDlModels] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [digitalTwins, setDigitalTwins] = useState<any[]>([]);
  const [dlModelDialog, setDlModelDialog] = useState(false);
  const [newDlModel, setNewDlModel] = useState({ modelName: '', modelType: '', description: '' });

  // Phase 4.2: Verification State
  const [verificationWorkflows, setVerificationWorkflows] = useState<any[]>([]);
  const [verifiers, setVerifiers] = useState<any[]>([]);
  const [workflowDialog, setWorkflowDialog] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({ workflowName: '', workflowType: 'internal', totalSteps: 3 });

  // Phase 4.3: IoT State
  const [iotDevices, setIotDevices] = useState<any[]>([]);
  const [monitors, setMonitors] = useState<any[]>([]);
  const [alertRules, setAlertRules] = useState<any[]>([]);
  const [deviceDialog, setDeviceDialog] = useState(false);
  const [newDevice, setNewDevice] = useState({ deviceName: '', deviceType: '', connectionType: 'mqtt' });

  // Phase 4.4: Visualization State
  const [facilityModels, setFacilityModels] = useState<any[]>([]);
  const [trainingModules, setTrainingModules] = useState<any[]>([]);
  const [dataStories, setDataStories] = useState<any[]>([]);

  // Phase 4.5: Optimization State
  const [cacheStats, setCacheStats] = useState<any>({});
  const [distributedJobs, setDistributedJobs] = useState<any[]>([]);
  const [encryptionKeys, setEncryptionKeys] = useState<any[]>([]);
  const [securityConfigs, setSecurityConfigs] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, [tabValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      switch (tabValue) {
        case 0: // Next-Gen Analytics
          const models = await window.electronAPI.listDeepLearningModels();
          setDlModels(models || []);
          const recs = await window.electronAPI.listStrategyRecommendations();
          setRecommendations(recs || []);
          const twins = await window.electronAPI.listDigitalTwins();
          setDigitalTwins(twins || []);
          break;
        case 1: // Verification
          const workflows = await window.electronAPI.listVerificationWorkflows();
          setVerificationWorkflows(workflows || []);
          const vers = await window.electronAPI.listThirdPartyVerifiers();
          setVerifiers(vers || []);
          break;
        case 2: // IoT
          const devices = await window.electronAPI.listIoTDevices();
          setIotDevices(devices || []);
          const mons = await window.electronAPI.listRealtimeMonitors();
          setMonitors(mons || []);
          const alerts = await window.electronAPI.listAlertRules();
          setAlertRules(alerts || []);
          break;
        case 3: // Visualization
          const models3d = await window.electronAPI.listFacility3DModels();
          setFacilityModels(models3d || []);
          const modules = await window.electronAPI.listTrainingModules();
          setTrainingModules(modules || []);
          const stories = await window.electronAPI.listDataStories();
          setDataStories(stories || []);
          break;
        case 4: // Optimization
          const cache = await window.electronAPI.getCacheStats();
          setCacheStats(cache || {});
          const jobs = await window.electronAPI.listDistributedJobs();
          setDistributedJobs(jobs || []);
          const keys = await window.electronAPI.listEncryptionKeys();
          setEncryptionKeys(keys || []);
          const configs = await window.electronAPI.getSecurityConfigs();
          setSecurityConfigs(configs || []);
          break;
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDlModel = async () => {
    try {
      await window.electronAPI.createDeepLearningModel({
        ...newDlModel,
        isActive: true
      });
      setDlModelDialog(false);
      setNewDlModel({ modelName: '', modelType: '', description: '' });
      loadData();
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };

  const handleTrainModel = async (id: number) => {
    try {
      const result = await window.electronAPI.trainDeepLearningModel(id);
      alert(`Model trained! Accuracy: ${(result.accuracy * 100).toFixed(2)}%`);
      loadData();
    } catch (error) {
      console.error('Error training model:', error);
    }
  };

  const handleCreateWorkflow = async () => {
    try {
      await window.electronAPI.createVerificationWorkflow({
        ...newWorkflow,
        status: 'initiated',
        currentStep: 1
      });
      setWorkflowDialog(false);
      setNewWorkflow({ workflowName: '', workflowType: 'internal', totalSteps: 3 });
      loadData();
    } catch (error) {
      console.error('Error creating workflow:', error);
    }
  };

  const handleCreateDevice = async () => {
    try {
      await window.electronAPI.createIoTDevice({
        ...newDevice,
        status: 'offline',
        isActive: true
      });
      setDeviceDialog(false);
      setNewDevice({ deviceName: '', deviceType: '', connectionType: 'mqtt' });
      loadData();
    } catch (error) {
      console.error('Error creating device:', error);
    }
  };

  const handleTestConnection = async (id: number) => {
    try {
      const result = await window.electronAPI.testDeviceConnection(id);
      alert(result.message);
      loadData();
    } catch (error) {
      console.error('Error testing connection:', error);
    }
  };

  const handleOptimizeCache = async () => {
    try {
      const result = await window.electronAPI.optimizeCache();
      alert(result.message);
      loadData();
    } catch (error) {
      console.error('Error optimizing cache:', error);
    }
  };

  const handleSecurityAudit = async () => {
    try {
      const result = await window.electronAPI.auditSecurity();
      const message = result.passed 
        ? `Security audit passed! ${result.recommendations.length} recommendations available.`
        : `Security audit found ${result.issues.length} issues.`;
      alert(message);
    } catch (error) {
      console.error('Error running security audit:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Phase 4: Innovation & Optimization
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Advanced AI features, enhanced data verification, IoT connectivity, immersive experiences, and platform optimization
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab icon={<PsychologyIcon />} label="Next-Gen Analytics" />
          <Tab icon={<SecurityIcon />} label="Verification & Trust" />
          <Tab icon={<SensorsIcon />} label="IoT & Monitoring" />
          <Tab icon={<ViewInArIcon />} label="Immersive Experience" />
          <Tab icon={<SpeedIcon />} label="Optimization" />
        </Tabs>
      </Box>

      {loading && <LinearProgress />}

      {/* Phase 4.1: Next-Gen Analytics */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Deep Learning Models</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setDlModelDialog(true)}
                  >
                    Add Model
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Model Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Accuracy</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dlModels.map((model) => (
                        <TableRow key={model.id}>
                          <TableCell>{model.modelName}</TableCell>
                          <TableCell>{model.modelType}</TableCell>
                          <TableCell>{model.accuracy ? `${(model.accuracy * 100).toFixed(2)}%` : 'Not trained'}</TableCell>
                          <TableCell>
                            <Chip label={model.isActive ? 'Active' : 'Inactive'} color={model.isActive ? 'success' : 'default'} size="small" />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Train Model">
                              <IconButton size="small" onClick={() => handleTrainModel(model.id)}>
                                <PlayArrowIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Strategy Recommendations</Typography>
                <Grid container spacing={2}>
                  {recommendations.slice(0, 6).map((rec) => (
                    <Grid item xs={12} md={6} key={rec.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>{rec.title}</Typography>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {rec.description}
                          </Typography>
                          <Box display="flex" justifyContent="space-between">
                            <Chip label={`Impact: ${rec.potentialImpact} tCO2e`} size="small" />
                            <Chip label={`Confidence: ${(rec.confidenceScore * 100).toFixed(0)}%`} size="small" color="primary" />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Digital Twins</Typography>
                <Typography variant="body2" color="text.secondary">
                  {digitalTwins.length} facilities with digital twin representations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 4.2: Verification & Trust */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Verification Workflows</Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setWorkflowDialog(true)}
                  >
                    Create Workflow
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Workflow Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {verificationWorkflows.map((workflow) => (
                        <TableRow key={workflow.id}>
                          <TableCell>{workflow.workflowName}</TableCell>
                          <TableCell>{workflow.workflowType}</TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={(workflow.currentStep / workflow.totalSteps) * 100} />
                              </Box>
                              <Typography variant="body2">{workflow.currentStep}/{workflow.totalSteps}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={workflow.status} color={workflow.status === 'completed' ? 'success' : 'primary'} size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Third-Party Verifiers</Typography>
                <Typography variant="body2" color="text.secondary">
                  {verifiers.length} approved verifiers available
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 4.3: IoT & Real-Time Monitoring */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>IoT Devices</Typography>
                <Typography variant="h3">{iotDevices.length}</Typography>
                <Typography variant="body2" color="text.secondary">Connected devices</Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={() => setDeviceDialog(true)}
                >
                  Add Device
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Real-time Monitors</Typography>
                <Typography variant="h3">{monitors.length}</Typography>
                <Typography variant="body2" color="text.secondary">Active monitors</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Alert Rules</Typography>
                <Typography variant="h3">{alertRules.length}</Typography>
                <Typography variant="body2" color="text.secondary">Configured alerts</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Device List</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Device Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Connection</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {iotDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell>{device.deviceName}</TableCell>
                          <TableCell>{device.deviceType}</TableCell>
                          <TableCell>{device.connectionType}</TableCell>
                          <TableCell>
                            <Chip 
                              label={device.status} 
                              color={device.status === 'online' ? 'success' : 'default'} 
                              size="small" 
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="Test Connection">
                              <IconButton size="small" onClick={() => handleTestConnection(device.id)}>
                                <RefreshIcon />
                              </IconButton>
                            </Tooltip>
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

      {/* Phase 4.4: Advanced Visualization & Immersive Experience */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>3D Facility Models</Typography>
                <Typography variant="h3">{facilityModels.length}</Typography>
                <Typography variant="body2" color="text.secondary">Digital facility models</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Training Modules</Typography>
                <Typography variant="h3">{trainingModules.length}</Typography>
                <Typography variant="body2" color="text.secondary">Available courses</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Data Stories</Typography>
                <Typography variant="h3">{dataStories.length}</Typography>
                <Typography variant="body2" color="text.secondary">Published stories</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Alert severity="info">
              Advanced visualization features including 3D facility models, AR data collection, and immersive training modules are ready for integration with specialized rendering libraries.
            </Alert>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Phase 4.5: Platform Optimization & Future-Proofing */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Cache Performance</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon />}
                    onClick={handleOptimizeCache}
                  >
                    Optimize Cache
                  </Button>
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">Total Entries</Typography>
                    <Typography variant="h4">{cacheStats.totalEntries || 0}</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">Total Size</Typography>
                    <Typography variant="h4">{((cacheStats.totalSize || 0) / 1024).toFixed(2)} KB</Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">Average Hits</Typography>
                    <Typography variant="h4">{(cacheStats.averageHits || 0).toFixed(1)}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Distributed Jobs</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Job Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Progress</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {distributedJobs.slice(0, 5).map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>{job.jobName}</TableCell>
                          <TableCell>{job.jobType}</TableCell>
                          <TableCell>{job.priority}</TableCell>
                          <TableCell>
                            <LinearProgress variant="determinate" value={job.progress} />
                          </TableCell>
                          <TableCell>
                            <Chip label={job.status} size="small" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">Security Configuration</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<SecurityIcon />}
                    onClick={handleSecurityAudit}
                  >
                    Run Security Audit
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {securityConfigs.length} security configurations active
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {encryptionKeys.length} encryption keys managed (includes quantum-ready algorithms)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Dialogs */}
      <Dialog open={dlModelDialog} onClose={() => setDlModelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Deep Learning Model</DialogTitle>
        <DialogContent>
          <TextField
            label="Model Name"
            fullWidth
            margin="normal"
            value={newDlModel.modelName}
            onChange={(e) => setNewDlModel({ ...newDlModel, modelName: e.target.value })}
          />
          <TextField
            label="Model Type"
            fullWidth
            margin="normal"
            select
            value={newDlModel.modelType}
            onChange={(e) => setNewDlModel({ ...newDlModel, modelType: e.target.value })}
          >
            <MenuItem value="emissions_forecast">Emissions Forecast</MenuItem>
            <MenuItem value="recommendation">Recommendation Engine</MenuItem>
            <MenuItem value="optimization">Optimization</MenuItem>
          </TextField>
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newDlModel.description}
            onChange={(e) => setNewDlModel({ ...newDlModel, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDlModelDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateDlModel} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={workflowDialog} onClose={() => setWorkflowDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Verification Workflow</DialogTitle>
        <DialogContent>
          <TextField
            label="Workflow Name"
            fullWidth
            margin="normal"
            value={newWorkflow.workflowName}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, workflowName: e.target.value })}
          />
          <TextField
            label="Workflow Type"
            fullWidth
            margin="normal"
            select
            value={newWorkflow.workflowType}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, workflowType: e.target.value })}
          >
            <MenuItem value="internal">Internal</MenuItem>
            <MenuItem value="external">External</MenuItem>
            <MenuItem value="multi_party">Multi-Party</MenuItem>
          </TextField>
          <TextField
            label="Total Steps"
            fullWidth
            margin="normal"
            type="number"
            value={newWorkflow.totalSteps}
            onChange={(e) => setNewWorkflow({ ...newWorkflow, totalSteps: parseInt(e.target.value) })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkflowDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateWorkflow} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deviceDialog} onClose={() => setDeviceDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add IoT Device</DialogTitle>
        <DialogContent>
          <TextField
            label="Device Name"
            fullWidth
            margin="normal"
            value={newDevice.deviceName}
            onChange={(e) => setNewDevice({ ...newDevice, deviceName: e.target.value })}
          />
          <TextField
            label="Device Type"
            fullWidth
            margin="normal"
            select
            value={newDevice.deviceType}
            onChange={(e) => setNewDevice({ ...newDevice, deviceType: e.target.value })}
          >
            <MenuItem value="energy_meter">Energy Meter</MenuItem>
            <MenuItem value="emissions_sensor">Emissions Sensor</MenuItem>
            <MenuItem value="flow_meter">Flow Meter</MenuItem>
          </TextField>
          <TextField
            label="Connection Type"
            fullWidth
            margin="normal"
            select
            value={newDevice.connectionType}
            onChange={(e) => setNewDevice({ ...newDevice, connectionType: e.target.value })}
          >
            <MenuItem value="mqtt">MQTT</MenuItem>
            <MenuItem value="http">HTTP</MenuItem>
            <MenuItem value="modbus">Modbus</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeviceDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateDevice} variant="contained">Add Device</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Phase4Page;
