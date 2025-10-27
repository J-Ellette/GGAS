# GGAS User Guide

## Introduction

Welcome to GGAS (Greenhouse Gas Accounting Software), a comprehensive desktop application for measuring, monitoring, managing, and reporting your organization's greenhouse gas emissions.

## Getting Started

### System Requirements

- **Operating System**: Windows 10+, macOS 10.13+, or Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for application and data
- **Display**: 1024x768 minimum resolution, 1920x1080 recommended

### Installation

1. Download the appropriate installer for your operating system
2. Run the installer and follow the on-screen instructions
3. Launch GGAS from your applications folder

## Application Overview

### Main Interface

The GGAS application features a clean, modern interface with:

- **Top Navigation Bar**: Application title and branding
- **Left Sidebar**: Navigation menu with key sections:
  - Dashboard
  - Activity Data
  - Emission Factors
  - Calculations
  - Reports (coming soon)
  - Settings (coming soon)
- **Main Content Area**: Dynamic workspace for each section

## Key Features

### 1. Dashboard

The Dashboard provides an at-a-glance overview of your emissions data:

- **Total Emissions Card**: Sum of all calculated emissions
- **Calculations Count**: Number of completed calculations
- **Data Quality Score**: Average quality of your activity data
- **Emissions by Scope Pie Chart**: Visual breakdown of Scope 1, 2, and 3 emissions
- **Emissions Trend Bar Chart**: Historical emissions grouped by time period
- **Recent Calculations Table**: Latest emission calculations

### 2. Activity Data Management

This section allows you to manage all emissions-related activity data:

#### Adding Activity Data

1. Click the "Add Activity Data" button
2. Fill in the required fields:
   - **Organization Unit**: Department, facility, or business unit
   - **Time Period**: Reporting period (e.g., "2024-Q1", "2024-01", "2024")
   - **Emission Source**: Category of emission source
     - Stationary Combustion
     - Mobile Combustion
     - Purchased Electricity
     - Business Travel
     - Employee Commuting
     - Other
   - **Activity Type**: Specific fuel or activity (e.g., "Natural Gas", "Gasoline")
   - **Value**: Numeric amount of activity
   - **Unit**: Unit of measurement (e.g., MMBtu, gallons, kWh, miles)
   - **Data Source**: Where the data came from
     - Manual Entry
     - Excel Import
     - Utility Bill
     - Meter Reading
     - Third Party
   - **Data Quality Score**: Rating from 0 to 1 (0 = poor, 1 = excellent)
3. Click "Create" to save

#### Editing Activity Data

- Click the edit icon (pencil) next to any activity data record
- Modify the fields as needed
- Click "Update" to save changes

#### Deleting Activity Data

- Click the delete icon (trash can) next to any activity data record
- Confirm the deletion when prompted

#### Data Quality

Each activity data record displays a quality score:
- **Green (80-100%)**: High-quality data from verified sources
- **Yellow (60-79%)**: Moderate-quality data, may need review
- **Red (0-59%)**: Low-quality data, requires improvement

### 3. Emission Factor Library

Browse and manage emission factors used in calculations:

#### Searching Emission Factors

- Use the search bar to find factors by name, description, or category
- Filter by category using the dropdown menu (All, Scope 1, Scope 2, Scope 3)

#### Standard Emission Factors

GGAS comes pre-loaded with emission factors from authoritative sources:

- **EPA**: U.S. Environmental Protection Agency factors
- **DEFRA**: UK Department for Environment, Food & Rural Affairs
- **IPCC**: Intergovernmental Panel on Climate Change
- **IEA**: International Energy Agency

#### Adding Custom Emission Factors

1. Click "Add Custom Factor"
2. Enter factor details:
   - **Name**: Descriptive name
   - **Category**: Scope 1, 2, or 3
   - **Subcategory**: Specific emission category
   - **Source**: Data source or methodology
   - **Version**: Version identifier
   - **Value**: Numeric emission factor value
   - **Unit**: Unit of the emission factor (e.g., kg CO2e/MMBtu)
   - **Region**: Geographic region (optional)
   - **Year**: Applicable year (optional)
   - **Description**: Additional details (optional)
3. Click "Create" to save

### 4. Emissions Calculations

Perform emission calculations using a guided 3-step wizard:

#### Step 1: Select Activity Data

- Browse your activity data records
- Click on a record to select it
- Review the details before proceeding to the next step

#### Step 2: Choose Emission Factor

- The system automatically filters relevant emission factors based on your activity data
- Review suggested factors or search for alternatives
- Click on a factor to select it
- The system displays the factor value and unit

#### Step 3: Review & Calculate

- Review your selections:
  - Activity Data details
  - Emission Factor details
