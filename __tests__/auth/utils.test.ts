import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../../lib/auth/utils';

describe('Authentication Utilities', () => {
  const testPassword = 'testPassword123!';
  
  it('should hash passwords consistently', async () => {
    const hashedPassword1 = await hashPassword(testPassword);
    const hashedPassword2 = await hashPassword(testPassword);
    
    expect(hashedPassword1).toBe(hashedPassword2);
  });
  
  it('should compare passwords correctly', async () => {
    const hashedPassword = await hashPassword(testPassword);
    
    const isMatch = await comparePassword(testPassword, hashedPassword);
    expect(isMatch).toBe(true);
    
    const isNotMatch = await comparePassword('wrongPassword', hashedPassword);
    expect(isNotMatch).toBe(false);
  });
  
  it('should generate and verify JWT tokens', async () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const token = generateToken(payload);
    
    expect(token).toBeTruthy();
    
    const verifiedPayload = verifyToken(token);
    expect(verifiedPayload).toHaveProperty('userId', payload.userId);
    expect(verifiedPayload).toHaveProperty('email', payload.email);
  });
  
  it('should throw error for invalid token', () => {
    expect(() => verifyToken('invalid.token.here')).toThrow('Invalid or expired token');
  });
});