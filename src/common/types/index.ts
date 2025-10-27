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

export interface ElectronAPI {
  createActivityData: (data: ActivityData) => Promise<ActivityData>;
  listActivityData: (filters?: any) => Promise<ActivityData[]>;
  updateActivityData: (id: number, data: Partial<ActivityData>) => Promise<ActivityData>;
  deleteActivityData: (id: number) => Promise<boolean>;
  
  listEmissionFactors: (filters?: any) => Promise<EmissionFactor[]>;
  createEmissionFactor: (data: EmissionFactor) => Promise<EmissionFactor>;
  searchEmissionFactors: (query: string) => Promise<EmissionFactor[]>;
  
  calculateEmissions: (data: any) => Promise<Calculation>;
  listCalculations: (filters?: any) => Promise<Calculation[]>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
