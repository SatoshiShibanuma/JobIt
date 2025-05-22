import { AuthConfig } from 'better-auth';

export const authConfig: AuthConfig = {
  secret: process.env.AUTH_SECRET || 'your_fallback_secret', // Replace with secure secret in production
  tokenExpiration: '1h',
  tokenType: 'jwt',
  hashRounds: 10,
  userIdentificationField: 'email',
  
  // Optional custom configuration
  passwordValidation: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
};

export default authConfig;