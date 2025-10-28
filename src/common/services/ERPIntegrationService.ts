/**
 * ERP Integration Service
 * Live data feeds from enterprise resource planning systems
 */

export interface ERPConnection {
  systemType: 'SAP' | 'Oracle' | 'Microsoft Dynamics' | 'NetSuite' | 'Workday';
  connectionId: string;
  hostname: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  credentials?: {
    username: string;
    encrypted: boolean;
  };
}

export interface ERPDataFeed {
  feedId: string;
  dataType: 'energy' | 'materials' | 'transportation' | 'waste' | 'production';
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  lastUpdate: Date;
  recordCount: number;
  status: 'active' | 'paused' | 'error';
}

export interface ERPEnergyData {
  timestamp: Date;
  facilityId: string;
  energyType: 'electricity' | 'natural_gas' | 'steam' | 'diesel' | 'other';
  consumption: number;
  unit: string;
  cost: number;
  currency: string;
  source: string;
}

export interface ERPMaterialData {
  timestamp: Date;
  materialId: string;
  materialName: string;
  quantity: number;
  unit: string;
  cost: number;
  currency: string;
  supplier: string;
  category: string;
}

export interface ERPTransportationData {
  timestamp: Date;
  tripId: string;
  vehicleType: string;
  distance: number;
  unit: 'km' | 'miles';
  fuelType: string;
  fuelConsumed: number;
  origin: string;
  destination: string;
  cost: number;
}

export interface ERPProductionData {
  timestamp: Date;
  productionLine: string;
  productId: string;
  quantity: number;
  unit: string;
  energyConsumed: number;
  materialsUsed: { material: string; quantity: number; unit: string }[];
  wasteGenerated: number;
  duration: number; // hours
}

export interface ERPSyncResult {
  feedId: string;
  recordsProcessed: number;
  recordsAdded: number;
  recordsUpdated: number;
  recordsFailed: number;
  errors: string[];
  syncTime: Date;
  duration: number; // milliseconds
}

export class ERPIntegrationService {
  private connections: Map<string, ERPConnection> = new Map();
  private dataFeeds: Map<string, ERPDataFeed> = new Map();

  /**
   * Establish connection to ERP system
   */
  async connectToERP(config: {
    systemType: 'SAP' | 'Oracle' | 'Microsoft Dynamics' | 'NetSuite' | 'Workday';
    hostname: string;
    username: string;
    password: string;
    database?: string;
  }): Promise<ERPConnection> {
    const connectionId = `${config.systemType}_${Date.now()}`;
    
    // In production, this would establish actual connection
    // For now, we simulate a successful connection
    const connection: ERPConnection = {
      systemType: config.systemType,
      connectionId,
      hostname: config.hostname,
      status: 'connected',
      lastSync: new Date(),
      credentials: {
        username: config.username,
        encrypted: true
      }
    };

    this.connections.set(connectionId, connection);
    
    return connection;
  }

  /**
   * Configure data feed from ERP system
   */
  async configureDataFeed(
    connectionId: string,
    dataType: 'energy' | 'materials' | 'transportation' | 'waste' | 'production',
    frequency: 'realtime' | 'hourly' | 'daily' | 'weekly'
  ): Promise<ERPDataFeed> {
    const feedId = `${connectionId}_${dataType}_${Date.now()}`;
    
    const feed: ERPDataFeed = {
      feedId,
      dataType,
      frequency,
      lastUpdate: new Date(),
      recordCount: 0,
      status: 'active'
    };

    this.dataFeeds.set(feedId, feed);
    
    return feed;
  }

  /**
   * Sync energy data from ERP
   */
  async syncEnergyData(
    connectionId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{ data: ERPEnergyData[]; result: ERPSyncResult }> {
    const startTime = Date.now();
    
    // Simulate fetching data from ERP system
    const data: ERPEnergyData[] = [];
    const recordCount = 50 + Math.floor(Math.random() * 50);
    
    for (let i = 0; i < recordCount; i++) {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - i);
      
      data.push({
        timestamp,
        facilityId: `FAC-${Math.floor(Math.random() * 10 + 1)}`,
        energyType: this.getRandomEnergyType(),
        consumption: 1000 + Math.random() * 5000,
        unit: 'kWh',
        cost: 100 + Math.random() * 500,
        currency: 'USD',
        source: 'ERP System'
      });
    }

    const result: ERPSyncResult = {
      feedId: `${connectionId}_energy`,
      recordsProcessed: recordCount,
      recordsAdded: recordCount,
      recordsUpdated: 0,
      recordsFailed: 0,
      errors: [],
      syncTime: new Date(),
      duration: Date.now() - startTime
    };

    return { data, result };
  }

