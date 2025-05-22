import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import authConfig from './config';

// Helper function to hash password
export const hashPassword = async (password: string): Promise<string> => {
  return createHash('sha256').update(password).digest('hex');
};

// Helper function to compare passwords
export const comparePassword = async (
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> => {
  const computedHash = await hashPassword(plainPassword);
  return computedHash === hashedPassword;
};

// Generate JWT token
export const generateToken = (payload: Record<string, any>): string => {
  return jwt.sign(payload, authConfig.jwt.secret, { 
    expiresIn: authConfig.jwt.expiresIn 
  });
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, authConfig.jwt.secret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};