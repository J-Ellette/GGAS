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
  Security as SecurityIcon,
  AccountTree as AccountTreeIcon,
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
  {
    id: 'oil-gas-accounting',
    title: 'Oil & Gas Industry Accounting Standards',
    icon: <ArticleIcon />,
    content: 'Specific accounting standards for the oil and gas industry vary by jurisdiction and methodology. Understanding these standards is crucial for accurate financial reporting and emissions accounting in the energy sector.',
    subsections: [
      {
        title: 'Overview',
        content: 'The oil and gas industry has unique accounting requirements due to the high-risk, capital-intensive nature of exploration and production activities. The two primary methods for expensing exploration and development costs significantly impact reported earnings and asset values.',
      },
      {
        title: 'Successful Efforts Method',
        content: 'What it is: This method capitalizes only the costs associated with successful exploration efforts, such as productive wells. Costs for unsuccessful exploratory efforts, or "dry holes," are immediately expensed. Impact on financials: This approach typically results in lower asset values and more volatile earnings compared to the full cost method, especially for companies with significant exploration activity. Governing bodies: The Financial Accounting Standards Board (FASB) requires the use of the successful efforts method under U.S. GAAP.',
      },
      {
        title: 'Full Cost Method',
        content: 'What it is: This method capitalizes all exploration operating costs, regardless of whether they were successful or not. These costs are then amortized over time as the total reserves are produced. Impact on financials: This method can inflate reported net income by deferring the expense of unsuccessful ventures. It generally results in higher asset values and less volatile earnings than the successful efforts method. Governing bodies: The U.S. Securities and Exchange Commission (SEC) allows companies to use the full cost method and has specific regulations regarding its use.',
      },
      {
        title: 'U.S. GAAP Standards (ASC 932)',
        content: 'U.S. companies must follow Accounting Standards Codification (ASC) 932 under GAAP. This standard provides comprehensive guidance on: Capitalization of exploration and development costs; Depreciation, depletion, and amortization (DD&A) methodologies; Impairment testing of oil and gas properties; Required disclosures about reserve quantities and values; Segment reporting for different geographic areas or product types. Companies must choose either the successful efforts or full cost method and apply it consistently.',
      },
      {
        title: 'IFRS Standards (IFRS 6)',
        content: 'Countries using International Financial Reporting Standards follow IFRS 6 (Exploration for and Evaluation of Mineral Resources). Key aspects include: More principles-based approach compared to U.S. GAAP; Allows companies to either capitalize or expense exploration costs, provided the policy is applied consistently; Less prescriptive than ASC 932, giving companies more flexibility; Must be used in conjunction with other IFRS standards (IAS 16, IAS 36, IAS 37, IAS 38); Requires disclosure of accounting policies used for exploration and evaluation expenditures.',
      },
      {
        title: 'Depreciation, Depletion, and Amortization (DD&A)',
        content: 'After costs are capitalized under either method, companies use DD&A to expense those costs over time as reserves are extracted. The unit-of-production method is most common: Costs are allocated based on the ratio of production during the period to total estimated reserves. This ensures expenses match the revenue generated from resource extraction. Calculation: (Production during period / Estimated total reserves) × Capitalized costs. DD&A rates must be updated as reserve estimates change.',
      },
      {
        title: 'Reserve Accounting',
        content: 'Accurately estimating oil and gas reserves is critical for both financial reporting and asset valuation. Key concepts: Proved reserves: Quantities that geological and engineering data demonstrate with reasonable certainty to be recoverable under existing conditions. Probable reserves: Less certain than proved reserves but still likely to be recovered. Possible reserves: Less certain than probable reserves. SEC regulations: Mandate how reserve estimates are used to calculate impairment limitations under the full cost method. Require annual reporting of reserve quantities and changes. Companies must engage qualified petroleum engineers to certify reserves.',
      },
      {
        title: 'Joint Ventures',
        content: 'The oil and gas industry frequently uses joint ventures for large-scale projects, requiring complex accounting: Participants must account for their proportionate share of assets, liabilities, revenues, and expenses. Joint operating agreements (JOAs) define cost-sharing arrangements. The operator typically manages the venture and bills other participants. Non-operating partners must verify charges and maintain separate accounting records. Transfer pricing rules apply when joint venture partners transact with each other. Multi-national joint ventures must reconcile different accounting standards across jurisdictions.',
      },
      {
        title: 'Lease Accounting (IFRS 16 & ASC 842)',
        content: 'Modern standards require oil and gas companies to analyze service arrangements for embedded leases: IFRS 16 and ASC 842 require lessees to recognize right-of-use assets and lease liabilities on the balance sheet. Common lease arrangements: Drilling rig contracts, pipeline capacity agreements, storage facility rentals, office and accommodation facilities. Companies must assess whether arrangements contain leases and distinguish between operating and finance leases. This significantly impacts balance sheet presentation and financial ratios.',
      },
      {
        title: 'Environmental & ESG Reporting (SASB Standards)',
        content: 'For environmental, social, and governance (ESG) reporting, oil and gas companies must disclose greenhouse gas (GHG) emissions metrics using standards like those from the Sustainability Accounting Standards Board (SASB). Key requirements: Scope 1 emissions (direct from operations); Scope 2 emissions (purchased electricity); Scope 3 emissions (value chain, including downstream combustion of produced hydrocarbons); Methane emissions reporting; Flaring and venting data; Carbon intensity metrics; Climate risk disclosures under TCFD framework. GGAS integrates with these reporting requirements to ensure compliance.',
      },
      {
        title: 'Impairment Testing',
        content: 'Oil and gas assets must be tested for impairment regularly: Successful efforts method: Test individual properties or cost centers for impairment when events or circumstances indicate carrying value may not be recoverable. Full cost method: Perform ceiling test quarterly - total capitalized costs cannot exceed the present value of future net revenues from proved reserves plus the cost of unproved properties. Impairment indicators: Significant decline in commodity prices, downward reserve revisions, political or regulatory changes, technological obsolescence. Write-downs are recorded when carrying value exceeds recoverable amount.',
      },
      {
        title: 'Configuring O&G Accounting in GGAS',
        content: 'To configure oil and gas accounting standards in GGAS: Navigate to Settings → Accounting & Compliance. Select your primary accounting framework (U.S. GAAP/ASC 932 or IFRS 6). Choose your cost accounting method (Successful Efforts or Full Cost). Configure DD&A calculation parameters and reserve estimation methods. Set up joint venture accounting rules if applicable. Enable ESG/SASB reporting modules for emissions disclosure. Configure impairment testing schedules and triggers. The system will automatically apply the appropriate accounting rules for emissions calculations, financial reporting, and compliance.',
      },
    ],
  },
  {
    id: 'phase6',
    title: 'Phase 6: Real-Time Carbon Operations Center',
    icon: <DashboardIcon />,
    content: 'The Real-Time Carbon Operations Center provides comprehensive live monitoring, command center capabilities, and operational intelligence for managing carbon emissions across your organization.',
    subsections: [
      {
        title: 'Live Monitoring Dashboard',
        content: 'Real-time data streaming with sub-second updates provides continuous visibility into emissions performance. The dashboard integrates with SCADA systems, IoT sensors, and smart meters to capture live operational data. A real-time calculation engine processes incoming data streams to compute emissions on-the-fly, with automatic aggregation across organizational hierarchies from individual assets up to enterprise level.',
      },
      {
        title: 'Visual Command Center',
        content: 'Large-screen displays optimized for operations centers provide at-a-glance visibility. Customize layouts for different operational roles including plant managers, sustainability teams, and executives. Geographic heat maps show emission intensity across facilities, with drill-down capabilities from enterprise level to regional, facility, and individual asset levels. Interactive visualizations allow operators to quickly identify issues and opportunities.',
      },
      {
        title: 'Carbon Traffic Light System',
        content: 'Green/Yellow/Red indicators provide instant status visibility for emission performance across all operational levels. Configure thresholds based on targets, budgets, and historical performance to match your organization\'s goals. Trending indicators show performance direction (improving, stable, or declining). The system integrates with existing operational dashboards for seamless adoption.',
      },
      {
        title: 'Smart Process Monitoring',
        content: 'Real-time calculation of emission factors adapts to current operational conditions such as temperature, pressure, and equipment efficiency. The system provides process optimization recommendations based on carbon efficiency analysis. Integration with maintenance management systems enables carbon-optimized maintenance scheduling. Energy optimization suggestions are based on carbon intensity forecasts from grid operators.',
      },
      {
        title: 'Automated Response Systems',
        content: 'Trigger predefined actions automatically when emission thresholds are exceeded, reducing response time. Integration with building management systems enables automatic efficiency adjustments like HVAC optimization and lighting control. Alert dispatching to mobile devices ensures immediate response from responsible personnel. Work order system integration creates corrective action tasks automatically.',
      },
      {
        title: '24/7 Operations Center Support',
        content: 'The system supports continuous monitoring and incident response for enterprise operations centers. Global time zone management coordinates monitoring across international operations. Carbon events integrate with enterprise incident response systems for unified incident management. Real-time KPI tracking integrates with operational excellence programs to ensure carbon performance aligns with overall operational goals.',
      },
      {
        title: 'Theme Customization',
        content: 'GGAS supports three theme modes for optimal viewing in different environments: Light Theme for standard office environments, Dark Theme for operations centers and low-light conditions, and System Default which automatically matches your computer\'s theme preference. Change your theme in Settings → Appearance. The theme preference is saved and persists across sessions.',
      },
    ],
  },
  {
    id: 'phase7',
    title: 'Phase 7: Universal Carbon Connector',
    icon: <DataIcon />,
    content: 'The Universal Carbon Connector provides comprehensive pre-built integrations, smart data mapping, and a no-code integration builder to seamlessly connect GGAS with your enterprise systems, utility providers, travel platforms, facilities management, supply chain, and financial systems.',
    subsections: [
      {
        title: 'Pre-built Integration Library - Enterprise Systems',
        content: 'GGAS includes pre-configured connectors for major enterprise systems including SAP (ERP, S/4HANA, SuccessFactors), Oracle (EBS, Cloud ERP, NetSuite), Microsoft Dynamics (365, Finance & Operations, Business Central), Workday (HCM, Financial Management), and Salesforce (Sales Cloud, Service Cloud, Platform). These integrations automatically extract relevant operational data, financial transactions, and resource consumption metrics to streamline your carbon accounting process and eliminate manual data entry.',
      },
      {
        title: 'Pre-built Integration Library - Utility Providers',
        content: 'Connect to major utility companies with automated meter reading (AMR) capabilities and Green Button data standards. The system supports integration with electric, gas, water, and steam utilities across North America, Europe, and Asia-Pacific regions. Automated data retrieval occurs on configurable schedules (hourly, daily, monthly) with automatic unit conversion, tariff structure recognition, and billing period alignment. Green Button Connect My Data (CMD) protocol enables secure, standardized utility data access.',
      },
      {
        title: 'Pre-built Integration Library - Travel & Transportation',
        content: 'Integrate with corporate travel management systems including Concur (SAP), Egencia (Expedia), TripActions, and Navan. Fleet management system connectors support Geotab, Verizon Connect, Samsara, and Fleet Complete for vehicle telematics data. Fuel card provider integrations include WEX, Shell Fleet, BP Fuel Cards, and ExxonMobil Business Line. Automatically capture business travel bookings (flights, hotels, rental cars), employee commuting patterns, and fleet fuel consumption with distance-based and fuel-based emission calculations.',
      },
      {
        title: 'Pre-built Integration Library - Facilities Management',
        content: 'Connect to building management systems (BMS) and building automation systems (BAS) from leading manufacturers including Honeywell (Enterprise Buildings Integrator), Johnson Controls (Metasys), Siemens (Desigo CC), Schneider Electric (EcoStruxure), and Trane (Tracer). Extract real-time HVAC performance data, lighting control metrics, energy consumption by zone, occupancy patterns, and environmental conditions. Integration supports BACnet, Modbus, and proprietary protocols with automatic equipment discovery and commissioning.',
      },
      {
        title: 'Pre-built Integration Library - Supply Chain',
        content: 'Streamline procurement and supply chain data collection with connectors for SAP Ariba (procurement, sourcing, supplier management), Coupa (business spend management, procurement), Oracle Procurement Cloud, Jaggaer, and EDI (Electronic Data Interchange) systems. Automatically import supplier information, purchase orders, goods receipts, invoice data, shipping documentation, and logistics tracking. Map spend categories to emission factors using AI-powered classification for accurate Scope 3 calculations.',
      },
      {
        title: 'Pre-built Integration Library - Financial Systems',
        content: 'Integrate with accounting and financial platforms for spend-based emission calculations including QuickBooks (Online, Desktop, Enterprise), Xero, FreshBooks, NetSuite ERP, and Sage Intacct. Banking API integrations support Plaid, Yodlee, and Open Banking standards for automatic transaction categorization. Extract general ledger transactions, expense reports, credit card statements, and vendor payments. The system automatically classifies expenses using machine learning and maps them to appropriate emission factors for Scope 1, 2, and 3 calculations.',
      },
      {
        title: 'Smart Data Mapping Engine - AI-Powered Field Recognition',
        content: 'The AI-powered field recognition system automatically identifies and maps data fields from source systems to GGAS data models. Using natural language processing (NLP) and machine learning algorithms, the engine analyzes field names, data types, sample values, and contextual relationships to suggest optimal mappings. The system recognizes common patterns across different ERP systems (e.g., "Amount", "Total", "Quantity") and intelligently maps them to appropriate GGAS fields (e.g., consumption value, cost, activity amount). Confidence scoring indicates mapping reliability with suggestions for user review.',
      },
      {
        title: 'Smart Data Mapping Engine - Learning Algorithms',
        content: 'The mapping engine continuously improves accuracy through reinforcement learning based on user feedback and corrections. When users accept, modify, or reject automated mappings, the system updates its models to improve future suggestions. Pattern recognition identifies similar data structures across different data sources and applies learned mappings to new integrations. The collaborative learning feature enables organizations to share anonymized mapping patterns within industry verticals, accelerating setup for similar companies.',
      },
      {
        title: 'Smart Data Mapping Engine - Data Transformation Rules',
        content: 'Configure sophisticated data transformation rules to handle unit conversions (metric to imperial, kWh to MWh, liters to gallons), data format standardization (date formats, number formats, text encoding), currency conversion using real-time or historical exchange rates, and custom calculation formulas. The transformation engine supports conditional logic, lookup tables, regular expressions, and mathematical operations. Templates for common transformations (e.g., electricity bill to kWh, fuel volume to GHG emissions) are included out-of-the-box.',
      },
      {
        title: 'Smart Data Mapping Engine - Validation Frameworks',
        content: 'Comprehensive data quality checking ensures incoming data meets required standards before processing. Validation rules include range checks (acceptable min/max values), format validation (date, numeric, text patterns), referential integrity (foreign key validation), completeness checks (required fields, null values), and consistency validation (cross-field logic). The system automatically flags errors and warnings with detailed diagnostic messages, suggested corrections, and the ability to quarantine invalid records for review. Configurable error thresholds determine whether integrations should halt or continue with warnings.',
      },
      {
        title: 'Integration Marketplace - Community Connectors',
        content: 'Access a curated marketplace of user-contributed integrations with rating and review systems. Community developers can publish custom connectors for niche systems, regional utilities, industry-specific platforms, and proprietary internal systems. Each connector includes detailed documentation, installation instructions, configuration guides, and support channels. Users can rate connectors (1-5 stars), write reviews, report issues, and request enhancements. Popular connectors are highlighted and trending integrations are featured on the marketplace homepage.',
      },
      {
        title: 'Integration Marketplace - Certification Program',
        content: 'Verified connectors meeting enterprise security and reliability standards receive official certification badges. The certification process includes security review (code scanning, vulnerability assessment, penetration testing), reliability testing (load testing, failover scenarios, data accuracy validation), documentation quality assessment, and compliance verification (SOC 2, ISO 27001, GDPR). Certified connectors receive priority support, are eligible for enterprise licensing, and appear first in marketplace search results. Annual re-certification ensures ongoing quality.',
      },
      {
        title: 'Integration Marketplace - Revenue Sharing',
        content: 'Connector developers can monetize their integrations through a transparent revenue-sharing model. Developers set pricing tiers (free, freemium, paid subscriptions, usage-based), receive 70% of revenue (30% platform fee), and access real-time sales dashboards and analytics. Payment processing, licensing enforcement, and customer support infrastructure are handled by the platform. Developers maintain intellectual property rights while granting GGAS licensing rights. Top-earning developers receive featured placement and promotional support.',
      },
      {
        title: 'Integration Marketplace - Analytics',
        content: 'Comprehensive usage statistics and performance metrics help users select the best connectors and developers optimize their offerings. Analytics include installation counts, active users, data volume processed, error rates, response times, user satisfaction scores, and feature adoption rates. Comparison tools allow side-by-side evaluation of similar connectors. Developers access detailed dashboards showing user engagement, common error patterns, support ticket trends, and revenue analytics. Marketplace administrators monitor platform health and identify opportunities for improvement.',
      },
      {
        title: 'No-Code Integration Builder - Visual Workflow Designer',
        content: 'Create custom integrations without writing code using an intuitive drag-and-drop interface. The visual designer includes pre-built nodes for common operations: data sources (API, database, file, webhook), transformations (map, filter, aggregate, join), logic (conditional, loop, switch), and destinations (GGAS entities, external systems, file export). Connect nodes with visual links to define data flow, configure node properties through forms and wizards, and preview data at each step. Real-time validation ensures workflows are logically sound before deployment.',
      },
      {
        title: 'No-Code Integration Builder - Template Library',
        content: 'Accelerate integration development with pre-built templates for common integration patterns including scheduled data import (daily utility meter reads, weekly procurement data), event-driven workflows (new invoice triggers emission calculation, threshold breach sends alert), API polling (check for new data every N minutes), batch processing (process thousands of records efficiently), and error handling patterns (retry logic, dead letter queues, notifications). Templates are fully customizable and serve as starting points for specific requirements. Industry-specific templates cover energy & utilities, manufacturing, retail, financial services, and healthcare.',
      },
      {
        title: 'No-Code Integration Builder - Testing Sandbox',
        content: 'Safely test integrations before production deployment in an isolated sandbox environment. The sandbox provides mock data sources matching production schemas, test execution with detailed logging and debugging, data validation and quality checks, performance profiling (throughput, latency, resource usage), and rollback capabilities. Run integration tests with various scenarios (normal operation, edge cases, error conditions) and compare sandbox results with expected outcomes. Once validated, promote integrations to production with a single click while maintaining version history.',
      },
      {
        title: 'No-Code Integration Builder - Version Control',
        content: 'Manage integration versions and rollback capabilities through built-in version control. Every change is automatically versioned with metadata (who, when, what changed). Compare versions side-by-side to understand changes, restore previous versions instantly if issues arise, and branch integrations to test modifications without affecting production. Deployment history tracks all production releases with timestamps, change logs, and deployer information. Rollback is instantaneous with automatic validation to prevent data inconsistencies. Integration export/import enables sharing across environments (dev, test, prod) and organizations.',
      },
      {
        title: 'Enterprise Features - Security Compliance',
        content: 'All integrations comply with SOC 2 Type II and ISO 27001 standards ensuring enterprise-grade security. Features include end-to-end encryption (data in transit via TLS 1.3, data at rest via AES-256), comprehensive audit logging (all data access, modifications, and integration execution), role-based access control (granular permissions for integration management), secrets management (secure storage of API keys, passwords, certificates), and regular security assessments. Compliance reports are available for audit purposes, and the system supports GDPR, CCPA, and HIPAA requirements for regulated industries.',
      },
      {
        title: 'Enterprise Features - Scalability',
        content: 'The integration platform handles high-volume data processing for large enterprises with distributed architecture. Features include horizontal scaling (add processing nodes as volume increases), load balancing (distribute work across available resources), queue management (process millions of records without memory constraints), parallel processing (concurrent execution of independent tasks), and incremental loading (process only changed data). Performance monitoring tracks throughput, latency, and resource utilization. Auto-scaling automatically adjusts capacity based on load patterns, and batch optimization groups related operations for efficiency.',
      },
      {
        title: 'Enterprise Features - Monitoring & Alerting',
        content: 'Real-time monitoring of integration health and performance ensures reliability and quick issue resolution. The monitoring dashboard displays integration status (running, stopped, error), data flow metrics (records processed, throughput rate), error rates and types, and execution duration trends. Configurable alerts trigger notifications via email, SMS, Slack, or Microsoft Teams when thresholds are exceeded (error rate, processing lag, data quality issues). Detailed logs with correlation IDs enable troubleshooting, and integration health scores provide at-a-glance status. Historical analytics identify trends and optimization opportunities.',
      },
      {
        title: 'Enterprise Features - Professional Services',
        content: 'Expert implementation and customization services are available for complex integrations requiring specialized expertise. Services include integration architecture design (scalable, maintainable patterns), custom connector development (proprietary systems, legacy platforms), data migration (historical data import, format conversion), training and knowledge transfer (admin training, developer workshops), and ongoing support (dedicated support team, SLA-backed response times). Engagement models range from fixed-price projects to time-and-materials consulting and managed services. Professional services accelerate time-to-value and ensure best practices.',
      },
      {
        title: 'Getting Started with Integrations',
        content: 'To begin using the Universal Carbon Connector: Navigate to Data Integrations in the main menu. Browse the Integration Marketplace to find pre-built connectors for your systems. Click "Install" on desired connectors and follow the configuration wizard (provide credentials, select data sources, configure schedules). For custom integrations, use the No-Code Integration Builder to create workflows using the visual designer. Test integrations in the sandbox environment before deploying to production. Monitor integration health in the Integration Dashboard and review data quality reports. Access integration analytics to optimize performance and troubleshoot issues.',
      },
    ],
  },
  {
    id: 'phase8',
    title: 'Phase 8: Autonomous Data Collection',
    icon: <DataIcon />,
    content: 'Phase 8 introduces autonomous data collection capabilities with intelligent document processing, email intelligence, browser extension intelligence, and enterprise security features. These advanced automation features dramatically reduce manual data entry while maintaining high accuracy and compliance.',
    subsections: [
      {
        title: 'Intelligent Document Processing Overview',
        content: 'GGAS automatically processes documents from multiple sources with AI-powered OCR, template learning, and smart field identification. The system supports PDF, Excel, Word, images, scanned documents, and emails. Advanced OCR engines achieve 99%+ accuracy for printed text and include handwriting recognition capabilities. The AI learns to recognize utility bills, invoices, reports, and other documents through repeated exposure, automatically improving accuracy over time.',
      },
      {
        title: 'Multi-Format Support',
        content: 'Upload documents in various formats including PDF, Microsoft Excel (.xlsx, .xls), Microsoft Word (.docx, .doc), images (JPEG, PNG, TIFF), scanned documents, and email attachments. The system automatically detects document type and applies appropriate processing rules. Large documents are processed in batches with queue management to handle high volumes efficiently.',
      },
      {
        title: 'Template Learning & Recognition',
        content: 'The AI-powered template learning system recognizes document layouts and structures from repeated exposure. When processing a new utility bill or invoice, the system compares it to previously learned templates and applies the appropriate extraction rules. Templates continuously improve with usage, adapting to variations in document formats. Manual corrections feed back into the learning system to improve future recognition.',
      },
      {
        title: 'Data Extraction Engine',
        content: 'The extraction engine uses multiple techniques: OCR for text extraction with 99%+ accuracy, table extraction for complex formatted documents, handwriting recognition for field data collection, and smart field identification that understands context (dates, amounts, units). Extracted data is automatically validated against expected patterns and historical data. The system flags unusual or suspicious data points for review before importing into activity data.',
      },
      {
        title: 'Context Understanding',
        content: 'GGAS understands document context including document types (utility bill, invoice, report, receipt), billing periods and date ranges, currency and units of measurement, and emission categories. The system cross-references extracted data with historical patterns to identify anomalies and applies appropriate validation rules based on document type. Recognized data is automatically categorized by emission scope and category.',
      },
      {
        title: 'Email Intelligence System',
        content: 'Configure secure monitoring of designated email accounts for carbon-related communications. The system connects via IMAP, POP3, or Exchange protocols to automatically check for new messages. Email attachments (PDFs, spreadsheets, images) are automatically extracted and processed through the document processing pipeline. Smart categorization classifies emails by emission category, urgency, and data type using natural language processing.',
      },
      {
        title: 'Email Monitoring Configuration',
        content: 'To set up email monitoring: Navigate to Autonomous Collection → Email Intelligence tab. Click "Add Email Monitor" and provide account credentials. Configure filtering rules to focus on carbon-relevant emails (keywords, sender domains, subject patterns). Set up categorization rules for automatic emission category assignment. Define approval workflows for extracted data requiring review. Monitor processing statistics and adjust rules as needed.',
      },
      {
        title: 'Attachment Processing',
        content: 'Email attachments are automatically downloaded, scanned for security, and queued for processing. Supported attachment types include PDF documents, Excel spreadsheets, Word documents, images (JPEG, PNG), and ZIP archives containing multiple documents. Each attachment is processed through OCR and data extraction, linked to the originating email for audit purposes, and routed through approval workflows if required. Processing results are logged and available for review.',
      },
      {
        title: 'Smart Categorization & Approval',
        content: 'The AI categorization engine analyzes email content and attachments to determine emission category (Scope 1, 2, or 3), urgency level (low, normal, high, critical), and data type (utility bill, invoice, travel receipt, etc.). Confidence scores indicate categorization certainty. Low-confidence items are flagged for manual review. Approval workflows route extracted data to appropriate approvers based on category, amount, and data quality. Approvers can accept, reject, or modify extracted data before it enters the activity database.',
      },
      {
        title: 'Browser Extension Intelligence',
        content: 'The GGAS Browser Extension enables automatic capture of carbon-relevant data while browsing. Install the extension from the Chrome Web Store or Firefox Add-ons. The extension detects and captures data during travel bookings, supplier website visits, research activities, and e-commerce transactions. Captured data is securely transmitted to GGAS and queued for processing and validation.',
      },
      {
        title: 'Auto-Capture Features',
        content: 'Enable auto-capture to automatically detect and save carbon-relevant information while browsing. The extension recognizes: travel booking confirmations (flights, trains, hotels, car rentals) with distance and emission data; supplier carbon footprint information displayed on product pages; carbon offset offerings and purchases; energy efficiency specifications for equipment purchases; and shipping and logistics information. Users can manually capture additional data using the extension toolbar.',
      },
      {
        title: 'Travel Booking Integration',
        content: 'When booking travel through platforms like Expedia, Booking.com, or corporate travel systems, the browser extension automatically captures: origin and destination locations, travel dates and times, mode of transportation (flight, train, car), distance traveled, and carrier-provided emission estimates. This data is automatically categorized under Scope 3 Category 6 (Business Travel) and can be imported directly into activity data with one click.',
      },
      {
        title: 'Supplier Website Mining',
        content: 'The extension captures carbon-related information from supplier websites including: product carbon footprints (if disclosed), environmental certifications and labels, renewable energy claims, packaging materials and recycling information, and sustainability reports. Captured data helps populate Scope 3 Category 1 (Purchased Goods & Services) with supplier-specific emission factors.',
      },
      {
        title: 'Research Assistant Mode',
        content: 'Enable Research Assistant mode to help find and capture carbon data during web research. The extension highlights carbon-relevant information on web pages, suggests data capture when relevant content is detected, maintains a capture history for review and import, and provides quick access to GGAS emission categories and factors. Use the extension to quickly save emission factors, industry benchmarks, regulatory information, and best practices found during research.',
      },
      {
        title: 'Enterprise Security & Compliance',
        content: 'All autonomous data collection features comply with GDPR, CCPA, and other data privacy regulations. Security features include: end-to-end encryption for data in transit and at rest, user consent management for data collection, role-based access controls for automated systems, complete audit trails of all automated activities, and options for on-premises processing of sensitive documents. Regular security audits ensure ongoing compliance.',
      },
      {
        title: 'Data Privacy Controls',
        content: 'Configure data privacy settings in Autonomous Collection → Security & Compliance tab. Enable GDPR compliance mode for EU operations, CCPA compliance for California users, or both. Set data retention periods for processed documents (30, 60, 90 days, or custom). Configure anonymization rules for personal information found in documents. Enable geographic restrictions to ensure data stays within required regions. All settings are logged and auditable.',
      },
      {
        title: 'Secure Processing Options',
        content: 'For sensitive documents, enable on-premises processing to ensure data never leaves your infrastructure. This option requires installation of the GGAS Document Processing Server within your network. Documents are processed locally and only metadata is transmitted to the cloud (if using cloud-hosted GGAS). On-premises processing supports all document formats and OCR engines. Contact your administrator to set up on-premises processing.',
      },
      {
        title: 'Audit Trails & Compliance',
        content: 'Every automated data collection activity is logged in the audit trail including: document uploads and processing results, email monitoring activities and message access, browser extension captures and data transfers, OCR job execution and accuracy metrics, approval workflow actions and decisions, and data validation events and error corrections. Export audit logs for compliance reporting, security reviews, and process improvement. Logs include timestamps, user IDs, IP addresses, and detailed event information.',
      },
      {
        title: 'Access Controls & Permissions',
        content: 'Configure role-based permissions for autonomous data collection features. Permissions include: upload documents (who can upload), configure email monitors (who can add email accounts), approve extracted data (who can approve imports), access audit logs (who can view logs), configure security settings (who can modify compliance settings), and manage browser extensions (who can enable/disable capture). Set up approval chains where multiple approvers are required for high-value or high-risk data.',
      },
      {
        title: 'Maximo Integration',
        content: 'IBM Maximo Enterprise Asset Management integration enables synchronization of asset data with carbon emissions tracking. Configure the integration in Phase 8 → Third-Party Integrations tab. Provide your Maximo server URL, API credentials, and authentication method. Map Maximo asset categories to GGAS emission sources. Schedule automatic synchronization (hourly, daily, weekly) or trigger manual sync. Assets are imported with: asset number and description, location and facility assignment, manufacturer and model information, operating hours and maintenance records, and energy consumption data.',
      },
      {
        title: 'Maximo Configuration',
        content: 'To configure Maximo integration: Enable the Maximo integration toggle. Enter your Maximo server URL (e.g., https://maximo.company.com). Provide API key or configure OAuth authentication. Test the connection to verify credentials. Configure field mapping (Maximo fields to GGAS fields). Select asset categories to synchronize (vehicles, HVAC equipment, generators, etc.). Set synchronization schedule. Review and approve the initial sync. The system will automatically sync assets on the configured schedule and flag any synchronization errors for review.',
      },
      {
        title: 'Maximo Asset Tracking',
        content: 'Synchronized Maximo assets appear in a dedicated Assets view with: asset identification (number, description, location), emission source linkage (connect assets to emission sources), operating metrics (hours, fuel consumption, efficiency), maintenance history (last maintenance, next scheduled), and emission calculations based on asset operation. Link assets to activity data for automated emission calculations. When assets are retired or moved in Maximo, changes are reflected in GGAS automatically.',
      },
      {
        title: 'Microsoft Single Sign-On',
        content: 'Enable Microsoft Single Sign-On (SSO) to allow users to authenticate using their Microsoft work accounts (Azure Active Directory). Users benefit from: seamless login without separate GGAS passwords, centralized identity management through Azure AD, multi-factor authentication (MFA) from Microsoft, automatic user provisioning on first login, and consistent security policies across applications. Administrators manage user access through Azure AD groups.',
      },
      {
        title: 'Microsoft SSO Configuration',
        content: 'To enable Microsoft SSO: Navigate to Admin Panel → Microsoft SSO tab. Toggle "Enable Microsoft SSO Integration". Enter your Azure Tenant ID (found in Azure Portal → Azure Active Directory → Properties). Enter Application (Client) ID from your Azure AD app registration. Provide Client Secret (created in Azure AD app registration → Certificates & secrets). Configure Redirect URI (must match Azure AD app registration). Enable auto-provisioning to create user accounts on first login. Set default role for new users. Specify allowed email domains (optional). Test the SSO configuration. Save settings.',
      },
      {
        title: 'Microsoft SSO User Experience',
        content: 'When SSO is enabled, users see a "Sign in with Microsoft" button on the login page. Clicking this redirects to Microsoft login where users enter their work email and password. After Microsoft authentication, users are redirected back to GGAS and automatically logged in. First-time users are automatically provisioned with the default role (if auto-provisioning is enabled). Existing users can link their GGAS account to their Microsoft account. Users can still use traditional username/password login if SSO is configured as optional rather than required.',
      },
      {
        title: 'SSO Security Best Practices',
        content: 'Security recommendations for Microsoft SSO: Enable MFA in Azure AD for all users accessing GGAS. Regularly review Azure AD app permissions and access logs. Set up conditional access policies in Azure AD (require MFA, restrict by location/device). Configure session timeouts appropriately for your security requirements. Monitor SSO login attempts and failures in the audit logs. Implement emergency access procedures in case of Azure AD outage. Document your SSO configuration for disaster recovery. Test SSO regularly to ensure it remains functional after Azure AD or GGAS updates.',
      },
      {
        title: 'Getting Started with Phase 8',
        content: 'To begin using Phase 8 autonomous data collection features: Navigate to the Autonomous Collection page from the main menu. Start with Document Processing: upload a few sample documents to test OCR accuracy. Review and approve extracted data. Configure Email Monitoring: add an email monitor for a dedicated carbon data mailbox. Set up filtering and categorization rules. Install Browser Extension: install from Chrome Web Store or Firefox Add-ons. Enable auto-capture for travel bookings. Configure Third-Party Integrations: set up Maximo integration if you use Maximo. Enable Microsoft SSO in Admin Panel if desired. Monitor and refine: review processing accuracy and adjust settings. Train templates on your specific documents. Refine categorization rules based on actual data. The system will continuously improve as it processes more data.',
      },
    ],
  },
  {
    id: 'phase9',
    title: 'Phase 9: Blockchain Carbon Ledger',
    icon: <SecurityIcon />,
    content: 'Phase 9 introduces blockchain technology to provide immutable emission records, transparent carbon credit management, supply chain traceability, and enterprise-grade distributed ledger capabilities. The Blockchain Carbon Ledger ensures data integrity, prevents tampering, and enables trusted collaboration across organizational boundaries.',
    subsections: [
      {
        title: 'Overview of Blockchain Carbon Ledger',
        content: 'The Blockchain Carbon Ledger leverages distributed ledger technology to create an immutable, transparent, and auditable record of all carbon-related activities. This system ensures that emission data cannot be altered retroactively, provides cryptographic proof of data authenticity, enables multi-party verification, and establishes trust networks for carbon data sharing. By combining blockchain with traditional carbon accounting, organizations achieve unprecedented levels of data integrity and stakeholder confidence.',
      },
      {
        title: 'Distributed Ledger Architecture',
        content: 'GGAS implements a private blockchain network specifically designed for emission data integrity. The distributed ledger architecture consists of multiple nodes distributed across your organization or trusted partners, with each node maintaining a complete copy of the ledger. Consensus is achieved through multi-party validation before data is committed to the blockchain. The architecture supports both permissioned (private) networks for internal use and hybrid models that connect to public blockchains for external verification. All emission records, calculations, and audit events are recorded as immutable transactions on the blockchain.',
      },
      {
        title: 'Tamper-Proof Audit Trails',
        content: 'Every emission record is cryptographically hashed and linked to previous records, creating an unbreakable chain of custody. Once data is committed to the blockchain, it cannot be altered or deleted without detection. Any attempt to modify historical records would break the cryptographic chain and be immediately visible to all network participants. The tamper-proof audit trail includes: emission data entries with timestamps and responsible parties, calculation methodologies and emission factors used, verification and approval workflows, data quality scores and validation results, and corrections or adjustments with full justification. This creates complete transparency and accountability for all carbon accounting activities.',
      },
      {
        title: 'Consensus Mechanisms',
        content: 'GGAS uses enterprise-grade consensus mechanisms to validate emission data entries before they are permanently recorded on the blockchain. Multi-party validation ensures that emission data is reviewed and approved by multiple stakeholders before commitment. Configurable approval thresholds allow organizations to set the number of validators required based on data sensitivity (e.g., high-value reductions require more approvers). Smart contract logic automatically enforces data quality requirements, calculation standards, and business rules. Consensus participants can include internal teams (operations, sustainability, finance) and external parties (auditors, regulators, supply chain partners). Rejected transactions are logged but not committed, maintaining a complete record of all validation attempts.',
      },
      {
        title: 'Smart Contracts for Data Validation',
        content: 'Smart contracts are self-executing programs deployed on the blockchain that automatically enforce data validation rules and quality requirements. When emission data is submitted to the blockchain, smart contracts automatically verify: data completeness (all required fields present), range validation (values within acceptable limits), calculation accuracy (emission factors correctly applied), consistency with historical patterns, and compliance with organizational policies. Smart contracts can trigger automated workflows such as requesting additional documentation for unusual data, routing high-value reductions for executive approval, and initiating third-party audits for material emissions. All smart contract execution is recorded on the blockchain, providing complete transparency into validation logic.',
      },
      {
        title: 'Automated Carbon Credit Trading',
        content: 'Smart contracts enable automated purchasing of carbon credits based on predefined criteria and organizational carbon management strategies. Configure trading rules including: maximum price per credit, preferred project types (renewable energy, forestry, direct air capture), geographic preferences, vintage year requirements, and certification standards (VCS, Gold Standard, CDM). When your organization\'s emission reduction targets are not met through operational improvements, the system automatically identifies and purchases high-quality carbon credits from verified registries. All purchases are recorded on the blockchain with full traceability to the specific emission event being offset. Automated trading reduces administrative overhead while ensuring timely compliance with carbon neutrality commitments.',
      },
      {
        title: 'Carbon Credit Retirement Tracking',
        content: 'The blockchain ledger provides immutable records of carbon credit retirement, preventing double counting and ensuring credits are only used once. When credits are retired to offset specific emissions, the transaction is permanently recorded with: unique credit serial numbers, project details and certification, emission event being offset, retirement date and timestamp, and responsible party information. The system integrates with major carbon credit registries (VCS, CDM, Gold Standard, ACR) to verify credit authenticity before purchase and automatically notify registries when credits are retired. A public-facing blockchain explorer allows stakeholders to verify your carbon credit retirements and confirm authenticity of carbon neutrality claims.',
      },
      {
        title: 'Offset Project Verification',
        content: 'Blockchain-based verification ensures that carbon offset projects are authentic, additional, and deliver real emission reductions. The system tracks: project registration and certification documentation, independent third-party verification reports, monitoring data from IoT sensors and satellite imagery, credit issuance records from authoritative registries, and project developer track record and reputation. Smart contracts automatically verify that offset projects meet minimum quality standards including additionality (reductions would not have occurred without the project), permanence (reductions are long-lasting), and verification (independent third-party confirmation). Projects failing to meet standards are flagged and excluded from automated purchasing.',
      },
      {
        title: 'Carbon Credit Registry Integration',
        content: 'GGAS integrates with major carbon credit registries to streamline credit procurement, retirement, and verification. Supported registries include: Verra (Verified Carbon Standard - VCS), UN Clean Development Mechanism (CDM), Gold Standard, American Carbon Registry (ACR), Climate Action Reserve (CAR), and regional registries worldwide. The integration provides: real-time credit availability and pricing, automated credit purchase and retirement, serial number tracking and verification, project details and documentation, and retirement certificate generation. All registry interactions are recorded on the blockchain, creating a complete audit trail from credit purchase through final retirement.',
      },
      {
        title: 'Product Carbon Provenance',
        content: 'Track the carbon footprint of products through their entire lifecycle from raw material extraction to end-of-life disposal. The blockchain ledger records: raw material sourcing and associated emissions, manufacturing processes and energy consumption, transportation and logistics footprint, product use phase emissions (for energy-consuming products), and end-of-life disposal or recycling impacts. Each product receives a unique blockchain-based carbon passport containing its complete emission history. Customers can scan QR codes or access web portals to view the verified carbon footprint of products they purchase. This transparency enables informed purchasing decisions and rewards low-carbon products.',
      },
      {
        title: 'Supplier Verification and Engagement',
        content: 'The blockchain network enables secure sharing and verification of supplier emission data, eliminating the need for manual data collection and validation. Suppliers submit their carbon footprint data directly to the blockchain where it is verified through: third-party auditor confirmation, comparison with industry benchmarks, consistency checks against historical data, and multi-party validation by other supply chain participants. Once verified, supplier data is available to all authorized supply chain partners, reducing duplicate data requests and survey fatigue. Supplier performance is tracked over time, with blockchain records providing indisputable evidence of emission reductions and sustainability improvements.',
      },
      {
        title: 'End-to-End Supply Chain Traceability',
        content: 'Blockchain technology enables complete traceability of carbon impacts from raw materials to finished products across complex, multi-tier supply chains. Each step in the supply chain is recorded on the blockchain including: material sourcing and extraction, processing and manufacturing, transportation between tiers, assembly and finishing, and distribution to customers. Smart contracts automatically aggregate emissions across supply chain tiers, providing real-time visibility into Scope 3 emissions. When sustainability issues are identified, the blockchain enables rapid root cause analysis by tracing back through the supply chain to identify the specific supplier or process responsible. This capability is essential for managing Scope 3 Category 1 (Purchased Goods and Services) emissions.',
      },
      {
        title: 'Trust Networks and Partnerships',
        content: 'Establish trusted networks of verified suppliers and partners through blockchain-based reputation systems. Network participants are verified through: identity verification (KYC/KYB processes), sustainability certification (ISO 14001, CDP disclosure), audit history and performance, and peer endorsements from other network members. Trusted suppliers gain preferential treatment in procurement decisions, access to sustainability programs and incentives, and visibility to a broader customer base through the marketplace. Trust scores are calculated based on blockchain-recorded performance metrics including: data quality and completeness, emission reduction achievements, transparency and disclosure, and collaboration with partners. The trust network creates positive incentives for sustainability leadership and data integrity.',
      },
      {
        title: 'Permissioned Network Architecture',
        content: 'GGAS implements permissioned blockchain networks that provide enterprise control and privacy while maintaining the benefits of distributed ledger technology. Network administrators control: who can join the network, which data is visible to which participants, who can validate transactions (consensus participation), and who can deploy smart contracts. Role-based access controls ensure that sensitive business data is only shared with authorized parties while emission-related data can be more broadly accessible. The permissioned architecture meets enterprise security requirements including: SOC 2 Type II compliance, ISO 27001 certification, GDPR data privacy regulations, and industry-specific standards (e.g., HIPAA for healthcare). Private networks can be deployed entirely on-premises or in private cloud environments for maximum control.',
      },
      {
        title: 'Interoperability with Public Blockchains',
        content: 'While your primary carbon data resides on a private blockchain, GGAS supports interoperability with public blockchain networks for external verification and transparency. Key capabilities include: anchoring private blockchain hashes to public chains (Ethereum, Bitcoin) for tamper-evident proof, cross-chain bridges for transferring verified credentials, integration with public carbon credit tokenization platforms, and support for decentralized identifiers (DIDs) and verifiable credentials. Organizations can choose to publish summary emissions data, carbon neutrality claims, or sustainability achievements to public blockchains for stakeholder verification while keeping detailed operational data private. This hybrid approach balances transparency with commercial confidentiality.',
      },
      {
        title: 'Layer 2 Scalability Solutions',
        content: 'To support high-volume transaction processing required by large enterprises, GGAS implements Layer 2 scaling solutions that increase throughput while maintaining security. Layer 2 technologies include: state channels for high-frequency data updates, sidechains for parallel transaction processing, rollups for batch transaction settlement, and off-chain computation with on-chain verification. These solutions enable GGAS to handle: thousands of emission data entries per second, real-time IoT sensor data streams, high-frequency trading of carbon credits, and massive supply chain data volumes. Layer 2 implementations significantly reduce transaction costs (gas fees) while maintaining the security guarantees of the underlying blockchain. Periodic settlement to the main chain (Layer 1) provides final immutability.',
      },
      {
        title: 'Regulatory Compliance Framework',
        content: 'The blockchain implementation is designed to meet financial and environmental regulations across global jurisdictions. Compliance features include: IFRS and US GAAP accounting standards support, SEC emissions disclosure requirements (proposed climate rules), EU Corporate Sustainability Reporting Directive (CSRD), Task Force on Climate-related Financial Disclosures (TCFD), and Greenhouse Gas Protocol standards. The immutable audit trail and cryptographic verification simplify regulatory audits by providing indisputable evidence of emission calculations, data provenance, and internal controls. Regulators can be granted read-only access to blockchain data to verify compliance without compromising sensitive business information. All blockchain configurations are documented and maintained to demonstrate compliance with evolving regulations.',
      },
      {
        title: 'Blockchain Node Configuration',
        content: 'To participate in the blockchain carbon ledger, organizations deploy one or more blockchain nodes. Node configuration includes: selecting node type (validator, observer, archive), allocating hardware resources (CPU, memory, storage), configuring network connectivity and firewall rules, setting up cryptographic key management, and establishing backup and disaster recovery procedures. GGAS provides containerized node deployments for easy installation on-premises or in cloud environments. Monitoring tools track node health including: synchronization status with the network, transaction processing throughput, consensus participation metrics, and storage utilization. Multi-node deployments provide high availability and fault tolerance.',
      },
      {
        title: 'Smart Contract Development and Deployment',
        content: 'Organizations can develop custom smart contracts to encode specific carbon management policies and business rules. The smart contract development environment includes: a visual contract designer for non-programmers, a code editor with syntax highlighting and debugging, a testing framework with automated test generation, and security scanning tools to identify vulnerabilities. Contracts are written in industry-standard languages (Solidity for Ethereum-compatible chains) and undergo automated security audits before deployment. A governance process ensures that contract updates are reviewed and approved by stakeholders before deployment to production. All smart contract code is stored on the blockchain for transparency and auditability.',
      },
      {
        title: 'Blockchain Explorer and Transparency Portal',
        content: 'The blockchain explorer provides a user-friendly interface for viewing and verifying blockchain data. Features include: transaction search by hash, block number, or date, block details including timestamp, validator, and transaction list, address lookup for participants in the network, smart contract interaction and event logs, and graphical visualizations of network activity. Public-facing portals allow stakeholders (customers, investors, regulators) to verify carbon neutrality claims, view carbon credit retirements, and audit emission reduction progress. Organizations control what data is publicly accessible while maintaining full transparency for internal stakeholders and authorized partners.',
      },
      {
        title: 'Data Migration to Blockchain',
        content: 'Migrate existing emission data to the blockchain with tools that maintain historical accuracy and traceability. The migration process includes: extracting data from legacy systems (databases, spreadsheets, ERPs), validating data quality and completeness, transforming data to blockchain-compatible formats, cryptographically hashing historical records, and committing data to the blockchain with original timestamps. Migrated data is clearly marked with its source system and migration date to distinguish it from natively blockchain-recorded data. The migration creates an immutable archive of historical emissions while enabling forward-looking blockchain benefits. Incremental migration allows organizations to phase in blockchain technology without disrupting ongoing operations.',
      },
      {
        title: 'Blockchain Security Best Practices',
        content: 'Ensure the security of your blockchain carbon ledger through comprehensive security controls including: private key management using hardware security modules (HSMs) or multi-signature wallets, network encryption (TLS) for all node communications, regular security audits and penetration testing, access control and authentication for all blockchain operations, and incident response procedures for security events. Keys used for signing transactions should be distributed across multiple parties (multi-sig) to prevent single points of failure or unauthorized transactions. Regular backups of blockchain data and configuration ensure recoverability in disaster scenarios. Security training ensures that all blockchain participants understand their responsibilities for protecting the network.',
      },
      {
        title: 'Performance Optimization',
        content: 'Optimize blockchain performance for enterprise-scale carbon accounting through configuration tuning and architectural best practices. Optimization strategies include: adjusting block size and block time for throughput vs. latency tradeoffs, implementing transaction batching to reduce overhead, using efficient consensus algorithms (PBFT, RAFT for permissioned networks), partitioning data across multiple chains (sharding) for parallel processing, and archiving old data to reduce active chain size. Performance monitoring tracks key metrics including transactions per second (TPS), block confirmation time, network latency, and storage growth rate. Capacity planning ensures the network can handle projected growth in data volume and transaction frequency.',
      },
      {
        title: 'Integration with Existing Systems',
        content: 'The blockchain carbon ledger integrates seamlessly with existing GGAS features and external enterprise systems. Integration points include: automatic blockchain recording of emission calculations, blockchain verification for audit workflows, supply chain data sharing with blockchain-verified suppliers, carbon credit trading connected to blockchain registries, and API endpoints for external system integration. Smart contracts can trigger actions in external systems such as: generating work orders when emissions exceed thresholds, updating financial systems with carbon credit purchases, and notifying stakeholders of significant events. The integration layer handles data transformation, error handling, and retry logic to ensure reliable operation.',
      },
      {
        title: 'Getting Started with Blockchain Carbon Ledger',
        content: 'To begin using Phase 9 blockchain features: Navigate to Blockchain Carbon Ledger in the Innovation menu. Complete the blockchain network setup wizard: select network type (private, hybrid, public), configure node settings and resources, set up consensus participants and validators, and define smart contract rules and policies. Migrate existing emission data to blockchain for historical continuity. Configure carbon credit trading rules and registry connections. Set up supply chain participants and establish trust networks. Deploy smart contracts for automated validation and workflows. Test the blockchain integration in a sandbox environment. Enable blockchain recording for new emission data. Monitor blockchain health and performance through the dashboard. Train team members on blockchain concepts and workflows. The system provides guided tutorials and documentation to simplify blockchain adoption.',
      },
    ],
  },
  {
    id: 'phase10',
    title: 'Phase 10: Carbon Intelligence Engine',
    icon: <AIIcon />,
    content: 'Phase 10 introduces the Carbon Intelligence Engine, a comprehensive system for competitive benchmarking, financial impact analysis, materiality assessment automation, and enterprise-level strategic carbon intelligence. This advanced analytics platform enables data-driven decision-making, peer comparison, ROI optimization, and board-level reporting for strategic carbon management.',
    subsections: [
      {
        title: 'Overview of Carbon Intelligence Engine',
        content: 'The Carbon Intelligence Engine transforms raw emissions data into actionable strategic insights. By combining competitive benchmarking, financial modeling, materiality assessment, and enterprise analytics, organizations gain a comprehensive understanding of their carbon performance relative to peers, the financial implications of carbon strategies, stakeholder materiality considerations, and long-term strategic opportunities. This intelligence empowers executives, sustainability leaders, and board members to make informed decisions about carbon investments, reduction strategies, and climate risk management.',
      },
      {
        title: 'Anonymous Peer Networks',
        content: 'Participate in secure peer networks that enable benchmarking without revealing company identity. Anonymous Peer Networks facilitate data sharing among industry peers while maintaining confidentiality and competitive sensitivity. Organizations submit their emissions data, intensity metrics, and performance indicators to the network where data is anonymized and aggregated. Machine learning algorithms match your organization with appropriate peer groups based on industry sector, size, geography, and business model. Compare your performance against anonymized peers to identify gaps, opportunities, and best practices. The system uses advanced cryptographic techniques including zero-knowledge proofs and secure multi-party computation to ensure that individual company data cannot be reverse-engineered from aggregated results. Peer networks are governed by strict data sharing agreements and confidentiality protocols.',
      },
      {
        title: 'Industry Databases',
        content: 'Access comprehensive databases of emission performance across sectors, providing context for your carbon footprint and reduction targets. Industry databases aggregate data from public disclosures (CDP, annual reports, sustainability reports), regulatory filings (EPA, SEC), academic research and industry studies, and voluntary peer network contributions. The databases cover emissions intensity by sector (tCO2e per million revenue, per employee, per unit of production), reduction trajectory trends over time, technology adoption rates (renewable energy, efficiency measures, carbon capture), and best practice case studies from industry leaders. Advanced search and filtering capabilities enable precise peer identification based on multiple criteria. Regular updates ensure data remains current and relevant for strategic planning.',
      },
      {
        title: 'Statistical Analysis and Rankings',
        content: 'Understand where your organization stands relative to peers through comprehensive statistical analysis and percentile rankings. The system calculates your performance across multiple dimensions including: absolute emissions (total tCO2e), emission intensity (tCO2e per revenue, employee, or product unit), reduction rate (year-over-year change), and target ambition (alignment with 1.5°C pathway). Percentile rankings show your position relative to peers: top quartile (75th-100th percentile) indicates industry leadership, median performance (25th-75th percentile) represents average performance, and bottom quartile (0-25th percentile) suggests improvement opportunities. Trend analysis identifies whether your performance gap is closing, stable, or widening over time. Graphical dashboards visualize your position with peer distribution histograms, percentile charts, and trajectory comparisons.',
      },
      {
        title: 'Performance Gap Analysis',
        content: 'Identify and quantify performance gaps between your organization and industry leaders or peer group averages. Gap analysis breaks down differences by emission scope (Scope 1, 2, 3), business unit or facility, emission source category, and reduction initiative maturity. For each gap, the system quantifies the absolute gap (tCO2e difference), relative gap (percentage difference), financial impact (cost of gap at carbon price), and closure timeframe (years to reach peer level at current trajectory). Visualization tools including waterfall charts, gap bridges, and heat maps make gaps immediately actionable. The system prioritizes gaps by materiality, achievability, and financial impact to guide strategic planning.',
      },
      {
        title: 'Best Practice Identification',
        content: 'Automatically identify top performers in your industry and analyze their strategies, technologies, and approaches to emission reduction. The system uses machine learning to analyze disclosed information including sustainability reports, patent filings, technology investments, and public presentations to identify common patterns among high performers. Key insights include: technology and process innovations adopted by leaders, organizational structures and governance models, carbon pricing strategies and internal mechanisms, supply chain engagement approaches, and renewable energy procurement strategies. Case study libraries provide detailed documentation of successful reduction projects with quantified results, implementation timelines, costs and ROI, lessons learned, and applicability to your organization. The system recommends specific best practices that are most relevant to your industry, size, and current maturity level.',
      },
      {
        title: 'Carbon ROI Calculator',
        content: 'Calculate comprehensive return on investment for carbon reduction initiatives, moving beyond simple payback to capture all financial benefits and costs. The ROI calculator includes: operational savings (energy cost reductions, efficiency gains, waste reduction), carbon credit revenues (from selling credits or avoiding purchases), avoided compliance costs (carbon taxes, cap-and-trade obligations, regulatory penalties), risk mitigation benefits (reduced climate physical risks, lower cost of capital, avoided asset stranding), and revenue opportunities (green products, carbon-conscious customers, government incentives). The calculator models cash flows over the project lifetime (typically 10-30 years) with configurable assumptions for discount rates, carbon price trajectories, energy price inflation, and technology performance degradation. Sensitivity analysis shows how ROI varies under different scenarios including high/low carbon prices, faster/slower technology improvement, and best/worst case operational savings.',
      },
      {
        title: 'Carbon Pricing Scenarios',
        content: 'Model the financial impact of different carbon pricing scenarios on reduction initiative economics and business operations. The system includes pre-configured scenarios based on: regulatory projections (IEA, IPCC, national climate plans), market analyst forecasts (Bloomberg, Carbon Tracker), corporate internal carbon price benchmarks, and science-based targets (1.5°C, 2°C pathways). For each scenario, calculate the shadow cost of emissions, financial exposure at different carbon prices, breakeven point for reduction investments, and optimal timing for capital deployment. Scenario modeling helps organizations: set internal carbon prices for capital allocation decisions, prioritize projects based on carbon price resilience, prepare for regulatory carbon pricing mechanisms, and communicate climate financial risks to investors and board members.',
      },
      {
        title: 'NPV Analysis for Long-term Strategies',
        content: 'Conduct Net Present Value (NPV) analysis for long-term carbon strategies spanning decades. Long-term NPV analysis is critical for major infrastructure investments (renewable energy plants, carbon capture systems, facility redesigns) that have multi-decade operational lives. The calculator models: upfront capital expenditures and installation costs, annual operational and maintenance costs, energy and carbon cost savings over project lifetime, residual value at end of project life, and financing costs (debt service, cost of capital). Advanced features include: real options analysis (value of waiting vs. acting now), decision tree modeling (sequential investment decisions), Monte Carlo simulation (uncertainty quantification), and portfolio optimization (optimal mix of reduction projects). Results are presented in financial terms familiar to CFOs and boards including NPV, internal rate of return (IRR), modified IRR, payback period, and profitability index.',
      },
      {
        title: 'Total Cost of Carbon',
        content: 'Calculate the comprehensive Total Cost of Carbon (TCC) that includes all direct and indirect costs associated with your organization\'s carbon footprint. Total Cost of Carbon includes: direct emission costs (fuel, electricity, process emissions), carbon pricing costs (taxes, cap-and-trade allowances, internal carbon price), compliance costs (monitoring, reporting, verification, auditing), risk costs (climate change physical risks, transition risks, litigation risk), operational costs (inefficiency, waste, equipment downtime), reputational costs (customer perception, brand value impact), and financial costs (higher cost of capital, investor discount, stranded assets). The TCC framework quantifies costs that are often hidden or externalized, providing a complete picture of carbon-related financial exposure. Benchmarking TCC against revenue, EBITDA, or operational costs provides context for carbon reduction investment decisions. The system tracks TCC over time to demonstrate the financial value of emission reduction programs.',
      },
      {
        title: 'Investment Prioritization',
        content: 'Rank carbon reduction opportunities by financial attractiveness using multi-criteria decision analysis. The prioritization framework evaluates each opportunity on: financial return (NPV, IRR, payback period), emission reduction potential (absolute tCO2e reduction, intensity improvement), implementation feasibility (technical readiness, organizational capacity, timeline), strategic alignment (with corporate goals, stakeholder expectations, regulatory requirements), and co-benefits (air quality, employee health, operational efficiency, resilience). Weighted scoring combines these dimensions based on organizational priorities. Visual prioritization matrices (e.g., marginal abatement cost curves, 2x2 attractiveness-feasibility matrices) make trade-offs transparent. The system generates optimized implementation roadmaps that sequence projects to maximize emission reductions while maintaining financial discipline. Scenario planning shows how prioritization changes under different carbon price assumptions or strategic objectives.',
      },
      {
        title: 'Budget Optimization',
        content: 'Optimize carbon spending across initiatives to maximize emission reduction impact given budget constraints. Budget optimization uses mathematical optimization techniques (linear programming, integer programming, genetic algorithms) to find the optimal allocation of limited resources across competing reduction opportunities. The optimizer considers: budget constraints (annual capital budget, operational budget), emission reduction targets (absolute or intensity), timing constraints (project dependencies, resource availability), risk preferences (diversification, proven vs. innovative technologies), and strategic goals (priority facilities, early mover advantage). Multiple optimization objectives can be balanced including: maximize emission reductions per dollar spent, minimize financial risk while achieving targets, maximize co-benefits (jobs, health, resilience), and achieve equitable distribution across business units. The system provides scenario analysis showing emission outcomes and financial impacts under different budget levels, helping justify increased carbon investment to executives and boards.',
      },
      {
        title: 'Stakeholder Materiality Analysis',
        content: 'Automatically assess carbon materiality for different stakeholder groups including investors, customers, employees, regulators, and communities. Materiality assessment identifies which carbon issues are most important to each stakeholder group based on: stakeholder engagement data (surveys, interviews, feedback), ESG rating agency methodologies (MSCI, Sustainalytics, CDP), investor ESG integration practices (shareholder resolutions, engagement priorities), customer preferences and purchasing criteria, employee values and recruitment/retention factors, and regulatory compliance requirements. The system maps materiality across double materiality dimensions: financial materiality (impact on enterprise value) and impact materiality (impact on environment and society). Heat maps visualize materiality differences across stakeholder groups, revealing potential conflicts or alignment. Materiality rankings inform disclosure priorities, helping organizations focus reporting and communication on issues that matter most to key stakeholders.',
      },
      {
        title: 'Impact Modeling',
        content: 'Quantify how carbon performance impacts business performance and stakeholder value across multiple dimensions. Impact models link carbon metrics to business outcomes including: financial performance (revenue growth, margin expansion, cost reduction, risk-adjusted returns), market valuation (stock price, PE ratio, EV/EBITDA multiples, cost of capital), customer loyalty (retention rates, net promoter score, market share), employee engagement (satisfaction scores, turnover rates, productivity), regulatory compliance (audit findings, penalty costs, license to operate), and supply chain relationships (supplier willingness to partner, contract terms, resilience). Statistical and machine learning models identify correlations and causal relationships between carbon performance and business outcomes. Scenario analysis quantifies the business value of improved carbon performance, supporting the business case for increased carbon investment. Impact quantification translates sustainability achievements into language that resonates with CFOs, CEOs, and boards.',
      },
      {
        title: 'Regulatory Mapping',
        content: 'Identify material carbon issues based on applicable regulations across all jurisdictions where your organization operates. Regulatory mapping continuously monitors evolving carbon regulations including: carbon pricing mechanisms (carbon taxes, cap-and-trade, offset programs), emissions reporting requirements (EPA GHG Reporting, EU ETS, regional programs), product standards and efficiency mandates, disclosure requirements (SEC climate rules, CSRD, TCFD), and sector-specific regulations (power, transportation, heavy industry). The system maps regulations to your organizational structure, facilities, and operations, identifying: applicable regulations for each entity and facility, compliance obligations and deadlines, materiality thresholds triggering applicability, financial exposure (taxes, allowance costs, penalties), and upcoming regulatory changes requiring preparation. Automated alerts notify relevant teams of new regulations, regulatory changes, and approaching compliance deadlines. Regulatory mapping ensures comprehensive compliance while identifying material regulatory risks requiring strategic attention.',
      },
      {
        title: 'Risk Assessment',
        content: 'Evaluate carbon-related financial and operational risks using frameworks aligned with TCFD (Task Force on Climate-related Financial Disclosures) and other risk management standards. Risk assessment covers both physical climate risks and transition risks: Physical risks include acute risks (extreme weather events, wildfires, floods) and chronic risks (temperature changes, sea level rise, water scarcity) impacting facilities, supply chains, and operations. Transition risks include policy and regulatory risks (carbon pricing, emissions standards), technology risks (disruption from low-carbon alternatives), market risks (changing customer preferences, investor requirements), and reputation risks (stakeholder perception, activism, litigation). For each risk, the system evaluates: likelihood (probability of occurrence), magnitude (financial and operational impact), velocity (speed of risk emergence), and persistence (duration of risk). Risk mitigation strategies are identified and evaluated for effectiveness and cost. Risk assessment results support enterprise risk management (ERM) integration, board-level risk reporting, and strategic planning to build climate resilience.',
      },
      {
        title: 'Multi-business Unit Analysis',
        content: 'Conduct consolidated carbon intelligence analysis across diverse business portfolios with different industries, geographies, and carbon profiles. Multi-business unit analysis enables: performance comparison across business units using appropriate metrics and peer groups, identification of best practices within the organization for internal knowledge transfer, allocation of corporate carbon budgets and targets to business units, portfolio-level optimization of reduction investments, and roll-up reporting for corporate-level disclosures and investor communications. The system handles organizational complexity including: different industry benchmarks (oil & gas vs. retail vs. financial services), regional variations (carbon intensity, regulatory environment), acquisition integration (incorporating new entities), and divestiture impacts (portfolio carbon profile changes). Visualization tools provide executive dashboards showing portfolio-wide carbon performance, risks, and opportunities. Drill-down capabilities enable detailed analysis of individual business units while maintaining portfolio context.',
      },
      {
        title: 'M&A Carbon Due Diligence',
        content: 'Conduct comprehensive carbon due diligence for mergers and acquisitions to identify climate-related risks, liabilities, and opportunities in potential transactions. M&A due diligence includes: emission baseline assessment (Scope 1, 2, 3 inventory), regulatory compliance review (violations, pending enforcement, future obligations), carbon liability quantification (carbon price exposure, stranded asset risk), integration planning (combining carbon management systems, achieving synergies), target alignment (portfolio carbon intensity impact, target achievement impact), and valuation adjustment (adjusting purchase price for carbon risks/opportunities). The system provides standardized due diligence checklists and data room requirements for carbon assessment. Automated analysis compares target company carbon performance against acquirer benchmarks and industry peers. Integration playbooks guide post-merger carbon management system integration. Scenario analysis models portfolio carbon profile under different transaction structures (full acquisition vs. minority stake, asset purchase vs. stock purchase). M&A due diligence ensures climate considerations are fully integrated into transaction decisions and pricing.',
      },
      {
        title: 'Strategic Planning and Scenario Analysis',
        content: 'Develop long-term carbon strategy with comprehensive scenario analysis across multiple climate and business futures. Strategic planning capabilities include: long-range target setting (10-30 year targets aligned with climate science), pathway development (credible routes to achieve targets), technology roadmaps (innovation investments and deployment timelines), business model evolution (low-carbon products, circular economy), and capital allocation strategy (investment prioritization over time). Scenario analysis tests strategy robustness under different futures: climate policy scenarios (stringent regulation vs. business-as-usual), technology scenarios (breakthrough innovations vs. incremental improvement), economic scenarios (high growth vs. recession), and stakeholder scenarios (high activism vs. low pressure). For each scenario, assess strategy effectiveness, identify strategy adjustments needed, evaluate financial impacts, and determine trigger points for strategy pivots. Strategic planning outputs include: multi-year capital investment roadmaps, organization and governance requirements, capability building needs (skills, systems, partnerships), and key performance indicators (KPIs) for tracking progress. Strategy development workshops guide executive teams through scenario analysis and strategy formulation.',
      },
      {
        title: 'Board Reporting and Executive Dashboards',
        content: 'Deliver executive-level carbon intelligence for board oversight and strategic decision-making. Board reporting transforms detailed carbon data into concise, strategic insights that enable governance oversight and informed decision-making. Executive dashboards include: performance against targets (reduction trajectory, science-based target alignment), peer benchmarking (industry ranking, competitive position), financial impact summary (carbon costs, investment returns, financial exposure), risk and opportunity assessment (material climate risks, strategic opportunities), and strategic initiatives (major projects, expected outcomes, resource requirements). Reports are designed for board cadence (quarterly or annual) with executive summaries, key metrics, and clear recommendations. Visual presentations use infographics, heat maps, and dashboards optimized for board consumption. The system supports different reporting needs: Audit Committee (compliance, controls, assurance), Risk Committee (climate risks, risk management), Nominating/Governance Committee (ESG oversight, disclosure), and full Board (strategy, performance, capital allocation). Automated report generation reduces preparation time while ensuring consistency and accuracy. Board reporting elevates carbon management to strategic governance level, ensuring board engagement and accountability.',
      },
      {
        title: 'Configuring the Carbon Intelligence Engine',
        content: 'To configure and begin using Phase 10 Carbon Intelligence Engine features: Navigate to Carbon Intelligence in the Strategic Planning menu. Complete the initial setup wizard: configure peer network participation (select industries, geographies, anonymity preferences), set up benchmarking parameters (peer selection criteria, metrics of interest), configure financial parameters (discount rates, carbon price assumptions, currency), define materiality assessment criteria (stakeholder groups, evaluation methodology), and establish reporting preferences (metrics, visualization styles, reporting frequency). Connect industry databases and peer networks: authenticate with third-party data providers, select relevant industry sectors and geographies, configure data refresh schedules, and set up automatic peer matching. Configure financial models: input current carbon prices and price trajectories, configure organizational cost of capital and discount rates, set up project evaluation criteria and thresholds, and define budget constraints and allocation rules. Set up risk assessment: map facilities and operations to climate risk exposures, configure risk evaluation criteria (likelihood, magnitude), identify risk mitigation strategies and costs, and establish risk reporting thresholds. Configure board reporting: select key performance indicators for executive dashboards, design report templates and visualizations, set up automated report generation schedules, and configure stakeholder distribution lists. The system provides guided configuration with sensible defaults based on your industry and organizational characteristics.',
      },
      {
        title: 'Using Competitive Benchmarking',
        content: 'To perform competitive benchmarking analysis: Navigate to Competitive Benchmarking under Carbon Intelligence. Select peer group: use automatic matching based on industry/size/geography, manually select specific companies or create custom peer group, or use industry database for broader comparison. Choose benchmarking metrics: emissions intensity (per revenue, per employee, per product unit), absolute emissions and trajectories, reduction rates and target ambition, or custom metrics relevant to your industry. Run benchmarking analysis: the system retrieves peer data, normalizes metrics for comparability, calculates statistical distributions (quartiles, averages, ranges), generates your percentile rankings, and identifies performance gaps. Review results: interactive dashboards show your position relative to peers, drill down into specific metrics or emission sources, identify leaders and their strategies, and export reports for internal communication. Set up continuous monitoring: configure alerts for peer performance changes, schedule regular benchmarking updates (quarterly, annual), track your relative performance over time, and measure effectiveness of improvement initiatives.',
      },
      {
        title: 'Conducting Financial Impact Analysis',
        content: 'To analyze financial impacts of carbon strategies: Navigate to Financial Impact Analysis under Carbon Intelligence. For existing operations: run Total Cost of Carbon analysis to quantify current carbon-related costs, model carbon price scenarios to understand future exposure, identify cost reduction opportunities through efficiency and reduction projects, and quantify financial risks from climate change and transition. For proposed projects: enter project details (capex, opex, expected reductions, timeline), configure carbon price assumptions and economic parameters, run ROI calculator to evaluate financial attractiveness, conduct sensitivity analysis to test assumptions, and compare against other investment opportunities using NPV and IRR. Portfolio optimization: input all candidate reduction projects with costs and reductions, specify budget constraints and timeline, configure optimization objectives (maximize reductions, maximize ROI, minimize risk), run optimizer to find optimal project portfolio, and review recommended allocation with financial metrics and emission outcomes. Generate reports: executive summaries for leadership, detailed financial models for finance teams, business case documentation for project approval, and board presentations for capital allocation decisions.',
      },
      {
        title: 'Performing Materiality Assessment',
        content: 'To conduct automated materiality assessment: Navigate to Materiality Assessment under Carbon Intelligence. Identify stakeholder groups: investors and shareholders, customers and consumers, employees and labor unions, regulators and policymakers, communities and NGOs, and suppliers and business partners. Configure assessment methodology: select frameworks (GRI, SASB, TCFD), define evaluation criteria (financial impact, stakeholder importance, likelihood), set materiality thresholds, and choose double materiality approach (financial and impact). Collect stakeholder input: import stakeholder survey data, integrate ESG rating agency feedback, analyze shareholder engagement and resolutions, review customer feedback and market research, and incorporate employee engagement data. Run materiality analysis: the system scores each carbon issue by stakeholder group, identifies material topics above thresholds, highlights areas of stakeholder alignment/conflict, generates materiality matrix visualizations, and prioritizes issues for disclosure and action. Apply results: prioritize disclosure content based on materiality rankings, allocate resources to material issues, develop stakeholder communication strategies, integrate material issues into strategy and targets, and update materiality assessment annually as context changes.',
      },
      {
        title: 'Leveraging Enterprise Features',
        content: 'To use enterprise carbon intelligence capabilities: Multi-business unit analysis: configure business unit structure and hierarchies, define appropriate peer groups for each unit, establish performance metrics by unit type, conduct cross-unit benchmarking to identify best practices, and generate consolidated corporate reporting with unit-level detail. M&A due diligence: create due diligence checklists and data requests, analyze target company carbon profile, benchmark target against peers and acquirer, quantify carbon-related risks and opportunities, model integration scenarios and portfolio impacts, and prepare carbon integration plans. Strategic planning: facilitate strategy workshops with scenario planning tools, develop long-range targets and pathways, build multi-year investment roadmaps, test strategy robustness under different scenarios, identify key strategic decisions and trigger points, and establish governance and KPIs for strategy execution. Board reporting: configure executive dashboards with KPIs, set up automated quarterly or annual reports, customize visualizations for board preferences, generate executive summaries and recommendations, and track board decisions and follow-up actions. The enterprise features transform carbon intelligence from operational tool to strategic asset supporting C-suite and board decision-making.',
      },
      {
        title: 'Best Practices for Carbon Intelligence',
        content: 'To maximize value from the Carbon Intelligence Engine: Data quality: ensure accurate and complete emissions data as foundation for analysis, validate data against multiple sources and methodologies, maintain audit trails and documentation, and continuously improve data collection processes. Regular updates: refresh benchmarking data on regular cadence (quarterly/annually), update financial assumptions as market conditions change, revisit materiality assessment as stakeholder priorities evolve, and maintain peer group relevance as business changes. Stakeholder engagement: share benchmarking results with relevant teams to motivate improvement, use financial analysis to build business cases for carbon investments, communicate material issues to stakeholders through appropriate channels, and engage board members with strategic intelligence and clear recommendations. Integration: link carbon intelligence to strategic planning processes, integrate carbon considerations into capital allocation decisions, connect carbon performance to compensation and incentives, and embed carbon metrics in business performance dashboards. Continuous improvement: track utilization of intelligence insights, measure impact of carbon intelligence on decisions, gather user feedback and adjust configurations, and stay current with emerging best practices and methodologies. The most successful organizations treat carbon intelligence as ongoing strategic capability rather than one-time analysis.',
      },
    ],
  },
  {
    id: 'phase11',
    title: 'Phase 11: Supply Chain Carbon X-Ray',
    icon: <AccountTreeIcon />,
    content: 'Phase 11 introduces comprehensive supply chain carbon management with multi-dimensional supplier scoring, carbon hotspot identification, AI-powered alternative supplier intelligence, and collaborative decarbonization planning. These enterprise-grade capabilities enable organizations to measure, manage, and reduce Scope 3 supply chain emissions systematically.',
    subsections: [
      {
        title: 'Overview of Supply Chain Carbon X-Ray',
        content: 'The Supply Chain Carbon X-Ray provides unprecedented visibility into supply chain carbon emissions through multi-dimensional supplier assessment, visual carbon hotspot mapping, AI-powered alternative supplier recommendations, collaborative decarbonization programs, and enterprise supply chain management. This comprehensive approach transforms supply chain sustainability from reactive compliance to proactive strategic advantage, enabling organizations to identify high-impact reduction opportunities, engage suppliers collaboratively, optimize procurement decisions, and manage carbon-related supply chain risks.',
      },
      {
        title: 'Multi-Dimensional Supplier Carbon Scoring',
        content: 'Assess suppliers across multiple carbon performance dimensions with sophisticated scoring algorithms that evaluate: Direct Emission Intensity (tCO2e per unit of product/service), Carbon Reduction Targets and Performance (target ambition, historical progress, trajectory to goals), Renewable Energy Usage (percentage renewable, growth rate, procurement strategy), Environmental Management Systems (ISO 14001, ISO 50001, other certifications), and Climate Risk Exposure and Adaptation (physical and transition risks, resilience planning). Each dimension receives a sub-score (0-100) based on industry benchmarks and best practices, with an overall supplier carbon score providing at-a-glance performance assessment. Scoring models are customizable by industry, product category, and strategic importance to reflect your organization\'s priorities.',
      },
      {
        title: 'Data Integration and Supplier Intelligence',
        content: 'Integrate data from CDP supply chain programs, direct supplier reporting portals, third-party ESG ratings (EcoVadis, MSCI, Sustainalytics), and financial performance systems. Automated data synchronization keeps supplier assessments current while machine learning algorithms identify correlations between carbon performance and financial metrics. Visual heat maps, spend-carbon correlation analysis, and risk assessments provide actionable intelligence for procurement optimization.',
      },
      {
        title: 'AI-Powered Alternative Supplier Recommendations',
        content: 'Machine learning algorithms analyze supplier performance, market data, and organizational requirements to recommend lower-carbon alternatives. The AI considers carbon performance, quality, reliability, pricing, capacity, geographic proximity, and innovation capability. Each recommendation includes carbon reduction potential, cost impact analysis, risk evaluation, and implementation roadmap with confidence scores indicating algorithm certainty.',
      },
      {
        title: 'Decarbonization Planning and Supplier Engagement',
        content: 'Design collaborative programs to help suppliers reduce carbon footprints through capacity building, joint innovation, incentive programs, and co-investment in renewable energy or efficiency upgrades. Track supplier improvement with baseline assessments, progress metrics, and ROI calculations. Integrate carbon performance requirements directly into supplier contracts with template clauses, KPIs, and governance mechanisms.',
      },
      {
        title: 'Enterprise Supply Chain Management',
        content: 'Handle complex international supply chains with multi-regulatory framework support (CSRD, SEC Climate Rules, TCFD), currency and unit conversion, language localization, and cross-border data governance. Specialized category management tools provide tailored approaches for raw materials, logistics, capital goods, services, and energy procurement. Integration with enterprise risk management systems ensures carbon risks receive appropriate governance attention.',
      },
    ],
  },
  {
    id: 'phase-12',
    title: 'Phase 12: Product Carbon Lifecycle Engine',
    icon: <AccountTreeIcon />,
    content: 'Phase 12 introduces the Product Carbon Lifecycle Engine, a comprehensive system for automated Life Cycle Assessment (LCA) calculations, carbon labeling, design optimization, circular economy integration, and enterprise product carbon management. This advanced platform enables organizations to measure, optimize, and communicate product carbon footprints throughout the entire product lifecycle from raw materials to end-of-life, supporting sustainable product development and circular economy business models.',
    subsections: [
      {
        title: 'Overview of Product Carbon Lifecycle Engine',
        content: 'The Product Carbon Lifecycle Engine provides end-to-end product carbon footprint management through automated LCA calculations, standardized carbon labeling, AI-powered design optimization, circular economy integration, and enterprise portfolio management. This comprehensive approach transforms product sustainability from manual assessments to automated, data-driven product carbon intelligence, enabling organizations to develop lower-carbon products, create transparent carbon labels for consumers, optimize designs for minimal environmental impact, implement circular economy business models, and integrate carbon considerations throughout the product development and management lifecycle.',
      },
      {
        title: 'Automated LCA Calculations - Cradle-to-Grave Analysis',
        content: 'Perform comprehensive Life Cycle Assessment covering all product lifecycle stages: Raw Material Extraction and Processing (mining, forestry, agriculture, refining, primary manufacturing), Manufacturing and Assembly (component fabrication, product assembly, packaging, quality control), Distribution and Transportation (primary transport, warehousing, retail distribution, consumer delivery), Product Use Phase (energy consumption during use, maintenance requirements, consumables, expected lifetime), and End-of-Life Treatment (collection and sorting, recycling and material recovery, energy recovery, final disposal). The system automatically calculates carbon emissions for each lifecycle stage using standardized LCA methodologies (ISO 14040/14044, PAS 2050, GHG Protocol Product Standard) with comprehensive emission source coverage including direct process emissions, energy consumption, transportation, waste generation, and material losses. Advanced features include multi-functional process allocation, cut-off criteria for system boundaries, sensitivity analysis for key assumptions, and scenario comparison (current vs. optimized designs).',
      },
      {
        title: 'Database Integration and LCA Data Sources',
        content: 'Seamlessly integrate with major LCA databases for comprehensive environmental data: ecoinvent Database (world\'s most comprehensive LCA database with 18,000+ datasets covering energy, materials, transport, chemicals, agriculture, waste management, and more - automatic data import, version management, geographic specificity for country/region-specific data, and regular updates), GaBi Database (professional LCA software database with industry-specific datasets for automotive, electronics, packaging, construction, and chemicals - validated data from industry associations, government sources, and academic research - modular data architecture for flexible modeling), IDEMAT Database (specialized database for materials and manufacturing processes with focus on European manufacturing - detailed material composition data, process energy requirements, and emission factors - particularly strong in metals, plastics, and electronic components), USDA LCF (US Life Cycle Inventory Database with North American data), ELCD (European Life Cycle Database), and custom in-house databases. Automatic data synchronization keeps emission factors current, intelligent data gap filling uses proxy data when specific factors unavailable, and quality indicators show data source reliability and representativeness.',
      },
      {
        title: 'Rapid Assessment Tools',
        content: 'Accelerate product carbon footprint estimation during early-stage development with AI-powered rapid assessment tools: Streamlined LCA using parametric models based on product characteristics (weight, materials, complexity, energy requirements), machine learning algorithms trained on historical full LCA studies to predict footprints with 85-95% accuracy, input data reduced to 10-20 key parameters vs. 100+ for full LCA, and results available in minutes rather than days or weeks. Product Archetypes library with pre-calculated footprints for common product types (consumer electronics, furniture, apparel, food products, industrial equipment) customizable with product-specific parameters and industry-average assumptions. Estimation Methodologies include spend-based estimation using financial data and EEIO factors, weight-based estimation using material composition and emission intensities, energy-based estimation focused on use-phase energy consumption, and hybrid approaches combining multiple methodologies for improved accuracy. Confidence intervals quantify uncertainty in rapid assessments and identify where detailed data collection would improve accuracy.',
      },
      {
        title: 'Industry-Specific Methodologies',
        content: 'Apply specialized LCA approaches tailored to different product categories: Consumer Electronics (PCF standards for ICT products, component-level carbon accounting for semiconductors, displays, batteries, use-phase energy modeling based on usage patterns, e-waste end-of-life scenarios), Apparel and Textiles (fiber production emissions for cotton, polyester, wool, fabric manufacturing and dyeing processes, garment construction and finishing, consumer care phase modeling, textile recycling scenarios), Food and Beverage (agricultural production modeling including land use change, food processing and preservation, cold chain distribution requirements, packaging material considerations, food waste across lifecycle), Automotive (vehicle manufacturing and assembly, lightweight materials assessment, use-phase fuel/electricity consumption, maintenance and replacement parts, end-of-life recycling rates and material recovery), Construction Materials (embodied carbon in building materials, durability and service life, installation and construction impacts, building operations phase, demolition and recycling potential), and other sectors. Each methodology aligns with relevant Product Category Rules (PCRs) and industry standards ensuring comparability and regulatory compliance.',
      },
      {
        title: 'Carbon Labeling System - Automated Label Generation',
        content: 'Create standardized carbon labels for products with automated generation based on LCA results: Label Types including Footprint Labels (display total carbon footprint in kg CO2e, percentage breakdown by lifecycle stage, visual icons for quick understanding), Performance Labels (grade products A-E based on peer comparison, show performance relative to category average, highlight improvement from previous versions), and Comparison Labels (compare multiple product variants or competitors, show emissions per functional unit, facilitate consumer comparison shopping). Label Formats with visual design templates compliant with standards (ISO 14067, Carbon Trust Product Footprint Label, others), customizable brand colors and styles within standards framework, and multi-language support for global markets. QR Code Integration providing detailed information access via smartphone scan, linking to comprehensive LCA report, methodology explanations, and lifecycle impact breakdowns. Automatic label generation from LCA database, batch processing for product lines, and version control tracking label updates as products evolve.',
      },
      {
        title: 'Environmental Product Declaration (EPD) Generation',
        content: 'Streamline EPD creation and management for B2B communication: EPD Standards Support for ISO 14025 Environmental Labels and Declarations Type III, EN 15804 for construction products, and specific Program Operator requirements (EPD International, IBU, Environdec). Automated EPD Document Generation including executive summary with key findings, detailed LCA results by lifecycle stage, environmental impact indicators beyond carbon (water, eutrophication, acidification, ozone depletion), technical specifications and product information, data quality statements and uncertainty analysis, and references and bibliography. Third-Party Verification Support with verification-ready documentation packages, independent verifier collaboration tools, and audit trail for transparent review process. EPD Registration assistance with program operator submission, digital EPD hosting and distribution, and expiration tracking with renewal reminders (typical 5-year validity). Multi-language EPD generation for international markets with translation of standard sections and localized impact categories where relevant.',
      },
      {
        title: 'Regulatory Compliance and Carbon Labels',
        content: 'Ensure carbon labels and EPDs meet evolving regional requirements: EU Carbon Border Adjustment Mechanism (CBAM) with embedded emissions reporting for imported products (steel, aluminum, cement, fertilizers, electricity), default values vs. actual emissions calculations, and quarterly reporting requirements. EU Ecodesign Directive compliance for energy-related products with energy efficiency labeling requirements and minimum performance standards. French Environmental Labeling Scheme (Affichage Environnemental) with mandatory carbon and environmental information display, sector-specific requirements (food, textiles, electronics, furniture), and standardized calculation methodologies. California Transparency in Supply Chains Act requirements with supply chain emissions disclosure and due diligence documentation. UK Carbon Labeling initiatives with voluntary carbon footprint labels and government procurement preferences. Regulatory Tracking Dashboard monitoring new legislation and standards, deadline alerts for compliance actions, and jurisdictional requirement mapping. Automated compliance checking validates labels against applicable regulations and flags potential issues before publication.',
      },
      {
        title: 'Consumer Communication Tools',
        content: 'Translate technical carbon data into consumer-friendly communication: Visual Communication with infographics showing carbon footprint in relatable terms (car miles driven, tree-planting equivalents, household energy consumption), lifecycle stage breakdowns with simple icons and percentages, and animated explainer videos for complex products. Interactive Tools including carbon comparison calculators allowing consumers to compare product options, "What if" scenarios showing impact of different use patterns (wash temperature, driving behavior, usage frequency), and personalized footprint estimations based on consumer usage context. Mobile Applications with barcode scanning for instant product carbon information, eco-score ratings aggregating multiple environmental impacts, and sustainability tips for product use and disposal. Marketing Material Generation producing fact sheets for sales teams, sustainability stories for product pages, social media content highlighting carbon achievements, and press release templates for product launches. Tone and Style customization adjusting technical detail level for different audiences (consumers, procurement professionals, sustainability experts) and brand voice alignment while maintaining accuracy.',
      },
      {
        title: 'Design Optimization - Material Selection',
        content: 'Recommend lower-carbon materials and components using AI-powered analysis: Material Database with comprehensive carbon intensities for 5,000+ materials (metals, plastics, glass, ceramics, composites, bio-based materials, recycled content materials), geographic-specific emission factors reflecting regional energy grids and production methods, and primary vs. recycled material distinctions. Alternative Material Recommendation Engine using machine learning to suggest substitutions maintaining performance requirements (strength, durability, temperature resistance, electrical properties, aesthetics), calculating carbon savings from material substitution, evaluating cost impact and supply chain feasibility, and ranking alternatives by carbon reduction potential vs. implementation complexity. Design for Environment principles embedded in recommendations: prefer recycled and renewable materials, specify recyclable and biodegradable materials, avoid hazardous substances and conflict minerals, and design for durability and repairability. Material Innovation Tracking monitoring emerging low-carbon materials (bio-plastics, carbon-capture concrete, green steel, recycled composites) with technology readiness assessment and commercial availability forecasting.',
      },
      {
        title: 'Design for Disassembly',
        content: 'Optimize product design for end-of-life carbon impact through disassembly-focused design principles: Modular Design Assessment evaluating component modularity for easy separation, standardized fastener usage vs. adhesives or welds, and material separation feasibility for recycling. Disassembly Complexity Scoring measuring time and skill required for product disassembly, number of tools and process steps needed, and identifying design features that hinder disassembly (permanent adhesives, mixed materials, inaccessible fasteners). End-of-Life Scenario Modeling comparing disassembly scenarios (full disassembly for maximum material recovery, partial disassembly for key components, shredding for bulk material recovery), calculating carbon benefits of material recovery vs. virgin material production, and evaluating economic viability of disassembly operations. Design Recommendations suggesting design modifications for improved disassembly (snap-fits instead of screws, material labels for sorting, separable material layers, modular battery packs for electronics), quantifying carbon impact of design changes across full lifecycle, and providing 3D visualization of proposed disassembly sequence. Circular Economy Standards alignment with EU Circular Economy Action Plan, Right to Repair legislation requirements, and Extended Producer Responsibility compliance.',
      },
      {
        title: 'Manufacturing Process Optimization',
        content: 'Suggest process improvements for carbon reduction in manufacturing: Process Carbon Intensity Analysis evaluating emissions from each manufacturing step (forming, machining, joining, surface treatment, assembly, quality control), identifying high-carbon processes for targeted improvement, and benchmarking against industry best practices. Energy Efficiency Opportunities including equipment upgrades to more efficient machinery, process parameter optimization (temperature, pressure, speed, cycle time), waste heat recovery and cogeneration, and compressed air system optimization. Process Substitution Recommendations suggesting lower-carbon manufacturing methods (additive manufacturing vs. subtractive, cold forming vs. hot forming, powder coating vs. liquid painting, automated vs. manual processes with varying energy profiles), calculating energy and material savings, and evaluating capital investment requirements and payback periods. Renewable Energy Integration assessing manufacturing site solar potential, purchasing renewable energy certificates, and negotiating green energy tariffs with utilities. Yield and Scrap Reduction strategies improving first-pass yield to reduce material waste, implementing predictive maintenance to reduce defects, and optimizing material utilization in cutting and forming operations.',
      },
      {
        title: 'Packaging Optimization',
        content: 'Minimize packaging carbon footprint through intelligent design: Packaging LCA Tools calculating carbon footprint of primary packaging (product contact), secondary packaging (retail display), and tertiary packaging (transport and palletization). Material Reduction Opportunities using lightweighting analysis maintaining protective performance, right-sizing packaging to product dimensions, eliminating unnecessary packaging layers, and optimizing cushioning materials and void fill. Packaging Material Selection comparing corrugated cardboard vs. plastic containers vs. returnable packaging, recycled content vs. virgin materials vs. bio-based alternatives, and mono-material designs for improved recyclability. Packaging Design Optimization modeling product protection performance vs. material use, supply chain damage rates and packaging robustness, and cube utilization for transport efficiency. Returnable Packaging Systems analyzing reusable container lifecycles and return logistics, break-even analysis for reusable vs. single-use packaging, and reverse logistics network design. Regulatory Compliance with EU Packaging and Packaging Waste Directive, Extended Producer Responsibility schemes, and regional recycled content mandates. E-commerce Packaging Specialization addressing right-sized packaging for varied product mixes, frustration-free packaging initiatives, and direct-to-consumer sustainability messaging.',
      },
      {
        title: 'Circular Economy Integration - Circularity Metrics',
        content: 'Track and optimize circular economy performance through comprehensive metrics: Material Circularity Indicator (MCI) measuring proportion of recycled/renewable input materials, product lifespan vs. industry average, recyclability and actual recycling rates at end-of-life, and overall circularity score (0-1 scale). Product Lifetime Extension tracking actual vs. designed product lifetime, repairability and availability of spare parts, upgrade and refurbishment opportunities, and second-life application potential. Waste and By-product Utilization measuring manufacturing scrap recovery and reuse rates, co-product and by-product valorization, and zero-waste-to-landfill progress. Resource Productivity calculating value created per unit of material input, material intensity per unit of functionality, and decoupling economic value from resource consumption. Circular Business Model Metrics including product-as-a-service utilization rates, sharing economy participation levels, and take-back and refurbishment volumes. Dashboard and Reporting with circular economy KPI tracking over time, benchmarking against Ellen MacArthur Foundation targets, and circular economy reporting for sustainability disclosures.',
      },
      {
        title: 'Take-back Program Management',
        content: 'Manage product take-back and recycling programs systematically: Take-back Program Design defining take-back mechanisms (retailer drop-off, mail-back programs, producer collection events, curbside collection partnerships), incentive structures (deposit-refund, discount on next purchase, charity donations, loyalty points), and reverse logistics network optimization. Collection Tracking System monitoring product returns by location, timing, condition, customer demographics, and product age/generation. Refurbishment and Resale Operations managing inspection and grading criteria, refurbishment process workflow, quality assurance for resold products, pricing strategies for secondary market, and warranty/guarantee terms for refurbished items. Recycling and Material Recovery coordinating with certified recycling partners, tracking material recovery rates by product and material type, revenue from recovered materials, and ensuring responsible end-of-life processing. Regulatory Compliance with Extended Producer Responsibility (EPR) regulations (WEEE Directive for electronics, Battery Directive, etc.), collection and recycling target achievement, and reporting to regulatory authorities. Customer Communication including take-back program marketing, instructional materials for product return, transparency on refurbishment/recycling process, and impact reporting (tons recycled, carbon saved, donations made).',
      },
      {
        title: 'Material Flow Analysis',
        content: 'Track material flows through circular business models using advanced analytics: Material Flow Mapping visualizing product and material flows from cradle to cradle, identifying leakage points where materials exit circular system, and quantifying flows in mass and carbon terms. Circular Economy Scenario Modeling comparing linear vs. circular business model impacts, calculating carbon benefits of increased circularity rates, and evaluating economic viability of circular models. Stock and Flow Modeling tracking products in use phase (stock), product retirement and collection flows, and refurbishment vs. recycling pathways. Material Quality Degradation assessing quality loss through recycling loops, finite vs. infinite recyclability by material type, and optimal number of recycling loops before downcycling. Critical Material Tracking focusing on scarce or conflict materials (cobalt, rare earths, etc.), optimizing recovery of critical materials in recycling, and supply chain diversification through circularity. System Dynamics Modeling understanding feedback loops in circular systems, identifying leverage points for system transformation, and long-term sustainability of circular models. Integration with industrial ecology frameworks, cradle-to-cradle design principles, and circular economy measurement frameworks (EU Circular Economy Monitoring Framework, ISO standards).',
      },
      {
        title: 'Secondary Market Integration',
        content: 'Connect products with secondary markets and reuse opportunities: Secondary Market Platforms integration with online resale platforms (eBay, Craigslist, specialized platforms), C2C (consumer-to-consumer) marketplace facilitation, B2C (business-to-consumer) certified refurbished stores, and B2B (business-to-business) secondary equipment markets. Product Valuation Algorithms determining resale value based on age, condition, market demand, and estimating fair market prices for refurbished items. Quality Certification providing certified refurbished grading standards, quality assurance testing protocols, warranty offerings for secondary products, and seller/platform reputation systems. Market Demand Analysis monitoring secondary market trends and demand signals, identifying product features valued in secondary market, timing optimal entry to secondary market, and price elasticity in secondary channels. Carbon Impact Communication calculating carbon savings from purchasing refurbished vs. new, displaying carbon footprint comparison on listings, and marketing environmental benefits of secondary purchase. Remarketing Strategies including timing of secondary market entry, channel selection (online platform vs. proprietary store), pricing strategy balancing environmental and financial goals, and managing brand reputation in secondary market. Extended Producer Responsibility utilizing secondary markets to achieve EPR targets, tracking resale and reuse for EPR reporting, and partnering with social enterprises for secondary sales.',
      },
      {
        title: 'Enterprise Implementation - Portfolio Management',
        content: 'Manage carbon footprints across entire product portfolios: Product Portfolio Overview displaying carbon footprint for all products in portfolio, filtering and sorting by carbon intensity, product category, revenue, and lifecycle stage. Portfolio-Level Metrics calculating total portfolio carbon footprint (scope 3 category 1 and 11), weighted average carbon intensity (kg CO2e per unit, per $ revenue), portfolio carbon trend over time with new products and phase-outs, and portfolio alignment with organizational carbon reduction targets. Hotspot Analysis identifying highest carbon products requiring priority action, product categories with greatest reduction opportunities, and lifecycle stages with largest portfolio impact. Product Benchmarking comparing products within portfolio and against competitors, identifying best-in-class products for knowledge transfer, and analyzing factors driving carbon performance differences. Portfolio Optimization Scenarios modeling impact of product mix changes on portfolio carbon footprint, evaluating phase-out of high-carbon products vs. redesign, and planning new product introduction carbon performance requirements. Executive Dashboard providing portfolio carbon KPIs, trends and progress toward targets, top opportunities for carbon reduction, and investment recommendations by product line.',
      },
      {
        title: 'R&D Integration',
        content: 'Integrate carbon intelligence with product development and innovation processes: Stage-Gate Integration embedding carbon footprint assessment in NPD process with gate criteria including carbon performance thresholds at concept stage, preliminary carbon assessment at development stage, detailed LCA completion, and carbon performance validation at pre-launch. Design Tool Integration with CAD software plugins for real-time carbon feedback (SolidWorks, Autodesk, Siemens NX), BOM carbon calculation as designs evolve, and design rule checking for carbon targets. Innovation Pipeline Carbon Metrics tracking pipeline carbon intensity trend, percentage of pipeline projects meeting carbon targets, innovation projects targeting carbon reduction, and breakthrough innovations with transformative carbon potential. R&D Performance Metrics measuring carbon reduction delivered per R&D dollar invested, time from innovation to carbon impact realization, successful carbon-focused innovations vs. total projects, and R&D portfolio alignment with corporate carbon strategy. Collaboration Tools enabling cross-functional team access (R&D, sustainability, procurement, manufacturing), knowledge sharing on successful carbon reduction designs, and lessons learned database on carbon optimization attempts. Technology Scouting for carbon reduction opportunities monitoring emerging low-carbon technologies and materials, partnerships with universities and research institutions, and competitive intelligence on competitor carbon innovation.',
      },
      {
        title: 'Marketing Integration',
        content: 'Support marketing teams with carbon impact data and communication tools: Marketing Claim Substantiation providing verified data for environmental marketing claims, ensuring compliance with Green Guides (FTC, ASA, etc.) and avoiding greenwashing allegations, and audit trail for claim verification. Product Launch Support generating carbon messaging for product launches, competitive carbon performance positioning, sustainability storytelling and narratives, and visual assets (charts, infographics, animations). Customer Segment Targeting identifying carbon-conscious customer segments, tailoring carbon messaging by segment priorities, and testing message effectiveness with A/B testing. Sales Enablement creating carbon fact sheets for sales teams, competitive comparison tools for tender responses, RFP response automation for carbon questions, and training materials on product carbon performance. Brand Sustainability Reporting aggregating product carbon data for brand reports, showcasing carbon reduction achievements year-over-year, supporting overall brand sustainability positioning, and aligning product with brand purpose and values. Market Research Integration analyzing consumer willingness to pay for lower-carbon products, testing carbon label effectiveness, identifying product attributes valued alongside carbon, and market sizing for sustainable product segments. Public Relations providing data for press releases and media inquiries, crisis communication preparation for carbon controversies, and proactive thought leadership on product sustainability.',
      },
      {
        title: 'Regulatory Tracking',
        content: 'Monitor evolving product carbon regulations globally: Regulatory Intelligence Database comprehensive database of product carbon regulations by country/region, tracking Ecodesign requirements, carbon labeling mandates, emissions reporting obligations, EPD and environmental declaration requirements, and green public procurement criteria. Regulation Monitoring Service with automated alerts for new regulations and amendments, regulatory proposal tracking before finalization, stakeholder consultation opportunities, and regulatory impact assessment on product portfolio. Compliance Calendar tracking compliance deadlines by product and jurisdiction, implementation milestones and preparatory actions, recertification and renewal requirements, and coordinating efforts across product lines. Regulatory Analysis Tools including gap analysis between current products and new requirements, cost-benefit analysis of compliance approaches, risk assessment for non-compliance, and strategy recommendations (product modification vs. market exit vs. compliance delay). Government Engagement managing responses to regulatory consultations, industry association coordination, and government relations strategy on product carbon policy. Future Regulation Forecasting using policy trend analysis and policy modeling to predict future regulatory directions, early preparation for likely requirements, and product strategy adjusting for regulatory roadmaps. Multi-jurisdictional Complexity Management handling conflicting requirements across jurisdictions, harmonization opportunities and mutual recognition, and product variants for different regulatory regimes vs. single global design.',
      },
      {
        title: 'Getting Started with Product Carbon Lifecycle Engine',
        content: 'To begin using the Product Carbon Lifecycle Engine: Navigate to Product Carbon Management in the main menu. Complete the initial setup: configure product categories and taxonomy, define standard product lifecycle stages, set up material databases and emission factors, integrate with existing PLM or ERP systems, and configure user roles and permissions for product sustainability team. Conduct pilot LCA: select representative pilot product, gather product data (BOM, process information, use phase assumptions), run LCA calculation using rapid assessment tools, review results and identify data gaps, refine with detailed data where needed, and generate initial carbon label or report. Expand to portfolio: prioritize products for LCA (high volume, high carbon, strategic importance), develop streamlined data collection process, establish data quality standards and validation procedures, conduct portfolio-wide assessments, and implement regular update cadence. Enable design optimization: train design teams on carbon considerations, integrate into NPD stage-gate process, establish carbon performance targets for new products, pilot material substitution recommendations, and track carbon impact of design changes. Launch circular programs: design take-back program structure, pilot with select products and geographies, establish refurbishment and recycling partnerships, implement tracking and reporting systems, and scale based on learnings. Deploy enterprise features: roll out to all business units and product lines, integrate with marketing and sales processes, establish portfolio management governance, connect to executive dashboards and board reporting, and embed in strategic planning and innovation processes.',
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
