# Green Country: Greenhouse Gas Accounting Software

> 🔐 **SECURITY NOTICE**: This repository contains demo credentials in documentation for testing purposes. These credentials are PUBLIC and must NEVER be used in production. See [SECURITY.md](SECURITY.md) for production deployment requirements.

A comprehensive desktop application for measuring, monitoring, managing, and reporting greenhouse gas emissions across all operational scopes.

## Overview

Green Country GGAS (Greenhouse Gas Accounting Software) is an enterprise-grade Electron-based desktop application designed to enable organizations of all sizes to accurately measure, monitor, manage, and report their greenhouse gas emissions. The platform provides a comprehensive suite of tools for carbon accounting, regulatory compliance, sustainability reporting, and strategic carbon management through intuitive user interfaces.

## 🎨 USWDS Design System Integration

**New Feature**: Full U.S. Web Design System (USWDS) theming support for accessible, government-standard UI.

- **WCAG 2.1 AA Compliant**: Meets accessibility standards for all users
- **Responsive Design**: Mobile-first, responsive layouts
- **Consistent Patterns**: Follows designsystem.digital.gov standards
- **Component Library**: Complete set of USWDS React components
- **Hybrid Approach**: Works alongside existing Material-UI components

📖 [USWDS Quick Start Guide](docs/USWDS_QUICK_START.md) | [Full Implementation Docs](docs/USWDS_IMPLEMENTATION.md)

### USWDS Components Available

- Headers & Footers with skip navigation
- Buttons (primary, secondary, accent variants)
- Forms with validation and error handling
- Alerts and notifications
- Data tables with sorting and responsive features
- Cards and card groups
- Search components
- Sidebar navigation

## 🆕 AI-Optional Operation Framework

**New Feature**: Complete control over AI usage with manual alternatives for every feature.

- **5 Operation Modes**: Full AI, Selective AI, Manual Only, Assistant, Background
- **14 AI Features**: Granular control across Data Processing, Analytics, UI, Integration, and Workflow
- **Manual Alternatives**: Every AI feature has a fully functional traditional alternative
- **Enterprise Controls**: Policy management, audit trails, and compliance tools
- **Graceful Degradation**: Full functionality maintained when AI is disabled

📖 [AI-Optional Framework Documentation](docs/AI_OPTIONAL_FRAMEWORK.md)

### Quick Start: AI Settings

1. Navigate to **AI & Strategic Planning** → **AI Settings**
2. Choose your operation mode or toggle individual features
3. Review audit trail for all changes
4. Set organizational policies for AI usage

## License Key System

On first launch, the application will prompt for a license key. The system supports multiple license types with different feature sets.

### New License Key Format (Phase 23)

The new license system uses the format: `XXXX-XXXX-XXXX-XXXX-XXXX-XXXX`

**Generate Test License Keys:**

```bash
npm run generate-licenses
```

**Example Keys:**

- **Development:** `GG01-EN98-FD00-3FFF-FFWH-LR55` (Full features, no expiration)
- **Trial:** `GG01-TR42-1400-0124-F5B7-TW7C` (Basic features, 30 days)
- **Standard:** `GG01-ST3A-F100-0F26-44N4-ZMCE` (Standard features, 1 year)
- **Enterprise:** `GG01-EN55-2300-3F26-44CI-RWFB` (All features, 1 year)

### Legacy Demo Keys (Still Supported)

- **Demo License Key:** `GCGGAS-2024-DEMO-KEY1`
- **Development Key:** `123456789abcDEF!4321`

### Features by License Type

| Feature | Trial | Standard | Enterprise |
|---------|-------|----------|------------|
| Basic Reporting | ✓ | ✓ | ✓ |
| Advanced Analytics | ✗ | ✓ | ✓ |
| API Access | ✗ | ✓ | ✓ |
| Multi-User | ✗ | ✓ | ✓ |
| Real-time Monitoring | ✗ | ✗ | ✓ |
| AI Features | ✗ | ✗ | ✓ |

**For detailed information**, see [License System Documentation](docs/LICENSE_SYSTEM.md).

Alternatively, you can click "Admin Panel Access" to bypass the license check and access the admin panel directly.

## Admin Panel

- Access the admin panel through the license key screen or from the sidebar menu after logging in.

