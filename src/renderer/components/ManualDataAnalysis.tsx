import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  FilterList as FilterIcon,
  TableChart as TableIcon,
  TrendingUp as TrendIcon,
  Calculate as CalculateIcon,
} from '@mui/icons-material';
import { ActivityData } from '../../common/types';

interface StatisticsSummary {
  count: number;
  sum: string;
  average: string;
  max: string;
  min: string;
  stdDev: string;
}

/**
 * Manual Data Analysis Component
 * Provides traditional statistical analysis without AI
 */
export default function ManualDataAnalysis() {
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [filters, setFilters] = useState({
    organizationUnit: '',
    timePeriod: '',
    emissionSource: '',
  });
  const [statistics, setStatistics] = useState<StatisticsSummary | null>(null);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    try {
      const data = await window.electronAPI.listActivityData(filters);
      setActivityData(data);
      calculateStatistics(data);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateStatistics = (data: ActivityData[]) => {
    if (data.length === 0) {
      setStatistics(null);
      return;
    }

    // Filter out invalid entries and extract numeric values
    const validData = data.filter(d => d.value != null && typeof d.value === 'number');
    if (validData.length === 0) {
      setStatistics(null);
      return;
    }

    const values = validData.map(d => d.value);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    
    // Calculate standard deviation
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(avgSquareDiff);

    setStatistics({
      count: data.length,
      sum: sum.toFixed(2),
      average: avg.toFixed(2),
      max: max.toFixed(2),
      min: min.toFixed(2),
      stdDev: stdDev.toFixed(2),
    });
  };

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      organizationUnit: '',
      timePeriod: '',
      emissionSource: '',
    });
  };

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Manual Analysis Mode:</strong> Using traditional statistical methods and manual filtering.
          Data is analyzed using standard calculations without AI predictions or anomaly detection.
        </Typography>
      </Alert>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <FilterIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Data Filters</Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="Organization Unit"
                value={filters.organizationUnit}
                onChange={(e) => handleFilterChange('organizationUnit', e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Time Period"
                value={filters.timePeriod}
                onChange={(e) => handleFilterChange('timePeriod', e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                label="Emission Source"
                value={filters.emissionSource}
                onChange={(e) => handleFilterChange('emissionSource', e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button 
                variant="outlined" 
                onClick={handleClearFilters}
                fullWidth
              >
                Clear Filters
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      {statistics && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalculateIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Statistical Summary</Typography>
            </Box>
            
            <Grid container spacing={2}>
              <Grid item xs={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Count</Typography>
                  <Typography variant="h6">{statistics.count}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Sum</Typography>
                  <Typography variant="h6">{statistics.sum}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Average</Typography>
                  <Typography variant="h6">{statistics.average}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Max</Typography>
                  <Typography variant="h6">{statistics.max}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Min</Typography>
                  <Typography variant="h6">{statistics.min}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} md={2}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="caption" color="text.secondary">Std Dev</Typography>
                  <Typography variant="h6">{statistics.stdDev}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Data Table */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TableIcon sx={{ mr: 1 }} />
            <Typography variant="h6">Activity Data ({activityData.length} records)</Typography>
          </Box>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Organization Unit</TableCell>
                  <TableCell>Time Period</TableCell>
                  <TableCell>Emission Source</TableCell>
                  <TableCell>Activity Type</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Data Quality</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.organizationUnit}</TableCell>
                    <TableCell>{row.timePeriod}</TableCell>
                    <TableCell>{row.emissionSource}</TableCell>
                    <TableCell>{row.activityType}</TableCell>
                    <TableCell align="right">{row.value.toFixed(2)}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`${(row.dataQuality * 100).toFixed(0)}%`}
                        size="small"
                        color={row.dataQuality > 0.8 ? 'success' : row.dataQuality > 0.5 ? 'warning' : 'error'}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {activityData.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No data found. Adjust filters or add activity data.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Alert severity="success" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Manual Analysis Benefits:</strong> Complete control over data filtering and calculation methods.
          No dependency on external AI services. All calculations are transparent and auditable.
        </Typography>
      </Alert>
    </Box>
  );
}
