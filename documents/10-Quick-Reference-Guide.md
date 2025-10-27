# Quick Reference Guide

## Overview

This guide provides at-a-glance information for common tasks, deadlines, contacts, and troubleshooting procedures. Use this as your first reference for quick answers.

---

## Key Reporting Deadlines

### Federal EPA Programs

| Program | Report Type | Frequency | Deadline | Notes |
|---------|-------------|-----------|----------|-------|
| **GHGRP** | Annual Emission Report | Annual | March 31 | Previous calendar year |
| **TRI** | Form R/Form A | Annual | July 1 | Previous calendar year |
| **RMP** | Risk Management Plan | 5 years | As required | Within 3 years of listing |
| **SPCC** | Plan Review | 5 years | Ongoing | Amendments as needed |

### State Programs (Tier 1)

#### Texas (RRC)

| Report | Frequency | Deadline | System |
|--------|-----------|----------|--------|
| Form P-5 | Monthly | 30 days after month end | RRC Online |
| Form W-3 | Monthly | 30 days after month end | RRC Online |
| Form H-1 | Event-driven | Before drilling | RRC Online |
| Form W-1 | Event-driven | Before drilling | RRC Online |
| Form W-2 | Event-driven | 30 days after completion | RRC Online |

#### Oklahoma (OCC)

| Report | Frequency | Deadline | System |
|--------|-----------|----------|--------|
| Form 1012A | Monthly | By 15th of following month | OCC Online |
| Form 1000 Series | Event-driven | Varies by form | OCC Online |
| Injection Wells | Monthly | By 15th of following month | OCC Online |

#### Pennsylvania (DEP)

| Report | Frequency | Deadline | System |
|--------|-----------|----------|--------|
| Well Completion | Event-driven | 30 days after completion | PA DEP Portal |
| Water Management | Quarterly | 30 days after quarter end | PA DEP Portal |
| Air Emissions | Quarterly | 45 days after quarter end | PA DEP Portal |

#### North Dakota

| Report | Frequency | Deadline | System |
|--------|-----------|----------|--------|
| Monthly Production | Monthly | By last day of following month | ND Industrial Commission |
| Flaring Report | Monthly | By last day of following month | ND Industrial Commission |

---

## Agency Contact Information

### Federal Agencies

**EPA Greenhouse Gas Reporting Program (GHGRP)**
- Website: https://www.epa.gov/ghgreporting
- Email: ghgmrr@epa.gov
- Phone: (202) 343-9990
- e-GGRT Help: https://epacdx.net/ggrt

**EPA Toxic Release Inventory (TRI)**
- Website: https://www.epa.gov/tri
- Email: tri@epa.gov
- Phone: (800) 424-9346
- TRI-MEweb: https://www.epa.gov/tri/tri-meweb

**EPA Risk Management Program (RMP)**
- Website: https://www.epa.gov/rmp
- Email: rmp_reporting@epa.gov
- Phone: (800) 424-9346
- RMP*eSubmit: https://cdx.epa.gov/

**EPA SPCC Program**
- Website: https://www.epa.gov/oil-spills-prevention-and-preparedness-regulations
- Phone: (800) 424-9346

### State Agencies (Tier 1)

**Texas Railroad Commission**
- Website: https://www.rrc.texas.gov
- Phone: (512) 463-7000
- Online System: https://webapps.rrc.texas.gov/

**Oklahoma Corporation Commission**
- Website: https://oklahoma.gov/occ.html
- Phone: (405) 521-2211
- Online System: https://www.occeweb.com/

**Pennsylvania DEP**
- Website: https://www.dep.pa.gov/
- Phone: (717) 787-2814
- Oil & Gas: (717) 772-2199

**North Dakota Industrial Commission**
- Website: https://www.dmr.nd.gov/oilgas/
- Phone: (701) 328-8020

---

## Common Calculation Methodologies

### EPA GHGRP - Stationary Combustion (Subpart C)

**Tier 1: Default Factors**
```
CO2 Emissions = Fuel Quantity × Default HHV × Default CO2 EF
```

**Tier 2: Custom HHV**
```
CO2 Emissions = Fuel Quantity × Measured HHV × Default CO2 EF
```

