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
  Tooltip,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  Business as BusinessIcon,
  Analytics as AnalyticsIcon,
  CompareArrows as CompareIcon,
  Gavel as TaxIcon,
  Security as SecurityIcon,
  Handshake as HandshakeIcon,
  Description as DocumentIcon,
} from '@mui/icons-material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import {
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Update as UpdateIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

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

const Phase13Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('US');

  // Constants for budget thresholds
  const BUDGET_WARNING_THRESHOLD = 75; // Yellow warning at 75%
  const BUDGET_CRITICAL_THRESHOLD = 90; // Red alert at 90%
  const CURRENT_BUDGET_USAGE = 85; // Current usage percentage

  // Utility function for currency formatting
  const formatMillions = (amount: number): string => {
    return (amount / 1000000).toFixed(1) + 'M';
  };

  // Mock data for Carbon Accounting
  const carbonAccounts = [
    { code: '1000', name: 'Carbon Assets', balance: 15000, type: 'Asset' },
    { code: '2000', name: 'Carbon Liabilities', balance: 8500, type: 'Liability' },
    { code: '3000', name: 'Carbon Equity', balance: 6500, type: 'Equity' },
    { code: '4000', name: 'Carbon Revenue (Credits)', balance: 12000, type: 'Revenue' },
    { code: '5000', name: 'Carbon Expenses (Emissions)', balance: 10500, type: 'Expense' },
  ];

  // Mock data for Carbon Pricing
  const pricingData = [
    { market: 'EU ETS', currentPrice: 85.50, forecast30d: 88.20, forecast90d: 92.00, change: '+2.3%' },
    { market: 'California Cap-and-Trade', currentPrice: 28.75, forecast30d: 29.50, forecast90d: 31.00, change: '+1.8%' },
    { market: 'UK ETS', currentPrice: 45.30, forecast30d: 46.80, forecast90d: 48.50, change: '+3.1%' },
    { market: 'Internal Shadow Price', currentPrice: 50.00, forecast30d: 50.00, forecast90d: 55.00, change: '0.0%' },
  ];

  // Mock data for Green Finance
  const sustainabilityLoans = [
    { id: 'SLL-001', lender: 'Green Bank Corp', amount: 50000000, rate: 3.5, kpi: 'Reduce emissions by 30%', status: 'On Track', performance: 85 },
    { id: 'SLL-002', lender: 'EcoFinance Ltd', amount: 25000000, rate: 4.0, kpi: 'Renewable energy to 50%', status: 'At Risk', performance: 68 },
  ];

  const greenBonds = [
    { id: 'GB-2024-001', amount: 100000000, issued: '2024-01-15', maturity: '2034-01-15', rate: 3.25, allocated: 75000000, impact: '125,000 tCO2e avoided' },
  ];

  // Mock data for Carbon Tax
  const carbonTaxCalculations = [
    { jurisdiction: 'Canada', rate: 65, emissions: 150000, taxAmount: 9750000, status: 'Paid', dueDate: '2024-03-31' },
    { jurisdiction: 'EU CBAM', rate: 85.50, emissions: 85000, taxAmount: 7267500, status: 'Pending', dueDate: '2024-04-30' },
    { jurisdiction: 'Singapore', rate: 25, emissions: 45000, taxAmount: 1125000, status: 'Paid', dueDate: '2024-02-28' },
  ];

  // Mock data for ERP Integration
  const erpConnections = [
    { system: 'SAP S/4HANA', status: 'Connected', lastSync: '2024-01-20 09:15', records: 1250 },
    { system: 'Oracle ERP Cloud', status: 'Connected', lastSync: '2024-01-20 09:10', records: 850 },
    { system: 'Microsoft Dynamics 365', status: 'Offline', lastSync: '2024-01-19 18:30', records: 420 },
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Phase 13: Carbon-Financial Integration Suite
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Comprehensive integration of carbon accounting with financial systems, carbon pricing, green finance, and enterprise resource planning.
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ mb: 3 }}>
        <Tab label="Integrated Accounting" icon={<AccountBalanceIcon />} iconPosition="start" />
        <Tab label="Carbon Pricing" icon={<MoneyIcon />} iconPosition="start" />
        <Tab label="Green Finance" icon={<HandshakeIcon />} iconPosition="start" />
        <Tab label="Carbon Tax" icon={<TaxIcon />} iconPosition="start" />
        <Tab label="ERP Integration" icon={<BusinessIcon />} iconPosition="start" />
      </Tabs>

      {/* Integrated Accounting Systems */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    <AccountBalanceIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Double-Entry Carbon Accounting
                  </Typography>
                  <Box>
                    <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ mr: 1 }}>
                      Refresh
                    </Button>
                    <Button variant="contained" startIcon={<DownloadIcon />}>
                      Export
                    </Button>
                  </Box>
                </Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Carbon accounting follows double-entry bookkeeping principles with debits and credits mirroring financial accounting.
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Account Code</strong></TableCell>
                        <TableCell><strong>Account Name</strong></TableCell>
                        <TableCell><strong>Type</strong></TableCell>
                        <TableCell align="right"><strong>Balance (tCO2e)</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carbonAccounts.map((account) => (
                        <TableRow key={account.code} hover>
                          <TableCell>{account.code}</TableCell>
                          <TableCell>{account.name}</TableCell>
                          <TableCell>
                            <Chip 
                              label={account.type} 
                              size="small"
                              color={account.type === 'Asset' ? 'success' : account.type === 'Liability' ? 'error' : 'default'}
                            />
                          </TableCell>
                          <TableCell align="right">{account.balance.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Carbon Budgeting
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Annual Budget: 500,000 tCO2e
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Actual YTD: 425,000 tCO2e
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={CURRENT_BUDGET_USAGE} 
                    sx={{ mt: 1, mb: 1, height: 10, borderRadius: 5 }}
                    color={CURRENT_BUDGET_USAGE > BUDGET_CRITICAL_THRESHOLD ? 'error' : CURRENT_BUDGET_USAGE > BUDGET_WARNING_THRESHOLD ? 'warning' : 'success'}
                  />
                  <Typography variant="body2" color={CURRENT_BUDGET_USAGE > BUDGET_CRITICAL_THRESHOLD ? 'error' : CURRENT_BUDGET_USAGE > BUDGET_WARNING_THRESHOLD ? 'warning' : 'success.main'}>
                    {CURRENT_BUDGET_USAGE}% of budget used (Q1 complete)
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>Budget by Department</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText primary="Manufacturing" secondary="150,000 tCO2e (30%)" />
                    <Chip label="78% used" size="small" color="success" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Transportation" secondary="120,000 tCO2e (24%)" />
                    <Chip label="92% used" size="small" color="error" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Facilities" secondary="80,000 tCO2e (16%)" />
                    <Chip label="70% used" size="small" color="success" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CompareIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Variance Analysis
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Category</strong></TableCell>
                        <TableCell align="right"><strong>Budget</strong></TableCell>
                        <TableCell align="right"><strong>Actual</strong></TableCell>
                        <TableCell align="right"><strong>Variance</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Scope 1</TableCell>
                        <TableCell align="right">150,000</TableCell>
                        <TableCell align="right">142,500</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label="-5.0%" 
                            size="small" 
                            color="success"
                            icon={<TrendingDownIcon />}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Scope 2</TableCell>
                        <TableCell align="right">180,000</TableCell>
                        <TableCell align="right">195,000</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label="+8.3%" 
                            size="small" 
                            color="error"
                            icon={<TrendingUpIcon />}
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Scope 3</TableCell>
                        <TableCell align="right">170,000</TableCell>
                        <TableCell align="right">162,500</TableCell>
                        <TableCell align="right">
                          <Chip 
                            label="-4.4%" 
                            size="small" 
                            color="success"
                            icon={<TrendingDownIcon />}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Scope 2 emissions exceed budget by 8.3%. Investigate electricity consumption and renewable energy procurement.
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Carbon Pricing Integration */}
      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Dynamic Carbon Pricing Models
                  </Typography>
                  <Button variant="contained" startIcon={<UpdateIcon />}>
                    Update Prices
                  </Button>
                </Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Real-time carbon pricing based on market conditions, regulations, and internal strategies. Prices updated hourly.
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Market/Type</strong></TableCell>
                        <TableCell align="right"><strong>Current Price ($/tCO2e)</strong></TableCell>
                        <TableCell align="right"><strong>30-Day Forecast</strong></TableCell>
                        <TableCell align="right"><strong>90-Day Forecast</strong></TableCell>
                        <TableCell align="right"><strong>24h Change</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pricingData.map((market) => (
                        <TableRow key={market.market} hover>
                          <TableCell>{market.market}</TableCell>
                          <TableCell align="right">
                            <Typography variant="body1" fontWeight="bold">
                              ${market.currentPrice.toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">${market.forecast30d.toFixed(2)}</TableCell>
                          <TableCell align="right">${market.forecast90d.toFixed(2)}</TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={market.change}
                              size="small"
                              color={market.change.startsWith('+') ? 'error' : 'success'}
                              icon={market.change.startsWith('+') ? <TrendingUpIcon /> : <TrendingDownIcon />}
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

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <MoneyIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Shadow Pricing for Investment Decisions
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Internal carbon price used for evaluating capital investments and operational decisions.
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mb: 2 }}>
                  <Typography variant="h4" color="primary" gutterBottom>
                    $50.00 / tCO2e
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current Internal Shadow Price
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>Recent Investment Decisions</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Solar Panel Installation" 
                      secondary="NPV positive with $50 carbon price"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Fleet Electrification" 
                      secondary="Carbon savings justify premium"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Energy Efficiency Upgrades" 
                      secondary="Under review with current pricing"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <SecurityIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Hedging Strategies
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Carbon price risk management and hedging recommendations to stabilize costs.
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  <strong>Recommendation:</strong> Consider forward contracts for 40% of expected 2025 emissions at current EU ETS prices.
                </Alert>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Strategy</strong></TableCell>
                        <TableCell><strong>Coverage</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Forward Contracts 2024</TableCell>
                        <TableCell>200,000 tCO2e</TableCell>
                        <TableCell><Chip label="Active" size="small" color="success" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Options for Q2 2024</TableCell>
                        <TableCell>50,000 tCO2e</TableCell>
                        <TableCell><Chip label="Pending" size="small" color="warning" /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Allowance Banking</TableCell>
                        <TableCell>150,000 tCO2e</TableCell>
                        <TableCell><Chip label="Active" size="small" color="success" /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Green Finance Optimization */}
      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    <HandshakeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Sustainability-Linked Loan Management
                  </Typography>
                  <Button variant="contained" startIcon={<AssessmentIcon />}>
                    Generate Report
                  </Button>
                </Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Track performance against sustainability-linked financing covenants and KPIs.
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Loan ID</strong></TableCell>
                        <TableCell><strong>Lender</strong></TableCell>
                        <TableCell align="right"><strong>Amount</strong></TableCell>
                        <TableCell align="right"><strong>Rate (%)</strong></TableCell>
                        <TableCell><strong>KPI Target</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell align="right"><strong>Performance</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sustainabilityLoans.map((loan) => (
                        <TableRow key={loan.id} hover>
                          <TableCell>{loan.id}</TableCell>
                          <TableCell>{loan.lender}</TableCell>
                          <TableCell align="right">${formatMillions(loan.amount)}</TableCell>
                          <TableCell align="right">{loan.rate.toFixed(2)}%</TableCell>
                          <TableCell>{loan.kpi}</TableCell>
                          <TableCell>
                            <Chip 
                              label={loan.status} 
                              size="small"
                              color={loan.status === 'On Track' ? 'success' : 'warning'}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={loan.performance} 
                                sx={{ width: 100, mr: 1 }}
                                color={loan.performance >= 75 ? 'success' : 'warning'}
                              />
                              <Typography variant="body2">{loan.performance}%</Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <DocumentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Green Bond Reporting
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Automated reporting for green bond proceeds allocation and impact metrics.
                </Typography>
                {greenBonds.map((bond) => (
                  <Box key={bond.id} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="subtitle2">{bond.id}</Typography>
                      <Chip label="Active" size="small" color="success" />
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                        <Typography variant="body1">${formatMillions(bond.amount)}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Allocated</Typography>
                        <Typography variant="body1">${formatMillions(bond.allocated)}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Coupon Rate</Typography>
                        <Typography variant="body1">{bond.rate}%</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="text.secondary">Maturity</Typography>
                        <Typography variant="body1">{bond.maturity}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress 
                          variant="determinate" 
                          value={(bond.allocated / bond.amount) * 100} 
                          sx={{ mt: 1, mb: 1, height: 8, borderRadius: 4 }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {((bond.allocated / bond.amount) * 100).toFixed(0)}% of proceeds allocated
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Alert severity="success" sx={{ mt: 1 }}>
                          <strong>Impact:</strong> {bond.impact}
                        </Alert>
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  ESG Investment Analysis & TCFD Disclosure
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Evaluate carbon performance for ESG investment criteria and generate TCFD-compliant climate risk disclosures.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>ESG Scores</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">A-</Typography>
                        <Typography variant="caption">Environmental</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="info.main">B+</Typography>
                        <Typography variant="caption">Social</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="success.main">A</Typography>
                        <Typography variant="caption">Governance</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>TCFD Pillars</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Governance" secondary="Board oversight documented" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Strategy" secondary="Climate scenarios analyzed" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Risk Management" secondary="Climate risks integrated" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Metrics & Targets" secondary="Scope 1-3 tracked" />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Generate TCFD Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Carbon Tax Management */}
      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    <TaxIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Multi-Jurisdiction Carbon Tax Calculations
                  </Typography>
                  <Box>
                    <TextField
                      select
                      size="small"
                      value={selectedJurisdiction}
                      onChange={(e) => setSelectedJurisdiction(e.target.value)}
                      sx={{ mr: 1, minWidth: 150 }}
                    >
                      <MenuItem value="US">United States</MenuItem>
                      <MenuItem value="EU">European Union</MenuItem>
                      <MenuItem value="CA">Canada</MenuItem>
                      <MenuItem value="ALL">All Jurisdictions</MenuItem>
                    </TextField>
                    <Button variant="contained" startIcon={<DownloadIcon />}>
                      Export Tax Report
                    </Button>
                  </Box>
                </Box>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Handle carbon tax calculations across different regulatory regimes with automatic compliance tracking.
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Jurisdiction</strong></TableCell>
                        <TableCell align="right"><strong>Tax Rate ($/tCO2e)</strong></TableCell>
                        <TableCell align="right"><strong>Emissions (tCO2e)</strong></TableCell>
                        <TableCell align="right"><strong>Tax Amount</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Due Date</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {carbonTaxCalculations.map((tax) => (
                        <TableRow key={tax.jurisdiction} hover>
                          <TableCell>{tax.jurisdiction}</TableCell>
                          <TableCell align="right">${tax.rate.toFixed(2)}</TableCell>
                          <TableCell align="right">{tax.emissions.toLocaleString()}</TableCell>
                          <TableCell align="right">
                            <Typography variant="body1" fontWeight="bold">
                              ${tax.taxAmount.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={tax.status} 
                              size="small"
                              color={tax.status === 'Paid' ? 'success' : 'warning'}
                            />
                          </TableCell>
                          <TableCell>{tax.dueDate}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3}><strong>Total Tax Liability</strong></TableCell>
                        <TableCell align="right">
                          <Typography variant="h6" color="primary">
                            ${carbonTaxCalculations.reduce((sum, tax) => sum + tax.taxAmount, 0).toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell colSpan={2}></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AnalyticsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Tax Optimization Opportunities
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Optimize operations and carbon management for tax efficiency across jurisdictions.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Production Shift Opportunity" 
                      secondary="Moving 15% of production to lower-tax jurisdiction could save $850K annually"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Renewable Energy Investment" 
                      secondary="Solar installation would reduce tax exposure by $1.2M over 5 years"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Offset Purchase Strategy" 
                      secondary="Carbon offsets may be more cost-effective than tax payment in EU"
                    />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Run Optimization Analysis
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <DocumentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Compliance Tracking & Financial Planning
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Monitor compliance with carbon tax regulations and integrate costs into financial forecasts.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>Compliance Status</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LinearProgress 
                      variant="determinate" 
                      value={85} 
                      sx={{ flexGrow: 1, mr: 2, height: 8, borderRadius: 4 }}
                      color="success"
                    />
                    <Typography variant="body2">85%</Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    3 of 4 jurisdictions filed on time
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>Tax Forecast</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Period</strong></TableCell>
                        <TableCell align="right"><strong>Estimated Tax</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Q2 2024</TableCell>
                        <TableCell align="right">$4,250,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Q3 2024</TableCell>
                        <TableCell align="right">$4,500,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Q4 2024</TableCell>
                        <TableCell align="right">$5,100,000</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>FY 2024 Total</strong></TableCell>
                        <TableCell align="right"><strong>$18,100,000</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* ERP Integration */}
      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">
                    <BusinessIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Enterprise Financial System Integration
                  </Typography>
                  <Box>
                    <Button variant="outlined" startIcon={<RefreshIcon />} sx={{ mr: 1 }}>
                      Sync All
                    </Button>
                    <Button variant="contained" startIcon={<AssessmentIcon />}>
                      Integration Report
                    </Button>
                  </Box>
                </Box>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Deep integration with SAP, Oracle, and Microsoft ERP systems for seamless carbon-financial data flow.
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>ERP System</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Last Sync</strong></TableCell>
                        <TableCell align="right"><strong>Records Synced</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {erpConnections.map((erp) => (
                        <TableRow key={erp.system} hover>
                          <TableCell>{erp.system}</TableCell>
                          <TableCell>
                            <Chip 
                              label={erp.status} 
                              size="small"
                              color={erp.status === 'Connected' ? 'success' : 'error'}
                              icon={erp.status === 'Connected' ? <CheckCircleIcon /> : <WarningIcon />}
                            />
                          </TableCell>
                          <TableCell>{erp.lastSync}</TableCell>
                          <TableCell align="right">{erp.records.toLocaleString()}</TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <RefreshIcon />
                            </IconButton>
                            <IconButton size="small" color="default">
                              <DownloadIcon />
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

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <AssessmentIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Management Reporting Integration
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Carbon performance integrated into standard management and investor relations reporting.
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Monthly Management Pack" 
                      secondary="Carbon KPIs included in executive dashboard"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Quarterly Board Reports" 
                      secondary="Emissions vs. targets tracked"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Annual Sustainability Report" 
                      secondary="Financial impact of carbon disclosed"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Investor Relations Materials" 
                      secondary="ESG metrics for investor presentations"
                    />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Generate Report Pack
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <HandshakeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  M&A Carbon-Financial Due Diligence
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Carbon-financial due diligence tools for mergers, acquisitions, and business combinations.
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Alert severity="info">
                    Automated analysis of target companies' carbon liabilities, compliance status, and climate risks.
                  </Alert>
                </Box>
                <Typography variant="subtitle2" gutterBottom>Due Diligence Checklist</Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Historical emissions inventory" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Carbon tax liabilities assessment" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Compliance obligations mapping" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText primary="Climate risk exposure analysis (in progress)" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText primary="Integration cost estimation (pending)" />
                  </ListItem>
                </List>
                <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                  Start New Assessment
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default Phase13Page;
