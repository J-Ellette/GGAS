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
}