**Tier 3: Carbon Content**
```
CO2 Emissions = Heat Input × Measured Carbon Content × Oxidation Factor × (44/12)
```

**Tier 4: CEMS**
```
CO2 Emissions = CEMS Measured Concentration × Stack Gas Flow × Operating Hours
```

### EPA GHGRP - Oil & Gas Systems (Subpart W)

**Pneumatic Device Emissions**
```
Annual CH4 = Device Count × Gas Activity Factor × CH4 Content × 8,760 hours
```

**Flaring Emissions**
```
CO2 = Flare Volume × CH4 Content × CE × 44/16
where CE = Combustion Efficiency (default 98%)
```

### TRI - Threshold Determination

**Manufacturing Threshold**: 25,000 lbs (100 lbs for PBT)
**Otherwise Use Threshold**: 10,000 lbs (100 lbs for PBT)

**De Minimis Exemption**:
- 1% for non-carcinogens
- 0.1% for carcinogens and PBTs

---

## Reporting Checklists

### GHGRP Annual Report Checklist

- [ ] Collect fuel consumption data by source
- [ ] Determine applicable calculation tier
- [ ] Apply appropriate emission factors
- [ ] Calculate CO2, CH4, N2O emissions
- [ ] Convert to CO2e (GWP: CH4=25, N2O=298)
- [ ] Compile supporting documentation
- [ ] Internal review and approval
- [ ] Third-party verification (if required)
- [ ] Submit via e-GGRT by March 31
- [ ] Retain records for 5 years

### TRI Form R Checklist

- [ ] Determine chemical applicability
- [ ] Calculate manufactured/processed/otherwise used amounts
- [ ] Confirm threshold exceedance
- [ ] Determine Form R vs. Form A eligibility
- [ ] Calculate releases (air, water, land, injection)
- [ ] Calculate off-site transfers
- [ ] Document waste management activities
- [ ] Complete source reduction information
- [ ] Management review and certification
- [ ] Submit via TRI-MEweb by July 1
- [ ] Retain records for 5 years

### State Production Report Checklist (Texas P-5)

- [ ] Gather monthly production by lease
- [ ] Perform well-level allocation
- [ ] Calculate gas-oil ratios
- [ ] Document test data
- [ ] Verify disposition (sales, flare, etc.)
- [ ] Validate against previous month
- [ ] Management review
- [ ] Submit via RRC Online
- [ ] Retain supporting documentation

---

## Troubleshooting Guide

### Common Issues & Solutions

#### Issue: Data Collection Failures

**Symptoms**: Missing data from ERP/SCADA systems

**Troubleshooting Steps**:
1. Check network connectivity
2. Verify system credentials
3. Check API endpoint status
4. Review error logs
5. Test with manual data query
6. Contact IT support if needed

**Prevention**: Schedule regular connectivity tests, maintain backup data collection methods

---

#### Issue: Validation Errors

**Symptoms**: Data fails validation checks

**Troubleshooting Steps**:
1. Review specific validation error messages
2. Check data against reasonable ranges
3. Verify units of measurement
4. Confirm calculation methodology
5. Review source data quality
6. Check for data entry errors

**Prevention**: Implement automated data quality checks, establish data review procedures

---

#### Issue: Submission Failures

**Symptoms**: Unable to submit report to agency

**Troubleshooting Steps**:
1. Verify agency portal availability
2. Check authentication credentials
3. Review report format requirements
4. Validate all required fields completed
5. Check file size limits
6. Test with simplified submission
7. Contact agency support

**Prevention**: Test submissions early, maintain backup submission methods, schedule submissions before deadline

---

#### Issue: Calculation Discrepancies

**Symptoms**: Results don't match expectations

**Troubleshooting Steps**:
1. Verify input data accuracy
2. Confirm correct methodology selected
3. Check emission factors/constants
4. Review unit conversions
5. Compare with historical data
6. Validate calculation logic
7. Perform manual calculation check

**Prevention**: Regular calculation audits, peer review process, documented methodologies

---

## Emergency Contacts

### Critical Situations

**System Down / Data Loss**
- Technical Support: (555) 123-4567
- Available: 24/7
- Response Time: < 1 hour

