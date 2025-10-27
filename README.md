# GGAS - Greenhouse Gas Accounting Software

A comprehensive desktop application for measuring, monitoring, managing, and reporting greenhouse gas emissions across all operational scopes.

## Overview

GGAS (Greenhouse Gas Accounting Software) is an enterprise-grade Electron-based desktop application designed to enable organizations of all sizes to accurately measure, monitor, manage, and report their greenhouse gas emissions. The platform provides a comprehensive suite of tools for carbon accounting, regulatory compliance, sustainability reporting, and strategic carbon management through intuitive user interfaces.

## Current Version: Phase 3 (v1.0)

### ✅ Phase 1: Foundation & MVP (COMPLETE)
Core emissions calculation and reporting for Scope 1 and 2 emissions.

### ✅ Phase 2: Enhanced Core Features (COMPLETE)
Scope 3 calculations, advanced reporting, analytics, and user management.

### ✅ Phase 3: Advanced Features & Scale (COMPLETE)
AI/ML capabilities, target management, supply chain features, multi-entity support, and integration ecosystem.

---

## Phase 3 Features (Latest)

### 3.1 AI/ML Implementation ✅
- **Anomaly Detection**: Automatically detect statistical outliers in emissions data
- **Predictive Models**: Train ML models for forecasting and missing data prediction
- **ML Suggestions**: AI-generated recommendations with confidence scoring
- **Visual Analytics**: Interactive dashboards with severity indicators

### 3.2 Advanced Target Management ✅
- **Carbon Targets**: Set and track reduction targets with SBTi validation
- **Reduction Projects**: Manage emission reduction initiatives with ROI analysis
- **Carbon Pricing**: Model different pricing scenarios with growth rates
- **Project Tracking**: Monitor milestones, costs, and actual vs. target reductions

### 3.3 Supply Chain Features ✅
- **Supplier Engagement**: Track interactions and data requests
- **Supply Chain Mapping**: Multi-tier supplier hierarchy with emissions tracking
- **Supplier Assessment**: Score suppliers on emissions, data quality, and engagement
- **Risk Assessment**: Identify and track supply chain risks

### 3.4 Global & Multi-Entity Support ✅
- **Entity Hierarchy**: Manage subsidiaries, divisions, and facilities
- **Localization**: Support for multiple currencies (USD, EUR, GBP, JPY, CNY) and languages
- **Regional Compliance**: Track regulations by region with automated deadlines
- **Data Governance**: Define and enforce data policies across entities

### 3.5 Integration Ecosystem ✅
- **Plugin System**: Install and manage third-party integrations
- **Custom Calculations**: Create custom formulas with variable definitions
- **Automation Workflows**: Configure automated processes with triggers and actions
- **API Framework**: Comprehensive backend APIs for all features

---

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
```
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
```bash
git clone https://github.com/J-Ellette/GGAS.git
cd GGAS
```

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

**Database Statistics (Phase 3)**:
- Total Tables: 28
- Total API Methods: 129
- Database Size: Scales with data volume

## Future Enhancements (Phase 4)

### Potential Phase 4 Features
- Advanced deep learning models
- Blockchain verification
- IoT device integration
- Real-time monitoring
- AR/VR interfaces
- 3D facility visualization
- Advanced data storytelling
- Quantum-ready security

## Documentation

- **README.md**: This file - Quick start and overview
- **PHASE1_COMPLETE.md**: Phase 1 implementation details
- **PHASE2_COMPLETE.md**: Phase 2 implementation details
- **PHASE3_COMPLETE.md**: Phase 3 implementation details (latest)
- **buildsheet.md**: Complete system specification
- **docs/USER_GUIDE.md**: Detailed user guide
- **docs/TECHNICAL.md**: Technical architecture
- **docs/DEVELOPMENT.md**: Development guidelines

## Statistics (Phase 3)

- **Total Features**: 129 API methods across 3 phases
- **Database Tables**: 28 tables
- **UI Pages**: 14 pages
- **Code Size**: ~10,000+ lines of code
- **Build Time**: ~35 seconds
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
