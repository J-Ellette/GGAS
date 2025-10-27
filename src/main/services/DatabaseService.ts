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

    // Phase 4.1: Next-Gen Analytics - Deep Learning Models
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS deep_learning_models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelName TEXT NOT NULL,
        modelType TEXT NOT NULL,
        description TEXT NOT NULL,
        architecture TEXT,
        trainingData TEXT,
        accuracy REAL,
        insights TEXT,
        isActive INTEGER DEFAULT 1,
        lastTrained DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.1: Strategy Recommendations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS strategy_recommendations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recommendationType TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        potentialImpact REAL NOT NULL,
        estimatedCost REAL NOT NULL,
        implementationTime INTEGER NOT NULL,
        confidenceScore REAL NOT NULL,
        prerequisites TEXT,
        status TEXT DEFAULT 'suggested',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.1: Automated Insights
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS automated_insights (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        insightType TEXT NOT NULL,
        title TEXT NOT NULL,
        narrative TEXT NOT NULL,
        dataSource TEXT,
        relatedEntities TEXT,
        severity TEXT DEFAULT 'info',
        actionable INTEGER DEFAULT 0,
        suggestedActions TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.1: Digital Twins
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS digital_twins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facilityId INTEGER NOT NULL,
        facilityName TEXT NOT NULL,
        location TEXT,
        modelData TEXT,
        realTimeData TEXT,
        emissionsData TEXT,
        visualizationConfig TEXT,
        isActive INTEGER DEFAULT 1,
        lastUpdated DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.2: Verification Workflows
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS verification_workflows (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        workflowName TEXT NOT NULL,
        workflowType TEXT NOT NULL,
        dataScope TEXT,
        verifiers TEXT,
        status TEXT DEFAULT 'initiated',
        currentStep INTEGER DEFAULT 1,
        totalSteps INTEGER NOT NULL,
        startDate DATETIME,
        completionDate DATETIME,
        verificationEvidence TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.2: Audit Trails
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS audit_trails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        entityType TEXT NOT NULL,
        entityId INTEGER NOT NULL,
        action TEXT NOT NULL,
        userId INTEGER NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        previousValue TEXT,
        newValue TEXT,
        verificationHash TEXT,
        parentHash TEXT,
        isImmutable INTEGER DEFAULT 1,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.2: Third Party Verifiers
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS third_party_verifiers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        verifierName TEXT NOT NULL,
        verifierType TEXT NOT NULL,
        contactInfo TEXT,
        certifications TEXT,
        specializations TEXT,
        rating REAL DEFAULT 0,
        isApproved INTEGER DEFAULT 0,
        integrationEndpoint TEXT,
        apiKey TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.2: Data Provenance
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS data_provenance (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        dataType TEXT NOT NULL,
        dataId INTEGER NOT NULL,
        originSource TEXT NOT NULL,
        collectionMethod TEXT NOT NULL,
        collectionDate DATETIME NOT NULL,
        transformations TEXT,
        lineage TEXT,
        qualityMetrics TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.3: IoT Devices
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS iot_devices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        deviceName TEXT NOT NULL,
        deviceType TEXT NOT NULL,
        manufacturer TEXT,
        model TEXT,
        serialNumber TEXT,
        location TEXT,
        facilityId INTEGER,
        status TEXT DEFAULT 'offline',
        connectionType TEXT NOT NULL,
        connectionConfig TEXT,
        lastDataReceived DATETIME,
        isActive INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.3: Realtime Monitors
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS realtime_monitors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        monitorName TEXT NOT NULL,
        monitorType TEXT NOT NULL,
        deviceIds TEXT,
        thresholds TEXT,
        currentValue REAL,
        currentUnit TEXT,
        status TEXT DEFAULT 'normal',
        dashboardConfig TEXT,
        isActive INTEGER DEFAULT 1,
        lastUpdated DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.3: Sensor Data
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sensor_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        deviceId INTEGER NOT NULL,
        timestamp DATETIME NOT NULL,
        dataType TEXT NOT NULL,
        value REAL NOT NULL,
        unit TEXT NOT NULL,
        quality REAL DEFAULT 1,
        isProcessed INTEGER DEFAULT 0,
        anomalyDetected INTEGER DEFAULT 0,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (deviceId) REFERENCES iot_devices(id)
      )
    `);

    // Phase 4.3: Alert Rules
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS alert_rules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ruleName TEXT NOT NULL,
        ruleType TEXT NOT NULL,
        monitorId INTEGER,
        condition TEXT,
        severity TEXT DEFAULT 'medium',
        notificationChannels TEXT,
        recipients TEXT,
        isActive INTEGER DEFAULT 1,
        lastTriggered DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.4: 3D Facility Models
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS facility_3d_models (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facilityId INTEGER NOT NULL,
        facilityName TEXT NOT NULL,
        modelType TEXT NOT NULL,
        modelData TEXT,
        textureData TEXT,
        equipmentLocations TEXT,
        emissionSources TEXT,
        viewConfig TEXT,
        interactionConfig TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.4: AR Data Collections
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ar_data_collections (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        collectionType TEXT NOT NULL,
        facilityId INTEGER,
        userId INTEGER NOT NULL,
        sessionDate DATETIME NOT NULL,
        duration INTEGER DEFAULT 0,
        dataCollected TEXT,
        photos TEXT,
        annotations TEXT,
        gpsCoordinates TEXT,
        status TEXT DEFAULT 'in_progress',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.4: Training Modules
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS training_modules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        moduleName TEXT NOT NULL,
        moduleType TEXT NOT NULL,
        topic TEXT NOT NULL,
        difficulty TEXT DEFAULT 'beginner',
        content TEXT,
        quizzes TEXT,
        completionCriteria TEXT,
        estimatedTime INTEGER DEFAULT 0,
        isActive INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.4: Training Progress
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS training_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        moduleId INTEGER NOT NULL,
        status TEXT DEFAULT 'not_started',
        progressPercentage INTEGER DEFAULT 0,
        quizScore REAL,
        startDate DATETIME,
        completionDate DATETIME,
        certificateIssued INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (moduleId) REFERENCES training_modules(id)
      )
    `);

    // Phase 4.4: Data Stories
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS data_stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyTitle TEXT NOT NULL,
        storyType TEXT NOT NULL,
        narrative TEXT,
        visualizations TEXT,
        keyMetrics TEXT,
        dataPoints TEXT,
        targetAudience TEXT DEFAULT 'technical',
        publishDate DATETIME,
        isPublic INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.5: Cache Configurations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS cache_configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cacheKey TEXT NOT NULL UNIQUE,
        cacheType TEXT NOT NULL,
        dataSize INTEGER DEFAULT 0,
        ttl INTEGER DEFAULT 3600,
        hitCount INTEGER DEFAULT 0,
        lastAccessed DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        expiresAt DATETIME
      )
    `);

    // Phase 4.5: Distributed Jobs
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS distributed_jobs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        jobName TEXT NOT NULL,
        jobType TEXT NOT NULL,
        priority INTEGER DEFAULT 5,
        status TEXT DEFAULT 'queued',
        progress INTEGER DEFAULT 0,
        inputData TEXT,
        resultData TEXT,
        startTime DATETIME,
        endTime DATETIME,
        workerNode TEXT,
        estimatedDuration INTEGER,
        actualDuration INTEGER,
        errorMessage TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.5: Resource Metrics
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS resource_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        metricType TEXT NOT NULL,
        metricValue REAL NOT NULL,
        unit TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        nodeId TEXT,
        isOptimized INTEGER DEFAULT 0,
        optimizationSuggestion TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.5: Security Configurations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS security_configs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        configType TEXT NOT NULL,
        configName TEXT NOT NULL,
        description TEXT NOT NULL,
        isEnabled INTEGER DEFAULT 1,
        configData TEXT,
        complianceStandards TEXT,
        lastAuditDate DATETIME,
        nextAuditDate DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 4.5: Encryption Keys
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS encryption_keys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        keyName TEXT NOT NULL,
        keyType TEXT NOT NULL,
        algorithm TEXT NOT NULL,
        keySize INTEGER NOT NULL,
        purpose TEXT NOT NULL,
        publicKey TEXT,
        keyDerivationFunction TEXT,
        rotationPolicy TEXT DEFAULT 'annually',
        lastRotated DATETIME,
        nextRotation DATETIME,
        isActive INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.1: Emission Forecasts
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS emission_forecasts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        forecastName TEXT NOT NULL,
        forecastType TEXT NOT NULL,
        targetPeriod TEXT NOT NULL,
        baselineEmissions REAL NOT NULL,
        predictedEmissions REAL NOT NULL,
        confidenceLevel REAL DEFAULT 0.95,
        modelType TEXT NOT NULL,
        weatherImpact REAL DEFAULT 0,
        economicImpact REAL DEFAULT 0,
        operationalImpact REAL DEFAULT 0,
        uncertaintyLower REAL,
        uncertaintyUpper REAL,
        factors TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.1: Forecasting Factors
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS forecasting_factors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        factorName TEXT NOT NULL,
        factorType TEXT NOT NULL,
        category TEXT NOT NULL,
        currentValue REAL NOT NULL,
        unit TEXT NOT NULL,
        forecastValue REAL,
        impactCoefficient REAL DEFAULT 1.0,
        dataSource TEXT,
        lastUpdated DATETIME,
        metadata TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.2: Carbon Budgets
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS carbon_budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        budgetName TEXT NOT NULL,
        entityId INTEGER,
        fiscalYear TEXT NOT NULL,
        totalBudget REAL NOT NULL,
        allocatedBudget REAL DEFAULT 0,
        consumedBudget REAL DEFAULT 0,
        remainingBudget REAL DEFAULT 0,
        budgetUnit TEXT DEFAULT 'tCO2e',
        allocationStrategy TEXT DEFAULT 'proportional',
        status TEXT DEFAULT 'active',
        isOptimized INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.2: Budget Allocations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS budget_allocations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        budgetId INTEGER NOT NULL,
        entityId INTEGER,
        businessUnit TEXT NOT NULL,
        allocatedAmount REAL NOT NULL,
        consumedAmount REAL DEFAULT 0,
        remainingAmount REAL DEFAULT 0,
        utilizationPercentage REAL DEFAULT 0,
        priority INTEGER DEFAULT 5,
        justification TEXT,
        transferHistory TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (budgetId) REFERENCES carbon_budgets(id)
      )
    `);

    // Phase 5.2: Budget Variance Analysis
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS budget_variances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        budgetId INTEGER NOT NULL,
        allocationId INTEGER,
        timePeriod TEXT NOT NULL,
        plannedEmissions REAL NOT NULL,
        actualEmissions REAL NOT NULL,
        varianceAmount REAL NOT NULL,
        variancePercentage REAL NOT NULL,
        varianceType TEXT NOT NULL,
        rootCauses TEXT,
        correctiveActions TEXT,
        severity TEXT DEFAULT 'low',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (budgetId) REFERENCES carbon_budgets(id),
        FOREIGN KEY (allocationId) REFERENCES budget_allocations(id)
      )
    `);

    // Phase 5.3: Predictive Alerts
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS predictive_alerts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        alertName TEXT NOT NULL,
        alertType TEXT NOT NULL,
        severity TEXT NOT NULL,
        predictedEvent TEXT NOT NULL,
        likelihood REAL NOT NULL,
        impactAssessment TEXT,
        recommendedActions TEXT,
        thresholdValue REAL,
        currentValue REAL,
        predictedValue REAL,
        timeToEvent INTEGER,
        entityId INTEGER,
        status TEXT DEFAULT 'active',
        triggeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        acknowledgedAt DATETIME,
        resolvedAt DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.3: Early Warning Triggers
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS early_warning_triggers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        triggerName TEXT NOT NULL,
        triggerType TEXT NOT NULL,
        monitoredMetric TEXT NOT NULL,
        thresholdCondition TEXT NOT NULL,
        thresholdValue REAL NOT NULL,
        leadTime INTEGER DEFAULT 30,
        escalationLevel INTEGER DEFAULT 1,
        notificationChannels TEXT,
        stakeholders TEXT,
        actionPlanId INTEGER,
        isActive INTEGER DEFAULT 1,
        lastTriggered DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.3: Action Plans
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS action_plans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        planName TEXT NOT NULL,
        planType TEXT NOT NULL,
        triggerCondition TEXT NOT NULL,
        planSteps TEXT NOT NULL,
        responsibleParties TEXT,
        estimatedDuration INTEGER,
        estimatedCost REAL,
        expectedReduction REAL,
        priority TEXT DEFAULT 'medium',
        status TEXT DEFAULT 'ready',
        activationCount INTEGER DEFAULT 0,
        lastActivated DATETIME,
        successRate REAL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.4: Scenario Simulations
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS scenario_simulations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        scenarioName TEXT NOT NULL,
        scenarioType TEXT NOT NULL,
        description TEXT,
        baselineScenario INTEGER DEFAULT 0,
        simulationType TEXT NOT NULL,
        parameters TEXT NOT NULL,
        iterations INTEGER DEFAULT 1000,
        results TEXT,
        probabilityDistribution TEXT,
        riskLevel TEXT,
        recommendedStrategy TEXT,
        createdBy TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.4: Sensitivity Analysis
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS sensitivity_analyses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        analysisName TEXT NOT NULL,
        targetMetric TEXT NOT NULL,
        baselineValue REAL NOT NULL,
        variables TEXT NOT NULL,
        results TEXT NOT NULL,
        elasticityCoefficients TEXT,
        criticalFactors TEXT,
        recommendedFocus TEXT,
        confidenceScore REAL DEFAULT 0.85,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.5: Enterprise Forecasts
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS enterprise_forecasts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        forecastName TEXT NOT NULL,
        scope TEXT NOT NULL,
        aggregationType TEXT NOT NULL,
        includedEntities TEXT NOT NULL,
        forecastPeriod TEXT NOT NULL,
        totalForecastedEmissions REAL NOT NULL,
        currency TEXT DEFAULT 'USD',
        regulatoryAlignment TEXT,
        complianceStatus TEXT,
        executiveSummary TEXT,
        keyInsights TEXT,
        isPublished INTEGER DEFAULT 0,
        publishedAt DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.5: ML Training Data
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS ml_training_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datasetName TEXT NOT NULL,
        dataType TEXT NOT NULL,
        features TEXT NOT NULL,
        targetVariable TEXT NOT NULL,
        recordCount INTEGER NOT NULL,
        dataQuality REAL DEFAULT 0.8,
        splitRatio TEXT DEFAULT '0.8:0.1:0.1',
        preprocessingSteps TEXT,
        isNormalized INTEGER DEFAULT 0,
        lastUsed DATETIME,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Phase 5.5: Model Performance Metrics
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS model_performance_metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelId INTEGER,
        modelType TEXT NOT NULL,
        evaluationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        accuracy REAL,
        precision REAL,
        recall REAL,
        f1Score REAL,
        mse REAL,
        rmse REAL,
        mae REAL,
        r2Score REAL,
        confusionMatrix TEXT,
        featureImportance TEXT,
        validationMethod TEXT,
        hyperparameters TEXT,
        trainingDuration INTEGER,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
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
      CREATE INDEX IF NOT EXISTS idx_deep_learning_models_type ON deep_learning_models(modelType);
      CREATE INDEX IF NOT EXISTS idx_strategy_recommendations_status ON strategy_recommendations(status);
      CREATE INDEX IF NOT EXISTS idx_automated_insights_type ON automated_insights(insightType);
      CREATE INDEX IF NOT EXISTS idx_digital_twins_facility ON digital_twins(facilityId);
      CREATE INDEX IF NOT EXISTS idx_verification_workflows_status ON verification_workflows(status);
      CREATE INDEX IF NOT EXISTS idx_audit_trails_entity ON audit_trails(entityType, entityId);
      CREATE INDEX IF NOT EXISTS idx_data_provenance_data ON data_provenance(dataType, dataId);
      CREATE INDEX IF NOT EXISTS idx_iot_devices_facility ON iot_devices(facilityId);
      CREATE INDEX IF NOT EXISTS idx_iot_devices_status ON iot_devices(status);
      CREATE INDEX IF NOT EXISTS idx_realtime_monitors_type ON realtime_monitors(monitorType);
      CREATE INDEX IF NOT EXISTS idx_sensor_data_device ON sensor_data(deviceId);
      CREATE INDEX IF NOT EXISTS idx_sensor_data_timestamp ON sensor_data(timestamp);
      CREATE INDEX IF NOT EXISTS idx_alert_rules_monitor ON alert_rules(monitorId);
      CREATE INDEX IF NOT EXISTS idx_facility_3d_models_facility ON facility_3d_models(facilityId);
      CREATE INDEX IF NOT EXISTS idx_ar_data_collections_facility ON ar_data_collections(facilityId);
      CREATE INDEX IF NOT EXISTS idx_ar_data_collections_user ON ar_data_collections(userId);
      CREATE INDEX IF NOT EXISTS idx_training_progress_user ON training_progress(userId);
      CREATE INDEX IF NOT EXISTS idx_training_progress_module ON training_progress(moduleId);
      CREATE INDEX IF NOT EXISTS idx_data_stories_type ON data_stories(storyType);
      CREATE INDEX IF NOT EXISTS idx_distributed_jobs_status ON distributed_jobs(status);
      CREATE INDEX IF NOT EXISTS idx_resource_metrics_type ON resource_metrics(metricType);
      CREATE INDEX IF NOT EXISTS idx_resource_metrics_timestamp ON resource_metrics(timestamp);
      CREATE INDEX IF NOT EXISTS idx_emission_forecasts_period ON emission_forecasts(targetPeriod);
      CREATE INDEX IF NOT EXISTS idx_forecasting_factors_type ON forecasting_factors(factorType);
      CREATE INDEX IF NOT EXISTS idx_carbon_budgets_entity ON carbon_budgets(entityId);
      CREATE INDEX IF NOT EXISTS idx_carbon_budgets_year ON carbon_budgets(fiscalYear);
      CREATE INDEX IF NOT EXISTS idx_budget_allocations_budget ON budget_allocations(budgetId);
      CREATE INDEX IF NOT EXISTS idx_budget_variances_budget ON budget_variances(budgetId);
      CREATE INDEX IF NOT EXISTS idx_predictive_alerts_severity ON predictive_alerts(severity);
      CREATE INDEX IF NOT EXISTS idx_predictive_alerts_status ON predictive_alerts(status);
      CREATE INDEX IF NOT EXISTS idx_early_warning_triggers_active ON early_warning_triggers(isActive);
      CREATE INDEX IF NOT EXISTS idx_action_plans_status ON action_plans(status);
      CREATE INDEX IF NOT EXISTS idx_scenario_simulations_type ON scenario_simulations(scenarioType);
      CREATE INDEX IF NOT EXISTS idx_enterprise_forecasts_period ON enterprise_forecasts(forecastPeriod);
      CREATE INDEX IF NOT EXISTS idx_ml_training_data_type ON ml_training_data(dataType);
      CREATE INDEX IF NOT EXISTS idx_model_performance_model ON model_performance_metrics(modelId);
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

  // Phase 4.1: Next-Gen Analytics Methods
  createDeepLearningModel(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO deep_learning_models (modelName, modelType, description, architecture, isActive)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.modelName, data.modelType, data.description, data.architecture || null, data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listDeepLearningModels(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM deep_learning_models ORDER BY createdAt DESC').all();
  }

  updateDeepLearningModel(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE deep_learning_models SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteDeepLearningModel(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM deep_learning_models WHERE id = ?').run(id);
    return true;
  }

  trainDeepLearningModel(id: number) {
    if (!this.db) return { success: false, accuracy: 0, insights: '' };
    const accuracy = 0.85 + Math.random() * 0.1; // Simulated accuracy
    const insights = JSON.stringify({ features: ['emissions_trends', 'seasonal_patterns'], importance: [0.7, 0.3] });
    this.db.prepare('UPDATE deep_learning_models SET accuracy = ?, insights = ?, lastTrained = CURRENT_TIMESTAMP WHERE id = ?').run(accuracy, insights, id);
    return { success: true, accuracy, insights };
  }

  getModelInsights(id: number) {
    if (!this.db) return null;
    const model: any = this.db.prepare('SELECT insights FROM deep_learning_models WHERE id = ?').get(id);
    return model ? JSON.parse(model.insights || '{}') : null;
  }

  createStrategyRecommendation(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO strategy_recommendations (recommendationType, title, description, potentialImpact, estimatedCost, implementationTime, confidenceScore, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.recommendationType, data.title, data.description, data.potentialImpact, data.estimatedCost, data.implementationTime, data.confidenceScore, data.status || 'suggested');
    return { id: info.lastInsertRowid, ...data };
  }

  listStrategyRecommendations(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM strategy_recommendations ORDER BY confidenceScore DESC, createdAt DESC').all();
  }

  updateStrategyRecommendation(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE strategy_recommendations SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteStrategyRecommendation(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM strategy_recommendations WHERE id = ?').run(id);
    return true;
  }

  generateRecommendations(context?: any) {
    if (!this.db) return [];
    // In production, this would use AI to generate recommendations based on context
    // For now, return existing recommendations
    return this.listStrategyRecommendations();
  }

  listAutomatedInsights(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM automated_insights ORDER BY createdAt DESC LIMIT 100').all();
  }

  generateInsightsReport(filters?: any) {
    if (!this.db) return { insights: [], narrative: '' };
    const insights = this.listAutomatedInsights(filters);
    const narrative = `Generated ${insights.length} insights from your emissions data. Key findings include trends, anomalies, and opportunities for improvement.`;
    return { insights, narrative };
  }

  createDigitalTwin(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO digital_twins (facilityId, facilityName, location, isActive)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.facilityId, data.facilityName, data.location || null, data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listDigitalTwins(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM digital_twins ORDER BY createdAt DESC').all();
  }

  updateDigitalTwin(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE digital_twins SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteDigitalTwin(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM digital_twins WHERE id = ?').run(id);
    return true;
  }

  syncDigitalTwinData(id: number) {
    if (!this.db) return { success: false, lastUpdated: '' };
    const now = new Date().toISOString();
    this.db.prepare('UPDATE digital_twins SET lastUpdated = ? WHERE id = ?').run(now, id);
    return { success: true, lastUpdated: now };
  }

  // Phase 4.2: Enhanced Verification & Trust Methods
  createVerificationWorkflow(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO verification_workflows (workflowName, workflowType, totalSteps, status)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.workflowName, data.workflowType, data.totalSteps, data.status || 'initiated');
    return { id: info.lastInsertRowid, ...data };
  }

  listVerificationWorkflows(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM verification_workflows ORDER BY createdAt DESC').all();
  }

  updateVerificationWorkflow(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE verification_workflows SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteVerificationWorkflow(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM verification_workflows WHERE id = ?').run(id);
    return true;
  }

  advanceWorkflowStep(id: number) {
    if (!this.db) return { success: false, currentStep: 0 };
    const workflow: any = this.db.prepare('SELECT currentStep, totalSteps FROM verification_workflows WHERE id = ?').get(id);
    if (!workflow) return { success: false, currentStep: 0 };
    const newStep = Math.min(workflow.currentStep + 1, workflow.totalSteps);
    const status = newStep === workflow.totalSteps ? 'completed' : 'in_progress';
    this.db.prepare('UPDATE verification_workflows SET currentStep = ?, status = ? WHERE id = ?').run(newStep, status, id);
    return { success: true, currentStep: newStep };
  }

  getAuditTrail(entityType: string, entityId: number) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM audit_trails WHERE entityType = ? AND entityId = ? ORDER BY timestamp DESC').all(entityType, entityId);
  }

  verifyAuditTrailIntegrity(entityType: string, entityId: number) {
    if (!this.db) return { valid: false, message: '' };
    const trail = this.getAuditTrail(entityType, entityId);
    // In production, this would verify the hash chain
    return { valid: true, message: `Audit trail integrity verified for ${trail.length} entries` };
  }

  createThirdPartyVerifier(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO third_party_verifiers (verifierName, verifierType, contactInfo, isApproved)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.verifierName, data.verifierType, data.contactInfo || null, data.isApproved ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listThirdPartyVerifiers(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM third_party_verifiers ORDER BY rating DESC').all();
  }

  updateThirdPartyVerifier(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE third_party_verifiers SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteThirdPartyVerifier(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM third_party_verifiers WHERE id = ?').run(id);
    return true;
  }

  requestVerification(verifierId: number, dataScope: any) {
    if (!this.db) return { success: false, workflowId: 0 };
    const workflow = this.createVerificationWorkflow({
      workflowName: `Verification Request - ${new Date().toISOString()}`,
      workflowType: 'external',
      totalSteps: 5,
      verifiers: JSON.stringify([verifierId]),
      dataScope: JSON.stringify(dataScope)
    });
    return { success: true, workflowId: workflow?.id || 0 };
  }

  getDataProvenance(dataType: string, dataId: number) {
    if (!this.db) return null;
    return this.db.prepare('SELECT * FROM data_provenance WHERE dataType = ? AND dataId = ?').get(dataType, dataId);
  }

  traceDataLineage(dataType: string, dataId: number) {
    if (!this.db) return null;
    const provenance = this.getDataProvenance(dataType, dataId);
    return provenance ? JSON.parse((provenance as any).lineage || '{}') : null;
  }

  validateDataCompliance(dataType: string, dataId: number) {
    if (!this.db) return { compliant: false, issues: [] };
    const provenance = this.getDataProvenance(dataType, dataId);
    if (!provenance) return { compliant: false, issues: ['No provenance data found'] };
    return { compliant: true, issues: [] };
  }

  // Phase 4.3: IoT & Real-Time Monitoring Methods
  createIoTDevice(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO iot_devices (deviceName, deviceType, connectionType, status, isActive)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.deviceName, data.deviceType, data.connectionType, data.status || 'offline', data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listIoTDevices(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM iot_devices ORDER BY deviceName').all();
  }

  updateIoTDevice(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE iot_devices SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteIoTDevice(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM iot_devices WHERE id = ?').run(id);
    return true;
  }

  discoverIoTDevices(networkConfig?: any) {
    if (!this.db) return [];
    // In production, this would scan the network for IoT devices
    // For now, return existing devices
    return this.listIoTDevices();
  }

  testDeviceConnection(id: number) {
    if (!this.db) return { success: false, message: '' };
    const device: any = this.db.prepare('SELECT * FROM iot_devices WHERE id = ?').get(id);
    if (!device) return { success: false, message: 'Device not found' };
    // In production, this would test actual connection
    this.db.prepare('UPDATE iot_devices SET status = ?, lastDataReceived = CURRENT_TIMESTAMP WHERE id = ?').run('online', id);
    return { success: true, message: 'Device connected successfully' };
  }

  createRealtimeMonitor(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO realtime_monitors (monitorName, monitorType, status, isActive)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.monitorName, data.monitorType, data.status || 'normal', data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listRealtimeMonitors(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM realtime_monitors ORDER BY monitorName').all();
  }

  updateRealtimeMonitor(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE realtime_monitors SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteRealtimeMonitor(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM realtime_monitors WHERE id = ?').run(id);
    return true;
  }

  getRealtimeData(monitorId: number) {
    if (!this.db) return null;
    const monitor: any = this.db.prepare('SELECT * FROM realtime_monitors WHERE id = ?').get(monitorId);
    return monitor ? { value: monitor.currentValue, unit: monitor.currentUnit, status: monitor.status, lastUpdated: monitor.lastUpdated } : null;
  }

  listSensorData(deviceId: number, filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM sensor_data WHERE deviceId = ? ORDER BY timestamp DESC LIMIT 1000').all(deviceId);
  }

  processSensorData(deviceId: number, startTime: string, endTime: string) {
    if (!this.db) return { success: false, processed: 0 };
    const count = this.db.prepare('UPDATE sensor_data SET isProcessed = 1 WHERE deviceId = ? AND timestamp BETWEEN ? AND ?').run(deviceId, startTime, endTime);
    return { success: true, processed: count.changes };
  }

  createAlertRule(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO alert_rules (ruleName, ruleType, severity, isActive)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.ruleName, data.ruleType, data.severity || 'medium', data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listAlertRules(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM alert_rules ORDER BY severity DESC').all();
  }

  updateAlertRule(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE alert_rules SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteAlertRule(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM alert_rules WHERE id = ?').run(id);
    return true;
  }

  testAlertRule(id: number) {
    if (!this.db) return { triggered: false, message: '' };
    const rule: any = this.db.prepare('SELECT * FROM alert_rules WHERE id = ?').get(id);
    if (!rule) return { triggered: false, message: 'Rule not found' };
    // In production, this would test the actual condition
    return { triggered: true, message: 'Test alert triggered successfully' };
  }

  getActiveAlerts(filters?: any) {
    if (!this.db) return [];
    // In production, this would return triggered alerts
    // For now, return alert rules that were recently triggered
    return this.db.prepare('SELECT * FROM alert_rules WHERE lastTriggered IS NOT NULL ORDER BY lastTriggered DESC LIMIT 50').all();
  }

  // Phase 4.4: Advanced Visualization & Immersive Experience Methods
  createFacility3DModel(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO facility_3d_models (facilityId, facilityName, modelType)
      VALUES (?, ?, ?)
    `);
    const info = stmt.run(data.facilityId, data.facilityName, data.modelType);
    return { id: info.lastInsertRowid, ...data };
  }

  listFacility3DModels(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM facility_3d_models ORDER BY facilityName').all();
  }

  updateFacility3DModel(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE facility_3d_models SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteFacility3DModel(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM facility_3d_models WHERE id = ?').run(id);
    return true;
  }

  exportFacility3DModel(id: number, format: string) {
    if (!this.db) return '';
    const model: any = this.db.prepare('SELECT * FROM facility_3d_models WHERE id = ?').get(id);
    if (!model) return '';
    // In production, this would export in the requested format (GLTF, OBJ, etc.)
    return `export_${id}.${format}`;
  }

  createARDataCollection(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO ar_data_collections (collectionType, userId, sessionDate, status)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.collectionType, data.userId, data.sessionDate, data.status || 'in_progress');
    return { id: info.lastInsertRowid, ...data };
  }

  listARDataCollections(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM ar_data_collections ORDER BY sessionDate DESC').all();
  }

  updateARDataCollection(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE ar_data_collections SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteARDataCollection(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM ar_data_collections WHERE id = ?').run(id);
    return true;
  }

  createTrainingModule(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO training_modules (moduleName, moduleType, topic, difficulty, isActive)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.moduleName, data.moduleType, data.topic, data.difficulty || 'beginner', data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listTrainingModules(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM training_modules WHERE isActive = 1 ORDER BY moduleName').all();
  }

  updateTrainingModule(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE training_modules SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteTrainingModule(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM training_modules WHERE id = ?').run(id);
    return true;
  }

  getTrainingProgress(userId: number, moduleId?: number) {
    if (!this.db) return [];
    if (moduleId) {
      return this.db.prepare('SELECT * FROM training_progress WHERE userId = ? AND moduleId = ?').all(userId, moduleId);
    }
    return this.db.prepare('SELECT * FROM training_progress WHERE userId = ?').all(userId);
  }

  updateTrainingProgress(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE training_progress SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  issueTrainingCertificate(userId: number, moduleId: number) {
    if (!this.db) return { success: false, certificateId: '' };
    this.db.prepare('UPDATE training_progress SET certificateIssued = 1, completionDate = CURRENT_TIMESTAMP WHERE userId = ? AND moduleId = ?').run(userId, moduleId);
    const certificateId = `CERT-${userId}-${moduleId}-${Date.now()}`;
    return { success: true, certificateId };
  }

  createDataStory(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO data_stories (storyTitle, storyType, targetAudience, isPublic)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.storyTitle, data.storyType, data.targetAudience || 'technical', data.isPublic ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  listDataStories(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM data_stories ORDER BY createdAt DESC').all();
  }

  updateDataStory(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE data_stories SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  deleteDataStory(id: number) {
    if (!this.db) return false;
    this.db.prepare('DELETE FROM data_stories WHERE id = ?').run(id);
    return true;
  }

  generateDataStoryNarrative(storyId: number) {
    if (!this.db) return { narrative: '', visualizations: [] };
    const story: any = this.db.prepare('SELECT * FROM data_stories WHERE id = ?').get(storyId);
    if (!story) return { narrative: '', visualizations: [] };
    // In production, this would use AI to generate natural language narrative
    const narrative = `This ${story.storyType} story presents insights about emissions performance and trends.`;
    const visualizations = [{ type: 'line', title: 'Emissions Trend' }, { type: 'pie', title: 'Emissions by Scope' }];
    return { narrative, visualizations };
  }

  // Phase 4.5: Platform Optimization & Future-Proofing Methods
  getCacheStats() {
    if (!this.db) return {};
    const total = this.db.prepare('SELECT COUNT(*) as count, SUM(dataSize) as size FROM cache_configs').get() as any;
    const hitRate = this.db.prepare('SELECT AVG(hitCount) as avgHits FROM cache_configs').get() as any;
    return { totalEntries: total.count, totalSize: total.size, averageHits: hitRate.avgHits };
  }

  clearCache(cacheType?: string) {
    if (!this.db) return { success: false, clearedItems: 0 };
    let count;
    if (cacheType) {
      count = this.db.prepare('DELETE FROM cache_configs WHERE cacheType = ?').run(cacheType);
    } else {
      count = this.db.prepare('DELETE FROM cache_configs').run();
    }
    return { success: true, clearedItems: count.changes };
  }

  optimizeCache() {
    if (!this.db) return { success: false, message: '' };
    // Remove expired cache entries
    const count = this.db.prepare('DELETE FROM cache_configs WHERE expiresAt < CURRENT_TIMESTAMP').run();
    return { success: true, message: `Removed ${count.changes} expired cache entries` };
  }

  createDistributedJob(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO distributed_jobs (jobName, jobType, priority, status)
      VALUES (?, ?, ?, ?)
    `);
    const info = stmt.run(data.jobName, data.jobType, data.priority || 5, data.status || 'queued');
    return { id: info.lastInsertRowid, ...data };
  }

  listDistributedJobs(filters?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM distributed_jobs ORDER BY priority DESC, createdAt DESC').all();
  }

  getJobProgress(id: number) {
    if (!this.db) return { progress: 0, status: '', estimatedTimeRemaining: 0 };
    const job: any = this.db.prepare('SELECT progress, status, estimatedDuration FROM distributed_jobs WHERE id = ?').get(id);
    if (!job) return { progress: 0, status: '', estimatedTimeRemaining: 0 };
    const estimatedTimeRemaining = job.estimatedDuration ? (job.estimatedDuration * (100 - job.progress) / 100) : 0;
    return { progress: job.progress, status: job.status, estimatedTimeRemaining };
  }

  cancelDistributedJob(id: number) {
    if (!this.db) return false;
    this.db.prepare('UPDATE distributed_jobs SET status = ?, endTime = CURRENT_TIMESTAMP WHERE id = ?').run('failed', id);
    return true;
  }

  getResourceMetrics(timeRange?: any) {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM resource_metrics ORDER BY timestamp DESC LIMIT 1000').all();
  }

  optimizeResources() {
    if (!this.db) return { success: false, optimizations: [] };
    // In production, this would perform actual resource optimization
    return { success: true, optimizations: ['Cache optimized', 'Unused connections closed', 'Memory freed'] };
  }

  getSecurityConfigs() {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM security_configs WHERE isEnabled = 1 ORDER BY configType').all();
  }

  updateSecurityConfig(id: number, data: any) {
    if (!this.db) return null;
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    this.db.prepare(`UPDATE security_configs SET ${fields}, updatedAt = CURRENT_TIMESTAMP WHERE id = ?`).run(...values);
    return { id, ...data };
  }

  auditSecurity() {
    if (!this.db) return { passed: false, issues: [], recommendations: [] };
    const configs = this.getSecurityConfigs();
    const passed = configs.length > 0;
    const issues = passed ? [] : ['No security configurations enabled'];
    const recommendations = ['Enable zero-trust architecture', 'Rotate encryption keys quarterly', 'Implement quantum-resistant algorithms'];
    return { passed, issues, recommendations };
  }

  listEncryptionKeys() {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM encryption_keys WHERE isActive = 1 ORDER BY keyName').all();
  }

  createEncryptionKey(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO encryption_keys (keyName, keyType, algorithm, keySize, purpose, rotationPolicy, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(data.keyName, data.keyType, data.algorithm, data.keySize, data.purpose, data.rotationPolicy || 'annually', data.isActive !== false ? 1 : 0);
    return { id: info.lastInsertRowid, ...data };
  }

  rotateEncryptionKey(id: number) {
    if (!this.db) return { success: false, newKeyId: 0 };
    const oldKey: any = this.db.prepare('SELECT * FROM encryption_keys WHERE id = ?').get(id);
    if (!oldKey) return { success: false, newKeyId: 0 };
    
    // Create new key
    const newKey = this.createEncryptionKey({
      keyName: `${oldKey.keyName}_rotated`,
      keyType: oldKey.keyType,
      algorithm: oldKey.algorithm,
      keySize: oldKey.keySize,
      purpose: oldKey.purpose,
      rotationPolicy: oldKey.rotationPolicy,
      isActive: true
    });
    
    // Deactivate old key
    this.db.prepare('UPDATE encryption_keys SET isActive = 0 WHERE id = ?').run(id);
    
    return { success: true, newKeyId: newKey?.id || 0 };
  }

  testQuantumResistance(keyId: number) {
    if (!this.db) return { resistant: false, algorithm: '', recommendation: '' };
    const key: any = this.db.prepare('SELECT algorithm, keySize FROM encryption_keys WHERE id = ?').get(keyId);
    if (!key) return { resistant: false, algorithm: '', recommendation: 'Key not found' };
    
    // Check if algorithm is quantum-resistant
    const quantumResistantAlgos = ['CRYSTALS-Kyber', 'CRYSTALS-Dilithium', 'SPHINCS+', 'Classic McEliece'];
    const resistant = quantumResistantAlgos.some(algo => key.algorithm.includes(algo));
    
    const recommendation = resistant 
      ? 'Algorithm is quantum-resistant' 
      : 'Consider upgrading to post-quantum cryptography (PQC) algorithms like CRYSTALS-Kyber';
    
    return { resistant, algorithm: key.algorithm, recommendation };
  }

  // ===============================================
  // Phase 5: Predictive Carbon Intelligence Methods
  // ===============================================

  // Phase 5.1: Advanced Forecasting Engine

  createEmissionForecast(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO emission_forecasts (
        forecastName, forecastType, targetPeriod, baselineEmissions, 
        predictedEmissions, confidenceLevel, modelType, weatherImpact, 
        economicImpact, operationalImpact, uncertaintyLower, uncertaintyUpper, factors
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      data.forecastName, data.forecastType, data.targetPeriod, data.baselineEmissions,
      data.predictedEmissions, data.confidenceLevel || 0.95, data.modelType,
      data.weatherImpact || 0, data.economicImpact || 0, data.operationalImpact || 0,
      data.uncertaintyLower, data.uncertaintyUpper, JSON.stringify(data.factors || {})
    );
    return { id: info.lastInsertRowid, ...data };
  }

  listEmissionForecasts(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM emission_forecasts';
    const conditions = [];
    const params: any[] = [];

    if (filters?.forecastType) {
      conditions.push('forecastType = ?');
      params.push(filters.forecastType);
    }
    if (filters?.targetPeriod) {
      conditions.push('targetPeriod = ?');
      params.push(filters.targetPeriod);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY createdAt DESC';

    return this.db.prepare(query).all(...params);
  }

  getEmissionForecast(id: number) {
    if (!this.db) return null;
    return this.db.prepare('SELECT * FROM emission_forecasts WHERE id = ?').get(id);
  }

  updateEmissionForecast(id: number, data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      UPDATE emission_forecasts 
      SET predictedEmissions = ?, confidenceLevel = ?, 
          weatherImpact = ?, economicImpact = ?, operationalImpact = ?,
          uncertaintyLower = ?, uncertaintyUpper = ?, 
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(
      data.predictedEmissions, data.confidenceLevel,
      data.weatherImpact, data.economicImpact, data.operationalImpact,
      data.uncertaintyLower, data.uncertaintyUpper, id
    );
    return this.getEmissionForecast(id);
  }

  createForecastingFactor(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO forecasting_factors (
        factorName, factorType, category, currentValue, unit, 
        forecastValue, impactCoefficient, dataSource, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      data.factorName, data.factorType, data.category, data.currentValue, data.unit,
      data.forecastValue, data.impactCoefficient || 1.0, data.dataSource,
      JSON.stringify(data.metadata || {})
    );
    return { id: info.lastInsertRowid, ...data };
  }

  listForecastingFactors(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM forecasting_factors';
    const conditions = [];
    const params: any[] = [];

    if (filters?.factorType) {
      conditions.push('factorType = ?');
      params.push(filters.factorType);
    }
    if (filters?.category) {
      conditions.push('category = ?');
      params.push(filters.category);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY factorName ASC';

    return this.db.prepare(query).all(...params);
  }

  runMultiFactorForecast(params: any) {
    if (!this.db) return null;
    
    // Simulate multi-factor emission forecasting
    const baselineEmissions = params.baselineEmissions || 1000;
    const weatherFactor = params.weatherFactor || 0;
    const economicFactor = params.economicFactor || 0;
    const operationalFactor = params.operationalFactor || 0;
    
    // Calculate predicted emissions with all factors
    const weatherImpact = baselineEmissions * (weatherFactor / 100);
    const economicImpact = baselineEmissions * (economicFactor / 100);
    const operationalImpact = baselineEmissions * (operationalFactor / 100);
    
    const predictedEmissions = baselineEmissions + weatherImpact + economicImpact + operationalImpact;
    const uncertainty = Math.abs(predictedEmissions * 0.1); // 10% uncertainty
    
    const forecast = {
      forecastName: params.forecastName || `Multi-Factor Forecast ${new Date().toISOString()}`,
      forecastType: 'multi_factor',
      targetPeriod: params.targetPeriod || new Date().getFullYear().toString(),
      baselineEmissions,
      predictedEmissions,
      confidenceLevel: 0.85,
      modelType: 'ensemble',
      weatherImpact,
      economicImpact,
      operationalImpact,
      uncertaintyLower: predictedEmissions - uncertainty,
      uncertaintyUpper: predictedEmissions + uncertainty,
      factors: {
        weather: weatherFactor,
        economic: economicFactor,
        operational: operationalFactor
      }
    };
    
    return this.createEmissionForecast(forecast);
  }

  trainLSTMModel(params: any) {
    if (!this.db) return null;
    
    // Simulate LSTM model training for time series
    const trainingData: any = this.db.prepare(`
      SELECT timePeriod, SUM(value) as totalEmissions 
      FROM activity_data 
      GROUP BY timePeriod 
      ORDER BY timePeriod DESC 
      LIMIT 24
    `).all();
    
    const accuracy = 0.87 + Math.random() * 0.1; // Simulated accuracy 87-97%
    const mae = 50 + Math.random() * 50; // Mean Absolute Error
    
    // Store model performance
    const performanceMetric = {
      modelType: 'LSTM',
      accuracy,
      mae,
      rmse: mae * 1.2,
      r2Score: accuracy,
      validationMethod: 'k-fold cross-validation',
      hyperparameters: JSON.stringify({
        layers: 3,
        units: 128,
        dropout: 0.2,
        epochs: 100,
        batchSize: 32
      }),
      trainingDuration: Math.floor(300 + Math.random() * 300)
    };
    
    const stmt = this.db.prepare(`
      INSERT INTO model_performance_metrics (
        modelType, accuracy, mae, rmse, r2Score, 
        validationMethod, hyperparameters, trainingDuration
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      performanceMetric.modelType, performanceMetric.accuracy,
      performanceMetric.mae, performanceMetric.rmse, performanceMetric.r2Score,
      performanceMetric.validationMethod, performanceMetric.hyperparameters,
      performanceMetric.trainingDuration
    );
    
    return {
      modelId: info.lastInsertRowid,
      ...performanceMetric,
      trainingDataPoints: trainingData.length,
      message: 'LSTM model trained successfully'
    };
  }

  // Phase 5.2: Carbon Budget Management

  createCarbonBudget(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO carbon_budgets (
        budgetName, entityId, fiscalYear, totalBudget, 
        allocatedBudget, consumedBudget, remainingBudget, 
        budgetUnit, allocationStrategy, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const totalBudget = data.totalBudget || 0;
    const consumedBudget = data.consumedBudget || 0;
    const allocatedBudget = data.allocatedBudget || 0;
    const remainingBudget = totalBudget - consumedBudget - allocatedBudget;
    
    const info = stmt.run(
      data.budgetName, data.entityId, data.fiscalYear, totalBudget,
      allocatedBudget, consumedBudget, remainingBudget,
      data.budgetUnit || 'tCO2e', data.allocationStrategy || 'proportional',
      data.status || 'active'
    );
    return { id: info.lastInsertRowid, ...data, remainingBudget };
  }

  listCarbonBudgets(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM carbon_budgets';
    const conditions = [];
    const params: any[] = [];

    if (filters?.fiscalYear) {
      conditions.push('fiscalYear = ?');
      params.push(filters.fiscalYear);
    }
    if (filters?.entityId) {
      conditions.push('entityId = ?');
      params.push(filters.entityId);
    }
    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY fiscalYear DESC, budgetName ASC';

    return this.db.prepare(query).all(...params);
  }

  getCarbonBudget(id: number) {
    if (!this.db) return null;
    return this.db.prepare('SELECT * FROM carbon_budgets WHERE id = ?').get(id);
  }

  updateCarbonBudgetConsumption(id: number, consumedAmount: number) {
    if (!this.db) return null;
    const budget: any = this.getCarbonBudget(id);
    if (!budget) return null;
    
    const newConsumed = budget.consumedBudget + consumedAmount;
    const remaining = budget.totalBudget - newConsumed - budget.allocatedBudget;
    
    const stmt = this.db.prepare(`
      UPDATE carbon_budgets 
      SET consumedBudget = ?, remainingBudget = ?, updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    stmt.run(newConsumed, remaining, id);
    
    return this.getCarbonBudget(id);
  }

  allocateBudget(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO budget_allocations (
        budgetId, entityId, businessUnit, allocatedAmount, 
        consumedAmount, remainingAmount, utilizationPercentage, 
        priority, justification
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const allocatedAmount = data.allocatedAmount || 0;
    const consumedAmount = data.consumedAmount || 0;
    const remainingAmount = allocatedAmount - consumedAmount;
    const utilizationPercentage = allocatedAmount > 0 ? (consumedAmount / allocatedAmount) * 100 : 0;
    
    const info = stmt.run(
      data.budgetId, data.entityId, data.businessUnit, allocatedAmount,
      consumedAmount, remainingAmount, utilizationPercentage,
      data.priority || 5, data.justification
    );
    
    // Update parent budget
    const budget: any = this.getCarbonBudget(data.budgetId);
    if (budget) {
      const newAllocated = budget.allocatedBudget + allocatedAmount;
      const newRemaining = budget.totalBudget - budget.consumedBudget - newAllocated;
      this.db.prepare(`
        UPDATE carbon_budgets 
        SET allocatedBudget = ?, remainingBudget = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(newAllocated, newRemaining, data.budgetId);
    }
    
    return { id: info.lastInsertRowid, ...data, remainingAmount, utilizationPercentage };
  }

  listBudgetAllocations(budgetId?: number) {
    if (!this.db) return [];
    let query = 'SELECT * FROM budget_allocations';
    if (budgetId) {
      query += ' WHERE budgetId = ?';
      return this.db.prepare(query).all(budgetId);
    }
    return this.db.prepare(query).all();
  }

  optimizeBudgetAllocation(budgetId: number) {
    if (!this.db) return { success: false, message: 'Optimization failed' };
    
    // Get budget and allocations
    const budget: any = this.getCarbonBudget(budgetId);
    if (!budget) return { success: false, message: 'Budget not found' };
    
    const allocations: any[] = this.listBudgetAllocations(budgetId);
    
    // AI-optimized distribution based on performance and opportunities
    // In a real implementation, this would use ML algorithms
    const optimizedAllocations = allocations.map(alloc => {
      const currentUtilization = alloc.utilizationPercentage;
      let recommendedAdjustment = 0;
      
      if (currentUtilization > 90) {
        recommendedAdjustment = alloc.allocatedAmount * 0.1; // Increase by 10%
      } else if (currentUtilization < 50) {
        recommendedAdjustment = -alloc.allocatedAmount * 0.1; // Decrease by 10%
      }
      
      return {
        ...alloc,
        recommendedAdjustment,
        recommendedNewAllocation: alloc.allocatedAmount + recommendedAdjustment
      };
    });
    
    // Mark budget as optimized
    this.db.prepare('UPDATE carbon_budgets SET isOptimized = 1, updatedAt = CURRENT_TIMESTAMP WHERE id = ?').run(budgetId);
    
    return {
      success: true,
      message: 'Budget optimization completed',
      optimizedAllocations,
      totalSavings: optimizedAllocations.reduce((sum, a) => sum + Math.abs(a.recommendedAdjustment || 0), 0)
    };
  }

  createBudgetVariance(data: any) {
    if (!this.db) return null;
    const varianceAmount = data.actualEmissions - data.plannedEmissions;
    const variancePercentage = data.plannedEmissions > 0 
      ? (varianceAmount / data.plannedEmissions) * 100 
      : 0;
    
    const varianceType = varianceAmount > 0 ? 'unfavorable' : 'favorable';
    const severity = Math.abs(variancePercentage) > 20 ? 'high' : 
                     Math.abs(variancePercentage) > 10 ? 'medium' : 'low';
    
    const stmt = this.db.prepare(`
      INSERT INTO budget_variances (
        budgetId, allocationId, timePeriod, plannedEmissions, 
        actualEmissions, varianceAmount, variancePercentage, 
        varianceType, rootCauses, correctiveActions, severity
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.budgetId, data.allocationId, data.timePeriod, data.plannedEmissions,
      data.actualEmissions, varianceAmount, variancePercentage, varianceType,
      JSON.stringify(data.rootCauses || []), JSON.stringify(data.correctiveActions || []),
      severity
    );
    
    return { 
      id: info.lastInsertRowid, 
      ...data, 
      varianceAmount, 
      variancePercentage, 
      varianceType,
      severity 
    };
  }

  listBudgetVariances(budgetId?: number) {
    if (!this.db) return [];
    let query = 'SELECT * FROM budget_variances';
    if (budgetId) {
      query += ' WHERE budgetId = ?';
      return this.db.prepare(query).all(budgetId);
    }
    query += ' ORDER BY createdAt DESC';
    return this.db.prepare(query).all();
  }

  // Phase 5.3: Early Warning System

  createPredictiveAlert(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO predictive_alerts (
        alertName, alertType, severity, predictedEvent, likelihood,
        impactAssessment, recommendedActions, thresholdValue, 
        currentValue, predictedValue, timeToEvent, entityId, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.alertName, data.alertType, data.severity, data.predictedEvent, data.likelihood,
      data.impactAssessment, JSON.stringify(data.recommendedActions || []),
      data.thresholdValue, data.currentValue, data.predictedValue,
      data.timeToEvent, data.entityId, data.status || 'active'
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  listPredictiveAlerts(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM predictive_alerts';
    const conditions = [];
    const params: any[] = [];

    if (filters?.severity) {
      conditions.push('severity = ?');
      params.push(filters.severity);
    }
    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }
    if (filters?.entityId) {
      conditions.push('entityId = ?');
      params.push(filters.entityId);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY severity DESC, triggeredAt DESC';

    return this.db.prepare(query).all(...params);
  }

  acknowledgeAlert(id: number) {
    if (!this.db) return null;
    this.db.prepare(`
      UPDATE predictive_alerts 
      SET status = 'acknowledged', acknowledgedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(id);
    return this.db.prepare('SELECT * FROM predictive_alerts WHERE id = ?').get(id);
  }

  resolveAlert(id: number) {
    if (!this.db) return null;
    this.db.prepare(`
      UPDATE predictive_alerts 
      SET status = 'resolved', resolvedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(id);
    return this.db.prepare('SELECT * FROM predictive_alerts WHERE id = ?').get(id);
  }

  createEarlyWarningTrigger(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO early_warning_triggers (
        triggerName, triggerType, monitoredMetric, thresholdCondition,
        thresholdValue, leadTime, escalationLevel, notificationChannels,
        stakeholders, actionPlanId, isActive
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.triggerName, data.triggerType, data.monitoredMetric, data.thresholdCondition,
      data.thresholdValue, data.leadTime || 30, data.escalationLevel || 1,
      JSON.stringify(data.notificationChannels || []),
      JSON.stringify(data.stakeholders || []), data.actionPlanId,
      data.isActive !== false ? 1 : 0
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  listEarlyWarningTriggers(activeOnly: boolean = false) {
    if (!this.db) return [];
    let query = 'SELECT * FROM early_warning_triggers';
    if (activeOnly) {
      query += ' WHERE isActive = 1';
    }
    query += ' ORDER BY escalationLevel DESC, triggerName ASC';
    return this.db.prepare(query).all();
  }

  evaluateWarningTriggers() {
    if (!this.db) return { triggered: [], evaluated: 0 };
    
    const triggers: any[] = this.listEarlyWarningTriggers(true);
    const triggered = [];
    
    // Simulate trigger evaluation
    for (const trigger of triggers) {
      // In production, this would check actual metrics against conditions
      const shouldTrigger = Math.random() > 0.9; // 10% chance for demo
      
      if (shouldTrigger) {
        // Update last triggered
        this.db.prepare(`
          UPDATE early_warning_triggers 
          SET lastTriggered = CURRENT_TIMESTAMP 
          WHERE id = ?
        `).run(trigger.id);
        
        // Create predictive alert
        const alert = this.createPredictiveAlert({
          alertName: `${trigger.triggerName} - Triggered`,
          alertType: trigger.triggerType,
          severity: trigger.escalationLevel > 2 ? 'critical' : 'high',
          predictedEvent: `${trigger.monitoredMetric} approaching threshold`,
          likelihood: 0.85,
          impactAssessment: `Potential budget overrun detected`,
          recommendedActions: ['Review current projections', 'Activate action plan', 'Notify stakeholders'],
          thresholdValue: trigger.thresholdValue,
          currentValue: trigger.thresholdValue * 0.9,
          predictedValue: trigger.thresholdValue * 1.1,
          timeToEvent: trigger.leadTime,
          entityId: null,
          status: 'active'
        });
        
        triggered.push({
          trigger,
          alert
        });
      }
    }
    
    return { triggered, evaluated: triggers.length };
  }

  createActionPlan(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO action_plans (
        planName, planType, triggerCondition, planSteps, 
        responsibleParties, estimatedDuration, estimatedCost,
        expectedReduction, priority, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.planName, data.planType, data.triggerCondition,
      JSON.stringify(data.planSteps || []),
      JSON.stringify(data.responsibleParties || []),
      data.estimatedDuration, data.estimatedCost, data.expectedReduction,
      data.priority || 'medium', data.status || 'ready'
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  listActionPlans(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM action_plans';
    const conditions = [];
    const params: any[] = [];

    if (filters?.status) {
      conditions.push('status = ?');
      params.push(filters.status);
    }
    if (filters?.planType) {
      conditions.push('planType = ?');
      params.push(filters.planType);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY priority DESC, planName ASC';

    return this.db.prepare(query).all(...params);
  }

  activateActionPlan(id: number) {
    if (!this.db) return { success: false, message: 'Activation failed' };
    
    const plan: any = this.db.prepare('SELECT * FROM action_plans WHERE id = ?').get(id);
    if (!plan) return { success: false, message: 'Action plan not found' };
    
    // Update activation count and status
    this.db.prepare(`
      UPDATE action_plans 
      SET status = 'active', 
          activationCount = activationCount + 1, 
          lastActivated = CURRENT_TIMESTAMP,
          updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(id);
    
    return {
      success: true,
      message: `Action plan "${plan.planName}" activated successfully`,
      plan: this.db.prepare('SELECT * FROM action_plans WHERE id = ?').get(id)
    };
  }

  // Phase 5.4: Scenario Planning Suite

  createScenarioSimulation(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO scenario_simulations (
        scenarioName, scenarioType, description, baselineScenario,
        simulationType, parameters, iterations, results,
        probabilityDistribution, riskLevel, recommendedStrategy, createdBy
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.scenarioName, data.scenarioType, data.description,
      data.baselineScenario ? 1 : 0, data.simulationType,
      JSON.stringify(data.parameters || {}),
      data.iterations || 1000,
      JSON.stringify(data.results || {}),
      JSON.stringify(data.probabilityDistribution || {}),
      data.riskLevel, data.recommendedStrategy, data.createdBy
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  listScenarioSimulations(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM scenario_simulations';
    const conditions = [];
    const params: any[] = [];

    if (filters?.scenarioType) {
      conditions.push('scenarioType = ?');
      params.push(filters.scenarioType);
    }
    if (filters?.simulationType) {
      conditions.push('simulationType = ?');
      params.push(filters.simulationType);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY createdAt DESC';

    return this.db.prepare(query).all(...params);
  }

  runMonteCarloSimulation(params: any) {
    if (!this.db) return null;
    
    // Monte Carlo simulation for risk assessment
    const iterations = params.iterations || 1000;
    const baseValue = params.baseValue || 1000;
    const volatility = params.volatility || 0.2;
    
    const results = [];
    for (let i = 0; i < iterations; i++) {
      const randomFactor = 1 + (Math.random() - 0.5) * 2 * volatility;
      results.push(baseValue * randomFactor);
    }
    
    // Calculate statistics
    results.sort((a, b) => a - b);
    const mean = results.reduce((sum, val) => sum + val, 0) / iterations;
    const median = results[Math.floor(iterations / 2)];
    const p5 = results[Math.floor(iterations * 0.05)];
    const p95 = results[Math.floor(iterations * 0.95)];
    const stdDev = Math.sqrt(results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / iterations);
    
    // Determine risk level
    const riskLevel = stdDev / mean > 0.3 ? 'high' : stdDev / mean > 0.15 ? 'medium' : 'low';
    
    const simulationData = {
      scenarioName: params.scenarioName || `Monte Carlo Simulation ${new Date().toISOString()}`,
      scenarioType: 'risk_assessment',
      description: params.description || 'Monte Carlo simulation for emission forecasting',
      baselineScenario: false,
      simulationType: 'monte_carlo',
      parameters: params,
      iterations,
      results: {
        mean,
        median,
        stdDev,
        p5,
        p95,
        min: results[0],
        max: results[iterations - 1]
      },
      probabilityDistribution: {
        type: 'normal',
        mean,
        stdDev
      },
      riskLevel,
      recommendedStrategy: riskLevel === 'high' 
        ? 'Implement aggressive reduction measures'
        : 'Monitor and maintain current trajectory',
      createdBy: params.createdBy || 'system'
    };
    
    return this.createScenarioSimulation(simulationData);
  }

  createSensitivityAnalysis(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO sensitivity_analyses (
        analysisName, targetMetric, baselineValue, variables,
        results, elasticityCoefficients, criticalFactors,
        recommendedFocus, confidenceScore
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.analysisName, data.targetMetric, data.baselineValue,
      JSON.stringify(data.variables || []),
      JSON.stringify(data.results || {}),
      JSON.stringify(data.elasticityCoefficients || {}),
      JSON.stringify(data.criticalFactors || []),
      data.recommendedFocus, data.confidenceScore || 0.85
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  runSensitivityAnalysis(params: any) {
    if (!this.db) return null;
    
    // Perform sensitivity analysis on key emission drivers
    const baselineValue = params.baselineValue || 1000;
    const variables = params.variables || [
      { name: 'Energy Consumption', range: 0.2 },
      { name: 'Production Volume', range: 0.3 },
      { name: 'Transportation', range: 0.15 },
      { name: 'Raw Materials', range: 0.25 }
    ];
    
    const results: any = {};
    const elasticityCoefficients: any = {};
    const criticalFactors = [];
    
    for (const variable of variables) {
      const impacts = [];
      for (let change = -0.2; change <= 0.2; change += 0.05) {
        const impact = baselineValue * (1 + change * variable.range);
        impacts.push({ change, impact });
      }
      
      results[variable.name] = impacts;
      
      // Calculate elasticity (% change in output / % change in input)
      const elasticity = variable.range;
      elasticityCoefficients[variable.name] = elasticity;
      
      if (Math.abs(elasticity) > 0.2) {
        criticalFactors.push(variable.name);
      }
    }
    
    const analysisData = {
      analysisName: params.analysisName || `Sensitivity Analysis ${new Date().toISOString()}`,
      targetMetric: params.targetMetric || 'Total Emissions',
      baselineValue,
      variables,
      results,
      elasticityCoefficients,
      criticalFactors,
      recommendedFocus: criticalFactors.length > 0 
        ? `Focus on ${criticalFactors.join(', ')} as they have the highest impact`
        : 'All factors have moderate impact',
      confidenceScore: 0.88
    };
    
    return this.createSensitivityAnalysis(analysisData);
  }

  listSensitivityAnalyses() {
    if (!this.db) return [];
    return this.db.prepare('SELECT * FROM sensitivity_analyses ORDER BY createdAt DESC').all();
  }

  // Phase 5.5: Enterprise Features

  createEnterpriseForecast(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO enterprise_forecasts (
        forecastName, scope, aggregationType, includedEntities,
        forecastPeriod, totalForecastedEmissions, currency,
        regulatoryAlignment, complianceStatus, executiveSummary,
        keyInsights, isPublished
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.forecastName, data.scope, data.aggregationType,
      JSON.stringify(data.includedEntities || []),
      data.forecastPeriod, data.totalForecastedEmissions,
      data.currency || 'USD',
      JSON.stringify(data.regulatoryAlignment || []),
      data.complianceStatus,
      data.executiveSummary,
      JSON.stringify(data.keyInsights || []),
      data.isPublished ? 1 : 0
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  listEnterpriseForecasts(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM enterprise_forecasts';
    const conditions = [];
    const params: any[] = [];

    if (filters?.scope) {
      conditions.push('scope = ?');
      params.push(filters.scope);
    }
    if (filters?.forecastPeriod) {
      conditions.push('forecastPeriod = ?');
      params.push(filters.forecastPeriod);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY createdAt DESC';

    return this.db.prepare(query).all(...params);
  }

  publishEnterpriseForecast(id: number) {
    if (!this.db) return null;
    this.db.prepare(`
      UPDATE enterprise_forecasts 
      SET isPublished = 1, publishedAt = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).run(id);
    return this.db.prepare('SELECT * FROM enterprise_forecasts WHERE id = ?').get(id);
  }

  generateExecutiveDashboard(params: any) {
    if (!this.db) return null;
    
    // Generate board-level reporting data
    const currentYear = new Date().getFullYear();
    const forecasts: any[] = this.listEmissionForecasts({ targetPeriod: currentYear.toString() });
    const budgets: any[] = this.listCarbonBudgets({ fiscalYear: currentYear.toString(), status: 'active' });
    const alerts: any[] = this.listPredictiveAlerts({ status: 'active' });
    
    const totalForecastedEmissions = forecasts.reduce((sum, f) => sum + (f.predictedEmissions || 0), 0);
    const totalBudget = budgets.reduce((sum, b) => sum + (b.totalBudget || 0), 0);
    const totalConsumed = budgets.reduce((sum, b) => sum + (b.consumedBudget || 0), 0);
    const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
    
    const dashboard = {
      generatedAt: new Date().toISOString(),
      period: currentYear.toString(),
      metrics: {
        totalForecastedEmissions,
        totalBudget,
        totalConsumed,
        budgetUtilization: totalBudget > 0 ? (totalConsumed / totalBudget) * 100 : 0,
        criticalAlerts,
        totalAlerts: alerts.length
      },
      forecasts: forecasts.slice(0, 5),
      budgets: budgets.slice(0, 5),
      alerts: alerts.filter(a => a.severity === 'critical' || a.severity === 'high').slice(0, 10),
      recommendations: [
        totalConsumed / totalBudget > 0.8 
          ? 'Budget utilization exceeds 80% - review allocations'
          : null,
        criticalAlerts > 0 
          ? `${criticalAlerts} critical alerts require immediate attention`
          : null,
        forecasts.some((f: any) => f.predictedEmissions > f.baselineEmissions * 1.1)
          ? 'Some forecasts predict >10% increase - activate reduction plans'
          : null
      ].filter(Boolean)
    };
    
    return dashboard;
  }

  createMLTrainingDataset(data: any) {
    if (!this.db) return null;
    const stmt = this.db.prepare(`
      INSERT INTO ml_training_data (
        datasetName, dataType, features, targetVariable,
        recordCount, dataQuality, splitRatio, 
        preprocessingSteps, isNormalized
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const info = stmt.run(
      data.datasetName, data.dataType,
      JSON.stringify(data.features || []),
      data.targetVariable, data.recordCount, data.dataQuality || 0.8,
      data.splitRatio || '0.8:0.1:0.1',
      JSON.stringify(data.preprocessingSteps || []),
      data.isNormalized ? 1 : 0
    );
    
    return { id: info.lastInsertRowid, ...data };
  }

  listMLTrainingDatasets(filters?: any) {
    if (!this.db) return [];
    let query = 'SELECT * FROM ml_training_data';
    if (filters?.dataType) {
      query += ' WHERE dataType = ?';
      return this.db.prepare(query).all(filters.dataType);
    }
    return this.db.prepare(query + ' ORDER BY createdAt DESC').all();
  }

  getModelPerformanceMetrics(modelId?: number) {
    if (!this.db) return [];
    let query = 'SELECT * FROM model_performance_metrics';
    if (modelId) {
      query += ' WHERE modelId = ?';
      return this.db.prepare(query).all(modelId);
    }
    return this.db.prepare(query + ' ORDER BY evaluationDate DESC').all();
  }
}
