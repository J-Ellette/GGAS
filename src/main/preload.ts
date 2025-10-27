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

  // Phase 3.1: AI/ML Implementation API
  detectAnomalies: (dataType: string, threshold?: number) => ipcRenderer.invoke('anomalies:detect', dataType, threshold),
  listAnomalies: (filters?: any) => ipcRenderer.invoke('anomalies:list', filters),
  resolveAnomaly: (id: number, resolution: string) => ipcRenderer.invoke('anomalies:resolve', id, resolution),
  createPredictiveModel: (data: any) => ipcRenderer.invoke('predictive-models:create', data),
  listPredictiveModels: () => ipcRenderer.invoke('predictive-models:list'),
  trainModel: (id: number) => ipcRenderer.invoke('predictive-models:train', id),
  predictMissingData: (dataType: string, context: any) => ipcRenderer.invoke('ml:predict-missing-data', dataType, context),
  listMLSuggestions: (filters?: any) => ipcRenderer.invoke('ml-suggestions:list', filters),
  acceptSuggestion: (id: number) => ipcRenderer.invoke('ml-suggestions:accept', id),
  rejectSuggestion: (id: number) => ipcRenderer.invoke('ml-suggestions:reject', id),

  // Phase 3.2: Advanced Target Management API
  createCarbonTarget: (data: any) => ipcRenderer.invoke('carbon-targets:create', data),
  listCarbonTargets: () => ipcRenderer.invoke('carbon-targets:list'),
  updateCarbonTarget: (id: number, data: any) => ipcRenderer.invoke('carbon-targets:update', id, data),
  deleteCarbonTarget: (id: number) => ipcRenderer.invoke('carbon-targets:delete', id),
  validateSBTi: (id: number) => ipcRenderer.invoke('carbon-targets:validate-sbti', id),
  createReductionProject: (data: any) => ipcRenderer.invoke('reduction-projects:create', data),
  listReductionProjects: (filters?: any) => ipcRenderer.invoke('reduction-projects:list', filters),
  updateReductionProject: (id: number, data: any) => ipcRenderer.invoke('reduction-projects:update', id, data),
  deleteReductionProject: (id: number) => ipcRenderer.invoke('reduction-projects:delete', id),
  calculateProjectROI: (id: number) => ipcRenderer.invoke('reduction-projects:calculate-roi', id),
  createCarbonPricingScenario: (data: any) => ipcRenderer.invoke('carbon-pricing:create', data),
  listCarbonPricingScenarios: () => ipcRenderer.invoke('carbon-pricing:list'),
  updateCarbonPricingScenario: (id: number, data: any) => ipcRenderer.invoke('carbon-pricing:update', id, data),
  deleteCarbonPricingScenario: (id: number) => ipcRenderer.invoke('carbon-pricing:delete', id),

  // Phase 3.3: Supply Chain Features API
  createSupplierEngagement: (data: any) => ipcRenderer.invoke('supplier-engagements:create', data),
  listSupplierEngagements: (filters?: any) => ipcRenderer.invoke('supplier-engagements:list', filters),
  updateSupplierEngagement: (id: number, data: any) => ipcRenderer.invoke('supplier-engagements:update', id, data),
  deleteSupplierEngagement: (id: number) => ipcRenderer.invoke('supplier-engagements:delete', id),
  createSupplyChainMap: (data: any) => ipcRenderer.invoke('supply-chain-maps:create', data),
  listSupplyChainMaps: (filters?: any) => ipcRenderer.invoke('supply-chain-maps:list', filters),
  updateSupplyChainMap: (id: number, data: any) => ipcRenderer.invoke('supply-chain-maps:update', id, data),
  deleteSupplyChainMap: (id: number) => ipcRenderer.invoke('supply-chain-maps:delete', id),
  createSupplierAssessment: (data: any) => ipcRenderer.invoke('supplier-assessments:create', data),
  listSupplierAssessments: (filters?: any) => ipcRenderer.invoke('supplier-assessments:list', filters),
  updateSupplierAssessment: (id: number, data: any) => ipcRenderer.invoke('supplier-assessments:update', id, data),
  deleteSupplierAssessment: (id: number) => ipcRenderer.invoke('supplier-assessments:delete', id),
  generateSupplierReport: (supplierId: number) => ipcRenderer.invoke('suppliers:generate-report', supplierId),

  // Phase 3.4: Multi-Entity Support API
  createEntity: (data: any) => ipcRenderer.invoke('entities:create', data),
  listEntities: (filters?: any) => ipcRenderer.invoke('entities:list', filters),
  updateEntity: (id: number, data: any) => ipcRenderer.invoke('entities:update', id, data),
  deleteEntity: (id: number) => ipcRenderer.invoke('entities:delete', id),
  getEntityHierarchy: () => ipcRenderer.invoke('entities:get-hierarchy'),
  createRegionalCompliance: (data: any) => ipcRenderer.invoke('regional-compliance:create', data),
  listRegionalCompliance: (filters?: any) => ipcRenderer.invoke('regional-compliance:list', filters),
  updateRegionalCompliance: (id: number, data: any) => ipcRenderer.invoke('regional-compliance:update', id, data),
  deleteRegionalCompliance: (id: number) => ipcRenderer.invoke('regional-compliance:delete', id),
  createDataGovernancePolicy: (data: any) => ipcRenderer.invoke('data-governance:create', data),
  listDataGovernancePolicies: (filters?: any) => ipcRenderer.invoke('data-governance:list', filters),
  updateDataGovernancePolicy: (id: number, data: any) => ipcRenderer.invoke('data-governance:update', id, data),
  deleteDataGovernancePolicy: (id: number) => ipcRenderer.invoke('data-governance:delete', id),

  // Phase 3.5: Integration Ecosystem API
  listIntegrationPlugins: (filters?: any) => ipcRenderer.invoke('plugins:list', filters),
  installPlugin: (pluginId: number) => ipcRenderer.invoke('plugins:install', pluginId),
  uninstallPlugin: (pluginId: number) => ipcRenderer.invoke('plugins:uninstall', pluginId),
  togglePlugin: (pluginId: number, isActive: boolean) => ipcRenderer.invoke('plugins:toggle', pluginId, isActive),
  createCustomCalculation: (data: any) => ipcRenderer.invoke('custom-calculations:create', data),
  listCustomCalculations: (filters?: any) => ipcRenderer.invoke('custom-calculations:list', filters),
  updateCustomCalculation: (id: number, data: any) => ipcRenderer.invoke('custom-calculations:update', id, data),
  deleteCustomCalculation: (id: number) => ipcRenderer.invoke('custom-calculations:delete', id),
  executeCustomCalculation: (id: number, inputs: any) => ipcRenderer.invoke('custom-calculations:execute', id, inputs),
  createAutomationWorkflow: (data: any) => ipcRenderer.invoke('automation-workflows:create', data),
  listAutomationWorkflows: (filters?: any) => ipcRenderer.invoke('automation-workflows:list', filters),
  updateAutomationWorkflow: (id: number, data: any) => ipcRenderer.invoke('automation-workflows:update', id, data),
  deleteAutomationWorkflow: (id: number) => ipcRenderer.invoke('automation-workflows:delete', id),
  executeAutomationWorkflow: (id: number) => ipcRenderer.invoke('automation-workflows:execute', id),
});
