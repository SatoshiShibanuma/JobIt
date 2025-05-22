import { AuthConfig } from 'better-auth';

export const authConfig: AuthConfig = {
  providers: {
    // Configure authentication providers
    credentials: {
      // Credentials provider configuration
      authorize: async (credentials) => {
        // Implement user authentication logic
        // Validate credentials and return user or null
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // In a real implementation, you would:
        // 1. Validate credentials against your database
        // 2. Check password hash
        // 3. Return user object if valid
        return {
          id: 'sample-user-id',
          email: credentials.email,
        };
      },
    },
  },
  
  // Authentication session configuration
  session: {
    strategy: 'jwt', // Use JSON Web Token strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  // Optional: Callbacks for custom authentication behavior
  callbacks: {
    async jwt({ token, user }) {
      // Add custom claims to the JWT if needed
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add custom properties to session
      session.user.id = token.id as string;
      return session;
    },
  },

  // Optional: Pages for authentication
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
};