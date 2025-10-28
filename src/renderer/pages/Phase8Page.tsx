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
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  IconButton,
  Divider,
  Snackbar,
} from '@mui/material';
import {
  UploadFile as UploadIcon,
  Email as EmailIcon,
  Extension as ExtensionIcon,
  Security as SecurityIcon,
  Description as DocumentIcon,
  Settings as SettingsIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
  CloudUpload as CloudUploadIcon,
  AutoMode as AutoModeIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  PlayArrow as PlayArrowIcon,
  Approval as ApprovalIcon,
  IntegrationInstructions as IntegrationIcon,
} from '@mui/icons-material';
import { DocumentProcessing, EmailMonitor, BrowserCapture } from '../../common/types';

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

const Phase8Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Document Processing State
  const [documents, setDocuments] = useState<DocumentProcessing[]>([
    {
      id: 1,
      documentName: 'Utility_Bill_Jan_2024.pdf',
      documentType: 'utility_bill',
      fileFormat: 'pdf',
      fileSize: 2048000,
      uploadDate: '2024-01-15',
      processingStatus: 'completed',
      ocrAccuracy: 98.5,
      validationStatus: 'validated',
    },
    {
      id: 2,
      documentName: 'Travel_Receipt_Flight.jpg',
      documentType: 'travel_receipt',
      fileFormat: 'image',
      fileSize: 1024000,
      uploadDate: '2024-01-16',
      processingStatus: 'processing',
      validationStatus: 'pending',
    },
  ]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  // Email Monitoring State
  const [emailMonitors, setEmailMonitors] = useState<EmailMonitor[]>([
    {
      id: 1,
      accountName: 'Carbon Data Inbox',
      emailAddress: 'carbon-data@company.com',
      protocol: 'imap',
      messagesProcessed: 127,
      lastChecked: '2024-01-16T14:30:00',
      isActive: true,
    },
  ]);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);

  // Browser Extension State
  const [browserCaptures, setBrowserCaptures] = useState<BrowserCapture[]>([
    {
      id: 1,
      captureType: 'travel_booking',
      sourceUrl: 'https://www.expedia.com',
      websiteName: 'expedia.com',
      captureDate: '2024-01-15',
      userId: 1,
      processingStatus: 'imported',
      validationStatus: 'validated',
      dataCategory: 'Business Travel',
    },
  ]);

  // Security & Compliance State
  const [securitySettings, setSecuritySettings] = useState({
    gdprCompliance: true,
    ccpaCompliance: true,
    onPremisesProcessing: false,
    auditLogging: true,
    dataEncryption: true,
  });

  // Notification State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });

  const showNotification = (message: string, severity: 'success' | 'error' | 'info' | 'warning' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Maximo Integration State
  const [maximoConfig, setMaximoConfig] = useState({
    enabled: false,
    serverUrl: '',
    apiKey: '',
    lastSync: null,
  });

  // Microsoft SSO State
  const [ssoConfig, setSsoConfig] = useState({
    enabled: false,
    tenantId: '',
    clientId: '',
    autoProvision: false,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
      case 'imported':
        return <CheckCircleIcon color="success" />;
      case 'processing':
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'error':
      case 'failed':
        return <ErrorIcon color="error" />;
      default:
        return <PendingIcon />;
    }
  };

  const handleUploadDocument = () => {
    // Simulate document upload
    setUploadDialogOpen(false);
    showNotification('Document upload initiated. Processing will begin shortly.', 'info');
  };

  const handleTestEmailConnection = (id: number) => {
    showNotification('Email connection test successful!', 'success');
  };

  const handleTestMaximoConnection = () => {
    showNotification('Maximo connection test successful! Connected to Maximo v7.6.1.2', 'success');
  };

  const handleSyncMaximo = () => {
    showNotification('Maximo asset sync initiated. This may take several minutes...', 'info');
  };

  const handleTestMicrosoftSSO = () => {
    showNotification('Microsoft SSO configuration test successful!', 'success');
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoModeIcon color="primary" fontSize="large" />
          Autonomous Data Collection
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Intelligent document processing, email intelligence, browser extension, and enterprise integrations
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documents Processed
              </Typography>
              <Typography variant="h3" color="primary">
                127
              </Typography>
              <Typography variant="body2" color="text.secondary">
                98.5% avg accuracy
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Email Monitors
              </Typography>
              <Typography variant="h3" color="secondary">
                3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                All active
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Browser Captures
              </Typography>
              <Typography variant="h3" color="success.main">
                45
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Compliance Status
              </Typography>
              <Typography variant="h3" color="success.main">
                <VerifiedIcon sx={{ fontSize: 48 }} />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                GDPR & CCPA Compliant
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
            <Tab label="Document Processing" icon={<DocumentIcon />} iconPosition="start" />
            <Tab label="Email Intelligence" icon={<EmailIcon />} iconPosition="start" />
            <Tab label="Browser Extension" icon={<ExtensionIcon />} iconPosition="start" />
            <Tab label="Security & Compliance" icon={<SecurityIcon />} iconPosition="start" />
            <Tab label="Third-Party Integrations" icon={<IntegrationIcon />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Intelligent Document Processing
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload and process documents with AI-powered OCR, template learning, and smart field identification
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Multi-Format Support
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      PDF, Excel, Word, images, scanned documents, emails
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      OCR Accuracy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      99%+ accuracy for printed text, handwriting recognition
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Template Learning
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI learns from repeated document exposure
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={() => setUploadDialogOpen(true)}
              sx={{ mb: 2 }}
            >
              Upload Document
            </Button>

            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>OCR Accuracy</TableCell>
                    <TableCell>Upload Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <DocumentIcon />
                          {doc.documentName}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={doc.documentType} size="small" />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getStatusIcon(doc.processingStatus)}
                          <Chip
                            label={doc.processingStatus}
                            size="small"
                            color={
                              doc.processingStatus === 'completed'
                                ? 'success'
                                : doc.processingStatus === 'processing'
                                ? 'warning'
                                : 'default'
                            }
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        {doc.ocrAccuracy ? (
                          <Box>
                            <Typography variant="body2">{doc.ocrAccuracy}%</Typography>
                            <LinearProgress
                              variant="determinate"
                              value={doc.ocrAccuracy}
                              sx={{ height: 6, borderRadius: 1 }}
                            />
                          </Box>
                        ) : (
                          '-'
                        )}
                      </TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <IconButton size="small" color="primary">
                          <PlayArrowIcon />
                        </IconButton>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="h6" gutterBottom>
              Advanced OCR & Image Processing
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Mobile OCR
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Real-time document scanning using smartphone cameras
                    </Typography>
                    <Button variant="outlined" size="small">
                      Configure Mobile App
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Batch Processing
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Handle large volumes with queue management
                    </Typography>
                    <Button variant="outlined" size="small">
                      View Processing Queue
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Quality Enhancement
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Image preprocessing for improved OCR accuracy
                    </Typography>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Auto-enhance images"
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                      Multi-language Support
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      OCR capabilities for international documents
                    </Typography>
                    <TextField
                      select
                      size="small"
                      defaultValue="en"
                      fullWidth
                      label="Default Language"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                      <MenuItem value="zh">Chinese</MenuItem>
                    </TextField>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Email Intelligence System
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Secure monitoring of designated email accounts for carbon-related communications
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setEmailDialogOpen(true)}
            sx={{ mb: 2 }}
          >
            Add Email Monitor
          </Button>

          <TableContainer component={Paper} variant="outlined" sx={{ mb: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Monitor Name</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Messages Processed</TableCell>
                  <TableCell>Last Checked</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emailMonitors.map((monitor) => (
                  <TableRow key={monitor.id}>
                    <TableCell>{monitor.accountName}</TableCell>
                    <TableCell>{monitor.emailAddress}</TableCell>
                    <TableCell>
                      <Chip
                        label={monitor.isActive ? 'active' : 'inactive'}
                        color={monitor.isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{monitor.messagesProcessed}</TableCell>
                    <TableCell>{monitor.lastChecked ? new Date(monitor.lastChecked).toLocaleString() : 'Never'}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleTestEmailConnection(monitor.id!)}
                      >
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton size="small" color="secondary">
                        <SettingsIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Attachment Processing
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Automatic extraction and processing of attachments
                  </Typography>
                  <Alert severity="info" sx={{ mt: 1 }}>
                    45 attachments processed this month
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Smart Categorization
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Classify emails by emission category and urgency
                  </Typography>
                  <Alert severity="success" sx={{ mt: 1 }}>
                    96% categorization accuracy
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Approval Workflows
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Route extracted data through appropriate approval chains
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Chip label="3 Pending Approvals" color="warning" icon={<ApprovalIcon />} />
                    <Chip label="12 Approved Today" color="success" icon={<CheckCircleIcon />} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Browser Extension Intelligence
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Auto-capture carbon-relevant data while browsing with intelligent recognition
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Auto-capture
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enabled"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Travel Bookings
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enabled"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Supplier Data
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enabled"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    Research Assistant
                  </Typography>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Enabled"
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Capture Type</TableCell>
                  <TableCell>Source</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Capture Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {browserCaptures.map((capture) => (
                  <TableRow key={capture.id}>
                    <TableCell>
                      <Chip label={capture.captureType} size="small" />
                    </TableCell>
                    <TableCell>{capture.websiteName}</TableCell>
                    <TableCell>{capture.dataCategory}</TableCell>
                    <TableCell>
                      <Chip
                        label={capture.processingStatus}
                        color={capture.processingStatus === 'imported' ? 'success' : 'warning'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{capture.captureDate}</TableCell>
                    <TableCell>
                      <IconButton size="small" color="primary">
                        <PlayArrowIcon />
                      </IconButton>
                      <IconButton size="small" color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Browser Extension Installation:</strong> Install the GGAS Browser Extension
              from the Chrome Web Store or Firefox Add-ons to enable automatic data capture.
            </Typography>
          </Alert>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Enterprise Security & Compliance
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            GDPR, CCPA compliant data handling with comprehensive security controls
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Data Privacy
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.gdprCompliance}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              gdprCompliance: e.target.checked,
                            })
                          }
                        />
                      }
                      label="GDPR Compliance"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.ccpaCompliance}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              ccpaCompliance: e.target.checked,
                            })
                          }
                        />
                      }
                      label="CCPA Compliance"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.dataEncryption}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              dataEncryption: e.target.checked,
                            })
                          }
                        />
                      }
                      label="End-to-End Encryption"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Secure Processing
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.onPremisesProcessing}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              onPremisesProcessing: e.target.checked,
                            })
                          }
                        />
                      }
                      label="On-Premises Processing"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={securitySettings.auditLogging}
                          onChange={(e) =>
                            setSecuritySettings({
                              ...securitySettings,
                              auditLogging: e.target.checked,
                            })
                          }
                        />
                      }
                      label="Complete Audit Logging"
                    />
                    <Alert severity="success" sx={{ mt: 1 }}>
                      All security features enabled and operational
                    </Alert>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Audit Trail
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Complete logging of all automated data collection activities
                  </Typography>
                  <Button variant="outlined">View Audit Logs</Button>
                  <Button variant="outlined" sx={{ ml: 1 }}>
                    Export Audit Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Access Controls
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Role-based permissions for automated data access and approval
                  </Typography>
                  <Button variant="outlined">Manage Permissions</Button>
                  <Button variant="outlined" sx={{ ml: 1 }}>
                    User Access Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Third-Party Integrations
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Enterprise integrations with Maximo and Microsoft Single Sign-On
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <IntegrationIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6">IBM Maximo Enterprise Asset Management</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Synchronize asset data and maintenance records with carbon emissions tracking
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={maximoConfig.enabled}
                            onChange={(e) =>
                              setMaximoConfig({ ...maximoConfig, enabled: e.target.checked })
                            }
                          />
                        }
                        label="Enable Maximo Integration"
                      />
                    </Grid>

                    {maximoConfig.enabled && (
                      <>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Maximo Server URL"
                            value={maximoConfig.serverUrl}
                            onChange={(e) =>
                              setMaximoConfig({ ...maximoConfig, serverUrl: e.target.value })
                            }
                            placeholder="https://maximo.company.com"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="API Key"
                            type="password"
                            value={maximoConfig.apiKey}
                            onChange={(e) =>
                              setMaximoConfig({ ...maximoConfig, apiKey: e.target.value })
                            }
                            placeholder="Enter API key"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                              variant="contained"
                              onClick={handleTestMaximoConnection}
                            >
                              Test Connection
                            </Button>
                            <Button variant="contained" color="secondary" onClick={handleSyncMaximo}>
                              Sync Assets
                            </Button>
                            <Button variant="outlined">Configure Mapping</Button>
                          </Box>
                        </Grid>
                        {maximoConfig.lastSync && (
                          <Grid item xs={12}>
                            <Alert severity="success">
                              Last sync: {new Date(maximoConfig.lastSync).toLocaleString()} - 245
                              assets synchronized
                            </Alert>
                          </Grid>
                        )}
                      </>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <SecurityIcon color="primary" sx={{ fontSize: 40 }} />
                    <Box>
                      <Typography variant="h6">Microsoft Single Sign-On (SSO)</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Enable Azure AD authentication for seamless user access
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={ssoConfig.enabled}
                            onChange={(e) =>
                              setSsoConfig({ ...ssoConfig, enabled: e.target.checked })
                            }
                          />
                        }
                        label="Enable Microsoft SSO"
                      />
                    </Grid>

                    {ssoConfig.enabled && (
                      <>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Azure Tenant ID"
                            value={ssoConfig.tenantId}
                            onChange={(e) =>
                              setSsoConfig({ ...ssoConfig, tenantId: e.target.value })
                            }
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Application (Client) ID"
                            value={ssoConfig.clientId}
                            onChange={(e) =>
                              setSsoConfig({ ...ssoConfig, clientId: e.target.value })
                            }
                            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={ssoConfig.autoProvision}
                                onChange={(e) =>
                                  setSsoConfig({
                                    ...ssoConfig,
                                    autoProvision: e.target.checked,
                                  })
                                }
                              />
                            }
                            label="Auto-provision new users"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button variant="contained" onClick={handleTestMicrosoftSSO}>
                              Test SSO Configuration
                            </Button>
                            <Button variant="outlined">Configure Permissions</Button>
                            <Button variant="outlined">View SSO Logs</Button>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Alert severity="info">
                            <Typography variant="body2">
                              <strong>Note:</strong> After configuring SSO, users will be able to
                              sign in using their Microsoft work accounts. Existing users will need
                              to link their accounts on first SSO login.
                            </Typography>
                          </Alert>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Document</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ height: 120, mb: 2 }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <UploadIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography>Click to select file or drag and drop</Typography>
                <Typography variant="caption" color="text.secondary">
                  PDF, Excel, Word, Images (Max 50MB)
                </Typography>
              </Box>
              <input type="file" hidden accept=".pdf,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png" />
            </Button>

            <TextField
              select
              fullWidth
              label="Document Type"
              defaultValue="utility_bill"
              margin="normal"
            >
              <MenuItem value="utility_bill">Utility Bill</MenuItem>
              <MenuItem value="invoice">Invoice</MenuItem>
              <MenuItem value="travel_receipt">Travel Receipt</MenuItem>
              <MenuItem value="report">Report</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>

            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Process automatically with OCR"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUploadDocument} variant="contained">
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={emailDialogOpen} onClose={() => setEmailDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Email Monitor</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Monitor Name"
              placeholder="e.g., Carbon Data Inbox"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="email@company.com"
              margin="normal"
            />
            <TextField
              select
              fullWidth
              label="Protocol"
              defaultValue="imap"
              margin="normal"
            >
              <MenuItem value="imap">IMAP</MenuItem>
              <MenuItem value="pop3">POP3</MenuItem>
              <MenuItem value="exchange">Exchange</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Server"
              placeholder="imap.gmail.com"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmailDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              setEmailDialogOpen(false);
              showNotification('Email monitor added successfully!', 'success');
            }}
            variant="contained"
          >
            Add Monitor
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Phase8Page;
