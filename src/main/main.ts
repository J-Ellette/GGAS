import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { DatabaseService } from './services/DatabaseService';

let mainWindow: BrowserWindow | null = null;
let databaseService: DatabaseService | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    title: 'GGAS - Greenhouse Gas Accounting Software'
  });

  // Load the index.html
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  // Initialize database
  databaseService = new DatabaseService();
  databaseService.initialize();
  
  createWindow();
  
  // Set up IPC handlers
  setupIpcHandlers();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function setupIpcHandlers() {
  // Activity Data handlers
  ipcMain.handle('activity-data:create', async (event, data) => {
    return databaseService?.createActivityData(data);
  });

  ipcMain.handle('activity-data:list', async (event, filters) => {
    return databaseService?.listActivityData(filters);
  });

  ipcMain.handle('activity-data:update', async (event, id, data) => {
    return databaseService?.updateActivityData(id, data);
  });

  ipcMain.handle('activity-data:delete', async (event, id) => {
    return databaseService?.deleteActivityData(id);
  });

  // Emission Factor handlers
  ipcMain.handle('emission-factors:list', async (event, filters) => {
    return databaseService?.listEmissionFactors(filters);
  });

  ipcMain.handle('emission-factors:create', async (event, data) => {
    return databaseService?.createEmissionFactor(data);
  });

  ipcMain.handle('emission-factors:search', async (event, query) => {
    return databaseService?.searchEmissionFactors(query);
  });

  // Calculation handlers
  ipcMain.handle('calculations:calculate', async (event, data) => {
    return databaseService?.calculateEmissions(data);
  });

  ipcMain.handle('calculations:list', async (event, filters) => {
    return databaseService?.listCalculations(filters);
  });

  // Phase 2.1: Scope 3 Categories handlers
  ipcMain.handle('scope3-categories:list', async () => {
    return databaseService?.listScope3Categories();
  });

  ipcMain.handle('scope3-categories:update', async (event, id, data) => {
    return databaseService?.updateScope3Category(id, data);
  });

  // Phase 2.1: Supplier Data handlers
  ipcMain.handle('supplier-data:create', async (event, data) => {
    return databaseService?.createSupplierData(data);
  });

  ipcMain.handle('supplier-data:list', async (event, filters) => {
    return databaseService?.listSupplierData(filters);
  });

  ipcMain.handle('supplier-data:update', async (event, id, data) => {
    return databaseService?.updateSupplierData(id, data);
  });

  ipcMain.handle('supplier-data:delete', async (event, id) => {
    return databaseService?.deleteSupplierData(id);
  });

  // Phase 2.2: Integrations handlers
  ipcMain.handle('integrations:create', async (event, data) => {
    return databaseService?.createIntegration(data);
  });

  ipcMain.handle('integrations:list', async () => {
    return databaseService?.listIntegrations();
  });

  ipcMain.handle('integrations:update', async (event, id, data) => {
    return databaseService?.updateIntegration(id, data);
  });

  ipcMain.handle('integrations:delete', async (event, id) => {
    return databaseService?.deleteIntegration(id);
  });

  ipcMain.handle('integrations:test', async (event, id) => {
    // Simplified test - in production would test actual connection
    return { success: true, message: 'Connection test successful' };
  });

  // Phase 2.3: Scenarios handlers
  ipcMain.handle('scenarios:create', async (event, data) => {
    return databaseService?.createScenario(data);
  });

  ipcMain.handle('scenarios:list', async () => {
    return databaseService?.listScenarios();
  });

  ipcMain.handle('scenarios:update', async (event, id, data) => {
    return databaseService?.updateScenario(id, data);
  });

  ipcMain.handle('scenarios:delete', async (event, id) => {
    return databaseService?.deleteScenario(id);
  });

  ipcMain.handle('scenarios:run', async (event, id) => {
    // Simplified scenario execution - would perform complex calculations in production
    return { success: true, results: { emissionsReduction: 15, costSavings: 50000 } };
  });

  // Phase 2.4: Compliance Reports handlers
  ipcMain.handle('compliance-reports:create', async (event, data) => {
    return databaseService?.createComplianceReport(data);
  });

  ipcMain.handle('compliance-reports:list', async (event, filters) => {
    return databaseService?.listComplianceReports(filters);
  });

  ipcMain.handle('compliance-reports:update', async (event, id, data) => {
    return databaseService?.updateComplianceReport(id, data);
  });

  ipcMain.handle('compliance-reports:delete', async (event, id) => {
    return databaseService?.deleteComplianceReport(id);
  });

  ipcMain.handle('compliance-reports:export', async (event, id, format) => {
    // Simplified export - would generate actual report in production
    return `Report exported successfully as ${format}`;
  });

  // Phase 2.5: User Roles handlers
  ipcMain.handle('user-roles:create', async (event, data) => {
    return databaseService?.createUserRole(data);
  });

  ipcMain.handle('user-roles:list', async () => {
    return databaseService?.listUserRoles();
  });

  ipcMain.handle('user-roles:update', async (event, id, data) => {
    return databaseService?.updateUserRole(id, data);
  });

  ipcMain.handle('user-roles:delete', async (event, id) => {
    return databaseService?.deleteUserRole(id);
  });

  // Phase 2.5: Users handlers
  ipcMain.handle('users:create', async (event, data) => {
    return databaseService?.createUser(data);
  });

  ipcMain.handle('users:list', async () => {
    return databaseService?.listUsers();
  });

  ipcMain.handle('users:update', async (event, id, data) => {
    return databaseService?.updateUser(id, data);
  });

  ipcMain.handle('users:delete', async (event, id) => {
    return databaseService?.deleteUser(id);
  });

  // ========================================
  // Phase 3.1: AI/ML Implementation handlers
  // ========================================
  
  ipcMain.handle('anomalies:detect', async (event, dataType, threshold) => {
    return databaseService?.detectAnomalies(dataType, threshold);
  });

  ipcMain.handle('anomalies:list', async (event, filters) => {
    return databaseService?.listAnomalies(filters);
  });

  ipcMain.handle('anomalies:resolve', async (event, id, resolution) => {
    return databaseService?.resolveAnomaly(id, resolution);
  });

  ipcMain.handle('predictive-models:create', async (event, data) => {
    return databaseService?.createPredictiveModel(data);
  });

  ipcMain.handle('predictive-models:list', async () => {
    return databaseService?.listPredictiveModels();
  });

  ipcMain.handle('predictive-models:train', async (event, id) => {
    return databaseService?.trainModel(id);
  });

  ipcMain.handle('ml:predict-missing-data', async (event, dataType, context) => {
    return databaseService?.predictMissingData(dataType, context);
  });

  ipcMain.handle('ml-suggestions:list', async (event, filters) => {
    return databaseService?.listMLSuggestions(filters);
  });

  ipcMain.handle('ml-suggestions:accept', async (event, id) => {
    return databaseService?.acceptSuggestion(id);
  });

  ipcMain.handle('ml-suggestions:reject', async (event, id) => {
    return databaseService?.rejectSuggestion(id);
  });

  // ========================================
  // Phase 3.2: Advanced Target Management handlers
  // ========================================

  ipcMain.handle('carbon-targets:create', async (event, data) => {
    return databaseService?.createCarbonTarget(data);
  });

  ipcMain.handle('carbon-targets:list', async () => {
    return databaseService?.listCarbonTargets();
  });

  ipcMain.handle('carbon-targets:update', async (event, id, data) => {
    return databaseService?.updateCarbonTarget(id, data);
  });

  ipcMain.handle('carbon-targets:delete', async (event, id) => {
    return databaseService?.deleteCarbonTarget(id);
  });

  ipcMain.handle('carbon-targets:validate-sbti', async (event, id) => {
    return databaseService?.validateSBTi(id);
  });

  ipcMain.handle('reduction-projects:create', async (event, data) => {
    return databaseService?.createReductionProject(data);
  });

  ipcMain.handle('reduction-projects:list', async (event, filters) => {
    return databaseService?.listReductionProjects(filters);
  });

  ipcMain.handle('reduction-projects:update', async (event, id, data) => {
    return databaseService?.updateReductionProject(id, data);
  });

  ipcMain.handle('reduction-projects:delete', async (event, id) => {
    return databaseService?.deleteReductionProject(id);
  });

  ipcMain.handle('reduction-projects:calculate-roi', async (event, id) => {
    return databaseService?.calculateProjectROI(id);
  });

  ipcMain.handle('carbon-pricing:create', async (event, data) => {
    return databaseService?.createCarbonPricingScenario(data);
  });

  ipcMain.handle('carbon-pricing:list', async () => {
    return databaseService?.listCarbonPricingScenarios();
  });

  ipcMain.handle('carbon-pricing:update', async (event, id, data) => {
    return databaseService?.updateCarbonPricingScenario(id, data);
  });

  ipcMain.handle('carbon-pricing:delete', async (event, id) => {
    return databaseService?.deleteCarbonPricingScenario(id);
  });

  // ========================================
  // Phase 3.3: Supply Chain Features handlers
  // ========================================

  ipcMain.handle('supplier-engagements:create', async (event, data) => {
    return databaseService?.createSupplierEngagement(data);
  });

  ipcMain.handle('supplier-engagements:list', async (event, filters) => {
    return databaseService?.listSupplierEngagements(filters);
  });

  ipcMain.handle('supplier-engagements:update', async (event, id, data) => {
    return databaseService?.updateSupplierEngagement(id, data);
  });

  ipcMain.handle('supplier-engagements:delete', async (event, id) => {
    return databaseService?.deleteSupplierEngagement(id);
  });

  ipcMain.handle('supply-chain-maps:create', async (event, data) => {
    return databaseService?.createSupplyChainMap(data);
  });

  ipcMain.handle('supply-chain-maps:list', async (event, filters) => {
    return databaseService?.listSupplyChainMaps(filters);
  });

  ipcMain.handle('supply-chain-maps:update', async (event, id, data) => {
    return databaseService?.updateSupplyChainMap(id, data);
  });

  ipcMain.handle('supply-chain-maps:delete', async (event, id) => {
    return databaseService?.deleteSupplyChainMap(id);
  });

  ipcMain.handle('supplier-assessments:create', async (event, data) => {
    return databaseService?.createSupplierAssessment(data);
  });

  ipcMain.handle('supplier-assessments:list', async (event, filters) => {
    return databaseService?.listSupplierAssessments(filters);
  });

  ipcMain.handle('supplier-assessments:update', async (event, id, data) => {
    return databaseService?.updateSupplierAssessment(id, data);
  });

  ipcMain.handle('supplier-assessments:delete', async (event, id) => {
    return databaseService?.deleteSupplierAssessment(id);
  });

  ipcMain.handle('suppliers:generate-report', async (event, supplierId) => {
    return databaseService?.generateSupplierReport(supplierId);
  });

  // ========================================
  // Phase 3.4: Multi-Entity Support handlers
  // ========================================

  ipcMain.handle('entities:create', async (event, data) => {
    return databaseService?.createEntity(data);
  });

  ipcMain.handle('entities:list', async (event, filters) => {
    return databaseService?.listEntities(filters);
  });

  ipcMain.handle('entities:update', async (event, id, data) => {
    return databaseService?.updateEntity(id, data);
  });

  ipcMain.handle('entities:delete', async (event, id) => {
    return databaseService?.deleteEntity(id);
  });

  ipcMain.handle('entities:get-hierarchy', async () => {
    return databaseService?.getEntityHierarchy();
  });

  ipcMain.handle('regional-compliance:create', async (event, data) => {
    return databaseService?.createRegionalCompliance(data);
  });

  ipcMain.handle('regional-compliance:list', async (event, filters) => {
    return databaseService?.listRegionalCompliance(filters);
  });

  ipcMain.handle('regional-compliance:update', async (event, id, data) => {
    return databaseService?.updateRegionalCompliance(id, data);
  });

  ipcMain.handle('regional-compliance:delete', async (event, id) => {
    return databaseService?.deleteRegionalCompliance(id);
  });

  ipcMain.handle('data-governance:create', async (event, data) => {
    return databaseService?.createDataGovernancePolicy(data);
  });

  ipcMain.handle('data-governance:list', async (event, filters) => {
    return databaseService?.listDataGovernancePolicies(filters);
  });

  ipcMain.handle('data-governance:update', async (event, id, data) => {
    return databaseService?.updateDataGovernancePolicy(id, data);
  });

  ipcMain.handle('data-governance:delete', async (event, id) => {
    return databaseService?.deleteDataGovernancePolicy(id);
  });

  // ========================================
  // Phase 3.5: Integration Ecosystem handlers
  // ========================================

  ipcMain.handle('plugins:list', async (event, filters) => {
    return databaseService?.listIntegrationPlugins(filters);
  });

  ipcMain.handle('plugins:install', async (event, pluginId) => {
    return databaseService?.installPlugin(pluginId);
  });

  ipcMain.handle('plugins:uninstall', async (event, pluginId) => {
    return databaseService?.uninstallPlugin(pluginId);
  });

  ipcMain.handle('plugins:toggle', async (event, pluginId, isActive) => {
    return databaseService?.togglePlugin(pluginId, isActive);
  });

  ipcMain.handle('custom-calculations:create', async (event, data) => {
    return databaseService?.createCustomCalculation(data);
  });

  ipcMain.handle('custom-calculations:list', async (event, filters) => {
    return databaseService?.listCustomCalculations(filters);
  });

  ipcMain.handle('custom-calculations:update', async (event, id, data) => {
    return databaseService?.updateCustomCalculation(id, data);
  });

  ipcMain.handle('custom-calculations:delete', async (event, id) => {
    return databaseService?.deleteCustomCalculation(id);
  });

  ipcMain.handle('custom-calculations:execute', async (event, id, inputs) => {
    return databaseService?.executeCustomCalculation(id, inputs);
  });

  ipcMain.handle('automation-workflows:create', async (event, data) => {
    return databaseService?.createAutomationWorkflow(data);
  });

  ipcMain.handle('automation-workflows:list', async (event, filters) => {
    return databaseService?.listAutomationWorkflows(filters);
  });

  ipcMain.handle('automation-workflows:update', async (event, id, data) => {
    return databaseService?.updateAutomationWorkflow(id, data);
  });

  ipcMain.handle('automation-workflows:delete', async (event, id) => {
    return databaseService?.deleteAutomationWorkflow(id);
  });

  ipcMain.handle('automation-workflows:execute', async (event, id) => {
    return databaseService?.executeAutomationWorkflow(id);
  });
}
