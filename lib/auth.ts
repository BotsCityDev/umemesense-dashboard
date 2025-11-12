// lib/auth.ts

import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';
import bcrypt from 'bcrypt';
import type { NextAuthOptions } from 'next-auth';

// --- Hashing Utility Functions ---
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

// --- AUTH CONFIGURATION ---
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && user.passwordHash && (await verifyPassword(credentials.password, user.passwordHash))) {
          // IMPORTANT: Return user object without the passwordHash
          return { id: user.id, name: user.name, email: user.email };
        }

        return null; // Login failed
      },
    }),
  ],
  callbacks: {
    // This callback is vital for injecting the userId into the session
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // token.sub usually holds the User ID
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && session.user) { // 💡 FIX: Check if session.user exists
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
};