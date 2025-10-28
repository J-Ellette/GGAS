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
  Badge,
} from '@mui/material';
import {
  Groups as GroupsIcon,
  EmojiEvents as TrophyIcon,
  PhoneAndroid as MobileIcon,
  Message as MessageIcon,
  Public as GlobalIcon,
  ViewInAr as ThreeDIcon,
  VideoCall as VideoIcon,
  Cloud as CloudIcon,
  Leaderboard as LeaderboardIcon,
  Notifications as NotificationsIcon,
  Folder as FolderIcon,
  Assignment as TaskIcon,
  PersonAdd as PersonAddIcon,
  Share as ShareIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  CameraAlt as CameraIcon,
  Article as ArticleIcon,
  Psychology as AIIcon,
  Build as BuildIcon,
  Science as ScienceIcon,
  Tour as TourIcon,
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

const Phase15Page: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [workspaceDialogOpen, setWorkspaceDialogOpen] = useState(false);
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);

  // Mock data for collaborative workspaces
  const workspaces = [
    { id: 1, name: 'Q1 2024 Carbon Reduction Initiative', members: 12, projects: 5, status: 'Active' },
    { id: 2, name: 'Scope 3 Supply Chain Engagement', members: 8, projects: 3, status: 'Active' },
    { id: 3, name: 'Renewable Energy Transition', members: 15, projects: 7, status: 'Planning' },
    { id: 4, name: 'Net Zero 2030 Strategy', members: 20, projects: 12, status: 'Active' },
  ];

  // Mock data for leaderboard
  const leaderboard = [
    { rank: 1, name: 'Operations Team A', points: 2450, reduction: 15.2, badge: 'gold' },
    { rank: 2, name: 'Facilities Management', points: 2180, reduction: 12.8, badge: 'silver' },
    { rank: 3, name: 'Supply Chain Group', points: 1920, reduction: 10.5, badge: 'bronze' },
    { rank: 4, name: 'Production Team B', points: 1640, reduction: 8.3, badge: 'none' },
    { rank: 5, name: 'IT Department', points: 1420, reduction: 7.1, badge: 'none' },
  ];

  // Mock data for achievements
  const achievements = [
    { id: 1, name: 'Carbon Champion', description: 'Reduced emissions by 10%', earned: true, points: 500 },
    { id: 2, name: 'Data Quality Master', description: 'Achieved 95% data quality', earned: true, points: 300 },
    { id: 3, name: 'Collaboration Hero', description: 'Shared 10 best practices', earned: true, points: 250 },
    { id: 4, name: 'Innovation Leader', description: 'Submitted 5 improvement ideas', earned: false, points: 400 },
    { id: 5, name: 'Net Zero Pioneer', description: 'Lead a net-zero project', earned: false, points: 1000 },
  ];

  // Mock data for mobile field activities
  const fieldActivities = [
    { id: 1, type: 'Site Audit', location: 'Warehouse A', status: 'Completed', date: '2024-01-15', findings: 12 },
    { id: 2, type: 'Equipment Check', location: 'Plant B', status: 'In Progress', date: '2024-01-20', findings: 3 },
    { id: 3, type: 'Emissions Survey', location: 'Office C', status: 'Pending Review', date: '2024-01-18', findings: 8 },
  ];

  // Mock data for 3D models
  const facilityModels = [
    { id: 1, name: 'Manufacturing Plant A', carbonFlow: 'High', optimization: '15% potential', status: 'Active' },
    { id: 2, name: 'Distribution Center B', carbonFlow: 'Medium', optimization: '8% potential', status: 'Active' },
    { id: 3, name: 'Office Complex C', carbonFlow: 'Low', optimization: '5% potential', status: 'Planning' },
  ];

  // Mock data for digital twins
  const digitalTwins = [
    { id: 1, name: 'HVAC System - Building 1', status: 'Synchronized', lastUpdate: '5 min ago', efficiency: 87 },
    { id: 2, name: 'Boiler System - Plant A', status: 'Synchronized', lastUpdate: '2 min ago', efficiency: 92 },
    { id: 3, name: 'Lighting Network - Campus', status: 'Synchronized', lastUpdate: '10 min ago', efficiency: 78 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <GroupsIcon color="primary" fontSize="large" />
          Collaborative Carbon Workspace & Advanced Features
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Team-based carbon management with gamification, mobile tools, 3D visualization, and digital twin integration
        </Typography>
      </Box>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Workspaces" icon={<GroupsIcon />} iconPosition="start" />
        <Tab label="Gamification" icon={<TrophyIcon />} iconPosition="start" />
        <Tab label="Mobile Management" icon={<MobileIcon />} iconPosition="start" />
        <Tab label="Communication" icon={<MessageIcon />} iconPosition="start" />
        <Tab label="Enterprise Features" icon={<GlobalIcon />} iconPosition="start" />
        <Tab label="3D Visualization" icon={<ThreeDIcon />} iconPosition="start" />
        <Tab label="Remote Auditing" icon={<VideoIcon />} iconPosition="start" />
        <Tab label="Digital Twins" icon={<CloudIcon />} iconPosition="start" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Active Workspaces</Typography>
                  <Button
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    onClick={() => setWorkspaceDialogOpen(true)}
                  >
                    Create Workspace
                  </Button>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Workspace Name</TableCell>
                        <TableCell>Members</TableCell>
                        <TableCell>Projects</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {workspaces.map((workspace) => (
                        <TableRow key={workspace.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <FolderIcon color="primary" />
                              {workspace.name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={`${workspace.members} members`} size="small" />
                          </TableCell>
                          <TableCell>
                            <Chip label={`${workspace.projects} projects`} size="small" variant="outlined" />
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={workspace.status}
                              color={workspace.status === 'Active' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">
                              Open
                            </Button>
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
                  <TaskIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Project Management
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Integrated project management tools for carbon reduction initiatives
                </Alert>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Task Assignment & Tracking"
                      secondary="Assign carbon-related tasks across teams"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <ShareIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Knowledge Sharing"
                      secondary="Best practice sharing and organizational learning"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <GroupsIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cross-functional Collaboration"
                      secondary="Sustainability, operations, finance, and procurement teams"
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
                  <ArticleIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Document Collaboration
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Real-time collaborative document editing and version control
                </Alert>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Active Documents
                    </Typography>
                    <Chip label="Carbon Strategy 2024.docx" sx={{ m: 0.5 }} />
                    <Chip label="Supplier Engagement Plan.pdf" sx={{ m: 0.5 }} />
                    <Chip label="Q1 Progress Report.xlsx" sx={{ m: 0.5 }} />
                  </Box>
                  <Button variant="outlined" startIcon={<UploadIcon />}>
                    Upload Document
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <LeaderboardIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Team Leaderboard
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Reduction</TableCell>
                        <TableCell>Badge</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {leaderboard.map((entry) => (
                        <TableRow key={entry.rank}>
                          <TableCell>
                            <Chip
                              label={`#${entry.rank}`}
                              color={entry.rank <= 3 ? 'primary' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{entry.name}</TableCell>
                          <TableCell>
                            <Typography variant="body2" fontWeight="bold">
                              {entry.points}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TrendingUpIcon color="success" fontSize="small" />
                              <Typography variant="body2" color="success.main">
                                {entry.reduction}%
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {entry.badge === 'gold' && <TrophyIcon sx={{ color: 'gold' }} />}
                            {entry.badge === 'silver' && <TrophyIcon sx={{ color: 'silver' }} />}
                            {entry.badge === 'bronze' && <TrophyIcon sx={{ color: '#CD7F32' }} />}
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    <TrophyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Achievements
                  </Typography>
                  <Button size="small" onClick={() => setAchievementDialogOpen(true)}>
                    View All
                  </Button>
                </Box>
                <List>
                  {achievements.slice(0, 3).map((achievement) => (
                    <ListItem
                      key={achievement.id}
                      sx={{
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        mb: 1,
                        opacity: achievement.earned ? 1 : 0.5,
                      }}
                    >
                      <ListItemIcon>
                        {achievement.earned ? (
                          <StarIcon sx={{ color: 'gold' }} />
                        ) : (
                          <StarIcon color="disabled" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={achievement.name}
                        secondary={achievement.description}
                      />
                      <Chip label={`${achievement.points} pts`} size="small" />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Performance Competitions
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Active carbon reduction competitions and challenges
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        Q1 2024
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Energy Efficiency Challenge
                      </Typography>
                      <LinearProgress variant="determinate" value={65} sx={{ mt: 2 }} />
                      <Typography variant="caption">65% Complete</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        25
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Teams Participating
                      </Typography>
                      <Chip label="Join Competition" color="primary" sx={{ mt: 2 }} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        14
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Days Remaining
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                        View Details
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
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
                <Typography variant="h6" gutterBottom>
                  <MobileIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Field Data Collection
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Mobile apps for data collection during site visits and audits with offline capability
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Activity Type</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Findings</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {fieldActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CameraIcon color="primary" />
                              {activity.type}
                            </Box>
                          </TableCell>
                          <TableCell>{activity.location}</TableCell>
                          <TableCell>
                            <Chip
                              label={activity.status}
                              color={
                                activity.status === 'Completed'
                                  ? 'success'
                                  : activity.status === 'In Progress'
                                  ? 'warning'
                                  : 'default'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{activity.date}</TableCell>
                          <TableCell>
                            <Badge badgeContent={activity.findings} color="primary">
                              <AssessmentIcon />
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">
                              Review
                            </Button>
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
                  <NotificationsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Real-time Notifications
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Push notifications for important carbon performance updates
                </Alert>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Badge badgeContent={3} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      primary="Approval Required"
                      secondary="3 items pending your review"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Badge badgeContent={5} color="primary">
                        <MessageIcon />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText primary="New Messages" secondary="5 team updates" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CloudIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Offline Capability
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Full functionality offline with automatic sync when connected
                </Alert>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Sync Status
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CheckIcon color="success" />
                    <Typography variant="body2">
                      All data synchronized - Last sync: 5 minutes ago
                    </Typography>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <MessageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Integrated Messaging
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Built-in communication tools for carbon teams
                </Alert>
                <Box sx={{ height: 300, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 10 }}>
                    Message center - Connect with team members in real-time
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" sx={{ mt: 2 }} startIcon={<MessageIcon />}>
                  Open Chat
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <VideoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Video Conferencing
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Integrated video conferencing for remote collaboration
                </Alert>
                <Box sx={{ height: 300, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 10 }}>
                    Video meeting room - Schedule and join carbon strategy meetings
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" sx={{ mt: 2 }} startIcon={<VideoIcon />}>
                  Start Meeting
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <TaskIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Task Management
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Assign and track carbon-related tasks across teams
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        To Do
                      </Typography>
                      <Chip label="5 tasks" size="small" />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        In Progress
                      </Typography>
                      <Chip label="8 tasks" size="small" color="warning" />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Completed
                      </Typography>
                      <Chip label="12 tasks" size="small" color="success" />
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <GlobalIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Global Team Coordination
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Support for international teams across time zones
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Americas
                      </Typography>
                      <Typography variant="h5">12</Typography>
                      <Typography variant="caption">Active Users</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        EMEA
                      </Typography>
                      <Typography variant="h5">18</Typography>
                      <Typography variant="caption">Active Users</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        APAC
                      </Typography>
                      <Typography variant="h5">9</Typography>
                      <Typography variant="caption">Active Users</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>
                      <Typography variant="h5">39</Typography>
                      <Typography variant="caption">Global Team</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <SettingsIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Enterprise Tool Integration
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Deep integration with Microsoft Teams, Slack, and other platforms
                </Alert>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Microsoft Teams"
                      secondary="Connected - 25 active channels"
                    />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Slack" secondary="Connected - 12 workspaces" />
                    <Chip label="Active" color="success" size="small" />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Google Workspace" secondary="Ready to connect" />
                    <Chip label="Available" size="small" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Security & Compliance
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Enterprise-grade security for sensitive carbon data
                </Alert>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="SOC 2 Type II Compliant"
                      secondary="Annual audit completed"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="ISO 27001 Certified"
                      secondary="Information security management"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="GDPR Compliant"
                      secondary="Data privacy and protection"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={5}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <ThreeDIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Interactive Facility Models
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  3D digital twins showing carbon flows throughout facilities
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Facility Name</TableCell>
                        <TableCell>Carbon Flow</TableCell>
                        <TableCell>Optimization Potential</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {facilityModels.map((model) => (
                        <TableRow key={model.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <ThreeDIcon color="primary" />
                              {model.name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={model.carbonFlow}
                              color={
                                model.carbonFlow === 'High'
                                  ? 'error'
                                  : model.carbonFlow === 'Medium'
                                  ? 'warning'
                                  : 'success'
                              }
                              size="small"
                            />
                          </TableCell>
                          <TableCell>{model.optimization}</TableCell>
                          <TableCell>
                            <Chip
                              label={model.status}
                              color={model.status === 'Active' ? 'success' : 'default'}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined" startIcon={<ThreeDIcon />}>
                              View 3D
                            </Button>
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
                  <BuildIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Process Optimization
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Visual identification of carbon inefficiencies in processes
                </Alert>
                <Box sx={{ height: 200, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 7 }}>
                    3D process flow visualization - Identify optimization opportunities
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <TourIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Virtual Tours
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Remote facility carbon assessment through virtual reality tours
                </Alert>
                <Box sx={{ height: 200, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 7 }}>
                    VR facility tour - Explore carbon footprint remotely
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={6}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <VideoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Virtual Audits
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Conduct carbon audits remotely using AR/VR technology
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="primary">
                        12
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Scheduled Virtual Audits
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                        Schedule New
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="success.main">
                        45
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Completed Audits
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                        View Reports
                      </Button>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" color="warning.main">
                        3
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        In Progress
                      </Typography>
                      <Button variant="outlined" size="small" sx={{ mt: 2 }}>
                        Join Audit
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CameraIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Guided Inspections
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  AR-guided inspections for non-expert personnel
                </Alert>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Step-by-step AR guidance"
                      secondary="Visual overlays for inspection points"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CameraIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Automatic documentation"
                      secondary="Photo and video evidence collection"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="AI-assisted analysis"
                      secondary="Automated finding classification"
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
                  <VideoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Expert Consultation
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Remote expert assistance during on-site activities
                </Alert>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Available Experts
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    <Avatar>JD</Avatar>
                    <Avatar>SK</Avatar>
                    <Avatar>MT</Avatar>
                    <Avatar>+5</Avatar>
                  </Stack>
                  <Button variant="contained" fullWidth sx={{ mt: 2 }} startIcon={<VideoIcon />}>
                    Request Expert
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={7}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <CloudIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Digital Twin Synchronization
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Real-time synchronization with operational data for predictive modeling
                </Alert>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Asset Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Last Update</TableCell>
                        <TableCell>Efficiency</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {digitalTwins.map((twin) => (
                        <TableRow key={twin.id}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CloudIcon color="primary" />
                              {twin.name}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={twin.status} color="success" size="small" />
                          </TableCell>
                          <TableCell>{twin.lastUpdate}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={twin.efficiency}
                                sx={{ width: 100 }}
                              />
                              <Typography variant="body2">{twin.efficiency}%</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Button size="small" variant="outlined">
                              Optimize
                            </Button>
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
                  <ScienceIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Virtual Testing
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  Test carbon reduction strategies in virtual environment before implementation
                </Alert>
                <Box sx={{ height: 200, border: 1, borderColor: 'divider', borderRadius: 1, p: 2 }}>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 7 }}>
                    Scenario testing environment - Simulate carbon impact before deployment
                  </Typography>
                </Box>
                <Button fullWidth variant="contained" sx={{ mt: 2 }} startIcon={<ScienceIcon />}>
                  Run Simulation
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <BuildIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Asset Optimization
                </Typography>
                <Alert severity="success" sx={{ mb: 2 }}>
                  Optimize asset performance for carbon efficiency using digital twin insights
                </Alert>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <TrendingUpIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Predictive Maintenance"
                      secondary="Reduce carbon through optimized maintenance"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AssessmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Performance Analytics"
                      secondary="Real-time carbon efficiency monitoring"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AIIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="AI-powered Optimization"
                      secondary="Automated efficiency recommendations"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <Dialog open={workspaceDialogOpen} onClose={() => setWorkspaceDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Workspace</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Workspace Name"
            placeholder="e.g., Q2 2024 Emissions Reduction"
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            placeholder="Brief description of workspace purpose"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Initial Members"
            defaultValue="team"
            sx={{ mb: 2 }}
          >
            <MenuItem value="team">My Team</MenuItem>
            <MenuItem value="department">Department</MenuItem>
            <MenuItem value="organization">Entire Organization</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setWorkspaceDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => setWorkspaceDialogOpen(false)}>
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={achievementDialogOpen} onClose={() => setAchievementDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>All Achievements</DialogTitle>
        <DialogContent>
          <List>
            {achievements.map((achievement) => (
              <ListItem
                key={achievement.id}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  opacity: achievement.earned ? 1 : 0.5,
                }}
              >
                <ListItemIcon>
                  {achievement.earned ? (
                    <StarIcon sx={{ color: 'gold', fontSize: 40 }} />
                  ) : (
                    <StarIcon color="disabled" sx={{ fontSize: 40 }} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={achievement.name}
                  secondary={
                    <>
                      {achievement.description}
                      <br />
                      {achievement.earned ? 'Earned' : 'Not yet earned'}
                    </>
                  }
                />
                <Chip label={`${achievement.points} pts`} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAchievementDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Phase15Page;
