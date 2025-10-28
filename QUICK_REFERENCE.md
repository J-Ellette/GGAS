# GGAS - Quick Reference

## Application At a Glance

### What is GGAS?

GGAS (Greenhouse Gas Accounting Software) is a comprehensive desktop application for measuring, monitoring, managing, and reporting greenhouse gas emissions across all operational scopes.

### Key Capabilities

#### 📊 Data Management

- Add and track activity data (fuel consumption, electricity, travel)
- Organize by organization unit, time period, and emission source
- Track data quality with scoring system (0-100%)

#### 🔬 Emission Factors

- Browse 8 pre-loaded standard emission factors
- Search by name, category, or source
- Create custom factors for specific processes

#### 🧮 Calculations

- Calculate emissions using 3-step wizard
- Support for Scope 1, 2, and 3 emissions
- Multiple methodologies (activity-based, spend-based, hybrid)
- Automatic uncertainty quantification

#### 📈 Visualizations

- Dashboard with interactive charts
- Emissions breakdown by scope (pie chart)
- Trend analysis by time period (bar chart)
- Real-time data quality monitoring

## Quick Start Guide

### Installation

1. Download GGAS for your platform
2. Install the application
3. Launch from applications folder

### First Steps

1. **Add Activity Data**
   - Go to "Activity Data" page
   - Click "Add Activity Data"
   - Fill in the form and save

2. **Browse Emission Factors**
   - Go to "Emission Factors" page
   - Search or filter by category
   - Review available factors

3. **Calculate Emissions**
   - Go to "Calculations" page
   - Click "New Calculation"
   - Follow 3-step wizard
   - View results

4. **View Dashboard**
   - Go to "Dashboard" page
   - Review total emissions
   - Analyze charts
   - Check recent calculations

## System Requirements

- **OS**: Windows 10+, macOS 10.13+, Linux (Ubuntu 18.04+)
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB
- **Display**: 1024x768 minimum

## Features Overview

### Dashboard Page

- ✅ Total emissions summary
- ✅ Calculation count
- ✅ Data quality score
- ✅ Emissions by scope (pie chart)
- ✅ Emissions trends (bar chart)
- ✅ Recent calculations list

### Activity Data Page

- ✅ Data table with all activity records
- ✅ Add new activity data
- ✅ Edit existing records
- ✅ Delete records
- ✅ Quality indicators (green/yellow/red)
- ✅ Sortable columns

### Emission Factors Page

- ✅ Library of emission factors
- ✅ Search functionality
- ✅ Filter by category (Scope 1/2/3)
- ✅ Add custom factors
- ✅ View factor details
- ✅ Source attribution

### Calculations Page

- ✅ 3-step calculation wizard
- ✅ Activity data selection
- ✅ Emission factor matching
- ✅ Methodology configuration
- ✅ Real-time calculation
- ✅ Results with uncertainty
- ✅ Calculation history

## Pre-loaded Emission Factors

### Scope 1 - Direct Emissions

| Factor | Value | Unit | Source |
|--------|-------|------|--------|
| Natural Gas | 53.06 | kg CO2e/MMBtu | EPA 2024 |
| Coal | 95.52 | kg CO2e/MMBtu | EPA 2024 |
| Gasoline | 8.78 | kg CO2e/gallon | EPA 2024 |
| Diesel | 10.21 | kg CO2e/gallon | EPA 2024 |

### Scope 2 - Indirect Emissions

| Factor | Value | Unit | Source |
|--------|-------|------|--------|
| Electricity (US Grid) | 0.855 | kg CO2e/kWh | EPA eGRID 2024 |

### Scope 3 - Value Chain

| Factor | Value | Unit | Source |
|--------|-------|------|--------|
| Air Travel (Short) | 0.156 | kg CO2e/pass-mile | DEFRA 2024 |
| Air Travel (Long) | 0.133 | kg CO2e/pass-mile | DEFRA 2024 |
| Commuting (Car) | 0.404 | kg CO2e/mile | EPA 2024 |