### Admin Credentials
>
> ⚠️ **IMPORTANT SECURITY NOTICE**: These are **demo credentials** for testing purposes only.
> In production environments, these credentials MUST be changed immediately after first login.
> Never use default credentials in production systems.

**Demo/Testing Credentials:**

- **Username:** OKE03955
- **Password:** 8675309Jenny!

**For Production Use:**

1. Change these credentials immediately after first login
2. Use the "Change Password" feature in the admin panel
3. Implement additional security measures (2FA, password policies, etc.)
4. Store production credentials securely (not in code or documentation)

### Admin Panel Features

- **License Key Management**: Create and manage license keys for different users/organizations
- **User Management**: Manage users and their roles
- **LLM Integration**: Configure AI/LLM providers for enhanced analytics
- **Theme Management**: Choose between Light, Dark, or Green Country branded themes
- **Password Management**: Change admin password from within the panel

## Current Version: Phase 5 (v1.0)

### Phase 1: Foundation & MVP ✅ (COMPLETE)

- **Core emissions calculation and reporting for Scope 1 and 2 emissions**

### Phase 2: Enhanced Core Feature ✅s (COMPLETE)

- **Scope 3 calculations, advanced reporting, analytics, and user management**

### 3.1 AI/ML Implementation ✅ (COMPLETE)

- **Anomaly Detection**: Automatically detect statistical outliers in emissions data
- **Predictive Models**: Train ML models for forecasting and missing data prediction
- **ML Suggestions**: AI-generated recommendations with confidence scoring
- **Visual Analytics**: Interactive dashboards with severity indicators

### 3.2 Advanced Target Management ✅ (COMPLETE)

- **Carbon Targets**: Set and track reduction targets with SBTi validation
- **Reduction Projects**: Manage emission reduction initiatives with ROI analysis
- **Carbon Pricing**: Model different pricing scenarios with growth rates
- **Project Tracking**: Monitor milestones, costs, and actual vs. target reductions

### 3.3 Supply Chain Features ✅ (COMPLETE)

- **Supplier Engagement**: Track interactions and data requests
- **Supply Chain Mapping**: Multi-tier supplier hierarchy with emissions tracking
- **Supplier Assessment**: Score suppliers on emissions, data quality, and engagement
- **Risk Assessment**: Identify and track supply chain risks

### 3.4 Global & Multi-Entity Support ✅ (COMPLETE)

- **Entity Hierarchy**: Manage subsidiaries, divisions, and facilities
- **Localization**: Support for multiple currencies (USD, EUR, GBP, JPY, CNY) and languages
- **Regional Compliance**: Track regulations by region with automated deadlines
- **Data Governance**: Define and enforce data policies across entities

### 3.5 Integration Ecosystem ✅ (COMPLETE)

- **Plugin System**: Install and manage third-party integrations
- **Custom Calculations**: Create custom formulas with variable definitions
- **Automation Workflows**: Configure automated processes with triggers and actions
- **API Framework**: Comprehensive backend APIs for all features

### Phase 4: Innovation & Optimization ✅ (COMPLETE)

- **Deep learning analytics, verification workflows, IoT integration, immersive experiences, and platform optimization**

### 5.1 Advanced Forecasting Engine ✅ (COMPLETE)

- **Multi-Factor Emission Modeling**: Weather, economic, operational, and supply chain impacts
- **Machine Learning Models**: LSTM networks for time series forecasting
- **Ensemble Modeling**: Combining multiple prediction algorithms
- **Uncertainty Quantification**: Confidence intervals and risk assessment
- **Continuous Retraining**: Adaptive models with new data

### 5.2 Carbon Budget Management ✅ (COMPLETE)

- **Dynamic Budget Allocation**: AI-optimized distribution across business units
- **Real-time Budget Tracking**: Continuous monitoring with predictive alerts
- **Budget Optimization**: Automated reallocation recommendations
- **Variance Analysis**: Planned vs. actual with root cause identification

### 5.3 Early Warning System ✅ (COMPLETE)

- **Predictive Alerts**: Proactive notifications before threshold breaches
- **Escalation Protocols**: Automated stakeholder notifications by severity
- **Action Plan Triggers**: Automatic activation of predefined responses
- **Multi-Channel Notifications**: Email, SMS, and dashboard alerts

