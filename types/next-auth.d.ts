import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      avatarUrl: string;
      id: string;
    };
  }
}
