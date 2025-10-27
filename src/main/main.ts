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
}