### 5.4 Scenario Planning Suite ✅ (COMPLETE)

- **Monte Carlo Simulations**: Risk assessment with probabilistic modeling
- **Sensitivity Analysis**: Key emission driver identification
- **Stress Testing**: Extreme weather and supply chain disruption scenarios
- **Enterprise Risk Integration**: Comprehensive risk management

### 5.5 Enterprise Features ✅ (COMPLETE)

- **Multi-Entity Forecasting**: Consolidated predictions across global operations
- **Executive Dashboards**: Board-level reporting with forward-looking metrics
- **ERP Integration Framework**: Ready for operational forecast integration
- **Regulatory Compliance Forecasting**: Predict compliance status for upcoming periods
- **ML Model Performance Tracking**: Continuous model evaluation and improvement

### Phase 6: Real-Time Carbon Operations Center ✅ (COMPLETE)

- **Live monitoring, command center capabilities, carbon traffic light system, automated response systems, and theme customization**

### Note: Phase 7 & 8 ✅ (COMPLETE) 

- **Phase 7 (Universal Carbon Connector) and Phase 8 (Autonomous Data Collection) features are documented in the Documentation panel but their completion summaries are not yet available in separate files**

### 9.1 Immutable Emission Records ✅ (COMPLETE)

- **Distributed Ledger Architecture**: Private blockchain network for emission data integrity
- **Tamper-Proof Audit Trails**: Cryptographic hashing ensures data cannot be altered retroactively
- **Consensus Mechanisms**: Multi-party validation of emission data entries
- **Smart Contracts**: Automated validation rules and data quality requirements

### 9.2 Carbon Credit & Offset Management ✅ (COMPLETE)

- **Automated Trading**: Smart contracts for carbon credit purchasing based on predefined criteria
- **Retirement Tracking**: Immutable records of carbon credit retirement to prevent double counting
- **Offset Project Verification**: Blockchain-based verification of offset project authenticity
- **Registry Integration**: Connection with major carbon credit registries (VCS, CDM, etc.)

### 9.3 Supply Chain Transparency ✅ (COMPLETE)

- **Product Carbon Provenance**: Track carbon footprint through entire supply chain
- **Supplier Verification**: Blockchain-based verification of supplier emission data
- **Traceability**: End-to-end tracking of carbon impacts from raw materials to end products
- **Trust Networks**: Establish trusted networks of verified suppliers and partners

### 9.4 Enterprise Implementation ✅ (COMPLETE)

- **Permissioned Networks**: Private blockchain networks for enterprise control and privacy
- **Interoperability**: Integration with public blockchain networks for external verification
- **Scalability Solutions**: Layer 2 solutions for high-volume transaction processing
- **Regulatory Compliance**: Ensure blockchain implementation meets financial and environmental regulations

### Note: Phase 10 & 11 ✅ (COMPLETE)

- **Phase 10 (Carbon Intelligence Engine) and Phase 11 (Supply Chain Carbon X-Ray) features are documented in the Documentation panel with complete implementation summaries available**

### 12.1 Automated LCA Calculations ✅ (COMPLETE)

- **Cradle-to-Grave Analysis**: Complete lifecycle assessment from raw materials to end-of-life
- **Database Integration**: Integration with major LCA databases (ecoinvent, GaBi, IDEMAT)
- **Rapid Assessment Tools**: Quick carbon footprint estimation for product development
- **Industry-specific Methodologies**: Specialized LCA approaches for different product categories

### 12.2 Carbon Labeling System ✅ (COMPLETE)

- **Automated Label Generation**: Create standardized carbon labels for products
- **EPD Generation**: Environmental Product Declaration creation and management
- **Regulatory Compliance**: Ensure labels meet regional requirements (EU Carbon Border Adjustment, etc.)
- **Consumer Communication**: Consumer-friendly carbon impact communication tools

### 12.3 Design Optimization ✅ (COMPLETE)

- **Material Selection**: Recommend lower-carbon materials and components
- **Design for Disassembly**: Optimize product design for end-of-life carbon impact
- **Manufacturing Process Optimization**: Suggest process improvements for carbon reduction
- **Packaging Optimization**: Minimize packaging carbon footprint

### 12.4 Circular Economy Integration ✅ (COMPLETE)

