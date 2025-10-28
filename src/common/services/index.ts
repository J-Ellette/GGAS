/**
 * Common Services Index
 * Export all service modules
 */

export { default as RegulatoryIntelligenceService } from './RegulatoryIntelligenceService';
export { default as MonitoringIntegrationService } from './MonitoringIntegrationService';
export { default as VerificationService } from './VerificationService';
export { default as AdvancedModelingService } from './AdvancedModelingService';
export { default as UnifiedReportingService } from './UnifiedReportingService';
export { default as ARVRDigitalTwinService } from './ARVRDigitalTwinService';

// Re-export types
export type {
  Regulation,
  ComplianceGap,
  RegulatoryFiling,
  LegalRiskAssessment
} from './RegulatoryIntelligenceService';

export type {
  SatelliteDetection,
  DroneInspection,
  FLIRAnalysis,
  MonitoringAlert
} from './MonitoringIntegrationService';

export type {
  Verifier,
  EvidencePackage,
  VerificationTask
} from './VerificationService';

export type {
  ClimateScenario,
  CarbonPriceForecast,
  TippingPoint,
  PortfolioOptimization
} from './AdvancedModelingService';

export type {
  ReportingRequirement,
  EPAReport,
  StateReport,
  DataCollectionEngine
} from './UnifiedReportingService';

export type {
  FacilityModel3D,
  VirtualTour,
  VirtualAudit,
  DigitalTwin,
  ARInspection
} from './ARVRDigitalTwinService';
