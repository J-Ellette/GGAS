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
