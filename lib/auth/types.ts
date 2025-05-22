import { DefaultSession } from 'better-auth';

// Extend default session types
declare module 'better-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user']
  }
}