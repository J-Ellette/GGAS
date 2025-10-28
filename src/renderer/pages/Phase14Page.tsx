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
  Avatar,
  Stack,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Assessment as AssessmentIcon,
  Star as StarIcon,
  EmojiEvents as TrophyIcon,
  CompareArrows as CompareIcon,
  Lightbulb as LightbulbIcon,
  Campaign as CampaignIcon,
  Message as MessageIcon,
  Article as ArticleIcon,
  AccountTree as StrategyIcon,
  Gavel as GovernanceIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Edit as EditIcon,
  Insights as InsightsIcon,
  Groups as GroupsIcon,
  Public as PublicIcon,
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

const Phase14Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedRatingAgency, setSelectedRatingAgency] = useState('MSCI');
  const [selectedStakeholder, setSelectedStakeholder] = useState('Investors');
  const [reportDialogOpen, setReportDialogOpen] = useState(false);

  // Mock data for ESG metrics
  const esgMetrics = {
    environmental: { score: 85, trend: 'up', change: 5 },
    social: { score: 78, trend: 'up', change: 3 },
    governance: { score: 82, trend: 'stable', change: 0 },
    overall: { score: 82, rating: 'A' },
  };

  // Mock data for carbon metrics
  const carbonMetrics = {
    totalEmissions: 125000,
    reductionTarget: 150000,
    progress: 83.3,
    intensity: 45.2,
  };

  // Mock data for stakeholder groups
  const stakeholders = [
    { name: 'Investors', satisfaction: 85, engagement: 92, priority: 'High' },
    { name: 'Customers', satisfaction: 78, engagement: 75, priority: 'High' },
    { name: 'Employees', satisfaction: 88, engagement: 95, priority: 'High' },
    { name: 'Regulators', satisfaction: 90, engagement: 85, priority: 'Medium' },
    { name: 'Community', satisfaction: 72, engagement: 65, priority: 'Medium' },
  ];

  // Mock data for ESG ratings
  const esgRatings = [
    { agency: 'MSCI', current: 'A', target: 'AA', gap: 8, priority: ['Scope 3', 'Water', 'Diversity'] },
    { agency: 'Sustainalytics', current: '18.5', target: '15.0', gap: 3.5, priority: ['Emissions', 'Governance', 'Supply Chain'] },
    { agency: 'CDP', current: 'A-', target: 'A', gap: 0.5, priority: ['Disclosure', 'Targets', 'Engagement'] },
    { agency: 'S&P Global', current: '65', target: '75', gap: 10, priority: ['Social', 'Climate Risk', 'Innovation'] },
  ];

  // Mock data for peer comparison
  const peerComparison = [
    { company: 'Our Company', esg: 82, carbon: 45.2, social: 78, governance: 82 },
    { company: 'Peer A', esg: 85, carbon: 42.0, social: 82, governance: 88 },
    { company: 'Peer B', esg: 79, carbon: 51.3, social: 75, governance: 80 },
    { company: 'Industry Avg', esg: 75, carbon: 55.0, social: 72, governance: 76 },
  ];

  // Mock data for materiality matrix
  const materialityIssues = [
    { issue: 'Climate Change', stakeholder: 90, business: 95, category: 'Environmental' },
    { issue: 'Energy Efficiency', stakeholder: 75, business: 85, category: 'Environmental' },
    { issue: 'Water Management', stakeholder: 65, business: 70, category: 'Environmental' },
    { issue: 'Employee Safety', stakeholder: 95, business: 90, category: 'Social' },
    { issue: 'Diversity & Inclusion', stakeholder: 85, business: 75, category: 'Social' },
    { issue: 'Board Independence', stakeholder: 80, business: 85, category: 'Governance' },
    { issue: 'Ethics & Compliance', stakeholder: 88, business: 92, category: 'Governance' },
  ];

  const getScoreColor = (score: number): 'error' | 'warning' | 'success' => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUpIcon color="success" />;
    if (trend === 'down') return <TrendingDownIcon color="error" />;
    return <CompareIcon color="action" />;
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StrategyIcon color="primary" fontSize="large" />
          ESG Strategy Orchestrator
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Integrated ESG Dashboard, Stakeholder Impact Analysis, Rating Optimization, and Strategic Communication
        </Typography>
      </Box>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Integrated Dashboard" icon={<DashboardIcon />} iconPosition="start" />
        <Tab label="Stakeholder Impact" icon={<PeopleIcon />} iconPosition="start" />
        <Tab label="Rating Optimization" icon={<StarIcon />} iconPosition="start" />
        <Tab label="Communication" icon={<CampaignIcon />} iconPosition="start" />
        <Tab label="Strategy Integration" icon={<StrategyIcon />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Environmental Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h3" color="success.main">
                    {esgMetrics.environmental.score}
                  </Typography>
                  {getTrendIcon(esgMetrics.environmental.trend)}
                  <Chip label={`+${esgMetrics.environmental.change}`} size="small" color="success" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={esgMetrics.environmental.score}
                  color="success"
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Social Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h3" color="info.main">
                    {esgMetrics.social.score}
                  </Typography>
                  {getTrendIcon(esgMetrics.social.trend)}
                  <Chip label={`+${esgMetrics.social.change}`} size="small" color="info" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={esgMetrics.social.score}
                  color="info"
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Governance Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h3" color="warning.main">
                    {esgMetrics.governance.score}
                  </Typography>
                  {getTrendIcon(esgMetrics.governance.trend)}
                  <Chip label={esgMetrics.governance.change} size="small" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={esgMetrics.governance.score}
                  color="warning"
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Overall ESG Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h3" color="primary">
                    {esgMetrics.overall.rating}
                  </Typography>
                  <Chip label={esgMetrics.overall.score} size="small" color="primary" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={esgMetrics.overall.score}
                  color="primary"
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <InsightsIcon color="primary" />
                  Carbon Performance Integration
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Total Emissions
                    </Typography>
                    <Typography variant="h5">{carbonMetrics.totalEmissions.toLocaleString()} tCO2e</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Reduction Progress
                    </Typography>
                    <Typography variant="h5" color="success.main">
                      {carbonMetrics.progress}%
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LinearProgress
                      variant="determinate"
                      value={carbonMetrics.progress}
                      color="success"
                      sx={{ height: 12, borderRadius: 1 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      Target: {carbonMetrics.reductionTarget.toLocaleString()} tCO2e
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CompareIcon color="primary" />
                  ESG Correlation Analysis
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Carbon ↔ Financial Performance"
                      secondary="Strong positive correlation (r=0.82)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Carbon ↔ Employee Engagement"
                      secondary="Moderate positive correlation (r=0.65)"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Carbon ↔ Customer Satisfaction"
                      secondary="Weak positive correlation (r=0.45)"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssessmentIcon color="primary" />
                  ESG Materiality Matrix
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Carbon materiality shown in context of broader ESG materiality
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Issue</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Stakeholder Impact</TableCell>
                        <TableCell align="right">Business Impact</TableCell>
                        <TableCell align="right">Priority</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {materialityIssues.map((issue) => (
                        <TableRow key={issue.issue}>
                          <TableCell>{issue.issue}</TableCell>
                          <TableCell>
                            <Chip
                              label={issue.category}
                              size="small"
                              color={
                                issue.category === 'Environmental' ? 'success' :
                                issue.category === 'Social' ? 'info' : 'warning'
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            <LinearProgress
                              variant="determinate"
                              value={issue.stakeholder}
                              sx={{ minWidth: 100 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <LinearProgress
                              variant="determinate"
                              value={issue.business}
                              sx={{ minWidth: 100 }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            {issue.stakeholder > 80 && issue.business > 80 ? (
                              <Chip label="Critical" color="error" size="small" />
                            ) : issue.stakeholder > 70 || issue.business > 70 ? (
                              <Chip label="High" color="warning" size="small" />
                            ) : (
                              <Chip label="Medium" size="small" />
                            )}
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
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrophyIcon color="primary" />
                  Stakeholder Value Creation
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {stakeholders.map((stakeholder) => (
                    <Grid item xs={12} md={4} key={stakeholder.name}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            {stakeholder.name}
                          </Typography>
                          <Stack spacing={1}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Satisfaction
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={stakeholder.satisfaction}
                                color={getScoreColor(stakeholder.satisfaction)}
                                sx={{ height: 6, borderRadius: 1 }}
                              />
                              <Typography variant="caption">{stakeholder.satisfaction}%</Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Engagement
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={stakeholder.engagement}
                                color={getScoreColor(stakeholder.engagement)}
                                sx={{ height: 6, borderRadius: 1 }}
                              />
                              <Typography variant="caption">{stakeholder.engagement}%</Typography>
                            </Box>
                            <Chip
                              label={`Priority: ${stakeholder.priority}`}
                              size="small"
                              color={stakeholder.priority === 'High' ? 'error' : 'default'}
                            />
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">Stakeholder Impact Analysis</Typography>
                  <TextField
                    select
                    size="small"
                    value={selectedStakeholder}
                    onChange={(e) => setSelectedStakeholder(e.target.value)}
                    sx={{ minWidth: 200 }}
                  >
                    <MenuItem value="Investors">Investors</MenuItem>
                    <MenuItem value="Customers">Customers</MenuItem>
                    <MenuItem value="Employees">Employees</MenuItem>
                    <MenuItem value="Regulators">Regulators</MenuItem>
                  </TextField>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {selectedStakeholder === 'Investors' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUpIcon color="primary" />
                            Investor Perception Impact
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemText
                                primary="ESG Fund Inclusion"
                                secondary="Eligible for 85% of ESG funds (up from 72%)"
                              />
                              <Chip label="+18%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Valuation Premium"
                                secondary="ESG performance adds 12% to market valuation"
                              />
                              <Chip label="$2.4B" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Cost of Capital"
                                secondary="0.3% reduction in WACC from improved ESG rating"
                              />
                              <Chip label="-30 bps" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Investor Engagement"
                                secondary="Quarterly investor calls dedicated to ESG"
                              />
                              <Chip label="92% attendance" color="success" size="small" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AssessmentIcon color="primary" />
                            Key Investor Metrics
                          </Typography>
                          <Stack spacing={2}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                ESG-Focused Ownership
                              </Typography>
                              <LinearProgress variant="determinate" value={68} sx={{ my: 1, height: 8 }} />
                              <Typography variant="body2">68% of institutional investors</Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Shareholder Proposal Support
                              </Typography>
                              <LinearProgress variant="determinate" value={85} color="success" sx={{ my: 1, height: 8 }} />
                              <Typography variant="body2">85% support for sustainability initiatives</Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                Analyst ESG Coverage
                              </Typography>
                              <LinearProgress variant="determinate" value={92} color="success" sx={{ my: 1, height: 8 }} />
                              <Typography variant="body2">92% of sell-side analysts track ESG</Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {selectedStakeholder === 'Customers' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PublicIcon color="primary" />
                            Customer Preference Analysis
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemText
                                primary="Brand Preference"
                                secondary="72% prefer sustainable brands"
                              />
                              <Chip label="+15%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Price Premium"
                                secondary="Customers willing to pay 8% more"
                              />
                              <Chip label="8%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Net Promoter Score"
                                secondary="ESG leaders score 18 points higher"
                              />
                              <Chip label="+18" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Purchase Influence"
                                secondary="ESG factors influence 45% of B2B decisions"
                              />
                              <Chip label="45%" color="warning" size="small" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <TrendingUpIcon color="primary" />
                            Carbon Performance Correlation
                          </Typography>
                          <Alert severity="success" sx={{ mb: 2 }}>
                            Strong positive correlation between carbon performance and customer satisfaction (r=0.73)
                          </Alert>
                          <Stack spacing={1.5}>
                            <Box>
                              <Typography variant="body2">Low Carbon Products</Typography>
                              <Typography variant="caption" color="text.secondary">
                                35% higher customer retention rate
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2">Carbon Labeling</Typography>
                              <Typography variant="caption" color="text.secondary">
                                22% increase in product awareness
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body2">Sustainability Messaging</Typography>
                              <Typography variant="caption" color="text.secondary">
                                42% improvement in brand perception
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {selectedStakeholder === 'Employees' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <GroupsIcon color="primary" />
                            Employee Engagement Tracking
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemText
                                primary="Sustainability Program Participation"
                                secondary="78% of employees actively engaged"
                              />
                              <Chip label="78%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Green Team Membership"
                                secondary="1,250 employees across 45 locations"
                              />
                              <Chip label="1,250" color="info" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Employee Satisfaction (ESG)"
                                secondary="88% proud of company's sustainability efforts"
                              />
                              <Chip label="88%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Retention Impact"
                                secondary="25% lower turnover in sustainability roles"
                              />
                              <Chip label="-25%" color="success" size="small" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LightbulbIcon color="primary" />
                            Employee Initiatives
                          </Typography>
                          <Stack spacing={1.5}>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="body2" fontWeight="bold">
                                  Carbon Champions Program
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  120 trained carbon champions driving grassroots initiatives
                                </Typography>
                              </CardContent>
                            </Card>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="body2" fontWeight="bold">
                                  Sustainable Commuting
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  45% use public transport, bike, or carpool
                                </Typography>
                              </CardContent>
                            </Card>
                            <Card variant="outlined">
                              <CardContent>
                                <Typography variant="body2" fontWeight="bold">
                                  Innovation Challenges
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  85 employee-led carbon reduction ideas implemented
                                </Typography>
                              </CardContent>
                            </Card>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}

                {selectedStakeholder === 'Regulators' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SecurityIcon color="primary" />
                            Regulatory Impact Assessment
                          </Typography>
                          <List dense>
                            <ListItem>
                              <ListItemText
                                primary="Compliance Status"
                                secondary="100% compliant across all jurisdictions"
                              />
                              <Chip label="100%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Proactive Disclosure"
                                secondary="Exceeds minimum requirements by 35%"
                              />
                              <Chip label="+35%" color="success" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Regulatory Engagement"
                                secondary="Active participant in 12 policy consultations"
                              />
                              <Chip label="12" color="info" size="small" />
                            </ListItem>
                            <ListItem>
                              <ListItemText
                                primary="Early Adoption"
                                secondary="Implementing CSRD 2 years ahead of mandate"
                              />
                              <Chip label="Leader" color="success" size="small" />
                            </ListItem>
                          </List>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <WarningIcon color="warning" />
                            Regulatory Opportunities & Risks
                          </Typography>
                          <Stack spacing={1.5}>
                            <Alert severity="success">
                              <Typography variant="body2" fontWeight="bold">
                                Opportunity: Green Incentives
                              </Typography>
                              <Typography variant="caption">
                                Eligible for $15M in tax credits and grants
                              </Typography>
                            </Alert>
                            <Alert severity="warning">
                              <Typography variant="body2" fontWeight="bold">
                                Risk: CBAM Requirements
                              </Typography>
                              <Typography variant="caption">
                                EU Carbon Border Adjustment impacts 12% of exports
                              </Typography>
                            </Alert>
                            <Alert severity="info">
                              <Typography variant="body2" fontWeight="bold">
                                Watching: SEC Climate Rules
                              </Typography>
                              <Typography variant="caption">
                                Preparing for mandatory climate disclosures
                              </Typography>
                            </Alert>
                          </Stack>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">ESG Rating Agency Integration</Typography>
                  <Button startIcon={<RefreshIcon />} variant="outlined" size="small">
                    Refresh Ratings
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Rating Agency</TableCell>
                        <TableCell>Current Rating</TableCell>
                        <TableCell>Target Rating</TableCell>
                        <TableCell>Gap to Target</TableCell>
                        <TableCell>Priority Areas</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {esgRatings.map((rating) => (
                        <TableRow key={rating.agency}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar sx={{ width: 32, height: 32 }}>{rating.agency[0]}</Avatar>
                              <Typography variant="body2" fontWeight="bold">
                                {rating.agency}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={rating.current} color="primary" />
                          </TableCell>
                          <TableCell>
                            <Chip label={rating.target} color="success" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="warning.main">
                              {rating.gap} points
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                              {rating.priority.map((area) => (
                                <Chip key={area} label={area} size="small" variant="outlined" />
                              ))}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" color="primary">
                              <EditIcon />
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
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LightbulbIcon color="primary" />
                  AI-Powered Improvement Recommendations
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="1" color="error" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Enhance Scope 3 Disclosure"
                      secondary="Improve MSCI rating by 5 points. Implement comprehensive Scope 3 reporting across all 15 categories."
                    />
                    <Button size="small" variant="outlined">
                      Implement
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="2" color="warning" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Strengthen Board Diversity"
                      secondary="Improve Sustainalytics score by 2 points. Add 2 diverse board members with climate expertise."
                    />
                    <Button size="small" variant="outlined">
                      Implement
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="3" color="warning" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Expand Supplier Engagement"
                      secondary="Improve CDP score by 0.5 grade. Engage top 100 suppliers on carbon disclosure and reduction."
                    />
                    <Button size="small" variant="outlined">
                      Implement
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <Chip label="4" color="info" size="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Publish Climate Scenario Analysis"
                      secondary="Align with TCFD requirements. Develop 2°C and 4°C scenarios with financial impacts."
                    />
                    <Button size="small" variant="outlined">
                      Implement
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CompareIcon color="primary" />
                  Peer Comparison Analysis
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Company</TableCell>
                        <TableCell align="right">ESG Score</TableCell>
                        <TableCell align="right">Carbon Int.</TableCell>
                        <TableCell align="right">Social</TableCell>
                        <TableCell align="right">Gov.</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {peerComparison.map((peer) => (
                        <TableRow
                          key={peer.company}
                          sx={{
                            backgroundColor: peer.company === 'Our Company' ? 'action.selected' : 'inherit',
                            fontWeight: peer.company === 'Our Company' ? 'bold' : 'normal',
                          }}
                        >
                          <TableCell>{peer.company}</TableCell>
                          <TableCell align="right">
                            <Chip
                              label={peer.esg}
                              size="small"
                              color={peer.esg >= 80 ? 'success' : 'default'}
                            />
                          </TableCell>
                          <TableCell align="right">{peer.carbon}</TableCell>
                          <TableCell align="right">{peer.social}</TableCell>
                          <TableCell align="right">{peer.governance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Alert severity="info" sx={{ mt: 2 }}>
                  Our Company ranks in top quartile vs. peers on overall ESG performance
                </Alert>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CampaignIcon color="primary" />
                  Automated ESG Reporting
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Annual Sustainability Report
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Comprehensive annual ESG performance report
                        </Typography>
                        <Stack spacing={1}>
                          <Button variant="contained" fullWidth startIcon={<DownloadIcon />}>
                            Generate Report
                          </Button>
                          <Typography variant="caption" color="text.secondary">
                            Last generated: Jan 15, 2024
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Investor ESG Summary
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Quarterly ESG metrics for investor relations
                        </Typography>
                        <Stack spacing={1}>
                          <Button variant="contained" fullWidth startIcon={<DownloadIcon />}>
                            Generate Summary
                          </Button>
                          <Typography variant="caption" color="text.secondary">
                            Last generated: Nov 5, 2024
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Customer Impact Report
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Product carbon footprints and sustainability
                        </Typography>
                        <Stack spacing={1}>
                          <Button variant="contained" fullWidth startIcon={<DownloadIcon />}>
                            Generate Report
                          </Button>
                          <Typography variant="caption" color="text.secondary">
                            Last generated: Oct 28, 2024
                          </Typography>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <MessageIcon color="primary" />
                  Storytelling Tools
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <ArticleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Carbon Reduction Journey"
                      secondary="Interactive timeline of our path to net zero"
                    />
                    <Button size="small">Create</Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <TrophyIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Success Stories"
                      secondary="Employee and customer sustainability wins"
                    />
                    <Button size="small">Create</Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InsightsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Impact Infographics"
                      secondary="Visual narratives of ESG performance"
                    />
                    <Button size="small">Create</Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <PublicIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Stakeholder Testimonials"
                      secondary="Voices from across our ESG community"
                    />
                    <Button size="small">Create</Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PublicIcon color="primary" />
                  Digital Communication Channels
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Corporate Website Integration"
                      secondary="Real-time ESG dashboard embedded"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Investor Relations Portal"
                      secondary="Quarterly ESG updates automated"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Employee Intranet"
                      secondary="Sustainability news and initiatives"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Social Media Integration"
                      secondary="Automated ESG milestone sharing"
                    />
                    <Chip label="Pending" color="warning" size="small" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <WarningIcon color="error" />
                  Crisis Communication Tools
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Rapid response system for ESG-related issues and opportunities
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="error" gutterBottom>
                          Crisis Response Templates
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Pre-approved response templates for common ESG issues
                        </Typography>
                        <Button size="small" variant="outlined" fullWidth>
                          View Templates
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="warning.main" gutterBottom>
                          Stakeholder Alert System
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Multi-channel notification for urgent communications
                        </Typography>
                        <Button size="small" variant="outlined" fullWidth>
                          Configure Alerts
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="success.main" gutterBottom>
                          Media Monitoring
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Real-time tracking of ESG mentions and sentiment
                        </Typography>
                        <Button size="small" variant="outlined" fullWidth>
                          View Dashboard
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StrategyIcon color="primary" />
                  Strategic Planning Integration
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="5-Year ESG Strategy"
                      secondary="Aligned with corporate strategic plan"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Annual ESG Objectives"
                      secondary="Integrated with business unit OKRs"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Capital Allocation"
                      secondary="ESG criteria in investment decisions"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="M&A ESG Due Diligence"
                      secondary="Standardized ESG assessment framework"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrophyIcon color="primary" />
                  Performance Management
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Executive Compensation"
                      secondary="20% of bonus tied to ESG metrics"
                    />
                    <Chip label="20%" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Manager Scorecards"
                      secondary="ESG KPIs in annual reviews"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Team Recognition"
                      secondary="Quarterly sustainability awards"
                    />
                    <Chip label="Q4 2024" color="info" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Innovation Incentives"
                      secondary="Carbon reduction idea bounties"
                    />
                    <Chip label="$50K pool" color="warning" size="small" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <GovernanceIcon color="primary" />
                  Board-Level ESG Oversight
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemText
                      primary="Board ESG Committee"
                      secondary="Quarterly meetings with full ESG review"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Climate Expertise on Board"
                      secondary="3 of 9 directors with climate credentials"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Executive Reporting"
                      secondary="CEO presents ESG strategy quarterly"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Risk Oversight"
                      secondary="Climate risk integrated in enterprise risk framework"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="Stakeholder Engagement"
                      secondary="Annual board meeting with ESG investors"
                    />
                  </ListItem>
                </List>
                <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<ArticleIcon />}>
                  View Board ESG Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon color="primary" />
                  Enterprise Risk Management Integration
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Physical Climate Risks"
                      secondary="Extreme weather impact on operations"
                    />
                    <Chip label="High" color="error" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Transition Risks"
                      secondary="Policy and technology disruption"
                    />
                    <Chip label="Medium" color="warning" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Regulatory Compliance"
                      secondary="Evolving ESG disclosure requirements"
                    />
                    <Chip label="Medium" color="warning" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon color="info" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Reputational Risks"
                      secondary="Stakeholder expectations and activism"
                    />
                    <Chip label="Low" color="success" size="small" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Strategic Opportunities"
                      secondary="Green products and market leadership"
                    />
                    <Chip label="High" color="success" size="small" />
                  </ListItem>
                </List>
                <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<AssessmentIcon />}>
                  View Risk Heat Map
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ESG Strategy Alignment Framework
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  ESG strategy is fully integrated across all enterprise functions
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Strategy
                        </Typography>
                        <Chip label="Aligned" color="success" size="small" sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary" display="block">
                          ESG embedded in 5-year strategic plan
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Operations
                        </Typography>
                        <Chip label="Aligned" color="success" size="small" sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary" display="block">
                          ESG KPIs in operational dashboards
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          Finance
                        </Typography>
                        <Chip label="Aligned" color="success" size="small" sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary" display="block">
                          Carbon accounting in financial systems
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" gutterBottom>
                          HR
                        </Typography>
                        <Chip label="Aligned" color="success" size="small" sx={{ mb: 1 }} />
                        <Typography variant="caption" color="text.secondary" display="block">
                          ESG in compensation and culture
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog open={reportDialogOpen} onClose={() => setReportDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Generate ESG Report</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField select label="Report Type" fullWidth>
              <MenuItem value="annual">Annual Sustainability Report</MenuItem>
              <MenuItem value="investor">Investor ESG Summary</MenuItem>
              <MenuItem value="customer">Customer Impact Report</MenuItem>
              <MenuItem value="employee">Employee Engagement Report</MenuItem>
            </TextField>
            <TextField select label="Time Period" fullWidth>
              <MenuItem value="q4-2024">Q4 2024</MenuItem>
              <MenuItem value="2024">Full Year 2024</MenuItem>
              <MenuItem value="custom">Custom Range</MenuItem>
            </TextField>
            <TextField select label="Format" fullWidth>
              <MenuItem value="pdf">PDF</MenuItem>
              <MenuItem value="pptx">PowerPoint</MenuItem>
              <MenuItem value="web">Web Dashboard</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReportDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Generate
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Phase14Page;