## Common Use Cases

### Calculating Facility Emissions

1. Add natural gas consumption data
2. Add electricity consumption data
3. Calculate using appropriate emission factors
4. View results on dashboard

### Tracking Fleet Emissions

1. Add gasoline/diesel consumption
2. Use mobile combustion factors
3. Calculate for each vehicle or fleet
4. Monitor trends over time

### Reporting Business Travel

1. Add flight distance data
2. Use air travel factors (short/long haul)
3. Calculate emissions
4. Include in Scope 3 reporting

### Employee Commuting

1. Estimate employee commute distances
2. Use commuting emission factor
3. Calculate annual emissions
4. Track in Scope 3

## GHG Protocol Scopes

### Scope 1: Direct Emissions

Emissions from sources you own or control:

- Boilers and heaters (natural gas, coal)
- Company vehicles (gasoline, diesel)
- Manufacturing processes
- Fugitive emissions (refrigerants, leaks)

### Scope 2: Indirect Energy

Emissions from purchased energy:

- Purchased electricity
- Purchased steam
- Purchased heating/cooling

### Scope 3: Other Indirect

Emissions from your value chain:

- Business travel (flights, rental cars)
- Employee commuting
- Purchased goods and services
- Transportation and distribution
- Waste disposal

## Calculation Methodologies

### Activity-Based

**Best for**: Organizations with detailed operational data

- Uses actual consumption values
- Most accurate method
- Example: 1,000 kWh × 0.855 kg CO2e/kWh = 855 kg CO2e

### Spend-Based

**Best for**: Organizations with limited operational data

- Uses financial expenditure
- Less accurate but easier to implement
- Example: $500 electricity × 0.4 kg CO2e/$ = 200 kg CO2e

### Hybrid

**Best for**: Complex organizations

- Combines both methods
- Activity-based for major sources
- Spend-based for minor sources

## Data Quality Best Practices

### High Quality (80-100%)

- ✅ Direct meter readings
- ✅ Utility bills with actual usage
- ✅ Recent data (<1 month old)
- ✅ Verified by third party

### Medium Quality (60-79%)

- ⚠️ Estimated readings
- ⚠️ Industry averages
- ⚠️ Data 1-6 months old
- ⚠️ Self-reported

### Low Quality (0-59%)

- ❌ Rough estimates
- ❌ Old data (>6 months)
- ❌ Unverified sources
- ❌ Incomplete information

## Troubleshooting

### Can't Add Activity Data

- Check all required fields are filled
- Ensure value is a valid number
- Verify data quality is between 0 and 1

### No Emission Factors Found

- Try different search terms
- Check category filter (All/Scope 1/2/3)
- Create custom factor if needed

### Calculation Failed

- Ensure activity data exists
- Verify emission factor is selected
- Check that values are valid numbers

### Dashboard Shows No Data

- Add activity data first
- Perform at least one calculation
- Refresh the dashboard

## Support

### Documentation

- User Guide: `docs/USER_GUIDE.md`
- Technical Docs: `docs/TECHNICAL.md`
- Development Guide: `docs/DEVELOPMENT.md`

### Resources

- GHG Protocol: <www.ghgprotocol.org>
- EPA Climate: <www.epa.gov/climate-change>
- GitHub: github.com/J-Ellette/GGAS

## Version Information

**Current Version**: 1.0.0 (Phase 1)  
**Release Date**: October 2025  
**Status**: Production Ready  

**Included Features**:

- ✅ Data Collection & Management
- ✅ Emission Factor Library
- ✅ Multi-Scope Calculations
- ✅ Data Quality Assurance
- ✅ Interactive Dashboard
- ✅ Flexible Methodologies

**Coming Soon** (Phase 2):

- 📋 Reporting Module (CDP, TCFD, GRI)
- 📊 Advanced Analytics
- 🎯 Target Setting & Tracking
- 📥 Excel Import/Export

---

**For detailed information, see the comprehensive documentation in the `docs/` folder.**
