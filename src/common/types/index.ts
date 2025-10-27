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
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
