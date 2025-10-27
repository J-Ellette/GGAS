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

    // Create indexes for better performance
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_activity_data_org_unit ON activity_data(organizationUnit);
      CREATE INDEX IF NOT EXISTS idx_activity_data_time_period ON activity_data(timePeriod);
      CREATE INDEX IF NOT EXISTS idx_emission_factors_category ON emission_factors(category);
      CREATE INDEX IF NOT EXISTS idx_calculations_scope ON calculations(scope);
    `);
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
}
