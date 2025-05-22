import { BetterAuth } from 'better-auth';
import authConfig from './config';

// Initialize Better-Auth with the configuration
export const betterAuth = new BetterAuth(authConfig);

// Utility function to hash password
export const hashPassword = async (password: string) => {
  return await betterAuth.hashPassword(password);
};

// Utility function to verify password
export const comparePassword = async (password: string, hashedPassword: string) => {
  return await betterAuth.comparePassword(password, hashedPassword);
};

// Utility function to generate JWT token
export const generateToken = (payload: Record<string, any>) => {
  return betterAuth.generateToken(payload);
};

// Utility function to verify JWT token
export const verifyToken = (token: string) => {
  return betterAuth.verifyToken(token);
};

export default betterAuth;