- Configure calculation settings:
  - **Scope**: Select the appropriate GHG Protocol scope (1, 2, or 3)
  - **Methodology**: Choose calculation approach
    - Activity-Based: Using specific consumption data
    - Spend-Based: Using financial expenditure data
    - Hybrid: Combination of methods
- Click "Calculate" to perform the calculation
- View results:
  - Emissions in kg CO2e
  - Uncertainty percentage
- Click "Finish" to save the calculation

#### Viewing Calculation History

- The Calculations table shows all completed calculations
- Columns include:
  - Date: When the calculation was performed
  - Organization Unit
  - Time Period
  - Emission Source
  - Scope
  - Methodology
  - Result (kg CO2e)
  - Uncertainty (%)

## Understanding GHG Protocol Scopes

### Scope 1: Direct Emissions

Emissions from sources owned or controlled by your organization:
- Stationary combustion (boilers, furnaces, heaters)
- Mobile combustion (company vehicles, equipment)
- Process emissions (chemical reactions, manufacturing)
- Fugitive emissions (refrigerants, natural gas leaks)

### Scope 2: Indirect Energy Emissions

Emissions from purchased energy:
- Purchased electricity
- Purchased steam
- Purchased heating
- Purchased cooling

### Scope 3: Other Indirect Emissions

Emissions from your value chain:
- Business travel
- Employee commuting
- Purchased goods and services
- Transportation and distribution
- Waste disposal
- End-of-life treatment of sold products

## Data Management Best Practices

### Data Collection

1. **Consistency**: Use consistent units and time periods
2. **Completeness**: Collect data for all significant emission sources
3. **Timeliness**: Enter data regularly to maintain accuracy
4. **Documentation**: Record data sources and collection methods

### Data Quality

1. **Verification**: Cross-check data against source documents
2. **Validation**: Review data for outliers or errors
3. **Improvement**: Track quality scores and work to improve them
4. **Audit Trail**: Maintain records of data lineage

### Organizational Structure

1. **Hierarchy**: Organize data by business units, facilities, or departments
2. **Time Periods**: Use consistent reporting periods (monthly, quarterly, annual)
3. **Categories**: Classify emissions by source and scope

## Calculation Methodologies

### Activity-Based Method

**Best for**: Organizations with detailed operational data

**Formula**: Emissions = Activity Data × Emission Factor

**Example**: 
- Activity Data: 1,000 gallons of gasoline
- Emission Factor: 8.78 kg CO2e/gallon
- Emissions: 1,000 × 8.78 = 8,780 kg CO2e

### Spend-Based Method

**Best for**: Organizations with financial data but limited operational metrics

**Formula**: Emissions = Expenditure × Emission Factor (per dollar spent)

**Example**:
- Expenditure: $5,000 on electricity
- Emission Factor: 0.4 kg CO2e/$
- Emissions: 5,000 × 0.4 = 2,000 kg CO2e

### Hybrid Method

**Best for**: Complex organizations using multiple data sources

Combines activity-based calculations for primary sources with spend-based calculations for secondary sources.

## Uncertainty and Data Quality

### Understanding Uncertainty

Every emission calculation has inherent uncertainty due to:
- Measurement accuracy
- Emission factor precision
- Temporal variability
- Spatial variability

GGAS assigns a default uncertainty of ±10% to calculations, which can be refined based on data quality.

### Improving Data Quality

1. **Direct Measurement**: Use meter readings over estimates
2. **Recent Data**: Use current emission factors
3. **Geographic Specificity**: Use region-specific factors when available
4. **Verification**: Have calculations reviewed or verified

## Troubleshooting

### Application Won't Start

- Ensure you have administrator/system privileges
- Check that your system meets minimum requirements
- Try restarting your computer

### Database Errors

- The database file is located in your user application data folder
- Backup your data regularly
- Contact support if database corruption is suspected

### Missing Emission Factors

- Use the search function to find alternative factors
- Create custom emission factors if needed
- Contact support to request additional standard factors

## Support and Resources

### Getting Help

- Check this user guide for common questions
- Visit the GitHub repository for updates and issues
- Contact the development team through GitHub issues

### Additional Resources

- GHG Protocol: www.ghgprotocol.org
- EPA Climate Change: www.epa.gov/climate-change
- IPCC Guidelines: www.ipcc.ch

## Version History

### Version 1.0 (Phase 1)

- Initial release
- Activity data management
- Emission factor library
- Multi-scope calculations
- Dashboard with visualizations
- Data quality tracking

### Upcoming Features (Phase 2+)

- Reporting module (CDP, TCFD, GRI)
- Advanced analytics and forecasting
- Target setting and tracking
- Excel import/export
- Cloud synchronization
- Multi-user support
- API integrations

---

**Last Updated**: October 2025
**Document Version**: 1.0