- **Circularity Metrics**: Track and optimize for circular economy indicators
- **Take-back Program Management**: Manage product take-back and recycling programs
- **Material Flow Analysis**: Track material flows through circular business models
- **Secondary Market Integration**: Connect products with secondary markets and reuse opportunities

### 12.5 Enterprise Implementation ✅ (COMPLETE)

- **Portfolio Management**: Manage carbon footprints across entire product portfolios
- **R&D Integration**: Integrate with product development and innovation processes
- **Marketing Integration**: Support marketing teams with carbon impact data
- **Regulatory Tracking**: Monitor evolving product carbon regulations globally

### Note: Phase 13 & 14 ✅ (COMPLETE)

- **Phase 13 (Regulatory Intelligence System) and Phase 14 (ESG Strategy Orchestrator) features are documented in the Documentation panel with complete implementation summaries available**

### 15.1 Satellite Emission Monitoring ✅ (COMPLETE)

- **Methane Detection**: Integration with MethaneSAT, GHGSat, ESA Sentinel-5P/TROPOMI
- **CO2 Monitoring**: NASA OCO-2/OCO-3, ESA Sentinel, JAXA GOSAT for facility-level verification
- **Cross-reference Validation**: Compare reported emissions with satellite observations
- **Global Coverage**: Monitor emissions from facilities worldwide using satellite data
- **Trend Analysis**: Long-term trend analysis using historical satellite data

### 15.2 Drone-based Monitoring ✅ (COMPLETE)

- **Autonomous Surveys**: Pre-programmed flight missions with real-time data streaming
- **Leak Detection**: Drone-mounted methane sensors with ppb-level sensitivity
- **Infrastructure Monitoring**: Solar panels, wind turbines, carbon capture equipment
- **Emergency Response**: Rapid deployment for emission incidents
- **Routine Inspections**: Automated inspection schedules with compliance documentation

### 15.3 FLIR Thermal Imaging ✅ (COMPLETE)

- **Heat Loss Detection**: Building envelope, HVAC systems, process equipment
- **Equipment Monitoring**: Boilers, motors, compressors, heat exchangers
- **Leak Visualization**: Optical gas imaging for methane, refrigerants, SF6
- **Process Optimization**: Combustion optimization, heat recovery identification
- **Predictive Maintenance**: Thermal signature analysis for failure prediction

### 15.4 Integrated Monitoring Platform ✅ (COMPLETE)

- **Multi-source Data Fusion**: Combine satellite, drone, and FLIR data
- **AI-powered Analysis**: Anomaly detection, leak prediction, emission forecasting
- **Automated Reporting**: Generate reports combining multiple monitoring sources
- **Trend Correlation**: Correlate monitoring data with operational activities
- **Real-time Alerts**: Immediate notifications for significant events

### 15.5 Enterprise Implementation ✅ (COMPLETE)

- **Fleet Management**: Manage drone fleets across multiple facilities
- **Regulatory Compliance**: FAA Part 107, airspace authorization, safety protocols
- **Data Security**: End-to-end encryption, role-based access, audit logging
- **Integration with Operations**: CMMS/EAM, SCADA, DCS/PLC integration
- **Scalability**: Support hundreds of facilities and thousands of emission sources

### 15.6 Advanced Analytics ✅ (COMPLETE)

- **Emission Source Attribution**: Identify specific sources from detected emissions
- **Performance Benchmarking**: Compare facilities using standardized metrics
- **Predictive Analytics**: Predict emission events and maintenance needs
- **Environmental Impact**: Dispersion modeling for environmental assessment
- **Real-time Alerts**: Multi-channel notifications for anomalies

### 16.1 Real-time Weather API Integration ✅ (COMPLETE)

- **Current Weather Data**: Real-time weather information for emission modeling
- **Weather Forecasting**: 7-day forecasts to predict emission impacts
- **Impact Calculation**: Calculate weather effects on heating, cooling, and transportation emissions
- **Historical Analysis**: Access historical weather data for correlation studies
- **Severe Weather Alerts**: Receive alerts for weather events impacting operations
- **Emission Correlation**: Analyze relationships between weather patterns and emissions

### 16.2 Live ERP Data Feeds ✅ (COMPLETE)

