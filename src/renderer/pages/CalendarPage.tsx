import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  CalendarMonth as CalendarIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Event as EventIcon,
  ChevronLeft as PrevIcon,
  ChevronRight as NextIcon,
  Today as TodayIcon,
} from '@mui/icons-material';

interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  date: Date;
  type: 'deadline' | 'meeting' | 'milestone' | 'reminder';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    type: 'deadline',
    priority: 'medium',
  });

  // Mock events data
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: 1,
      title: 'Q4 Emissions Report Due',
      description: 'Submit quarterly emissions report to regulatory authority',
      date: new Date('2024-01-25'),
      type: 'deadline',
      priority: 'high',
      createdBy: 'John Doe',
    },
    {
      id: 2,
      title: 'Carbon Reduction Strategy Meeting',
      description: 'Review and finalize 2024 carbon reduction strategies',
      date: new Date('2024-01-22'),
      type: 'meeting',
      priority: 'medium',
      createdBy: 'Sarah Williams',
    },
    {
      id: 3,
      title: 'Facility Audit',
      description: 'Annual emissions audit at Manufacturing Plant North',
      date: new Date('2024-01-28'),
      type: 'milestone',
      priority: 'high',
      createdBy: 'Mike Johnson',
    },
    {
      id: 4,
      title: 'Supplier Data Collection',
      description: 'Deadline for suppliers to submit emissions data',
      date: new Date('2024-01-30'),
      type: 'deadline',
      priority: 'high',
      createdBy: 'Jane Smith',
    },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !selectedDate) {
      alert('Please enter event title');
      return;
    }

    const event: CalendarEvent = {
      id: events.length + 1,
      title: newEvent.title,
      description: newEvent.description || '',
      date: selectedDate,
      type: newEvent.type || 'deadline',
      priority: newEvent.priority || 'medium',
      createdBy: 'Current User',
    };

    setEvents([...events, event]);
    setEventDialogOpen(false);
    setNewEvent({
      title: '',
      description: '',
      type: 'deadline',
      priority: 'medium',
    });
    setSelectedDate(null);
  };

  const handleDeleteEvent = (eventId: number) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const renderMonthView = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: React.ReactElement[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<Box key={`empty-${i}`} sx={{ p: 1, minHeight: 120 }} />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = 
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();

      days.push(
        <Box
          key={day}
          sx={{
            p: 1,
            minHeight: 120,
            border: 1,
            borderColor: 'divider',
            bgcolor: isToday ? 'action.selected' : 'background.paper',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
          onClick={() => {
            setSelectedDate(date);
            setEventDialogOpen(true);
          }}
        >
          <Typography
            variant="body2"
            fontWeight={isToday ? 'bold' : 'normal'}
            color={isToday ? 'primary' : 'text.primary'}
          >
            {day}
          </Typography>
          {dayEvents.map((event) => (
            <Chip
              key={event.id}
              label={event.title}
              size="small"
              color={
                event.priority === 'high' ? 'error' :
                event.priority === 'medium' ? 'warning' : 'default'
              }
              sx={{ 
                mt: 0.5, 
                fontSize: '0.7rem',
                height: 20,
                maxWidth: '100%',
                display: 'block',
                textOverflow: 'ellipsis',
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          ))}
        </Box>
      );
    }

    return (
      <Grid container spacing={0}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <Grid item xs={12 / 7} key={day}>
            <Box
              sx={{
                p: 1,
                textAlign: 'center',
                fontWeight: 'bold',
                borderBottom: 2,
                borderColor: 'divider',
              }}
            >
              {day}
            </Box>
          </Grid>
        ))}
        {days.map((day, index) => (
          <Grid item xs={12 / 7} key={index}>
            {day}
          </Grid>
        ))}
      </Grid>
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    return <EventIcon />;
  };

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarIcon color="primary" fontSize="large" />
            Calendar & Deadlines
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track important dates, deadlines, and milestones for your carbon management activities
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setSelectedDate(new Date());
            setEventDialogOpen(true);
          }}
        >
          Add Event
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Paper sx={{ p: 2 }}>
            {/* Calendar Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <IconButton onClick={handlePrevMonth}>
                  <PrevIcon />
                </IconButton>
                <Typography variant="h6">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Typography>
                <IconButton onClick={handleNextMonth}>
                  <NextIcon />
                </IconButton>
                <Button startIcon={<TodayIcon />} onClick={handleToday}>
                  Today
                </Button>
              </Box>
              <ToggleButtonGroup
                value={view}
                exclusive
                onChange={(e, newView) => newView && setView(newView)}
                size="small"
              >
                <ToggleButton value="month">Month</ToggleButton>
                <ToggleButton value="week">Week</ToggleButton>
                <ToggleButton value="day">Day</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Calendar Grid */}
            {view === 'month' && renderMonthView()}
            {view === 'week' && (
              <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                Week view coming soon
              </Typography>
            )}
            {view === 'day' && (
              <Typography variant="body1" color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
                Day view coming soon
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Upcoming Events Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {events
                .filter(e => e.date >= new Date())
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .slice(0, 5)
                .map((event, index) => (
                  <React.Fragment key={event.id}>
                    {index > 0 && <Divider />}
                    <ListItem
                      sx={{ px: 0 }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleDeleteEvent(event.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                            {getTypeIcon(event.type)}
                            <Typography variant="subtitle2">{event.title}</Typography>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="caption" display="block">
                              {event.date.toLocaleDateString()}
                            </Typography>
                            <Chip
                              label={event.priority}
                              size="small"
                              color={getPriorityColor(event.priority)}
                              sx={{ mt: 0.5, height: 18, fontSize: '0.7rem' }}
                            />
                          </>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              {events.filter(e => e.date >= new Date()).length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
                  No upcoming events
                </Typography>
              )}
            </List>
          </Paper>

          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Legend
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="High Priority" size="small" color="error" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="Medium Priority" size="small" color="warning" />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="Low Priority" size="small" />
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Event Dialog */}
      <Dialog open={eventDialogOpen} onClose={() => setEventDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedDate ? `Add Event - ${selectedDate.toLocaleDateString()}` : 'Add Event'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={newEvent.type}
                  label="Type"
                  onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as CalendarEvent['type'] })}
                >
                  <MenuItem value="deadline">Deadline</MenuItem>
                  <MenuItem value="meeting">Meeting</MenuItem>
                  <MenuItem value="milestone">Milestone</MenuItem>
                  <MenuItem value="reminder">Reminder</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newEvent.priority}
                  label="Priority"
                  onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value as CalendarEvent['priority'] })}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEventDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEvent}>
            Add Event
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarPage;
