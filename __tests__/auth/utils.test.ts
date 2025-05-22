import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../../lib/auth/utils';

describe('Authentication Utilities', () => {
  const testPassword = 'testPassword123!';
  
  it('should hash and compare passwords correctly', async () => {
    const hashedPassword = await hashPassword(testPassword);
    expect(hashedPassword).not.toBe(testPassword);
    
    const isMatch = await comparePassword(testPassword, hashedPassword);
    expect(isMatch).toBe(true);
  });
  
  it('should generate and verify JWT tokens', async () => {
    const payload = { userId: '123', email: 'test@example.com' };
    const token = generateToken(payload);
    
    expect(token).toBeTruthy();
    
    const verifiedPayload = verifyToken(token);
    expect(verifiedPayload).toHaveProperty('userId', payload.userId);
    expect(verifiedPayload).toHaveProperty('email', payload.email);
  });
});