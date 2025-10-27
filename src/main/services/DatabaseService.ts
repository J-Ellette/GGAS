import Database from 'better-sqlite3';
import * as path from 'path';
import { app } from 'electron';
import * as fs from 'fs';

export interface ActivityData {
  id?: number;
  organizationUnit: string;
  timePeriod: string;
  emissionSource: string;
  activityType: string;
  value: number;
  unit: string;
  dataSource: string;
  dataQuality: number;
  metadata?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmissionFactor {
  id?: number;
  name: string;
  category: string;
  subcategory: string;
  source: string;
  version: string;
  value: number;
  unit: string;
  region?: string;
  year?: number;
  description?: string;
  isCustom: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Calculation {
  id?: number;
  activityDataId: number;
  emissionFactorId: number;
  scope: number;
  methodology: string;
  result: number;
  unit: string;
  uncertainty?: number;
  metadata?: string;
  createdAt?: string;
}

export class DatabaseService {
  private db: Database.Database | null = null;

  initialize() {
    const userDataPath = app.getPath('userData');
    const dbPath = path.join(userDataPath, 'ggas.db');
    
    // Ensure directory exists
    if (!fs.existsSync(userDataPath)) {
      fs.mkdirSync(userDataPath, { recursive: true });
    }

    this.db = new Database(dbPath);
    this.createTables();
    this.seedEmissionFactors();
  }

  private createTables() {
    if (!this.db) return;

    // Activity Data table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS activity_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        organizationUnit TEXT NOT NULL,
        timePeriod TEXT NOT NULL,
        emissionSource TEXT NOT NULL,
        activityType TEXT NOT NULL,
        value REAL NOT NULL,
        unit TEXT NOT NULL,
        dataSource TEXT NOT NULL,
        dataQuality REAL DEFAULT 0,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Emission Factors table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS emission_factors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        subcategory TEXT NOT NULL,
        source TEXT NOT NULL,
        version TEXT NOT NULL,
        value REAL NOT NULL,
        unit TEXT NOT NULL,
        region TEXT,
        year INTEGER,
        description TEXT,
        isCustom INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Calculations table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS calculations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activityDataId INTEGER NOT NULL,
        emissionFactorId INTEGER NOT NULL,
        scope INTEGER NOT NULL,
        methodology TEXT NOT NULL,
        result REAL NOT NULL,
        unit TEXT NOT NULL,
        uncertainty REAL,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (activityDataId) REFERENCES activity_data(id),
        FOREIGN KEY (emissionFactorId) REFERENCES emission_factors(id)
      )
    `);

    // Phase 2.1: Scope 3 Categories
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS scope3_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoryNumber INTEGER NOT NULL UNIQUE,
        categoryName TEXT NOT NULL,
        description TEXT NOT NULL,
        guidanceNotes TEXT,
        isEnabled INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 2.1: Supplier Data
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS supplier_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        supplierName TEXT NOT NULL,
        supplierCategory TEXT NOT NULL,
        contactInfo TEXT,
        emissionsData REAL,
        dataQuality REAL DEFAULT 0,
        reportingYear INTEGER NOT NULL,
        verificationStatus TEXT DEFAULT 'unverified',
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 2.2: Integrations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS integrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'inactive',
        connectionString TEXT,
        lastSyncTime DATETIME,
        configuration TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 2.3: Scenarios
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS scenarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        baselineYear INTEGER NOT NULL,
        targetYear INTEGER NOT NULL,
        parameters TEXT,
        results TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 2.4: Compliance Reports
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS compliance_reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reportType TEXT NOT NULL,
        reportingYear INTEGER NOT NULL,
        status TEXT DEFAULT 'draft',
        data TEXT,
        submittedDate DATETIME,
        verificationStatus TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 2.5: User Roles
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS user_roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        roleName TEXT NOT NULL UNIQUE,
        permissions TEXT NOT NULL,
        description TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 2.5: Users
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        roleId INTEGER NOT NULL,
        isActive INTEGER DEFAULT 1,
        lastLogin DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (roleId) REFERENCES user_roles(id)
      )
    `);

    // Phase 3.1: AI/ML Features - Anomaly Detection
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS anomaly_detections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dataType TEXT NOT NULL,
        dataId INTEGER NOT NULL,
        anomalyScore REAL NOT NULL,
        anomalyType TEXT NOT NULL,
        recommendation TEXT,
        status TEXT DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        resolvedAt DATETIME
      )
    `);

    // Phase 3.1: Predictive Models
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS predictive_models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelType TEXT NOT NULL,
        targetField TEXT NOT NULL,
        trainingData TEXT,
        modelParameters TEXT,
        accuracy REAL,
        lastTrained DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.1: ML Suggestions
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ml_suggestions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sourceType TEXT NOT NULL,
        sourceId INTEGER NOT NULL,
        suggestionType TEXT NOT NULL,
        suggestedValue TEXT,
        confidence REAL NOT NULL,
        reasoning TEXT,
        status TEXT DEFAULT 'pending',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.2: Carbon Targets
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS carbon_targets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        targetName TEXT NOT NULL,
        targetType TEXT NOT NULL,
        baselineYear INTEGER NOT NULL,
        baselineEmissions REAL NOT NULL,
        targetYear INTEGER NOT NULL,
        targetReduction REAL NOT NULL,
        scope TEXT NOT NULL,
        status TEXT DEFAULT 'draft',
        sbtiValidated INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.2: Reduction Projects
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS reduction_projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        projectName TEXT NOT NULL,
        description TEXT,
        projectType TEXT NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        status TEXT DEFAULT 'planned',
        targetEmissionReduction REAL NOT NULL,
        actualEmissionReduction REAL,
        estimatedCost REAL NOT NULL,
        actualCost REAL,
        roi REAL,
        milestones TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.2: Carbon Pricing Scenarios
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS carbon_pricing_scenarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scenarioName TEXT NOT NULL,
        carbonPrice REAL NOT NULL,
        currency TEXT NOT NULL,
        priceGrowthRate REAL NOT NULL,
        applicableScopes TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.3: Supplier Engagements
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS supplier_engagements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        supplierId INTEGER NOT NULL,
        engagementType TEXT NOT NULL,
        status TEXT DEFAULT 'initiated',
        requestedDate DATE NOT NULL,
        dueDate DATE NOT NULL,
        completedDate DATE,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (supplierId) REFERENCES supplier_data(id)
      )
    `);

    // Phase 3.3: Supply Chain Maps
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS supply_chain_maps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tier INTEGER NOT NULL,
        supplierId INTEGER NOT NULL,
        parentSupplierId INTEGER,
        productCategory TEXT NOT NULL,
        spendAmount REAL NOT NULL,
        emissionsContribution REAL NOT NULL,
        geographicLocation TEXT,
        riskLevel TEXT DEFAULT 'medium',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (supplierId) REFERENCES supplier_data(id),
        FOREIGN KEY (parentSupplierId) REFERENCES supplier_data(id)
      )
    `);

    // Phase 3.3: Supplier Assessments
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS supplier_assessments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        supplierId INTEGER NOT NULL,
        assessmentDate DATE NOT NULL,
        overallScore REAL NOT NULL,
        emissionsScore REAL NOT NULL,
        dataQualityScore REAL NOT NULL,
        engagementScore REAL NOT NULL,
        certifications TEXT,
        improvementAreas TEXT,
        nextReviewDate DATE NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (supplierId) REFERENCES supplier_data(id)
      )
    `);

    // Phase 3.4: Entities (Multi-Entity Support)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS entities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entityName TEXT NOT NULL,
        entityType TEXT NOT NULL,
        parentEntityId INTEGER,
        country TEXT NOT NULL,
        currency TEXT NOT NULL,
        language TEXT NOT NULL,
        timezone TEXT NOT NULL,
        isActive INTEGER DEFAULT 1,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parentEntityId) REFERENCES entities(id)
      )
    `);

    // Phase 3.4: Regional Compliance
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS regional_compliance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        region TEXT NOT NULL,
        regulationType TEXT NOT NULL,
        regulationName TEXT NOT NULL,
        description TEXT NOT NULL,
        applicableScopes TEXT NOT NULL,
        reportingFrequency TEXT NOT NULL,
        nextDeadline DATE NOT NULL,
        isActive INTEGER DEFAULT 1,
        requirements TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.4: Data Governance Policies
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS data_governance_policies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        policyName TEXT NOT NULL,
        policyType TEXT NOT NULL,
        description TEXT NOT NULL,
        entityId INTEGER,
        rules TEXT,
        isActive INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (entityId) REFERENCES entities(id)
      )
    `);

    // Phase 3.5: Integration Plugins
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS integration_plugins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pluginName TEXT NOT NULL,
        pluginType TEXT NOT NULL,
        version TEXT NOT NULL,
        author TEXT NOT NULL,
        description TEXT NOT NULL,
        configSchema TEXT,
        isInstalled INTEGER DEFAULT 0,
        isActive INTEGER DEFAULT 0,
        installDate DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.5: Custom Calculations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS custom_calculations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        calculationName TEXT NOT NULL,
        description TEXT NOT NULL,
        formula TEXT NOT NULL,
        variables TEXT,
        outputUnit TEXT NOT NULL,
        category TEXT NOT NULL,
        isActive INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 3.5: Automation Workflows
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS automation_workflows (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workflowName TEXT NOT NULL,
        description TEXT NOT NULL,
        triggerType TEXT NOT NULL,
        triggerConfig TEXT,
        actions TEXT,
        isActive INTEGER DEFAULT 1,
        lastRunDate DATETIME,
        nextRunDate DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes for better performance
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_activity_data_org_unit ON activity_data(organizationUnit);
      CREATE INDEX IF NOT EXISTS idx_activity_data_time_period ON activity_data(timePeriod);
      CREATE INDEX IF NOT EXISTS idx_emission_factors_category ON emission_factors(category);
      CREATE INDEX IF NOT EXISTS idx_calculations_scope ON calculations(scope);
      CREATE INDEX IF NOT EXISTS idx_supplier_data_category ON supplier_data(supplierCategory);
      CREATE INDEX IF NOT EXISTS idx_integrations_type ON integrations(type);
      CREATE INDEX IF NOT EXISTS idx_compliance_reports_type ON compliance_reports(reportType);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(roleId);
      CREATE INDEX IF NOT EXISTS idx_anomaly_detections_data ON anomaly_detections(dataType, dataId);
      CREATE INDEX IF NOT EXISTS idx_ml_suggestions_source ON ml_suggestions(sourceType, sourceId);
      CREATE INDEX IF NOT EXISTS idx_carbon_targets_status ON carbon_targets(status);
      CREATE INDEX IF NOT EXISTS idx_reduction_projects_status ON reduction_projects(status);
      CREATE INDEX IF NOT EXISTS idx_supplier_engagements_supplier ON supplier_engagements(supplierId);
      CREATE INDEX IF NOT EXISTS idx_supply_chain_maps_tier ON supply_chain_maps(tier);
      CREATE INDEX IF NOT EXISTS idx_supplier_assessments_supplier ON supplier_assessments(supplierId);
      CREATE INDEX IF NOT EXISTS idx_entities_parent ON entities(parentEntityId);
      CREATE INDEX IF NOT EXISTS idx_regional_compliance_region ON regional_compliance(region);
      CREATE INDEX IF NOT EXISTS idx_integration_plugins_type ON integration_plugins(pluginType);
      CREATE INDEX IF NOT EXISTS idx_automation_workflows_trigger ON automation_workflows(triggerType);
    `);

    // Seed Scope 3 categories
    this.seedScope3Categories();
    // Seed default user roles
    this.seedUserRoles();
  }

  private seedEmissionFactors() {
    if (!this.db) return;

    // Check if we already have emission factors
    const count = this.db.prepare('SELECT COUNT(*) as count FROM emission_factors').get() as { count: number };
    if (count.count > 0) return;

    // Seed with common emission factors
    const factors = [
      // Stationary Combustion - Natural Gas
      {
        name: 'Natural Gas - Stationary Combustion',
        category: 'Scope 1',
        subcategory: 'Stationary Combustion',
        source: 'EPA',
        version: '2024',
        value: 53.06,
        unit: 'kg CO2e/MMBtu',
        region: 'US',
        year: 2024,
        description: 'Natural gas combustion in stationary sources',
        isCustom: 0
      },
      // Stationary Combustion - Coal
      {
        name: 'Coal - Stationary Combustion',
        category: 'Scope 1',
        subcategory: 'Stationary Combustion',
        source: 'EPA',
        version: '2024',
        value: 95.52,
        unit: 'kg CO2e/MMBtu',
        region: 'US',
        year: 2024,
        description: 'Coal combustion in stationary sources',
        isCustom: 0
      },
      // Mobile Combustion - Gasoline
      {
        name: 'Gasoline - Mobile Combustion',
        category: 'Scope 1',
        subcategory: 'Mobile Combustion',
        source: 'EPA',
        version: '2024',
        value: 8.78,
        unit: 'kg CO2e/gallon',
        region: 'US',
        year: 2024,
        description: 'Gasoline combustion in mobile sources',
        isCustom: 0
      },
      // Mobile Combustion - Diesel
      {
        name: 'Diesel - Mobile Combustion',
        category: 'Scope 1',
        subcategory: 'Mobile Combustion',
        source: 'EPA',
        version: '2024',
        value: 10.21,
        unit: 'kg CO2e/gallon',
        region: 'US',
        year: 2024,
        description: 'Diesel combustion in mobile sources',
        isCustom: 0
      },
      // Electricity - US Grid Average
      {
        name: 'Electricity - US Grid Average',
        category: 'Scope 2',
        subcategory: 'Purchased Electricity',
        source: 'EPA eGRID',
        version: '2024',
        value: 0.855,
        unit: 'kg CO2e/kWh',
        region: 'US',
        year: 2024,
        description: 'US national average grid electricity',
        isCustom: 0
      },
      // Business Travel - Air Travel
      {
        name: 'Air Travel - Short Haul',
        category: 'Scope 3',
        subcategory: 'Business Travel',
        source: 'DEFRA',
        version: '2024',
        value: 0.156,
        unit: 'kg CO2e/passenger-mile',
        region: 'Global',
        year: 2024,
        description: 'Short-haul air travel (<300 miles)',
        isCustom: 0
      },
      {
        name: 'Air Travel - Long Haul',
        category: 'Scope 3',
        subcategory: 'Business Travel',
        source: 'DEFRA',
        version: '2024',
        value: 0.133,
        unit: 'kg CO2e/passenger-mile',
        region: 'Global',
        year: 2024,
        description: 'Long-haul air travel (>300 miles)',
        isCustom: 0
      },
      // Employee Commuting
      {
        name: 'Employee Commuting - Car',
        category: 'Scope 3',
        subcategory: 'Employee Commuting',
        source: 'EPA',
        version: '2024',
        value: 0.404,
        unit: 'kg CO2e/mile',
        region: 'US',
        year: 2024,
        description: 'Average passenger vehicle',
        isCustom: 0
      }
    ];

    const stmt = this.db.prepare(`
      INSERT INTO emission_factors 
      (name, category, subcategory, source, version, value, unit, region, year, description, isCustom)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insert = this.db.transaction((factors: any[]) => {
      for (const factor of factors) {
        stmt.run(
          factor.name,
          factor.category,
          factor.subcategory,
          factor.source,
          factor.version,
          factor.value,
          factor.unit,
          factor.region,
          factor.year,
          factor.description,
          factor.isCustom
        );
      }
    });

    insert(factors);
  }

  private seedScope3Categories() {
    if (!this.db) return;

    // Check if we already have scope 3 categories
    const count = this.db.prepare('SELECT COUNT(*) as count FROM scope3_categories').get() as { count: number };
    if (count.count > 0) return;

    const categories = [
      { num: 1, name: 'Purchased Goods and Services', desc: 'Extraction, production, and transportation of goods and services purchased or acquired by the reporting company' },
      { num: 2, name: 'Capital Goods', desc: 'Extraction, production, and transportation of capital goods purchased or acquired by the reporting company' },
      { num: 3, name: 'Fuel- and Energy-Related Activities', desc: 'Extraction, production, and transportation of fuels and energy purchased or acquired by the reporting company not included in Scope 1 or Scope 2' },
      { num: 4, name: 'Upstream Transportation and Distribution', desc: 'Transportation and distribution of products purchased by the reporting company between tier 1 suppliers and the reporting company' },
      { num: 5, name: 'Waste Generated in Operations', desc: 'Disposal and treatment of waste generated in the reporting company\'s operations' },
      { num: 6, name: 'Business Travel', desc: 'Transportation of employees for business-related activities during the reporting year' },
      { num: 7, name: 'Employee Commuting', desc: 'Transportation of employees between their homes and worksites during the reporting year' },
      { num: 8, name: 'Upstream Leased Assets', desc: 'Operation of assets leased by the reporting company (lessee) not included in Scope 1 or Scope 2' },
      { num: 9, name: 'Downstream Transportation and Distribution', desc: 'Transportation and distribution of products sold by the reporting company between the reporting company\'s operations and the end consumer' },
      { num: 10, name: 'Processing of Sold Products', desc: 'Processing of intermediate products sold by downstream companies' },
      { num: 11, name: 'Use of Sold Products', desc: 'End use of goods and services sold by the reporting company' },
      { num: 12, name: 'End-of-Life Treatment of Sold Products', desc: 'Waste disposal and treatment of products sold by the reporting company at the end of their life' },
      { num: 13, name: 'Downstream Leased Assets', desc: 'Operation of assets owned by the reporting company (lessor) and leased to other entities not included in Scope 1 or Scope 2' },
      { num: 14, name: 'Franchises', desc: 'Operation of franchises during the reporting year' },
      { num: 15, name: 'Investments', desc: 'Operation of investments made by the reporting company' }
    ];

    const stmt = this.db.prepare(`
      INSERT INTO scope3_categories (categoryNumber, categoryName, description, isEnabled)
      VALUES (?, ?, ?, 1)
    `);

    const insert = this.db.transaction((cats: any[]) => {
      for (const cat of cats) {
        stmt.run(cat.num, cat.name, cat.desc);
      }
    });

    insert(categories);
  }

  private seedUserRoles() {
    if (!this.db) return;

    // Check if we already have user roles
    const count = this.db.prepare('SELECT COUNT(*) as count FROM user_roles').get() as { count: number };
    if (count.count > 0) return;

    const roles = [
      {
        name: 'Administrator',
        permissions: JSON.stringify({
          canManageUsers: true,
          canManageData: true,
          canViewReports: true,
          canExportData: true,
          canManageIntegrations: true,
          canManageCompliance: true
        }),
        desc: 'Full system access with user management capabilities'
      },
      {
        name: 'Manager',
        permissions: JSON.stringify({
          canManageUsers: false,
          canManageData: true,
          canViewReports: true,
          canExportData: true,
          canManageIntegrations: true,
          canManageCompliance: true
        }),
        desc: 'Can manage data, reports, and compliance but not users'
      },
      {
        name: 'Analyst',
        permissions: JSON.stringify({
          canManageUsers: false,
          canManageData: true,
          canViewReports: true,
          canExportData: true,
          canManageIntegrations: false,
          canManageCompliance: false
        }),
        desc: 'Can input and analyze data, view and export reports'
      },
      {
        name: 'Viewer',
        permissions: JSON.stringify({
          canManageUsers: false,
          canManageData: false,
          canViewReports: true,
          canExportData: false,
          canManageIntegrations: false,
          canManageCompliance: false
        }),
        desc: 'Read-only access to reports and dashboards'
      }
    ];

    const stmt = this.db.prepare(`
      INSERT INTO user_roles (roleName, permissions, description)
      VALUES (?, ?, ?)
    `);

    const insert = this.db.transaction((roles: any[]) => {
      for (const role of roles) {
        stmt.run(role.name, role.permissions, role.desc);
      }
    });

    insert(roles);
  }

  // Activity Data CRUD operations
  createActivityData(data: ActivityData) {
    if (!this.db) return null;

    const stmt = this.db.prepare(`
      INSERT INTO activity_data 
      (organizationUnit, timePeriod, emissionSource, activityType, value, unit, dataSource, dataQuality, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.organizationUnit,
      data.timePeriod,
      data.emissionSource,
      data.activityType,
      data.value,
      data.unit,
      data.dataSource,
      data.dataQuality || 0,
      data.metadata || null
    );

    return { id: result.lastInsertRowid, ...data };
  }

  listActivityData(filters?: any) {
    if (!this.db) return [];

    let query = 'SELECT * FROM activity_data WHERE 1=1';
    const params: any[] = [];

    if (filters?.organizationUnit) {
      query += ' AND organizationUnit = ?';
      params.push(filters.organizationUnit);
    }

    if (filters?.timePeriod) {
      query += ' AND timePeriod = ?';
      params.push(filters.timePeriod);
    }

    if (filters?.emissionSource) {
      query += ' AND emissionSource = ?';
      params.push(filters.emissionSource);
    }

    query += ' ORDER BY createdAt DESC';

    const stmt = this.db.prepare(query);
    return stmt.all(...params);
  }

  updateActivityData(id: number, data: Partial<ActivityData>) {
    if (!this.db) return null;

    const fields: string[] = [];
    const values: any[] = [];

    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt') {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    });

    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = this.db.prepare(`
      UPDATE activity_data SET ${fields.join(', ')} WHERE id = ?
    `);

    stmt.run(...values);
    return this.db.prepare('SELECT * FROM activity_data WHERE id = ?').get(id);
  }

  deleteActivityData(id: number) {
    if (!this.db) return false;

    const stmt = this.db.prepare('DELETE FROM activity_data WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Emission Factor operations
  listEmissionFactors(filters?: any) {
    if (!this.db) return [];

    let query = 'SELECT * FROM emission_factors WHERE 1=1';
    const params: any[] = [];

    if (filters?.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }

    if (filters?.subcategory) {
      query += ' AND subcategory = ?';
      params.push(filters.subcategory);
    }

    query += ' ORDER BY category, subcategory, name';

    const stmt = this.db.prepare(query);
    return stmt.all(...params);
  }

  searchEmissionFactors(query: string) {
    if (!this.db) return [];

    const stmt = this.db.prepare(`
      SELECT * FROM emission_factors 
      WHERE name LIKE ? OR description LIKE ? OR category LIKE ?
      ORDER BY category, name
    `);

    const searchPattern = `%${query}%`;
    return stmt.all(searchPattern, searchPattern, searchPattern);
  }

  createEmissionFactor(data: EmissionFactor) {
    if (!this.db) return null;

    const stmt = this.db.prepare(`
      INSERT INTO emission_factors 
      (name, category, subcategory, source, version, value, unit, region, year, description, isCustom)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.name,
      data.category,
      data.subcategory,
      data.source,
      data.version,
      data.value,
      data.unit,
      data.region || null,
      data.year || null,
      data.description || null,
      data.isCustom ? 1 : 0
    );

    return { id: result.lastInsertRowid, ...data };
  }

  // Calculation operations
  calculateEmissions(data: any) {
    if (!this.db) return null;

    const { activityDataId, emissionFactorId, scope, methodology } = data;

    // Get activity data
    const activityData = this.db.prepare('SELECT * FROM activity_data WHERE id = ?').get(activityDataId) as ActivityData;
    
    // Get emission factor
    const emissionFactor = this.db.prepare('SELECT * FROM emission_factors WHERE id = ?').get(emissionFactorId) as EmissionFactor;

    if (!activityData || !emissionFactor) {
      throw new Error('Activity data or emission factor not found');
    }

    // Simple calculation: activity value * emission factor value
    const result = activityData.value * emissionFactor.value;

    // Calculate uncertainty (simplified - 10% default)
    const uncertainty = 0.1;

    // Store calculation
    const stmt = this.db.prepare(`
      INSERT INTO calculations 
      (activityDataId, emissionFactorId, scope, methodology, result, unit, uncertainty, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const metadata = JSON.stringify({
      activityValue: activityData.value,
      activityUnit: activityData.unit,
      emissionFactorValue: emissionFactor.value,
      emissionFactorUnit: emissionFactor.unit
    });

    const calcResult = stmt.run(
      activityDataId,
      emissionFactorId,
      scope,
      methodology,
      result,
      'kg CO2e',
      uncertainty,
      metadata
    );

    return {
      id: calcResult.lastInsertRowid,
      activityDataId,
      emissionFactorId,
      scope,
      methodology,
      result,
      unit: 'kg CO2e',
      uncertainty,
      metadata
    };
  }

  listCalculations(filters?: any) {
    if (!this.db) return [];

    let query = `
      SELECT 
        c.*,
        a.organizationUnit,
        a.timePeriod,
        a.emissionSource,
        e.name as emissionFactorName
      FROM calculations c
      JOIN activity_data a ON c.activityDataId = a.id
      JOIN emission_factors e ON c.emissionFactorId = e.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.scope) {
      query += ' AND c.scope = ?';
      params.push(filters.scope);
    }

    if (filters?.timePeriod) {
      query += ' AND a.timePeriod = ?';
      params.push(filters.timePeriod);
    }

    query += ' ORDER BY c.createdAt DESC';

    const stmt = this.db.prepare(query);
    return stmt.all(...params);
  }

  // Phase 2.1: Scope 3 Categories CRUD
  listScope3Categories() {
    if (!this.db) return [];
    const stmt = this.db.prepare('SELECT * FROM scope3_categories ORDER BY categoryNumber');
    return stmt.all();
  }

  updateScope3Category(id: number, data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      UPDATE scope3_categories 
      SET isEnabled = ?, guidanceNotes = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(data.isEnabled ? 1 : 0, data.guidanceNotes || null, id);
    return this.db.prepare('SELECT * FROM scope3_categories WHERE id = ?').get(id);
  }

  // Phase 2.1: Supplier Data CRUD
  createSupplierData(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO supplier_data 
      (supplierName, supplierCategory, contactInfo, emissionsData, dataQuality, reportingYear, verificationStatus, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.supplierName,
      data.supplierCategory,
      data.contactInfo || null,
      data.emissionsData || null,
      data.dataQuality || 0,
      data.reportingYear,
      data.verificationStatus || 'unverified',
      data.metadata || null
    );
    return { id: result.lastInsertRowid, ...data };
  }

  listSupplierData(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM supplier_data WHERE 1=1';
    const params: any[] = [];
    if (filters?.supplierCategory) {
      query += ' AND supplierCategory = ?';
      params.push(filters.supplierCategory);
    }
    query += ' ORDER BY createdAt DESC';
    const stmt = this.db.prepare(query);
    return stmt.all(...params);
  }

  updateSupplierData(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    });
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    const stmt = this.db.prepare(`UPDATE supplier_data SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM supplier_data WHERE id = ?').get(id);
  }

  deleteSupplierData(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM supplier_data WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // Phase 2.2: Integrations CRUD
  createIntegration(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO integrations (name, type, status, connectionString, configuration)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.type,
      data.status || 'inactive',
      data.connectionString || null,
      data.configuration || null
    );
    return { id: result.lastInsertRowid, ...data };
  }

  listIntegrations() {
    if (!this.db) return [];
    const stmt = this.db.prepare('SELECT * FROM integrations ORDER BY createdAt DESC');
    return stmt.all();
  }

  updateIntegration(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    });
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    const stmt = this.db.prepare(`UPDATE integrations SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM integrations WHERE id = ?').get(id);
  }

  deleteIntegration(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM integrations WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // Phase 2.3: Scenarios CRUD
  createScenario(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO scenarios (name, description, baselineYear, targetYear, parameters, results)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.description || null,
      data.baselineYear,
      data.targetYear,
      data.parameters || null,
      data.results || null
    );
    return { id: result.lastInsertRowid, ...data };
  }

  listScenarios() {
    if (!this.db) return [];
    const stmt = this.db.prepare('SELECT * FROM scenarios ORDER BY createdAt DESC');
    return stmt.all();
  }

  updateScenario(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    });
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    const stmt = this.db.prepare(`UPDATE scenarios SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM scenarios WHERE id = ?').get(id);
  }

  deleteScenario(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM scenarios WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // Phase 2.4: Compliance Reports CRUD
  createComplianceReport(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO compliance_reports (reportType, reportingYear, status, data, verificationStatus)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.reportType,
      data.reportingYear,
      data.status || 'draft',
      data.data || null,
      data.verificationStatus || null
    );
    return { id: result.lastInsertRowid, ...data };
  }

  listComplianceReports(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM compliance_reports WHERE 1=1';
    const params: any[] = [];
    if (filters?.reportType) {
      query += ' AND reportType = ?';
      params.push(filters.reportType);
    }
    query += ' ORDER BY createdAt DESC';
    const stmt = this.db.prepare(query);
    return stmt.all(...params);
  }

  updateComplianceReport(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    });
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    const stmt = this.db.prepare(`UPDATE compliance_reports SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM compliance_reports WHERE id = ?').get(id);
  }

  deleteComplianceReport(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM compliance_reports WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // Phase 2.5: User Roles CRUD
  createUserRole(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO user_roles (roleName, permissions, description)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(
      data.roleName,
      data.permissions,
      data.description || null
    );
    return { id: result.lastInsertRowid, ...data };
  }

  listUserRoles() {
    if (!this.db) return [];
    const stmt = this.db.prepare('SELECT * FROM user_roles ORDER BY roleName');
    return stmt.all();
  }

  updateUserRole(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push((data as any)[key]);
      }
    });
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    const stmt = this.db.prepare(`UPDATE user_roles SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM user_roles WHERE id = ?').get(id);
  }

  deleteUserRole(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM user_roles WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // Phase 2.5: Users CRUD
  createUser(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO users (username, email, roleId, isActive)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.username,
      data.email,
      data.roleId,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1
    );
    return { id: result.lastInsertRowid, ...data };
  }

  listUsers() {
    if (!this.db) return [];
    const stmt = this.db.prepare(`
      SELECT u.*, r.roleName
      FROM users u
      JOIN user_roles r ON u.roleId = r.id
      ORDER BY u.username
    `);
    return stmt.all();
  }

  updateUser(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        if (key === 'isActive') {
          fields.push(`${key} = ?`);
          values.push(data[key] ? 1 : 0);
        } else {
          fields.push(`${key} = ?`);
          values.push((data as any)[key]);
        }
      }
    });
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    const stmt = this.db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  }

  deleteUser(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM users WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // ========================================
  // Phase 3.1: AI/ML Implementation
  // ========================================

  detectAnomalies(dataType: string, threshold = 0.7) {
    if (!this.db) return [];
    
    // Simple anomaly detection based on statistical outliers
    // In a production system, this would use actual ML models
    let query = '';
    if (dataType === 'activity_data') {
      query = `
        SELECT id, value, unit, organizationUnit, timePeriod
        FROM activity_data
        WHERE value > (SELECT AVG(value) + (2 * (SELECT AVG(ABS(value - (SELECT AVG(value) FROM activity_data))) FROM activity_data)) FROM activity_data)
           OR value < (SELECT AVG(value) - (2 * (SELECT AVG(ABS(value - (SELECT AVG(value) FROM activity_data))) FROM activity_data)) FROM activity_data)
        ORDER BY value DESC
        LIMIT 10
      `;
      const results = this.db.prepare(query).all();
      return results.map((row: any) => {
        const avgValue = this.db!.prepare('SELECT AVG(value) as avg FROM activity_data').get() as { avg: number };
        const score = Math.abs(row.value - avgValue.avg) / avgValue.avg;
        
        // Check if anomaly already exists
        const existingAnomaly = this.db!.prepare(
          'SELECT id FROM anomaly_detections WHERE dataType = ? AND dataId = ? AND status = "pending"'
        ).get(dataType, row.id);
        
        if (!existingAnomaly && score >= threshold) {
          const insertStmt = this.db!.prepare(`
            INSERT INTO anomaly_detections (dataType, dataId, anomalyScore, anomalyType, recommendation, status)
            VALUES (?, ?, ?, ?, ?, ?)
          `);
          insertStmt.run(dataType, row.id, score, 'statistical_outlier', 
            'Review this data point as it significantly deviates from the average', 'pending');
        }
      });
    }
    
    return this.listAnomalies({ dataType });
  }

  listAnomalies(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM anomaly_detections WHERE 1=1';
    const params: any[] = [];
    
    if (filters.dataType) {
      query += ' AND dataType = ?';
      params.push(filters.dataType);
    }
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    
    query += ' ORDER BY anomalyScore DESC';
    return this.db.prepare(query).all(...params);
  }

  resolveAnomaly(id: number, resolution: string) {
    if (!this.db) return false;
    const stmt = this.db.prepare(`
      UPDATE anomaly_detections 
      SET status = 'resolved', resolvedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    stmt.run(id);
    return true;
  }

  createPredictiveModel(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO predictive_models (modelType, targetField, trainingData, modelParameters)
      VALUES (?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.modelType,
      data.targetField,
      data.trainingData || null,
      data.modelParameters || null
    );
    return this.db.prepare('SELECT * FROM predictive_models WHERE id = ?').get(result.lastInsertRowid);
  }

  listPredictiveModels() {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM predictive_models ORDER BY lastTrained DESC').all();
  }

  trainModel(id: number) {
    if (!this.db) return { success: false, accuracy: 0 };
    
    // Simulate model training - in production, this would call actual ML training
    const accuracy = 0.75 + Math.random() * 0.2; // Simulate 75-95% accuracy
    
    const stmt = this.db.prepare(`
      UPDATE predictive_models 
      SET accuracy = ?, lastTrained = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(accuracy, id);
    
    return { success: true, accuracy };
  }

  predictMissingData(dataType: string, context: any) {
    if (!this.db) return [];
    
    // Simple prediction based on historical averages
    // In production, this would use trained ML models
    if (dataType === 'activity_data') {
      const avgValue = this.db.prepare(`
        SELECT AVG(value) as avg, unit
        FROM activity_data
        WHERE activityType = ?
        GROUP BY unit
      `).get(context.activityType);
      
      if (avgValue) {
        const suggestion = {
          sourceType: dataType,
          sourceId: context.sourceId || 0,
          suggestionType: 'missing_value',
          suggestedValue: (avgValue as any).avg.toFixed(2),
          confidence: 0.65,
          reasoning: 'Based on historical average for similar activity type'
        };
        
        const stmt = this.db.prepare(`
          INSERT INTO ml_suggestions (sourceType, sourceId, suggestionType, suggestedValue, confidence, reasoning, status)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `);
        stmt.run(
          suggestion.sourceType,
          suggestion.sourceId,
          suggestion.suggestionType,
          suggestion.suggestedValue,
          suggestion.confidence,
          suggestion.reasoning,
          'pending'
        );
      }
    }
    
    return this.listMLSuggestions({ sourceType: dataType });
  }

  listMLSuggestions(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM ml_suggestions WHERE 1=1';
    const params: any[] = [];
    
    if (filters.sourceType) {
      query += ' AND sourceType = ?';
      params.push(filters.sourceType);
    }
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    
    query += ' ORDER BY confidence DESC';
    return this.db.prepare(query).all(...params);
  }

  acceptSuggestion(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('UPDATE ml_suggestions SET status = ? WHERE id = ?');
    stmt.run('accepted', id);
    return true;
  }

  rejectSuggestion(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('UPDATE ml_suggestions SET status = ? WHERE id = ?');
    stmt.run('rejected', id);
    return true;
  }

  // ========================================
  // Phase 3.2: Advanced Target Management
  // ========================================

  createCarbonTarget(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO carbon_targets (
        targetName, targetType, baselineYear, baselineEmissions, targetYear, 
        targetReduction, scope, status, sbtiValidated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.targetName,
      data.targetType,
      data.baselineYear,
      data.baselineEmissions,
      data.targetYear,
      data.targetReduction,
      data.scope,
      data.status || 'draft',
      data.sbtiValidated ? 1 : 0
    );
    return this.db.prepare('SELECT * FROM carbon_targets WHERE id = ?').get(result.lastInsertRowid);
  }

  listCarbonTargets() {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM carbon_targets ORDER BY targetYear DESC').all();
  }

  updateCarbonTarget(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'sbtiValidated') {
          values.push(data[key] ? 1 : 0);
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE carbon_targets SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM carbon_targets WHERE id = ?').get(id);
  }

  deleteCarbonTarget(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM carbon_targets WHERE id = ?');
    stmt.run(id);
    return true;
  }

  validateSBTi(id: number) {
    if (!this.db) return { valid: false, feedback: 'Target not found' };
    
    const target: any = this.db.prepare('SELECT * FROM carbon_targets WHERE id = ?').get(id);
    if (!target) return { valid: false, feedback: 'Target not found' };
    
    // Simple SBTi validation logic
    const timeframe = target.targetYear - target.baselineYear;
    const valid = target.targetReduction >= 50 && timeframe >= 5 && timeframe <= 15;
    
    if (valid) {
      this.db.prepare('UPDATE carbon_targets SET sbtiValidated = 1 WHERE id = ?').run(id);
      return { valid: true, feedback: 'Target meets SBTi criteria' };
    }
    
    return { 
      valid: false, 
      feedback: 'Target should aim for at least 50% reduction within 5-15 years' 
    };
  }

  createReductionProject(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO reduction_projects (
        projectName, description, projectType, startDate, endDate, status,
        targetEmissionReduction, actualEmissionReduction, estimatedCost, actualCost, roi, milestones
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.projectName,
      data.description || null,
      data.projectType,
      data.startDate,
      data.endDate,
      data.status || 'planned',
      data.targetEmissionReduction,
      data.actualEmissionReduction || null,
      data.estimatedCost,
      data.actualCost || null,
      data.roi || null,
      data.milestones ? JSON.stringify(data.milestones) : null
    );
    return this.db.prepare('SELECT * FROM reduction_projects WHERE id = ?').get(result.lastInsertRowid);
  }

  listReductionProjects(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM reduction_projects WHERE 1=1';
    const params: any[] = [];
    
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    
    query += ' ORDER BY startDate DESC';
    return this.db.prepare(query).all(...params);
  }

  updateReductionProject(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'milestones' && typeof data[key] === 'object') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE reduction_projects SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM reduction_projects WHERE id = ?').get(id);
  }

  deleteReductionProject(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM reduction_projects WHERE id = ?');
    stmt.run(id);
    return true;
  }

  calculateProjectROI(id: number) {
    if (!this.db) return 0;
    
    const project: any = this.db.prepare('SELECT * FROM reduction_projects WHERE id = ?').get(id);
    if (!project) return 0;
    
    const cost = project.actualCost || project.estimatedCost;
    const reduction = project.actualEmissionReduction || project.targetEmissionReduction;
    
    // Simple ROI calculation: (emission reduction * carbon price - cost) / cost
    const carbonPrice = 50; // USD per ton CO2e
    const roi = ((reduction * carbonPrice) - cost) / cost * 100;
    
    this.db.prepare('UPDATE reduction_projects SET roi = ? WHERE id = ?').run(roi, id);
    return roi;
  }

  createCarbonPricingScenario(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO carbon_pricing_scenarios (scenarioName, carbonPrice, currency, priceGrowthRate, applicableScopes)
      VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.scenarioName,
      data.carbonPrice,
      data.currency,
      data.priceGrowthRate,
      data.applicableScopes
    );
    return this.db.prepare('SELECT * FROM carbon_pricing_scenarios WHERE id = ?').get(result.lastInsertRowid);
  }

  listCarbonPricingScenarios() {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM carbon_pricing_scenarios ORDER BY carbonPrice DESC').all();
  }

  updateCarbonPricingScenario(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE carbon_pricing_scenarios SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM carbon_pricing_scenarios WHERE id = ?').get(id);
  }

  deleteCarbonPricingScenario(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM carbon_pricing_scenarios WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // ========================================
  // Phase 3.3: Supply Chain Features
  // ========================================

  createSupplierEngagement(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO supplier_engagements (
        supplierId, engagementType, status, requestedDate, dueDate, completedDate, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.supplierId,
      data.engagementType,
      data.status || 'initiated',
      data.requestedDate,
      data.dueDate,
      data.completedDate || null,
      data.notes || null
    );
    return this.db.prepare('SELECT * FROM supplier_engagements WHERE id = ?').get(result.lastInsertRowid);
  }

  listSupplierEngagements(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM supplier_engagements WHERE 1=1';
    const params: any[] = [];
    
    if (filters.supplierId) {
      query += ' AND supplierId = ?';
      params.push(filters.supplierId);
    }
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    
    query += ' ORDER BY requestedDate DESC';
    return this.db.prepare(query).all(...params);
  }

  updateSupplierEngagement(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE supplier_engagements SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM supplier_engagements WHERE id = ?').get(id);
  }

  deleteSupplierEngagement(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM supplier_engagements WHERE id = ?');
    stmt.run(id);
    return true;
  }

  createSupplyChainMap(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO supply_chain_maps (
        tier, supplierId, parentSupplierId, productCategory, spendAmount,
        emissionsContribution, geographicLocation, riskLevel
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.tier,
      data.supplierId,
      data.parentSupplierId || null,
      data.productCategory,
      data.spendAmount,
      data.emissionsContribution,
      data.geographicLocation || null,
      data.riskLevel || 'medium'
    );
    return this.db.prepare('SELECT * FROM supply_chain_maps WHERE id = ?').get(result.lastInsertRowid);
  }

  listSupplyChainMaps(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM supply_chain_maps WHERE 1=1';
    const params: any[] = [];
    
    if (filters.tier) {
      query += ' AND tier = ?';
      params.push(filters.tier);
    }
    
    query += ' ORDER BY tier, spendAmount DESC';
    return this.db.prepare(query).all(...params);
  }

  updateSupplyChainMap(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        values.push(data[key]);
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE supply_chain_maps SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM supply_chain_maps WHERE id = ?').get(id);
  }

  deleteSupplyChainMap(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM supply_chain_maps WHERE id = ?');
    stmt.run(id);
    return true;
  }

  createSupplierAssessment(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO supplier_assessments (
        supplierId, assessmentDate, overallScore, emissionsScore, dataQualityScore,
        engagementScore, certifications, improvementAreas, nextReviewDate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.supplierId,
      data.assessmentDate,
      data.overallScore,
      data.emissionsScore,
      data.dataQualityScore,
      data.engagementScore,
      data.certifications ? JSON.stringify(data.certifications) : null,
      data.improvementAreas || null,
      data.nextReviewDate
    );
    return this.db.prepare('SELECT * FROM supplier_assessments WHERE id = ?').get(result.lastInsertRowid);
  }

  listSupplierAssessments(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM supplier_assessments WHERE 1=1';
    const params: any[] = [];
    
    if (filters.supplierId) {
      query += ' AND supplierId = ?';
      params.push(filters.supplierId);
    }
    
    query += ' ORDER BY assessmentDate DESC';
    return this.db.prepare(query).all(...params);
  }

  updateSupplierAssessment(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'certifications' && typeof data[key] === 'object') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE supplier_assessments SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM supplier_assessments WHERE id = ?').get(id);
  }

  deleteSupplierAssessment(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM supplier_assessments WHERE id = ?');
    stmt.run(id);
    return true;
  }

  generateSupplierReport(supplierId: number) {
    if (!this.db) return '';
    
    const supplier: any = this.db.prepare('SELECT * FROM supplier_data WHERE id = ?').get(supplierId);
    if (!supplier) return '';
    
    const assessments = this.listSupplierAssessments({ supplierId });
    const engagements = this.listSupplierEngagements({ supplierId });
    
    const report = {
      supplier: supplier,
      assessments: assessments,
      engagements: engagements,
      generated: new Date().toISOString()
    };
    
    return JSON.stringify(report, null, 2);
  }

  // ========================================
  // Phase 3.4: Multi-Entity Support
  // ========================================

  createEntity(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO entities (
        entityName, entityType, parentEntityId, country, currency, language, timezone, isActive, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.entityName,
      data.entityType,
      data.parentEntityId || null,
      data.country,
      data.currency,
      data.language,
      data.timezone,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1,
      data.metadata || null
    );
    return this.db.prepare('SELECT * FROM entities WHERE id = ?').get(result.lastInsertRowid);
  }

  listEntities(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM entities WHERE 1=1';
    const params: any[] = [];
    
    if (filters.entityType) {
      query += ' AND entityType = ?';
      params.push(filters.entityType);
    }
    if (filters.isActive !== undefined) {
      query += ' AND isActive = ?';
      params.push(filters.isActive ? 1 : 0);
    }
    
    query += ' ORDER BY entityName';
    return this.db.prepare(query).all(...params);
  }

  updateEntity(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'isActive') {
          values.push(data[key] ? 1 : 0);
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE entities SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM entities WHERE id = ?').get(id);
  }

  deleteEntity(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM entities WHERE id = ?');
    stmt.run(id);
    return true;
  }

  getEntityHierarchy() {
    if (!this.db) return [];
    
    const entities = this.db.prepare('SELECT * FROM entities ORDER BY entityName').all();
    
    // Build hierarchy tree
    const buildTree = (parentId: number | null): any[] => {
      return (entities as any[]).filter(e => e.parentEntityId === parentId).map(entity => ({
        ...entity,
        children: buildTree(entity.id)
      }));
    };
    
    return buildTree(null);
  }

  createRegionalCompliance(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO regional_compliance (
        region, regulationType, regulationName, description, applicableScopes,
        reportingFrequency, nextDeadline, isActive, requirements
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.region,
      data.regulationType,
      data.regulationName,
      data.description,
      data.applicableScopes,
      data.reportingFrequency,
      data.nextDeadline,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1,
      data.requirements ? JSON.stringify(data.requirements) : null
    );
    return this.db.prepare('SELECT * FROM regional_compliance WHERE id = ?').get(result.lastInsertRowid);
  }

  listRegionalCompliance(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM regional_compliance WHERE 1=1';
    const params: any[] = [];
    
    if (filters.region) {
      query += ' AND region = ?';
      params.push(filters.region);
    }
    if (filters.isActive !== undefined) {
      query += ' AND isActive = ?';
      params.push(filters.isActive ? 1 : 0);
    }
    
    query += ' ORDER BY nextDeadline';
    return this.db.prepare(query).all(...params);
  }

  updateRegionalCompliance(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'isActive') {
          values.push(data[key] ? 1 : 0);
        } else if (key === 'requirements' && typeof data[key] === 'object') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE regional_compliance SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM regional_compliance WHERE id = ?').get(id);
  }

  deleteRegionalCompliance(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM regional_compliance WHERE id = ?');
    stmt.run(id);
    return true;
  }

  createDataGovernancePolicy(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO data_governance_policies (
        policyName, policyType, description, entityId, rules, isActive
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.policyName,
      data.policyType,
      data.description,
      data.entityId || null,
      data.rules ? JSON.stringify(data.rules) : null,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1
    );
    return this.db.prepare('SELECT * FROM data_governance_policies WHERE id = ?').get(result.lastInsertRowid);
  }

  listDataGovernancePolicies(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM data_governance_policies WHERE 1=1';
    const params: any[] = [];
    
    if (filters.policyType) {
      query += ' AND policyType = ?';
      params.push(filters.policyType);
    }
    if (filters.isActive !== undefined) {
      query += ' AND isActive = ?';
      params.push(filters.isActive ? 1 : 0);
    }
    
    query += ' ORDER BY policyName';
    return this.db.prepare(query).all(...params);
  }

  updateDataGovernancePolicy(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'isActive') {
          values.push(data[key] ? 1 : 0);
        } else if (key === 'rules' && typeof data[key] === 'object') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE data_governance_policies SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM data_governance_policies WHERE id = ?').get(id);
  }

  deleteDataGovernancePolicy(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM data_governance_policies WHERE id = ?');
    stmt.run(id);
    return true;
  }

  // ========================================
  // Phase 3.5: Integration Ecosystem
  // ========================================

  listIntegrationPlugins(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM integration_plugins WHERE 1=1';
    const params: any[] = [];
    
    if (filters.pluginType) {
      query += ' AND pluginType = ?';
      params.push(filters.pluginType);
    }
    if (filters.isInstalled !== undefined) {
      query += ' AND isInstalled = ?';
      params.push(filters.isInstalled ? 1 : 0);
    }
    
    query += ' ORDER BY pluginName';
    return this.db.prepare(query).all(...params);
  }

  installPlugin(pluginId: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare(`
      UPDATE integration_plugins 
      SET isInstalled = 1, installDate = CURRENT_TIMESTAMP, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(pluginId);
    return true;
  }

  uninstallPlugin(pluginId: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare(`
      UPDATE integration_plugins 
      SET isInstalled = 0, isActive = 0, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(pluginId);
    return true;
  }

  togglePlugin(pluginId: number, isActive: boolean) {
    if (!this.db) return false;
    const stmt = this.db.prepare('UPDATE integration_plugins SET isActive = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?');
    stmt.run(isActive ? 1 : 0, pluginId);
    return true;
  }

  createCustomCalculation(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO custom_calculations (
        calculationName, description, formula, variables, outputUnit, category, isActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.calculationName,
      data.description,
      data.formula,
      data.variables ? JSON.stringify(data.variables) : null,
      data.outputUnit,
      data.category,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1
    );
    return this.db.prepare('SELECT * FROM custom_calculations WHERE id = ?').get(result.lastInsertRowid);
  }

  listCustomCalculations(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM custom_calculations WHERE 1=1';
    const params: any[] = [];
    
    if (filters.category) {
      query += ' AND category = ?';
      params.push(filters.category);
    }
    if (filters.isActive !== undefined) {
      query += ' AND isActive = ?';
      params.push(filters.isActive ? 1 : 0);
    }
    
    query += ' ORDER BY calculationName';
    return this.db.prepare(query).all(...params);
  }

  updateCustomCalculation(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'isActive') {
          values.push(data[key] ? 1 : 0);
        } else if (key === 'variables' && typeof data[key] === 'object') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE custom_calculations SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM custom_calculations WHERE id = ?').get(id);
  }

  deleteCustomCalculation(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM custom_calculations WHERE id = ?');
    stmt.run(id);
    return true;
  }

  executeCustomCalculation(id: number, inputs: any) {
    if (!this.db) return 0;
    
    const calc: any = this.db.prepare('SELECT * FROM custom_calculations WHERE id = ?').get(id);
    if (!calc || !calc.isActive) return 0;
    
    try {
      // Simple formula evaluation - in production, use a safe evaluation library
      let formula = calc.formula;
      const variables = calc.variables ? JSON.parse(calc.variables) : {};
      
      Object.keys(inputs).forEach(key => {
        formula = formula.replace(new RegExp(`\\b${key}\\b`, 'g'), inputs[key]);
      });
      
      // For safety, only allow basic arithmetic operations
      if (/^[\d\s+\-*/().]+$/.test(formula)) {
        return eval(formula);
      }
    } catch (error) {
      console.error('Error executing custom calculation:', error);
    }
    
    return 0;
  }

  createAutomationWorkflow(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO automation_workflows (
        workflowName, description, triggerType, triggerConfig, actions, isActive
      ) VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.workflowName,
      data.description,
      data.triggerType,
      data.triggerConfig ? JSON.stringify(data.triggerConfig) : null,
      data.actions ? JSON.stringify(data.actions) : null,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : 1
    );
    return this.db.prepare('SELECT * FROM automation_workflows WHERE id = ?').get(result.lastInsertRowid);
  }

  listAutomationWorkflows(filters: any = {}) {
    if (!this.db) return [];
    let query = 'SELECT * FROM automation_workflows WHERE 1=1';
    const params: any[] = [];
    
    if (filters.triggerType) {
      query += ' AND triggerType = ?';
      params.push(filters.triggerType);
    }
    if (filters.isActive !== undefined) {
      query += ' AND isActive = ?';
      params.push(filters.isActive ? 1 : 0);
    }
    
    query += ' ORDER BY workflowName';
    return this.db.prepare(query).all(...params);
  }

  updateAutomationWorkflow(id: number, data: any) {
    if (!this.db) return null;
    const fields: string[] = [];
    const values: any[] = [];
    
    Object.keys(data).forEach(key => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        fields.push(`${key} = ?`);
        if (key === 'isActive') {
          values.push(data[key] ? 1 : 0);
        } else if ((key === 'triggerConfig' || key === 'actions') && typeof data[key] === 'object') {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });
    
    fields.push('updatedAt = CURRENT_TIMESTAMP');
    values.push(id);
    
    const stmt = this.db.prepare(`UPDATE automation_workflows SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);
    return this.db.prepare('SELECT * FROM automation_workflows WHERE id = ?').get(id);
  }

  deleteAutomationWorkflow(id: number) {
    if (!this.db) return false;
    const stmt = this.db.prepare('DELETE FROM automation_workflows WHERE id = ?');
    stmt.run(id);
    return true;
  }

  executeAutomationWorkflow(id: number) {
    if (!this.db) return { success: false, output: null };
    
    const workflow: any = this.db.prepare('SELECT * FROM automation_workflows WHERE id = ?').get(id);
    if (!workflow || !workflow.isActive) {
      return { success: false, output: 'Workflow not found or not active' };
    }
    
    // Update last run date
    this.db.prepare('UPDATE automation_workflows SET lastRunDate = CURRENT_TIMESTAMP WHERE id = ?').run(id);
    
    // In production, this would execute the actual workflow actions
    // For now, return a success response
    return { success: true, output: 'Workflow executed successfully' };
  }
}