- **Multi-System Support**: Integration with SAP, Oracle, Microsoft Dynamics, NetSuite, and Workday
- **Energy Data Synchronization**: Automated energy consumption data collection from ERP systems
- **Material Tracking**: Real-time material usage and procurement data feeds
- **Transportation Integration**: Automatic sync of fleet and logistics data
- **Production Monitoring**: Live production line data for emissions calculation
- **Real-time Streaming**: Continuous data streams for up-to-the-minute emission tracking

### 16.3 Advanced ML Frameworks ✅ (COMPLETE)

- **TensorFlow Integration**: TensorFlow.js support for advanced neural networks
- **PyTorch Compatibility**: ONNX Runtime enables PyTorch model deployment
- **Emission Forecasting**: Train LSTM and other models for time-series prediction
- **Anomaly Detection**: Autoencoder-based detection of unusual emission patterns
- **Model Management**: Create, train, evaluate, and deploy custom ML models
- **Feature Importance**: Analyze which factors most influence emission predictions
- **Hyperparameter Optimization**: Automated tuning for optimal model performance

## Phase 1 Features (v1.0)

### 1. Data Collection & Management System

- **Activity Data Management**: Comprehensive framework for collecting and managing emissions-related activity data
  - Manual data entry via user-friendly forms with validation
  - Hierarchical data organization (tree view) by organizational units, time periods, and emission sources
  - Data lineage tracking with complete audit trails
  - Real-time data quality scoring and validation

### 2. Emission Factor Libraries

- **Comprehensive Factor Database**: Pre-loaded with emission factors from authoritative sources
  - EPA, IPCC, DEFRA, IEA emission factors
  - Coverage for all major emission sources (fuels, electricity, transportation, etc.)
  - Searchable and categorized interface
  - Support for custom emission factors
  - Version management for historical comparisons

### 3. Data Quality Assurance

- **Robust Validation**: Ensures accuracy and completeness throughout data collection
  - Real-time validation feedback
  - Range validation and consistency checks
  - Data quality scoring system
  - Quality dashboard and tracking

### 4. Multi-Scope Calculation Engine

- **Comprehensive Emissions Quantification**: Supports all three GHG Protocol scopes
  - Scope 1: Direct emissions (stationary & mobile combustion, process emissions)
  - Scope 2: Indirect emissions (purchased electricity, steam, heating, cooling)
  - Scope 3: Value chain emissions (business travel, employee commuting, etc.)
  - Real-time calculation with preview interfaces

### 5. Flexible Methodology Support

- **Multiple Calculation Approaches**: Accommodates different data availability scenarios
  - Activity-based calculations using specific consumption data
  - Spend-based calculations using financial data
  - Hybrid approaches combining methodologies
  - Configurable calculation profiles

### 6. Advanced Calculation Features

- **Sophisticated Capabilities**: Handles complex emission scenarios
  - Biogenic carbon accounting
  - Uncertainty quantification and propagation
  - Allocation methodologies for shared facilities
  - Real-time calculation feedback

## Technical Architecture

### Technology Stack

- **Framework**: Electron (desktop application)
- **Frontend**: React with TypeScript
- **UI Library**: Material-UI (MUI)
- **Database**: SQLite (local storage)
- **Charts**: Recharts
- **Build Tool**: Webpack

### Project Structure

```bash
GGAS/
├── src/
│   ├── main/              # Electron main process
│   │   ├── main.ts        # Main application entry
│   │   ├── preload.ts     # Preload script for IPC
│   │   └── services/      # Backend services
│   │       └── DatabaseService.ts
│   ├── renderer/          # React frontend
│   │   ├── App.tsx        # Main React component
│   │   ├── index.tsx      # Renderer entry point
│   │   └── pages/         # Application pages
│   │       ├── Dashboard.tsx
│   │       ├── ActivityDataPage.tsx
│   │       ├── EmissionFactorsPage.tsx
│   │       └── CalculationsPage.tsx
│   └── common/            # Shared code
│       └── types/         # TypeScript types
├── public/                # Static assets
├── dist/                  # Compiled output
└── webpack configs        # Build configuration
```
## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation Steps

1. Clone the repository:

bash
git clone <https://github.com/J-Ellette/GGAS.git>
cd GGAS

2. Install dependencies:

