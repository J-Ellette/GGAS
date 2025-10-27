import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Activity Data API
  createActivityData: (data: any) => ipcRenderer.invoke('activity-data:create', data),
  listActivityData: (filters?: any) => ipcRenderer.invoke('activity-data:list', filters),
  updateActivityData: (id: number, data: any) => ipcRenderer.invoke('activity-data:update', id, data),
  deleteActivityData: (id: number) => ipcRenderer.invoke('activity-data:delete', id),

  // Emission Factors API
  listEmissionFactors: (filters?: any) => ipcRenderer.invoke('emission-factors:list', filters),
  createEmissionFactor: (data: any) => ipcRenderer.invoke('emission-factors:create', data),
  searchEmissionFactors: (query: string) => ipcRenderer.invoke('emission-factors:search', query),

  // Calculations API
  calculateEmissions: (data: any) => ipcRenderer.invoke('calculations:calculate', data),
  listCalculations: (filters?: any) => ipcRenderer.invoke('calculations:list', filters),

  // Phase 2.1: Scope 3 Categories API
  listScope3Categories: () => ipcRenderer.invoke('scope3-categories:list'),
  updateScope3Category: (id: number, data: any) => ipcRenderer.invoke('scope3-categories:update', id, data),

  // Phase 2.1: Supplier Data API
  createSupplierData: (data: any) => ipcRenderer.invoke('supplier-data:create', data),
  listSupplierData: (filters?: any) => ipcRenderer.invoke('supplier-data:list', filters),
  updateSupplierData: (id: number, data: any) => ipcRenderer.invoke('supplier-data:update', id, data),
  deleteSupplierData: (id: number) => ipcRenderer.invoke('supplier-data:delete', id),

  // Phase 2.2: Integrations API
  createIntegration: (data: any) => ipcRenderer.invoke('integrations:create', data),
  listIntegrations: () => ipcRenderer.invoke('integrations:list'),
  updateIntegration: (id: number, data: any) => ipcRenderer.invoke('integrations:update', id, data),
  deleteIntegration: (id: number) => ipcRenderer.invoke('integrations:delete', id),
  testIntegrationConnection: (id: number) => ipcRenderer.invoke('integrations:test', id),

  // Phase 2.3: Scenarios API
  createScenario: (data: any) => ipcRenderer.invoke('scenarios:create', data),
  listScenarios: () => ipcRenderer.invoke('scenarios:list'),
  updateScenario: (id: number, data: any) => ipcRenderer.invoke('scenarios:update', id, data),
  deleteScenario: (id: number) => ipcRenderer.invoke('scenarios:delete', id),
  runScenario: (id: number) => ipcRenderer.invoke('scenarios:run', id),

  // Phase 2.4: Compliance Reports API
  createComplianceReport: (data: any) => ipcRenderer.invoke('compliance-reports:create', data),
  listComplianceReports: (filters?: any) => ipcRenderer.invoke('compliance-reports:list', filters),
  updateComplianceReport: (id: number, data: any) => ipcRenderer.invoke('compliance-reports:update', id, data),
  deleteComplianceReport: (id: number) => ipcRenderer.invoke('compliance-reports:delete', id),
  exportComplianceReport: (id: number, format: string) => ipcRenderer.invoke('compliance-reports:export', id, format),

  // Phase 2.5: User Roles API
  createUserRole: (data: any) => ipcRenderer.invoke('user-roles:create', data),
  listUserRoles: () => ipcRenderer.invoke('user-roles:list'),
  updateUserRole: (id: number, data: any) => ipcRenderer.invoke('user-roles:update', id, data),
  deleteUserRole: (id: number) => ipcRenderer.invoke('user-roles:delete', id),

  // Phase 2.5: Users API
  createUser: (data: any) => ipcRenderer.invoke('users:create', data),
  listUsers: () => ipcRenderer.invoke('users:list'),
  updateUser: (id: number, data: any) => ipcRenderer.invoke('users:update', id, data),
  deleteUser: (id: number) => ipcRenderer.invoke('users:delete', id),
});
