/**
 * Security Audit Log Service
 * 
 * Provides comprehensive audit trail for security-relevant events
 * Tracks user actions, authentication attempts, data access, and system changes
 */

export interface AuditLogEntry {
  id?: number;
  timestamp: string;
  eventType: AuditEventType;
  userId?: number;
  username?: string;
  action: string;
  resource: string;
  resourceId?: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  ipAddress?: string;
  userAgent?: string;
  result: 'success' | 'failure';
  details?: Record<string, any>;
  metadata?: Record<string, any>;
}

export enum AuditEventType {
  // Authentication Events
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  LOGIN_FAILED = 'LOGIN_FAILED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  PASSWORD_RESET = 'PASSWORD_RESET',
  MFA_ENABLED = 'MFA_ENABLED',
  MFA_DISABLED = 'MFA_DISABLED',
  MFA_VERIFIED = 'MFA_VERIFIED',
  MFA_FAILED = 'MFA_FAILED',
  SESSION_EXPIRED = 'SESSION_EXPIRED',
  
  // User Management Events
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_DELETED = 'USER_DELETED',
  USER_ROLE_CHANGED = 'USER_ROLE_CHANGED',
  USER_PERMISSIONS_CHANGED = 'USER_PERMISSIONS_CHANGED',
  USER_ACTIVATED = 'USER_ACTIVATED',
  USER_DEACTIVATED = 'USER_DEACTIVATED',
  
  // Data Access Events
  DATA_VIEWED = 'DATA_VIEWED',
  DATA_CREATED = 'DATA_CREATED',
  DATA_UPDATED = 'DATA_UPDATED',
  DATA_DELETED = 'DATA_DELETED',
  DATA_EXPORTED = 'DATA_EXPORTED',
  DATA_IMPORTED = 'DATA_IMPORTED',
  
  // Security Events
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  SUSPICIOUS_ACTIVITY = 'SUSPICIOUS_ACTIVITY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  ENCRYPTION_KEY_ROTATED = 'ENCRYPTION_KEY_ROTATED',
  SECURITY_SETTING_CHANGED = 'SECURITY_SETTING_CHANGED',
  
  // System Events
  SYSTEM_STARTED = 'SYSTEM_STARTED',
  SYSTEM_STOPPED = 'SYSTEM_STOPPED',
  CONFIGURATION_CHANGED = 'CONFIGURATION_CHANGED',
  BACKUP_CREATED = 'BACKUP_CREATED',
  BACKUP_RESTORED = 'BACKUP_RESTORED',
  DATABASE_MIGRATION = 'DATABASE_MIGRATION',
}

export interface AuditLogQuery {
  startDate?: string;
  endDate?: string;
  eventType?: AuditEventType;
  userId?: number;
  severity?: string;
  result?: 'success' | 'failure';
  resource?: string;
  limit?: number;
  offset?: number;
}

export interface AuditLogStats {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  failedLoginAttempts: number;
  suspiciousActivities: number;
  recentHighSeverity: AuditLogEntry[];
}

export class SecurityAuditLogService {
  private logs: AuditLogEntry[] = [];
  private maxLogsInMemory = 10000;

  /**
   * Log a security audit event
   */
  log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const logEntry: AuditLogEntry = {
      id: this.logs.length + 1,
      timestamp: new Date().toISOString(),
      ...entry
    };

    this.logs.push(logEntry);

    // Prevent memory overflow - keep only recent logs in memory
    if (this.logs.length > this.maxLogsInMemory) {
      this.logs = this.logs.slice(-this.maxLogsInMemory);
    }

    // In production, this would write to persistent storage/database
    // For now, we keep in memory for the session

