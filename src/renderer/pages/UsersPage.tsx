import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Badge,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  People as PeopleIcon,
  Message as MessageIcon,
  Send as SendIcon,
  Search as SearchIcon,
  MoreVert as MoreIcon,
  Delete as DeleteIcon,
  Reply as ReplyIcon,
  Inbox as InboxIcon,
  Send as SentIcon,
  Circle as OnlineIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  role: string;
  isOnline: boolean;
  lastSeen?: string;
  avatar?: string;
}

interface Message {
  id: number;
  fromUserId: number;
  toUserId: number;
  subject: string;
  body: string;
  timestamp: Date;
  read: boolean;
}

const UsersPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [viewMessageDialog, setViewMessageDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  // Mock data
  const [users] = useState<User[]>([
    { id: 1, username: 'john.doe', firstName: 'John', lastName: 'Doe', email: 'john.doe@company.com', department: 'Sustainability', role: 'Carbon Analyst', isOnline: true },
    { id: 2, username: 'jane.smith', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@company.com', department: 'Operations', role: 'Facility Manager', isOnline: false, lastSeen: '2 hours ago' },
    { id: 3, username: 'mike.johnson', firstName: 'Mike', lastName: 'Johnson', email: 'mike.johnson@company.com', department: 'Finance', role: 'Financial Analyst', isOnline: true },
    { id: 4, username: 'sarah.williams', firstName: 'Sarah', lastName: 'Williams', email: 'sarah.williams@company.com', department: 'Sustainability', role: 'Sustainability Manager', isOnline: false, lastSeen: '1 day ago' },
    { id: 5, username: 'robert.brown', firstName: 'Robert', lastName: 'Brown', email: 'robert.brown@company.com', department: 'IT', role: 'System Administrator', isOnline: true },
  ]);

  const [inbox] = useState<Message[]>([
    { id: 1, fromUserId: 2, toUserId: 1, subject: 'Q3 Emissions Data', body: 'Hi, I have uploaded the Q3 emissions data for our facility. Can you review it?', timestamp: new Date('2024-01-20T10:30:00'), read: false },
    { id: 2, fromUserId: 4, toUserId: 1, subject: 'Target Review Meeting', body: 'Let\'s schedule a meeting to review our reduction targets for next year.', timestamp: new Date('2024-01-19T14:15:00'), read: true },
    { id: 3, fromUserId: 3, toUserId: 1, subject: 'Carbon Pricing Analysis', body: 'Can you provide the latest carbon pricing scenarios for our budget planning?', timestamp: new Date('2024-01-18T09:45:00'), read: true },
  ]);

  const [sentMessages] = useState<Message[]>([
    { id: 4, fromUserId: 1, toUserId: 2, subject: 'Re: Q3 Emissions Data', body: 'Thanks for uploading. I will review it by end of week.', timestamp: new Date('2024-01-20T11:00:00'), read: true },
  ]);

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!selectedUser || !messageSubject || !messageBody) {
      alert('Please fill in all fields');
      return;
    }
    // Send message logic would go here
    alert(`Message sent to ${selectedUser.firstName} ${selectedUser.lastName}`);
    setMessageDialogOpen(false);
    setMessageSubject('');
    setMessageBody('');
  };

  const getUserById = (userId: number) => {
    return users.find(u => u.id === userId);
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setViewMessageDialog(true);
  };

  const handleReplyMessage = () => {
    if (selectedMessage) {
      const sender = getUserById(selectedMessage.fromUserId);
      if (sender) {
        setSelectedUser(sender);
        setMessageSubject(`Re: ${selectedMessage.subject}`);
        setViewMessageDialog(false);
        setMessageDialogOpen(true);
      }
    }
  };

  const unreadCount = inbox.filter(m => !m.read).length;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <PeopleIcon color="primary" fontSize="large" />
          Users & Messaging
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with team members and collaborate on carbon reduction initiatives
        </Typography>
      </Box>

      <Paper>
        <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
          <Tab label="User Directory" icon={<PeopleIcon />} iconPosition="start" />
          <Tab
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <InboxIcon />
                Inbox
                {unreadCount > 0 && (
                  <Badge badgeContent={unreadCount} color="error" />
                )}
              </Box>
            }
          />
          <Tab label="Sent Messages" icon={<SentIcon />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Grid container spacing={2}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} md={6} lg={4} key={user.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color={user.isOnline ? 'success' : 'default'}
                      >
                        <Avatar sx={{ width: 56, height: 56 }}>
                          {user.firstName[0]}{user.lastName[0]}
                        </Avatar>
                      </Badge>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">
                          {user.firstName} {user.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{user.username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.role}
                        </Typography>
                        <Chip label={user.department} size="small" sx={{ mt: 1 }} />
                      </Box>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<MessageIcon />}
                        onClick={() => {
                          setSelectedUser(user);
                          setMessageDialogOpen(true);
                        }}
                      >
                        Message
                      </Button>
                    </Box>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <OnlineIcon
                        fontSize="small"
                        sx={{ color: user.isOnline ? 'success.main' : 'text.secondary' }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {user.isOnline ? 'Online' : `Last seen ${user.lastSeen}`}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <List>
            {inbox.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <InboxIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No messages in inbox
                </Typography>
              </Box>
            ) : (
              inbox.map((message) => {
                const sender = getUserById(message.fromUserId);
                return (
                  <React.Fragment key={message.id}>
                    <ListItem
                      button
                      onClick={() => handleViewMessage(message)}
                      sx={{
                        bgcolor: message.read ? 'transparent' : 'action.hover',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          {sender ? `${sender.firstName[0]}${sender.lastName[0]}` : '?'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={message.read ? 'normal' : 'bold'}
                            >
                              {sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown'}
                            </Typography>
                            {!message.read && (
                              <Chip label="NEW" color="primary" size="small" />
                            )}
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              fontWeight={message.read ? 'normal' : 'bold'}
                            >
                              {message.subject}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color="text.secondary">
                              {message.timestamp.toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })
            )}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <List>
            {sentMessages.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <SentIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  No sent messages
                </Typography>
              </Box>
            ) : (
              sentMessages.map((message) => {
                const recipient = getUserById(message.toUserId);
                return (
                  <React.Fragment key={message.id}>
                    <ListItem button onClick={() => handleViewMessage(message)}>
                      <ListItemAvatar>
                        <Avatar>
                          {recipient ? `${recipient.firstName[0]}${recipient.lastName[0]}` : '?'}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`To: ${recipient ? `${recipient.firstName} ${recipient.lastName}` : 'Unknown'}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2">
                              {message.subject}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color="text.secondary">
                              {message.timestamp.toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                );
              })
            )}
          </List>
        </TabPanel>
      </Paper>

      {/* Send Message Dialog */}
      <Dialog
        open={messageDialogOpen}
        onClose={() => setMessageDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedUser ? `Send Message to ${selectedUser.firstName} ${selectedUser.lastName}` : 'Send Message'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Subject"
            value={messageSubject}
            onChange={(e) => setMessageSubject(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            value={messageBody}
            onChange={(e) => setMessageBody(e.target.value)}
            multiline
            rows={6}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Message Dialog */}
      <Dialog
        open={viewMessageDialog}
        onClose={() => setViewMessageDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedMessage && (
          <>
            <DialogTitle>
              {selectedMessage.subject}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  From:{' '}
                  {(() => {
                    const sender = getUserById(selectedMessage.fromUserId);
                    return sender ? `${sender.firstName} ${sender.lastName}` : 'Unknown';
                  })()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedMessage.timestamp.toLocaleString()}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedMessage.body}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setViewMessageDialog(false)}>Close</Button>
              <Button
                variant="outlined"
                startIcon={<ReplyIcon />}
                onClick={handleReplyMessage}
              >
                Reply
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default UsersPage;
