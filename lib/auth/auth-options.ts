import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // TODO: Implement actual authentication logic
        // This is a placeholder and should be replaced with real authentication
        if (credentials?.email === 'test@example.com' && credentials?.password === 'password') {
          return { id: '1', name: 'Test User', email: credentials.email };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback_secret_for_testing',
};