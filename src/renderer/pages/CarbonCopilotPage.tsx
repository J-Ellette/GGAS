import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  CircularProgress,
  Alert,
  Grid,
  Tab,
  Tabs,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Psychology as AIIcon,
  Send as SendIcon,
  Mic as MicIcon,
  AttachFile as AttachIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  TrendingUp as TrendIcon,
  Warning as WarningIcon,
  Lightbulb as InsightIcon,
  Description as ReportIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  MoreVert as MoreIcon,
  Refresh as RefreshIcon,
  History as HistoryIcon,
  Share as ShareIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'text' | 'insight' | 'recommendation' | 'report';
  metadata?: {
    sources?: string[];
    confidence?: number;
    charts?: any[];
  };
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const CarbonCopilotPage: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [voiceRecording, setVoiceRecording] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with a new conversation
    startNewConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setCurrentConversation(newConversation);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !currentConversation) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
      type: 'text',
    };

    // Update conversation with user message
    const updatedMessages = [...currentConversation.messages, userMessage];
    const updatedConversation = {
      ...currentConversation,
      messages: updatedMessages,
      updatedAt: new Date(),
      title: currentConversation.messages.length === 0 ? input.slice(0, 50) : currentConversation.title,
    };
    setCurrentConversation(updatedConversation);
    setConversations(conversations.map(c => c.id === updatedConversation.id ? updatedConversation : c));
    setInput('');
    setIsLoading(true);

    // Simulate AI response with intelligent analysis
    setTimeout(() => {
      const aiResponse = generateAIResponse(input, updatedMessages);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        type: aiResponse.type,
        metadata: aiResponse.metadata,
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: new Date(),
      };
      setCurrentConversation(finalConversation);
      setConversations(conversations.map(c => c.id === finalConversation.id ? finalConversation : c));
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (query: string, context: Message[]) => {
    const lowerQuery = query.toLowerCase();

    // Pattern recognition for different query types
    if (lowerQuery.includes('scope 2') && (lowerQuery.includes('increase') || lowerQuery.includes('spike'))) {
      return {
        type: 'insight' as const,
        content: `Based on analysis of your emissions data, the 15% increase in Scope 2 emissions in Q3 was primarily driven by:

1. **Increased facility energy consumption** (+22%): The expansion of manufacturing operations at Facility A contributed to a 180 MWh increase in electricity usage.

2. **Grid carbon intensity** (+8%): The regional grid's carbon intensity increased during Q3 due to reduced renewable energy generation and increased coal-fired power generation.

3. **HVAC system inefficiency** (+5%): Temperature extremes in Q3 led to higher cooling requirements.

**Recommendations:**
- Consider installing on-site solar panels at Facility A to offset purchased electricity
- Schedule HVAC maintenance to improve system efficiency
- Explore renewable energy certificates (RECs) or power purchase agreements (PPAs) for cleaner electricity

Would you like me to provide a detailed breakdown by facility or explore reduction scenarios?`,
        metadata: {
          sources: ['Activity Data (Q3 2024)', 'Emission Factors (EPA 2024)', 'Facility Operations Log'],
          confidence: 0.92,
        },
      };
    }

    if (lowerQuery.includes('facilities') && lowerQuery.includes('carbon budget')) {
      return {
        type: 'insight' as const,
        content: `Analysis of facility-level emissions against carbon budgets shows:

**Facilities Exceeding Budget:**
1. Manufacturing Plant North - 127% of budget (1,850 tCO2e vs 1,450 tCO2e target)
2. Distribution Center West - 112% of budget (890 tCO2e vs 795 tCO2e target)

**Root Causes:**
- Manufacturing Plant North: Increased production volume (+18%), older equipment with lower energy efficiency
- Distribution Center West: Longer transport routes, increased diesel consumption

**On-Track Facilities:**
- Office Complex HQ - 87% of budget
- Manufacturing Plant South - 94% of budget (recently upgraded to LED lighting and efficient HVAC)

I can help you develop reduction action plans for the facilities over budget. Would you like me to model potential interventions?`,
        metadata: {
          sources: ['Target Management System', 'Facility Emissions Data', 'Carbon Budgets 2024'],
          confidence: 0.89,
        },
      };
    }

    if (lowerQuery.includes('transport') && (lowerQuery.includes('benchmark') || lowerQuery.includes('compare'))) {
      return {
        type: 'insight' as const,
        content: `Comparison of your transport emissions to industry benchmarks:

**Your Performance:**
- Transport emissions intensity: 0.42 kgCO2e per km
- Modal split: 75% Road, 15% Rail, 10% Air
- Annual transport emissions: 3,250 tCO2e

**Industry Average (Manufacturing Sector):**
- Transport emissions intensity: 0.38 kgCO2e per km
- Modal split: 65% Road, 25% Rail, 10% Air
- You are 10.5% above industry average

**Best-in-Class Performance:**
- Transport emissions intensity: 0.28 kgCO2e per km
- Modal split: 45% Road, 40% Rail, 15% Sea

**Key Opportunities:**
1. Shift more freight from road to rail (potential 25% reduction)
2. Optimize route planning to reduce empty return trips
3. Consider alternative fuel vehicles for fleet

Would you like me to create a detailed transport optimization scenario?`,
        metadata: {
          sources: ['Transport Activity Data', 'Industry Benchmark Database', 'Modal Shift Calculator'],
          confidence: 0.85,
        },
      };
    }

    if (lowerQuery.includes('report') || lowerQuery.includes('summary')) {
      return {
        type: 'report' as const,
        content: `I'll generate a comprehensive emissions report for you.

**Executive Summary - FY 2024**

**Total Emissions:** 15,840 tCO2e
- Scope 1: 4,230 tCO2e (27%)
- Scope 2: 6,890 tCO2e (43%)
- Scope 3: 4,720 tCO2e (30%)

**Year-over-Year Change:** +7.2% increase vs FY 2023
- Primary driver: Business expansion and increased production volume

**Performance vs Targets:**
- Annual reduction target: 5% reduction (MISSED)
- Intensity target: 0.82 tCO2e/unit (ACHIEVED - 0.79 tCO2e/unit)

**Key Highlights:**
✓ Successfully reduced emissions intensity despite growth
✓ Scope 1 emissions decreased 3% due to fuel efficiency improvements
✗ Scope 2 emissions increased 15% due to facility expansion
✓ Supplier engagement program launched covering 60% of Scope 3 emissions

**Top Recommendations:**
1. Accelerate renewable energy procurement (target: 50% by 2025)
2. Implement energy efficiency upgrades at high-emission facilities
3. Enhance supply chain engagement to reduce Scope 3 emissions

Would you like me to export this report or drill down into specific scopes?`,
        metadata: {
          sources: ['Annual Emissions Inventory', 'Target Management', 'Compliance Reports'],
          confidence: 0.95,
        },
      };
    }

    if (lowerQuery.includes('reduction') || lowerQuery.includes('how to reduce')) {
      return {
        type: 'recommendation' as const,
        content: `Based on your current emissions profile and industry best practices, here are prioritized reduction recommendations:

**Quick Wins (0-6 months, Low Cost):**
1. LED lighting retrofit across all facilities - Est. 120 tCO2e/year reduction
2. HVAC schedule optimization - Est. 85 tCO2e/year reduction
3. Employee commute program (carpooling, remote work) - Est. 95 tCO2e/year reduction
**Total Quick Wins:** 300 tCO2e/year, ~1.9% reduction

**Medium-Term (6-18 months, Moderate Investment):**
1. Solar PV installation (500 kW) at Facility A - Est. 450 tCO2e/year reduction
2. Fleet electrification (20 vehicles) - Est. 180 tCO2e/year reduction
3. Waste heat recovery system - Est. 220 tCO2e/year reduction
**Total Medium-Term:** 850 tCO2e/year, ~5.4% reduction

**Strategic (18+ months, High Investment):**
1. Renewable energy PPAs (wind farm) - Est. 3,500 tCO2e/year reduction
2. Process optimization and equipment upgrades - Est. 800 tCO2e/year reduction
3. Supplier engagement (Scope 3 reductions) - Est. 1,200 tCO2e/year reduction
**Total Strategic:** 5,500 tCO2e/year, ~34.7% reduction

**Estimated Total Reduction Potential:** 6,650 tCO2e/year (42% of current emissions)
**Estimated Total Investment:** $2.8M
**Estimated Payback Period:** 4.2 years

Would you like me to create a detailed implementation roadmap for any of these recommendations?`,
        metadata: {
          sources: ['Emissions Analysis', 'Technology Database', 'Cost-Benefit Models'],
          confidence: 0.88,
        },
      };
    }

    // Default response for general queries
    return {
      type: 'text' as const,
      content: `I understand you're asking about "${query}". 

I'm your Carbon Copilot, here to help you with:
- **Emissions Analysis:** Understanding drivers of emissions changes, identifying trends and anomalies
- **Target Management:** Tracking progress toward reduction targets, validating SBTi alignment
- **Compliance:** Preparing reports for CDP, TCFD, GRI, and other frameworks
- **Recommendations:** AI-powered suggestions for reducing emissions and improving data quality
- **Forecasting:** Predicting future emissions based on operational plans and scenarios

Try asking me:
- "What drove our 15% Scope 2 increase in Q3?"
- "Show me facilities exceeding our carbon budget"
- "Compare our transport emissions to industry benchmarks"
- "Generate an executive summary report"
- "What are the best opportunities to reduce emissions?"

How can I assist you today?`,
      metadata: {
        confidence: 0.7,
      },
    };
  };

  const handleVoiceInput = () => {
    setVoiceRecording(!voiceRecording);
    // Placeholder for voice-to-text functionality
    if (!voiceRecording) {
      alert('Voice input feature requires microphone permissions and voice recognition API. This is a demonstration placeholder.');
    }
  };

  const handleExportConversation = () => {
    if (!currentConversation) return;
    
    const exportData = {
      title: currentConversation.title,
      date: currentConversation.createdAt.toISOString(),
      messages: currentConversation.messages.map(m => ({
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
        type: m.type,
      })),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carbon-copilot-${currentConversation.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportDialogOpen(false);
  };

  const quickPrompts = [
    'What are my top emission sources?',
    'Show me year-over-year trends',
    'Generate a compliance report',
    'What reduction opportunities exist?',
    'Compare performance to benchmarks',
  ];

  return (
    <Box sx={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AIIcon color="primary" sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h4">Carbon Copilot</Typography>
              <Typography variant="body2" color="text.secondary">
                AI-Powered Carbon Accounting Assistant
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Conversation History">
              <IconButton onClick={() => setTabValue(1)}>
                <HistoryIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Export Conversation">
              <IconButton onClick={() => setExportDialogOpen(true)}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="New Conversation">
              <IconButton onClick={startNewConversation}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <FormControl size="small" sx={{ minWidth: 100 }}>
              <Select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Español</MenuItem>
                <MenuItem value="fr">Français</MenuItem>
                <MenuItem value="de">Deutsch</MenuItem>
                <MenuItem value="zh">中文</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Alert severity="info" sx={{ mb: 2 }}>
          Ask me about emissions trends, compliance reporting, reduction opportunities, or any carbon accounting question. I understand natural language and can provide contextual insights.
        </Alert>
      </Box>

      <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
        {/* Main Chat Area */}
        <Grid item xs={12} md={9}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Messages */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {!currentConversation || currentConversation.messages.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <BotIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    Welcome to Carbon Copilot
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Start a conversation or try one of these quick prompts:
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                    {quickPrompts.map((prompt, index) => (
                      <Chip
                        key={index}
                        label={prompt}
                        onClick={() => setInput(prompt)}
                        sx={{ maxWidth: 400 }}
                      />
                    ))}
                  </Box>
                </Box>
              ) : (
                <>
                  {currentConversation.messages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: 1,
                          maxWidth: '80%',
                          flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
                        }}
                      >
                        <Avatar sx={{ bgcolor: message.role === 'user' ? 'primary.main' : 'secondary.main' }}>
                          {message.role === 'user' ? <PersonIcon /> : <BotIcon />}
                        </Avatar>
                        <Card
                          sx={{
                            bgcolor: message.role === 'user' ? 'primary.light' : 'background.paper',
                          }}
                        >
                          <CardContent>
                            {message.type && message.type !== 'text' && (
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                                {message.type === 'insight' && <InsightIcon fontSize="small" color="info" />}
                                {message.type === 'recommendation' && <TrendIcon fontSize="small" color="success" />}
                                {message.type === 'report' && <ReportIcon fontSize="small" color="primary" />}
                                <Chip label={message.type.toUpperCase()} size="small" />
                              </Box>
                            )}
                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                              {message.content}
                            </Typography>
                            {message.metadata?.sources && (
                              <Box sx={{ mt: 2, pt: 1, borderTop: 1, borderColor: 'divider' }}>
                                <Typography variant="caption" color="text.secondary">
                                  Sources: {message.metadata.sources.join(', ')}
                                </Typography>
                              </Box>
                            )}
                            {message.metadata?.confidence && (
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  Confidence: {(message.metadata.confidence * 100).toFixed(0)}%
                                </Typography>
                              </Box>
                            )}
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                              {message.timestamp.toLocaleTimeString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    </Box>
                  ))}
                  {isLoading && (
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <BotIcon />
                      </Avatar>
                      <Card>
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={20} />
                            <Typography variant="body2">Analyzing your query...</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </Box>

            {/* Input Area */}
            <Divider />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  placeholder="Ask me anything about your carbon emissions, targets, or reporting..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={isLoading}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Tooltip title="Voice Input">
                    <IconButton
                      color={voiceRecording ? 'error' : 'default'}
                      onClick={handleVoiceInput}
                    >
                      <MicIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Send Message">
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                    >
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)}>
              <Tab label="Features" />
              <Tab label="History" />
            </Tabs>
            
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Capabilities
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon><TrendIcon fontSize="small" /></ListItemIcon>
                    <ListItemText
                      primary="Trend Analysis"
                      secondary="Identify patterns in emissions data"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><WarningIcon fontSize="small" /></ListItemIcon>
                    <ListItemText
                      primary="Anomaly Detection"
                      secondary="Spot unusual data points"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><InsightIcon fontSize="small" /></ListItemIcon>
                    <ListItemText
                      primary="AI Insights"
                      secondary="Contextual recommendations"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><ReportIcon fontSize="small" /></ListItemIcon>
                    <ListItemText
                      primary="Smart Reports"
                      secondary="Auto-generated narratives"
                    />
                  </ListItem>
                </List>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <List>
                {conversations.map((conv) => (
                  <ListItem
                    key={conv.id}
                    button
                    selected={currentConversation?.id === conv.id}
                    onClick={() => setCurrentConversation(conv)}
                  >
                    <ListItemText
                      primary={conv.title}
                      secondary={conv.updatedAt.toLocaleDateString()}
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle>Export Conversation</DialogTitle>
        <DialogContent>
          <Typography>
            Export this conversation as a JSON file for reporting or analysis?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleExportConversation} variant="contained">
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarbonCopilotPage;