  /**
   * Sync material data from ERP
   */
  async syncMaterialData(
    connectionId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{ data: ERPMaterialData[]; result: ERPSyncResult }> {
    const startTime = Date.now();
    
    const data: ERPMaterialData[] = [];
    const recordCount = 30 + Math.floor(Math.random() * 30);
    
    for (let i = 0; i < recordCount; i++) {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - i * 2);
      
      data.push({
        timestamp,
        materialId: `MAT-${1000 + i}`,
        materialName: this.getRandomMaterial(),
        quantity: 100 + Math.random() * 1000,
        unit: 'kg',
        cost: 500 + Math.random() * 2000,
        currency: 'USD',
        supplier: `Supplier ${Math.floor(Math.random() * 5 + 1)}`,
        category: this.getRandomMaterialCategory()
      });
    }

    const result: ERPSyncResult = {
      feedId: `${connectionId}_materials`,
      recordsProcessed: recordCount,
      recordsAdded: recordCount,
      recordsUpdated: 0,
      recordsFailed: 0,
      errors: [],
      syncTime: new Date(),
      duration: Date.now() - startTime
    };

    return { data, result };
  }

  /**
   * Sync transportation data from ERP
   */
  async syncTransportationData(
    connectionId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{ data: ERPTransportationData[]; result: ERPSyncResult }> {
    const startTime = Date.now();
    
    const data: ERPTransportationData[] = [];
    const recordCount = 40 + Math.floor(Math.random() * 40);
    
    for (let i = 0; i < recordCount; i++) {
      const timestamp = new Date();
      timestamp.setDate(timestamp.getDate() - i);
      
      data.push({
        timestamp,
        tripId: `TRIP-${10000 + i}`,
        vehicleType: this.getRandomVehicleType(),
        distance: 50 + Math.random() * 500,
        unit: 'km',
        fuelType: this.getRandomFuelType(),
        fuelConsumed: 20 + Math.random() * 100,
        origin: `Location ${Math.floor(Math.random() * 10 + 1)}`,
        destination: `Location ${Math.floor(Math.random() * 10 + 1)}`,
        cost: 100 + Math.random() * 500
      });
    }

    const result: ERPSyncResult = {
      feedId: `${connectionId}_transportation`,
      recordsProcessed: recordCount,
      recordsAdded: recordCount,
      recordsUpdated: 0,
      recordsFailed: 0,
      errors: [],
      syncTime: new Date(),
      duration: Date.now() - startTime
    };

    return { data, result };
  }

  /**
   * Sync production data from ERP
   */
  async syncProductionData(
    connectionId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{ data: ERPProductionData[]; result: ERPSyncResult }> {
    const startTime = Date.now();
    
    const data: ERPProductionData[] = [];
    const recordCount = 20 + Math.floor(Math.random() * 30);
    
    for (let i = 0; i < recordCount; i++) {
      const timestamp = new Date();
      timestamp.setHours(timestamp.getHours() - i * 4);
      
      data.push({
        timestamp,
        productionLine: `Line ${Math.floor(Math.random() * 5 + 1)}`,
        productId: `PROD-${5000 + i}`,
        quantity: 100 + Math.random() * 500,
        unit: 'units',
        energyConsumed: 500 + Math.random() * 2000,
        materialsUsed: [
          { material: 'Steel', quantity: 50 + Math.random() * 200, unit: 'kg' },
          { material: 'Plastic', quantity: 20 + Math.random() * 100, unit: 'kg' }
        ],
        wasteGenerated: 5 + Math.random() * 20,
        duration: 4 + Math.random() * 8
      });
    }

    const result: ERPSyncResult = {
      feedId: `${connectionId}_production`,
      recordsProcessed: recordCount,
      recordsAdded: recordCount,
      recordsUpdated: 0,
      recordsFailed: 0,
      errors: [],
      syncTime: new Date(),
      duration: Date.now() - startTime
    };

    return { data, result };
  }

  /**
   * Get real-time data stream
   */
  async getRealTimeDataStream(
    feedId: string,
    callback: (data: any) => void
  ): Promise<{ streamId: string; status: string }> {
    // Simulate real-time streaming
    const streamId = `stream_${feedId}_${Date.now()}`;
    
    // In production, this would set up WebSocket or similar for real-time updates
    // For now, we simulate periodic updates
    const interval = setInterval(() => {
      callback({
        timestamp: new Date(),
        value: 1000 + Math.random() * 5000,
        unit: 'kWh'
      });
    }, 5000);

    // Store interval for cleanup
    // In production, this would be managed properly
    
    return {
      streamId,
      status: 'streaming'
    };
  }

  /**
   * Get all active connections
   */
  getConnections(): ERPConnection[] {
    return Array.from(this.connections.values());
  }

  /**
   * Get all configured data feeds
   */
  getDataFeeds(): ERPDataFeed[] {
    return Array.from(this.dataFeeds.values());
  }

  /**
   * Test ERP connection
   */
  async testConnection(connectionId: string): Promise<{ success: boolean; message: string }> {
    const connection = this.connections.get(connectionId);
    
    if (!connection) {
      return {
        success: false,
        message: 'Connection not found'
      };
    }

    // In production, this would test actual connectivity
    return {
      success: true,
      message: `Successfully connected to ${connection.systemType} at ${connection.hostname}`
    };
  }

  /**
   * Disconnect from ERP system
   */
  async disconnect(connectionId: string): Promise<void> {
    const connection = this.connections.get(connectionId);
    
    if (connection) {
      connection.status = 'disconnected';
      // Clean up any active feeds
      for (const [feedId, feed] of this.dataFeeds.entries()) {
        if (feedId.startsWith(connectionId)) {
          feed.status = 'paused';
        }
      }
    }
  }

  // Helper methods
  private getRandomEnergyType(): 'electricity' | 'natural_gas' | 'steam' | 'diesel' | 'other' {
    const types: ('electricity' | 'natural_gas' | 'steam' | 'diesel' | 'other')[] = 
      ['electricity', 'natural_gas', 'steam', 'diesel', 'other'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomMaterial(): string {
    const materials = ['Steel', 'Aluminum', 'Plastic', 'Copper', 'Concrete', 'Glass', 'Rubber'];
    return materials[Math.floor(Math.random() * materials.length)];
  }

  private getRandomMaterialCategory(): string {
    const categories = ['Raw Materials', 'Components', 'Packaging', 'Consumables', 'Chemicals'];
    return categories[Math.floor(Math.random() * categories.length)];
  }

  private getRandomVehicleType(): string {
    const types = ['Truck', 'Van', 'Car', 'Semi-Trailer', 'Box Truck'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private getRandomFuelType(): string {
    const types = ['Diesel', 'Gasoline', 'Electric', 'Hybrid', 'CNG'];
    return types[Math.floor(Math.random() * types.length)];
  }

  /**
   * Get sync statistics
   */
  getSyncStatistics(connectionId: string): {
    totalRecords: number;
    lastSync: Date | null;
    avgSyncDuration: number;
    errorRate: number;
  } {
    const feeds = Array.from(this.dataFeeds.values()).filter(f => 
      f.feedId.startsWith(connectionId)
    );

    const totalRecords = feeds.reduce((sum, feed) => sum + feed.recordCount, 0);
    const lastSync = feeds.length > 0 ? 
      feeds.reduce((latest, feed) => 
        feed.lastUpdate > latest ? feed.lastUpdate : latest
      , feeds[0].lastUpdate) : null;

    return {
      totalRecords,
      lastSync,
      avgSyncDuration: 2500 + Math.random() * 1000, // milliseconds
      errorRate: Math.random() * 0.02 // 0-2% error rate
    };
  }
}

export default ERPIntegrationService;
