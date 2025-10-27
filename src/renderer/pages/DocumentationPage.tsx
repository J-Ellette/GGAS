import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Description as DocIcon,
  Search as SearchIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  DataObject as DataIcon,
  Calculate as CalcIcon,
  Assessment as ReportIcon,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Psychology as AIIcon,
  ExpandMore as ExpandMoreIcon,
  Article as ArticleIcon,
  MenuBook as MenuBookIcon,
  School as TutorialIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

interface DocSection {
  id: string;
  title: string;
  icon: React.ReactElement;
  content: string;
  subsections?: Array<{
    title: string;
    content: string;
  }>;
}

const documentationSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: <HomeIcon />,
    content: `Welcome to Green Country: Greenhouse Gas Accounting Software (GGAS). This comprehensive platform helps organizations measure, monitor, and manage their greenhouse gas emissions across all scopes.`,
    subsections: [
      {
        title: 'Installation & Setup',
        content: 'GGAS is a desktop application that runs on Windows, macOS, and Linux. After installation, you\'ll need to enter your license key to activate the software. Admin users can generate and manage license keys from the Admin Panel.',
      },
      {
        title: 'User Roles & Permissions',
        content: 'GGAS supports multiple user roles with different permission levels. Contact your administrator to set up your account with the appropriate role for your responsibilities.',
      },
      {
        title: 'Navigation',
        content: 'Use the left sidebar to navigate between different modules. The main sections include Dashboard, Data Management, Advanced Features, AI & Strategic Planning, and Innovation & Optimization.',
      },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    content: 'The Dashboard provides a comprehensive overview of your organization\'s emissions performance.',
    subsections: [
      {
        title: 'Key Metrics',
        content: 'View total emissions by scope (1, 2, and 3), trends over time, and comparison to targets. The dashboard automatically updates as new data is entered.',
      },
      {
        title: 'Visualizations',
        content: 'Interactive charts show emissions breakdown by source, facility, time period, and other dimensions. Hover over charts for detailed information.',
      },
      {
        title: 'Quick Actions',
        content: 'Access frequently used functions directly from the dashboard, including data entry, report generation, and target tracking.',
      },
    ],
  },
  {
    id: 'activity-data',
    title: 'Activity Data Management',
    icon: <DataIcon />,
    content: 'Activity data represents the quantified amount of activity that results in GHG emissions.',
    subsections: [
      {
        title: 'Adding Activity Data',
        content: 'Click "Add Activity Data" and enter: Organization Unit, Time Period, Emission Source, Activity Type, Value, Unit, Data Source, and Data Quality rating. All fields are required for accurate emissions calculations.',
      },
      {
        title: 'Data Quality',
        content: 'Rate your data quality from 0-1 (0 = low quality, 1 = high quality). This helps track data reliability and identify areas for improvement.',
      },
      {
        title: 'Importing Data',
        content: 'Use the Integrations module to connect external data sources or import data in bulk from CSV files.',
      },
      {
        title: 'Editing and Deleting',
        content: 'Use the edit and delete buttons in the data table. All changes are logged in the audit trail for verification purposes.',
      },
    ],
  },
  {
    id: 'emission-factors',
    title: 'Emission Factors',
    icon: <CalcIcon />,
    content: 'Emission factors convert activity data into GHG emissions. GGAS includes a comprehensive library of emission factors from trusted sources.',
    subsections: [
      {
        title: 'Default Factors',
        content: 'GGAS includes emission factors from EPA, DEFRA, IEA, and other authoritative sources. These are regularly updated to reflect the latest scientific data.',
      },
      {
        title: 'Custom Factors',
        content: 'Create custom emission factors for your specific processes or regional requirements. Mark factors as "custom" to distinguish them from default factors.',
      },
      {
        title: 'Factor Selection',
        content: 'When calculating emissions, choose the most appropriate factor based on: geographic region, time period, activity type, and data source reliability.',
      },
      {
        title: 'Version Control',
        content: 'Track different versions of emission factors to ensure historical calculations remain valid and comparable.',
      },
    ],
  },
  {
    id: 'calculations',
    title: 'Emissions Calculations',
    icon: <CalcIcon />,
    content: 'Calculate GHG emissions by combining activity data with appropriate emission factors.',
    subsections: [
      {
        title: 'Calculation Methodology',
        content: 'GGAS supports multiple calculation methodologies: Direct Measurement, Material Balance, Stoichiometric, and Default Factors. Select the methodology that best fits your data quality and requirements.',
      },
      {
        title: 'Scopes',
        content: 'Assign calculations to Scope 1 (direct emissions), Scope 2 (purchased energy), or Scope 3 (value chain emissions). Proper scope assignment is critical for reporting.',
      },
      {
        title: 'Uncertainty',
        content: 'Track and report uncertainty in your calculations. This helps stakeholders understand the reliability of your emissions inventory.',
      },
      {
        title: 'Bulk Calculations',
        content: 'Use automation workflows to calculate emissions for multiple activity data entries at once.',
      },
    ],
  },
  {
    id: 'scope3',
    title: 'Scope 3 Value Chain Emissions',
    icon: <DataIcon />,
    content: 'Manage and track Scope 3 emissions across all 15 categories of your value chain.',
    subsections: [
      {
        title: 'Scope 3 Categories',
        content: 'Enable and configure the 15 Scope 3 categories: Purchased Goods & Services, Capital Goods, Fuel & Energy, Upstream Transportation, Waste, Business Travel, Employee Commuting, Leased Assets, Downstream Transportation, Processing, Use of Products, End-of-Life, Leased Assets, Franchises, and Investments.',
      },
      {
        title: 'Supplier Data',
        content: 'Collect and manage emissions data from suppliers. Track data quality, verification status, and engagement progress.',
      },
      {
        title: 'Supplier Engagement',
        content: 'Request emissions data from suppliers, track response rates, and collaborate on emissions reduction.',
      },
      {
        title: 'Supply Chain Mapping',
        content: 'Visualize your supply chain tiers and identify high-emission suppliers and categories.',
      },
    ],
  },
  {
    id: 'integrations',
    title: 'Data Integrations',
    icon: <DataIcon />,
    content: 'Connect GGAS with your existing systems to automate data collection and reduce manual entry.',
    subsections: [
      {
        title: 'ERP Integration',
        content: 'Connect to SAP, Oracle, Microsoft Dynamics, and other ERP systems to automatically import relevant operational data.',
      },
      {
        title: 'Utility Data',
        content: 'Link utility meters and billing systems for automatic energy consumption data collection.',
      },
      {
        title: 'IoT Devices',
        content: 'Connect IoT sensors and smart meters for real-time emissions monitoring.',
      },
      {
        title: 'API Access',
        content: 'Use GGAS APIs to integrate with custom systems and build your own applications.',
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics & Reporting',
    icon: <ReportIcon />,
    content: 'Generate insights and reports from your emissions data.',
    subsections: [
      {
        title: 'Scenario Analysis',
        content: 'Create and compare different scenarios to evaluate emissions reduction strategies. Model the impact of operational changes, investments, and policy decisions.',
      },
      {
        title: 'Trend Analysis',
        content: 'Analyze emissions trends over time, identify patterns, and forecast future emissions based on historical data.',
      },
      {
        title: 'Benchmarking',
        content: 'Compare your performance against industry standards, peers, and your own historical performance.',
      },
      {
        title: 'Custom Reports',
        content: 'Build custom reports with the metrics and visualizations that matter most to your stakeholders.',
      },
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance Reporting',
    icon: <ReportIcon />,
    content: 'Generate compliance reports for various regulatory frameworks and voluntary disclosure programs.',
    subsections: [
      {
        title: 'Supported Frameworks',
        content: 'GGAS supports CDP, TCFD, GRI, SASB, and other major reporting frameworks. Templates are pre-configured to match each framework\'s requirements.',
      },
      {
        title: 'Report Generation',
        content: 'Select your framework, reporting year, and data scope. GGAS automatically populates the report with your emissions data and calculations.',
      },
      {
        title: 'Verification',
        content: 'Prepare reports for third-party verification with complete audit trails and supporting documentation.',
      },
      {
        title: 'Export Formats',
        content: 'Export reports in PDF, Excel, CSV, and framework-specific formats (e.g., CDP\'s online questionnaire format).',
      },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI/ML Analytics',
    icon: <AIIcon />,
    content: 'Leverage artificial intelligence and machine learning for advanced insights and automation.',
    subsections: [
      {
        title: 'Anomaly Detection',
        content: 'Automatically identify unusual patterns in your emissions data that may indicate errors, equipment malfunctions, or opportunities for improvement.',
      },
      {
        title: 'Predictive Models',
        content: 'Forecast future emissions based on historical trends, operational plans, and external factors.',
      },
      {
        title: 'Missing Data Prediction',
        content: 'Use ML models to estimate missing data points based on similar historical data and contextual information.',
      },
      {
        title: 'Optimization Suggestions',
        content: 'Receive AI-generated recommendations for reducing emissions, improving data quality, and optimizing operations.',
      },
    ],
  },
  {
    id: 'targets',
    title: 'Target Management',
    icon: <DataIcon />,
    content: 'Set, track, and achieve your carbon reduction targets.',
    subsections: [
      {
        title: 'Target Types',
        content: 'Create absolute targets (reduce total emissions), intensity targets (emissions per unit of output), or Science Based Targets (SBTi-aligned).',
      },
      {
        title: 'SBTi Validation',
        content: 'Validate your targets against Science Based Targets initiative criteria to ensure alignment with climate science.',
      },
      {
        title: 'Progress Tracking',
        content: 'Monitor progress toward targets with visual indicators, milestone tracking, and automated alerts.',
      },
      {
        title: 'Reduction Projects',
        content: 'Plan and track specific emissions reduction projects, including estimated and actual reductions, costs, and ROI.',
      },
      {
        title: 'Carbon Pricing',
        content: 'Model the financial impact of carbon pricing scenarios on your operations.',
      },
    ],
  },
  {
    id: 'multi-entity',
    title: 'Multi-Entity Management',
    icon: <DataIcon />,
    content: 'Manage emissions data across multiple entities, facilities, and subsidiaries.',
    subsections: [
      {
        title: 'Entity Hierarchy',
        content: 'Define organizational structure with parent-child relationships. Roll up emissions data from subsidiaries to corporate level.',
      },
      {
        title: 'Regional Compliance',
        content: 'Track different regulatory requirements for each region where you operate. Configure region-specific reporting.',
      },
      {
        title: 'Data Governance',
        content: 'Set policies for data access, retention, and privacy across your organization.',
      },
      {
        title: 'Multi-Currency & Language',
        content: 'Support different currencies, languages, and time zones for global operations.',
      },
    ],
  },
  {
    id: 'users',
    title: 'User Management',
    icon: <PeopleIcon />,
    content: 'Manage users, roles, and permissions within GGAS.',
    subsections: [
      {
        title: 'Creating Users',
        content: 'Admin users can create new user accounts, assign roles, and set permissions. Each user needs a unique username and email address.',
      },
      {
        title: 'Role-Based Access',
        content: 'Assign users to roles (Admin, Manager, Analyst, Viewer, etc.) to control what features and data they can access.',
      },
      {
        title: 'Custom Roles',
        content: 'Create custom roles with specific permission combinations to match your organization\'s needs.',
      },
      {
        title: 'User Activity',
        content: 'Track user login history, actions performed, and data modifications through the audit trail.',
      },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    content: 'Configure your personal preferences and account settings.',
    subsections: [
      {
        title: 'Profile Settings',
        content: 'Update your personal information, profile photo, and contact details.',
      },
      {
        title: 'Preferences',
        content: 'Customize your experience with theme selection (light/dark mode), language preferences, and dashboard layout.',
      },
      {
        title: 'Notifications',
        content: 'Choose which notifications you want to receive and through which channels (in-app, email).',
      },
      {
        title: 'Security',
        content: 'Manage your password, enable two-factor authentication, and view active login sessions.',
      },
    ],
  },
  {
    id: 'admin',
    title: 'Admin Panel',
    icon: <SettingsIcon />,
    content: 'Administrative functions for system configuration and management.',
    subsections: [
      {
        title: 'License Management',
        content: 'Generate, assign, and revoke license keys. Monitor license usage and expiration dates.',
      },
      {
        title: 'System Settings',
        content: 'Configure system-wide settings including AI/ML features, theme defaults, and security policies.',
      },
      {
        title: 'User Management',
        content: 'Create and manage user accounts, roles, and permissions across the organization.',
      },
      {
        title: 'System Notifications',
        content: 'Create system-wide notification banners to inform users of scheduled maintenance, updates, or important announcements.',
      },
      {
        title: 'Database Backup',
        content: 'Schedule and manage database backups to ensure data safety and business continuity.',
      },
    ],
  },
  {
    id: 'internationalization',
    title: 'Internationalization & Accounting Standards',
    icon: <LanguageIcon />,
    content: 'GGAS supports international operations with country-specific accounting standards and regulations for oil and gas industries. Configure your regional settings and accounting frameworks in the Settings panel.',
    subsections: [
      {
        title: 'Overview of Oil & Gas Accounting',
        content: 'Nearly all countries involved in oil and gas extraction, production, or significant consumption have specialized accounting needs. The specific rules are heavily influenced by a country\'s accounting standard—either U.S. Generally Accepted Accounting Principles (GAAP) or International Financial Reporting Standards (IFRS)—and its national tax and regulatory policies.',
      },
      {
        title: 'Countries Using US GAAP',
        content: 'U.S. GAAP has comprehensive and specific guidance for the oil and gas industry. Companies operating within the United States or those listed on U.S. stock exchanges must follow these rules. United States: All publicly traded oil and gas companies operating in the U.S. must adhere to GAAP, with special accounting for costs related to oil and gas exploration and extraction. Canada: Canadian companies can choose to use either Canadian GAAP or IFRS. Those operating in the U.S. or with U.S. investors must have a strong understanding of GAAP requirements.',
      },
      {
        title: 'Countries Using IFRS',
        content: 'More than 140 countries have adopted IFRS, though it offers less specific, more principles-based guidance for the extractive industries. Instead of a single standard, companies use IFRS 6 (Exploration for and Evaluation of Mineral Resources) in conjunction with other relevant IFRS standards. IFRS-adopting countries include the European Union, South America, and parts of Asia and Africa. Norway and the United Kingdom are significant oil and gas producers with specific national legislation regarding oil and gas activity. Indonesia has implemented specific tax and regulatory guidance influenced by IFRS adoption. Key oil and gas nations such as Brazil, Australia, Egypt, Malaysia, and Nigeria operate under IFRS with their own national variations.',
      },
      {
        title: 'Countries with Unique or State-Controlled Accounting',
        content: 'Some major oil and gas nations have unique requirements due to a state-controlled industry or distinct national laws. Saudi Arabia: State-owned Saudi Aramco dominates the industry with government control over financial operations. Russia: The state-controlled nature of Russia\'s oil and gas industry means that national regulations and state policies heavily influence accounting practices. Venezuela: Despite holding the world\'s largest oil reserves, the industry is managed through state-owned Petróleos de Venezuela (PDVSA) with national regulations that often diverge from international standards. China: As the second-largest oil consumer and a major producer, China has complex national regulations for state-owned oil companies with specific accounting requirements. Algeria, Iraq, Kuwait, and the UAE: Many OPEC member states have national oil companies that operate under national laws dictating specific accounting and reporting requirements.',
      },
      {
        title: 'Accounting Complexities',
        content: 'All oil and gas producing nations need specialized accounting for: Costly exploration - Rules must address how to capitalize or expense large, risky exploration costs. Reporting of reserves - The estimated quantity and value of proven, probable, and possible reserves must be disclosed. Depreciation and depletion - The industry requires specific methods like the "unit-of-production" method. International variations - Companies operating across multiple jurisdictions must manage a complex accounting framework that reconciles local tax and reporting requirements with the parent company\'s home country standards. Joint ventures - Multi-national projects require complex accounting to track and report costs and revenues for multiple partners.',
      },
      {
        title: 'Economies with Significant O&G Accounting Needs',
        content: 'Economies highly dependent on fuel exports include Algeria, Azerbaijan, Brunei, Iraq, Kuwait, Libya, Sudan, and Venezuela where fuel exports account for a large portion of total exports. Countries where oil revenue is a large share of GDP include Saudi Arabia, Kuwait, and Libya. Top oil-producing countries include the United States (world\'s largest since 2018), Saudi Arabia, Russia, and Canada. Countries with large energy exports like Kuwait rely heavily on oil and gas for economic stability, requiring robust accounting practices.',
      },
      {
        title: 'Configuring Regional Settings',
        content: 'To configure your accounting standards: Navigate to Settings → Language & Locale tab. Select your Country of Operation from the dropdown (US, Canada, Norway, UK, Saudi Arabia, Russia, Brazil, etc.). Choose your Accounting Standard (US GAAP, IFRS, IFRS 6, National/State-Controlled, or Hybrid). Configure language, currency, timezone, and number format for your region. Save your settings. The system will apply appropriate rules for emission calculations, reserves reporting, and compliance frameworks based on your selections.',
      },
      {
        title: 'Multi-Jurisdiction Operations',
        content: 'For companies operating across multiple countries: Use the Multi-Entity Management module to configure different accounting standards for each entity. Set up regional compliance requirements for each jurisdiction. Consolidate reports while maintaining jurisdiction-specific details. Track currency conversions and exchange rates. Manage data governance policies across regions. The system supports simultaneous operation under multiple accounting frameworks.',
      },
    ],
  },
];

const DocumentationPage: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const currentSection = documentationSections.find(s => s.id === selectedSection);

  const filteredSections = documentationSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections?.some(sub =>
      sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DocIcon color="primary" fontSize="large" />
          Documentation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Comprehensive guides and references for using Green Country GGAS
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Sidebar - Navigation */}
        <Paper sx={{ width: 320, flexShrink: 0, p: 2, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ mb: 2 }}
          >
            <Tab label="All Topics" icon={<MenuBookIcon />} iconPosition="start" />
            <Tab label="Guides" icon={<ArticleIcon />} iconPosition="start" />
          </Tabs>

          <List>
            {filteredSections.map((section) => (
              <ListItem key={section.id} disablePadding>
                <ListItemButton
                  selected={selectedSection === section.id}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {section.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={section.title}
                    primaryTypographyProps={{ fontSize: '0.95rem' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Main Content Area */}
        <Box sx={{ flex: 1, maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
          {currentSection && (
            <Paper sx={{ p: 4 }}>
              <Breadcrumbs sx={{ mb: 3 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setSelectedSection('getting-started')}
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.5, textDecoration: 'none' }}
                >
                  <HomeIcon fontSize="small" />
                  Home
                </Link>
                <Typography color="text.primary">{currentSection.title}</Typography>
              </Breadcrumbs>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                {currentSection.icon}
                <Typography variant="h4">{currentSection.title}</Typography>
              </Box>

              <Typography variant="body1" paragraph sx={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                {currentSection.content}
              </Typography>

              {currentSection.subsections && currentSection.subsections.length > 0 && (
                <Box sx={{ mt: 4 }}>
                  {currentSection.subsections.map((subsection, index) => (
                    <Accordion key={index} defaultExpanded={index === 0}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">{subsection.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                          {subsection.content}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}

              <Divider sx={{ my: 4 }} />

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label="User Guide" size="small" />
                <Chip label="Tutorial" size="small" variant="outlined" />
                <Chip label="Reference" size="small" variant="outlined" />
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DocumentationPage;
