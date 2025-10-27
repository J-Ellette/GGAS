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

// Phase 2.1: Scope 3 Categories
export interface Scope3Category {
  id?: number;
  categoryNumber: number;
  categoryName: string;
  description: string;
  guidanceNotes?: string;
  isEnabled: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierData {
  id?: number;
  supplierName: string;
  supplierCategory: string;
  contactInfo?: string;
  emissionsData?: number;
  dataQuality: number;
  reportingYear: number;
  verificationStatus: string;
  metadata?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 2.2: Integration Management
export interface Integration {
  id?: number;
  name: string;
  type: string; // 'ERP', 'Utility', 'RealTime'
  status: string; // 'active', 'inactive', 'error'
  connectionString?: string;
  lastSyncTime?: string;
  configuration?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 2.3: Analytics
export interface Scenario {
  id?: number;
  name: string;
  description: string;
  baselineYear: number;
  targetYear: number;
  parameters?: string;
  results?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 2.4: Compliance Reports
export interface ComplianceReport {
  id?: number;
  reportType: string; // 'CDP', 'TCFD', 'GRI', 'SASB'
  reportingYear: number;
  status: string; // 'draft', 'submitted', 'verified'
  data?: string;
  submittedDate?: string;
  verificationStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 2.5: User Roles and Permissions
export interface UserRole {
  id?: number;
  roleName: string;
  permissions: string; // JSON string of permissions
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  roleId: number;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.1: AI/ML Features
export interface AnomalyDetection {
  id?: number;
  dataType: string; // 'activity_data', 'emissions'
  dataId: number;
  anomalyScore: number;
  anomalyType: string;
  recommendation?: string;
  status: string; // 'pending', 'reviewed', 'resolved'
  createdAt?: string;
  resolvedAt?: string;
}

export interface PredictiveModel {
  id?: number;
  modelType: string; // 'missing_data', 'emissions_forecast'
  targetField: string;
  trainingData?: string;
  modelParameters?: string;
  accuracy?: number;
  lastTrained?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MLSuggestion {
  id?: number;
  sourceType: string; // 'activity_data', 'emission_factor'
  sourceId: number;
  suggestionType: string;
  suggestedValue?: string;
  confidence: number;
  reasoning?: string;
  status: string; // 'pending', 'accepted', 'rejected'
  createdAt?: string;
}

// Phase 3.2: Target Management
export interface CarbonTarget {
  id?: number;
  targetName: string;
  targetType: string; // 'absolute', 'intensity', 'sbti'
  baselineYear: number;
  baselineEmissions: number;
  targetYear: number;
  targetReduction: number; // percentage
  scope: string; // '1', '2', '1+2', '1+2+3'
  status: string; // 'draft', 'active', 'achieved'
  sbtiValidated: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReductionProject {
  id?: number;
  projectName: string;
  description: string;
  projectType: string;
  startDate: string;
  endDate: string;
  status: string; // 'planned', 'in-progress', 'completed', 'cancelled'
  targetEmissionReduction: number;
  actualEmissionReduction?: number;
  estimatedCost: number;
  actualCost?: number;
  roi?: number;
  milestones?: string; // JSON array
  createdAt?: string;
  updatedAt?: string;
}

export interface CarbonPricingScenario {
  id?: number;
  scenarioName: string;
  carbonPrice: number;
  currency: string;
  priceGrowthRate: number; // annual %
  applicableScopes: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.3: Supply Chain Features
export interface SupplierEngagement {
  id?: number;
  supplierId: number;
  engagementType: string; // 'data_request', 'assessment', 'collaboration'
  status: string; // 'initiated', 'in-progress', 'completed'
  requestedDate: string;
  dueDate: string;
  completedDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplyChainMap {
  id?: number;
  tier: number;
  supplierId: number;
  parentSupplierId?: number;
  productCategory: string;
  spendAmount: number;
  emissionsContribution: number;
  geographicLocation?: string;
  riskLevel: string; // 'low', 'medium', 'high'
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierAssessment {
  id?: number;
  supplierId: number;
  assessmentDate: string;
  overallScore: number; // 0-100
  emissionsScore: number;
  dataQualityScore: number;
  engagementScore: number;
  certifications?: string; // JSON array
  improvementAreas?: string;
  nextReviewDate: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.4: Multi-Entity Support
export interface Entity {
  id?: number;
  entityName: string;
  entityType: string; // 'subsidiary', 'division', 'facility'
  parentEntityId?: number;
  country: string;
  currency: string;
  language: string;
  timezone: string;
  isActive: boolean;
  metadata?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegionalCompliance {
  id?: number;
  region: string;
  regulationType: string;
  regulationName: string;
  description: string;
  applicableScopes: string;
  reportingFrequency: string;
  nextDeadline: string;
  isActive: boolean;
  requirements?: string; // JSON
  createdAt?: string;
  updatedAt?: string;
}

export interface DataGovernancePolicy {
  id?: number;
  policyName: string;
  policyType: string; // 'access', 'retention', 'privacy'
  description: string;
  entityId?: number;
  rules?: string; // JSON
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.5: Integration Ecosystem
export interface IntegrationPlugin {
  id?: number;
  pluginName: string;
  pluginType: string; // 'connector', 'calculation', 'reporting'
  version: string;
  author: string;
  description: string;
  configSchema?: string; // JSON schema
  isInstalled: boolean;
  isActive: boolean;
  installDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomCalculation {
  id?: number;
  calculationName: string;
  description: string;
  formula: string;
  variables?: string; // JSON
  outputUnit: string;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AutomationWorkflow {
  id?: number;
  workflowName: string;
  description: string;
  triggerType: string; // 'schedule', 'event', 'manual'
  triggerConfig?: string; // JSON
  actions?: string; // JSON array of actions
  isActive: boolean;
  lastRunDate?: string;
  nextRunDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ElectronAPI {
  // Phase 1 APIs
  createActivityData: (data: ActivityData) => Promise<ActivityData>;
  listActivityData: (filters?: any) => Promise<ActivityData[]>;
  updateActivityData: (id: number, data: Partial<ActivityData>) => Promise<ActivityData>;
  deleteActivityData: (id: number) => Promise<boolean>;
  
  listEmissionFactors: (filters?: any) => Promise<EmissionFactor[]>;
  createEmissionFactor: (data: EmissionFactor) => Promise<EmissionFactor>;
  searchEmissionFactors: (query: string) => Promise<EmissionFactor[]>;
  
  calculateEmissions: (data: any) => Promise<Calculation>;
  listCalculations: (filters?: any) => Promise<Calculation[]>;

  // Phase 2.1: Scope 3 APIs
  listScope3Categories: () => Promise<Scope3Category[]>;
  updateScope3Category: (id: number, data: Partial<Scope3Category>) => Promise<Scope3Category>;
  createSupplierData: (data: SupplierData) => Promise<SupplierData>;
  listSupplierData: (filters?: any) => Promise<SupplierData[]>;
  updateSupplierData: (id: number, data: Partial<SupplierData>) => Promise<SupplierData>;
  deleteSupplierData: (id: number) => Promise<boolean>;

  // Phase 2.2: Integration APIs
  createIntegration: (data: Integration) => Promise<Integration>;
  listIntegrations: () => Promise<Integration[]>;
  updateIntegration: (id: number, data: Partial<Integration>) => Promise<Integration>;
  deleteIntegration: (id: number) => Promise<boolean>;
  testIntegrationConnection: (id: number) => Promise<{ success: boolean; message: string }>;

  // Phase 2.3: Analytics APIs
  createScenario: (data: Scenario) => Promise<Scenario>;
  listScenarios: () => Promise<Scenario[]>;
  updateScenario: (id: number, data: Partial<Scenario>) => Promise<Scenario>;
  deleteScenario: (id: number) => Promise<boolean>;
  runScenario: (id: number) => Promise<any>;

  // Phase 2.4: Compliance APIs
  createComplianceReport: (data: ComplianceReport) => Promise<ComplianceReport>;
  listComplianceReports: (filters?: any) => Promise<ComplianceReport[]>;
  updateComplianceReport: (id: number, data: Partial<ComplianceReport>) => Promise<ComplianceReport>;
  deleteComplianceReport: (id: number) => Promise<boolean>;
  exportComplianceReport: (id: number, format: string) => Promise<string>;

  // Phase 2.5: User Management APIs
  createUserRole: (data: UserRole) => Promise<UserRole>;
  listUserRoles: () => Promise<UserRole[]>;
  updateUserRole: (id: number, data: Partial<UserRole>) => Promise<UserRole>;
  deleteUserRole: (id: number) => Promise<boolean>;
  createUser: (data: User) => Promise<User>;
  listUsers: () => Promise<User[]>;
  updateUser: (id: number, data: Partial<User>) => Promise<User>;
  deleteUser: (id: number) => Promise<boolean>;

  // Phase 3.1: AI/ML APIs
  detectAnomalies: (dataType: string, threshold?: number) => Promise<AnomalyDetection[]>;
  listAnomalies: (filters?: any) => Promise<AnomalyDetection[]>;
  resolveAnomaly: (id: number, resolution: string) => Promise<boolean>;
  createPredictiveModel: (data: PredictiveModel) => Promise<PredictiveModel>;
  listPredictiveModels: () => Promise<PredictiveModel[]>;
  trainModel: (id: number) => Promise<{ success: boolean; accuracy: number }>;
  predictMissingData: (dataType: string, context: any) => Promise<MLSuggestion[]>;
  listMLSuggestions: (filters?: any) => Promise<MLSuggestion[]>;
  acceptSuggestion: (id: number) => Promise<boolean>;
  rejectSuggestion: (id: number) => Promise<boolean>;

  // Phase 3.2: Target Management APIs
  createCarbonTarget: (data: CarbonTarget) => Promise<CarbonTarget>;
  listCarbonTargets: () => Promise<CarbonTarget[]>;
  updateCarbonTarget: (id: number, data: Partial<CarbonTarget>) => Promise<CarbonTarget>;
  deleteCarbonTarget: (id: number) => Promise<boolean>;
  validateSBTi: (id: number) => Promise<{ valid: boolean; feedback: string }>;
  createReductionProject: (data: ReductionProject) => Promise<ReductionProject>;
  listReductionProjects: (filters?: any) => Promise<ReductionProject[]>;
  updateReductionProject: (id: number, data: Partial<ReductionProject>) => Promise<ReductionProject>;
  deleteReductionProject: (id: number) => Promise<boolean>;
  calculateProjectROI: (id: number) => Promise<number>;
  createCarbonPricingScenario: (data: CarbonPricingScenario) => Promise<CarbonPricingScenario>;
  listCarbonPricingScenarios: () => Promise<CarbonPricingScenario[]>;
  updateCarbonPricingScenario: (id: number, data: Partial<CarbonPricingScenario>) => Promise<CarbonPricingScenario>;
  deleteCarbonPricingScenario: (id: number) => Promise<boolean>;

  // Phase 3.3: Supply Chain APIs
  createSupplierEngagement: (data: SupplierEngagement) => Promise<SupplierEngagement>;
  listSupplierEngagements: (filters?: any) => Promise<SupplierEngagement[]>;
  updateSupplierEngagement: (id: number, data: Partial<SupplierEngagement>) => Promise<SupplierEngagement>;
  deleteSupplierEngagement: (id: number) => Promise<boolean>;
  createSupplyChainMap: (data: SupplyChainMap) => Promise<SupplyChainMap>;
  listSupplyChainMaps: (filters?: any) => Promise<SupplyChainMap[]>;
  updateSupplyChainMap: (id: number, data: Partial<SupplyChainMap>) => Promise<SupplyChainMap>;
  deleteSupplyChainMap: (id: number) => Promise<boolean>;
  createSupplierAssessment: (data: SupplierAssessment) => Promise<SupplierAssessment>;
  listSupplierAssessments: (filters?: any) => Promise<SupplierAssessment[]>;
  updateSupplierAssessment: (id: number, data: Partial<SupplierAssessment>) => Promise<SupplierAssessment>;
  deleteSupplierAssessment: (id: number) => Promise<boolean>;
  generateSupplierReport: (supplierId: number) => Promise<string>;

  // Phase 3.4: Multi-Entity APIs
  createEntity: (data: Entity) => Promise<Entity>;
  listEntities: (filters?: any) => Promise<Entity[]>;
  updateEntity: (id: number, data: Partial<Entity>) => Promise<Entity>;
  deleteEntity: (id: number) => Promise<boolean>;
  getEntityHierarchy: () => Promise<any>;
  createRegionalCompliance: (data: RegionalCompliance) => Promise<RegionalCompliance>;
  listRegionalCompliance: (filters?: any) => Promise<RegionalCompliance[]>;
  updateRegionalCompliance: (id: number, data: Partial<RegionalCompliance>) => Promise<RegionalCompliance>;
  deleteRegionalCompliance: (id: number) => Promise<boolean>;
  createDataGovernancePolicy: (data: DataGovernancePolicy) => Promise<DataGovernancePolicy>;
  listDataGovernancePolicies: (filters?: any) => Promise<DataGovernancePolicy[]>;
  updateDataGovernancePolicy: (id: number, data: Partial<DataGovernancePolicy>) => Promise<DataGovernancePolicy>;
  deleteDataGovernancePolicy: (id: number) => Promise<boolean>;

  // Phase 3.5: Integration Ecosystem APIs
  listIntegrationPlugins: (filters?: any) => Promise<IntegrationPlugin[]>;
  installPlugin: (pluginId: number) => Promise<boolean>;
  uninstallPlugin: (pluginId: number) => Promise<boolean>;
  togglePlugin: (pluginId: number, isActive: boolean) => Promise<boolean>;
  createCustomCalculation: (data: CustomCalculation) => Promise<CustomCalculation>;
  listCustomCalculations: (filters?: any) => Promise<CustomCalculation[]>;
  updateCustomCalculation: (id: number, data: Partial<CustomCalculation>) => Promise<CustomCalculation>;
  deleteCustomCalculation: (id: number) => Promise<boolean>;
  executeCustomCalculation: (id: number, inputs: any) => Promise<number>;
  createAutomationWorkflow: (data: AutomationWorkflow) => Promise<AutomationWorkflow>;
  listAutomationWorkflows: (filters?: any) => Promise<AutomationWorkflow[]>;
  updateAutomationWorkflow: (id: number, data: Partial<AutomationWorkflow>) => Promise<AutomationWorkflow>;
  deleteAutomationWorkflow: (id: number) => Promise<boolean>;
  executeAutomationWorkflow: (id: number) => Promise<{ success: boolean; output: any }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