**Regulatory Deadline Crisis**
- Compliance Hotline: (555) 123-4568
- Available: Business hours + on-call
- Response Time: < 2 hours

**Security Incident**
- Security Team: (555) 123-4569
- Available: 24/7
- Response Time: Immediate

---

## Useful Resources

### Training Materials

- **Getting Started Guide**: /docs/getting-started.pdf
- **Video Tutorials**: https://training.greencountry.com
- **User Forum**: https://community.greencountry.com
- **Knowledge Base**: https://support.greencountry.com/kb

### Regulatory Resources

- **EPA Regulations**: https://www.ecfr.gov/
- **Federal Register**: https://www.federalregister.gov/
- **State Regulations**: Links in state-specific documentation
- **Industry Associations**: API, AXPC, IPAA, etc.

### Calculation Tools

- **EPA Emission Factors**: https://www.epa.gov/air-emissions-factors-and-quantification
- **IPCC Guidelines**: https://www.ipcc-nggip.iges.or.jp/
- **API Compendium**: Available to API members

---

## Acronyms & Abbreviations

| Acronym | Full Name |
|---------|-----------|
| AER | Alberta Energy Regulator |
| API | American Petroleum Institute |
| CEMS | Continuous Emissions Monitoring System |
| CDX | Central Data Exchange (EPA) |
| COGCC | Colorado Oil and Gas Conservation Commission |
| DEP | Department of Environmental Protection |
| e-GGRT | Electronic Greenhouse Gas Reporting Tool |
| EF | Emission Factor |
| ERP | Enterprise Resource Planning |
| GHG | Greenhouse Gas |
| GHGRP | Greenhouse Gas Reporting Program |
| GOR | Gas-Oil Ratio |
| GWP | Global Warming Potential |
| HHV | Higher Heating Value |
| LDAR | Leak Detection and Repair |
| LEPC | Local Emergency Planning Committee |
| LIMS | Laboratory Information Management System |
| MIT | Mechanical Integrity Test |
| NPD | Norwegian Petroleum Directorate |
| OCC | Oklahoma Corporation Commission |
| PBT | Persistent Bioaccumulative Toxic |
| PE | Professional Engineer |
| PHA | Process Hazard Analysis |
| RMP | Risk Management Program |
| RRC | Railroad Commission of Texas |
| SCADA | Supervisory Control and Data Acquisition |
| SPCC | Spill Prevention, Control, and Countermeasure |
| TRI | Toxic Release Inventory |
| UIC | Underground Injection Control |

---

## Quick Start Guides

### New User Setup (5 Minutes)

1. **Log In**: Use provided credentials
2. **Complete Profile**: Add contact information
3. **Review Dashboard**: Familiarize with layout
4. **Check Deadlines**: Review upcoming deadlines
5. **Access Training**: Watch 10-minute intro video

### Submit Your First Report (30 Minutes)

1. **Select Report Type**: Choose from available programs
2. **Import Data**: Use automated data collection or manual entry
3. **Review Calculations**: Verify results
4. **Validate**: Run built-in validation checks
5. **Internal Review**: Route for approval
6. **Submit**: Send to agency
7. **Confirm**: Verify submission confirmation

### Set Up Automated Data Collection (1 Hour)

1. **Navigate to Integration**: Go to Settings > Integrations
2. **Select Data Source**: ERP, SCADA, or LIMS
3. **Configure Connection**: Enter credentials and endpoints
4. **Map Data Fields**: Match source to destination fields
5. **Test Connection**: Run test data pull
6. **Schedule**: Set automatic collection frequency
7. **Monitor**: Review initial collections

---

## Support Information

### Standard Support
- **Email**: support@greencountry.com
- **Phone**: (555) 123-4500
- **Hours**: Monday-Friday, 8 AM - 6 PM CST
- **Response Time**: 4 business hours

### Premium Support
- **Email**: premium@greencountry.com
- **Phone**: (555) 123-4501
- **Hours**: 24/7/365
- **Response Time**: 1 hour

### Professional Services
- **Email**: consulting@greencountry.com
- **Phone**: (555) 123-4502
- **Hours**: By appointment

---

**© 2025 Green Country. All rights reserved.**

**Last Updated**: October 2025
**Version**: 1.0
