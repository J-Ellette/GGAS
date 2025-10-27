import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const COLORS = ['#2e7d32', '#1976d2', '#f57c00'];

const Dashboard: React.FC = () => {
  const [calculations, setCalculations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const calcs = await window.electronAPI.listCalculations();
      setCalculations(calcs);
    } catch (error) {
      console.error('Failed to load calculations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals by scope
  const scopeTotals = calculations.reduce((acc: any, calc: any) => {
    const scope = `Scope ${calc.scope}`;
    acc[scope] = (acc[scope] || 0) + calc.result;
    return acc;
  }, {});

  const pieData = Object.keys(scopeTotals).map((key) => ({
    name: key,
    value: Math.round(scopeTotals[key]),
  }));

  // Calculate total emissions
  const totalEmissions = calculations.reduce((sum, calc) => sum + calc.result, 0);

  // Group by time period for trend chart
  const timePeriodData = calculations.reduce((acc: any, calc: any) => {
    const period = calc.timePeriod || 'Unknown';
    if (!acc[period]) {
      acc[period] = { period, scope1: 0, scope2: 0, scope3: 0 };
    }
    acc[period][`scope${calc.scope}`] += calc.result;
    return acc;
  }, {});

  const barData = Object.values(timePeriodData);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Overview of your greenhouse gas emissions data
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Emissions
              </Typography>
              <Typography variant="h4">
                {Math.round(totalEmissions).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                kg CO2e
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Calculations
              </Typography>
              <Typography variant="h4">{calculations.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                Total calculations performed
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Data Quality
              </Typography>
              <Typography variant="h4">85%</Typography>
              <Typography variant="body2" color="text.secondary">
                Average quality score
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Emissions by Scope */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Emissions by Scope
            </Typography>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }: any) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.secondary">
                  No data available. Start by adding activity data and calculations.
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Emissions by Time Period */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Emissions Trend
            </Typography>
            {barData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="scope1" name="Scope 1" fill={COLORS[0]} />
                  <Bar dataKey="scope2" name="Scope 2" fill={COLORS[1]} />
                  <Bar dataKey="scope3" name="Scope 3" fill={COLORS[2]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.secondary">
                  No trend data available
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Recent Calculations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Calculations
            </Typography>
            {calculations.length > 0 ? (
              <Box>
                {calculations.slice(0, 5).map((calc: any, index: number) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      mb: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        <Typography variant="body2" color="text.secondary">
                          Scope {calc.scope}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">
                          {calc.organizationUnit}
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2">{calc.timePeriod}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="body2" align="right">
                          <strong>{Math.round(calc.result).toLocaleString()}</strong> kg CO2e
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary">
                No calculations yet. Add activity data and perform calculations.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
