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
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPanel = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      if (isOnAdminPanel) {
        if (isOnLoginPage) {
          return true;
        }
        return isLoggedIn;
      }

      return true;
    },
  },
  trustHost: true,
});
