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

// Phase 3.1: AI/ML Features
export interface AnomalyDetection {
  id?: number;
  dataType: string; // 'activity_data', 'emissions'
  dataId: number;
  anomalyScore: number;
  anomalyType: string;
  recommendation?: string;
  status: string; // 'pending', 'reviewed', 'resolved'
  createdAt?: string;
  resolvedAt?: string;
}

export interface PredictiveModel {
  id?: number;
  modelType: string; // 'missing_data', 'emissions_forecast'
  targetField: string;
  trainingData?: string;
  modelParameters?: string;
  accuracy?: number;
  lastTrained?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MLSuggestion {
  id?: number;
  sourceType: string; // 'activity_data', 'emission_factor'
  sourceId: number;
  suggestionType: string;
  suggestedValue?: string;
  confidence: number;
  reasoning?: string;
  status: string; // 'pending', 'accepted', 'rejected'
  createdAt?: string;
}

// Phase 3.2: Target Management
export interface CarbonTarget {
  id?: number;
  targetName: string;
  targetType: string; // 'absolute', 'intensity', 'sbti'
  baselineYear: number;
  baselineEmissions: number;
  targetYear: number;
  targetReduction: number; // percentage
  scope: string; // '1', '2', '1+2', '1+2+3'
  status: string; // 'draft', 'active', 'achieved'
  sbtiValidated: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReductionProject {
  id?: number;
  projectName: string;
  description: string;
  projectType: string;
  startDate: string;
  endDate: string;
  status: string; // 'planned', 'in-progress', 'completed', 'cancelled'
  targetEmissionReduction: number;
  actualEmissionReduction?: number;
  estimatedCost: number;
  actualCost?: number;
  roi?: number;
  milestones?: string; // JSON array
  createdAt?: string;
  updatedAt?: string;
}

export interface CarbonPricingScenario {
  id?: number;
  scenarioName: string;
  carbonPrice: number;
  currency: string;
  priceGrowthRate: number; // annual %
  applicableScopes: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.3: Supply Chain Features
export interface SupplierEngagement {
  id?: number;
  supplierId: number;
  engagementType: string; // 'data_request', 'assessment', 'collaboration'
  status: string; // 'initiated', 'in-progress', 'completed'
  requestedDate: string;
  dueDate: string;
  completedDate?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplyChainMap {
  id?: number;
  tier: number;
  supplierId: number;
  parentSupplierId?: number;
  productCategory: string;
  spendAmount: number;
  emissionsContribution: number;
  geographicLocation?: string;
  riskLevel: string; // 'low', 'medium', 'high'
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierAssessment {
  id?: number;
  supplierId: number;
  assessmentDate: string;
  overallScore: number; // 0-100
  emissionsScore: number;
  dataQualityScore: number;
  engagementScore: number;
  certifications?: string; // JSON array
  improvementAreas?: string;
  nextReviewDate: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.4: Multi-Entity Support
export interface Entity {
  id?: number;
  entityName: string;
  entityType: string; // 'subsidiary', 'division', 'facility'
  parentEntityId?: number;
  country: string;
  currency: string;
  language: string;
  timezone: string;
  isActive: boolean;
  metadata?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface RegionalCompliance {
  id?: number;
  region: string;
  regulationType: string;
  regulationName: string;
  description: string;
  applicableScopes: string;
  reportingFrequency: string;
  nextDeadline: string;
  isActive: boolean;
  requirements?: string; // JSON
  createdAt?: string;
  updatedAt?: string;
}

export interface DataGovernancePolicy {
  id?: number;
  policyName: string;
  policyType: string; // 'access', 'retention', 'privacy'
  description: string;
  entityId?: number;
  rules?: string; // JSON
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 3.5: Integration Ecosystem
export interface IntegrationPlugin {
  id?: number;
  pluginName: string;
  pluginType: string; // 'connector', 'calculation', 'reporting'
  version: string;
  author: string;
  description: string;
  configSchema?: string; // JSON schema
  isInstalled: boolean;
  isActive: boolean;
  installDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CustomCalculation {
  id?: number;
  calculationName: string;
  description: string;
  formula: string;
  variables?: string; // JSON
  outputUnit: string;
  category: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AutomationWorkflow {
  id?: number;
  workflowName: string;
  description: string;
  triggerType: string; // 'schedule', 'event', 'manual'
  triggerConfig?: string; // JSON
  actions?: string; // JSON array of actions
  isActive: boolean;
  lastRunDate?: string;
  nextRunDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 4.1: Next-Gen Analytics
export interface DeepLearningModel {
  id?: number;
  modelName: string;
  modelType: string; // 'emissions_forecast', 'recommendation', 'optimization'
  description: string;
  architecture?: string; // JSON of model architecture
  trainingData?: string;
  accuracy?: number;
  insights?: string; // JSON of model insights/explanations
  isActive: boolean;
  lastTrained?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StrategyRecommendation {
  id?: number;
  recommendationType: string; // 'reduction', 'efficiency', 'procurement'
  title: string;
  description: string;
  potentialImpact: number; // CO2e reduction
  estimatedCost: number;
  implementationTime: number; // months
  confidenceScore: number; // 0-1
  prerequisites?: string; // JSON array
  status: string; // 'suggested', 'under_review', 'accepted', 'implemented', 'rejected'
  createdAt?: string;
  updatedAt?: string;
}

export interface AutomatedInsight {
  id?: number;
  insightType: string; // 'trend', 'anomaly', 'opportunity', 'risk'
  title: string;
  narrative: string; // Natural language explanation
  dataSource?: string;
  relatedEntities?: string; // JSON array of related entity IDs
  severity: string; // 'info', 'warning', 'critical'
  actionable: boolean;
  suggestedActions?: string; // JSON array
  createdAt?: string;
}

export interface DigitalTwin {
  id?: number;
  facilityId: number;
  facilityName: string;
  location?: string;
  modelData?: string; // JSON of 3D model data
  realTimeData?: string; // JSON of current sensor data
  emissionsData?: string; // JSON of emissions by source
  visualizationConfig?: string; // JSON of 3D view configuration
  isActive: boolean;
  lastUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 4.2: Enhanced Verification & Trust
export interface VerificationWorkflow {
  id?: number;
  workflowName: string;
  workflowType: string; // 'internal', 'external', 'multi_party'
  dataScope?: string; // JSON of what data is being verified
  verifiers?: string; // JSON array of verifier info
  status: string; // 'initiated', 'in_progress', 'completed', 'failed'
  currentStep: number;
  totalSteps: number;
  startDate?: string;
  completionDate?: string;
  verificationEvidence?: string; // JSON of supporting documents
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditTrail {
  id?: number;
  entityType: string; // 'activity_data', 'calculation', 'report'
  entityId: number;
  action: string; // 'created', 'updated', 'verified', 'deleted'
  userId: number;
  timestamp: string;
  previousValue?: string; // JSON
  newValue?: string; // JSON
  verificationHash?: string; // Blockchain-like hash
  parentHash?: string; // Previous audit entry hash
  isImmutable: boolean;
  metadata?: string;
  createdAt?: string;
}

export interface ThirdPartyVerifier {
  id?: number;
  verifierName: string;
  verifierType: string; // 'auditor', 'certification_body', 'consultant'
  contactInfo?: string;
  certifications?: string; // JSON array
  specializations?: string; // JSON array
  rating?: number; // 0-5
  isApproved: boolean;
  integrationEndpoint?: string;
  apiKey?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DataProvenance {
  id?: number;
  dataType: string;
  dataId: number;
  originSource: string;
  collectionMethod: string;
  collectionDate: string;
  transformations?: string; // JSON array of transformation steps
  lineage?: string; // JSON of data lineage tree
  qualityMetrics?: string; // JSON
  createdAt?: string;
}

// Phase 4.3: IoT & Real-Time Monitoring
export interface IoTDevice {
  id?: number;
  deviceName: string;
  deviceType: string; // 'energy_meter', 'emissions_sensor', 'flow_meter'
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  location?: string;
  facilityId?: number;
  status: string; // 'online', 'offline', 'error'
  connectionType: string; // 'mqtt', 'http', 'modbus'
  connectionConfig?: string; // JSON
  lastDataReceived?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RealtimeMonitor {
  id?: number;
  monitorName: string;
  monitorType: string; // 'emissions', 'energy', 'resource_consumption'
  deviceIds?: string; // JSON array of IoT device IDs
  thresholds?: string; // JSON of alert thresholds
  currentValue?: number;
  currentUnit?: string;
  status: string; // 'normal', 'warning', 'critical'
  dashboardConfig?: string; // JSON for dashboard layout
  isActive: boolean;
  lastUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SensorData {
  id?: number;
  deviceId: number;
  timestamp: string;
  dataType: string;
  value: number;
  unit: string;
  quality: number; // 0-1 data quality score
  isProcessed: boolean;
  anomalyDetected: boolean;
  metadata?: string;
  createdAt?: string;
}

export interface AlertRule {
  id?: number;
  ruleName: string;
  ruleType: string; // 'threshold', 'trend', 'anomaly'
  monitorId?: number;
  condition?: string; // JSON of alert condition
  severity: string; // 'low', 'medium', 'high', 'critical'
  notificationChannels?: string; // JSON array: 'email', 'sms', 'dashboard'
  recipients?: string; // JSON array
  isActive: boolean;
  lastTriggered?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 4.4: Advanced Visualization & Immersive Experience
export interface Facility3DModel {
  id?: number;
  facilityId: number;
  facilityName: string;
  modelType: string; // 'building', 'industrial_plant', 'campus'
  modelData?: string; // JSON of 3D geometry
  textureData?: string; // JSON of textures/materials
  equipmentLocations?: string; // JSON of equipment placement
  emissionSources?: string; // JSON mapping emission sources to 3D locations
  viewConfig?: string; // JSON of camera angles, lighting
  interactionConfig?: string; // JSON of interactive elements
  createdAt?: string;
  updatedAt?: string;
}

export interface ARDataCollection {
  id?: number;
  collectionType: string; // 'inspection', 'audit', 'training'
  facilityId?: number;
  userId: number;
  sessionDate: string;
  duration: number; // minutes
  dataCollected?: string; // JSON of collected data
  photos?: string; // JSON array of photo paths
  annotations?: string; // JSON of AR annotations
  gpsCoordinates?: string; // JSON
  status: string; // 'in_progress', 'completed', 'reviewed'
  createdAt?: string;
  updatedAt?: string;
}

export interface TrainingModule {
  id?: number;
  moduleName: string;
  moduleType: string; // 'interactive', 'immersive_vr', 'ar_guided'
  topic: string; // 'carbon_accounting', 'data_collection', 'compliance'
  difficulty: string; // 'beginner', 'intermediate', 'advanced'
  content?: string; // JSON of module content
  quizzes?: string; // JSON array of quiz questions
  completionCriteria?: string; // JSON
  estimatedTime: number; // minutes
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrainingProgress {
  id?: number;
  userId: number;
  moduleId: number;
  status: string; // 'not_started', 'in_progress', 'completed', 'certified'
  progressPercentage: number;
  quizScore?: number;
  startDate?: string;
  completionDate?: string;
  certificateIssued: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DataStory {
  id?: number;
  storyTitle: string;
  storyType: string; // 'performance_report', 'trend_analysis', 'impact_assessment'
  narrative?: string; // Auto-generated natural language narrative
  visualizations?: string; // JSON array of chart configs
  keyMetrics?: string; // JSON of highlighted metrics
  dataPoints?: string; // JSON of underlying data
  targetAudience: string; // 'executive', 'technical', 'public'
  publishDate?: string;
  isPublic: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Phase 4.5: Platform Optimization & Future-Proofing
export interface CacheConfig {
  id?: number;
  cacheKey: string;
  cacheType: string; // 'query_result', 'calculation', 'report'
  dataSize: number; // bytes
  ttl: number; // time to live in seconds
  hitCount: number;
  lastAccessed?: string;
  createdAt?: string;
  expiresAt?: string;
}

export interface DistributedJob {
  id?: number;
  jobName: string;
  jobType: string; // 'calculation', 'report_generation', 'data_processing'
  priority: number; // 1-10
  status: string; // 'queued', 'running', 'completed', 'failed'
  progress: number; // 0-100
  inputData?: string; // JSON
  resultData?: string; // JSON
  startTime?: string;
  endTime?: string;
  workerNode?: string;
  estimatedDuration?: number; // seconds
  actualDuration?: number; // seconds
  errorMessage?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ResourceMetrics {
  id?: number;
  metricType: string; // 'cpu', 'memory', 'disk', 'network'
  metricValue: number;
  unit: string;
  timestamp: string;
  nodeId?: string;
  isOptimized: boolean;
  optimizationSuggestion?: string;
  createdAt?: string;
}

export interface SecurityConfig {
  id?: number;
  configType: string; // 'zero_trust', 'encryption', 'access_control'
  configName: string;
  description: string;
  isEnabled: boolean;
  configData?: string; // JSON
  complianceStandards?: string; // JSON array: 'SOC2', 'ISO27001'
  lastAuditDate?: string;
  nextAuditDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EncryptionKey {
  id?: number;
  keyName: string;
  keyType: string; // 'AES-256', 'RSA-4096', 'quantum_resistant'
  algorithm: string;
  keySize: number; // bits
  purpose: string; // 'data_at_rest', 'data_in_transit', 'backup'
  publicKey?: string; // For asymmetric keys
  keyDerivationFunction?: string;
  rotationPolicy: string; // 'monthly', 'quarterly', 'annually'
  lastRotated?: string;
  nextRotation?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ===============================================
// Phase 8: Autonomous Data Collection
// ===============================================

// Document Processing
export interface DocumentTemplate {
  id?: number;
  templateName: string;
  documentType: string; // 'utility_bill', 'invoice', 'report', 'travel_receipt'
  recognitionRules?: string; // JSON of AI recognition rules
  fieldMappings?: string; // JSON mapping document fields to system fields
  confidence: number; // 0-1 learning confidence
  usageCount: number;
  lastUsed?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DocumentProcessing {
  id?: number;
  documentName: string;
  documentType: string;
  fileFormat: string; // 'pdf', 'excel', 'word', 'image', 'email'
  fileSize: number; // bytes
  uploadDate: string;
  processingStatus: string; // 'pending', 'processing', 'completed', 'error'
  ocrAccuracy?: number; // 0-100
  extractedData?: string; // JSON of extracted fields
  validationStatus: string; // 'pending', 'validated', 'flagged'
  flaggedReason?: string;
  templateId?: number;
  metadata?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OCRJob {
  id?: number;
  documentId: number;
  ocrEngine: string; // 'tesseract', 'google_vision', 'azure_cognitive'
  language: string;
  accuracy: number; // 0-100
  processingTime: number; // milliseconds
  textContent?: string;
  structuredData?: string; // JSON of extracted structured data
  confidence: number; // 0-1
  status: string; // 'queued', 'processing', 'completed', 'failed'
  errorMessage?: string;
  createdAt?: string;
  completedAt?: string;
}

// Email Intelligence
export interface EmailMonitor {
  id?: number;
  accountName: string;
  emailAddress: string;
  protocol: string; // 'imap', 'pop3', 'exchange'
  serverConfig?: string; // JSON of connection config
  monitoringRules?: string; // JSON of filtering rules
  categoryFilters?: string; // JSON array of emission categories
  isActive: boolean;
  lastChecked?: string;
  messagesProcessed: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmailAttachment {
  id?: number;
  emailId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
  processingStatus: string; // 'pending', 'processing', 'completed', 'error'
  documentId?: number; // Link to DocumentProcessing
  extractedData?: string;
  createdAt?: string;
}

export interface EmailCategorization {
  id?: number;
  emailId: number;
  category: string; // emission category
  urgency: string; // 'low', 'medium', 'high', 'critical'
  confidence: number; // 0-1
  keywords?: string; // JSON array of matched keywords
  requiresApproval: boolean;
  approvalStatus?: string; // 'pending', 'approved', 'rejected'
  assignedTo?: number; // user ID
  createdAt?: string;
}

// Browser Extension
export interface BrowserCapture {
  id?: number;
  captureType: string; // 'travel_booking', 'supplier_data', 'manual_capture'
  sourceUrl: string;
  websiteName: string;
  capturedData?: string; // JSON of captured data
  dataCategory: string; // emission category
  captureDate: string;
  userId: number;
  processingStatus: string; // 'captured', 'processing', 'imported'
  validationStatus: string;
  metadata?: string;
  createdAt?: string;
}

export interface TravelBooking {
  id?: number;
  bookingReference: string;
  travelType: string; // 'flight', 'train', 'hotel', 'car_rental'
  origin?: string;
  destination?: string;
  travelDate: string;
  distance?: number;
  emissionEstimate?: number;
  capturedData?: string; // JSON of full booking details
  importedToActivity: boolean;
  activityDataId?: number;
  createdAt?: string;
}

// Security & Compliance
export interface DataPrivacyConfig {
  id?: number;
  configName: string;
  complianceFramework: string; // 'GDPR', 'CCPA', 'HIPAA'
  consentRequired: boolean;
  dataRetentionDays: number;
  anonymizationRules?: string; // JSON
  encryptionRequired: boolean;
  geographicRestrictions?: string; // JSON of allowed regions
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuditLog {
  id?: number;
  eventType: string; // 'data_access', 'document_processed', 'email_monitored'
  userId?: number;
  resourceType: string;
  resourceId: number;
  action: string;
  ipAddress?: string;
  userAgent?: string;
  result: string; // 'success', 'failure', 'blocked'
  details?: string; // JSON
  timestamp: string;
  createdAt?: string;
}

export interface ApprovalWorkflow {
  id?: number;
  workflowName: string;
  workflowType: string; // 'document_approval', 'email_data', 'browser_capture'
  approvalSteps?: string; // JSON array of approval stages
  currentStep: number;
  status: string; // 'pending', 'in_progress', 'approved', 'rejected'
  requesterId: number;
  approverId?: number;
  dataReference?: string; // JSON with type and ID
  priority: string; // 'low', 'normal', 'high'
  dueDate?: string;
  comments?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Maximo Integration
export interface MaximoConfig {
  id?: number;
  instanceName: string;
  serverUrl: string;
  apiKey?: string;
  authenticationType: string; // 'basic', 'oauth', 'api_key'
  syncSchedule?: string; // cron expression
  assetCategories?: string; // JSON array of asset types to sync
  mappingRules?: string; // JSON of field mappings
  isActive: boolean;
  lastSyncTime?: string;
  lastSyncStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MaximoAsset {
  id?: number;
  assetNumber: string;
  assetDescription: string;
  assetType: string;
  location?: string;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  emissionSource?: string;
  emissionFactor?: number;
  operatingHours?: number;
  fuelConsumption?: number;
  lastMaintenanceDate?: string;
  syncedAt: string;
  maximoData?: string; // JSON of full Maximo record
  createdAt?: string;
  updatedAt?: string;
}

// Microsoft SSO
export interface MicrosoftSSOConfig {
  id?: number;
  tenantId: string;
  clientId: string;
  clientSecret?: string;
  redirectUri: string;
  isEnabled: boolean;
  autoProvisionUsers: boolean;
  defaultRoleId?: number;
  allowedDomains?: string; // JSON array of allowed email domains
  lastConfigUpdate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ===============================================
// Phase 11: Supply Chain Carbon X-Ray
// ===============================================

// Supplier Carbon Scoring
export interface SupplierCarbonScore {
  id?: number;
  supplierId: number;
  supplierName: string;
  assessmentDate: string;
  overallScore: number; // 0-100
  directEmissionIntensity: number; // tCO2e per unit
  emissionIntensityScore: number; // 0-100
  reductionTargetScore: number; // 0-100
  renewableEnergyScore: number; // 0-100
  environmentalManagementScore: number; // 0-100
  climateRiskScore: number; // 0-100
  hasReductionTarget: boolean;
  targetYear?: number;
  targetReduction?: number; // percentage
  renewableEnergyPercentage: number;
  hasCertifications?: string; // JSON array of certifications (ISO 14001, etc.)
  cdpScore?: string; // A, A-, B, etc.
  riskLevel: string; // 'low', 'medium', 'high', 'critical'
  dataQuality: number; // 0-1
  lastUpdated?: string;
  createdAt?: string;
  updatedAt?: string;
}

// CDP Integration
export interface CDPIntegration {
  id?: number;
  integrationName: string;
  apiKey?: string;
  isActive: boolean;
  lastSyncDate?: string;
  suppliersSynced: number;
  syncFrequency: string; // 'daily', 'weekly', 'monthly'
  autoSync: boolean;
  dataMapping?: string; // JSON of field mappings
  createdAt?: string;
  updatedAt?: string;
}

// Carbon Hotspot Mapping
export interface CarbonHotspot {
  id?: number;
  supplierId: number;
  supplierName: string;
  category: string;
  region: string;
  emissionIntensity: number; // tCO2e
  spendAmount: number;
  spendCurrency: string;
  carbonPerDollar: number; // tCO2e per $ spent
  riskLevel: string; // 'low', 'medium', 'high', 'critical'
  reductionPotential: number; // estimated tCO2e reduction possible
  priorityScore: number; // 0-100
  coordinates?: string; // JSON {lat, lng}
  visualizationData?: string; // JSON for heat map rendering
  createdAt?: string;
}

export interface SpendCarbonAnalysis {
  id?: number;
  categoryId: number;
  categoryName: string;
  totalSpend: number;
  totalEmissions: number;
  carbonIntensity: number; // tCO2e per $
  supplierCount: number;
  topSuppliers?: string; // JSON array of top emitters
  optimizationOpportunities?: string; // JSON array
  potentialSavings: number; // tCO2e
  createdAt?: string;
}

export interface SupplierRiskAssessment {
  id?: number;
  supplierId: number;
  supplierName: string;
  overallRisk: string; // 'low', 'medium', 'high', 'critical'
  carbonRiskScore: number; // 0-100
  regulatoryRisk: number; // 0-100
  reputationRisk: number; // 0-100
  financialRisk: number; // 0-100
  geographicRisk: number; // 0-100
  riskFactors?: string; // JSON array of identified risks
  mitigationStrategies?: string; // JSON array
  lastAssessed: string;
  nextReviewDate: string;
  createdAt?: string;
  updatedAt?: string;
}

// Alternative Supplier Intelligence
export interface AlternativeSupplier {
  id?: number;
  alternativeSupplierId: number;
  alternativeSupplierName: string;
  currentSupplierId: number;
  currentSupplierName: string;
  carbonReduction: number; // tCO2e savings
  carbonReductionPercentage: number;
  costImpact: number; // $ difference
  costImpactPercentage: number;
  qualityScore: number; // 0-100
  reliabilityScore: number; // 0-100
  sustainabilityScore: number; // 0-100
  overallRecommendationScore: number; // 0-100
  confidence: number; // 0-1 AI confidence
  switchingCost: number;
  switchingTimeframe: string; // 'immediate', 'short-term', 'long-term'
  keyBenefits?: string; // JSON array
  potentialRisks?: string; // JSON array
  createdAt?: string;
}

export interface SupplierPerformancePrediction {
  id?: number;
  supplierId: number;
  supplierName: string;
  predictionDate: string;
  predictionHorizon: string; // '1-year', '3-year', '5-year'
  predictedEmissionTrend: string; // 'improving', 'stable', 'declining'
  predictedEmissions: number; // tCO2e
  predictedCarbonScore: number; // 0-100
  confidenceLevel: number; // 0-1
  keyPredictors?: string; // JSON array of factors
  recommendations?: string; // JSON array
  modelAccuracy: number; // historical accuracy %
  createdAt?: string;
}

export interface SupplierSwitchRisk {
  id?: number;
  currentSupplierId: number;
  alternativeSupplierId: number;
  overallRiskLevel: string; // 'low', 'medium', 'high'
  operationalRisk: number; // 0-100
  financialRisk: number; // 0-100
  qualityRisk: number; // 0-100
  timelineRisk: number; // 0-100
  relationshipRisk: number; // 0-100
  mitigationPlan?: string; // JSON
  estimatedTransitionTime: number; // days
  recommendedApproach: string;
  createdAt?: string;
}

export interface SustainableSupplierMatch {
  id?: number;
  supplierId: number;
  supplierName: string;
  matchScore: number; // 0-100
  carbonScore: number; // 0-100
  category: string;
  location: string;
  certifications?: string; // JSON array
  productServices?: string; // JSON array
  carbonIntensity: number;
  pricingTier: string; // 'budget', 'mid-range', 'premium'
  capacity: string;
  leadTime: string;
  contactInfo?: string;
  createdAt?: string;
}

// Decarbonization Planning
export interface SupplierEngagementProgram {
  id?: number;
  programName: string;
  programType: string; // 'data_collection', 'reduction_collaboration', 'capacity_building'
  description: string;
  startDate: string;
  endDate: string;
  status: string; // 'planning', 'active', 'completed', 'paused'
  targetSuppliers?: string; // JSON array of supplier IDs
  enrolledSuppliers: number;
  objectives?: string; // JSON array
  milestones?: string; // JSON array
  budget: number;
  actualSpend: number;
  emissionReductionTarget: number;
  actualEmissionReduction: number;
  engagementMetrics?: string; // JSON of engagement stats
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierImprovementMetrics {
  id?: number;
  supplierId: number;
  supplierName: string;
  programId?: number;
  baselineEmissions: number;
  currentEmissions: number;
  emissionReduction: number;
  reductionPercentage: number;
  baselineDate: string;
  measurementDate: string;
  improvementAreas?: string; // JSON array
  milestonesCompleted: number;
  milestonesTotal: number;
  investmentRequired: number;
  investmentCommitted: number;
  roi: number;
  projectedFutureReductions: number;
  createdAt?: string;
}

export interface ProcurementOptimization {
  id?: number;
  categoryId: number;
  categoryName: string;
  currentSupplier: string;
  recommendedSupplier: string;
  optimizationType: string; // 'carbon', 'cost', 'balanced'
  currentEmissions: number;
  projectedEmissions: number;
  emissionSavings: number;
  currentCost: number;
  projectedCost: number;
  costImpact: number;
  implementationComplexity: string; // 'low', 'medium', 'high'
  priorityScore: number; // 0-100
  timeline: string;
  actionItems?: string; // JSON array
  createdAt?: string;
}

// Enterprise Capabilities
export interface GlobalSupplyChainConfig {
  id?: number;
  configName: string;
  regions?: string; // JSON array of regions
  regulatoryFrameworks?: string; // JSON of region-specific regulations
  reportingStandards?: string; // JSON
  dataGovernanceRules?: string; // JSON
  complianceRequirements?: string; // JSON
  integrationSettings?: string; // JSON
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryEmissionMetrics {
  id?: number;
  categoryId: number;
  categoryName: string;
  totalEmissions: number;
  emissionsBySupplier?: string; // JSON
  emissionTrend: string; // 'increasing', 'stable', 'decreasing'
  topEmitters?: string; // JSON array
  reductionOpportunities?: string; // JSON array
  targetEmissions?: number;
  progressToTarget: number; // percentage
  lastCalculated: string;
  createdAt?: string;
}

export interface ProcurementCategory {
  id?: number;
  categoryName: string;
  categoryCode: string;
  description: string;
  scope3Category: number; // 1-15
  averageEmissionFactor: number;
  totalSpend: number;
  supplierCount: number;
  emissionIntensity: number;
  riskLevel: string;
  managerId?: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SupplierComplianceStatus {
  id?: number;
  supplierId: number;
  supplierName: string;
  complianceFramework: string; // 'CDP', 'SBTi', 'ISO14001', etc.
  complianceStatus: string; // 'compliant', 'non-compliant', 'pending', 'expired'
  certificationDate?: string;
  expirationDate?: string;
  auditDate?: string;
  auditResult?: string;
  nonComplianceIssues?: string; // JSON array
  correctionPlan?: string;
  nextReviewDate: string;
  documentationLink?: string;
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

  // Phase 3.1: AI/ML APIs
  detectAnomalies: (dataType: string, threshold?: number) => Promise<AnomalyDetection[]>;
  listAnomalies: (filters?: any) => Promise<AnomalyDetection[]>;
  resolveAnomaly: (id: number, resolution: string) => Promise<boolean>;
  createPredictiveModel: (data: PredictiveModel) => Promise<PredictiveModel>;
  listPredictiveModels: () => Promise<PredictiveModel[]>;
  trainModel: (id: number) => Promise<{ success: boolean; accuracy: number }>;
  predictMissingData: (dataType: string, context: any) => Promise<MLSuggestion[]>;
  listMLSuggestions: (filters?: any) => Promise<MLSuggestion[]>;
  acceptSuggestion: (id: number) => Promise<boolean>;
  rejectSuggestion: (id: number) => Promise<boolean>;

  // Phase 3.2: Target Management APIs
  createCarbonTarget: (data: CarbonTarget) => Promise<CarbonTarget>;
  listCarbonTargets: () => Promise<CarbonTarget[]>;
  updateCarbonTarget: (id: number, data: Partial<CarbonTarget>) => Promise<CarbonTarget>;
  deleteCarbonTarget: (id: number) => Promise<boolean>;
  validateSBTi: (id: number) => Promise<{ valid: boolean; feedback: string }>;
  createReductionProject: (data: ReductionProject) => Promise<ReductionProject>;
  listReductionProjects: (filters?: any) => Promise<ReductionProject[]>;
  updateReductionProject: (id: number, data: Partial<ReductionProject>) => Promise<ReductionProject>;
  deleteReductionProject: (id: number) => Promise<boolean>;
  calculateProjectROI: (id: number) => Promise<number>;
  createCarbonPricingScenario: (data: CarbonPricingScenario) => Promise<CarbonPricingScenario>;
  listCarbonPricingScenarios: () => Promise<CarbonPricingScenario[]>;
  updateCarbonPricingScenario: (id: number, data: Partial<CarbonPricingScenario>) => Promise<CarbonPricingScenario>;
  deleteCarbonPricingScenario: (id: number) => Promise<boolean>;

  // Phase 3.3: Supply Chain APIs
  createSupplierEngagement: (data: SupplierEngagement) => Promise<SupplierEngagement>;
  listSupplierEngagements: (filters?: any) => Promise<SupplierEngagement[]>;
  updateSupplierEngagement: (id: number, data: Partial<SupplierEngagement>) => Promise<SupplierEngagement>;
  deleteSupplierEngagement: (id: number) => Promise<boolean>;
  createSupplyChainMap: (data: SupplyChainMap) => Promise<SupplyChainMap>;
  listSupplyChainMaps: (filters?: any) => Promise<SupplyChainMap[]>;
  updateSupplyChainMap: (id: number, data: Partial<SupplyChainMap>) => Promise<SupplyChainMap>;
  deleteSupplyChainMap: (id: number) => Promise<boolean>;
  createSupplierAssessment: (data: SupplierAssessment) => Promise<SupplierAssessment>;
  listSupplierAssessments: (filters?: any) => Promise<SupplierAssessment[]>;
  updateSupplierAssessment: (id: number, data: Partial<SupplierAssessment>) => Promise<SupplierAssessment>;
  deleteSupplierAssessment: (id: number) => Promise<boolean>;
  generateSupplierReport: (supplierId: number) => Promise<string>;

  // Phase 3.4: Multi-Entity APIs
  createEntity: (data: Entity) => Promise<Entity>;
  listEntities: (filters?: any) => Promise<Entity[]>;
  updateEntity: (id: number, data: Partial<Entity>) => Promise<Entity>;
  deleteEntity: (id: number) => Promise<boolean>;
  getEntityHierarchy: () => Promise<any>;
  createRegionalCompliance: (data: RegionalCompliance) => Promise<RegionalCompliance>;
  listRegionalCompliance: (filters?: any) => Promise<RegionalCompliance[]>;
  updateRegionalCompliance: (id: number, data: Partial<RegionalCompliance>) => Promise<RegionalCompliance>;
  deleteRegionalCompliance: (id: number) => Promise<boolean>;
  createDataGovernancePolicy: (data: DataGovernancePolicy) => Promise<DataGovernancePolicy>;
  listDataGovernancePolicies: (filters?: any) => Promise<DataGovernancePolicy[]>;
  updateDataGovernancePolicy: (id: number, data: Partial<DataGovernancePolicy>) => Promise<DataGovernancePolicy>;
  deleteDataGovernancePolicy: (id: number) => Promise<boolean>;

  // Phase 3.5: Integration Ecosystem APIs
  listIntegrationPlugins: (filters?: any) => Promise<IntegrationPlugin[]>;
  installPlugin: (pluginId: number) => Promise<boolean>;
  uninstallPlugin: (pluginId: number) => Promise<boolean>;
  togglePlugin: (pluginId: number, isActive: boolean) => Promise<boolean>;
  createCustomCalculation: (data: CustomCalculation) => Promise<CustomCalculation>;
  listCustomCalculations: (filters?: any) => Promise<CustomCalculation[]>;
  updateCustomCalculation: (id: number, data: Partial<CustomCalculation>) => Promise<CustomCalculation>;
  deleteCustomCalculation: (id: number) => Promise<boolean>;
  executeCustomCalculation: (id: number, inputs: any) => Promise<number>;
  createAutomationWorkflow: (data: AutomationWorkflow) => Promise<AutomationWorkflow>;
  listAutomationWorkflows: (filters?: any) => Promise<AutomationWorkflow[]>;
  updateAutomationWorkflow: (id: number, data: Partial<AutomationWorkflow>) => Promise<AutomationWorkflow>;
  deleteAutomationWorkflow: (id: number) => Promise<boolean>;
  executeAutomationWorkflow: (id: number) => Promise<{ success: boolean; output: any }>;

  // Phase 4.1: Next-Gen Analytics APIs
  createDeepLearningModel: (data: DeepLearningModel) => Promise<DeepLearningModel>;
  listDeepLearningModels: (filters?: any) => Promise<DeepLearningModel[]>;
  updateDeepLearningModel: (id: number, data: Partial<DeepLearningModel>) => Promise<DeepLearningModel>;
  deleteDeepLearningModel: (id: number) => Promise<boolean>;
  trainDeepLearningModel: (id: number) => Promise<{ success: boolean; accuracy: number; insights: string }>;
  getModelInsights: (id: number) => Promise<any>;
  createStrategyRecommendation: (data: StrategyRecommendation) => Promise<StrategyRecommendation>;
  listStrategyRecommendations: (filters?: any) => Promise<StrategyRecommendation[]>;
  updateStrategyRecommendation: (id: number, data: Partial<StrategyRecommendation>) => Promise<StrategyRecommendation>;
  deleteStrategyRecommendation: (id: number) => Promise<boolean>;
  generateRecommendations: (context?: any) => Promise<StrategyRecommendation[]>;
  listAutomatedInsights: (filters?: any) => Promise<AutomatedInsight[]>;
  generateInsightsReport: (filters?: any) => Promise<{ insights: AutomatedInsight[]; narrative: string }>;
  createDigitalTwin: (data: DigitalTwin) => Promise<DigitalTwin>;
  listDigitalTwins: (filters?: any) => Promise<DigitalTwin[]>;
  updateDigitalTwin: (id: number, data: Partial<DigitalTwin>) => Promise<DigitalTwin>;
  deleteDigitalTwin: (id: number) => Promise<boolean>;
  syncDigitalTwinData: (id: number) => Promise<{ success: boolean; lastUpdated: string }>;

  // Phase 4.2: Enhanced Verification & Trust APIs
  createVerificationWorkflow: (data: VerificationWorkflow) => Promise<VerificationWorkflow>;
  listVerificationWorkflows: (filters?: any) => Promise<VerificationWorkflow[]>;
  updateVerificationWorkflow: (id: number, data: Partial<VerificationWorkflow>) => Promise<VerificationWorkflow>;
  deleteVerificationWorkflow: (id: number) => Promise<boolean>;
  advanceWorkflowStep: (id: number) => Promise<{ success: boolean; currentStep: number }>;
  getAuditTrail: (entityType: string, entityId: number) => Promise<AuditTrail[]>;
  verifyAuditTrailIntegrity: (entityType: string, entityId: number) => Promise<{ valid: boolean; message: string }>;
  createThirdPartyVerifier: (data: ThirdPartyVerifier) => Promise<ThirdPartyVerifier>;
  listThirdPartyVerifiers: (filters?: any) => Promise<ThirdPartyVerifier[]>;
  updateThirdPartyVerifier: (id: number, data: Partial<ThirdPartyVerifier>) => Promise<ThirdPartyVerifier>;
  deleteThirdPartyVerifier: (id: number) => Promise<boolean>;
  requestVerification: (verifierId: number, dataScope: any) => Promise<{ success: boolean; workflowId: number }>;
  getDataProvenance: (dataType: string, dataId: number) => Promise<DataProvenance>;
  traceDataLineage: (dataType: string, dataId: number) => Promise<any>;
  validateDataCompliance: (dataType: string, dataId: number) => Promise<{ compliant: boolean; issues: string[] }>;

  // Phase 4.3: IoT & Real-Time Monitoring APIs
  createIoTDevice: (data: IoTDevice) => Promise<IoTDevice>;
  listIoTDevices: (filters?: any) => Promise<IoTDevice[]>;
  updateIoTDevice: (id: number, data: Partial<IoTDevice>) => Promise<IoTDevice>;
  deleteIoTDevice: (id: number) => Promise<boolean>;
  discoverIoTDevices: (networkConfig?: any) => Promise<IoTDevice[]>;
  testDeviceConnection: (id: number) => Promise<{ success: boolean; message: string }>;
  createRealtimeMonitor: (data: RealtimeMonitor) => Promise<RealtimeMonitor>;
  listRealtimeMonitors: (filters?: any) => Promise<RealtimeMonitor[]>;
  updateRealtimeMonitor: (id: number, data: Partial<RealtimeMonitor>) => Promise<RealtimeMonitor>;
  deleteRealtimeMonitor: (id: number) => Promise<boolean>;
  getRealtimeData: (monitorId: number) => Promise<any>;
  listSensorData: (deviceId: number, filters?: any) => Promise<SensorData[]>;
  processSensorData: (deviceId: number, startTime: string, endTime: string) => Promise<{ success: boolean; processed: number }>;
  createAlertRule: (data: AlertRule) => Promise<AlertRule>;
  listAlertRules: (filters?: any) => Promise<AlertRule[]>;
  updateAlertRule: (id: number, data: Partial<AlertRule>) => Promise<AlertRule>;
  deleteAlertRule: (id: number) => Promise<boolean>;
  testAlertRule: (id: number) => Promise<{ triggered: boolean; message: string }>;
  getActiveAlerts: (filters?: any) => Promise<any[]>;

  // Phase 4.4: Advanced Visualization & Immersive Experience APIs
  createFacility3DModel: (data: Facility3DModel) => Promise<Facility3DModel>;
  listFacility3DModels: (filters?: any) => Promise<Facility3DModel[]>;
  updateFacility3DModel: (id: number, data: Partial<Facility3DModel>) => Promise<Facility3DModel>;
  deleteFacility3DModel: (id: number) => Promise<boolean>;
  exportFacility3DModel: (id: number, format: string) => Promise<string>;
  createARDataCollection: (data: ARDataCollection) => Promise<ARDataCollection>;
  listARDataCollections: (filters?: any) => Promise<ARDataCollection[]>;
  updateARDataCollection: (id: number, data: Partial<ARDataCollection>) => Promise<ARDataCollection>;
  deleteARDataCollection: (id: number) => Promise<boolean>;
  createTrainingModule: (data: TrainingModule) => Promise<TrainingModule>;
  listTrainingModules: (filters?: any) => Promise<TrainingModule[]>;
  updateTrainingModule: (id: number, data: Partial<TrainingModule>) => Promise<TrainingModule>;
  deleteTrainingModule: (id: number) => Promise<boolean>;
  getTrainingProgress: (userId: number, moduleId?: number) => Promise<TrainingProgress[]>;
  updateTrainingProgress: (id: number, data: Partial<TrainingProgress>) => Promise<TrainingProgress>;
  issueTrainingCertificate: (userId: number, moduleId: number) => Promise<{ success: boolean; certificateId: string }>;
  createDataStory: (data: DataStory) => Promise<DataStory>;
  listDataStories: (filters?: any) => Promise<DataStory[]>;
  updateDataStory: (id: number, data: Partial<DataStory>) => Promise<DataStory>;
  deleteDataStory: (id: number) => Promise<boolean>;
  generateDataStoryNarrative: (storyId: number) => Promise<{ narrative: string; visualizations: any[] }>;

  // Phase 4.5: Platform Optimization & Future-Proofing APIs
  getCacheStats: () => Promise<any>;
  clearCache: (cacheType?: string) => Promise<{ success: boolean; clearedItems: number }>;
  optimizeCache: () => Promise<{ success: boolean; message: string }>;
  createDistributedJob: (data: DistributedJob) => Promise<DistributedJob>;
  listDistributedJobs: (filters?: any) => Promise<DistributedJob[]>;
  getJobProgress: (id: number) => Promise<{ progress: number; status: string; estimatedTimeRemaining: number }>;
  cancelDistributedJob: (id: number) => Promise<boolean>;
  getResourceMetrics: (timeRange?: any) => Promise<ResourceMetrics[]>;
  optimizeResources: () => Promise<{ success: boolean; optimizations: string[] }>;
  getSecurityConfigs: () => Promise<SecurityConfig[]>;
  updateSecurityConfig: (id: number, data: Partial<SecurityConfig>) => Promise<SecurityConfig>;
  auditSecurity: () => Promise<{ passed: boolean; issues: string[]; recommendations: string[] }>;
  listEncryptionKeys: () => Promise<EncryptionKey[]>;
  createEncryptionKey: (data: EncryptionKey) => Promise<EncryptionKey>;
  rotateEncryptionKey: (id: number) => Promise<{ success: boolean; newKeyId: number }>;
  testQuantumResistance: (keyId: number) => Promise<{ resistant: boolean; algorithm: string; recommendation: string }>;

  // ===============================================
  // Phase 5: Predictive Carbon Intelligence APIs
  // ===============================================

  // Phase 5.1: Advanced Forecasting Engine
  createEmissionForecast: (data: any) => Promise<any>;
  listEmissionForecasts: (filters?: any) => Promise<any[]>;
  getEmissionForecast: (id: number) => Promise<any>;
  updateEmissionForecast: (id: number, data: any) => Promise<any>;
  createForecastingFactor: (data: any) => Promise<any>;
  listForecastingFactors: (filters?: any) => Promise<any[]>;
  runMultiFactorForecast: (params: any) => Promise<any>;
  trainLSTMModel: (params: any) => Promise<any>;

  // Phase 5.2: Carbon Budget Management
  createCarbonBudget: (data: any) => Promise<any>;
  listCarbonBudgets: (filters?: any) => Promise<any[]>;
  getCarbonBudget: (id: number) => Promise<any>;
  updateCarbonBudgetConsumption: (id: number, amount: number) => Promise<any>;
  allocateBudget: (data: any) => Promise<any>;
  listBudgetAllocations: (budgetId?: number) => Promise<any[]>;
  optimizeBudgetAllocation: (budgetId: number) => Promise<any>;
  createBudgetVariance: (data: any) => Promise<any>;
  listBudgetVariances: (budgetId?: number) => Promise<any[]>;

  // Phase 5.3: Early Warning System
  createPredictiveAlert: (data: any) => Promise<any>;
  listPredictiveAlerts: (filters?: any) => Promise<any[]>;
  acknowledgeAlert: (id: number) => Promise<any>;
  resolveAlert: (id: number) => Promise<any>;
  createEarlyWarningTrigger: (data: any) => Promise<any>;
  listEarlyWarningTriggers: (activeOnly?: boolean) => Promise<any[]>;
  evaluateWarningTriggers: () => Promise<any>;
  createActionPlan: (data: any) => Promise<any>;
  listActionPlans: (filters?: any) => Promise<any[]>;
  activateActionPlan: (id: number) => Promise<any>;

  // Phase 5.4: Scenario Planning Suite
  createScenarioSimulation: (data: any) => Promise<any>;
  listScenarioSimulations: (filters?: any) => Promise<any[]>;
  runMonteCarloSimulation: (params: any) => Promise<any>;
  runSensitivityAnalysis: (params: any) => Promise<any>;
  listSensitivityAnalyses: () => Promise<any[]>;

  // Phase 5.5: Enterprise Features
  createEnterpriseForecast: (data: any) => Promise<any>;
  listEnterpriseForecasts: (filters?: any) => Promise<any[]>;
  publishEnterpriseForecast: (id: number) => Promise<any>;
  generateExecutiveDashboard: (params?: any) => Promise<any>;
  createMLTrainingDataset: (data: any) => Promise<any>;
  listMLTrainingDatasets: (filters?: any) => Promise<any[]>;
  getModelPerformanceMetrics: (modelId?: number) => Promise<any[]>;

  // ===============================================
  // Phase 8: Autonomous Data Collection APIs
  // ===============================================

  // Document Processing APIs
  createDocumentTemplate: (data: DocumentTemplate) => Promise<DocumentTemplate>;
  listDocumentTemplates: (filters?: any) => Promise<DocumentTemplate[]>;
  updateDocumentTemplate: (id: number, data: Partial<DocumentTemplate>) => Promise<DocumentTemplate>;
  deleteDocumentTemplate: (id: number) => Promise<boolean>;
  trainTemplateRecognition: (templateId: number, samples: any[]) => Promise<{ success: boolean; confidence: number }>;
  
  uploadDocument: (file: any, metadata?: any) => Promise<DocumentProcessing>;
  listDocuments: (filters?: any) => Promise<DocumentProcessing[]>;
  getDocument: (id: number) => Promise<DocumentProcessing>;
  processDocument: (id: number, options?: any) => Promise<{ success: boolean; extractedData: any }>;
  validateDocumentData: (id: number) => Promise<{ valid: boolean; issues: string[] }>;
  flagDocument: (id: number, reason: string) => Promise<boolean>;
  approveDocument: (id: number) => Promise<boolean>;

  createOCRJob: (documentId: number, options?: any) => Promise<OCRJob>;
  listOCRJobs: (filters?: any) => Promise<OCRJob[]>;
  getOCRJobStatus: (id: number) => Promise<OCRJob>;
  cancelOCRJob: (id: number) => Promise<boolean>;
  batchProcessOCR: (documentIds: number[], options?: any) => Promise<{ jobIds: number[]; queuedCount: number }>;

  // Email Intelligence APIs
  createEmailMonitor: (data: EmailMonitor) => Promise<EmailMonitor>;
  listEmailMonitors: (filters?: any) => Promise<EmailMonitor[]>;
  updateEmailMonitor: (id: number, data: Partial<EmailMonitor>) => Promise<EmailMonitor>;
  deleteEmailMonitor: (id: number) => Promise<boolean>;
  testEmailConnection: (id: number) => Promise<{ success: boolean; message: string }>;
  checkEmailMonitor: (id: number) => Promise<{ newMessages: number; processed: number }>;

  listEmailAttachments: (emailId?: number, filters?: any) => Promise<EmailAttachment[]>;
  processEmailAttachment: (id: number) => Promise<{ success: boolean; documentId: number }>;

  categorizeEmail: (emailId: number) => Promise<EmailCategorization>;
  listEmailCategorizations: (filters?: any) => Promise<EmailCategorization[]>;
  updateEmailCategorization: (id: number, data: Partial<EmailCategorization>) => Promise<EmailCategorization>;

  // Browser Extension APIs
  createBrowserCapture: (data: BrowserCapture) => Promise<BrowserCapture>;
  listBrowserCaptures: (filters?: any) => Promise<BrowserCapture[]>;
  processBrowserCapture: (id: number) => Promise<{ success: boolean; activityDataId?: number }>;
  deleteBrowserCapture: (id: number) => Promise<boolean>;

  createTravelBooking: (data: TravelBooking) => Promise<TravelBooking>;
  listTravelBookings: (filters?: any) => Promise<TravelBooking[]>;
  importTravelBooking: (id: number) => Promise<{ success: boolean; activityDataId: number }>;
  calculateTravelEmissions: (id: number) => Promise<{ emissions: number; unit: string }>;

  // Security & Compliance APIs
  createDataPrivacyConfig: (data: DataPrivacyConfig) => Promise<DataPrivacyConfig>;
  listDataPrivacyConfigs: () => Promise<DataPrivacyConfig[]>;
  updateDataPrivacyConfig: (id: number, data: Partial<DataPrivacyConfig>) => Promise<DataPrivacyConfig>;
  deleteDataPrivacyConfig: (id: number) => Promise<boolean>;
  checkComplianceStatus: (framework: string) => Promise<{ compliant: boolean; issues: string[] }>;

  listAuditLogs: (filters?: any) => Promise<AuditLog[]>;
  exportAuditLogs: (filters?: any, format?: string) => Promise<string>;
  getAuditLogStats: (timeRange?: any) => Promise<any>;

  createApprovalWorkflow: (data: ApprovalWorkflow) => Promise<ApprovalWorkflow>;
  listApprovalWorkflows: (filters?: any) => Promise<ApprovalWorkflow[]>;
  updateApprovalWorkflow: (id: number, data: Partial<ApprovalWorkflow>) => Promise<ApprovalWorkflow>;
  approveWorkflow: (id: number, comments?: string) => Promise<boolean>;
  rejectWorkflow: (id: number, comments: string) => Promise<boolean>;

  // Maximo Integration APIs
  createMaximoConfig: (data: MaximoConfig) => Promise<MaximoConfig>;
  getMaximoConfig: () => Promise<MaximoConfig | null>;
  updateMaximoConfig: (id: number, data: Partial<MaximoConfig>) => Promise<MaximoConfig>;
  deleteMaximoConfig: (id: number) => Promise<boolean>;
  testMaximoConnection: (id: number) => Promise<{ success: boolean; message: string; version?: string }>;
  syncMaximoAssets: (configId: number) => Promise<{ success: boolean; assetsImported: number }>;

  listMaximoAssets: (filters?: any) => Promise<MaximoAsset[]>;
  getMaximoAsset: (id: number) => Promise<MaximoAsset>;
  linkAssetToEmissionSource: (assetId: number, emissionSourceId: number) => Promise<boolean>;

  // Microsoft SSO APIs
  createMicrosoftSSOConfig: (data: MicrosoftSSOConfig) => Promise<MicrosoftSSOConfig>;
  getMicrosoftSSOConfig: () => Promise<MicrosoftSSOConfig | null>;
  updateMicrosoftSSOConfig: (id: number, data: Partial<MicrosoftSSOConfig>) => Promise<MicrosoftSSOConfig>;
  deleteMicrosoftSSOConfig: (id: number) => Promise<boolean>;
  testMicrosoftSSOConnection: (id: number) => Promise<{ success: boolean; message: string }>;
  enableMicrosoftSSO: (id: number, enabled: boolean) => Promise<boolean>;

  // ===============================================
  // Phase 11: Supply Chain Carbon X-Ray APIs
  // ===============================================

  // Supplier Carbon Scoring APIs
  createSupplierCarbonScore: (data: SupplierCarbonScore) => Promise<SupplierCarbonScore>;
  listSupplierCarbonScores: (filters?: any) => Promise<SupplierCarbonScore[]>;
  updateSupplierCarbonScore: (id: number, data: Partial<SupplierCarbonScore>) => Promise<SupplierCarbonScore>;
  deleteSupplierCarbonScore: (id: number) => Promise<boolean>;
  calculateSupplierScore: (supplierId: number) => Promise<{ score: number; breakdown: any }>;

  // CDP Integration APIs
  integrateCDPSupplierData: (supplierId: number) => Promise<{ success: boolean; data: any }>;
  listCDPIntegrations: () => Promise<CDPIntegration[]>;
  syncCDPData: (integrationId: number) => Promise<{ success: boolean; suppliersUpdated: number }>;

  // Carbon Hotspot Mapping APIs
  generateSupplyChainHeatMap: (filters?: any) => Promise<CarbonHotspot[]>;
  analyzeSpendCarbonCorrelation: (categoryId?: number) => Promise<SpendCarbonAnalysis[]>;
  identifyHighRiskSuppliers: (threshold: number) => Promise<SupplierRiskAssessment[]>;
  calculateReductionPotential: (supplierId: number) => Promise<{ potential: number; recommendations: string[] }>;

  // Alternative Supplier Intelligence APIs
  recommendAlternativeSuppliers: (currentSupplierId: number) => Promise<AlternativeSupplier[]>;
  predictSupplierPerformance: (supplierId: number) => Promise<SupplierPerformancePrediction>;
  assessSupplierSwitchRisk: (currentSupplierId: number, alternativeSupplierId: number) => Promise<SupplierSwitchRisk>;
  searchSustainableSuppliers: (criteria: any) => Promise<SustainableSupplierMatch[]>;

  // Decarbonization Planning APIs
  createSupplierEngagementProgram: (data: SupplierEngagementProgram) => Promise<SupplierEngagementProgram>;
  listSupplierEngagementPrograms: (filters?: any) => Promise<SupplierEngagementProgram[]>;
  updateSupplierEngagementProgram: (id: number, data: Partial<SupplierEngagementProgram>) => Promise<SupplierEngagementProgram>;
  trackSupplierImprovementProgram: (supplierId: number) => Promise<SupplierImprovementMetrics>;
  optimizeProcurement: (filters?: any) => Promise<ProcurementOptimization[]>;
  generateSupplierContract: (supplierId: number, requirements: any) => Promise<{ contractText: string; kpis: any[] }>;

  // Enterprise Supply Chain APIs
  configureGlobalSupplyChain: (data: GlobalSupplyChainConfig) => Promise<GlobalSupplyChainConfig>;
  getGlobalSupplyChainConfig: () => Promise<GlobalSupplyChainConfig | null>;
  manageCategoryEmissions: (categoryId: number) => Promise<CategoryEmissionMetrics>;
  listProcurementCategories: () => Promise<ProcurementCategory[]>;
  integrateRiskManagement: (supplierId: number) => Promise<{ riskScore: number; mitigations: string[] }>;
  monitorSupplierCompliance: (filters?: any) => Promise<SupplierComplianceStatus[]>;

  // AI-Optional Framework APIs
  listAIFeatureToggles: (filters?: any) => Promise<any[]>;
  getAIFeatureToggle: (featureKey: string) => Promise<any>;
  updateAIFeatureToggle: (featureKey: string, isEnabled: boolean, updatedBy?: string) => Promise<any>;
  checkAIFeatureEnabled: (featureKey: string) => Promise<boolean>;
  listAIOperationModes: () => Promise<any[]>;
  getActiveOperationMode: () => Promise<any>;
  setActiveOperationMode: (modeName: string, configuredBy?: string) => Promise<any>;
  listAIUsageAudit: (filters?: any) => Promise<any[]>;
  createAIPolicy: (policy: any) => Promise<any>;
  listAIPolicies: (filters?: any) => Promise<any[]>;
  updateAIPolicy: (id: number, updates: any) => Promise<any>;
  recordAIPerformanceMetric: (metric: any) => Promise<void>;
  getAIPerformanceMetrics: (filters?: any) => Promise<any[]>;
  getAIFeatureComparison: (featureKey: string) => Promise<any>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
