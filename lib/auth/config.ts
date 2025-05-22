import { AuthConfig } from 'better-auth';

export const authConfig: AuthConfig = {
  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'your_default_secret_key',
    expiresIn: '1d', // Token expiration time
  },
  
  // Password hashing configuration
  password: {
    saltRounds: 10, // Bcrypt salt rounds
  },
  
  // Optional email verification settings
  emailVerification: {
    enabled: true,
    tokenExpiration: '1h',
  },
};

export default authConfig;