```bash
npm install
```

3. Build the application:

```bash
npm run build
```

4. Start the application:

```bash
npm start
```

## Development

### Build Commands

- `npm run build:main` - Build main process
- `npm run build:renderer` - Build renderer process  
- `npm run build` - Build both processes
- `npm start` - Build and run the application
- `npm run package` - Package for distribution

### Application Structure

The application is organized into three main sections:

- **Data Management**: Core emissions tracking and calculations
- **Advanced Features**: Scope 3, integrations, analytics, and compliance
- **AI & Strategic Planning**: AI/ML analytics, target management, and multi-entity support
- **Innovation & Optimization**: Advanced analytics and cutting-edge features

### Development Workflow

1. Make changes to source files in `src/`
2. Run `npm run build` to compile changes
3. Run `npm start` to test the application

## Usage Guide

### Getting Started

1. **Launch Application**: Start GGAS from your applications folder or by running `npm start`

2. **Add Activity Data**:
   - Navigate to "Activity Data" from the sidebar
   - Click "Add Activity Data"
   - Fill in the required information:
     - Organization Unit
     - Time Period
     - Emission Source
     - Activity Type
     - Value and Unit
     - Data Source
     - Data Quality Score

3. **Browse Emission Factors**:
   - Navigate to "Emission Factors"
   - Search and browse pre-loaded emission factors
   - Filter by category (Scope 1, 2, or 3)
   - Add custom emission factors if needed

4. **Calculate Emissions**:
   - Navigate to "Calculations"
   - Click "New Calculation"
   - Follow the 3-step wizard:
     - Select activity data
     - Choose appropriate emission factor
     - Review and calculate
   - View results in the calculations table

5. **View Dashboard**:
   - Navigate to "Dashboard"
   - View total emissions summary
   - Analyze emissions by scope (pie chart)
   - Track emissions trends over time (bar chart)
   - Review recent calculations

## Phase 3 Usage

### AI/ML Analytics

1. Navigate to "AI/ML Analytics" in Phase 3 Features
2. **Anomaly Detection**: Click "Detect Anomalies" to find outliers
3. **Predictive Models**: Create and train ML models
4. **ML Suggestions**: Review and accept/reject AI recommendations

### Target Management

1. Navigate to "Target Management" in Phase 3 Features
2. **Carbon Targets**: Set reduction targets and validate against SBTi
3. **Reduction Projects**: Track emission reduction initiatives
4. **Carbon Pricing**: Model different pricing scenarios

### Multi-Entity Management

1. Navigate to "Multi-Entity" in Phase 3 Features
2. **Entity Hierarchy**: Create and manage organizational structure
3. **Regional Compliance**: Track regulations by region
4. **Data Governance**: Define policies across entities

## Features by Page

### Dashboard

- Total emissions summary cards
- Emissions by scope visualization (pie chart)
- Emissions trend analysis (bar chart)
- Recent calculations list
- Data quality metrics

### Activity Data Management

- Comprehensive data entry forms
- Filterable and sortable table view
- Real-time validation
- Data quality indicators
- Edit and delete capabilities
- Support for multiple data sources

### Emission Factor Library

- Pre-loaded standard emission factors
- Search and filter functionality
- Category-based organization
- Custom factor creation
- Version tracking
- Source attribution

### Calculations

- Step-by-step calculation wizard
- Activity data selection
- Emission factor matching
- Real-time calculation preview
- Methodology selection (activity-based, spend-based, hybrid)
- Scope assignment (1, 2, or 3)
- Uncertainty quantification
- Calculation history

### AI/ML Analytics (Phase 3)

- Anomaly detection with severity classification
- Predictive model creation and training
- ML suggestions with confidence scoring
- Visual alerts and recommendations
- Interactive review workflows

### Target Management (Phase 3)

- Carbon target creation and tracking
- SBTi validation
- Reduction project management
- ROI calculation
- Carbon pricing scenario modeling

### Multi-Entity Management (Phase 3)

- Entity hierarchy visualization
- Regional compliance tracking
- Data governance policies
- Multi-currency and language support

## Data Storage

All data is stored locally in SQLite database at:

- **Windows**: `%APPDATA%/ggas/ggas.db`
- **macOS**: `~/Library/Application Support/ggas/ggas.db`
- **Linux**: `~/.config/ggas/ggas.db`

