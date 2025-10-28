# Federal EPA Reporting (Core Module)

## Overview

The Federal EPA Reporting module provides comprehensive automation for the four major EPA environmental reporting programs. This module integrates seamlessly with facility operations to collect, calculate, validate, and submit required reports to the Environmental Protection Agency.

## Table of Contents

1. [GHGRP - Greenhouse Gas Reporting Program](#ghgrp---greenhouse-gas-reporting-program)
2. [TRI - Toxic Release Inventory](#tri---toxic-release-inventory)
3. [RMP - Risk Management Program](#rmp---risk-management-program)
4. [SPCC - Spill Prevention Control and Countermeasure](#spcc---spill-prevention-control-and-countermeasure)

---

## GHGRP - Greenhouse Gas Reporting Program

### Overview
The Greenhouse Gas Reporting Program (40 CFR Part 98) requires annual reporting of greenhouse gas emissions from large facilities that emit 25,000 metric tons or more of CO2 equivalent per year.

### Key Features

#### 1. Industry-Specific Calculation Methodologies (40+ Subparts)

**Stationary Combustion Sources**
- **Subpart C**: General Stationary Fuel Combustion
  - Tier 1-4 calculation methodologies
  - Fuel-specific emission factors
  - Heat input calculations
  - Biomass co-firing adjustments

**Oil & Gas Systems**
- **Subpart W**: Petroleum and Natural Gas Systems
  - Onshore production
  - Offshore production
  - Natural gas processing
  - Natural gas transmission compression
  - Underground natural gas storage
  - LNG import/export
  - Methane emissions from pneumatic devices
  - Flaring and venting calculations

**Power Generation**
- **Subpart D**: Electricity Generation
  - Unit-specific reporting
  - Net generation tracking
  - CO2 emissions from combustion
  - CH4 and N2O calculations

**Additional Key Subparts**
- **Subpart A**: General Provisions
- **Subpart E**: Adipic Acid Production
- **Subpart F**: Aluminum Production
- **Subpart G**: Ammonia Manufacturing
- **Subpart H**: Cement Production
- **Subpart I**: Electronics Manufacturing
- **Subpart P**: Hydrogen Production
- **Subpart Q**: Iron and Steel Production
- **Subpart X**: Petrochemical Production
- **Subpart Y**: Petroleum Refineries
- **Subpart Z**: Phosphoric Acid Production
- And 20+ additional industry-specific subparts

#### 2. Annual Reporting Deadline Management

**Reporting Timeline**
- **Deadline**: March 31st annually
- **Reporting Period**: Previous calendar year
- **First Report**: 2011 for 2010 emissions

**System Features**
- Automated calendar reminders (90, 60, 30, 14, 7, and 1 day before deadline)
- Progress tracking dashboard
- Quarterly monitoring checkpoints
- Draft report generation for internal review
- Final submission workflow with approvals

#### 3. Data Collection & Calculations

**Direct Emissions**
- Fuel consumption tracking by source
- Process-specific emissions
- Mobile source emissions
- Fugitive emissions calculations
- Stationary combustion emissions

**Imported/Exported Data**
- Electricity imports
- Steam and heat imports
- Industrial gas imports
- Biomass co-firing calculations
- Renewable energy credits tracking

**Calculation Methods**
```javascript
// Example: Tier 1 Fuel Combustion Calculation
function calculateTier1Emissions(fuelType, fuelAmount, heatingValue, emissionFactor) {
  // CO2 Emissions = Fuel Amount × HHV × Emission Factor
  const emissions = fuelAmount * heatingValue * emissionFactor;
  
  return {
    co2Emissions: emissions,
    methodology: 'Tier 1',
    subpart: 'C',
    uncertainty: calculateUncertainty(fuelType, 'tier1')
  };
}

// Example: Subpart W - Pneumatic Device Emissions
function calculatePneumaticDeviceEmissions(deviceCount, gasActivityFactor, methaneContent) {
  // Annual Emissions = Device Count × Gas Activity Factor × Methane Content × Hours per Year
  const hoursPerYear = 8760;
  const emissions = deviceCount * gasActivityFactor * methaneContent * hoursPerYear;
  
  return {
    ch4Emissions: emissions,
    co2eEmissions: emissions * 25, // GWP of methane
    methodology: 'Subpart W',
    deviceType: 'Pneumatic Device'
  };
}
```

#### 4. Verification Statement Management

**Third-Party Verification Coordination**
- Verification required for facilities emitting ≥25,000 MT CO2e
- Document management system
- Verifier communication portal
- Evidence package preparation
- Finding resolution tracking

**Verification Workflow**
1. Data completeness check
2. Calculation methodology review
3. Supporting documentation assembly
4. Verifier engagement
5. Finding resolution
6. Statement incorporation
7. Final submission

#### 5. Multi-Facility Aggregation

**Corporate-Level Reporting**
- Parent company identification
- Subsidiary tracking
- Facility consolidation
- Corporate totals calculation
- Allocation methodologies

**Features**
- Automatic facility roll-up
- Corporate hierarchy management
- Inter-facility transfers tracking
- Consolidated reporting dashboard
- Multi-site coordination tools

### Technical Implementation

```javascript
// GHGRP Reporting Engine
class GHGRPReportingEngine {
  constructor() {
    this.subparts = new Map();
    this.facilities = new Map();
    this.verificationManager = new VerificationManager();
    this.deadlineManager = new DeadlineManager();
  }

  // Calculate emissions for specific subpart
  async calculateSubpartEmissions(facilityId, subpart, reportingYear) {
    const facility = this.facilities.get(facilityId);
    const calculator = this.subparts.get(subpart);
    
    // Collect activity data
    const activityData = await this.collectActivityData(facilityId, reportingYear);
    
    // Apply methodology
    const emissions = calculator.calculate(activityData);
    
    // Validate results
    const validation = this.validateEmissions(emissions, subpart);
    
    // Track for verification
    this.verificationManager.trackCalculation(facilityId, subpart, emissions);
    
    return {
      emissions,
      validation,
      methodology: calculator.getMethodology(),
      uncertainty: calculator.calculateUncertainty()
    };
  }

  // Generate annual GHGRP report
  async generateAnnualReport(facilityId, reportingYear) {
    const facility = this.facilities.get(facilityId);
    const applicableSubparts = this.identifyApplicableSubparts(facility);
    
    const report = {
      facility: facility,
      reportingYear: reportingYear,
      subparts: [],
      totalEmissions: 0,
      verificationStatus: 'pending'
    };
    
    // Calculate emissions for each applicable subpart
    for (const subpart of applicableSubparts) {
      const subpartData = await this.calculateSubpartEmissions(facilityId, subpart, reportingYear);
      report.subparts.push(subpartData);
      report.totalEmissions += subpartData.emissions.co2e;
    }
    
    // Check verification requirement
    if (report.totalEmissions >= 25000) {
      report.verificationRequired = true;
      await this.verificationManager.initiateVerification(facilityId, reportingYear);
    }
    
    return report;
  }

  // Submit to EPA e-GGRT system
  async submitToEPA(facilityId, reportingYear) {
    const report = await this.generateAnnualReport(facilityId, reportingYear);
    
    // Format for e-GGRT XML schema
    const xmlReport = this.formatForEGGRT(report);
    
    // Submit via EPA Central Data Exchange (CDX)
    const submission = await this.epaConnector.submitReport(xmlReport);
    
    // Track submission
    this.deadlineManager.recordSubmission(facilityId, reportingYear, submission.id);
    
    return submission;
  }
}
```

---

## TRI - Toxic Release Inventory

### Overview
The Toxic Release Inventory (TRI) requires annual reporting of releases and waste management of toxic chemicals by certain facilities. Established under EPCRA Section 313, TRI covers 650+ chemicals and chemical categories.

### Key Features

#### 1. 650+ Reportable Chemicals Tracking

**Chemical Coverage**
- Individual chemicals (e.g., benzene, lead, mercury)
- Chemical categories (e.g., chlorophenols, glycol ethers)
- PFAS compounds (added 2020)
- Persistent bioaccumulative toxic (PBT) chemicals

**Tracking System**
- Chemical inventory management
- De minimis exemption tracking
- Mixture calculations
- Otherwise use threshold determination
- Manufacturing threshold tracking

**Threshold Determinations**
```javascript
// TRI Threshold Calculator
class TRIThresholdCalculator {
  calculateThresholds(chemical, facility) {
    const thresholds = {
      manufacture: 25000, // pounds
      otherwiseUse: 10000, // pounds
      pbtChemicals: {
        manufacture: 100, // pounds for PBT
        otherwiseUse: 100  // pounds for PBT
      }
    };
    
    const isPBT = this.isPBTChemical(chemical);
    const manufactured = facility.getManufacturedAmount(chemical);
    const otherwiseUsed = facility.getOtherwiseUsedAmount(chemical);
    
    return {
      chemical: chemical,
      isPBT: isPBT,
      manufactured: manufactured,
      manufacturingThreshold: isPBT ? thresholds.pbtChemicals.manufacture : thresholds.manufacture,
      exceedsManufacturingThreshold: manufactured > (isPBT ? thresholds.pbtChemicals.manufacture : thresholds.manufacture),
      otherwiseUsed: otherwiseUsed,
      otherwiseUseThreshold: isPBT ? thresholds.pbtChemicals.otherwiseUse : thresholds.otherwiseUse,
      exceedsOtherwiseUseThreshold: otherwiseUsed > (isPBT ? thresholds.pbtChemicals.otherwiseUse : thresholds.otherwiseUse),
      reportingRequired: manufactured > (isPBT ? thresholds.pbtChemicals.manufacture : thresholds.manufacture) || 
                        otherwiseUsed > (isPBT ? thresholds.pbtChemicals.otherwiseUse : thresholds.otherwiseUse)
    };
  }
}
```

#### 2. Waste Management Hierarchy Calculations

**Waste Management Categories**
1. **Recycling**
   - On-site recycling
   - Off-site recycling
   - Energy recovery on-site
   - Energy recovery off-site

2. **Treatment**
   - On-site treatment
   - Off-site treatment
   - Destruction efficiency calculations
   - Treatment effectiveness tracking

3. **Disposal**
   - RCRA Subtitle C landfills
   - Other landfills
   - Surface impoundments
   - Underground injection (Class I wells)
   - Other disposal methods

**Calculation Framework**
```javascript
// Waste Management Calculator
class WasteManagementCalculator {
  calculateWasteManagement(chemical, activityData) {
    const wasteManagement = {
      recycling: {
        onsite: 0,
        offsite: 0,
        energyRecoveryOnsite: 0,
        energyRecoveryOffsite: 0
      },
      treatment: {
        onsite: 0,
        offsite: 0,
        destructionEfficiency: null
      },
      disposal: {
        rcraLandfill: 0,
        otherLandfill: 0,
        surfaceImpoundment: 0,
        undergroundInjection: 0,
        other: 0
      },
      releases: {
        air: 0,
        water: 0,
        land: 0,
        undergroundInjection: 0
      }
    };
    
    // Calculate totals
    const totalWaste = this.sumWasteCategories(wasteManagement);
    const totalReleases = this.sumReleases(wasteManagement.releases);
    
    return {
      chemical: chemical,
      wasteManagement: wasteManagement,
      totalWaste: totalWaste,
      totalReleases: totalReleases,
      productionRatio: this.calculateProductionRatio(activityData)
    };
  }
}
```

#### 3. Form R and Form A Threshold Determinations

**Form A (Certification Statement)**
- Annual reportable amount ≤ 500 pounds for non-PBT chemicals
- All releases and disposals must be to allowable locations
- No manufacturing, processing, or use of PBT chemicals above de minimis
- Automatic threshold monitoring

**Form R (Detailed Report)**
- Annual reportable amount > 500 pounds
- Any PBT chemical
- Detailed release and waste management information
- Source reduction and recycling data

**Automatic Form Switching**
```javascript
// Form Type Determination
class FormTypeDeterminator {
  determineFormType(chemical, reportingYear, facility) {
    const threshold = this.calculateThresholds(chemical, facility);
    const totalAmount = threshold.manufactured + threshold.otherwiseUsed;
    
    // Check if Form A eligible
    if (this.isFormAEligible(chemical, totalAmount, facility)) {
      return {
        formType: 'Form A',
        reason: 'Annual reportable amount ≤ 500 pounds and all eligibility criteria met',
        automated: true
      };
    }
    
    // Default to Form R
    return {
      formType: 'Form R',
      reason: this.getFormRReason(chemical, totalAmount),
      automated: true
    };
  }
  
  isFormAEligible(chemical, totalAmount, facility) {
    // Check PBT status
    if (this.isPBTChemical(chemical)) {
      return false;
    }
    
    // Check annual reportable amount
    if (totalAmount > 500) {
      return false;
    }
    
    // Check release locations
    const releases = facility.getReleases(chemical);
    if (!this.allReleasesToAllowableLocations(releases)) {
      return false;
    }
    
    return true;
  }
}
```

#### 4. Multi-Media Release Calculations

**Release Categories**

**Air Emissions**
- Fugitive emissions
- Point source emissions (stacks)
- Particulate matter
- Volatile organic compounds (VOCs)

**Water Discharges**
- Direct surface water discharges
- POTW (Publicly Owned Treatment Works) transfers
- Wastewater treatment calculations
- NPDES permit tracking

**Land Disposal**
- RCRA Subtitle C landfills
- Other on-site landfills
- Land treatment/application
- Surface impoundments

**Underground Injection**
- Class I wells
- Class II-V wells
- Injection volume tracking

**Calculation Example**
```javascript
// Multi-Media Release Calculator
class MultiMediaReleaseCalculator {
  calculateReleases(chemical, facility, reportingYear) {
    const releases = {
      air: {
        fugitive: this.calculateFugitiveEmissions(chemical, facility),
        stack: this.calculateStackEmissions(chemical, facility),
        total: 0
      },
      water: {
        surfaceWater: this.calculateSurfaceWaterDischarges(chemical, facility),
        potw: this.calculatePOTWTransfers(chemical, facility),
        total: 0
      },
      land: {
        rcraLandfill: facility.getRCRALandfillDisposal(chemical),
        otherLandfill: facility.getOtherLandfillDisposal(chemical),
        landTreatment: facility.getLandTreatment(chemical),
        total: 0
      },
      undergroundInjection: {
        classI: facility.getClassIInjection(chemical),
        other: facility.getOtherInjection(chemical),
        total: 0
      }
    };
    
    // Calculate totals
    releases.air.total = releases.air.fugitive + releases.air.stack;
    releases.water.total = releases.water.surfaceWater + releases.water.potw;
    releases.land.total = releases.land.rcraLandfill + releases.land.otherLandfill + releases.land.landTreatment;
    releases.undergroundInjection.total = releases.undergroundInjection.classI + releases.undergroundInjection.other;
    
    const totalReleases = releases.air.total + releases.water.total + 
                         releases.land.total + releases.undergroundInjection.total;
    
    return {
      chemical: chemical,
      reportingYear: reportingYear,
      releases: releases,
      totalReleases: totalReleases
    };
  }
}
```

#### 5. Pollution Prevention and Source Reduction Tracking

**P2 Reporting (Section 8 - Form R)**
- Source reduction activities
- Recycling activities
- Changes in production
- One-time events
- Optional pollution prevention activities

**Tracking Capabilities**
- Year-over-year comparisons
- Activity effectiveness metrics
- Cost savings calculations
- ROI analysis

### Reporting Timeline
- **Deadline**: July 1st annually
- **Reporting Period**: Previous calendar year
- **First Year**: 1987 (covers 1987 reporting year)

### Industry Coverage
- Manufacturing (NAICS codes 31-33)
- Metal mining (NAICS 212221-212299)
- Coal mining (NAICS 212112-212113)
- Electric utilities (NAICS 221)
- Chemical wholesale distributors (NAICS 424690, 424710)
- Petroleum terminals (NAICS 424710)
- Hazardous waste treatment (NAICS 562211, 562219)
- Solvent recovery services (NAICS 562910)

---

## RMP - Risk Management Program

### Overview
The Risk Management Program (RMP) under Clean Air Act Section 112(r) requires facilities that use extremely hazardous substances to develop a Risk Management Plan to prevent and mitigate accidental releases.

### Key Features

#### 1. Process Hazard Analysis Integration

**PHA Methodologies**
- **What-If Analysis**: Scenario-based evaluation
- **Checklist Analysis**: Systematic review
- **What-If/Checklist**: Combined approach
- **Hazard and Operability Study (HAZOP)**: Detailed process review
- **Failure Mode and Effects Analysis (FMEA)**: Component-level analysis
- **Fault Tree Analysis**: Logical diagram approach

**Integration Features**
- PHA schedule management
- Team member coordination
- Finding tracking and resolution
- Action item management
- Recommendation implementation tracking

**5-Year Update Automation**
- Automatic reminder system (5 years from last PHA)
- Progressive alerts (12, 6, 3, 1 month before due)
- Change management integration
- Team availability scheduling
- Documentation assembly

```javascript
// PHA Management System
class PHAManagementSystem {
  scheduleNextPHA(processId, lastPHADate) {
    const nextPHADate = new Date(lastPHADate);
    nextPHADate.setFullYear(nextPHADate.getFullYear() + 5);
    
    // Create reminder schedule
    const reminders = [
      { date: this.subtractMonths(nextPHADate, 12), type: '12-month notice' },
      { date: this.subtractMonths(nextPHADate, 6), type: '6-month notice' },
      { date: this.subtractMonths(nextPHADate, 3), type: '3-month notice' },
      { date: this.subtractMonths(nextPHADate, 1), type: '1-month notice' }
    ];
    
    return {
      processId: processId,
      nextPHADate: nextPHADate,
      reminders: reminders,
      status: 'scheduled'
    };
  }
  
  async conductPHA(processId, methodology, team) {
    const pha = {
      processId: processId,
      methodology: methodology,
      team: team,
      date: new Date(),
      findings: [],
      recommendations: []
    };
    
    // PHA workflow
    const nodes = await this.identifyProcessNodes(processId);
    
    for (const node of nodes) {
      const hazards = await this.identifyHazards(node, methodology);
      const consequences = await this.assessConsequences(hazards);
      const safeguards = await this.identifySafeguards(node);
      
      pha.findings.push({
        node: node,
        hazards: hazards,
        consequences: consequences,
        safeguards: safeguards,
        recommendations: await this.developRecommendations(hazards, safeguards)
      });
    }
    
    return pha;
  }
}
```

#### 2. Worst-Case and Alternative Scenario Modeling

**Worst-Case Release Scenario**
- Maximum quantity release
- 10-minute duration assumed
- Worst meteorological conditions
- Passive mitigation only
- Toxic and flammable endpoints

**Alternative Release Scenarios**
- More likely release scenarios
- Active and passive mitigation
- Representative meteorological conditions
- Distance to endpoints

**Meteorological Integration**
```javascript
// Scenario Modeling Engine
class ScenarioModelingEngine {
  async modelWorstCaseScenario(process, chemical) {
    const scenario = {
      processId: process.id,
      chemical: chemical,
      scenarioType: 'worst-case',
      releaseQuantity: process.maxInventory,
      releaseDuration: 10, // minutes
      releaseRate: process.maxInventory / 10,
      meteorology: {
        windSpeed: 1.5, // m/s - worst case
        stability: 'F', // Pasquill stability class F
        temperature: 25, // °C
        humidity: 50, // %
        roughnessLength: this.getSurfaceRoughness(process.location)
      },
      mitigation: 'passive' // Only passive mitigation for worst-case
    };
    
    // Run dispersion model
    const dispersion = await this.runDispersionModel(scenario);
    
    // Calculate endpoints
    const endpoints = {
      toxic: this.calculateToxicEndpoint(chemical, dispersion),
      flammable: this.calculateFlammableEndpoint(chemical, dispersion)
    };
    
    // Analyze affected population
    const population = await this.analyzeAffectedPopulation(endpoints);
    
    return {
      scenario: scenario,
      dispersion: dispersion,
      endpoints: endpoints,
      affectedPopulation: population,
      offsite: endpoints.distance > process.propertyLine
    };
  }
  
  async modelAlternativeScenario(process, chemical, releaseScenario) {
    const scenario = {
      processId: process.id,
      chemical: chemical,
      scenarioType: 'alternative',
      releaseQuantity: releaseScenario.quantity,
      releaseDuration: releaseScenario.duration,
      releaseRate: releaseScenario.quantity / releaseScenario.duration,
      meteorology: this.getRepresentativeMeteorology(process.location),
      mitigation: 'active-passive' // Include all mitigation
    };
    
    // Include active mitigation systems
    const mitigationSystems = this.getActiveMitigation(process);
    
    // Run dispersion model with mitigation
    const dispersion = await this.runDispersionModel(scenario, mitigationSystems);
    
    // Calculate endpoints
    const endpoints = {
      toxic: this.calculateToxicEndpoint(chemical, dispersion),
      flammable: this.calculateFlammableEndpoint(chemical, dispersion)
    };
    
    return {
      scenario: scenario,
      mitigation: mitigationSystems,
      dispersion: dispersion,
      endpoints: endpoints
    };
  }
}
```

#### 3. Emergency Response Coordination

**LEPC (Local Emergency Planning Committee) Integration**
- Automatic notification protocols
- Contact information management
- Exercise coordination
- Plan update distribution
- Incident notification

**Emergency Response Features**
- Emergency action plans
- Evacuation procedures
- Communication protocols
- Training records
- Exercise documentation

#### 4. Management System Documentation

**Required Elements**
- Safety Information
- Hazard Review
- Operating Procedures
- Training
- Maintenance
- Compliance Audits
- Incident Investigation

**Audit Trail Maintenance**
- Document version control
- Change tracking
- Review cycles
- Training records
- Incident history

#### 5. Population and Environmental Receptor Analysis

**Receptor Analysis**
- Residential population
- Institutional populations (schools, hospitals, prisons)
- Commercial populations
- Recreational areas
- Environmental receptors (wetlands, endangered species habitats)

**Automated Analysis**
```javascript
// Receptor Analysis Engine
class ReceptorAnalysisEngine {
  async analyzeReceptors(facility, endpoint) {
    const receptors = {
      residential: await this.analyzeResidentialPopulation(facility, endpoint),
      institutional: await this.analyzeInstitutionalPopulation(facility, endpoint),
      commercial: await this.analyzeCommercialPopulation(facility, endpoint),
      recreational: await this.analyzeRecreationalAreas(facility, endpoint),
      environmental: await this.analyzeEnvironmentalReceptors(facility, endpoint)
    };
    
    const totalPopulation = receptors.residential.population + 
                           receptors.institutional.population + 
                           receptors.commercial.population;
    
    return {
      facility: facility,
      endpoint: endpoint,
      receptors: receptors,
      totalPopulation: totalPopulation,
      offsite: totalPopulation > 0 || receptors.environmental.criticalHabitats.length > 0
    };
  }
}
```

### RMP Program Levels
- **Program 1**: No public receptors affected, no offsite accidents in 5 years
- **Program 2**: No Program 1 or 3 eligibility
- **Program 3**: Processes subject to OSHA PSM, classified SIC/NAICS codes, or worst-case affecting public receptors

### Reporting Requirements
- Initial submission within 3 years of listing
- Updates within 5 years or when changes occur
- Electronic submission via EPA's RMP*eSubmit

---

## SPCC - Spill Prevention, Control, and Countermeasure

### Overview
The SPCC rule (40 CFR 112) requires facilities that store oil to develop and maintain Spill Prevention, Control, and Countermeasure plans to prevent oil spills and mitigate spill impacts.

### Key Features

#### 1. Facility Diagram Generation

**Automated Tank and Piping System Mapping**
- CAD integration
- GIS coordinate tracking
- Tank location and specifications
- Piping system routing
- Valve locations
- Containment areas
- Drainage patterns
- Loading/unloading areas

**Diagram Requirements**
- Tank identification numbers
- Capacity markings
- Pipe sizes and materials
- Valve types and locations
- Containment dimensions
- Drainage flow direction
- Equipment specifications

```javascript
// Facility Diagram Generator
class FacilityDiagramGenerator {
  async generateDiagram(facility) {
    const diagram = {
      facility: facility,
      layers: {
        tanks: await this.mapTanks(facility),
        piping: await this.mapPiping(facility),
        containment: await this.mapContainment(facility),
        drainage: await this.mapDrainage(facility),
        equipment: await this.mapEquipment(facility)
      },
      metadata: {
        scale: '1:500',
        projection: 'NAD83',
        lastUpdated: new Date(),
        preparedBy: this.getEngineerInfo()
      }
    };
    
    // Generate visual representation
    const visual = await this.renderDiagram(diagram);
    
    return {
      diagram: diagram,
      visual: visual,
      exported: this.exportFormats(visual) // PDF, DWG, PNG
    };
  }
  
  async mapTanks(facility) {
    const tanks = facility.getTanks();
    
    return tanks.map(tank => ({
      id: tank.id,
      type: tank.type, // AST, UST, mobile
      location: {
        latitude: tank.latitude,
        longitude: tank.longitude,
        elevation: tank.elevation
      },
      specifications: {
        capacity: tank.capacity,
        diameter: tank.diameter,
        height: tank.height,
        material: tank.material,
        containsOil: tank.oilType
      },
      containment: this.getContainmentInfo(tank)
    }));
  }
}
```

#### 2. Secondary Containment Calculations

**Containment Requirements**
- Volume calculations (110% of largest tank or 100% of largest plus 10% of others)
- Drainage considerations
- Freeboard requirements
- Rainfall accumulation
- Manual removal vs. automatic drainage

**Calculation Framework**
```javascript
// Secondary Containment Calculator
class SecondaryContainmentCalculator {
  calculateRequiredVolume(tanks, drainageArea) {
    // Method 1: Single largest tank
    const largestTank = Math.max(...tanks.map(t => t.capacity));
    const method1Volume = largestTank * 1.10;
    
    // Method 2: Largest tank + 10% of others
    const sortedTanks = tanks.sort((a, b) => b.capacity - a.capacity);
    const method2Volume = sortedTanks[0].capacity + 
                         (sortedTanks.slice(1).reduce((sum, t) => sum + t.capacity, 0) * 0.10);
    
    // Use larger requirement
    const baseRequirement = Math.max(method1Volume, method2Volume);
    
    // Add rainfall volume
    const rainfallVolume = this.calculateRainfallVolume(drainageArea);
    
    // Calculate available volume
    const containmentVolume = this.calculateContainmentVolume(drainageArea);
    const displacementVolume = this.calculateTankDisplacement(tanks);
    const availableVolume = containmentVolume - displacementVolume;
    
    return {
      requiredVolume: baseRequirement,
      rainfallVolume: rainfallVolume,
      totalRequired: baseRequirement + rainfallVolume,
      containmentVolume: containmentVolume,
      displacementVolume: displacementVolume,
      availableVolume: availableVolume,
      adequate: availableVolume >= (baseRequirement + rainfallVolume),
      deficiency: Math.max(0, (baseRequirement + rainfallVolume) - availableVolume)
    };
  }
  
  calculateRainfallVolume(drainageArea) {
    // Use 24-hour, 25-year storm event or as specified by EPA regional administrator
    const rainfallDepth = this.get25YearStormDepth(drainageArea.location); // inches
    const areaSquareFeet = drainageArea.area; // square feet
    
    // Volume in gallons
    return (rainfallDepth / 12) * areaSquareFeet * 7.48;
  }
}
```

**Rainfall and Drainage Considerations**
- 25-year, 24-hour storm event calculations
- Drainage system capacity
- Manually operated valves
- Environmental protection

#### 3. Inspection Scheduling and Documentation

**Inspection Types and Frequencies**

**Routine Inspections**
- Visual tank inspections (monthly or as appropriate)
- Secondary containment integrity checks
- Piping system integrity
- Valve operations
- Drainage system functionality

**Comprehensive Inspections**
- Tank integrity testing (based on tank type and age)
- Coating condition assessment
- Cathodic protection testing
- Piping system pressure testing
- Containment structural integrity

**Mobile App Integration**
```javascript
// Inspection Management System
class InspectionManagementSystem {
  scheduleInspections(facility, tanks) {
    const inspections = [];
    
    // Routine inspections
    tanks.forEach(tank => {
      inspections.push({
        tank: tank.id,
        type: 'routine',
        frequency: 'monthly',
        nextDue: this.calculateNextDue(tank.lastInspection, 'monthly'),
        checklist: this.getRoutineChecklist(tank.type),
        mobileEnabled: true
      });
    });
    
    // Integrity testing
    tanks.forEach(tank => {
      const testingFrequency = this.determineTestingFrequency(tank);
      inspections.push({
        tank: tank.id,
        type: 'integrity-testing',
        frequency: testingFrequency,
        nextDue: this.calculateNextDue(tank.lastIntegrityTest, testingFrequency),
        requirements: this.getTestingRequirements(tank.type),
        vendor: this.getQualifiedVendors(tank.type)
      });
    });
    
    return inspections;
  }
  
  async recordInspection(inspection, findings) {
    const record = {
      inspectionId: inspection.id,
      date: new Date(),
      inspector: inspection.inspector,
      findings: findings,
      photos: await this.uploadPhotos(findings),
      corrective Actions: this.identifyCorrectiveActions(findings),
      nextInspection: this.scheduleNext(inspection)
    };
    
    // Mobile sync
    if (inspection.mobileEnabled) {
      await this.syncWithMobile(record);
    }
    
    return record;
  }
}
```

**Documentation Requirements**
- Inspection date and inspector
- Conditions observed
- Deficiencies identified
- Corrective actions taken
- Follow-up requirements
- Photo documentation

#### 4. Professional Engineer Certification Workflow

**PE Certification Requirements**
- Self-certified plans (facilities with < 10,000 gallons aggregate capacity and no reportable spills)
- PE-certified plans (larger facilities)
- PE review of plan amendments
- Licensed Professional Engineer stamp and signature

**Workflow Management**
```javascript
// PE Certification Workflow
class PECertificationWorkflow {
  async manageCertification(facility, spccPlan) {
    // Determine certification requirement
    const certificationRequired = this.determineCertificationRequirement(facility);
    
    if (certificationRequired.type === 'self-certified') {
      return {
        type: 'self-certified',
        requirements: ['Facility owner/operator signature', 'Compliance statement'],
        workflow: 'simplified'
      };
    }
    
    // PE certification workflow
    const workflow = {
      type: 'pe-certified',
      steps: [
        {
          step: 1,
          action: 'Prepare complete SPCC plan',
          status: 'pending',
          assignedTo: 'facility-team'
        },
        {
          step: 2,
          action: 'Submit plan to licensed PE',
          status: 'pending',
          assignedTo: 'facility-manager',
          documents: ['facility-diagram', 'tank-specifications', 'inspection-records']
        },
        {
          step: 3,
          action: 'PE review and site visit',
          status: 'pending',
          assignedTo: 'professional-engineer',
          duration: '2-4 weeks'
        },
        {
          step: 4,
          action: 'Address PE comments',
          status: 'pending',
          assignedTo: 'facility-team'
        },
        {
          step: 5,
          action: 'PE certification and stamp',
          status: 'pending',
          assignedTo: 'professional-engineer',
          deliverable: 'signed-certified-plan'
        },
        {
          step: 6,
          action: 'Plan implementation',
          status: 'pending',
          assignedTo: 'facility-manager',
          deadline: '6 months from certification'
        }
      ]
    };
    
    return workflow;
  }
  
  determineCertificationRequirement(facility) {
    const totalCapacity = facility.calculateAggregateOilCapacity();
    const hasReportableSpill = facility.hasReportableSpill();
    
    if (totalCapacity < 10000 && !hasReportableSpill) {
      return {
        type: 'self-certified',
        reason: 'Facility qualifies for self-certification'
      };
    }
    
    return {
      type: 'pe-certified',
      reason: totalCapacity >= 10000 ? 'Aggregate capacity ≥ 10,000 gallons' : 'Reportable spill history'
    };
  }
}
```

#### 5. Three-Year Review and Update Automation

**Review Requirements**
- Full SPCC plan review every 5 years
- Technical amendments when changes occur
- Management approval

**Change Detection**
```javascript
// Change Detection and Update Automation
class SPCCUpdateAutomation {
  async detectChanges(facility) {
    const lastReview = facility.spccPlan.lastReviewDate;
    const changes = {
      tanks: await this.detectTankChanges(facility, lastReview),
      piping: await this.detectPipingChanges(facility, lastReview),
      containment: await this.detectContainmentChanges(facility, lastReview),
      procedures: await this.detectProcedureChanges(facility, lastReview),
      personnel: await this.detectPersonnelChanges(facility, lastReview)
    };
    
    const hasSignificantChanges = this.assessSignificance(changes);
    
    return {
      lastReview: lastReview,
      changes: changes,
      significantChanges: hasSignificantChanges,
      amendmentRequired: hasSignificantChanges,
      reviewDue: this.calculateReviewDue(lastReview)
    };
  }
  
  scheduleReview(facility) {
    const lastReview = facility.spccPlan.lastReviewDate;
    const fiveYearReview = new Date(lastReview);
    fiveYearReview.setFullYear(fiveYearReview.getFullYear() + 5);
    
    // Create reminder schedule
    const reminders = [
      { date: this.subtractMonths(fiveYearReview, 12), type: '1-year notice' },
      { date: this.subtractMonths(fiveYearReview, 6), type: '6-month notice' },
      { date: this.subtractMonths(fiveYearReview, 3), type: '3-month notice' },
      { date: this.subtractMonths(fiveYearReview, 1), type: '1-month notice' }
    ];
    
    return {
      facility: facility.id,
      lastReview: lastReview,
      nextReview: fiveYearReview,
      reminders: reminders,
      status: 'scheduled'
    };
  }
  
  async initiateUpdate(facility, changes) {
    const update = {
      facility: facility,
      updateType: changes.significantChanges ? 'technical-amendment' : 'full-review',
      changes: changes,
      workflow: await this.createUpdateWorkflow(facility, changes),
      peCertificationRequired: this.requiresPEReview(changes)
    };
    
    if (update.peCertificationRequired) {
      update.peWorkflow = await this.initiatePEReview(facility, changes);
    }
    
    return update;
  }
}
```

**Automated Features**
- Change tracking from SCADA/ERP systems
- Automatic reminder generation
- Document version control
- PE recertification workflow
- Regulatory update notifications

### SPCC Applicability
- Facilities with aggregate aboveground oil storage capacity > 1,320 gallons
- Facilities with underground oil storage capacity > 42,000 gallons
- Oil storage could reasonably be expected to discharge to navigable waters

### Key Deadlines
- Initial SPCC plan: Within 6 months of exceeding threshold
- Plan implementation: Within 6 months of plan certification
- Plan reviews: Every 5 years
- Technical amendments: As changes occur

---

## Integration and Automation

### Cross-Program Integration

**Shared Data Elements**
- Facility identification and location
- Chemical inventory
- Process descriptions
- Emission sources
- Waste management activities

**Automated Data Flow**
```javascript
// Cross-Program Data Integration
class CrossProgramIntegration {
  async synchronizeData(facility) {
    // Identify shared data elements
    const sharedData = {
      chemicals: await this.getChemicalInventory(facility),
      processes: await this.getProcesses(facility),
      emissions: await this.getEmissionSources(facility),
      waste: await this.getWasteStreams(facility)
    };
    
    // Map data to program-specific requirements
    const programMappings = {
      ghgrp: await this.mapToGHGRP(sharedData),
      tri: await this.mapToTRI(sharedData),
      rmp: await this.mapToRMP(sharedData),
      spcc: await this.mapToSPCC(sharedData)
    };
    
    // Identify data gaps
    const gaps = this.identifyDataGaps(programMappings);
    
    return {
      sharedData: sharedData,
      programMappings: programMappings,
      dataGaps: gaps,
      recommendations: this.generateRecommendations(gaps)
    };
  }
}
```

### Deadline Management Dashboard

**Consolidated View**
- All program deadlines in single calendar
- Color-coded urgency indicators
- Progress tracking for each program
- Resource allocation planning
- Historical compliance tracking

### Automated Validation

**Cross-Program Consistency Checks**
- Chemical inventory consistency
- Emission calculations validation
- Waste management balances
- Facility information accuracy

---

## Compliance Support

### Regulatory Updates
- Automatic tracking of Federal Register
- Rule change notifications
- Impact assessment
- Implementation guidance

### Training Materials
- Program-specific training modules
- Video tutorials
- Interactive examples
- Certification tracking

### Audit Support
- Comprehensive documentation
- Evidence packages
- Historical data access
- Response templates

---

**Next**: [State Compliance Integration](./02-State-Compliance-Integration.md)
