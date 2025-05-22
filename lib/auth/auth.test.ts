import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, generateToken, verifyToken } from './utils';
import { authConfig } from './config';

describe('Authentication Utilities', () => {
  const testPassword = 'SecurePassword123!';
  let hashedPassword: string;
  let token: string;

  it('should hash a password', async () => {
    hashedPassword = await hashPassword(testPassword, authConfig.hashRounds);
    expect(hashedPassword).toBeTruthy();
    expect(hashedPassword).not.toBe(testPassword);
  });

  it('should compare a password correctly', async () => {
    const isMatch = await comparePassword(testPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });

  it('should generate a valid token', async () => {
    const payload = { userId: '123', email: 'test@example.com' };
    token = await generateToken(payload, authConfig.secret, authConfig.tokenExpiration);
    
    expect(token).toBeTruthy();
  });

  it('should verify a generated token', async () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const verifiedToken = await verifyToken(token, authConfig.secret);
    
    expect(verifiedToken).toBeTruthy();
    expect(verifiedToken.userId).toBe('123');
    expect(verifiedToken.email).toBe('test@example.com');
  });
});