import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
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
  MenuItem,
  Chip,
  Grid,
  Alert,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { ComplianceReport } from '../../common/types';

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

const ComplianceReportingPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [reports, setReports] = useState<ComplianceReport[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<string>('');
  const [newReport, setNewReport] = useState<Partial<ComplianceReport>>({
    reportType: 'CDP',
    reportingYear: new Date().getFullYear(),
    status: 'draft',
  });

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const data = await window.electronAPI.listComplianceReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to load compliance reports:', error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCreateReport = async () => {
    try {
      await window.electronAPI.createComplianceReport(newReport as ComplianceReport);
      setOpenDialog(false);
      setNewReport({
        reportType: 'CDP',
        reportingYear: new Date().getFullYear(),
        status: 'draft',
      });
      loadReports();
    } catch (error) {
      console.error('Failed to create compliance report:', error);
    }
  };

  const handleExportReport = async (id: number, format: string) => {
    try {
      const result = await window.electronAPI.exportComplianceReport(id, format);
      console.log('Export result:', result);
      alert(result);
    } catch (error) {
      console.error('Failed to export report:', error);
    }
  };

  const handleDeleteReport = async (id: number) => {
    try {
      await window.electronAPI.deleteComplianceReport(id);
      loadReports();
    } catch (error) {
      console.error('Failed to delete report:', error);
    }
  };

  const reportsByType = (type: string) => reports.filter(r => r.reportType === type);

  const reportTypeInfo = {
    CDP: {
      name: 'CDP Climate Change',
      description: 'Carbon Disclosure Project climate change questionnaire for comprehensive climate-related disclosures',
    },
    TCFD: {
      name: 'TCFD Reporting',
      description: 'Task Force on Climate-related Financial Disclosures framework for climate risk reporting',
    },
    GRI: {
      name: 'GRI Standards',
      description: 'Global Reporting Initiative sustainability reporting standards',
    },
    SASB: {
      name: 'SASB Metrics',
      description: 'Sustainability Accounting Standards Board industry-specific sustainability metrics',
    },
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Compliance & Standards Reporting
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Automated compliance reporting with guided workflows for CDP, TCFD, GRI, SASB, and other standards
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                CDP Reports
              </Typography>
              <Typography variant="h3" color="primary">
                {reportsByType('CDP').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                TCFD Reports
              </Typography>
              <Typography variant="h3" color="secondary">
                {reportsByType('TCFD').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                GRI Reports
              </Typography>
              <Typography variant="h3" color="success.main">
                {reportsByType('GRI').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SASB Reports
              </Typography>
              <Typography variant="h3" color="warning.main">
                {reportsByType('SASB').length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Reports" />
          <Tab label="CDP" />
          <Tab label="TCFD" />
          <Tab label="GRI" />
          <Tab label="SASB" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6">All Compliance Reports</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Create Report
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Type</TableCell>
                <TableCell>Reporting Year</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Submitted Date</TableCell>
                <TableCell>Verification</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography color="text.secondary">
                      No compliance reports available. Create your first report above.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <Chip label={report.reportType} color="primary" size="small" />
                    </TableCell>
                    <TableCell>{report.reportingYear}</TableCell>
                    <TableCell>
                      <Chip
                        label={report.status}
                        color={
                          report.status === 'submitted'
                            ? 'success'
                            : report.status === 'verified'
                            ? 'info'
                            : 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {report.submittedDate
                        ? new Date(report.submittedDate).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {report.verificationStatus ? (
                        <Chip label={report.verificationStatus} size="small" />
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleExportReport(report.id!, 'PDF')}
                          title="Export as PDF"
                        >
                          <DownloadIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteReport(report.id!)}
                          title="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {['CDP', 'TCFD', 'GRI', 'SASB'].map((type, index) => (
        <TabPanel key={type} value={tabValue} index={index + 1}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AssignmentIcon fontSize="large" color="primary" />
                <Box>
                  <Typography variant="h6">{reportTypeInfo[type as keyof typeof reportTypeInfo].name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reportTypeInfo[type as keyof typeof reportTypeInfo].description}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => {
                  setNewReport({ ...newReport, reportType: type });
                  setOpenDialog(true);
                }}
              >
                Create {type} Report
              </Button>
            </CardContent>
          </Card>

          <Alert severity="info" sx={{ mb: 3 }}>
            Guided workflow for {type} reporting will walk you through all required disclosures and automatically populate data from your emissions calculations.
          </Alert>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Reporting Year</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportsByType(type).length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography color="text.secondary">
                        No {type} reports available.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  reportsByType(type).map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.reportingYear}</TableCell>
                      <TableCell>
                        <Chip label={report.status} size="small" />
                      </TableCell>
                      <TableCell>
                        {report.createdAt
                          ? new Date(report.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button size="small" variant="outlined">
                            Edit
                          </Button>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleExportReport(report.id!, 'PDF')}
                          >
                            <DownloadIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      ))}

      {/* Create Report Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Compliance Report</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Report Type"
              value={newReport.reportType}
              onChange={(e) => setNewReport({ ...newReport, reportType: e.target.value })}
              fullWidth
              required
              select
            >
              <MenuItem value="CDP">CDP Climate Change</MenuItem>
              <MenuItem value="TCFD">TCFD Reporting</MenuItem>
              <MenuItem value="GRI">GRI Standards</MenuItem>
              <MenuItem value="SASB">SASB Metrics</MenuItem>
            </TextField>
            <TextField
              label="Reporting Year"
              type="number"
              value={newReport.reportingYear}
              onChange={(e) => setNewReport({ ...newReport, reportingYear: parseInt(e.target.value) })}
              fullWidth
              required
            />
            <Alert severity="info">
              This will create a new report template. You can then use the guided workflow to complete the required disclosures.
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleCreateReport} variant="contained" color="primary">
            Create Report
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ComplianceReportingPage;
