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
});
