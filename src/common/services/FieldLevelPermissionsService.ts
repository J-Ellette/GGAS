/**
 * Field-Level Permissions Service
 * 
 * Provides granular access control at the field level
 * Allows different user roles to have different access to specific fields
 */

export interface FieldPermission {
  field: string;
  read: boolean;
  write: boolean;
  required?: boolean;
}

export interface ResourcePermissions {
  resource: string;
  fields: Record<string, FieldPermission>;
}

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer',
  CONTRIBUTOR = 'contributor',
  AUDITOR = 'auditor',
}

export class FieldLevelPermissionsService {
  private rolePermissions: Map<string, Map<string, ResourcePermissions>> = new Map();

  constructor() {
    this.initializeDefaultPermissions();
  }

  /**
   * Initialize default field-level permissions for standard resources
   */
  private initializeDefaultPermissions(): void {
    // Activity Data Permissions
    this.setResourcePermissions(UserRole.ADMIN, 'activityData', {
      organizationUnit: { read: true, write: true },
      timePeriod: { read: true, write: true },
      emissionSource: { read: true, write: true },
      activityType: { read: true, write: true },
      value: { read: true, write: true },
      unit: { read: true, write: true },
      dataSource: { read: true, write: true },
      dataQuality: { read: true, write: true },
      createdBy: { read: true, write: false },
      createdAt: { read: true, write: false },
      updatedAt: { read: true, write: false },
    });

    this.setResourcePermissions(UserRole.EDITOR, 'activityData', {
      organizationUnit: { read: true, write: true },
      timePeriod: { read: true, write: true },
      emissionSource: { read: true, write: true },
      activityType: { read: true, write: true },
      value: { read: true, write: true },
      unit: { read: true, write: true },
      dataSource: { read: true, write: true },
      dataQuality: { read: true, write: true },
      createdBy: { read: true, write: false },
      createdAt: { read: true, write: false },
      updatedAt: { read: true, write: false },
    });

    this.setResourcePermissions(UserRole.VIEWER, 'activityData', {
      organizationUnit: { read: true, write: false },
      timePeriod: { read: true, write: false },
      emissionSource: { read: true, write: false },
      activityType: { read: true, write: false },
      value: { read: true, write: false },
      unit: { read: true, write: false },
      dataSource: { read: true, write: false },
      dataQuality: { read: true, write: false },
      createdBy: { read: true, write: false },
      createdAt: { read: true, write: false },
      updatedAt: { read: true, write: false },
    });

    // Calculation Permissions
    this.setResourcePermissions(UserRole.ADMIN, 'calculation', {
      activityDataId: { read: true, write: true },
      emissionFactorId: { read: true, write: true },
      scope: { read: true, write: true },
      methodology: { read: true, write: true },
      result: { read: true, write: false },
      uncertainty: { read: true, write: false },
      metadata: { read: true, write: true },
    });

    this.setResourcePermissions(UserRole.AUDITOR, 'calculation', {
      activityDataId: { read: true, write: false },
      emissionFactorId: { read: true, write: false },
      scope: { read: true, write: false },
      methodology: { read: true, write: false },
      result: { read: true, write: false },
      uncertainty: { read: true, write: false },
      metadata: { read: true, write: false },
    });

    // User Management Permissions
    this.setResourcePermissions(UserRole.ADMIN, 'user', {
      username: { read: true, write: true },
      email: { read: true, write: true },
      role: { read: true, write: true },
      department: { read: true, write: true },
      isActive: { read: true, write: true },
      permissions: { read: true, write: true },
      lastLogin: { read: true, write: false },
      createdAt: { read: true, write: false },
    });

    this.setResourcePermissions(UserRole.EDITOR, 'user', {
      username: { read: true, write: false },
      email: { read: true, write: false },
      role: { read: true, write: false },
      department: { read: true, write: false },
      isActive: { read: true, write: false },
      permissions: { read: false, write: false },
      lastLogin: { read: false, write: false },
      createdAt: { read: true, write: false },
    });
  }

