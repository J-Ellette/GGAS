import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Psychology as AIIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Settings as SettingsIcon,
  History as HistoryIcon,
  Policy as PolicyIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  Computer as ComputerIcon,
  SmartToy as SmartToyIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AISettingsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [features, setFeatures] = useState<any[]>([]);
  const [operationModes, setOperationModes] = useState<any[]>([]);
  const [activeMode, setActiveMode] = useState<any>(null);
  const [auditLog, setAuditLog] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [newPolicy, setNewPolicy] = useState({
    policyName: '',
    policyType: 'usage',
    policyScope: 'organization',
    description: '',
    restrictions: '',
    requirements: ''
  });

  useEffect(() => {
    loadData();
  }, [tabValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tabValue === 0) {
        // Load feature toggles
        const allFeatures = await window.electronAPI.listAIFeatureToggles({});
        setFeatures(allFeatures);
        
        // Load operation modes
        const modes = await window.electronAPI.listAIOperationModes();
        setOperationModes(modes);
        
        const active = await window.electronAPI.getActiveOperationMode();
        setActiveMode(active);
      } else if (tabValue === 1) {
        // Load audit log
        const audit = await window.electronAPI.listAIUsageAudit({});
        setAuditLog(audit);
      } else if (tabValue === 2) {
        // Load policies
        const pols = await window.electronAPI.listAIPolicies({});
        setPolicies(pols);
      }
    } catch (error) {
      console.error('Error loading AI settings data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeatureToggle = async (featureKey: string, currentState: boolean) => {
    try {
      await window.electronAPI.updateAIFeatureToggle(featureKey, !currentState, 'user');
      loadData();
    } catch (error) {
      console.error('Error toggling feature:', error);
    }
  };

  const handleOperationModeChange = async (modeName: string) => {
    try {
      await window.electronAPI.setActiveOperationMode(modeName, 'user');
      loadData();
    } catch (error) {
      console.error('Error changing operation mode:', error);
    }
  };

  const handleCreatePolicy = async () => {
    try {
      await window.electronAPI.createAIPolicy(newPolicy);
      setPolicyDialogOpen(false);
      setNewPolicy({
        policyName: '',
        policyType: 'usage',
        policyScope: 'organization',
        description: '',
        restrictions: '',
        requirements: ''
      });
      loadData();
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  const getFeaturesByCategory = () => {
    if (selectedCategory === 'all') {
      return features;
    }
    return features.filter(f => f.featureCategory === selectedCategory);
  };

  const categories = ['Data Processing', 'Analytics', 'User Interface', 'Integration', 'Workflow'];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />
        <Box>
          <Typography variant="h4" gutterBottom>
            AI-Optional Operation Framework
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Configure AI features, operation modes, and policies for your organization
          </Typography>
        </Box>
      </Box>

      <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ mb: 3 }}>
        <Tab label="Feature Management" icon={<SettingsIcon />} iconPosition="start" />
        <Tab label="Audit Trail" icon={<HistoryIcon />} iconPosition="start" />
        <Tab label="Policies" icon={<PolicyIcon />} iconPosition="start" />
      </Tabs>

      {/* Feature Management Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Operation Mode Selection */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SmartToyIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Operation Mode</Typography>
                </Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Choose how AI features are applied across the system. Changes affect all users in your organization.
                </Alert>
                
                <FormControl component="fieldset">
                  <RadioGroup
                    value={activeMode?.modeName || 'full_ai'}
                    onChange={(e) => handleOperationModeChange(e.target.value)}
                  >
                    {operationModes.map((mode) => (
                      <Box key={mode.id} sx={{ mb: 2 }}>
                        <FormControlLabel
                          value={mode.modeName}
                          control={<Radio />}
                          label={
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {mode.displayName}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {mode.description}
                              </Typography>
                            </Box>
                          }
                        />
                      </Box>
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature Toggles */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ToggleOnIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">Feature Toggles</Typography>
                  </Box>
                  <Box>
                    <Chip
                      label="All"
                      onClick={() => setSelectedCategory('all')}
                      color={selectedCategory === 'all' ? 'primary' : 'default'}
                      sx={{ mr: 1 }}
                    />
                    {categories.map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        onClick={() => setSelectedCategory(cat)}
                        color={selectedCategory === cat ? 'primary' : 'default'}
                        sx={{ mr: 1 }}
                      />
                    ))}
                  </Box>
                </Box>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Feature</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Fallback Method</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getFeaturesByCategory().map((feature) => (
                        <TableRow key={feature.id}>
                          <TableCell>
                            <Typography variant="body2" fontWeight="medium">
                              {feature.featureName}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={feature.featureCategory} size="small" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {feature.fallbackMethod}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            {feature.isEnabled ? (
                              <Chip label="Enabled" color="success" size="small" icon={<CheckIcon />} />
                            ) : (
                              <Chip label="Disabled" color="default" size="small" icon={<CancelIcon />} />
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Switch
                              checked={feature.isEnabled === 1}
                              onChange={() => handleFeatureToggle(feature.featureKey, feature.isEnabled === 1)}
                              color="primary"
                            />
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

      {/* Audit Trail Tab */}
      <TabPanel value={tabValue} index={1}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <HistoryIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">AI Usage Audit Trail</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Complete logging of all AI feature usage and configuration changes
            </Typography>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Feature</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Performed By</TableCell>
                    <TableCell>Previous State</TableCell>
                    <TableCell>New State</TableCell>
                    <TableCell>Reason</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {auditLog.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.featureKey}</TableCell>
                      <TableCell>
                        <Chip label={log.actionType} size="small" />
                      </TableCell>
                      <TableCell>{log.performedBy}</TableCell>
                      <TableCell>
                        {log.previousState !== null && (log.previousState ? 'Enabled' : 'Disabled')}
                      </TableCell>
                      <TableCell>
                        {log.newState !== null && (log.newState ? 'Enabled' : 'Disabled')}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {log.reason || '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  {auditLog.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="body2" color="text.secondary">
                          No audit trail entries found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Policies Tab */}
      <TabPanel value={tabValue} index={2}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PolicyIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">AI Policies</Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<PolicyIcon />}
                onClick={() => setPolicyDialogOpen(true)}
              >
                Create Policy
              </Button>
            </Box>

            <List>
              {policies.map((policy) => (
                <React.Fragment key={policy.id}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">{policy.policyName}</Typography>
                          <Chip label={policy.policyType} size="small" />
                          <Chip label={policy.policyScope} size="small" color="primary" />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2">{policy.description}</Typography>
                          {policy.restrictions && (
                            <Typography variant="caption" color="error">
                              Restrictions: {policy.restrictions}
                            </Typography>
                          )}
                          {policy.requirements && (
                            <Typography variant="caption" color="warning.main">
                              Requirements: {policy.requirements}
                            </Typography>
                          )}
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      {policy.isActive ? (
                        <Chip label="Active" color="success" size="small" />
                      ) : (
                        <Chip label="Inactive" size="small" />
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
              {policies.length === 0 && (
                <ListItem>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary" align="center">
                        No policies configured. Click "Create Policy" to add one.
                      </Typography>
                    }
                  />
                </ListItem>
              )}
            </List>
          </CardContent>
        </Card>
      </TabPanel>

      {/* Create Policy Dialog */}
      <Dialog open={policyDialogOpen} onClose={() => setPolicyDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create AI Policy</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Policy Name"
              value={newPolicy.policyName}
              onChange={(e) => setNewPolicy({ ...newPolicy, policyName: e.target.value })}
              fullWidth
            />
            <TextField
              label="Policy Type"
              select
              value={newPolicy.policyType}
              onChange={(e) => setNewPolicy({ ...newPolicy, policyType: e.target.value })}
              SelectProps={{ native: true }}
              fullWidth
            >
              <option value="usage">Usage Policy</option>
              <option value="compliance">Compliance Policy</option>
              <option value="security">Security Policy</option>
              <option value="governance">Governance Policy</option>
            </TextField>
            <TextField
              label="Policy Scope"
              select
              value={newPolicy.policyScope}
              onChange={(e) => setNewPolicy({ ...newPolicy, policyScope: e.target.value })}
              SelectProps={{ native: true }}
              fullWidth
            >
              <option value="organization">Organization</option>
              <option value="department">Department</option>
              <option value="user">User</option>
            </TextField>
            <TextField
              label="Description"
              value={newPolicy.description}
              onChange={(e) => setNewPolicy({ ...newPolicy, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              label="Restrictions (Optional)"
              value={newPolicy.restrictions}
              onChange={(e) => setNewPolicy({ ...newPolicy, restrictions: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              label="Requirements (Optional)"
              value={newPolicy.requirements}
              onChange={(e) => setNewPolicy({ ...newPolicy, requirements: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPolicyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreatePolicy} variant="contained" color="primary">
            Create Policy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