    // Log to console in development
    if (entry.severity === 'critical' || entry.severity === 'error') {
      console.warn(`[AUDIT] ${entry.severity.toUpperCase()}: ${entry.action}`, entry);
    }
  }

  /**
   * Log authentication event
   */
  logAuth(
    eventType: AuditEventType,
    userId: number | undefined,
    username: string,
    result: 'success' | 'failure',
    details?: Record<string, any>
  ): void {
    this.log({
      eventType,
      userId,
      username,
      action: `Authentication: ${eventType}`,
      resource: 'authentication',
      severity: result === 'failure' ? 'warning' : 'info',
      result,
      details
    });
  }

  /**
   * Log data access event
   */
  logDataAccess(
    action: string,
    resource: string,
    resourceId: string | undefined,
    userId: number | undefined,
    username: string | undefined,
    result: 'success' | 'failure'
  ): void {
    this.log({
      eventType: AuditEventType.DATA_VIEWED,
      userId,
      username,
      action,
      resource,
      resourceId,
      severity: 'info',
      result
    });
  }

  /**
   * Log permission denied event
   */
  logPermissionDenied(
    userId: number | undefined,
    username: string | undefined,
    resource: string,
    action: string,
    reason?: string
  ): void {
    this.log({
      eventType: AuditEventType.PERMISSION_DENIED,
      userId,
      username,
      action: `Permission Denied: ${action}`,
      resource,
      severity: 'warning',
      result: 'failure',
      details: { reason }
    });
  }

  /**
   * Log suspicious activity
   */
  logSuspiciousActivity(
    description: string,
    userId?: number,
    username?: string,
    details?: Record<string, any>
  ): void {
    this.log({
      eventType: AuditEventType.SUSPICIOUS_ACTIVITY,
      userId,
      username,
      action: `Suspicious Activity: ${description}`,
      resource: 'security',
      severity: 'critical',
      result: 'failure',
      details
    });
  }

  /**
   * Query audit logs
   */
  query(params: AuditLogQuery = {}): AuditLogEntry[] {
    let filtered = [...this.logs];

    if (params.startDate) {
      filtered = filtered.filter(log => log.timestamp >= params.startDate!);
    }

    if (params.endDate) {
      filtered = filtered.filter(log => log.timestamp <= params.endDate!);
    }

    if (params.eventType) {
      filtered = filtered.filter(log => log.eventType === params.eventType);
    }

    if (params.userId) {
      filtered = filtered.filter(log => log.userId === params.userId);
    }

    if (params.severity) {
      filtered = filtered.filter(log => log.severity === params.severity);
    }

    if (params.result) {
      filtered = filtered.filter(log => log.result === params.result);
    }

    if (params.resource) {
      filtered = filtered.filter(log => log.resource.toLowerCase().includes(params.resource!.toLowerCase()));
    }

    // Sort by timestamp descending (most recent first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Apply pagination
    const offset = params.offset || 0;
    const limit = params.limit || 100;
    return filtered.slice(offset, offset + limit);
  }

  /**
   * Get audit log statistics
   */
  getStats(days: number = 7): AuditLogStats {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffISO = cutoffDate.toISOString();

    const recentLogs = this.logs.filter(log => log.timestamp >= cutoffISO);

    const eventsByType: Record<string, number> = {};
    const eventsBySeverity: Record<string, number> = {};

    recentLogs.forEach(log => {
      eventsByType[log.eventType] = (eventsByType[log.eventType] || 0) + 1;
      eventsBySeverity[log.severity] = (eventsBySeverity[log.severity] || 0) + 1;
    });

    const failedLoginAttempts = recentLogs.filter(
      log => log.eventType === AuditEventType.LOGIN_FAILED
    ).length;

    const suspiciousActivities = recentLogs.filter(
      log => log.eventType === AuditEventType.SUSPICIOUS_ACTIVITY
    ).length;

    const recentHighSeverity = recentLogs
      .filter(log => log.severity === 'critical' || log.severity === 'error')
      .slice(0, 10);

    return {
      totalEvents: recentLogs.length,
      eventsByType,
      eventsBySeverity,
      failedLoginAttempts,
      suspiciousActivities,
      recentHighSeverity
    };
  }

  /**
   * Export audit logs
   */
  export(format: 'json' | 'csv' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(this.logs, null, 2);
    } else {
      // CSV format
      const headers = ['Timestamp', 'Event Type', 'User', 'Action', 'Resource', 'Severity', 'Result'];
      const rows = this.logs.map(log => [
        log.timestamp,
        log.eventType,
        log.username || log.userId?.toString() || 'System',
        log.action,
        log.resource,
        log.severity,
        log.result
      ]);

      return [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');
    }
  }

  /**
   * Clear old logs (retention policy)
   */
  clearOldLogs(days: number = 90): number {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    const cutoffISO = cutoffDate.toISOString();

    const originalLength = this.logs.length;
    this.logs = this.logs.filter(log => log.timestamp >= cutoffISO);

    return originalLength - this.logs.length;
  }

  /**
   * Get all logs (for admin)
   */
  getAllLogs(): AuditLogEntry[] {
    return [...this.logs];
  }
}

export const securityAuditLogService = new SecurityAuditLogService();

// Log system startup
securityAuditLogService.log({
  eventType: AuditEventType.SYSTEM_STARTED,
  action: 'System started',
  resource: 'system',
  severity: 'info',
  result: 'success',
  details: {
    version: '1.0.0',
    environment: 'production'
  }
});
