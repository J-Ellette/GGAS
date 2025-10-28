import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { DatabaseService } from './services/DatabaseService';

let mainWindow: BrowserWindow | null = null;
let databaseService: DatabaseService | null = null;
let handlersInitialized = false;

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
    title: 'Green Country: Greenhouse Gas Accounting Software'
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
  
  // Set up IPC handlers only once
  if (!handlersInitialized) {
    setupIpcHandlers();
    handlersInitialized = true;
  }
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

  // Phase 4.1: Next-Gen Analytics IPC Handlers
  ipcMain.handle('deep-learning-models:create', async (event, data) => {
    return databaseService?.createDeepLearningModel(data);
  });

  ipcMain.handle('deep-learning-models:list', async (event, filters) => {
    return databaseService?.listDeepLearningModels(filters);
  });

  ipcMain.handle('deep-learning-models:update', async (event, id, data) => {
    return databaseService?.updateDeepLearningModel(id, data);
  });

  ipcMain.handle('deep-learning-models:delete', async (event, id) => {
    return databaseService?.deleteDeepLearningModel(id);
  });

  ipcMain.handle('deep-learning-models:train', async (event, id) => {
    return databaseService?.trainDeepLearningModel(id);
  });

  ipcMain.handle('deep-learning-models:get-insights', async (event, id) => {
    return databaseService?.getModelInsights(id);
  });

  ipcMain.handle('strategy-recommendations:create', async (event, data) => {
    return databaseService?.createStrategyRecommendation(data);
  });

  ipcMain.handle('strategy-recommendations:list', async (event, filters) => {
    return databaseService?.listStrategyRecommendations(filters);
  });

  ipcMain.handle('strategy-recommendations:update', async (event, id, data) => {
    return databaseService?.updateStrategyRecommendation(id, data);
  });

  ipcMain.handle('strategy-recommendations:delete', async (event, id) => {
    return databaseService?.deleteStrategyRecommendation(id);
  });

  ipcMain.handle('strategy-recommendations:generate', async (event, context) => {
    return databaseService?.generateRecommendations(context);
  });

  ipcMain.handle('automated-insights:list', async (event, filters) => {
    return databaseService?.listAutomatedInsights(filters);
  });

  ipcMain.handle('automated-insights:generate-report', async (event, filters) => {
    return databaseService?.generateInsightsReport(filters);
  });

  ipcMain.handle('digital-twins:create', async (event, data) => {
    return databaseService?.createDigitalTwin(data);
  });

  ipcMain.handle('digital-twins:list', async (event, filters) => {
    return databaseService?.listDigitalTwins(filters);
  });

  ipcMain.handle('digital-twins:update', async (event, id, data) => {
    return databaseService?.updateDigitalTwin(id, data);
  });

  ipcMain.handle('digital-twins:delete', async (event, id) => {
    return databaseService?.deleteDigitalTwin(id);
  });

  ipcMain.handle('digital-twins:sync-data', async (event, id) => {
    return databaseService?.syncDigitalTwinData(id);
  });

  // Phase 4.2: Enhanced Verification & Trust IPC Handlers
  ipcMain.handle('verification-workflows:create', async (event, data) => {
    return databaseService?.createVerificationWorkflow(data);
  });

  ipcMain.handle('verification-workflows:list', async (event, filters) => {
    return databaseService?.listVerificationWorkflows(filters);
  });

  ipcMain.handle('verification-workflows:update', async (event, id, data) => {
    return databaseService?.updateVerificationWorkflow(id, data);
  });

  ipcMain.handle('verification-workflows:delete', async (event, id) => {
    return databaseService?.deleteVerificationWorkflow(id);
  });

  ipcMain.handle('verification-workflows:advance-step', async (event, id) => {
    return databaseService?.advanceWorkflowStep(id);
  });

  ipcMain.handle('audit-trail:get', async (event, entityType, entityId) => {
    return databaseService?.getAuditTrail(entityType, entityId);
  });

  ipcMain.handle('audit-trail:verify-integrity', async (event, entityType, entityId) => {
    return databaseService?.verifyAuditTrailIntegrity(entityType, entityId);
  });

  ipcMain.handle('third-party-verifiers:create', async (event, data) => {
    return databaseService?.createThirdPartyVerifier(data);
  });

  ipcMain.handle('third-party-verifiers:list', async (event, filters) => {
    return databaseService?.listThirdPartyVerifiers(filters);
  });

  ipcMain.handle('third-party-verifiers:update', async (event, id, data) => {
    return databaseService?.updateThirdPartyVerifier(id, data);
  });

  ipcMain.handle('third-party-verifiers:delete', async (event, id) => {
    return databaseService?.deleteThirdPartyVerifier(id);
  });

  ipcMain.handle('third-party-verifiers:request-verification', async (event, verifierId, dataScope) => {
    return databaseService?.requestVerification(verifierId, dataScope);
  });

  ipcMain.handle('data-provenance:get', async (event, dataType, dataId) => {
    return databaseService?.getDataProvenance(dataType, dataId);
  });

  ipcMain.handle('data-provenance:trace-lineage', async (event, dataType, dataId) => {
    return databaseService?.traceDataLineage(dataType, dataId);
  });

  ipcMain.handle('data-provenance:validate-compliance', async (event, dataType, dataId) => {
    return databaseService?.validateDataCompliance(dataType, dataId);
  });

  // Phase 4.3: IoT & Real-Time Monitoring IPC Handlers
  ipcMain.handle('iot-devices:create', async (event, data) => {
    return databaseService?.createIoTDevice(data);
  });

  ipcMain.handle('iot-devices:list', async (event, filters) => {
    return databaseService?.listIoTDevices(filters);
  });

  ipcMain.handle('iot-devices:update', async (event, id, data) => {
    return databaseService?.updateIoTDevice(id, data);
  });

  ipcMain.handle('iot-devices:delete', async (event, id) => {
    return databaseService?.deleteIoTDevice(id);
  });

  ipcMain.handle('iot-devices:discover', async (event, networkConfig) => {
    return databaseService?.discoverIoTDevices(networkConfig);
  });

  ipcMain.handle('iot-devices:test-connection', async (event, id) => {
    return databaseService?.testDeviceConnection(id);
  });

  ipcMain.handle('realtime-monitors:create', async (event, data) => {
    return databaseService?.createRealtimeMonitor(data);
  });

  ipcMain.handle('realtime-monitors:list', async (event, filters) => {
    return databaseService?.listRealtimeMonitors(filters);
  });

  ipcMain.handle('realtime-monitors:update', async (event, id, data) => {
    return databaseService?.updateRealtimeMonitor(id, data);
  });

  ipcMain.handle('realtime-monitors:delete', async (event, id) => {
    return databaseService?.deleteRealtimeMonitor(id);
  });

  ipcMain.handle('realtime-monitors:get-data', async (event, monitorId) => {
    return databaseService?.getRealtimeData(monitorId);
  });

  ipcMain.handle('sensor-data:list', async (event, deviceId, filters) => {
    return databaseService?.listSensorData(deviceId, filters);
  });

  ipcMain.handle('sensor-data:process', async (event, deviceId, startTime, endTime) => {
    return databaseService?.processSensorData(deviceId, startTime, endTime);
  });

  ipcMain.handle('alert-rules:create', async (event, data) => {
    return databaseService?.createAlertRule(data);
  });

  ipcMain.handle('alert-rules:list', async (event, filters) => {
    return databaseService?.listAlertRules(filters);
  });

  ipcMain.handle('alert-rules:update', async (event, id, data) => {
    return databaseService?.updateAlertRule(id, data);
  });

  ipcMain.handle('alert-rules:delete', async (event, id) => {
    return databaseService?.deleteAlertRule(id);
  });

  ipcMain.handle('alert-rules:test', async (event, id) => {
    return databaseService?.testAlertRule(id);
  });

  ipcMain.handle('alerts:get-active', async (event, filters) => {
    return databaseService?.getActiveAlerts(filters);
  });

  // Phase 4.4: Advanced Visualization & Immersive Experience IPC Handlers
  ipcMain.handle('facility-3d-models:create', async (event, data) => {
    return databaseService?.createFacility3DModel(data);
  });

  ipcMain.handle('facility-3d-models:list', async (event, filters) => {
    return databaseService?.listFacility3DModels(filters);
  });

  ipcMain.handle('facility-3d-models:update', async (event, id, data) => {
    return databaseService?.updateFacility3DModel(id, data);
  });

  ipcMain.handle('facility-3d-models:delete', async (event, id) => {
    return databaseService?.deleteFacility3DModel(id);
  });

  ipcMain.handle('facility-3d-models:export', async (event, id, format) => {
    return databaseService?.exportFacility3DModel(id, format);
  });

  ipcMain.handle('ar-data-collections:create', async (event, data) => {
    return databaseService?.createARDataCollection(data);
  });

  ipcMain.handle('ar-data-collections:list', async (event, filters) => {
    return databaseService?.listARDataCollections(filters);
  });

  ipcMain.handle('ar-data-collections:update', async (event, id, data) => {
    return databaseService?.updateARDataCollection(id, data);
  });

  ipcMain.handle('ar-data-collections:delete', async (event, id) => {
    return databaseService?.deleteARDataCollection(id);
  });

  ipcMain.handle('training-modules:create', async (event, data) => {
    return databaseService?.createTrainingModule(data);
  });

  ipcMain.handle('training-modules:list', async (event, filters) => {
    return databaseService?.listTrainingModules(filters);
  });

  ipcMain.handle('training-modules:update', async (event, id, data) => {
    return databaseService?.updateTrainingModule(id, data);
  });

  ipcMain.handle('training-modules:delete', async (event, id) => {
    return databaseService?.deleteTrainingModule(id);
  });

  ipcMain.handle('training-progress:get', async (event, userId, moduleId) => {
    return databaseService?.getTrainingProgress(userId, moduleId);
  });

  ipcMain.handle('training-progress:update', async (event, id, data) => {
    return databaseService?.updateTrainingProgress(id, data);
  });

  ipcMain.handle('training-progress:issue-certificate', async (event, userId, moduleId) => {
    return databaseService?.issueTrainingCertificate(userId, moduleId);
  });

  ipcMain.handle('data-stories:create', async (event, data) => {
    return databaseService?.createDataStory(data);
  });

  ipcMain.handle('data-stories:list', async (event, filters) => {
    return databaseService?.listDataStories(filters);
  });

  ipcMain.handle('data-stories:update', async (event, id, data) => {
    return databaseService?.updateDataStory(id, data);
  });

  ipcMain.handle('data-stories:delete', async (event, id) => {
    return databaseService?.deleteDataStory(id);
  });

  ipcMain.handle('data-stories:generate-narrative', async (event, storyId) => {
    return databaseService?.generateDataStoryNarrative(storyId);
  });

  // Phase 4.5: Platform Optimization & Future-Proofing IPC Handlers
  ipcMain.handle('cache:get-stats', async () => {
    return databaseService?.getCacheStats();
  });

  ipcMain.handle('cache:clear', async (event, cacheType) => {
    return databaseService?.clearCache(cacheType);
  });

  ipcMain.handle('cache:optimize', async () => {
    return databaseService?.optimizeCache();
  });

  ipcMain.handle('distributed-jobs:create', async (event, data) => {
    return databaseService?.createDistributedJob(data);
  });

  ipcMain.handle('distributed-jobs:list', async (event, filters) => {
    return databaseService?.listDistributedJobs(filters);
  });

  ipcMain.handle('distributed-jobs:get-progress', async (event, id) => {
    return databaseService?.getJobProgress(id);
  });

  ipcMain.handle('distributed-jobs:cancel', async (event, id) => {
    return databaseService?.cancelDistributedJob(id);
  });

  ipcMain.handle('resource-metrics:get', async (event, timeRange) => {
    return databaseService?.getResourceMetrics(timeRange);
  });

  ipcMain.handle('resource-metrics:optimize', async () => {
    return databaseService?.optimizeResources();
  });

  ipcMain.handle('security-configs:get', async () => {
    return databaseService?.getSecurityConfigs();
  });

  ipcMain.handle('security-configs:update', async (event, id, data) => {
    return databaseService?.updateSecurityConfig(id, data);
  });

  ipcMain.handle('security:audit', async () => {
    return databaseService?.auditSecurity();
  });

  ipcMain.handle('encryption-keys:list', async () => {
    return databaseService?.listEncryptionKeys();
  });

  ipcMain.handle('encryption-keys:create', async (event, data) => {
    return databaseService?.createEncryptionKey(data);
  });

  ipcMain.handle('encryption-keys:rotate', async (event, id) => {
    return databaseService?.rotateEncryptionKey(id);
  });

  ipcMain.handle('encryption-keys:test-quantum-resistance', async (event, keyId) => {
    return databaseService?.testQuantumResistance(keyId);
  });

  // ===============================================
  // Phase 5: Predictive Carbon Intelligence IPC Handlers
  // ===============================================

  // Phase 5.1: Advanced Forecasting Engine
  ipcMain.handle('forecasts:create', async (event, data) => {
    return databaseService?.createEmissionForecast(data);
  });

  ipcMain.handle('forecasts:list', async (event, filters) => {
    return databaseService?.listEmissionForecasts(filters);
  });

  ipcMain.handle('forecasts:get', async (event, id) => {
    return databaseService?.getEmissionForecast(id);
  });

  ipcMain.handle('forecasts:update', async (event, id, data) => {
    return databaseService?.updateEmissionForecast(id, data);
  });

  ipcMain.handle('forecasting-factors:create', async (event, data) => {
    return databaseService?.createForecastingFactor(data);
  });

  ipcMain.handle('forecasting-factors:list', async (event, filters) => {
    return databaseService?.listForecastingFactors(filters);
  });

  ipcMain.handle('forecasts:run-multi-factor', async (event, params) => {
    return databaseService?.runMultiFactorForecast(params);
  });

  ipcMain.handle('ml:train-lstm', async (event, params) => {
    return databaseService?.trainLSTMModel(params);
  });

  // Phase 5.2: Carbon Budget Management
  ipcMain.handle('carbon-budgets:create', async (event, data) => {
    return databaseService?.createCarbonBudget(data);
  });

  ipcMain.handle('carbon-budgets:list', async (event, filters) => {
    return databaseService?.listCarbonBudgets(filters);
  });

  ipcMain.handle('carbon-budgets:get', async (event, id) => {
    return databaseService?.getCarbonBudget(id);
  });

  ipcMain.handle('carbon-budgets:update-consumption', async (event, id, amount) => {
    return databaseService?.updateCarbonBudgetConsumption(id, amount);
  });

  ipcMain.handle('budget-allocations:create', async (event, data) => {
    return databaseService?.allocateBudget(data);
  });

  ipcMain.handle('budget-allocations:list', async (event, budgetId) => {
    return databaseService?.listBudgetAllocations(budgetId);
  });

  ipcMain.handle('budget-allocations:optimize', async (event, budgetId) => {
    return databaseService?.optimizeBudgetAllocation(budgetId);
  });

  ipcMain.handle('budget-variances:create', async (event, data) => {
    return databaseService?.createBudgetVariance(data);
  });

  ipcMain.handle('budget-variances:list', async (event, budgetId) => {
    return databaseService?.listBudgetVariances(budgetId);
  });

  // Phase 5.3: Early Warning System
  ipcMain.handle('predictive-alerts:create', async (event, data) => {
    return databaseService?.createPredictiveAlert(data);
  });

  ipcMain.handle('predictive-alerts:list', async (event, filters) => {
    return databaseService?.listPredictiveAlerts(filters);
  });

  ipcMain.handle('predictive-alerts:acknowledge', async (event, id) => {
    return databaseService?.acknowledgeAlert(id);
  });

  ipcMain.handle('predictive-alerts:resolve', async (event, id) => {
    return databaseService?.resolveAlert(id);
  });

  ipcMain.handle('early-warnings:create-trigger', async (event, data) => {
    return databaseService?.createEarlyWarningTrigger(data);
  });

  ipcMain.handle('early-warnings:list-triggers', async (event, activeOnly) => {
    return databaseService?.listEarlyWarningTriggers(activeOnly);
  });

  ipcMain.handle('early-warnings:evaluate', async () => {
    return databaseService?.evaluateWarningTriggers();
  });

  ipcMain.handle('action-plans:create', async (event, data) => {
    return databaseService?.createActionPlan(data);
  });

  ipcMain.handle('action-plans:list', async (event, filters) => {
    return databaseService?.listActionPlans(filters);
  });

  ipcMain.handle('action-plans:activate', async (event, id) => {
    return databaseService?.activateActionPlan(id);
  });

  // Phase 5.4: Scenario Planning Suite
  ipcMain.handle('scenario-simulations:create', async (event, data) => {
    return databaseService?.createScenarioSimulation(data);
  });

  ipcMain.handle('scenario-simulations:list', async (event, filters) => {
    return databaseService?.listScenarioSimulations(filters);
  });

  ipcMain.handle('scenarios:run-monte-carlo', async (event, params) => {
    return databaseService?.runMonteCarloSimulation(params);
  });

  ipcMain.handle('sensitivity-analysis:run', async (event, params) => {
    return databaseService?.runSensitivityAnalysis(params);
  });

  ipcMain.handle('sensitivity-analysis:list', async () => {
    return databaseService?.listSensitivityAnalyses();
  });

  // Phase 5.5: Enterprise Features
  ipcMain.handle('enterprise-forecasts:create', async (event, data) => {
    return databaseService?.createEnterpriseForecast(data);
  });

  ipcMain.handle('enterprise-forecasts:list', async (event, filters) => {
    return databaseService?.listEnterpriseForecasts(filters);
  });

  ipcMain.handle('enterprise-forecasts:publish', async (event, id) => {
    return databaseService?.publishEnterpriseForecast(id);
  });

  ipcMain.handle('executive-dashboard:generate', async (event, params) => {
    return databaseService?.generateExecutiveDashboard(params);
  });

  ipcMain.handle('ml-training-data:create', async (event, data) => {
    return databaseService?.createMLTrainingDataset(data);
  });

  ipcMain.handle('ml-training-data:list', async (event, filters) => {
    return databaseService?.listMLTrainingDatasets(filters);
  });

  ipcMain.handle('model-performance:get', async (event, modelId) => {
    return databaseService?.getModelPerformanceMetrics(modelId);
  });

  // AI-Optional Framework handlers
  ipcMain.handle('ai-features:list', async (event, filters) => {
    return databaseService?.listAIFeatureToggles(filters);
  });

  ipcMain.handle('ai-features:get', async (event, featureKey) => {
    return databaseService?.getAIFeatureToggle(featureKey);
  });

  ipcMain.handle('ai-features:update', async (event, featureKey, isEnabled, updatedBy) => {
    return databaseService?.updateAIFeatureToggle(featureKey, isEnabled, updatedBy);
  });

  ipcMain.handle('ai-features:check-enabled', async (event, featureKey) => {
    return databaseService?.checkAIFeatureEnabled(featureKey);
  });

  ipcMain.handle('ai-operation-modes:list', async () => {
    return databaseService?.listAIOperationModes();
  });

  ipcMain.handle('ai-operation-modes:get-active', async () => {
    return databaseService?.getActiveOperationMode();
  });

  ipcMain.handle('ai-operation-modes:set-active', async (event, modeName, configuredBy) => {
    return databaseService?.setActiveOperationMode(modeName, configuredBy);
  });

  ipcMain.handle('ai-audit:list', async (event, filters) => {
    return databaseService?.listAIUsageAudit(filters);
  });

  ipcMain.handle('ai-policies:create', async (event, policy) => {
    return databaseService?.createAIPolicy(policy);
  });

  ipcMain.handle('ai-policies:list', async (event, filters) => {
    return databaseService?.listAIPolicies(filters);
  });

  ipcMain.handle('ai-policies:update', async (event, id, updates) => {
    return databaseService?.updateAIPolicy(id, updates);
  });

  ipcMain.handle('ai-performance:record', async (event, metric) => {
    return databaseService?.recordAIPerformanceMetric(metric);
  });

  ipcMain.handle('ai-performance:get', async (event, filters) => {
    return databaseService?.getAIPerformanceMetrics(filters);
  });

  ipcMain.handle('ai-performance:compare', async (event, featureKey) => {
    return databaseService?.getAIFeatureComparison(featureKey);
  });
}