**Database Statistics (Phase 5)**:

- Total Tables: 65
- Total API Methods: 266
- Database Size: Scales with data volume

## Phase 5 Usage

### Predictive Forecasting

1. Navigate to "Predictive Intelligence" in Phase 5 Features
2. **Multi-Factor Forecasts**: Run forecasts with weather, economic, and operational factors
3. **LSTM Models**: Train neural networks for time series predictions
4. **View Forecasts**: Monitor predictions with confidence intervals

### Carbon Budget Management

1. Navigate to "Budget Management" tab
2. **Create Budgets**: Define fiscal year budgets with allocations
3. **Monitor Consumption**: Track real-time budget utilization
4. **Optimize**: Use AI to recommend budget reallocations
5. **Variance Analysis**: Review planned vs. actual performance

### Early Warning & Alerts

1. Navigate to "Early Warning" tab
2. **View Alerts**: Monitor active predictive alerts by severity
3. **Evaluate Triggers**: Check early warning triggers
4. **Action Plans**: Activate predefined response plans
5. **Acknowledge/Resolve**: Manage alert lifecycle

### Scenario Planning

1. Navigate to "Scenario Planning" tab
2. **Monte Carlo**: Run risk simulations with custom parameters
3. **Sensitivity Analysis**: Identify critical emission drivers
4. **Review Results**: Analyze probabilistic outcomes

### Enterprise Dashboard

1. Navigate to "Enterprise" tab
2. **Executive Metrics**: View key performance indicators
3. **Consolidated Forecasts**: Multi-entity predictions
4. **Model Performance**: Track ML model accuracy

## Phase 9 Usage

### Blockchain Carbon Ledger

1. Navigate to "Documentation" in the main menu
2. Select "Phase 9: Blockchain Carbon Ledger" from the documentation list
3. **Immutable Records**: Learn about distributed ledger architecture and tamper-proof audit trails
4. **Carbon Credits**: Explore automated trading and retirement tracking capabilities
5. **Supply Chain**: Understand product carbon provenance and supplier verification
6. **Enterprise Setup**: Review permissioned networks, interoperability, and compliance frameworks
7. **Implementation**: Follow the getting started guide for blockchain deployment

## Phase 12 Usage

### Product Carbon Lifecycle Engine

1. Navigate to "Documentation" in the main menu
2. Select "Phase 12: Product Carbon Lifecycle Engine" from the documentation list
3. **LCA Calculations**: Learn about automated cradle-to-grave analysis and database integration (ecoinvent, GaBi, IDEMAT)
4. **Carbon Labeling**: Create standardized carbon labels, EPDs, and ensure regulatory compliance
5. **Design Optimization**: Optimize material selection, design for disassembly, manufacturing processes, and packaging
6. **Circular Economy**: Implement circularity metrics, take-back programs, material flow analysis, and secondary market integration
7. **Enterprise Features**: Manage product portfolios, integrate with R&D, support marketing, and track regulations
8. **Getting Started**: Follow the comprehensive setup guide for product carbon lifecycle management

## Phase 15 Usage

### Satellite, Drone & FLIR Integration

1. Navigate to "Documentation" in the main menu
2. Select "Phase 15: Satellite, Drone & FLIR Integration" from the documentation list
3. **Satellite Monitoring**: Learn about MethaneSAT, GHGSat, CO2 monitoring, and cross-reference validation
4. **Drone Surveys**: Understand autonomous flight missions, leak detection, and emergency response
5. **Thermal Imaging**: Explore heat loss detection, equipment monitoring, and predictive maintenance
6. **Integrated Platform**: Review multi-source data fusion, AI-powered analysis, and automated reporting
7. **Enterprise Implementation**: Configure fleet management, regulatory compliance, and system integration
8. **Getting Started**: Follow the setup guide for satellite connections, drone deployment, and FLIR integration

## Phase 16 Usage

### Advanced Integration Services

1. **Weather API Integration**:
   - Access weather data through the WeatherAPIService
   - Get current weather conditions for emission modeling
   - Retrieve 7-day forecasts for planning
   - Calculate weather impacts on heating, cooling, and transportation
   - Analyze historical weather patterns and correlate with emissions
   - Monitor severe weather alerts that may affect operations

