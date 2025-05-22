import { betterAuth } from 'better-auth';
import { authConfig } from './config';

export const { 
  getServerSession, 
  useSession, 
  signIn, 
  signOut 
} = betterAuth(authConfig);