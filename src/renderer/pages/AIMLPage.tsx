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
  IconButton,
  LinearProgress,
} from '@mui/material';
import {
  Psychology as AIIcon,
  Warning as WarningIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
  PlayArrow as RunIcon,
  Refresh as RefreshIcon,
  TrendingUp as TrendIcon,
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

export default function AIMLPage() {
  const [tabValue, setTabValue] = useState(0);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [predictiveModels, setPredictiveModels] = useState<any[]>([]);
  const [mlSuggestions, setMLSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [detectDialogOpen, setDetectDialogOpen] = useState(false);
  const [modelDialogOpen, setModelDialogOpen] = useState(false);
  const [detectionThreshold, setDetectionThreshold] = useState(0.7);
  const [selectedDataType, setSelectedDataType] = useState('activity_data');

  useEffect(() => {
    loadData();
  }, [tabValue]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (tabValue === 0) {
        const data = await window.electronAPI.listAnomalies({});
        setAnomalies(data);
      } else if (tabValue === 1) {
        const data = await window.electronAPI.listPredictiveModels();
        setPredictiveModels(data);
      } else if (tabValue === 2) {
        const data = await window.electronAPI.listMLSuggestions({ status: 'pending' });
        setMLSuggestions(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetectAnomalies = async () => {
    setLoading(true);
    try {
      await window.electronAPI.detectAnomalies(selectedDataType, detectionThreshold);
      setDetectDialogOpen(false);
      loadData();
    } catch (error) {
      console.error('Error detecting anomalies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveAnomaly = async (id: number) => {
    try {
      await window.electronAPI.resolveAnomaly(id, 'reviewed');
      loadData();
    } catch (error) {
      console.error('Error resolving anomaly:', error);
    }
  };

  const handleCreateModel = async () => {
    try {
      await window.electronAPI.createPredictiveModel({
        modelType: 'missing_data',
        targetField: 'emissions',
        modelParameters: JSON.stringify({ algorithm: 'linear_regression' })
      });
      setModelDialogOpen(false);
      loadData();
    } catch (error) {
      console.error('Error creating model:', error);
    }
  };

  const handleTrainModel = async (id: number) => {
    setLoading(true);
    try {
      const result = await window.electronAPI.trainModel(id);
      alert(`Model trained successfully! Accuracy: ${(result.accuracy * 100).toFixed(2)}%`);
      loadData();
    } catch (error) {
      console.error('Error training model:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptSuggestion = async (id: number) => {
    try {
      await window.electronAPI.acceptSuggestion(id);
      loadData();
    } catch (error) {
      console.error('Error accepting suggestion:', error);
    }
  };

  const handleRejectSuggestion = async (id: number) => {
    try {
      await window.electronAPI.rejectSuggestion(id);
      loadData();
    } catch (error) {
      console.error('Error rejecting suggestion:', error);
    }
  };

  const getAnomalySeverity = (score: number) => {
    if (score >= 0.9) return { label: 'Critical', color: 'error' as const };
    if (score >= 0.7) return { label: 'High', color: 'warning' as const };
    if (score >= 0.5) return { label: 'Medium', color: 'info' as const };
    return { label: 'Low', color: 'default' as const };
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AIIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <div>
            <Typography variant="h4" component="h1">
              AI/ML Analytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Anomaly detection, predictive models, and intelligent suggestions
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<WarningIcon />}
            onClick={() => setDetectDialogOpen(true)}
          >
            Detect Anomalies
          </Button>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={loadData}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Pending Anomalies
              </Typography>
              <Typography variant="h4">
                {anomalies.filter(a => a.status === 'pending').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Requires review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Active Models
              </Typography>
              <Typography variant="h4">
                {predictiveModels.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Trained and ready
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                ML Suggestions
              </Typography>
              <Typography variant="h4">
                {mlSuggestions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pending review
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)}>
          <Tab label="Anomaly Detection" />
          <Tab label="Predictive Models" />
          <Tab label="ML Suggestions" />
        </Tabs>
      </Paper>

      {loading && <LinearProgress sx={{ mb: 2 }} />}

      {/* Anomaly Detection Tab */}
      <TabPanel value={tabValue} index={0}>
        <Alert severity="info" sx={{ mb: 2 }}>
          Anomalies are automatically detected using statistical analysis and machine learning algorithms.
          Review each anomaly and mark as resolved if valid.
        </Alert>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data Type</TableCell>
                <TableCell>Data ID</TableCell>
                <TableCell>Anomaly Type</TableCell>
                <TableCell>Severity</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Recommendation</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {anomalies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No anomalies detected. Run anomaly detection to find outliers in your data.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                anomalies.map((anomaly) => {
                  const severity = getAnomalySeverity(anomaly.anomalyScore);
                  return (
                    <TableRow key={anomaly.id}>
                      <TableCell>{anomaly.dataType}</TableCell>
                      <TableCell>{anomaly.dataId}</TableCell>
                      <TableCell>{anomaly.anomalyType}</TableCell>
                      <TableCell>
                        <Chip label={severity.label} color={severity.color} size="small" />
                      </TableCell>
                      <TableCell>{(anomaly.anomalyScore * 100).toFixed(1)}%</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ maxWidth: 300 }}>
                          {anomaly.recommendation}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={anomaly.status}
                          color={anomaly.status === 'pending' ? 'warning' : 'success'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {anomaly.status === 'pending' && (
                          <Button
                            size="small"
                            onClick={() => handleResolveAnomaly(anomaly.id)}
                          >
                            Resolve
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Predictive Models Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Alert severity="info" sx={{ flex: 1, mr: 2 }}>
            Predictive models help forecast future emissions and fill in missing data points.
          </Alert>
          <Button
            variant="contained"
            onClick={() => setModelDialogOpen(true)}
          >
            Create Model
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Model Type</TableCell>
                <TableCell>Target Field</TableCell>
                <TableCell>Accuracy</TableCell>
                <TableCell>Last Trained</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predictiveModels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No predictive models created yet. Create a model to start making predictions.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                predictiveModels.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell>{model.modelType}</TableCell>
                    <TableCell>{model.targetField}</TableCell>
                    <TableCell>
                      {model.accuracy ? (
                        <Chip
                          label={`${(model.accuracy * 100).toFixed(1)}%`}
                          color={model.accuracy >= 0.8 ? 'success' : 'warning'}
                          size="small"
                        />
                      ) : (
                        <Chip label="Not trained" size="small" />
                      )}
                    </TableCell>
                    <TableCell>
                      {model.lastTrained
                        ? new Date(model.lastTrained).toLocaleString()
                        : 'Never'}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        startIcon={<RunIcon />}
                        onClick={() => handleTrainModel(model.id)}
                        disabled={loading}
                      >
                        {model.lastTrained ? 'Retrain' : 'Train'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* ML Suggestions Tab */}
      <TabPanel value={tabValue} index={2}>
        <Alert severity="info" sx={{ mb: 2 }}>
          ML suggestions provide intelligent recommendations for data entry and missing values.
          Accept or reject each suggestion.
        </Alert>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source Type</TableCell>
                <TableCell>Suggestion Type</TableCell>
                <TableCell>Suggested Value</TableCell>
                <TableCell>Confidence</TableCell>
                <TableCell>Reasoning</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mlSuggestions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Typography variant="body2" color="text.secondary" sx={{ py: 3 }}>
                      No pending suggestions. ML suggestions appear when the system identifies opportunities for improvement.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                mlSuggestions.map((suggestion) => (
                  <TableRow key={suggestion.id}>
                    <TableCell>{suggestion.sourceType}</TableCell>
                    <TableCell>{suggestion.suggestionType}</TableCell>
                    <TableCell>
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        {suggestion.suggestedValue}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={suggestion.confidence * 100}
                          sx={{ flex: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2">
                          {(suggestion.confidence * 100).toFixed(0)}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300 }}>
                        {suggestion.reasoning}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleAcceptSuggestion(suggestion.id)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleRejectSuggestion(suggestion.id)}
                        >
                          <CancelIcon />
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

      {/* Detect Anomalies Dialog */}
      <Dialog open={detectDialogOpen} onClose={() => setDetectDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Detect Anomalies</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              select
              fullWidth
              label="Data Type"
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
              SelectProps={{ native: true }}
              sx={{ mb: 2 }}
            >
              <option value="activity_data">Activity Data</option>
              <option value="emissions">Emissions</option>
            </TextField>
            <TextField
              fullWidth
              type="number"
              label="Detection Threshold"
              value={detectionThreshold}
              onChange={(e) => setDetectionThreshold(parseFloat(e.target.value))}
              helperText="Sensitivity level (0.5 = medium, 0.7 = high, 0.9 = critical only)"
              inputProps={{ min: 0.1, max: 1, step: 0.1 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetectDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDetectAnomalies} variant="contained" disabled={loading}>
            Detect
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Model Dialog */}
      <Dialog open={modelDialogOpen} onClose={() => setModelDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Predictive Model</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            A new predictive model will be created for forecasting missing data values.
            You can train it after creation.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModelDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateModel} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