2. **ERP Data Feeds**:
   - Connect to your ERP system (SAP, Oracle, Microsoft Dynamics, NetSuite, or Workday)
   - Configure automated data feeds for energy, materials, transportation, and production
   - Sync historical data or set up real-time streaming
   - Monitor sync statistics and data quality
   - Integrate live operational data into emission calculations

3. **ML Frameworks**:
   - Create custom ML models for emission forecasting or anomaly detection
   - Train models using TensorFlow.js or ONNX-compatible frameworks
   - Deploy PyTorch models via ONNX Runtime
   - Evaluate model performance and feature importance
   - Make predictions on new data
   - Optimize hyperparameters for best results
   - Export models for production deployment

## Future Enhancements

### Potential Future Features

- Multi-year budget planning
- Advanced correlation analysis
- Real-time monitoring
- AR/VR interfaces
- 3D facility visualization
- Advanced data storytelling
- Quantum-ready security

## Documentation

### 📚 Documentation Hub

- **[Documentation Index](build-docs/README.md)**: Central hub for all documentation

### 🚀 Quick Start & User Guides  

- **README.md**: This file - Quick start and overview
- **[User Guide](docs/USER_GUIDE.md)**: Detailed user guide  
- **[Admin Panel Guide](docs/ADMIN_PANEL.md)**: Admin panel documentation and usage guide
- **[Troubleshooting Guide](docs/TROUBLESHOOTING.md)**: Common issues and solutions

### 👩‍💻 Developer Documentation

- **[Developer Quick Start](docs/DEVELOPER_QUICK_START.md)**: Get up and running in 30 minutes
- **[Technical Architecture](docs/TECHNICAL.md)**: System design and architecture
- **[Architecture Decisions](docs/ARCHITECTURE_DECISIONS.md)**: Technical decision rationale (ADRs)
- **[Development Guidelines](docs/DEVELOPMENT.md)**: Development environment and practices

### 🔐 License & Security

- **[License System](docs/LICENSE_SYSTEM.md)**: License key documentation
- **[License Quick Reference](docs/LICENSE_QUICK_REFERENCE.md)**: Key formats and usage  
- **[Security Guide](SECURITY.md)**: Security considerations and best practices

### 📋 Implementation Details

- **[buildsheet.md](buildsheet.md)**: Complete system specification
- **[Implementation Complete](docs/IMPLEMENTATION_COMPLETE.md)**: Feature implementation status
- **[Final Implementation Summary](build-docs/FINAL_IMPLEMENTATION_SUMMARY.md)**: Project completion overview

### 📊 Phase Documentation (Legacy)

- **PHASE1_COMPLETE.md** through **PHASE15_COMPLETE.md**: Historical phase implementation details

## Known Issues

### DevTools Console Warnings

You may see the following warnings in the developer console:

```text
"Request Autofill.enable failed" 
"Request Autofill.setAddresses failed"
```

**Status:** These are harmless warnings from Electron's DevTools and do not affect application functionality. They occur because the Autofill API is not available in all Electron versions and can be safely ignored.

## Troubleshooting

### License Key Issues

If you can't access the application:

1. Use the demo license key: `GCGGAS-2024-DEMO-KEY1`
2. Click "Admin Panel Access" to bypass license check
3. Check that localStorage is enabled in your environment

### Admin Panel Access

If you can't log in to admin panel:

- Username must be exactly: `OKE03955`
- Password must be exactly: `8675309Jenny!` (case-sensitive)

## Statistics (Phase 5)

- **Total Features**: 266 API methods across 5 phases
- **Database Tables**: 65 tables
- **UI Pages**: 14 pages
- **Code Size**: ~15,000+ lines of code
- **Build Time**: ~45 seconds
- **Security**: 0 vulnerabilities (CodeQL verified)

## Contributing

This project is under active development. Contributions are welcome!

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or contributions, please open an issue on GitHub.

## Acknowledgments

- Emission factors sourced from EPA, IPCC, DEFRA, and IEA
- Built with Electron, React, and Material-UI
- Inspired by GHG Protocol standards
- Admin panel design inspired by FUEL CMS and other professional CMS platforms

---

**© 2024 Green Country. All rights reserved.**
