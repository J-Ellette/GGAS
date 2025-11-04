import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  mfaEnabled: boolean;
  mfaSecret?: string;
  backupCodes?: string[];
  roleId: number;
  isActive: boolean;
}

export interface MFASetup {
  secret: string;
  otpauthUrl: string;
  backupCodes: string[];
}

export interface AuthResult {
  success: boolean;
  userId?: number;
  username?: string;
  requiresMFA?: boolean;
  message?: string;
}

export class AuthenticationService {
  private static readonly SALT_ROUNDS = 12;
  private static readonly BACKUP_CODE_LENGTH = 8;
  private static readonly BACKUP_CODE_COUNT = 10;

  /**
   * Hash a password using bcrypt
   */
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Verify a password against a hash
   */
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  /**
   * Generate MFA secret and setup data
   */
  static generateMFASecret(username: string, issuer: string = 'GGAS'): MFASetup {
    const secret = speakeasy.generateSecret({
      name: `${issuer}:${username}`,
      issuer: issuer,
      length: 32,
    });

    const backupCodes = this.generateBackupCodes();

    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url || '',
      backupCodes: backupCodes,
    };
  }

  /**
   * Generate backup codes for account recovery
   */
  private static generateBackupCodes(): string[] {
    const codes: string[] = [];
    for (let i = 0; i < this.BACKUP_CODE_COUNT; i++) {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    return codes;
  }

  /**
   * Verify a TOTP token
   */
  static verifyTOTP(token: string, secret: string): boolean {
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: token,
      window: 2, // Allow 2 steps (60 seconds) tolerance for time sync issues
    });
  }

  /**
   * Verify a backup code (should be one-time use)
   */
  static verifyBackupCode(code: string, hashedCodes: string[]): { valid: boolean; codeIndex: number } {
    for (let i = 0; i < hashedCodes.length; i++) {
      if (bcrypt.compareSync(code, hashedCodes[i])) {
        return { valid: true, codeIndex: i };
      }
    }
    return { valid: false, codeIndex: -1 };
  }

  /**
   * Hash backup codes for secure storage
   */
  static async hashBackupCodes(codes: string[]): Promise<string[]> {
    return Promise.all(codes.map(code => bcrypt.hash(code, this.SALT_ROUNDS)));
  }

  /**
   * Generate a secure session token
   */
  static generateSessionToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Validate session token format
   */
  static isValidSessionToken(token: string): boolean {
    return /^[a-f0-9]{64}$/.test(token);
  }

  /**
   * Generate a secure random password
   */
  static generateSecurePassword(length: number = 16): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    const randomBytes = crypto.randomBytes(length);
    
    for (let i = 0; i < length; i++) {
      password += charset[randomBytes[i] % charset.length];
    }
    
    return password;
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): { valid: boolean; message: string } {
    if (password.length < 12) {
      return { valid: false, message: 'Password must be at least 12 characters long' };
    }

    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }

    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }

    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one special character' };
    }

    return { valid: true, message: 'Password meets strength requirements' };
  }

  /**
   * Check if account is locked due to failed attempts
   */
  static isAccountLocked(failedAttempts: number, lastFailedAttempt: Date, lockoutMinutes: number = 15): boolean {
    if (failedAttempts < 5) {
      return false;
    }

    const lockoutUntil = new Date(lastFailedAttempt.getTime() + lockoutMinutes * 60000);
    return new Date() < lockoutUntil;
  }
}