  /**
   * Set permissions for a role on a resource
   */
  setResourcePermissions(
    role: UserRole | string,
    resource: string,
    permissions: Record<string, { read: boolean; write: boolean }>
  ): void {
    if (!this.rolePermissions.has(role)) {
      this.rolePermissions.set(role, new Map());
    }

    const fields: Record<string, FieldPermission> = {};
    Object.entries(permissions).forEach(([field, perms]) => {
      fields[field] = {
        field,
        ...perms
      };
    });

    this.rolePermissions.get(role)!.set(resource, {
      resource,
      fields
    });
  }

  /**
   * Check if user can read a field
   */
  canRead(role: UserRole | string, resource: string, field: string): boolean {
    const resourcePerms = this.rolePermissions.get(role)?.get(resource);
    if (!resourcePerms) return false;

    const fieldPerm = resourcePerms.fields[field];
    return fieldPerm?.read || false;
  }

  /**
   * Check if user can write a field
   */
  canWrite(role: UserRole | string, resource: string, field: string): boolean {
    const resourcePerms = this.rolePermissions.get(role)?.get(resource);
    if (!resourcePerms) return false;

    const fieldPerm = resourcePerms.fields[field];
    return fieldPerm?.write || false;
  }

  /**
   * Get all readable fields for a role on a resource
   */
  getReadableFields(role: UserRole | string, resource: string): string[] {
    const resourcePerms = this.rolePermissions.get(role)?.get(resource);
    if (!resourcePerms) return [];

    return Object.entries(resourcePerms.fields)
      .filter(([_, perm]) => perm.read)
      .map(([field]) => field);
  }

  /**
   * Get all writable fields for a role on a resource
   */
  getWritableFields(role: UserRole | string, resource: string): string[] {
    const resourcePerms = this.rolePermissions.get(role)?.get(resource);
    if (!resourcePerms) return [];

    return Object.entries(resourcePerms.fields)
      .filter(([_, perm]) => perm.write)
      .map(([field]) => field);
  }

  /**
   * Filter object to only include readable fields
   */
  filterReadable<T extends Record<string, any>>(
    role: UserRole | string,
    resource: string,
    data: T
  ): Partial<T> {
    const readableFields = this.getReadableFields(role, resource);
    const filtered: Partial<T> = {};

    readableFields.forEach(field => {
      if (field in data) {
        filtered[field as keyof T] = data[field];
      }
    });

    return filtered;
  }

  /**
   * Filter object to only include writable fields
   */
  filterWritable<T extends Record<string, any>>(
    role: UserRole | string,
    resource: string,
    data: T
  ): Partial<T> {
    const writableFields = this.getWritableFields(role, resource);
    const filtered: Partial<T> = {};

    writableFields.forEach(field => {
      if (field in data) {
        filtered[field as keyof T] = data[field];
      }
    });

    return filtered;
  }

  /**
   * Validate write operation
   */
  validateWrite(
    role: UserRole | string,
    resource: string,
    fields: string[]
  ): { valid: boolean; deniedFields: string[] } {
    const deniedFields: string[] = [];

    fields.forEach(field => {
      if (!this.canWrite(role, resource, field)) {
        deniedFields.push(field);
      }
    });

    return {
      valid: deniedFields.length === 0,
      deniedFields
    };
  }

  /**
   * Get all permissions for a role
   */
  getRolePermissions(role: UserRole | string): Map<string, ResourcePermissions> {
    return this.rolePermissions.get(role) || new Map();
  }

  /**
   * Get field permissions summary for a role and resource
   */
  getFieldPermissionsSummary(
    role: UserRole | string,
    resource: string
  ): {
    readable: string[];
    writable: string[];
    readOnly: string[];
  } {
    const readable = this.getReadableFields(role, resource);
    const writable = this.getWritableFields(role, resource);
    const readOnly = readable.filter(f => !writable.includes(f));

    return {
      readable,
      writable,
      readOnly
    };
  }
}

export const fieldLevelPermissionsService = new FieldLevelPermissionsService();
