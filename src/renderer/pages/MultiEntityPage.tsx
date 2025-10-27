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
  MenuItem,
  LinearProgress,
} from '@mui/material';
import {
  Language as GlobalIcon,
  Add as AddIcon,
  AccountTree as HierarchyIcon,
  Gavel as ComplianceIcon,
  Security as SecurityIcon,
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

export default function MultiEntityPage() {
  const [tabValue, setTabValue] = useState(0);
  const [entities, setEntities] = useState<any[]>([]);
  const [entityHierarchy, setEntityHierarchy] = useState<any[]>([]);
  const [regionalCompliance, setRegionalCompliance] = useState<any[]>([]);
  const [governancePolicies, setGovernancePolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Dialog states
  const [entityDialogOpen, setEntityDialogOpen] = useState(false);
  const [complianceDialogOpen, setComplianceDialogOpen] = useState(false);
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);
  
  // Form states
  const [entityForm, setEntityForm] = useState({
    entityName: '',
    entityType: 'subsidiary',
    parentEntityId: undefined as number | undefined,
    country: 'US',
    currency: 'USD',
    language: 'en',
    timezone: 'America/New_York',
    isActive: true,
  });

  const [complianceForm, setComplianceForm] = useState({
    region: '',
    regulationType: 'emissions',
    regulationName: '',
    description: '',
    applicableScopes: '1+2+3',
    reportingFrequency: 'annual',
    nextDeadline: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  const [policyForm, setPolicyForm] = useState({
    policyName: '',
    policyType: 'access',
    description: '',
    entityId: undefined as number | undefined,
    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, [tabValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tabValue === 0) {
        const data = await window.electronAPI.listEntities({});
        setEntities(data);
        const hierarchy = await window.electronAPI.getEntityHierarchy();
        setEntityHierarchy(hierarchy);
      } else if (tabValue === 1) {
        const data = await window.electronAPI.listRegionalCompliance({});
        setRegionalCompliance(data);
      } else if (tabValue === 2) {
        const data = await window.electronAPI.listDataGovernancePolicies({});
        setGovernancePolicies(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEntity = async () => {
    try {
      await window.electronAPI.createEntity(entityForm);
      setEntityDialogOpen(false);
      loadData();
      setEntityForm({
        entityName: '',
        entityType: 'subsidiary',
        parentEntityId: undefined,
        country: 'US',
        currency: 'USD',
        language: 'en',
        timezone: 'America/New_York',
        isActive: true,
      });
    } catch (error) {
      console.error('Error creating entity:', error);
    }
  };

  const handleCreateCompliance = async () => {
    try {
      await window.electronAPI.createRegionalCompliance(complianceForm);
      setComplianceDialogOpen(false);
      loadData();
      setComplianceForm({
        region: '',
        regulationType: 'emissions',
        regulationName: '',
        description: '',
        applicableScopes: '1+2+3',
        reportingFrequency: 'annual',
        nextDeadline: new Date().toISOString().split('T')[0],
        isActive: true,
      });
    } catch (error) {
      console.error('Error creating compliance requirement:', error);
    }
  };

  const handleCreatePolicy = async () => {
    try {
      await window.electronAPI.createDataGovernancePolicy(policyForm);
      setPolicyDialogOpen(false);
      loadData();
      setPolicyForm({
        policyName: '',
        policyType: 'access',
        description: '',
        entityId: undefined,
        isActive: true,
      });
    } catch (error) {
      console.error('Error creating policy:', error);
    }
  };

  const renderEntityTree = (entities: any[], level = 0) => {
    return entities.map(entity => (
      <React.Fragment key={entity.id}>
        <TableRow>
          <TableCell sx={{ pl: level * 4 + 2 }}>
            {level > 0 && '↳ '}
            {entity.entityName}
          </TableCell>
          <TableCell>
            <Chip label={entity.entityType} size="small" />
          </TableCell>
          <TableCell>{entity.country}</TableCell>
          <TableCell>{entity.currency}</TableCell>
          <TableCell>{entity.language}</TableCell>
          <TableCell>
            <Chip
              label={entity.isActive ? 'Active' : 'Inactive'}
              color={entity.isActive ? 'success' : 'default'}
              size="small"
            />
          </TableCell>
        </TableRow>
        {entity.children && entity.children.length > 0 && renderEntityTree(entity.children, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <GlobalIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <div>
            <Typography variant="h4" component="h1">
              Multi-Entity Management
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage global entities, regional compliance, and data governance
            </Typography>
          </div>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Entities
              </Typography>
              <Typography variant="h4">{entities.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                {entities.filter(e => e.isActive).length} active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Compliance Requirements
              </Typography>
              <Typography variant="h4">{regionalCompliance.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                {regionalCompliance.filter(c => c.isActive).length} active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Governance Policies
              </Typography>
              <Typography variant="h4">{governancePolicies.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                {governancePolicies.filter(p => p.isActive).length} active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Entity Management" />
          <Tab label="Regional Compliance" />
          <Tab label="Data Governance" />
        </Tabs>
      </Paper>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Entity Management Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            <HierarchyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Organization Hierarchy
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setEntityDialogOpen(true)}
          >
            Add Entity
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Entity Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entityHierarchy.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No entities created. Add your first entity to start managing a multi-entity structure.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                renderEntityTree(entityHierarchy)
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Regional Compliance Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            <ComplianceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Regional Compliance Requirements
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setComplianceDialogOpen(true)}
          >
            Add Requirement
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Region</TableCell>
                <TableCell>Regulation</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Scopes</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Next Deadline</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {regionalCompliance.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No compliance requirements defined. Add requirements to track regional regulations.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                regionalCompliance.map((compliance) => (
                  <TableRow key={compliance.id}>
                    <TableCell>{compliance.region}</TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {compliance.regulationName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {compliance.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={compliance.regulationType} size="small" />
                    </TableCell>
                    <TableCell>{compliance.applicableScopes}</TableCell>
                    <TableCell>{compliance.reportingFrequency}</TableCell>
                    <TableCell>
                      {new Date(compliance.nextDeadline).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={compliance.isActive ? 'Active' : 'Inactive'}
                        color={compliance.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Data Governance Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Data Governance Policies
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setPolicyDialogOpen(true)}
          >
            Add Policy
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Policy Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Entity</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {governancePolicies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No governance policies defined. Add policies to manage data access and retention.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                governancePolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>{policy.policyName}</TableCell>
                    <TableCell>
                      <Chip label={policy.policyType} size="small" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{policy.description}</Typography>
                    </TableCell>
                    <TableCell>
                      {policy.entityId ? `Entity ${policy.entityId}` : 'Global'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={policy.isActive ? 'Active' : 'Inactive'}
                        color={policy.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Create Entity Dialog */}
      <Dialog open={entityDialogOpen} onClose={() => setEntityDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Create Entity</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Entity Name"
                value={entityForm.entityName}
                onChange={(e) => setEntityForm({ ...entityForm, entityName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Entity Type"
                value={entityForm.entityType}
                onChange={(e) => setEntityForm({ ...entityForm, entityType: e.target.value })}
              >
                <MenuItem value="subsidiary">Subsidiary</MenuItem>
                <MenuItem value="division">Division</MenuItem>
                <MenuItem value="facility">Facility</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Parent Entity"
                value={entityForm.parentEntityId || ''}
                onChange={(e) => setEntityForm({ ...entityForm, parentEntityId: e.target.value ? parseInt(e.target.value) : undefined })}
              >
                <MenuItem value="">None (Top Level)</MenuItem>
                {entities.map(entity => (
                  <MenuItem key={entity.id} value={entity.id}>{entity.entityName}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Country"
                value={entityForm.country}
                onChange={(e) => setEntityForm({ ...entityForm, country: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Currency"
                value={entityForm.currency}
                onChange={(e) => setEntityForm({ ...entityForm, currency: e.target.value })}
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="JPY">JPY</MenuItem>
                <MenuItem value="CNY">CNY</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Language"
                value={entityForm.language}
                onChange={(e) => setEntityForm({ ...entityForm, language: e.target.value })}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                <MenuItem value="de">German</MenuItem>
                <MenuItem value="zh">Chinese</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Timezone"
                value={entityForm.timezone}
                onChange={(e) => setEntityForm({ ...entityForm, timezone: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEntityDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateEntity} variant="contained">
            Create Entity
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Compliance Dialog */}
      <Dialog open={complianceDialogOpen} onClose={() => setComplianceDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Compliance Requirement</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Region"
                value={complianceForm.region}
                onChange={(e) => setComplianceForm({ ...complianceForm, region: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Regulation Type"
                value={complianceForm.regulationType}
                onChange={(e) => setComplianceForm({ ...complianceForm, regulationType: e.target.value })}
              >
                <MenuItem value="emissions">Emissions Reporting</MenuItem>
                <MenuItem value="disclosure">Climate Disclosure</MenuItem>
                <MenuItem value="carbon_tax">Carbon Tax</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Regulation Name"
                value={complianceForm.regulationName}
                onChange={(e) => setComplianceForm({ ...complianceForm, regulationName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Description"
                value={complianceForm.description}
                onChange={(e) => setComplianceForm({ ...complianceForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Applicable Scopes"
                value={complianceForm.applicableScopes}
                onChange={(e) => setComplianceForm({ ...complianceForm, applicableScopes: e.target.value })}
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
                select
                label="Reporting Frequency"
                value={complianceForm.reportingFrequency}
                onChange={(e) => setComplianceForm({ ...complianceForm, reportingFrequency: e.target.value })}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="annual">Annual</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Next Deadline"
                InputLabelProps={{ shrink: true }}
                value={complianceForm.nextDeadline}
                onChange={(e) => setComplianceForm({ ...complianceForm, nextDeadline: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setComplianceDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateCompliance} variant="contained">
            Add Requirement
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Policy Dialog */}
      <Dialog open={policyDialogOpen} onClose={() => setPolicyDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Governance Policy</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Policy Name"
                value={policyForm.policyName}
                onChange={(e) => setPolicyForm({ ...policyForm, policyName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Policy Type"
                value={policyForm.policyType}
                onChange={(e) => setPolicyForm({ ...policyForm, policyType: e.target.value })}
              >
                <MenuItem value="access">Access Control</MenuItem>
                <MenuItem value="retention">Data Retention</MenuItem>
                <MenuItem value="privacy">Privacy</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={policyForm.description}
                onChange={(e) => setPolicyForm({ ...policyForm, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Apply to Entity"
                value={policyForm.entityId || ''}
                onChange={(e) => setPolicyForm({ ...policyForm, entityId: e.target.value ? parseInt(e.target.value) : undefined })}
              >
                <MenuItem value="">All Entities (Global)</MenuItem>
                {entities.map(entity => (
                  <MenuItem key={entity.id} value={entity.id}>{entity.entityName}</MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPolicyDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreatePolicy} variant="contained">
            Create Policy
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
