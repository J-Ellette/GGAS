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
import USWDSAlert from '../components/USWDSAlert';
import { USWDSCardGroup } from '../components/USWDSCard';

const COLORS = ['#2e7d32', '#1976d2', '#f57c00'];

const DashboardUSWDS: React.FC = () => {
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
    <main id="main-content" className="ggas-uswds-wrapper">
      {/* Page Header with USWDS styling */}
      <div className="usa-section">
        <div className="grid-container">
          <h1 className="margin-top-0">Dashboard</h1>
          <p className="usa-intro">
            Overview of your greenhouse gas emissions data
          </p>

          {/* Info Alert using USWDS */}
          {calculations.length === 0 && (
            <USWDSAlert type="info" heading="Getting Started">
              No data available yet. Start by adding activity data and calculations to see your emissions dashboard.
            </USWDSAlert>
          )}

          {/* Summary Statistics */}
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <div className="usa-card dashboard-stats-card">
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading">Total Emissions</h3>
                  </div>
                  <div className="usa-card__body">
                    <p className="font-sans-3xl text-bold text-primary margin-0">
                      {Math.round(totalEmissions).toLocaleString()}
                    </p>
                    <p className="text-base margin-top-1">kg CO2e</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tablet:grid-col-4">
              <div className="usa-card dashboard-stats-card">
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading">Calculations</h3>
                  </div>
                  <div className="usa-card__body">
                    <p className="font-sans-3xl text-bold text-primary margin-0">
                      {calculations.length}
                    </p>
                    <p className="text-base margin-top-1">Total calculations performed</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tablet:grid-col-4">
              <div className="usa-card dashboard-stats-card">
                <div className="usa-card__container">
                  <div className="usa-card__header">
                    <h3 className="usa-card__heading">Data Quality</h3>
                  </div>
                  <div className="usa-card__body">
                    <p className="font-sans-3xl text-bold text-primary margin-0">85%</p>
                    <p className="text-base margin-top-1">Average quality score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid-row grid-gap margin-top-4">
            {/* Emissions by Scope */}
            <div className="tablet:grid-col-6">
              <div className="chart-container">
                <h2 className="font-heading-lg margin-top-0">Emissions by Scope</h2>
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
                  <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p className="text-base-dark">
                      No data available. Start by adding activity data and calculations.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Emissions by Time Period */}
            <div className="tablet:grid-col-6">
              <div className="chart-container">
                <h2 className="font-heading-lg margin-top-0">Emissions Trend</h2>
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
                  <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <p className="text-base-dark">
                      No data available. Start by adding activity data and calculations.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Calculations Table */}
          {calculations.length > 0 && (
            <div className="margin-top-4">
              <h2 className="font-heading-lg">Recent Calculations</h2>
              <div className="table-responsive">
                <table className="usa-table usa-table--striped">
                  <caption className="usa-sr-only">Recent emissions calculations</caption>
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Scope</th>
                      <th scope="col">Source</th>
                      <th scope="col" className="text-right">Emissions (kg CO2e)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {calculations.slice(0, 5).map((calc, index) => (
                      <tr key={index}>
                        <td>{calc.timePeriod || 'N/A'}</td>
                        <td>Scope {calc.scope}</td>
                        <td>{calc.emissionSource || 'N/A'}</td>
                        <td className="text-right">{Math.round(calc.result).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DashboardUSWDS;
