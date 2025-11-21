import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getAdminUser } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) {
          return null;
        }

        const adminUser = await getAdminUser();
        if (!adminUser) {
          return null;
        }

        const isValid = await compare(
          credentials.password as string,
          adminUser.password_hash
        );

        if (!isValid) {
          return null;
        }

        return {
          id: adminUser.id.toString(),
          name: "Admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = nextUrl.pathname === "/login";

      // Allow access to login page always
      if (isOnLoginPage) {
        return true;
      }

      // For other admin pages, require authentication
      if (nextUrl.pathname.startsWith("/admin")) {
        return isLoggedIn;
      }

      // Allow all other pages
      return true;
    },
  },
  trustHost: true,
});
