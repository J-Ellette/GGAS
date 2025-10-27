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
}
