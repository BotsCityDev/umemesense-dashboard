// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// 1. Extend the User type to include the 'id' property
declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the custom 'id' property here
    } & DefaultSession["user"];
  }
}

// 2. Extend the JWT type to include the 'id' property
declare module "next-auth/jwt" {
  interface JWT {
    id: string; // Add the custom 'id' property to the token
  }
}